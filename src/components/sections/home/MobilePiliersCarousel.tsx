"use client";

import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import {
  ShieldCheck,
  Crosshair,
  Landmark,
  Users,
  Target,
  MoveHorizontal,
} from "lucide-react";
import { useRef, useCallback } from "react";
import dynamic from "next/dynamic";

const LottiePlayer = dynamic(() => import("@/components/shared/LottiePlayer"), {
  ssr: false,
  loading: () => <div className="w-full h-full" style={{ minHeight: 80 }} />,
});

/* ─── Shared data (must match PiliersSection) ────────── */
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

/* ─── Tokens ─────────────────────────────────────────── */
const G = "#C9A84C";
const SKY = "#38BDF8";
const SKY_GLOW = "rgba(56,189,248,0.15)";
const SKY_SOFT = "rgba(56,189,248,0.25)";
const TXT_DARK = "#0D0D0D";

/* ─── Mini-orbit constants ───────────────────────────── */
const ORB_M = 280;
const CTR_M = ORB_M / 2;
const R_M = 100;
const LOGO_M = 72;
const ITEM_M = 42;
const QUEUE_SPACING = 42;
const QUEUE_START = -40;

function queueAngle(relIndex: number) {
  return QUEUE_START - relIndex * QUEUE_SPACING;
}

function orbXY(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CTR_M + Math.cos(rad) * R_M, y: CTR_M + Math.sin(rad) * R_M };
}

/* ─── SVG Execution (simplified for mobile) ──────────── */
function VizExecutionMobile() {
  const Y = 68;
  const ms = [
    { x: 30, label: "Cadrage" },
    { x: 105, label: "Lancement" },
    { x: 180, label: "Exécution" },
    { x: 255, label: "Livraison" },
  ];
  return (
    <svg viewBox="0 0 285 110" fill="none" className="w-full h-full">
      <motion.line
        x1={30} y1={Y} x2={255} y2={Y}
        stroke="rgba(201,168,76,0.18)" strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      {ms.map((m, i) => (
        <motion.circle
          key={m.x}
          cx={m.x} cy={Y} r={10}
          fill={G}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 + i * 0.15, duration: 0.3, type: "spring" }}
        />
      ))}
      {ms.map((m, i) => (
        <motion.path
          key={m.x + "ck"}
          d={`M${m.x - 4} ${Y} L${m.x - 1} ${Y + 3} L${m.x + 4} ${Y - 5}`}
          stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4 + i * 0.15, duration: 0.3 }}
        />
      ))}
      {ms.map((m) => (
        <motion.text
          key={m.label}
          x={m.x} y={Y - 18}
          textAnchor="middle" fontSize="8"
          fill="rgba(13,13,13,0.55)"
          fontFamily="var(--font-inter)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {m.label}
        </motion.text>
      ))}
    </svg>
  );
}

/* ─── Mobile PilierViz ───────────────────────────────── */
function MobilePilierViz({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <LottiePlayer src="/viabilite.lottie" style={{ width: "100%", height: "100%" }} />;
    case 1:
      return (
        <div className="flex flex-col w-full h-full gap-1">
          <div style={{ height: "100px", flexShrink: 0 }}>
            <LottiePlayer src="/execution.lottie" style={{ width: "100%", height: "100%" }} />
          </div>
          <div className="flex-1 min-h-0">
            <VizExecutionMobile />
          </div>
        </div>
      );
    case 2:
      return <LottiePlayer src="/finance.lottie" style={{ width: "100%", height: "100%" }} />;
    case 3:
      return <LottiePlayer src="/Gouvernance.lottie" style={{ width: "100%", height: "100%" }} />;
    case 4:
      return <LottiePlayer src="/viabilite.lottie" style={{ width: "100%", height: "100%" }} />;
    default:
      return null;
  }
}

/* ─── Mini Orbit ─────────────────────────────────────── */
function MiniOrbit({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div
      className="relative mx-auto flex-shrink-0"
      style={{ width: ORB_M, height: ORB_M }}
    >
      {/* Orbit rings */}
      <svg
        viewBox={`0 0 ${ORB_M} ${ORB_M}`}
        className="absolute inset-0"
        style={{ width: ORB_M, height: ORB_M }}
      >
        <circle
          cx={CTR_M} cy={CTR_M} r={R_M}
          stroke="rgba(56,189,248,0.18)"
          strokeWidth="1" strokeDasharray="5 3" fill="none"
        />
        <circle
          cx={CTR_M} cy={CTR_M} r={R_M * 0.42}
          stroke="rgba(56,189,248,0.08)"
          strokeWidth="0.6" fill="none"
        />
      </svg>

      {/* GIRA Logo center */}
      <div
        className="absolute"
        style={{
          left: CTR_M - LOGO_M / 2,
          top: CTR_M - LOGO_M / 2,
          width: LOGO_M,
          height: LOGO_M,
          zIndex: 3,
        }}
      >
        {/* Outer fog */}
        <div
          className="absolute rounded-full"
          style={{
            inset: -14,
            background: `radial-gradient(circle, ${SKY_GLOW} 0%, rgba(56,189,248,0.06) 50%, transparent 70%)`,
            filter: "blur(6px)",
          }}
        />
        {/* Inner glow */}
        <div
          className="absolute rounded-full"
          style={{
            inset: -4,
            background: `radial-gradient(circle, ${SKY_SOFT} 0%, transparent 60%)`,
            filter: "blur(2px)",
          }}
        />
        {/* Border */}
        <div
          className="absolute rounded-full"
          style={{ inset: -2, border: "1.5px solid rgba(56,189,248,0.30)" }}
        />
        {/* Logo */}
        <div
          className="relative w-full h-full rounded-full overflow-hidden"
          style={{
            background: "#FFFFFF",
            border: "2px solid rgba(56,189,248,0.40)",
            boxShadow: `0 0 20px ${SKY_GLOW}, 0 0 40px rgba(56,189,248,0.06)`,
          }}
        >
          <Image
            src="/logoGIRA.png"
            alt="GIRA"
            fill
            className="object-contain p-2"
            sizes="72px"
          />
        </div>
      </div>

      {/* Orbit items */}
      {piliers.map((p, i) => {
        const rel = (i - active + piliers.length) % piliers.length;
        const angle = queueAngle(rel);
        const pos = orbXY(angle);
        const Icon = p.icon;
        const isActive = rel === 0;
        const dimFactor = Math.max(0.2, 1 - rel * 0.18);

        return (
          <motion.div
            key={p.num}
            animate={{
              left: pos.x - ITEM_M / 2,
              top: pos.y - ITEM_M / 2,
              opacity: dimFactor,
            }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute z-10"
            style={{ width: ITEM_M, height: ITEM_M }}
          >
            {/* Active glow */}
            {isActive && (
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: -12,
                  background: `radial-gradient(circle, ${SKY_SOFT} 0%, rgba(56,189,248,0.08) 55%, transparent 75%)`,
                  filter: "blur(5px)",
                }}
              />
            )}

            {/* Button */}
            <motion.button
              onClick={() => onSelect(i)}
              whileTap={{ scale: 0.9 }}
              className="relative w-full h-full flex items-center justify-center cursor-pointer rounded-full"
              style={{
                background: isActive
                  ? "rgba(56,189,248,0.12)"
                  : "rgba(255,255,255,0.95)",
                border: isActive
                  ? "2px solid rgba(56,189,248,0.55)"
                  : "1.5px solid rgba(0,0,0,0.10)",
                boxShadow: isActive
                  ? `0 0 16px ${SKY_GLOW}, 0 0 32px rgba(56,189,248,0.06)`
                  : "none",
                transition: "background 0.8s, border 0.8s, box-shadow 0.8s",
                zIndex: 4,
              }}
            >
              <Icon
                size={18}
                strokeWidth={1.6}
                style={{
                  color: isActive ? SKY : `rgba(13,13,13,${0.25 + dimFactor * 0.25})`,
                  transition: "color 0.8s",
                }}
              />
            </motion.button>

            {/* Label */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                bottom: -18,
                transform: "translateX(-50%)",
                fontSize: "9px",
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

/* ─── Slide variants (Apple-style) ───────────────────── */
const APPLE_EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

function mobileSlideVariants(dir: number) {
  return {
    enter: {
      x: dir > 0 ? "60%" : "-60%",
      opacity: 0,
      scale: 0.92,
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { duration: 0.5, ease: APPLE_EASE },
        opacity: { duration: 0.35 },
        scale: { duration: 0.5, ease: APPLE_EASE },
      },
    },
    exit: {
      x: dir > 0 ? "-40%" : "40%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { duration: 0.4, ease: APPLE_EASE },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 },
      },
    },
  };
}

/* ─── Text stagger variants ──────────────────────────── */
const textContainerVariants = {
  enter: {},
  center: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const TEXT_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const textItemVariants = {
  enter: { opacity: 0, y: 12 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: TEXT_EASE },
  },
};

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════ */
interface MobilePiliersCarouselProps {
  active: number;
  direction: number;
  onSelect: (i: number) => void;
  onSwipe: (dir: 1 | -1) => void;
}

export default function MobilePiliersCarousel({
  active,
  direction,
  onSelect,
  onSwipe,
}: MobilePiliersCarouselProps) {
  const hasInteracted = useRef(false);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      hasInteracted.current = true;
      if (info.offset.x < -50) {
        onSwipe(1);
      } else if (info.offset.x > 50) {
        onSwipe(-1);
      }
    },
    [onSwipe]
  );

  const handleSelect = useCallback(
    (i: number) => {
      hasInteracted.current = true;
      onSelect(i);
    },
    [onSelect]
  );

  const p = piliers[active];
  const variants = mobileSlideVariants(direction);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* ─── A: Mini Orbit ─── */}
      <MiniOrbit active={active} onSelect={handleSelect} />

      {/* ─── B + C: Swipeable content zone ─── */}
      <div
        className="w-full relative"
        style={{ overflow: "hidden" }}
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="flex flex-col px-4"
            style={{ touchAction: "pan-y" }}
          >
            {/* Visual zone */}
            <div
              className="mx-auto"
              style={{
                width: "100%",
                maxWidth: 340,
                height: active === 1 ? 220 : 200,
                borderRadius: 16,
                background:
                  "radial-gradient(ellipse at center, rgba(56,189,248,0.03) 0%, transparent 70%)",
                boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.04)",
                overflow: "hidden",
              }}
            >
              <MobilePilierViz index={active} />
            </div>

            {/* Text zone with stagger */}
            <motion.div
              variants={textContainerVariants}
              initial="enter"
              animate="center"
              className="mt-6 pl-5 relative"
              style={{ borderLeft: `3px solid ${G}` }}
            >
              {/* Label */}
              <motion.span
                variants={textItemVariants}
                className="block mb-1.5 relative"
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.28em",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  color: G,
                  zIndex: 1,
                }}
              >
                {p.label}
              </motion.span>

              {/* Title */}
              <motion.h3
                variants={textItemVariants}
                className="mb-2 relative"
                style={{
                  fontSize: 20,
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 900,
                  color: TXT_DARK,
                  lineHeight: 1.25,
                  zIndex: 1,
                }}
              >
                {p.titre}
              </motion.h3>

              {/* Description */}
              <motion.p
                variants={textItemVariants}
                className="relative"
                style={{
                  fontSize: 13,
                  fontFamily: "var(--font-inter)",
                  color: "rgba(13,13,13,0.55)",
                  lineHeight: 1.65,
                  zIndex: 1,
                }}
              >
                {p.texte}
              </motion.p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── D: Swipe hint (first time only) ─── */}
      {!hasInteracted.current && (
        <motion.div
          className="flex items-center gap-2 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            animate={{ x: [0, -8, 0] }}
            transition={{ duration: 1.5, repeat: 2, ease: "easeInOut" }}
          >
            <MoveHorizontal
              size={16}
              strokeWidth={1.5}
              style={{ color: "rgba(13,13,13,0.25)" }}
            />
          </motion.div>
          <span
            style={{
              fontSize: 11,
              fontFamily: "var(--font-inter)",
              color: "rgba(13,13,13,0.25)",
            }}
          >
            Glissez pour explorer
          </span>
        </motion.div>
      )}
    </div>
  );
}
