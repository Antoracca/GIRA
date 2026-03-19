"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

/* ── Types ─────────────────────────────────────── */
interface Domaine {
  id: string;
  shortLabel: string;
  tag: string;
  headline: string;
  description: string;
  interventions: string[];
  image: string;
}

/* ── Data — Spécialités réelles GIRA ───────────── */
const domaines: Domaine[] = [
  {
    id: "gouvernement",
    shortLabel: "Portails Gouvernementaux",
    tag: "Gouvernement · Ambassades · Ministères",
    headline: "Digitaliser les institutions d'État",
    description:
      "Conception et déploiement de portails officiels, sites d'ambassades, intranets ministériels et plateformes institutionnelles conformes aux standards de sécurité les plus exigeants.",
    interventions: [
      "Sites officiels de ministères et ambassades",
      "Portails citoyens et guichets numériques",
      "Intranets sécurisés pour administrations",
      "Plateformes de publication et de diffusion officielle",
    ],
    image:
      "https://images.unsplash.com/photo-1541872705-1f73c6400ec9?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "web-mobile",
    shortLabel: "Applications Web & Mobile",
    tag: "Web · Mobile · PME & Grandes Entreprises",
    headline: "Des applications taillées pour vos enjeux",
    description:
      "Développement d'applications web et mobiles sur mesure pour PME, grands groupes et organisations internationales — de la conception UX au déploiement en production.",
    interventions: [
      "Applications web SaaS et plateformes métier",
      "Applications mobiles iOS et Android natives",
      "Back-office, CRM et tableaux de bord",
      "Intégration API, ERP et systèmes existants",
    ],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "ia",
    shortLabel: "Intelligence Artificielle",
    tag: "IA · Machine Learning · Automatisation",
    headline: "Des intelligences artificielles sur mesure",
    description:
      "Développement, entraînement et intégration de modèles d'intelligence artificielle adaptés à vos données et vos processus — pour automatiser, prédire et décider plus vite.",
    interventions: [
      "Développement et entraînement de modèles IA",
      "Chatbots et assistants virtuels institutionnels",
      "Automatisation de processus documentaires",
      "Analyse prédictive et aide à la décision",
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "connectivite",
    shortLabel: "Connectivité & Points Relais",
    tag: "Starlink · WiFi Hotspot · Infrastructure",
    headline: "Connecter les zones isolées à internet",
    description:
      "Déploiement de points relais WiFi communautaires via technologie Starlink — accès internet à la minute (30 min, 1h) par paiement mobile, pour les zones rurales et périurbaines.",
    interventions: [
      "Infrastructure Starlink et points relais WiFi",
      "Hotspots communautaires à accès payant (Mobile Money)",
      "Couverture réseau des zones rurales et camps",
      "Maintenance et supervision à distance des nœuds",
    ],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "securite",
    shortLabel: "Communication Sécurisée",
    tag: "VPN · Chiffrement · Liaison inter-institutions",
    headline: "Des canaux de communication inviolables",
    description:
      "Mise en place de canaux sécurisés et chiffrés pour la liaison entre institutions, ambassades et organisations diplomatiques — confidentialité, intégrité et disponibilité garanties.",
    interventions: [
      "VPN diplomatiques et tunnels chiffrés",
      "Plateformes de messagerie sécurisée inter-institutions",
      "Authentification forte et gestion des accès",
      "Audit de sécurité et conformité RGPD / ANSSI",
    ],
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "banque",
    shortLabel: "Banques & Finance",
    tag: "Fintech · Core Banking · Conformité",
    headline: "La transformation numérique des banques",
    description:
      "Accompagnement des institutions financières dans leur digitalisation : core banking, solutions de paiement mobile, conformité réglementaire et interfaces client nouvelle génération.",
    interventions: [
      "Intégration et modernisation de core banking",
      "Plateformes de paiement mobile et Mobile Money",
      "Portails client et applications bancaires mobiles",
      "Conformité KYC/AML et reporting réglementaire",
    ],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "sante",
    shortLabel: "Santé Digitale",
    tag: "SIH · Télémédecine · e-Santé",
    headline: "Digitaliser les systèmes de santé de bout en bout",
    description:
      "Logiciels de gestion hospitalière (SIH), dossier patient numérique, plateformes de télémédecine et outils d'aide à la décision médicale pour hôpitaux et cliniques.",
    interventions: [
      "Systèmes d'information hospitaliers (SIH) sur mesure",
      "Dossier patient numérique et télémédecine",
      "Gestion de la supply chain pharmaceutique",
      "Dashboards épidémiologiques et analytics santé",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "agriculture",
    shortLabel: "Agriculture & Traçabilité",
    tag: "AgriTech · Traçabilité · Applications mobiles",
    headline: "Connecter l'agriculture à la technologie",
    description:
      "Développement de plateformes AgriTech, systèmes de traçabilité des filières, applications mobiles pour agriculteurs et outils de gestion et de prévision pour coopératives.",
    interventions: [
      "Plateformes de mise en relation agriculteurs et marchés",
      "Traçabilité des filières et gestion de la qualité",
      "Applications mobiles pour la gestion des cultures",
      "Systèmes de prévision et d'aide à la décision",
    ],
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&q=85&auto=format&fit=crop",
  },
];

const G = "#C9A84C";
const AUTO_DURATION = 7500;
const MANUAL_PAUSE = 15000;

/* ── Hover Card ────────────────────────────────── */
function DomaineCard({
  domaine,
  isActive,
  onClick,
}: {
  domaine: Domaine;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-2xl text-left focus:outline-none"
      style={{ aspectRatio: "4/3", outline: "none" }}
    >
      {/* Image */}
      <div
        className="absolute inset-0"
        style={{
          transform: hovered ? "scale(1.07)" : "scale(1.0)",
          transition: "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        <Image
          src={domaine.image}
          alt={domaine.shortLabel}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
          unoptimized
        />
      </div>

      {/* Active — thin gold top border */}
      <div
        className="absolute top-0 left-0 right-0 z-20"
        style={{
          height: 2,
          backgroundColor: G,
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.72) 50%, rgba(13,13,13,0.28) 100%)"
            : "linear-gradient(to top, rgba(13,13,13,0.88) 0%, rgba(13,13,13,0.18) 70%, transparent 100%)",
          transition: "background 0.4s ease",
        }}
      />

      {/* Default label */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4"
        style={{
          opacity: hovered ? 0 : 1,
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          transition: "opacity 0.28s, transform 0.28s",
        }}
      >
        <p className="text-white font-bold text-sm leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
          {domaine.shortLabel}
        </p>
        <p className="text-white/45 text-[10px] mt-1" style={{ fontFamily: "var(--font-inter)" }}>
          {domaine.tag.split(" · ")[0]}
        </p>
      </div>

      {/* Hover detail */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.3s ease, transform 0.32s ease",
        }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.22em] font-bold mb-1.5 block"
          style={{ color: G, fontFamily: "var(--font-inter)" }}
        >
          {domaine.tag}
        </span>
        <p className="text-white font-bold text-sm mb-2 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
          {domaine.shortLabel}
        </p>
        <p className="text-white/58 text-[11px] leading-relaxed mb-3.5 line-clamp-2" style={{ fontFamily: "var(--font-inter)" }}>
          {domaine.description}
        </p>
        <div
          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"
          style={{ color: G, fontFamily: "var(--font-inter)" }}
        >
          En savoir plus <ArrowRight size={10} strokeWidth={2.5} />
        </div>
      </div>
    </button>
  );
}

/* ── Nav Arrow Button ──────────────────────────── */
function NavArrow({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={dir === "prev" ? "Précédent" : "Suivant"}
      className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none"
      style={{
        border: `1px solid ${hov ? G : "rgba(255,255,255,0.22)"}`,
        backgroundColor: hov ? "rgba(201,168,76,0.12)" : "rgba(0,0,0,0.35)",
        color: hov ? G : "rgba(255,255,255,0.55)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {dir === "prev" ? <ChevronLeft size={16} strokeWidth={2} /> : <ChevronRight size={16} strokeWidth={2} />}
    </button>
  );
}

/* ── Main Section ──────────────────────────────── */
export default function DomainesSection() {
  const [active, setActive] = useState(0);

  const pausedUntilRef = useRef<number>(0);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    const tryAdvance = () => {
      const now = Date.now();
      if (now < pausedUntilRef.current) {
        timerId = setTimeout(tryAdvance, pausedUntilRef.current - now + 80);
      } else {
        setActive((p) => (p + 1) % domaines.length);
      }
    };
    timerId = setTimeout(tryAdvance, AUTO_DURATION);
    return () => clearTimeout(timerId);
  }, [active]);

  const manualSelect = useCallback((i: number) => {
    pausedUntilRef.current = Date.now() + MANUAL_PAUSE;
    setActive(i);
  }, []);

  const goPrev = useCallback(() => manualSelect((active - 1 + domaines.length) % domaines.length), [active, manualSelect]);
  const goNext = useCallback(() => manualSelect((active + 1) % domaines.length), [active, manualSelect]);

  /* swipe / touch */
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) goNext();
        else goPrev();
      }
    },
    [goNext, goPrev]
  );

  const cur = domaines[active];

  return (
    <section
      className="relative py-20 md:py-32 overflow-hidden"
      style={{
        background: [
          "radial-gradient(ellipse 80% 55% at 4% 8%, rgba(255,255,255,0.11) 0%, transparent 62%)",
          "radial-gradient(ellipse 65% 70% at 98% 96%, rgba(255,255,255,0.08) 0%, transparent 58%)",
          "radial-gradient(ellipse 58% 52% at 45% 40%, rgba(201,168,76,0.10) 0%, transparent 55%)",
          "radial-gradient(ellipse 45% 38% at 18% 82%, rgba(255,255,255,0.065) 0%, transparent 52%)",
          "radial-gradient(ellipse 35% 42% at 78% 18%, rgba(255,255,255,0.055) 0%, transparent 50%)",
          "#0D0D0D",
        ].join(", "),
      }}
    >
      {/* Grain cinématique */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/feTurbulence%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.045,
          mixBlendMode: "overlay" as const,
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p
            className="text-xs uppercase tracking-[0.28em] font-semibold mb-4"
            style={{ color: G, fontFamily: "var(--font-inter)" }}
          >
            Domaines d&apos;expertise
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight max-w-3xl"
            style={{ color: "#FFFFFF", fontFamily: "var(--font-montserrat)" }}
          >
            De la gouvernance digitale à l&apos;intelligence artificielle
          </h2>
          <p
            className="text-base md:text-lg mt-4 max-w-2xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.42)", fontFamily: "var(--font-inter)" }}
          >
            Nous concevons, développons et déployons des solutions numériques
            sur mesure pour les institutions, gouvernements et entreprises.
          </p>
        </motion.div>

        {/* ── Featured panel ── */}
        <div
          className="relative rounded-3xl overflow-hidden mb-4 select-none touch-pan-y"
          style={{ height: 540 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Cross-fade image */}
          <AnimatePresence>
            <motion.div
              key={`img-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={cur.image}
                alt={cur.shortLabel}
                fill
                className="object-cover"
                sizes="1200px"
                priority
                unoptimized
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradients */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.85) 38%, rgba(13,13,13,0.28) 68%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(13,13,13,0.50) 0%, transparent 45%)",
            }}
          />

          {/* Sliding content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${active}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10 h-full flex flex-col justify-center px-8 md:px-14"
              style={{ maxWidth: 570 }}
            >
              <span
                className="text-[11px] uppercase tracking-[0.24em] font-bold mb-5 block"
                style={{ color: G, fontFamily: "var(--font-inter)" }}
              >
                {cur.tag}
              </span>
              <h3
                className="text-3xl md:text-[38px] font-black text-white leading-tight mb-4"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {cur.headline}
              </h3>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "rgba(255,255,255,0.58)", fontFamily: "var(--font-inter)" }}
              >
                {cur.description}
              </p>
              <ul className="space-y-3 mb-10">
                {cur.interventions.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.16 + i * 0.07, duration: 0.32 }}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "rgba(255,255,255,0.80)", fontFamily: "var(--font-inter)" }}
                  >
                    <CheckCircle2 size={14} strokeWidth={2} style={{ color: G, flexShrink: 0, marginTop: 3 }} />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/secteurs"
                className="inline-flex items-center gap-2.5 self-start px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all hover:opacity-90"
                style={{ backgroundColor: G, color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
              >
                Voir nos prestations
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* ── Navigation arrows — desktop ── */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
            <NavArrow dir="prev" onClick={goPrev} />
            <NavArrow dir="next" onClick={goNext} />
          </div>

          {/* Progress line */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10"
            style={{ height: 1, backgroundColor: "rgba(255,255,255,0.05)" }}
          >
            <motion.div
              key={`progress-${active}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: AUTO_DURATION / 1000, ease: "linear" }}
              style={{ height: "100%", backgroundColor: "rgba(201,168,76,0.25)", transformOrigin: "left" }}
            />
          </div>
        </div>

        {/* ── Card grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {domaines.map((d, i) => (
            <DomaineCard
              key={d.id}
              domaine={d}
              isActive={i === active}
              onClick={() => manualSelect(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
