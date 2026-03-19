"use client";

import { motion } from "framer-motion";
import { MapPin, Target, Zap, Shield, Heart, Search, Layers, Users, Crosshair, TrendingUp } from "lucide-react";

const valeurs = [
  {
    icon: Zap,
    titre: "Innovation",
    texte: "Imaginer des solutions adaptées aux réalités africaines, en s'appuyant sur les meilleures pratiques internationales.",
  },
  {
    icon: Shield,
    titre: "Exigence & Rigueur",
    texte: "Travailler avec un haut niveau de standards techniques, financiers et opérationnels.",
  },
  {
    icon: Target,
    titre: "Transparence",
    texte: "Offrir une information claire et fiable aux décideurs, partenaires et bénéficiaires.",
  },
  {
    icon: Heart,
    titre: "Impact humain & social",
    texte: "Mettre l'amélioration concrète des conditions de vie au cœur de chaque projet.",
  },
];

const timeline = [
  {
    titre: "Diagnostic",
    texte: "Audit de l'existant, cartographie des acteurs, identification des contraintes réelles du terrain.",
    icon: Search,
  },
  {
    titre: "Structuration",
    texte: "Architecture du projet, plan de financement, mise en place de la gouvernance opérationnelle.",
    icon: Layers,
  },
  {
    titre: "Mobilisation",
    texte: "Activation du réseau d'investisseurs et de bailleurs, présentation aux décideurs stratégiques.",
    icon: Users,
  },
  {
    titre: "Exécution",
    texte: "Pilotage terrain avec standards internationaux, maîtrise rigoureuse des délais et des coûts.",
    icon: Crosshair,
  },
  {
    titre: "Impact",
    texte: "Mesure des résultats, transfert de compétences aux équipes locales, pérennisation des acquis.",
    icon: TrendingUp,
  },
];

const implantations = [
  { ville: "Paris", pays: "France", adresse: "128, rue de la Boétie, 75008", detail: "Siège social" },
  { ville: "Casablanca", pays: "Maroc", adresse: "Maroc", detail: "Bureau régional Afrique du Nord" },
  { ville: "Bratislava", pays: "Slovaquie", adresse: "Slovaquie", detail: "Bureau Europe centrale" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AProposContent() {
  return (
    <>
      {/* Section 1 — Qui nous sommes */}
      <section className="py-20 md:py-32" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                Qui nous sommes
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6" style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}>
                Un cabinet d&apos;exécution tourné vers l&apos;impact
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#444444", fontFamily: "var(--font-inter)" }}>
                Là où la théorie stratégique s&apos;arrête, notre mandat commence. GIRA comble la fracture entre l&apos;ambition institutionnelle et la réalité du terrain africain.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "#444444", fontFamily: "var(--font-inter)" }}>
                Nous ne livrons pas des rapports, nous structurons la gouvernance, sécurisons les capitaux et exécutons des infrastructures qui transforment durablement les économies souveraines.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { v: "45+", l: "Experts mobilisés" },
                { v: "3", l: "Pays de présence" },
                { v: "8", l: "Secteurs couverts" },
                { v: "4", l: "Piliers d'intervention" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm border border-neutral-100"
                >
                  <div className="text-4xl font-black mb-1" style={{ color: "#C9A84C", fontFamily: "var(--font-montserrat)" }}>
                    {s.v}
                  </div>
                  <div className="text-xs uppercase tracking-widest" style={{ color: "#888888", fontFamily: "var(--font-inter)" }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2 — Mission */}
      <section className="py-20 md:py-32" style={{ backgroundColor: "#1A1A2E" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14 max-w-xl">
            <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>Notre mission</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white" style={{ fontFamily: "var(--font-montserrat)" }}>
              Accélérer la mise en œuvre des projets stratégiques en Afrique
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Accélérer la mise en œuvre des projets stratégiques définis par les États et leurs partenaires.",
              "Renforcer la crédibilité des projets auprès des bailleurs et investisseurs, par une structuration rigoureuse.",
              "Garantir une exécution efficace, transparente et alignée avec les standards internationaux.",
              "Contribuer à un développement inclusif, résilient et durable des pays africains.",
            ].map((bullet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex items-start gap-4 p-6 rounded-2xl border border-white/5"
                style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-black" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", fontFamily: "var(--font-montserrat)" }}>
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "#CCCCCC", fontFamily: "var(--font-inter)" }}>{bullet}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Approche phases */}
      <section className="py-20 md:py-32 overflow-hidden" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">

          {/* Header */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16 md:mb-24 max-w-xl">
            <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
              Notre approche
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}>
              Une méthode en cinq phases
            </h2>
          </motion.div>

          {/* Desktop — horizontal flow */}
          <div className="hidden md:block">
            {/* Connecting line behind icons */}
            <div className="relative flex items-start justify-between gap-0">
              {/* Gold line spanning the icons */}
              <div
                className="absolute top-[28px] left-[10%] right-[10%] h-[1px]"
                style={{ background: "linear-gradient(to right, transparent, #C9A84C 15%, #C9A84C 85%, transparent)" }}
              />

              {timeline.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.titre}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.55 }}
                    className="flex flex-col items-center text-center flex-1 px-4 group"
                  >
                    {/* Icon circle */}
                    <div
                      className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-1"
                      style={{ backgroundColor: "#0D0D0D", border: "1.5px solid #C9A84C" }}
                    >
                      <Icon size={20} style={{ color: "#C9A84C" }} />
                    </div>

                    {/* Phase label */}
                    <span
                      className="text-xs uppercase tracking-widest font-semibold mb-2"
                      style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
                    >
                      {step.titre}
                    </span>

                    {/* Description */}
                    <p
                      className="text-xs leading-relaxed max-w-[160px]"
                      style={{ color: "#666666", fontFamily: "var(--font-inter)" }}
                    >
                      {step.texte}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile — vertical cards with left gold bar */}
          <div className="md:hidden space-y-0">
            {timeline.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === timeline.length - 1;
              return (
                <motion.div
                  key={step.titre}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative flex gap-5 pb-10"
                >
                  {/* Left column: icon + vertical line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center z-10"
                      style={{ backgroundColor: "#0D0D0D", border: "1.5px solid #C9A84C" }}
                    >
                      <Icon size={16} style={{ color: "#C9A84C" }} />
                    </div>
                    {!isLast && (
                      <div className="flex-1 w-[1px] mt-2" style={{ backgroundColor: "rgba(201,168,76,0.3)" }} />
                    )}
                  </div>

                  {/* Right column: text */}
                  <div className="pt-1 pb-2">
                    <span
                      className="text-xs uppercase tracking-widest font-semibold block mb-1"
                      style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
                    >
                      {step.titre}
                    </span>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#666666", fontFamily: "var(--font-inter)" }}
                    >
                      {step.texte}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Section 4 — Valeurs */}
      <section className="py-20 md:py-32" style={{ backgroundColor: "#0D0D0D" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14 max-w-xl">
            <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>Ce qui nous guide</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>Nos valeurs</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valeurs.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.titre}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl border border-white/5"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4" style={{ backgroundColor: "rgba(201,168,76,0.15)" }}>
                    <Icon size={18} style={{ color: "#C9A84C" }} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>{v.titre}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#999999", fontFamily: "var(--font-inter)" }}>{v.texte}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5 — Implantations */}
      <section className="py-20 md:py-32" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14 max-w-xl">
            <p className="text-xs uppercase tracking-widest mb-3 font-medium" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>Où nous trouver</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}>Nos implantations</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {implantations.map((impl, i) => (
              <motion.div
                key={impl.ville}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-white rounded-2xl p-8 border-t-4 shadow-sm"
                style={{ borderTopColor: "#C9A84C" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <MapPin size={18} style={{ color: "#C9A84C" }} />
                  <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                    {impl.pays}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1" style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}>{impl.ville}</h3>
                <p className="text-sm mb-1" style={{ color: "#666666", fontFamily: "var(--font-inter)" }}>{impl.adresse}</p>
                <p className="text-xs" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>{impl.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
