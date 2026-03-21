"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, X, ChevronRight, Brain, Landmark, Server, LineChart } from "lucide-react";

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */

const STATS = [
  { value: 45,  suffix: "+", label: "Experts mobilisés",    sub: "sur 3 continents" },
  { value: 4,   suffix: "",  label: "Domaines tech",         sub: "Data, GovTech, Infra, Finance" },
  { value: 8,   suffix: "",  label: "Secteurs couverts",     sub: "de l'eau à la connectivité" },
  { value: 3,   suffix: "",  label: "Pays de présence",      sub: "Paris · Marrakech · Bratislava" },
];

const CAPABILITIES = [
  {
    icon: Brain,
    title: "Data & IA",
    headline: "La donnée au service de la décision",
    desc: "Nous concevons des systèmes d'intelligence artificielle et d'analyse de la donnée pour les institutions africaines. De la collecte terrain à la décision stratégique, chaque octet compte.",
    points: ["Modèles IA sur mesure", "Tableaux de bord analytiques", "Automatisation des rapports", "Prédiction et aide à la décision"],
    bg: "from-[#0D0D0D] to-[#111827]",
  },
  {
    icon: Landmark,
    title: "Digital Gov",
    headline: "Numériser l'État, rapprocher les citoyens",
    desc: "Portails gouvernementaux, e-services publics, systèmes d'identité numérique. Nous accompagnons les États dans leur transformation digitale, de la conception à l'opération.",
    points: ["Portails institutionnels", "e-Services publics", "Identité numérique", "Formation des agents"],
    bg: "from-[#111827] to-[#1a1a2e]",
  },
  {
    icon: Server,
    title: "Infrastructure Tech",
    headline: "Des systèmes robustes pour des projets complexes",
    desc: "Supervision des chantiers, IoT sur les projets d'eau et d'énergie, connectivité en zones reculées. Nous posons les fondations numériques des infrastructures de demain.",
    points: ["IoT et capteurs terrain", "Connectivité satellite", "Supervision en temps réel", "Résilience et redondance"],
    bg: "from-[#1a1a2e] to-[#0D0D0D]",
  },
  {
    icon: LineChart,
    title: "Finance & Impact",
    headline: "Mesurer et maximiser l'impact réel",
    desc: "Reporting ESG automatisé, outils de suivi des investissements, plateformes de mobilisation des bailleurs. Nous donnons aux acteurs financiers la visibilité dont ils ont besoin.",
    points: ["Reporting ESG automatisé", "Suivi des investissements", "Outils de mobilisation", "Impact measurement"],
    bg: "from-[#0D0D0D] to-[#111111]",
  },
];

const TEAM_SLOTS = [
  { initials: "DG", role: "Fondateur & Directeur Général" },
  { initials: "DT", role: "Directrice Technique" },
  { initials: "RI", role: "Responsable Innovation" },
  { initials: "RP", role: "Responsable Partenariats" },
  { initials: "RO", role: "Responsable Opérations" },
];

/* ══════════════════════════════════════════════════════════
   COUNT-UP HOOK
══════════════════════════════════════════════════════════ */
function useCountUp(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (frame >= totalFrames) { setCount(target); clearInterval(timer); }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

function StatCard({ value, suffix, label, sub, started }: {
  value: number; suffix: string; label: string; sub: string; started: boolean;
}) {
  const count = useCountUp(value, 1800, started);
  return (
    <div className="border-t pt-8" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-3 tabular-nums" style={{ fontFamily: "var(--font-playfair)", color: "#FFFFFF" }}>
        {count}{suffix}
      </div>
      <div className="text-xs font-bold uppercase tracking-[0.18em] mb-1" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>{label}</div>
      <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>{sub}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HORIZONTAL ACCORDION (capabilities)
══════════════════════════════════════════════════════════ */
function CapabilitiesAccordion() {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* ── Mobile : accordion vertical ── */}
      <div className="md:hidden">
        {CAPABILITIES.map((cap, i) => {
          const isOpen = active === i;
          const Icon = cap.icon;
          return (
            <div
              key={i}
              className={`bg-gradient-to-b ${cap.bg}`}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <button
                onClick={() => setActive(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} style={{ color: "#C9A84C" }} strokeWidth={1.5} />
                  <span
                    className="text-sm font-bold text-white"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {cap.title}
                  </span>
                </div>
                <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronRight size={16} style={{ color: "rgba(255,255,255,0.35)" }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-6 pb-8 pt-1">
                      <p
                        className="text-sm leading-relaxed mb-5"
                        style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}
                      >
                        {cap.desc}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {cap.points.map((pt, j) => (
                          <li
                            key={j}
                            className="flex items-center gap-2 text-xs"
                            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-inter)" }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#C9A84C" }} />
                            {pt}
                          </li>
                        ))}
                      </ul>
                      <Link href="/contact" className="gx-btn-gold inline-flex text-xs px-4 py-2.5">
                        Discutons de votre projet <ArrowRight size={12} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ── Desktop : accordion horizontal ── */}
      <div className="hidden md:flex h-[520px] w-full overflow-hidden">
        {CAPABILITIES.map((cap, i) => {
          const isActive = active === i;
          const Icon = cap.icon;
          return (
            <motion.div
              key={i}
              animate={{ flex: isActive ? 5 : 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActive(i)}
              className={`relative overflow-hidden cursor-pointer bg-gradient-to-b ${cap.bg} flex flex-col justify-end`}
              style={{ borderRight: i < CAPABILITIES.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", minWidth: 0 }}
            >
              {/* Collapsed: vertical label */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-3"
                  >
                    <Icon size={22} style={{ color: "#C9A84C", flexShrink: 0 }} strokeWidth={1.5} />
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap"
                      style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", fontFamily: "var(--font-inter)" }}
                    >
                      {cap.title}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expanded: full content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="relative z-10 p-8 md:p-12 flex flex-col justify-end h-full"
                  >
                    <div className="mb-auto pt-8">
                      <Icon size={36} style={{ color: "#C9A84C" }} strokeWidth={1.2} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: "rgba(201,168,76,0.7)", fontFamily: "var(--font-inter)" }}>
                        GIRA Dev
                      </span>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                        {cap.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
                        {cap.desc}
                      </p>
                      <ul className="space-y-1.5 mb-8">
                        {cap.points.map((pt, j) => (
                          <li key={j} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-inter)" }}>
                            <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "#C9A84C" }} />
                            {pt}
                          </li>
                        ))}
                      </ul>
                      <Link href="/contact" className="gx-btn-gold inline-flex text-xs px-5 py-3">
                        Discutons de votre projet
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover glow */}
              {!isActive && (
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(201,168,76,0.04), transparent)" }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════ */
export default function GiraXPage() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const heroRef  = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleKey = useCallback((e: KeyboardEvent) => { if (e.key === "Escape") setVideoOpen(false); }, []);
  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <div style={{ backgroundColor: "#0D0D0D" }}>

      {/* ════════════════════════════════════════════
          S1 — HERO
      ════════════════════════════════════════════ */}
      <section id="vision" ref={heroRef} className="relative w-full min-h-screen overflow-hidden flex items-end">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }}>
          <source src="https://media-publications.bcg.com/flash/BCGX/bcg_x_launch_film-15s_loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.45) 45%, rgba(13,13,13,0.15) 100%)", zIndex: 1 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,13,13,0.55) 0%, transparent 55%)", zIndex: 1 }} />

        <div className="absolute left-8 md:left-16 lg:left-24 z-10" style={{ top: "calc(76px + 24px)" }}>
          <span className="text-[10px] uppercase tracking-[0.45em] font-bold" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>GIRA Dev</span>
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, zIndex: 10 }}
          className="relative w-full max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 pt-[120px] pb-24 md:pb-32"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.04] tracking-tight text-white max-w-3xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Nous Bâtissons<br />
            <em>le Futur</em><br />
            de l&apos;Afrique.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base md:text-lg max-w-md leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-inter)" }}
          >
            GIRA Dev est l&apos;unité tech et innovation de GIRA. Nous construisons les outils numériques qui transforment durablement l&apos;Afrique.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <button onClick={() => setVideoOpen(true)} className="gx-btn-gold inline-flex items-center gap-3 self-start">
              <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center shrink-0">
                <Play size={9} fill="currentColor" />
              </span>
              Voir la vidéo
            </button>
            <Link href="/contact" className="gx-btn-outline self-start">
              Nous contacter
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 right-10 z-10">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ChevronRight size={18} className="rotate-90" style={{ color: "rgba(255,255,255,0.25)" }} />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          S2 — MANIFESTO
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-36" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl lg:text-[52px] font-bold leading-[1.1] text-white mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Nous réinventons l&apos;exécution des projets structurants par la technologie, la donnée et l&apos;innovation.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base md:text-lg leading-relaxed mb-10"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}
            >
              L&apos;Afrique a besoin d&apos;outils conçus pour ses réalités. Ses contraintes de connectivité, ses structures administratives, ses langues, ses données. GIRA Dev construit ces outils avec des ingénieurs, des designers et des experts du développement africain. Nous sommes des bâtisseurs.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <Link href="/contact" className="gx-btn-gold inline-flex">Nous contacter</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          S3 — STATS
      ════════════════════════════════════════════ */}
      <section ref={statsRef} className="py-20 md:py-28" style={{ backgroundColor: "#111111", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            {STATS.map((s, i) => (
              <StatCard key={i} {...s} started={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          S4 — NOTRE VISION D'IMPACT (honnête)
          Transition dégradée vers la section suivante
      ════════════════════════════════════════════ */}
      <section id="impact" className="relative" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 pt-0 pb-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white relative overflow-hidden px-6 pt-10 pb-16 md:px-12 md:pt-16 md:pb-20 lg:px-16"
            style={{ borderRadius: "24px 24px 0 0" }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] block mb-4" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                  Notre trajectoire
                </span>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)", color: "#0D0D0D" }}>
                  Nous démarrons.<br />
                  <em>Construisons ensemble.</em>
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "#666", fontFamily: "var(--font-inter)" }}>
                  GIRA Dev vient de naître. Nos premiers projets sont en cours de structuration. Nous cherchons des partenaires, des institutions et des organisations visionnaires prêts à co-construire les solutions numériques de l&apos;Afrique de demain.
                </p>
              </div>
              <Link href="/contact" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider shrink-0 group" style={{ color: "#0D0D0D", fontFamily: "var(--font-inter)" }}>
                Démarrer un projet
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 3 colonnes: ce qu'on prépare */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { num: "01", titre: "Projets en pipeline", desc: "Plusieurs mandats de structuration et de développement tech sont en cours de cadrage avec des institutions africaines et des bailleurs internationaux." },
                { num: "02", titre: "Partenaires stratégiques", desc: "Nous activons notre réseau de 45+ experts pour constituer des équipes pluridisciplinaires dédiées à chaque projet, secteur par secteur." },
                { num: "03", titre: "Ambition continentale", desc: "De Paris à Marrakech, de Bratislava à Bangui. GIRA Dev se positionne comme le partenaire tech de référence pour l'exécution des projets structurants en Afrique." },
              ].map((item) => (
                <div key={item.num}>
                  <div className="text-4xl font-black mb-4" style={{ color: "rgba(201,168,76,0.15)", fontFamily: "var(--font-playfair)" }}>{item.num}</div>
                  <h3 className="text-base font-bold mb-2" style={{ fontFamily: "var(--font-montserrat)", color: "#0D0D0D" }}>{item.titre}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#777", fontFamily: "var(--font-inter)" }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Masque de dissolution — la carte blanche se dissout dans le fond sombre */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{
                height: "160px",
                background: "linear-gradient(to bottom, transparent 0%, rgba(17,17,17,0.55) 65%, #111111 100%)",
                zIndex: 10,
              }}
            />
          </motion.div>
        </div>
        {/* Pont de section : le fond sombre s'efface vers le blanc de S5 */}
        <div className="h-20 w-full" style={{ background: "linear-gradient(to bottom, #111111 0%, #FFFFFF 100%)" }} />
      </section>

      {/* ════════════════════════════════════════════
          S5 — CE QUE NOUS FAISONS (accordion horizontal)
      ════════════════════════════════════════════ */}
      <section id="capabilities" className="bg-white pb-0" data-nav-light="true">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 pt-4 pb-20">
          <div className="grid md:grid-cols-2 gap-12 items-end mb-16">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] block mb-4" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                Nos capacités
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-[50px] font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)", color: "#0D0D0D" }}>
                Ce que nous<br />faisons
              </h2>
            </div>
            <div>
              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "#555", fontFamily: "var(--font-inter)" }}>
                GIRA Dev réunit ingénieurs, designers et experts du développement africain pour livrer des solutions numériques intégrées, du prototype au déploiement national.
              </p>
              <Link href="/contact" className="gx-btn-dark inline-flex">Parlons de votre projet</Link>
            </div>
          </div>
        </div>

        {/* Accordion pleine largeur */}
        <CapabilitiesAccordion />
      </section>

      {/* ════════════════════════════════════════════
          S6 — ÉQUIPE (placeholders)
      ════════════════════════════════════════════ */}
      <section id="team" className="py-24 md:py-32 bg-white" data-nav-light="true">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] block mb-4" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                Les bâtisseurs
              </span>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)", color: "#0D0D0D" }}>
                Notre Équipe
              </h2>
              <p className="text-base max-w-xl leading-relaxed" style={{ color: "#666", fontFamily: "var(--font-inter)" }}>
                Cinq profils complémentaires, un objectif commun. Rejoignez-nous ou collaborons ensemble.
              </p>
            </div>
            <Link href="/carrieres" className="gx-btn-dark shrink-0 inline-flex">Nous rejoindre</Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {TEAM_SLOTS.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group"
              >
                {/* Placeholder avatar */}
                <div
                  className="relative aspect-[4/5] rounded-2xl mb-4 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: "#F0EEE8", border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-1" style={{ color: "rgba(201,168,76,0.3)", fontFamily: "var(--font-playfair)" }}>
                      {i + 1}
                    </div>
                    <div className="text-[9px] uppercase tracking-widest" style={{ color: "#ccc", fontFamily: "var(--font-inter)" }}>
                      Photo à venir
                    </div>
                  </div>
                  {/* Gold corner accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: "rgba(201,168,76,0.2)" }} />
                </div>
                <div className="text-xs font-semibold" style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}>
                  Membre {i + 1}
                </div>
                <div className="text-[11px] mt-0.5 leading-snug" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                  {m.role}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          S6.5 — DOMAINES (4 sub-pages)
      ════════════════════════════════════════════ */}
      <section id="domaines" className="py-24 md:py-32" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span
              className="text-[10px] font-bold uppercase tracking-[0.4em] block mb-4"
              style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
            >
              Nos quatre domaines
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Choisissez votre domaine
            </h2>
            <p
              className="text-sm md:text-base max-w-xl"
              style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter)" }}
            >
              Chaque domaine GIRA Dev est une unité d&apos;expertise autonome, avec ses propres cas d&apos;usage, outils et équipes terrain.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-10 md:gap-y-14">
            {[
              {
                icon: Brain,
                label: "Data & IA",
                sub: "Systèmes intelligents",
                desc: "ML, dashboards analytiques, NLP en langues locales. La donnée au service de la décision stratégique.",
                href: "/x/data-ia",
                color: "#C9A84C",
              },
              {
                icon: Landmark,
                label: "Digital Gov",
                sub: "e-Services publics",
                desc: "Portails ministériels, identité numérique, e-services citoyens. Numériser l'État pour rapprocher les citoyens.",
                href: "/x/digital-gov",
                color: "#4ade80",
              },
              {
                icon: Server,
                label: "Infrastructure",
                sub: "IoT & supervision",
                desc: "Capteurs IoT, connectivité satellite, supervision temps réel des chantiers eau, énergie et transport.",
                href: "/x/infrastructure",
                color: "#60a5fa",
              },
              {
                icon: LineChart,
                label: "Finance & Impact",
                sub: "ESG & investissements",
                desc: "Reporting ESG automatisé, suivi des investissements, mobilisation des bailleurs institutionnels.",
                href: "/x/finance-impact",
                color: "#a78bfa",
              },
            ].map((domain, i) => {
              const Icon = domain.icon;
              return (
                <motion.div
                  key={domain.href}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={domain.href} className="group flex flex-col gap-4 md:gap-5">
                    <Icon size={26} style={{ color: domain.color }} strokeWidth={1.5} />
                    <div>
                      <div className="w-6 h-px mb-3 md:mb-4" style={{ backgroundColor: domain.color }} />
                      <p
                        className="text-sm md:text-base font-bold text-white mb-1 group-hover:opacity-75 transition-opacity"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                      >
                        {domain.label}
                      </p>
                      <p
                        className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wider mb-3"
                        style={{ color: domain.color, fontFamily: "var(--font-inter)" }}
                      >
                        {domain.sub}
                      </p>
                      <p
                        className="text-[11px] md:text-xs leading-relaxed hidden sm:block"
                        style={{ color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-inter)" }}
                      >
                        {domain.desc}
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-1.5 text-[11px] md:text-xs font-semibold mt-auto"
                      style={{ color: domain.color, fontFamily: "var(--font-inter)" }}
                    >
                      Découvrir
                      <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          S7 — INSIGHTS (coming soon)
      ════════════════════════════════════════════ */}
      <section id="insights" className="py-24 md:py-32" style={{ backgroundColor: "#0D0D0D" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] block mb-4" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                Publications & Insights
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                Nos analyses arrivent.
              </h2>
            </div>
          </div>

          {/* Coming soon state */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-12 py-16 px-10 rounded-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)" }}
          >
            <div className="flex-1">
              <div className="mb-8" style={{ width: 48, height: 2, backgroundColor: "rgba(201,168,76,0.35)" }} />
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Nos publications et analyses sectorielles seront disponibles très prochainement.
              </h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                Data, IA, GovTech, infrastructure numérique en Afrique. Notre équipe prépare des analyses pointues sur les enjeux tech du continent. En attendant, retrouvez nos actualités générales GIRA.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/actualites" className="gx-btn-gold inline-flex text-xs px-6 py-3">
                  Voir les actualités GIRA
                </Link>
                <Link href="/contact" className="gx-btn-outline inline-flex text-xs px-6 py-3">
                  Être notifié
                </Link>
              </div>
            </div>
            <div className="shrink-0 hidden md:flex flex-col items-center gap-3" style={{ opacity: 0.25 }}>
              {["Data & IA", "GovTech", "Infrastructure", "Finance ESG"].map((tag) => (
                <div key={tag} className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white" style={{ border: "1px solid rgba(255,255,255,0.15)", fontFamily: "var(--font-inter)" }}>
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          S8 — CTA FINAL
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-36" style={{ backgroundColor: "#111111", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.45em] font-bold block mb-6" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>GIRA DEV</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              Un projet tech<br />
              <em style={{ color: "#C9A84C" }}>pour l&apos;Afrique ?</em>
            </h2>
            <p className="text-base md:text-lg max-w-lg mx-auto mb-12" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
              Parlons-en. GIRA Dev met à votre disposition une équipe prête à co-construire la solution avec vous, dès maintenant.
            </p>
            <Link href="/contact" className="gx-btn-gold inline-flex text-sm px-10 py-4">Démarrer un projet</Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          VIDEO LIGHTBOX
      ════════════════════════════════════════════ */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.96)" }}
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <video autoPlay controls className="w-full h-full object-cover">
                <source src="https://media-publications.bcg.com/flash/BCGX/bcg_x_launch_film-15s_loop.mp4" type="video/mp4" />
              </video>
            </motion.div>
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <X size={20} color="white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
