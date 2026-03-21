"use client";

import { motion, type Variants } from "framer-motion";
import { MapPin, Target, Zap, Shield, Heart, Search, Layers, Users, Crosshair, TrendingUp, Mail } from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────── */

const valeurs = [
  {
    icon: Zap,
    titre: "Innovation",
    texte:
      "Imaginer des solutions adaptées aux réalités africaines, en s'appuyant sur les meilleures pratiques internationales.",
  },
  {
    icon: Shield,
    titre: "Exigence & Rigueur",
    texte:
      "Travailler avec un haut niveau de standards techniques, financiers et opérationnels.",
  },
  {
    icon: Target,
    titre: "Transparence",
    texte:
      "Offrir une information claire et fiable aux décideurs, partenaires et bénéficiaires.",
  },
  {
    icon: Heart,
    titre: "Impact humain & social",
    texte:
      "Mettre l'amélioration concrète des conditions de vie au cœur de chaque projet.",
  },
];

const timeline = [
  {
    num: "01",
    titre: "Diagnostic",
    texte:
      "Audit de l'existant, cartographie des acteurs, identification des contraintes réelles du terrain.",
    icon: Search,
  },
  {
    num: "02",
    titre: "Structuration",
    texte:
      "Architecture du projet, plan de financement, mise en place de la gouvernance opérationnelle.",
    icon: Layers,
  },
  {
    num: "03",
    titre: "Mobilisation",
    texte:
      "Activation du réseau d'investisseurs et de bailleurs, présentation aux décideurs stratégiques.",
    icon: Users,
  },
  {
    num: "04",
    titre: "Exécution",
    texte:
      "Pilotage terrain avec standards internationaux, maîtrise rigoureuse des délais et des coûts.",
    icon: Crosshair,
  },
  {
    num: "05",
    titre: "Impact",
    texte:
      "Mesure des résultats, transfert de compétences aux équipes locales, pérennisation des acquis.",
    icon: TrendingUp,
  },
];

const implantations = [
  {
    ville: "Paris",
    pays: "France",
    role: "Siège social",
    adresse: "128, rue de la Boétie",
    cp: "75008 Paris",
    email: "contact@gira-cf.com",
    flag: "🇫🇷",
  },
  {
    ville: "Casablanca",
    pays: "Maroc",
    role: "Bureau régional Afrique",
    adresse: "Casablanca",
    cp: "Maroc",
    email: "contact@gira-cf.com",
    flag: "🇲🇦",
  },
  {
    ville: "Bratislava",
    pays: "Slovaquie",
    role: "Bureau Europe centrale",
    adresse: "Bratislava",
    cp: "Slovaquie",
    email: "contact@gira-cf.com",
    flag: "🇸🇰",
  },
];

/* ─── Animation ─────────────────────────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ─── Tokens ─────────────────────────────────────────────────── */
const GOLD = "#C9A84C";
const DARK = "#0D0D0D";
const BODY = "#444444";
const LIGHT_BG = "#F5F5F0";
const WHITE = "#FFFFFF";

export default function AProposContent() {
  return (
    <>
      {/* ── SECTION 1 — Qui nous sommes ─────────────────────── */}
      <section className="py-20 md:py-32" style={{ backgroundColor: LIGHT_BG }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Texte */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p
                className="text-xs uppercase tracking-[0.2em] mb-4 font-semibold"
                style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
              >
                Qui nous sommes
              </p>
              <h2
                className="text-4xl md:text-5xl font-black leading-tight mb-8"
                style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}
              >
                Un cabinet d&apos;exécution tourné vers l&apos;impact
              </h2>
              <p
                className="text-base md:text-lg leading-relaxed mb-5"
                style={{ color: BODY, fontFamily: "var(--font-inter)" }}
              >
                Là où la théorie stratégique s&apos;arrête, notre mandat commence. GIRA comble
                la fracture entre l&apos;ambition institutionnelle et la réalité du terrain
                africain.
              </p>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: BODY, fontFamily: "var(--font-inter)" }}
              >
                Nous ne livrons pas des rapports, nous structurons la gouvernance, sécurisons
                les capitaux et exécutons des infrastructures qui transforment durablement
                les économies souveraines.
              </p>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-2 gap-px bg-neutral-200 rounded-2xl overflow-hidden shadow-sm"
            >
              {[
                { v: "45+", l: "Experts mobilisés" },
                { v: "3", l: "Pays de présence" },
                { v: "8", l: "Secteurs couverts" },
                { v: "4", l: "Piliers d'intervention" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-white p-8 flex flex-col items-start justify-center"
                >
                  <div
                    className="text-5xl md:text-6xl font-black mb-2"
                    style={{ color: GOLD, fontFamily: "var(--font-montserrat)" }}
                  >
                    {s.v}
                  </div>
                  <div
                    className="text-xs uppercase tracking-widest font-medium"
                    style={{ color: "#888888", fontFamily: "var(--font-inter)" }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — Mission ──────────────────────────────── */}
      <section className="py-20 md:py-32" style={{ backgroundColor: WHITE }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 max-w-2xl"
          >
            <p
              className="text-xs uppercase tracking-[0.2em] mb-4 font-semibold"
              style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
            >
              Notre mission
            </p>
            <h2
              className="text-4xl md:text-5xl font-black leading-tight"
              style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              Accélérer la mise en œuvre des projets stratégiques en Afrique
            </h2>
          </motion.div>

          {/* Bullets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-neutral-200 rounded-2xl overflow-hidden">
            {[
              "Accélérer la mise en œuvre des projets stratégiques définis par les États et leurs partenaires.",
              "Renforcer la crédibilité des projets auprès des bailleurs et investisseurs, par une structuration rigoureuse.",
              "Garantir une exécution efficace, transparente et alignée avec les standards internationaux.",
              "Contribuer à un développement inclusif, résilient et durable des pays africains.",
            ].map((bullet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`flex items-start gap-5 p-8 md:p-10 ${
                  i < 2 ? "border-b border-neutral-200" : ""
                } ${i % 2 === 0 ? "md:border-r border-neutral-200" : ""}`}
              >
                <span
                  className="text-3xl font-black shrink-0 leading-none pt-1"
                  style={{ color: GOLD, fontFamily: "var(--font-montserrat)", opacity: 0.5 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: BODY, fontFamily: "var(--font-inter)" }}
                >
                  {bullet}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — Approche ────────────────────────────── */}
      <section className="py-20 md:py-32" style={{ backgroundColor: LIGHT_BG }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 md:mb-20"
          >
            <p
              className="text-xs uppercase tracking-[0.2em] mb-4 font-semibold"
              style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
            >
              Notre approche
            </p>
            <h2
              className="text-4xl md:text-5xl font-black leading-tight max-w-xl"
              style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              Une méthode en cinq phases
            </h2>
          </motion.div>

          {/* Steps — desktop: large numbered rows / mobile: cards */}
          <div className="space-y-0">
            {timeline.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === timeline.length - 1;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.55 }}
                  className={`flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 py-8 md:py-10 ${
                    !isLast ? "border-b border-neutral-300" : ""
                  }`}
                >
                  {/* Grand numéro filigrane */}
                  <div
                    className="text-6xl md:text-7xl font-black leading-none shrink-0 w-20 md:w-24 select-none"
                    style={{
                      color: GOLD,
                      fontFamily: "var(--font-montserrat)",
                      opacity: 0.18,
                    }}
                  >
                    {step.num}
                  </div>

                  {/* Icône */}
                  <div
                    className="hidden md:flex w-10 h-10 rounded-full items-center justify-center shrink-0"
                    style={{ backgroundColor: "#0D0D0D", border: `1.5px solid ${GOLD}` }}
                  >
                    <Icon size={16} style={{ color: GOLD }} />
                  </div>

                  {/* Titre + Texte */}
                  <div className="flex-1 sm:grid sm:grid-cols-2 sm:gap-10 items-center">
                    <h3
                      className="text-xl md:text-2xl font-bold mb-2 sm:mb-0"
                      style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}
                    >
                      {step.titre}
                    </h3>
                    <p
                      className="text-sm md:text-base leading-relaxed"
                      style={{ color: BODY, fontFamily: "var(--font-inter)" }}
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

      {/* ── SECTION 4 — Valeurs ─────────────────────────────── */}
      <section className="py-20 md:py-32" style={{ backgroundColor: WHITE }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <p
                className="text-xs uppercase tracking-[0.2em] mb-4 font-semibold"
                style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
              >
                Ce qui nous guide
              </p>
              <h2
                className="text-4xl md:text-5xl font-black leading-tight"
                style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}
              >
                Nos valeurs
              </h2>
            </div>
            {/* Ligne décorative */}
            <div
              className="hidden md:block h-[2px] flex-1 max-w-xs ml-10"
              style={{
                background: `linear-gradient(to right, ${GOLD}, transparent)`,
              }}
            />
          </motion.div>

          {/* Valeurs — 4 colonnes avec séparateurs verticaux */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-neutral-200 rounded-2xl overflow-hidden">
            {valeurs.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.titre}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-8 md:p-10 flex flex-col ${
                    i < 3 ? "lg:border-r border-neutral-200" : ""
                  } ${i % 2 === 0 ? "sm:border-r lg:border-r-0 border-neutral-200" : ""} ${
                    i < 2 ? "sm:border-b lg:border-b-0 border-neutral-200" : ""
                  }`}
                >
                  {/* Icône avec numéro */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${GOLD}18` }}
                    >
                      <Icon size={18} style={{ color: GOLD }} />
                    </div>
                    <span
                      className="text-xs font-black tracking-widest"
                      style={{ color: GOLD, fontFamily: "var(--font-montserrat)", opacity: 0.4 }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Titre */}
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}
                  >
                    {v.titre}
                  </h3>

                  {/* Texte */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: BODY, fontFamily: "var(--font-inter)" }}
                  >
                    {v.texte}
                  </p>

                  {/* Accent bar */}
                  <div
                    className="mt-auto pt-6"
                  >
                    <div
                      className="h-[2px] w-8 rounded-full"
                      style={{ backgroundColor: GOLD, opacity: 0.4 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — Implantations ───────────────────────── */}
      <section className="py-20 md:py-32" style={{ backgroundColor: LIGHT_BG }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 md:mb-20"
          >
            <p
              className="text-xs uppercase tracking-[0.2em] mb-4 font-semibold"
              style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
            >
              Présence internationale
            </p>
            <h2
              className="text-4xl md:text-5xl font-black leading-tight max-w-xl"
              style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              Nos implantations
            </h2>
          </motion.div>

          {/* Grid BCG style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-neutral-300 rounded-2xl overflow-hidden bg-white">
            {implantations.map((impl, i) => (
              <motion.div
                key={impl.ville}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`p-10 md:p-12 flex flex-col gap-0 ${
                  i < 2 ? "md:border-r border-neutral-300" : ""
                } ${i < implantations.length - 1 ? "border-b md:border-b-0 border-neutral-300" : ""}`}
              >
                {/* Top gold accent bar */}
                <div
                  className="w-10 h-[3px] rounded-full mb-8"
                  style={{ backgroundColor: GOLD }}
                />

                {/* Flag + Pays */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{impl.flag}</span>
                  <span
                    className="text-xs uppercase tracking-[0.2em] font-semibold"
                    style={{ color: "#888888", fontFamily: "var(--font-inter)" }}
                  >
                    {impl.pays}
                  </span>
                </div>

                {/* Ville — grande typo BCG */}
                <h3
                  className="text-4xl md:text-5xl font-black mb-1 leading-none"
                  style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}
                >
                  {impl.ville}
                </h3>

                {/* Role */}
                <p
                  className="text-xs uppercase tracking-widest font-semibold mb-8 mt-2"
                  style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
                >
                  {impl.role}
                </p>

                {/* Séparateur */}
                <div className="border-t border-neutral-200 mb-6" />

                {/* Adresse */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <MapPin
                      size={14}
                      className="shrink-0 mt-[3px]"
                      style={{ color: GOLD }}
                    />
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: BODY, fontFamily: "var(--font-inter)" }}
                    >
                      {impl.adresse}
                      <br />
                      {impl.cp}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="shrink-0" style={{ color: GOLD }} />
                    <a
                      href={`mailto:${impl.email}`}
                      className="text-sm transition-colors duration-200"
                      style={{ color: BODY, fontFamily: "var(--font-inter)" }}
                    >
                      {impl.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center text-xs"
            style={{ color: "#888888", fontFamily: "var(--font-inter)" }}
          >
            GIRA est présent sur 3 continents pour vous accompagner au plus près des réalités locales.
          </motion.p>
        </div>
      </section>
    </>
  );
}
