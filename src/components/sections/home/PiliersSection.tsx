"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Crosshair,
  Landmark,
  Users,
  Target,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import MobilePiliersCarousel from "./MobilePiliersCarousel";

const LottiePlayer = dynamic(() => import("@/components/shared/LottiePlayer"), {
  ssr: false,
  loading: () => <div className="w-full h-full" style={{ minHeight: 100 }} />,
});

/* ─── Data ──────────────────────────────────────────────── */
const piliers = [
  {
    num: "01",
    label: "Viabilité",
    titre: "L'ingénierie de la viabilité",
    texte:
      "Audit, reconfiguration et fiabilisation de l'architecture technique et financière de vos projets pour les rendre bancables.",
    icon: ShieldCheck,
  },
  {
    num: "02",
    label: "Exécution",
    titre: "Le pilotage absolu du risque",
    texte:
      "Du premier jalon à la livraison finale, nous garantissons délais, maîtrise budgétaire et conformité terrain.",
    icon: Crosshair,
  },
  {
    num: "03",
    label: "Financement",
    titre: "Mobiliser le capital stratégique",
    texte:
      "Accès privilégié aux bailleurs multilatéraux et fonds privés grâce à des montages financiers innovants et dé-risqués.",
    icon: Landmark,
  },
  {
    num: "04",
    label: "Gouvernance",
    titre: "Pérenniser la gouvernance locale",
    texte:
      "Transfert de compétences aux administrations africaines pour une souveraineté durable sur leurs projets.",
    icon: Users,
  },
  {
    num: "05",
    label: "Impact",
    titre: "Mesure de l'impact socio-économique",
    texte:
      "Évaluation continue des retombées pour garantir un développement durable et inclusif des populations locales.",
    icon: Target,
  },
];

const liens = [
  {
    label: "Notre mission",
    desc: "Créer un impact mesurable sur le développement durable en Afrique.",
    href: "/a-propos",
  },
  {
    label: "Notre approche",
    desc: "Une méthodologie éprouvée alliant rigueur technique et ancrage local.",
    href: "/a-propos",
  },
  {
    label: "Nos valeurs",
    desc: "Excellence, intégrité et engagement au service du continent africain.",
    href: "/a-propos",
  },
];

/* ─── Tokens ─────────────────────────────────────────────── */
const G = "#C9A84C";
const G30 = "rgba(201,168,76,0.30)";
const G10 = "rgba(201,168,76,0.08)";
const TXT = "rgba(13,13,13,0.55)";  // labels SVG on white bg
const TXT_DARK = "#0D0D0D";

const SKY = "#38BDF8";
const SKY_GLOW = "rgba(56,189,248,0.15)";
const SKY_SOFT = "rgba(56,189,248,0.25)";

/* ─── Orbit constants ──────────────────────────────────── */
const ORB = 460;
const CTR = ORB / 2;
const R = 165;
const LOGO = 120;
const ITEM = 56;

/*
  Queue layout: elements are grouped together in a ~120° arc
  starting from the right (0°). The active element is at position 0 (3 o'clock).
  The others follow behind with ~28° spacing — like people in a queue.
*/
const QUEUE_SPACING = 42; // degrees between items in queue
const QUEUE_START = -40;  // active item angle (slightly below 3 o'clock)

function queueAngle(relIndex: number) {
  // relIndex 0 = active (front of queue), 1 = next behind, etc.
  return QUEUE_START - relIndex * QUEUE_SPACING;
}

function orbXY(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CTR + Math.cos(rad) * R, y: CTR + Math.sin(rad) * R };
}

/* ────────────────────────────────────────────────────────────
   SVG — Exécution (labels only, no segment marks)
──────────────────────────────────────────────────────────── */
function VizExecution() {
  const Y = 108;
  const ms = [
    { x: 40, label: "Cadrage", big: true },
    { x: 140, label: "Lancement", big: false },
    { x: 240, label: "Exécution", big: false },
    { x: 340, label: "Livraison", big: true },
  ];
  return (
    <svg
      viewBox="0 0 380 195"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Thin connecting line between milestones */}
      <motion.line
        x1={40}
        y1={Y}
        x2={340}
        y2={Y}
        stroke="rgba(201,168,76,0.18)"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Budget envelope curve */}
      <motion.path
        d="M40 158 Q190 136 340 158"
        stroke={G30}
        strokeWidth="1.2"
        strokeDasharray="5 3"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      />
      <motion.text
        x="190"
        y="178"
        textAnchor="middle"
        fontSize="8"
        fill={TXT}
        fontFamily="var(--font-inter)"
        letterSpacing="0.14em"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        ENVELOPPE BUDGÉTAIRE
      </motion.text>

      {/* Milestone circles */}
      {ms.map((m, i) => (
        <motion.circle
          key={m.x}
          cx={m.x}
          cy={Y}
          r={m.big ? 13 : 9}
          fill={G}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.3 + i * 0.2,
            duration: 0.35,
            type: "spring",
          }}
        />
      ))}

      {/* Checkmarks */}
      {ms.map((m, i) => {
        const r = m.big ? 5 : 4;
        return (
          <motion.path
            key={m.x + "ck"}
            d={`M${m.x - r} ${Y} L${m.x - r / 4} ${Y + r * 0.7} L${m.x + r} ${Y - r * 1.4}`}
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.55 + i * 0.2, duration: 0.35 }}
          />
        );
      })}

      {/* Labels above milestones only */}
      {ms.map((m) => (
        <motion.text
          key={m.label}
          x={m.x}
          y={Y - 24}
          textAnchor="middle"
          fontSize="9"
          fill={TXT}
          fontFamily="var(--font-inter)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {m.label}
        </motion.text>
      ))}
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
   SVG — Gouvernance (Entreprise, pas Région)
──────────────────────────────────────────────────────────── */
function VizGouvernance() {
  const cx = 155;
  const cy = 125;
  const nodes = [
    { x: 72, y: 58, label: "Ministères" },
    { x: 248, y: 58, label: "Institutions" },
    { x: 268, y: 170, label: "Entreprise" },
    { x: 58, y: 185, label: "Mairies" },
    { x: 160, y: 215, label: "Agences" },
  ];
  return (
    <svg viewBox="0 0 320 255" fill="none" className="w-full h-full">
      <motion.circle
        cx={cx} cy={cy} r="46"
        stroke={G30} strokeWidth="1" fill="none" strokeDasharray="6 3"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      />
      {nodes.map((n, i) => (
        <motion.line
          key={i}
          x1={cx} y1={cy} x2={n.x} y2={n.y}
          stroke={G30} strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y} r="13"
          fill={G10} stroke={G} strokeWidth="1.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.25 + i * 0.1, duration: 0.4, type: "spring" }}
        />
      ))}
      <motion.circle
        cx={cx} cy={cy} r="24"
        fill={G}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
      />
      <motion.text
        x={cx} y={cy + 4} textAnchor="middle"
        fontSize="10" fill="#FFFFFF"
        fontFamily="var(--font-montserrat)" fontWeight="800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        GIRA
      </motion.text>
      {nodes.map((n, i) => (
        <motion.text
          key={i}
          x={n.x} y={n.y + 25} textAnchor="middle"
          fontSize="8" fill={TXT} fontFamily="var(--font-inter)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.08 }}
        >
          {n.label}
        </motion.text>
      ))}
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
   Visuel droit par pilier
──────────────────────────────────────────────────────────── */
function PilierViz({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <LottiePlayer
          src="/viabilite.lottie"
          style={{ width: "100%", height: "100%" }}
        />
      );
    case 1:
      return (
        <div className="flex flex-col w-full h-full gap-1">
          <div style={{ height: "130px", flexShrink: 0 }}>
            <LottiePlayer
              src="/execution.lottie"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="flex-1 min-h-0">
            <VizExecution />
          </div>
        </div>
      );
    case 2:
      return (
        <LottiePlayer
          src="/finance.lottie"
          style={{ width: "100%", height: "100%" }}
        />
      );
    case 3:
      return (
        <div className="flex gap-3 w-full h-full">
          <div className="w-1/2">
            <LottiePlayer
              src="/Gouvernance.lottie"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="w-1/2">
            <VizGouvernance />
          </div>
        </div>
      );
    case 4:
      return (
        <LottiePlayer
          src="/viabilite.lottie"
          style={{ width: "100%", height: "100%" }}
        />
      );
    default:
      return null;
  }
}

/* ────────────────────────────────────────────────────────────
   Orbite — Queue layout + Soft glow/fog effects

   - GIRA logo: static soft glow (torch/fog effect, NO pulsation)
   - Active item: soft illumination/fog (NO trembling rings)
   - Items follow each other in a queue arc, not spread around circle
   - Transitions are slow and smooth
──────────────────────────────────────────────────────────── */
function OrbitPanel({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div
      className="relative mx-auto flex-shrink-0"
      style={{ width: ORB, height: ORB }}
    >
      {/* ── Arc path (subtle dashed) ── */}
      <svg
        viewBox={`0 0 ${ORB} ${ORB}`}
        className="absolute inset-0"
        style={{ width: ORB, height: ORB }}
      >
        {/* Main orbit ring */}
        <circle
          cx={CTR}
          cy={CTR}
          r={R}
          stroke="rgba(56,189,248,0.18)"
          strokeWidth="1"
          strokeDasharray="6 4"
          fill="none"
        />
        {/* Inner decorative ring */}
        <circle
          cx={CTR}
          cy={CTR}
          r={R * 0.45}
          stroke="rgba(56,189,248,0.08)"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>

      {/* ── GIRA Logo center — STATIC soft glow (torch/fog effect) ── */}
      <div
        className="absolute"
        style={{
          left: CTR - LOGO / 2,
          top: CTR - LOGO / 2,
          width: LOGO,
          height: LOGO,
          zIndex: 3,
        }}
      >
        {/* Outer fog layer — static, no animation */}
        <div
          className="absolute rounded-full"
          style={{
            inset: -20,
            background: `radial-gradient(circle, ${SKY_GLOW} 0%, rgba(56,189,248,0.06) 50%, transparent 70%)`,
            filter: "blur(8px)",
          }}
        />
        {/* Inner glow ring — static */}
        <div
          className="absolute rounded-full"
          style={{
            inset: -6,
            background: `radial-gradient(circle, ${SKY_SOFT} 0%, transparent 60%)`,
            filter: "blur(3px)",
          }}
        />
        {/* Border ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: -3,
            border: `1.5px solid rgba(56,189,248,0.30)`,
          }}
        />
        {/* Logo container */}
        <div
          className="relative w-full h-full rounded-full overflow-hidden"
          style={{
            background: "#FFFFFF",
            border: `2px solid rgba(56,189,248,0.40)`,
            boxShadow: `0 0 30px ${SKY_GLOW}, 0 0 60px rgba(56,189,248,0.06)`,
          }}
        >
          <Image
            src="/logoGIRA.png"
            alt="GIRA"
            fill
            className="object-contain p-3"
            sizes="120px"
            priority
          />
        </div>
      </div>

      {/* ── Orbit items — queue arrangement ── */}
      {piliers.map((p, i) => {
        const rel = (i - active + piliers.length) % piliers.length;
        const angle = queueAngle(rel);
        const pos = orbXY(angle);
        const Icon = p.icon;
        const isActive = rel === 0;
        // Items further back in queue are progressively dimmer
        const dimFactor = Math.max(0.2, 1 - rel * 0.18);

        return (
          <motion.div
            key={p.num}
            animate={{
              left: pos.x - ITEM / 2,
              top: pos.y - ITEM / 2,
              opacity: dimFactor,
            }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute z-10"
            style={{ width: ITEM, height: ITEM }}
          >
            {/* Soft illumination for active item — static glow, NOT pulsating rings */}
            {isActive && (
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: -16,
                  background: `radial-gradient(circle, ${SKY_SOFT} 0%, rgba(56,189,248,0.08) 55%, transparent 75%)`,
                  filter: "blur(6px)",
                }}
              />
            )}

            {/* Icon button */}
            <button
              onClick={() => onSelect(i)}
              className="relative w-full h-full flex items-center justify-center cursor-pointer rounded-full"
              style={{
                background: isActive
                  ? "rgba(56,189,248,0.12)"
                  : "rgba(255,255,255,0.95)",
                border: isActive
                  ? `2px solid rgba(56,189,248,0.55)`
                  : `1.5px solid rgba(0,0,0,0.10)`,
                boxShadow: isActive
                  ? `0 0 20px ${SKY_GLOW}, 0 0 40px rgba(56,189,248,0.06)`
                  : "none",
                transition: "background 0.8s, border 0.8s, box-shadow 0.8s",
                zIndex: 4,
              }}
            >
              <Icon
                size={22}
                strokeWidth={1.6}
                style={{
                  color: isActive ? SKY : `rgba(13,13,13,${0.25 + dimFactor * 0.25})`,
                  transition: "color 0.8s",
                }}
              />
            </button>

            {/* Label */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                bottom: -22,
                transform: "translateX(-50%)",
                fontSize: "10px",
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                textAlign: "center",
                color: isActive ? SKY : `rgba(13,13,13,${dimFactor * 0.4})`,
                transition: "color 0.8s",
                whiteSpace: "nowrap",
                zIndex: 4,
              }}
            >
              {p.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Slide variants — SLOWER transitions
──────────────────────────────────────────────────────────── */
const EASE_IN: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_OUT: [number, number, number, number] = [0.55, 0, 1, 0.45];

const slideVariants = {
  enter: {
    x: "80%",
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { duration: 0.9, ease: EASE_IN },
      opacity: { duration: 0.5 },
    },
  },
  exit: {
    x: "-65%",
    opacity: 0,
    transition: {
      x: { duration: 0.7, ease: EASE_OUT },
      opacity: { duration: 0.6 },
    },
  },
};

/* ────────────────────────────────────────────────────────────
   PiliersSection — composant principal
──────────────────────────────────────────────────────────── */
export default function PiliersSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % piliers.length);
    }, 6000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleSelect = (i: number) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
    startTimer();
  };

  const handleSwipe = useCallback((dir: 1 | -1) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + piliers.length) % piliers.length);
    startTimer();
  }, [startTimer]);

  return (
    <>
      {/* BLOC 1 — Section interactive */}
      <section className="py-20 md:py-32" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <p
              className="text-xs uppercase tracking-[0.28em] font-semibold mb-4"
              style={{ color: G, fontFamily: "var(--font-inter)" }}
            >
              Notre différence
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-[52px] font-black leading-tight"
              style={{ fontFamily: "var(--font-montserrat)", color: TXT_DARK }}
            >
              Nous changeons le narratif
              <br className="hidden md:block" />
              en passant à{" "}
              <span
                style={{
                  background:
                    "linear-gradient(transparent 54%, rgba(201,168,76,0.45) 54%)",
                }}
              >
                l&apos;exécution
              </span>
            </h2>
          </motion.div>

          {/* ═══ MOBILE: Mini-orbite + Carousel swipeable ═══ */}
          <div className="lg:hidden">
            <MobilePiliersCarousel
              active={active}
              direction={direction}
              onSelect={handleSelect}
              onSwipe={handleSwipe}
            />
          </div>

          {/* ═══ DESKTOP: Orbit + Sliding content (inchangé) ═══ */}
          <div className="hidden lg:flex items-center gap-0">
            {/* LEFT: orbit */}
            <div
              className="w-[46%]"
              style={{ position: "relative", zIndex: 5 }}
            >
              <div className="flex justify-center">
                <OrbitPanel active={active} onSelect={handleSelect} />
              </div>
            </div>

            {/* RIGHT: sliding content */}
            <div
              className="w-[54%] pl-10"
              style={{
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col"
                >
                  {/* Visual zone (Lottie / SVG) */}
                  <div
                    style={{
                      width: "100%",
                      height: active === 1 ? "330px" : "280px",
                    }}
                  >
                    <PilierViz index={active} />
                  </div>

                  {/* Text with gold left border */}
                  <div
                    className="mt-8 pl-8"
                    style={{ borderLeft: `3px solid ${G}` }}
                  >
                    <span
                      className="text-[10px] uppercase tracking-[0.28em] font-bold block mb-2"
                      style={{ color: G, fontFamily: "var(--font-inter)" }}
                    >
                      {piliers[active].label}
                    </span>
                    <h3
                      className="text-2xl lg:text-[26px] font-black mb-3 leading-snug"
                      style={{ fontFamily: "var(--font-montserrat)", color: TXT_DARK }}
                    >
                      {piliers[active].titre}
                    </h3>
                    <p
                      className="text-base leading-relaxed"
                      style={{
                        color: "rgba(13,13,13,0.55)",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {piliers[active].texte}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* BLOC 2 — Nous connaître (white background) */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-24">
            {/* Circular photo */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="relative flex-shrink-0 mx-auto md:mx-0"
              style={{ width: 300, height: 300 }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  top: -12,
                  left: -12,
                  width: "calc(100% + 24px)",
                  height: "calc(100% + 24px)",
                  border: "1.5px solid rgba(201,168,76,0.25)",
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  top: -5,
                  left: -5,
                  width: "calc(100% + 10px)",
                  height: "calc(100% + 10px)",
                  border: "2px solid rgba(201,168,76,0.45)",
                }}
              />
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
                  alt="Équipe GIRA en réunion stratégique"
                  fill
                  className="object-cover"
                  sizes="300px"
                  unoptimized
                />
              </div>
            </motion.div>

            {/* Text + links + CTA */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="flex-1 text-center md:text-left"
            >
              <p
                className="text-xs uppercase tracking-[0.28em] font-semibold mb-4"
                style={{ color: G, fontFamily: "var(--font-inter)" }}
              >
                Notre identité
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 leading-tight"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: "#0D0D0D",
                }}
              >
                Nous{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(transparent 54%, rgba(201,168,76,0.35) 54%)",
                  }}
                >
                  connaître
                </span>
              </h2>
              <p
                className="text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0"
                style={{ color: "#666", fontFamily: "var(--font-inter)" }}
              >
                GIRA est un cabinet d&apos;exécution basé à Paris, engagé aux
                côtés des gouvernements africains, des institutions
                internationales et des investisseurs pour structurer, financer
                et piloter des projets à fort impact.
              </p>

              <div className="flex flex-col gap-0 mb-9 border-t border-black/[0.06]">
                {liens.map((lien, i) => (
                  <motion.div
                    key={lien.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.09 }}
                  >
                    <Link
                      href={lien.href}
                      className="flex items-start gap-4 py-4 border-b border-black/[0.06] group"
                    >
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                        style={{
                          backgroundColor: "rgba(201,168,76,0.10)",
                        }}
                      >
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                          style={{ color: G }}
                        />
                      </div>
                      <div className="text-left">
                        <p
                          className="text-sm font-bold mb-0.5 group-hover:text-[#C9A84C] transition-colors duration-200"
                          style={{
                            color: "#0D0D0D",
                            fontFamily: "var(--font-montserrat)",
                          }}
                        >
                          {lien.label}
                        </p>
                        <p
                          className="text-xs leading-relaxed"
                          style={{
                            color: "#888",
                            fontFamily: "var(--font-inter)",
                          }}
                        >
                          {lien.desc}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/a-propos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: G,
                  color: "#0D0D0D",
                  fontFamily: "var(--font-inter)",
                }}
              >
                En savoir plus
                <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
