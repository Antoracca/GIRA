"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const G = "#C9A84C";

const stats = [
  {
    value: 45,
    suffix: "+",
    label: "Experts mobilisés",
    desc: "Professionnels issus de ministères, institutions financières et cabinets internationaux",
  },
  {
    value: 3,
    suffix: "",
    label: "Pays de présence",
    desc: "Paris · Casablanca · Bratislava — un ancrage stratégique entre l'Europe et l'Afrique",
  },
  {
    value: 8,
    suffix: "",
    label: "Secteurs couverts",
    desc: "Solutions digitales déployées de l'eau à la tech, sur l'ensemble des piliers structurants",
  },
  {
    value: 1,
    suffix: "",
    label: "PND soutenu",
    desc: "Partenaire officiel du Plan National de Développement RCA 2024-2028",
  },
];

function StatItem({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const { count, ref } = useCountUp(stat.value, 2200);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="flex flex-col px-8 py-10 md:py-12 relative"
    >
      {/* Vertical divider (desktop) */}
      {index > 0 && (
        <div
          className="hidden lg:block absolute left-0 top-8 bottom-8 w-px"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
        />
      )}

      {/* Horizontal divider (mobile grid 2×2) */}
      {index >= 2 && (
        <div
          className="lg:hidden absolute top-0 left-4 right-4 h-px"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
        />
      )}

      {/* Number */}
      <div
        className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tabular-nums mb-3"
        style={{ color: "#FFFFFF", fontFamily: "var(--font-montserrat)" }}
      >
        {count}
        <span style={{ color: G }}>{stat.suffix}</span>
      </div>

      {/* Label */}
      <p
        className="text-sm font-bold mb-3"
        style={{ color: G, fontFamily: "var(--font-montserrat)", letterSpacing: "0.01em" }}
      >
        {stat.label}
      </p>

      {/* Separator */}
      <div
        className="w-8 h-px mb-3"
        style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
      />

      {/* Description */}
      <p
        className="text-xs leading-relaxed"
        style={{ color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-inter)" }}
      >
        {stat.desc}
      </p>
    </motion.div>
  );
}

export default function ChiffresSection() {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: [
          /* nappe blanche principale — coin haut-droit, forte */
          "radial-gradient(ellipse 72% 60% at 96% 5%, rgba(255,255,255,0.13) 0%, transparent 62%)",
          /* nappe blanche — coin bas-gauche */
          "radial-gradient(ellipse 60% 72% at 2% 98%, rgba(255,255,255,0.085) 0%, transparent 58%)",
          /* couronne or — centre, chaleur chaude */
          "radial-gradient(ellipse 52% 48% at 42% 50%, rgba(201,168,76,0.11) 0%, transparent 54%)",
          /* éclat mi-droite */
          "radial-gradient(ellipse 38% 52% at 78% 65%, rgba(255,255,255,0.06) 0%, transparent 50%)",
          /* éclat haut-gauche discret */
          "radial-gradient(ellipse 32% 38% at 12% 18%, rgba(255,255,255,0.055) 0%, transparent 48%)",
          "#0D0D0D",
        ].join(", "),
      }}
    >
      {/* ── Grain cinématique ── */}
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
          className="mb-14 md:mb-20"
        >
          <p
            className="text-[10px] uppercase tracking-[0.28em] font-semibold mb-4"
            style={{ color: G, fontFamily: "var(--font-inter)" }}
          >
            Notre empreinte
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight max-w-2xl"
            style={{ color: "#FFFFFF", fontFamily: "var(--font-montserrat)" }}
          >
            Des résultats concrets,{" "}
            <span style={{ color: "rgba(255,255,255,0.35)" }}>
              une présence affirmée
            </span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          {stats.map((s, i) => (
            <StatItem key={s.label} stat={s} index={i} />
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 md:mt-16 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p
            className="text-sm md:text-base leading-relaxed max-w-lg"
            style={{
              color: "rgba(255,255,255,0.30)",
              fontFamily: "var(--font-inter)",
              fontStyle: "italic",
            }}
          >
            &ldquo;Notre ambition : structurer 100 projets à fort impact d&apos;ici 2030,
            au service de 100 millions d&apos;Africains.&rdquo;
          </p>
        </motion.div>

      </div>
    </section>
  );
}
