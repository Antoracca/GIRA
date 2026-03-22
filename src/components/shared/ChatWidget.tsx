"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, ChevronRight, ArrowRight, UserCheck, Phone } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ChatMessage } from "@/lib/types";

const G = "#C9A84C"; // gold GIRA
const INACTIVITY_DELAY = 2 * 60 * 1000; // 2 minutes

/* ── Mini-renderer Markdown → JSX ───────────────────────── */
function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];
  let key = 0;

  const flushBullets = () => {
    if (bulletBuffer.length === 0) return;
    elements.push(
      <ul key={key++} className="list-none space-y-1 my-1.5">
        {bulletBuffer.map((item, i) => (
          <li key={i} className="flex gap-2 items-start">
            <span style={{ color: G, flexShrink: 0, marginTop: "0.15em" }}>▸</span>
            <span>{inlineMarkdown(item)}</span>
          </li>
        ))}
      </ul>
    );
    bulletBuffer = [];
  };

  for (const line of lines) {
    const bulletMatch = line.match(/^[\*\-]\s+(.+)/);
    if (bulletMatch) { bulletBuffer.push(bulletMatch[1]); continue; }
    flushBullets();
    if (line.trim() === "") {
      elements.push(<div key={key++} className="h-1" />);
    } else {
      elements.push(<p key={key++} className="leading-relaxed">{inlineMarkdown(line)}</p>);
    }
  }
  flushBullets();
  return <>{elements}</>;
}

function inlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\((https?:\/\/[^\)]+)\))/g;
  let last = 0, match: RegExpExecArray | null, i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(<span key={i++}>{text.slice(last, match.index)}</span>);
    if (match[2])           parts.push(<strong key={i++} style={{ fontWeight: 700 }}>{match[2]}</strong>);
    else if (match[3])      parts.push(<em key={i++}>{match[3]}</em>);
    else if (match[4])      parts.push(<code key={i++} className="bg-black/10 px-1 rounded text-xs font-mono">{match[4]}</code>);
    else if (match[5] && match[6]) parts.push(
      <a key={i++} href={match[6]} target="_blank" rel="noopener noreferrer"
        style={{ color: G, textDecoration: "underline" }}>{match[5]}</a>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(<span key={i++}>{text.slice(last)}</span>);
  return parts;
}

/* ── Messages pré-définis (locale-keyed) ─────────────────── */
const CHAT_DATA = {
  fr: {
    welcome: "Bonjour ! Je suis l'assistant GIRA. Je peux répondre à vos questions, qualifier votre projet ou vous proposer un premier devis indicatif.\n\nComment puis-je vous aider ?",
    inactivity: [
      "Êtes-vous toujours là ? Je suis disponible si vous avez des questions sur nos services ou si vous souhaitez qualifier votre projet.",
      "Puis-je vous aider à aller plus loin ? Notre équipe d'experts est également disponible pour un échange personnalisé.",
      "N'hésitez pas à me poser vos questions — ou à contacter directement notre équipe via le formulaire pour une réponse formelle.",
    ],
    suggestions: [
      "Quels sont les services de GIRA ?",
      "Je veux demander un devis",
      "GIRA et le PND RCA 2024-2028",
      "Comment rejoindre le réseau GIRA ?",
    ],
    expertLabel: "Parler à un expert",
    expertBody: "Un consultant GIRA peut vous accompagner personnellement dans la structuration de votre projet.",
    expertCta: "Initier un mandat",
    contactLink: "Formulaire de contact",
    formCta: "Passer au formulaire de contact",
    errorMsg: "Une erreur est survenue. Contactez-nous directement à contact@gira-cf.com.",
    fallbackMsg: "Je n'ai pas pu générer une réponse. Réessayez.",
    closeLabel: "Fermer l'assistant",
    suggestionsLabel: "Suggestions",
  },
  en: {
    welcome: "Hello! I'm the GIRA assistant. I can answer your questions, qualify your project or provide an initial indicative quote.\n\nHow can I help you?",
    inactivity: [
      "Are you still there? I'm available if you have questions about our services or would like to qualify your project.",
      "Can I help you go further? Our team of experts is also available for a personalized discussion.",
      "Feel free to ask me your questions — or contact our team directly via the form for a formal response.",
    ],
    suggestions: [
      "What are GIRA's services?",
      "I want to request a quote",
      "GIRA and the RCA NDP 2024-2028",
      "How to join the GIRA network?",
    ],
    expertLabel: "Talk to an expert",
    expertBody: "A GIRA consultant can personally guide you through the structuring of your project.",
    expertCta: "Initiate a mandate",
    contactLink: "Contact form",
    formCta: "Go to contact form",
    errorMsg: "An error occurred. Contact us directly at contact@gira-cf.com.",
    fallbackMsg: "I couldn't generate a response. Please try again.",
    closeLabel: "Close assistant",
    suggestionsLabel: "Suggestions",
  },
} as const;

/* ── Icône chat ──────────────────────────────────────────── */
function ChatIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <circle cx="9" cy="10" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
══════════════════════════════════════════════════════════ */
export default function ChatWidget() {
  const t = useTranslations("chat");
  const rawLocale = useLocale();
  const locale: "fr" | "en" = rawLocale === "en" ? "en" : "fr";
  const c = CHAT_DATA[locale];

  const welcomeMsg: ChatMessage = { role: "assistant", content: c.welcome };

  const [isOpen, setIsOpen]         = useState(false);
  const [messages, setMessages]     = useState<ChatMessage[]>([welcomeMsg]);
  const [input, setInput]           = useState("");
  const [isLoading, setIsLoading]   = useState(false);
  const [hasSent, setHasSent]       = useState(false);
  const [inactivityCount, setInactivityCount] = useState(0);
  const [showExpertBadge, setShowExpertBadge] = useState(false);

  const messagesEndRef   = useRef<HTMLDivElement>(null);
  const inputRef         = useRef<HTMLTextAreaElement>(null);
  const inactivityTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Scroll vers le bas */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /* Focus input à l'ouverture */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 350);
  }, [isOpen]);

  /* Bloquer scroll body sur mobile */
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* ── Relance d'inactivité ─────────────────────────────── */
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (!isOpen || isLoading) return;

    inactivityTimer.current = setTimeout(() => {
      const idx = inactivityCount % c.inactivity.length;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: c.inactivity[idx] },
      ]);
      setInactivityCount((c) => c + 1);
      // Après 2 relances, proposer un expert
      if (inactivityCount >= 1) setShowExpertBadge(true);
    }, INACTIVITY_DELAY);
  }, [isOpen, isLoading, inactivityCount]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { if (inactivityTimer.current) clearTimeout(inactivityTimer.current); };
  }, [messages, isOpen, resetInactivityTimer]);

  /* ── Envoi message ────────────────────────────────────── */
  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;

    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

    const userMsg: ChatMessage = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setIsLoading(true);
    setHasSent(true);
    setShowExpertBadge(false);

    try {
      const res  = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message ?? c.fallbackMsg },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: c.errorMsg },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  /* ── Nombre de messages assistants (hors welcome) ──────── */
  const assistantReplies = messages.filter((m) => m.role === "assistant").length - 1;

  return (
    <>
      {/* ════════════════════════════════════════════════════
          PANEL CHAT
      ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop mobile */}
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[59] md:hidden"
              style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div key="panel"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 36 }}
              className={[
                "fixed z-[60] flex flex-col",
                /* Mobile : slide depuis le bas, quasi plein écran */
                "inset-x-0 bottom-0 h-[92dvh] rounded-t-3xl",
                /* Desktop : taille fixe mais bornée par le viewport */
                "md:inset-auto md:bottom-20 md:right-6 md:w-[420px] md:rounded-2xl",
                "md:h-[600px] md:max-h-[calc(100dvh-6rem)]",
              ].join(" ")}
              style={{ backgroundColor: "#FFFFFF", boxShadow: "0 -4px 60px rgba(0,0,0,0.18)" }}
            >

              {/* ── HEADER ───────────────────────────────── */}
              <div
                className="flex items-center justify-between px-5 py-4 flex-shrink-0 rounded-t-3xl md:rounded-t-2xl"
                style={{ backgroundColor: "#0D0D0D" }}
              >
                {/* Logo : GIRA blanc + flèche orange */}
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/logoGIRA.png"
                      alt="GIRA"
                      width={72}
                      height={26}
                      className="object-contain"
                      style={{ filter: "brightness(0) invert(1)" }}
                      priority
                    />
                    <ArrowRight
                      size={18}
                      strokeWidth={2.5}
                      style={{ color: G, flexShrink: 0 }}
                    />
                  </div>
                  <div className="h-5 w-px" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                  <div>
                    <p className="text-[11px] font-semibold text-white leading-tight"
                      style={{ fontFamily: "var(--font-montserrat)", letterSpacing: "0.04em" }}>
                      {t("title")}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-[10px]"
                        style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter)" }}>
                        {t("subtitle")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bouton fermer */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:opacity-70"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  aria-label={c.closeLabel}
                >
                  <X size={17} strokeWidth={2} style={{ color: "rgba(255,255,255,0.7)" }} />
                </button>
              </div>

              {/* ── ZONE MESSAGES ──────────────────────── */}
              <div
                className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
                style={{ backgroundColor: "#F7F6F2" }}
                data-lenis-prevent
              >
                {messages.map((msg, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {/* Avatar assistant */}
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 overflow-hidden"
                        style={{ backgroundColor: "#0D0D0D" }}>
                        <Image src="/logoGIRA.png" alt="G" width={18} height={14}
                          className="object-contain" style={{ filter: "brightness(0) invert(1)" }} />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"
                      }`}
                      style={
                        msg.role === "user"
                          ? { backgroundColor: "#0D0D0D", color: "#FFFFFF" }
                          : { backgroundColor: "#FFFFFF", color: "#1A1A1A",
                              border: "1px solid rgba(0,0,0,0.07)",
                              fontFamily: "var(--font-inter)" }
                      }
                    >
                      {msg.role === "assistant" ? renderMarkdown(msg.content) : msg.content}
                    </div>
                  </motion.div>
                ))}

                {/* Loading dots */}
                {isLoading && (
                  <div className="flex justify-start items-end gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#0D0D0D" }}>
                      <Image src="/logoGIRA.png" alt="G" width={18} height={14}
                        className="object-contain" style={{ filter: "brightness(0) invert(1)" }} />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5"
                      style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)" }}>
                      {[0, 150, 300].map((delay) => (
                        <span key={delay} className="w-2 h-2 rounded-full animate-bounce"
                          style={{ backgroundColor: G, animationDelay: `${delay}ms` }} />
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Suggestions rapides (avant 1er envoi) ── */}
                <AnimatePresence>
                  {!hasSent && !isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.25 }}
                      className="pt-2"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-3 px-1"
                        style={{ color: "rgba(0,0,0,0.3)", fontFamily: "var(--font-inter)" }}>
                        {c.suggestionsLabel}
                      </p>
                      <div className="flex flex-col gap-2">
                        {c.suggestions.map((s) => (
                          <button key={s} onClick={() => send(s)}
                            className="flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-80 active:scale-[0.98]"
                            style={{
                              backgroundColor: "#FFFFFF",
                              border: "1px solid rgba(0,0,0,0.08)",
                              color: "#1A1A1A",
                              fontFamily: "var(--font-inter)",
                              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                            }}>
                            <span>{s}</span>
                            <ChevronRight size={14} style={{ color: G, flexShrink: 0 }} />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── CTA Expert (après inactivité ou ≥ 3 échanges) ── */}
                <AnimatePresence>
                  {(showExpertBadge || assistantReplies >= 3) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mx-1 mt-2 rounded-2xl overflow-hidden"
                      style={{ border: `1px solid ${G}30` }}
                    >
                      <div className="px-4 py-3" style={{ backgroundColor: `${G}0D` }}>
                        <div className="flex items-center gap-2 mb-2">
                          <UserCheck size={14} style={{ color: G }} />
                          <p className="text-[11px] font-bold uppercase tracking-widest"
                            style={{ color: G, fontFamily: "var(--font-montserrat)" }}>
                            {c.expertLabel}
                          </p>
                        </div>
                        <p className="text-xs mb-3" style={{ color: "#555", fontFamily: "var(--font-inter)" }}>
                          {c.expertBody}
                        </p>
                        <div className="flex flex-col gap-2">
                          <Link href="/contact" onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90"
                            style={{ backgroundColor: G, color: "#0D0D0D", fontFamily: "var(--font-inter)" }}>
                            <Phone size={12} />
                            {c.expertCta}
                            <ArrowRight size={12} strokeWidth={2.5} />
                          </Link>
                          <Link href="/contact" onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-medium transition-all hover:opacity-80"
                            style={{ border: `1px solid ${G}40`, color: G, fontFamily: "var(--font-inter)" }}>
                            {c.contactLink}
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* ── Lien formulaire (après 2 échanges) ─── */}
              <AnimatePresence>
                {messages.length >= 4 && !showExpertBadge && assistantReplies < 3 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="px-4 py-2 flex-shrink-0"
                    style={{ backgroundColor: "#F7F6F2" }}
                  >
                    <Link href="/contact" onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:opacity-90"
                      style={{ backgroundColor: `${G}18`, color: G, border: `1px solid ${G}30`, fontFamily: "var(--font-inter)" }}>
                      {c.formCta}
                      <ChevronRight size={13} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── INPUT ──────────────────────────────── */}
              <div className="flex items-end gap-2 px-4 py-3 flex-shrink-0 border-t"
                style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(0,0,0,0.07)" }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={t("placeholder")}
                  rows={1}
                  disabled={isLoading}
                  className="flex-1 resize-none text-sm px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 bg-gray-50"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 16,
                    borderColor: "rgba(0,0,0,0.1)",
                    maxHeight: 120,
                    lineHeight: "1.5",
                    color: "#1A1A1A",
                  }}
                  onInput={(e) => {
                    const t = e.currentTarget;
                    t.style.height = "auto";
                    t.style.height = Math.min(t.scrollHeight, 120) + "px";
                  }}
                />
                <button onClick={() => send()}
                  disabled={!input.trim() || isLoading}
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                  style={{ backgroundColor: G, color: "#0D0D0D" }}
                  aria-label="Envoyer">
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>

              {/* Safe area iOS */}
              <div className="md:hidden flex-shrink-0"
                style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════
          BOUTON FLOTTANT
      ════════════════════════════════════════════════════ */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: G, color: "#0D0D0D" }}
        whileHover={{ scale: 1.1, boxShadow: `0 8px 30px ${G}55` }}
        whileTap={{ scale: 0.94 }}
        aria-label={isOpen ? c.closeLabel : (locale === "en" ? "Open GIRA assistant" : "Ouvrir l'assistant GIRA")}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} strokeWidth={2} />
            </motion.div>
          ) : (
            <motion.div key="open"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <ChatIcon size={22} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring quand fermé */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full animate-ping"
            style={{ backgroundColor: G, opacity: 0.25 }} />
        )}
      </motion.button>
    </>
  );
}
