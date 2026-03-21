"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { useLocale } from "next-intl";

const G = "#C9A84C";

const STATS_DATA = {
  fr: [
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
      desc: "Paris · Casablanca · Bratislava, un ancrage stratégique entre l'Europe et l'Afrique",
    },
    {
      value: 8,
      suffix: "",
      label: "Secteurs couverts",
      desc: "Eau, santé, énergie, agriculture, mines, construction, tech et transports",
    },
    {
      value: 1,
      suffix: "",
      label: "PND soutenu",
      desc: "Partenaire officiel du Plan National de Développement RCA 2024-2028",
    },
  ],
  en: [
    {
      value: 45,
      suffix: "+",
      label: "Experts mobilized",
      desc: "Professionals from ministries, financial institutions and international consulting firms",
    },
    {
      value: 3,
      suffix: "",
      label: "Countries of presence",
      desc: "Paris · Casablanca · Bratislava, a strategic foothold between Europe and Africa",
    },
    {
      value: 8,
      suffix: "",
      label: "Sectors covered",
      desc: "Water, health, energy, agriculture, mining, construction, tech and transport",
    },
    {
      value: 1,
      suffix: "",
      label: "NDP supported",
      desc: "Official partner of the Central African Republic National Development Plan 2024-2028",
    },
  ],
};

type StatEntry = { value: number; suffix: string; label: string; desc: string };
function StatItem({ stat, index }: { stat: StatEntry; index: number }) {
  const { count, ref } = useCountUp(stat.value, 2200);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      /* Mobile : flex-row (chiffre à gauche, texte à droite)
         sm+   : flex-col (empilé) comme desktop */
      className="flex flex-row items-center gap-5
                 sm:flex-col sm:items-start sm:gap-0
                 px-5 py-6 sm:px-6 sm:py-9 md:px-8 md:py-12
                 relative"
    >
      {/* ── Séparateur horizontal entre items (mobile 1-col) ── */}
      {index > 0 && (
        <div
          className="sm:hidden absolute top-0 left-5 right-5 h-px"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
        />
      )}

      {/* ── Séparateur vertical entre items (desktop 4-col) ── */}
      {index > 0 && (
        <div
          className="hidden lg:block absolute left-0 top-8 bottom-8 w-px"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
        />
      )}

      {/* ── Séparateur vertical entre items (tablet 2-col) ── */}
      {index % 2 !== 0 && (
        <div
          className="hidden sm:block lg:hidden absolute left-0 top-8 bottom-8 w-px"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
        />
      )}

      {/* ── Séparateur horizontal bas (tablet row 1 → row 2) ── */}
      {index < 2 && (
        <div
          className="hidden sm:block lg:hidden absolute bottom-0 left-4 right-4 h-px"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
        />
      )}

      {/* ── Chiffre ── */}
      <div
        className="flex-shrink-0 leading-none tabular-nums
                   text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-black
                   sm:mb-3 min-w-[3.5rem] sm:min-w-0"
        style={{ color: "#FFFFFF", fontFamily: "var(--font-montserrat)" }}
      >
        {count}
        <span style={{ color: G }}>{stat.suffix}</span>
      </div>

      {/* ── Texte : label + séparateur + description ── */}
      <div className="flex-1 min-w-0">
        <p
          className="text-xs sm:text-sm font-bold mb-2"
          style={{ color: G, fontFamily: "var(--font-montserrat)", letterSpacing: "0.01em" }}
        >
          {stat.label}
        </p>

        {/* Séparateur décoratif */}
        <div
          className="w-6 h-px mb-2"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        />

        {/* Description — masquée sur très petit écran, visible à partir de xs */}
        <p
          className="text-xs leading-relaxed hidden xs:block sm:block"
          style={{ color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-inter)" }}
        >
          {stat.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function ChiffresSection() {
  const locale = useLocale() as "fr" | "en";
  const stats = STATS_DATA[locale] ?? STATS_DATA.fr;
  return (
    <section
      className="relative py-16 sm:py-20 md:py-28 overflow-hidden"
      style={{
        background: [
          "radial-gradient(ellipse 72% 60% at 96% 5%, rgba(255,255,255,0.13) 0%, transparent 62%)",
          "radial-gradient(ellipse 60% 72% at 2% 98%, rgba(255,255,255,0.085) 0%, transparent 58%)",
          "radial-gradient(ellipse 52% 48% at 42% 50%, rgba(201,168,76,0.11) 0%, transparent 54%)",
          "radial-gradient(ellipse 38% 52% at 78% 65%, rgba(255,255,255,0.06) 0%, transparent 50%)",
          "radial-gradient(ellipse 32% 38% at 12% 18%, rgba(255,255,255,0.055) 0%, transparent 48%)",
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

      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14 md:mb-20"
        >
          <p
            className="text-[10px] uppercase tracking-[0.28em] font-semibold mb-3"
            style={{ color: G, fontFamily: "var(--font-inter)" }}
          >
            {locale === "en" ? "Our footprint" : "Notre empreinte"}
          </p>
          <h2
            className="font-black leading-tight"
            style={{
              color: "#FFFFFF",
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(1.6rem, 5vw, 3rem)",
            }}
          >
            {locale === "en" ? (
              <>
                Concrete results,{" "}
                <span style={{ color: "rgba(255,255,255,0.35)" }}>an established presence</span>
              </>
            ) : (
              <>
                Des résultats concrets,{" "}
                <span style={{ color: "rgba(255,255,255,0.35)" }}>une présence affirmée</span>
              </>
            )}
          </h2>
        </motion.div>

        {/* ── Grille stats ──
            Mobile  : 1 colonne (flex-col via StatItem)
            sm      : 2 colonnes
            lg      : 4 colonnes */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          {stats.map((s, i) => (
            <StatItem key={s.label} stat={s} index={i} />
          ))}
        </div>

        {/* ── Citation basse ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 sm:mt-14 md:mt-16 pt-8 sm:pt-10"
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
            {locale === "en"
              ? "\u201COur ambition: to structure 100 high-impact projects by 2030, serving 100 million Africans.\u201D"
              : "\u201CNos ambitions\u00a0: structurer 100 projets \u00e0 fort impact d\u2019ici 2030, au service de 100 millions d\u2019Africains.\u201D"}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
