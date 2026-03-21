"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

/* ── Design tokens ─────────────────────────── */
const GOLD = "#C9A84C";
const NAVY = "#1A1A2E";
const SKY = "#38BDF8";
const GOLD_BORDER = "rgba(201,168,76,0.45)";
const PILL_W = 52;
const CARD_BORDER = `2px solid ${GOLD_BORDER}`;
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];
const AUTO_DELAY = 7500;
const MANUAL_PAUSE = 12000;

/* ── SVG Icons — 2 couleurs (navy + gold), draw animation ── */
function IconGov() {
  const d = 0.12;
  return (
    <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
      {/* Roof triangle */}
      <motion.path d="M90 30 L150 70 L30 70 Z" stroke={NAVY} strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: d }} />
      {/* Columns */}
      {[50, 75, 105, 130].map((x, i) => (
        <motion.line key={x} x1={x} y1={75} x2={x} y2={135} stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: d + 0.3 + i * 0.1 }} />
      ))}
      {/* Base */}
      <motion.line x1={30} y1={138} x2={150} y2={138} stroke={NAVY} strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: d + 0.7 }} />
      {/* Flag circle */}
      <motion.circle cx={90} cy={52} r={6} stroke={GOLD} strokeWidth="1.5" fill="none" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: d + 1, type: "spring" }} />
    </svg>
  );
}

function IconWeb() {
  return (
    <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
      {/* Browser window */}
      <motion.rect x={25} y={35} width={100} height={75} rx={8} stroke={NAVY} strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
      <motion.line x1={25} y1={52} x2={125} y2={52} stroke={NAVY} strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.5 }} />
      {/* Browser dots */}
      {[38, 50, 62].map((x, i) => (
        <motion.circle key={x} cx={x} cy={43} r={2.5} fill={i === 0 ? GOLD : NAVY} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 + i * 0.08 }} />
      ))}
      {/* Phone */}
      <motion.rect x={105} y={60} width={50} height={85} rx={10} stroke={GOLD} strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.3 }} />
      <motion.circle cx={130} cy={135} r={4} stroke={GOLD} strokeWidth="1.5" fill="none" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} />
    </svg>
  );
}

function IconIA() {
  const nodes = [
    { x: 90, y: 45 }, { x: 50, y: 75 }, { x: 130, y: 75 },
    { x: 40, y: 115 }, { x: 90, y: 105 }, { x: 140, y: 115 },
    { x: 70, y: 145 }, { x: 110, y: 145 },
  ];
  const links = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [4, 7], [5, 7]];
  return (
    <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
      {links.map(([a, b], i) => (
        <motion.line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="rgba(201,168,76,0.3)" strokeWidth="1" strokeDasharray="4 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }} />
      ))}
      {nodes.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r={i < 3 ? 8 : 6} stroke={i % 2 === 0 ? GOLD : NAVY} strokeWidth="2" fill={i === 0 || i === 4 ? GOLD : "none"} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.08, type: "spring" }} />
      ))}
    </svg>
  );
}

function IconConnect() {
  return (
    <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
      {/* Satellite */}
      <motion.circle cx={90} cy={90} r={8} fill={GOLD} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }} />
      {/* Signal arcs */}
      {[30, 50, 70].map((r, i) => (
        <motion.circle key={r} cx={90} cy={90} r={r} stroke={i % 2 === 0 ? GOLD : NAVY} strokeWidth="1.5" strokeDasharray="8 6" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 - i * 0.25 }} transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }} />
      ))}
      {/* Signal dots */}
      {[[55, 60], [125, 60], [50, 125], [130, 125]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r={4} fill={SKY} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.7 }} transition={{ delay: 0.8 + i * 0.12, type: "spring" }} />
      ))}
    </svg>
  );
}

function IconSecure() {
  return (
    <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
      {/* Shield */}
      <motion.path d="M90 30 L140 55 L140 105 Q140 140 90 160 Q40 140 40 105 L40 55 Z" stroke={NAVY} strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
      {/* Inner shield */}
      <motion.path d="M90 50 L125 67 L125 100 Q125 125 90 140 Q55 125 55 100 L55 67 Z" stroke={GOLD} strokeWidth="1.5" strokeDasharray="6 4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.5 }} />
      {/* Lock */}
      <motion.rect x={78} y={88} width={24} height={20} rx={4} stroke={GOLD} strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.8 }} />
      <motion.path d="M83 88 L83 78 Q83 70 90 70 Q97 70 97 78 L97 88" stroke={GOLD} strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 1 }} />
      <motion.circle cx={90} cy={99} r={2.5} fill={GOLD} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.3 }} />
    </svg>
  );
}

function IconFinance() {
  const bars = [
    { x: 40, h: 55 }, { x: 65, h: 85 }, { x: 90, h: 65 },
    { x: 115, h: 100 }, { x: 140, h: 75 },
  ];
  return (
    <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
      {/* Bars */}
      {bars.map((b, i) => (
        <motion.rect key={i} x={b.x - 8} y={150 - b.h} width={16} height={b.h} rx={3} fill={i === 3 ? GOLD : "none"} stroke={i === 3 ? GOLD : NAVY} strokeWidth="1.5" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ transformOrigin: `${b.x}px 150px` }} transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: EASE }} />
      ))}
      {/* Trend line */}
      <motion.path d="M40 115 L65 80 L90 95 L115 50 L140 70" stroke={SKY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.8 }} />
      {/* Baseline */}
      <motion.line x1={30} y1={153} x2={150} y2={153} stroke={NAVY} strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
    </svg>
  );
}

function IconSante() {
  return (
    <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
      {/* Heart */}
      <motion.path d="M90 140 Q40 105 40 70 Q40 45 65 45 Q80 45 90 60 Q100 45 115 45 Q140 45 140 70 Q140 105 90 140 Z" stroke={NAVY} strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
      {/* Pulse line */}
      <motion.path d="M30 90 L65 90 L75 60 L85 115 L95 75 L105 100 L115 90 L150 90" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.6 }} />
      {/* Pulse dot */}
      <motion.circle cx={150} cy={90} r={3} fill={GOLD} initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ delay: 1.4, duration: 0.4 }} />
    </svg>
  );
}

function IconAgri() {
  return (
    <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
      {/* Stem */}
      <motion.path d="M90 155 L90 75" stroke={NAVY} strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
      {/* Right leaf */}
      <motion.path d="M90 95 Q130 70 140 40 Q110 60 90 95 Z" stroke={GOLD} strokeWidth="1.5" fill="rgba(201,168,76,0.12)" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }} />
      {/* Left leaf */}
      <motion.path d="M90 115 Q50 90 40 60 Q70 80 90 115 Z" stroke={NAVY} strokeWidth="1.5" fill="rgba(26,26,46,0.08)" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.7, delay: 0.6 }} />
      {/* Leaf veins */}
      <motion.path d="M90 95 Q115 75 125 55" stroke={GOLD} strokeWidth="1" strokeDasharray="3 3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.9 }} />
      {/* Growth dots */}
      {[[70, 145], [55, 130], [130, 140], [115, 150]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r={2.5} fill={SKY} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * 0.1, type: "spring" }} />
      ))}
    </svg>
  );
}

const ICONS = [IconGov, IconWeb, IconIA, IconConnect, IconSecure, IconFinance, IconSante, IconAgri];

/* ── Domain data ─────────────────────────────── */
interface Domaine {
  id: string;
  pill: string;
  tag: string;
  headline: string;
  description: string;
  interventions: string[];
}

const domaines: Domaine[] = [
  {
    id: "gouvernement",
    pill: "Gov. & Institutions",
    tag: "Gouvernement · Ambassades · Ministères",
    headline: "Digitaliser les institutions d'État",
    description: "Conception et déploiement de portails officiels, sites d'ambassades, intranets ministériels et plateformes institutionnelles.",
    interventions: ["Sites officiels de ministères", "Portails citoyens et guichets numériques", "Intranets sécurisés"],
  },
  {
    id: "web-mobile",
    pill: "Web & Mobile",
    tag: "Web · Mobile · PME & Entreprises",
    headline: "Des applications taillées pour vos enjeux",
    description: "Développement d'applications web et mobiles sur mesure pour PME, grands groupes et organisations internationales.",
    interventions: ["Applications web SaaS et plateformes métier", "Applications mobiles iOS et Android", "Back-office et tableaux de bord"],
  },
  {
    id: "ia",
    pill: "Intelligence Artificielle",
    tag: "IA · Machine Learning · Automatisation",
    headline: "Des intelligences artificielles sur mesure",
    description: "Développement, entraînement et intégration de modèles IA adaptés à vos données et vos processus.",
    interventions: ["Développement de modèles IA", "Chatbots et assistants virtuels", "Analyse prédictive et aide à la décision"],
  },
  {
    id: "connectivite",
    pill: "Connectivité",
    tag: "Starlink · WiFi Hotspot · Infrastructure",
    headline: "Connecter les zones isolées",
    description: "Déploiement de points relais WiFi communautaires via Starlink, accès internet par paiement mobile.",
    interventions: ["Infrastructure Starlink et points relais", "Hotspots communautaires (Mobile Money)", "Couverture réseau zones rurales"],
  },
  {
    id: "securite",
    pill: "Com. Sécurisée",
    tag: "VPN · Chiffrement · Liaison inter-institutions",
    headline: "Des canaux de communication inviolables",
    description: "Mise en place de canaux sécurisés et chiffrés pour la liaison entre institutions et ambassades.",
    interventions: ["VPN diplomatiques et tunnels chiffrés", "Messagerie sécurisée inter-institutions", "Audit de sécurité et conformité"],
  },
  {
    id: "erp",
    pill: "ERP & Systèmes",
    tag: "ERP · Intégration · Solutions clés en main",
    headline: "Des systèmes intégrés au service de la performance",
    description: "Déploiement et intégration de solutions ERP, bases de données et outils d'évaluation pour entreprises et institutions publiques.",
    interventions: ["Intégration ERP et solutions clés en main", "Bases de données et systèmes d'information d'État", "Tableaux de bord statistiques et outils d'évaluation"],
  },
  {
    id: "sante",
    pill: "Santé Digitale",
    tag: "SIH · Télémédecine · e-Santé",
    headline: "Digitaliser les systèmes de santé",
    description: "Logiciels de gestion hospitalière, dossier patient numérique et plateformes de télémédecine.",
    interventions: ["Systèmes d'information hospitaliers", "Dossier patient et télémédecine", "Dashboards épidémiologiques"],
  },
  {
    id: "agriculture",
    pill: "AgriTech",
    tag: "AgriTech · Traçabilité · Applications mobiles",
    headline: "Connecter l'agriculture à la technologie",
    description: "Développement de plateformes AgriTech, systèmes de traçabilité et outils de gestion pour coopératives.",
    interventions: ["Mise en relation agriculteurs et marchés", "Traçabilité des filières", "Applications de gestion des cultures"],
  },
];

/* ── Active Card Content — layout horizontal (icon left + content right) ── */
function ActiveCard({ d, iconIndex }: { d: Domaine; iconIndex: number }) {
  const Icon = ICONS[iconIndex];
  return (
    <div className="h-full flex flex-col lg:flex-row p-6 md:p-8 lg:p-10 overflow-y-auto">

      {/* Icon zone — plus petit sur mobile, taille normale sur desktop */}
      <div
        className="flex-shrink-0 flex items-center justify-center
                   mx-auto mb-4
                   lg:mx-0 lg:mb-0 lg:mr-10"
        style={{ width: "clamp(80px, 20vw, 140px)", height: "clamp(80px, 20vw, 140px)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={d.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <Icon />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content — right on desktop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={d.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.42, ease: EASE }}
          className="flex-1 flex flex-col min-w-0"
        >
          <p
            className="text-[10px] uppercase tracking-[0.24em] font-bold mb-2"
            style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
          >
            {d.tag}
          </p>
          <h3
            className="text-xl md:text-2xl lg:text-[28px] font-black leading-tight mb-3"
            style={{ fontFamily: "var(--font-montserrat)", color: "#0D0D0D" }}
          >
            {d.headline}
          </h3>
          <p
            className="text-sm leading-relaxed mb-5"
            style={{ color: "rgba(13,13,13,0.52)", fontFamily: "var(--font-inter)" }}
          >
            {d.description}
          </p>
          <ul className="space-y-2 mb-6">
            {d.interventions.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.28 }}
                className="flex items-start gap-2 text-sm"
                style={{ color: "rgba(13,13,13,0.65)", fontFamily: "var(--font-inter)" }}
              >
                <CheckCircle2 size={13} strokeWidth={2} style={{ color: GOLD, flexShrink: 0, marginTop: 2 }} />
                {item}
              </motion.li>
            ))}
          </ul>
          <Link
            href="/secteurs"
            className="inline-flex items-center gap-2 self-start text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:gap-3 mt-auto"
            style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
          >
            En savoir plus
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Pill Label (vertical text) ───────────────── */
function PillLabel({ label, isHovered }: { label: string; isHovered: boolean }) {
  return (
    <div className="h-full flex items-center justify-center overflow-hidden">
      <span
        className="text-[12px] font-semibold tracking-wide whitespace-nowrap transition-colors duration-300"
        style={{
          writingMode: "vertical-lr",
          transform: "rotate(180deg)",
          fontFamily: "var(--font-inter)",
          color: isHovered ? GOLD : "rgba(13,13,13,0.45)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Main Section ─────────────────────────────── */
export default function DomainesSection() {
  const [active, setActive] = useState(0);
  const [hoveredPill, setHoveredPill] = useState<number | null>(null);
  const pausedUntilRef = useRef(0);

  /* Auto-advance */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const tryAdvance = () => {
      const now = Date.now();
      if (now < pausedUntilRef.current) {
        t = setTimeout(tryAdvance, pausedUntilRef.current - now + 80);
      } else {
        setActive((p) => (p + 1) % domaines.length);
      }
    };
    t = setTimeout(tryAdvance, AUTO_DELAY);
    return () => clearTimeout(t);
  }, [active]);

  const select = useCallback((i: number) => {
    pausedUntilRef.current = Date.now() + MANUAL_PAUSE;
    setActive(i);
  }, []);

  /* Touch swipe for mobile */
  const touchX = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(dx) > 50) {
        const next = dx < 0
          ? (active + 1) % domaines.length
          : (active - 1 + domaines.length) % domaines.length;
        select(next);
      }
    },
    [active, select]
  );

  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: "#F5F5F0" }}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p
            className="text-[11px] uppercase tracking-[0.28em] font-bold mb-4"
            style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
          >
            Domaines d&apos;expertise
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight max-w-3xl"
            style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
          >
            Ce que nous savons faire
          </h2>
        </motion.div>

        {/* ═══ DESKTOP: BCG X sliding tabs ═══ */}
        <div className="hidden lg:flex gap-1.5" style={{ height: 520 }}>
          {domaines.map((d, i) => {
            const isActive = i === active;
            return (
              <div
                key={d.id}
                onClick={() => !isActive && select(i)}
                onMouseEnter={() => !isActive && setHoveredPill(i)}
                onMouseLeave={() => setHoveredPill(null)}
                className="overflow-hidden rounded-2xl"
                style={{
                  flexGrow: isActive ? 1 : 0,
                  flexShrink: 0,
                  flexBasis: isActive ? 0 : PILL_W,
                  minWidth: isActive ? 0 : PILL_W,
                  border: isActive ? CARD_BORDER : `1px solid ${hoveredPill === i ? GOLD_BORDER : "rgba(0,0,0,0.08)"}`,
                  backgroundColor: isActive ? "#FFFFFF" : hoveredPill === i ? "rgba(201,168,76,0.06)" : "rgba(255,255,255,0.5)",
                  cursor: isActive ? "default" : "pointer",
                  transition: `flex-grow 0.55s cubic-bezier(${EASE.join(",")}), flex-basis 0.55s cubic-bezier(${EASE.join(",")}), border-color 0.3s, background-color 0.3s`,
                }}
              >
                {isActive ? (
                  <ActiveCard d={d} iconIndex={i} />
                ) : (
                  <PillLabel label={d.pill} isHovered={hoveredPill === i} />
                )}
              </div>
            );
          })}
        </div>

        {/* ═══ MOBILE: horizontal scroll tabs + card ═══ */}
        <div className="lg:hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {/* Horizontal scrollable pills */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide" style={{ WebkitOverflowScrolling: "touch" }}>
            {domaines.map((d, i) => (
              <button
                key={d.id}
                onClick={() => select(i)}
                className="flex-shrink-0 px-4 py-2.5 rounded-full text-[12px] font-semibold tracking-wide whitespace-nowrap transition-all duration-300"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: i === active ? GOLD : "rgba(255,255,255,0.8)",
                  color: i === active ? "#0D0D0D" : "rgba(13,13,13,0.45)",
                  border: `1px solid ${i === active ? GOLD : "rgba(0,0,0,0.08)"}`,
                }}
              >
                {d.pill}
              </button>
            ))}
          </div>

          {/* Active card — mobile : hauteur fixe pour éviter le layout shift lors du changement d'onglet */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: CARD_BORDER, backgroundColor: "#FFFFFF", minHeight: 420, overflowY: "auto" }}
          >
            <ActiveCard d={domaines[active]} iconIndex={active} />
          </div>
        </div>

      </div>
    </section>
  );
}
