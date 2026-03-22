"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { MapPin, Mail, ArrowRight, Search, Layers, Users, Crosshair, TrendingUp } from "lucide-react";

/* ─── Tokens ─────────────────────────────────────────────── */
const GOLD  = "#C9A84C";
const DARK  = "#0D0D0D";
const BODY  = "#444444";
const WHITE = "#FFFFFF";
const OFF   = "#F5F5F0";

/* ─── Variants ───────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

/* ─── Locale-keyed data ──────────────────────────────────── */
const ABOUT_DATA = {
  fr: {
    breadcrumb: {
      home: "Accueil",
      section: "Le Cabinet",
    },
    hero: {
      eyebrow: "Qui nous sommes",
      titleLine1: "Le Cabinet",
      titleGold: "GIRA",
      subtitle:
        "Un cabinet d\u2019ex\u00e9cution n\u00e9 de la conviction que l\u2019Afrique m\u00e9rite une ing\u00e9nierie de projet irr\u00e9prochable. Structurer, financer, ex\u00e9cuter.",
      stats: [
        { v: "45+", l: "Experts mobilis\u00e9s" },
        { v: "3",   l: "Pays de pr\u00e9sence" },
        { v: "8",   l: "Secteurs couverts" },
        { v: "4",   l: "Piliers d\u2019intervention" },
      ],
    },
    mission: {
      eyebrow: "Notre mission",
      heading: "L\u00e0 o\u00f9 la th\u00e9orie s\u2019arr\u00eate,\nnot\u00a0mandat commence.",
      para1:
        "GIRA comble la fracture entre l\u2019ambition institutionnelle et la r\u00e9alit\u00e9 du terrain africain. Nous acc\u00e9l\u00e9rons la mise en \u0153uvre des projets strat\u00e9giques d\u00e9finis par les \u00c9tats et leurs partenaires.",
      para2:
        "Nous renfor\u00e7ons la cr\u00e9dibilit\u00e9 de chaque projet aupr\u00e8s des bailleurs et investisseurs, par une structuration rigoureuse et une gouvernance irr\u00e9prochable.",
      para3:
        "Nous garantissons une ex\u00e9cution efficace, transparente et align\u00e9e avec les standards internationaux. De la conception \u00e0 la livraison finale, sans compromis sur la qualit\u00e9.",
      para4:
        "Nous contribuons \u00e0 un d\u00e9veloppement inclusif, r\u00e9silient et durable des pays africains, en pla\u00e7ant l\u2019impact humain et social au c\u0153ur de chaque d\u00e9cision.",
    },
    approche: {
      eyebrow: "Notre approche",
      heading: "Une m\u00e9thode en cinq phases",
      phases: [
        { title: "Diagnostic",    icon: Search,     desc: "Audit de l\u2019existant, cartographie des acteurs, identification des contraintes r\u00e9elles du terrain." },
        { title: "Structuration", icon: Layers,     desc: "Architecture du projet, plan de financement, mise en place de la gouvernance op\u00e9rationnelle." },
        { title: "Mobilisation",  icon: Users,      desc: "Activation du r\u00e9seau d\u2019investisseurs et de bailleurs, pr\u00e9sentation aux d\u00e9cideurs strat\u00e9giques." },
        { title: "Ex\u00e9cution",     icon: Crosshair,  desc: "Pilotage terrain avec standards internationaux, ma\u00eetrise rigoureuse des d\u00e9lais et des co\u00fbts." },
        { title: "Impact",        icon: TrendingUp, desc: "Mesure des r\u00e9sultats, transfert de comp\u00e9tences aux \u00e9quipes locales, p\u00e9rennisation des acquis." },
      ],
    },
    valeurs: {
      eyebrow: "Ce qui nous guide",
      heading: "Nos valeurs",
      values: [
        {
          title: "Innovation",
          headline: "Nous cr\u00e9ons ce qui n\u2019existait pas encore",
          desc: "Nos solutions ne sont pas import\u00e9es. Elles sont con\u00e7ues pour les r\u00e9alit\u00e9s africaines, avec les standards les plus exigeants du monde. Chaque projet est une r\u00e9ponse in\u00e9dite \u00e0 un d\u00e9fi concret.",
        },
        {
          title: "Exigence",
          headline: "L\u2019excellence est notre minimum, pas notre ambition",
          desc: "Chaque engagement GIRA est tenu. Chaque livrable porte notre signature. Pas de rapport de complaisance, pas de d\u00e9lai gliss\u00e9 sous silence. L\u2019exigence est notre point de d\u00e9part.",
        },
        {
          title: "Transparence",
          headline: "Nos clients ne d\u00e9couvrent jamais les mauvaises nouvelles trop tard",
          desc: "Ce qui ne va pas est dit imm\u00e9diatement, avec clart\u00e9 et solutions. Nos clients ont une visibilit\u00e9 totale sur l\u2019avancement de leurs projets, \u00e0 chaque \u00e9tape de l\u2019ex\u00e9cution.",
        },
        {
          title: "Impact",
          headline: "Nos projets finissent dans les vies, pas dans les rapports",
          desc: "Notre seul indicateur de succ\u00e8s est l\u2019impact concret sur les populations. Pas les slides produits, pas les r\u00e9unions tenues. Ce qui compte, c\u2019est ce qui change sur le terrain.",
        },
      ],
    },
    implantations: {
      eyebrow: "Pr\u00e9sence internationale",
      heading: "Nos bureaux",
      bureaux: [
        {
          city: "Paris",
          pays: "France",
          role: "Si\u00e8ge social",
          address: "128, rue de la Bo\u00e9tie, 75008 Paris",
          email: "contact@gira-cf.com",
          img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=90&auto=format&fit=crop",
        },
        {
          city: "Marrakech",
          pays: "Maroc",
          role: "Bureau Afrique",
          address: "Marrakech, Maroc",
          email: "contact@gira-cf.com",
          img: "https://images.unsplash.com/photo-1561642769-1bca263542e0?q=80&w=900&auto=format&fit=crop",
        },
        {
          city: "Bratislava",
          pays: "Slovaquie",
          role: "Bureau Europe Centrale",
          address: "Bratislava, Slovaquie",
          email: "contact@gira-cf.com",
          img: "https://images.unsplash.com/photo-1578779839971-c7f6fc754c31?q=80&w=900&auto=format&fit=crop",
        },
      ],
      zonesEyebrow: "Zones d\u2019intervention",
      zonesHeading: "Nous op\u00e9rons principalement en Afrique",
      interventions: [
        { pays: "R\u00e9publique Centrafricaine", code: "RCA", detail: "Partenaire PND 2024-2028",                img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=85&auto=format&fit=crop" },
        { pays: "Cameroun",                    code: "CMR", detail: "Structuration et financement de projets", img: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=900&q=85&auto=format&fit=crop" },
        { pays: "Gabon",                       code: "GAB", detail: "Structuration de projets",               img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=900&q=85&auto=format&fit=crop" },
        { pays: "Congo",                       code: "COG", detail: "Digitalisation des secteurs",            img: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=900&q=85&auto=format&fit=crop" },
      ],
    },
    cta: {
      eyebrow: "Pr\u00eat \u00e0 collaborer\u00a0?",
      heading: "Structurons ensemble votre prochain projet.",
      body: "Notre \u00e9quipe r\u00e9pond sous 24h. Paris, Marrakech, Bratislava.",
      primary: "Initier un mandat",
      secondary: "Nos services",
    },
  },

  en: {
    breadcrumb: {
      home: "Home",
      section: "The Firm",
    },
    hero: {
      eyebrow: "Who we are",
      titleLine1: "The Firm",
      titleGold: "GIRA",
      subtitle:
        "An execution firm born from the conviction that Africa deserves impeccable project engineering. Structure, finance, execute.",
      stats: [
        { v: "45+", l: "Mobilized experts" },
        { v: "3",   l: "Countries of operation" },
        { v: "8",   l: "Sectors covered" },
        { v: "4",   l: "Intervention pillars" },
      ],
    },
    mission: {
      eyebrow: "Our mission",
      heading: "Where theory ends,\nour mandate begins.",
      para1:
        "GIRA bridges the gap between institutional ambition and the reality of African ground. We accelerate the implementation of strategic projects defined by states and their partners.",
      para2:
        "We strengthen the credibility of each project with donors and investors, through rigorous structuring and impeccable governance.",
      para3:
        "We guarantee efficient, transparent execution aligned with international standards. From design to final delivery, without compromising on quality.",
      para4:
        "We contribute to inclusive, resilient and sustainable development of African countries, placing human and social impact at the heart of every decision.",
    },
    approche: {
      eyebrow: "Our approach",
      heading: "A five-phase methodology",
      phases: [
        { title: "Diagnostic",    icon: Search,     desc: "Audit of existing structures, stakeholder mapping, identification of real field constraints." },
        { title: "Structuring",   icon: Layers,     desc: "Project architecture, financing plan, establishment of operational governance." },
        { title: "Mobilization",  icon: Users,      desc: "Activation of investor and donor network, presentation to strategic decision-makers." },
        { title: "Execution",     icon: Crosshair,  desc: "Field management with international standards, rigorous control of timelines and costs." },
        { title: "Impact",        icon: TrendingUp, desc: "Measurement of results, skills transfer to local teams, sustainability of achievements." },
      ],
    },
    valeurs: {
      eyebrow: "What guides us",
      heading: "Our values",
      values: [
        {
          title: "Innovation",
          headline: "We create what did not yet exist",
          desc: "Our solutions are not imported. They are designed for African realities, with the most demanding standards in the world. Each project is a unique response to a concrete challenge.",
        },
        {
          title: "Excellence",
          headline: "Excellence is our minimum, not our ambition",
          desc: "Every GIRA commitment is honored. Every deliverable bears our signature. No complacency reports, no deadlines quietly slipping. Excellence is our starting point.",
        },
        {
          title: "Transparency",
          headline: "Our clients never discover bad news too late",
          desc: "What is wrong is said immediately, with clarity and solutions. Our clients have total visibility on the progress of their projects, at every stage of execution.",
        },
        {
          title: "Impact",
          headline: "Our projects end up in lives, not in reports",
          desc: "Our only success indicator is concrete impact on populations. Not slides produced, not meetings held. What matters is what changes on the ground.",
        },
      ],
    },
    implantations: {
      eyebrow: "International Presence",
      heading: "Our Offices",
      bureaux: [
        {
          city: "Paris",
          pays: "France",
          role: "Head Office",
          address: "128, rue de la Bo\u00e9tie, 75008 Paris",
          email: "contact@gira-cf.com",
          img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=90&auto=format&fit=crop",
        },
        {
          city: "Marrakech",
          pays: "Morocco",
          role: "Africa Office",
          address: "Marrakech, Morocco",
          email: "contact@gira-cf.com",
          img: "https://images.unsplash.com/photo-1561642769-1bca263542e0?q=80&w=900&auto=format&fit=crop",
        },
        {
          city: "Bratislava",
          pays: "Slovakia",
          role: "Central Europe Office",
          address: "Bratislava, Slovakia",
          email: "contact@gira-cf.com",
          img: "https://images.unsplash.com/photo-1578779839971-c7f6fc754c31?q=80&w=900&auto=format&fit=crop",
        },
      ],
      zonesEyebrow: "Intervention Zones",
      zonesHeading: "We primarily operate in Africa",
      interventions: [
        { pays: "Central African Republic", code: "RCA", detail: "NDP 2024-2028 Partner",              img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=85&auto=format&fit=crop" },
        { pays: "Cameroon",                 code: "CMR", detail: "Project structuring and financing",  img: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=900&q=85&auto=format&fit=crop" },
        { pays: "Gabon",                    code: "GAB", detail: "Project structuring",                img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=900&q=85&auto=format&fit=crop" },
        { pays: "Congo",                    code: "COG", detail: "Sector digitalization",              img: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=900&q=85&auto=format&fit=crop" },
      ],
    },
    cta: {
      eyebrow: "Ready to collaborate?",
      heading: "Let\u2019s structure your next project together.",
      body: "Our team responds within 24 hours. Paris, Marrakech, Bratislava.",
      primary: "Initiate a Mandate",
      secondary: "Our services",
    },
  },
} as const;

/* ================================================================
   PAGE
================================================================ */
export default function AProposPage() {
  const locale = useLocale() as "fr" | "en";
  const d = ABOUT_DATA[locale];

  return (
    <main>

      {/* ══════════════════════════════════════════════════════
          HERO — titre gauche / stats verticales droite
      ══════════════════════════════════════════════════════ */}
      <section id="overview" className="pt-36 pb-24 md:pt-44 md:pb-32" style={{ backgroundColor: WHITE }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

          {/* Fil d'Ariane */}
          <motion.nav
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 mb-12"
          >
            <Link href="/" className="text-xs uppercase tracking-widest" style={{ color: "#999", fontFamily: "var(--font-inter)" }}>{d.breadcrumb.home}</Link>
            <span style={{ color: "#CCC", fontSize: 11 }}>›</span>
            <span className="text-xs uppercase tracking-widest" style={{ color: GOLD, fontFamily: "var(--font-inter)" }}>{d.breadcrumb.section}</span>
          </motion.nav>

          {/* 2 colonnes : titre gauche / stats verticales droite */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-start">

            {/* Titre + sous-titre */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: GOLD, fontFamily: "var(--font-inter)" }}>
                {d.hero.eyebrow}
              </p>
              <h1
                className="font-black leading-[1.0] tracking-tight mb-8"
                style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
              >
                {d.hero.titleLine1}<br /><span style={{ color: GOLD }}>{d.hero.titleGold}</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed max-w-xl" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                {d.hero.subtitle}
              </p>
            </motion.div>

            {/* Stats — empilées verticalement à droite */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="flex flex-row flex-wrap lg:flex-col gap-10 lg:gap-10 lg:pt-16 lg:border-l lg:pl-16"
              style={{ borderColor: "#EBEBEB" }}
            >
              {d.hero.stats.map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="min-w-[120px]"
                >
                  <div
                    className="font-black leading-none mb-1"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: GOLD, fontFamily: "var(--font-montserrat)" }}
                  >
                    {s.v}
                  </div>
                  <div className="text-sm font-medium" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                    {s.l}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MISSION — 2 colonnes éditoriales, zéro tiret
      ══════════════════════════════════════════════════════ */}
      <section id="mission" className="py-24 md:py-32" style={{ backgroundColor: OFF }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: GOLD, fontFamily: "var(--font-inter)" }}>
              {d.mission.eyebrow}
            </p>
            <h2
              className="font-black leading-tight mb-16 max-w-3xl"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              {d.mission.heading.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                {d.mission.para1}
              </p>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                {d.mission.para2}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
              <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                {d.mission.para3}
              </p>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                {d.mission.para4}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          APPROCHE — rows épurés, sans numérotation
      ══════════════════════════════════════════════════════ */}
      <section id="approche" className="py-24 md:py-32" style={{ backgroundColor: WHITE }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16 md:mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: GOLD, fontFamily: "var(--font-inter)" }}>
              {d.approche.eyebrow}
            </p>
            <h2
              className="font-black leading-tight max-w-lg"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              {d.approche.heading}
            </h2>
          </motion.div>

          <div>
            {d.approche.phases.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 py-7 md:py-9 ${i < d.approche.phases.length - 1 ? "border-b border-neutral-200" : ""}`}
                >
                  <div
                    className="flex w-11 h-11 rounded-full items-center justify-center shrink-0"
                    style={{ backgroundColor: OFF, border: `1.5px solid ${GOLD}50` }}
                  >
                    <Icon size={18} style={{ color: GOLD }} />
                  </div>
                  <div className="flex-1 sm:grid sm:grid-cols-2 sm:gap-8 items-center">
                    <h3 className="text-xl md:text-2xl font-black mb-2 sm:mb-0" style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VALEURS — statements forts, aucune icône, 2×2 premium
      ══════════════════════════════════════════════════════ */}
      <section id="valeurs" className="py-24 md:py-32" style={{ backgroundColor: OFF }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16 md:mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: GOLD, fontFamily: "var(--font-inter)" }}>
              {d.valeurs.eyebrow}
            </p>
            <h2
              className="font-black leading-tight max-w-lg"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              {d.valeurs.heading}
            </h2>
          </motion.div>

          {/* Grid 2×2 — statements éditoriaux, zéro icône */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-neutral-200">
            {d.valeurs.values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="border-b border-r border-neutral-200 p-10 md:p-12 bg-white flex flex-col gap-5"
              >
                {/* Label valeur */}
                <p
                  className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
                >
                  {v.title}
                </p>

                {/* Statement headline fort */}
                <h3
                  className="font-black leading-tight"
                  style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
                >
                  {v.headline}
                </h3>

                {/* Ligne or */}
                <div className="w-10 h-[2px] rounded-full" style={{ backgroundColor: GOLD }} />

                {/* Description */}
                <p className="text-sm md:text-base leading-relaxed" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          IMPLANTATIONS — typographie pure, pas de flags, pas de cartes
      ══════════════════════════════════════════════════════ */}
      <section id="implantations" className="py-24 md:py-32" style={{ backgroundColor: WHITE }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16 md:mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: GOLD, fontFamily: "var(--font-inter)" }}>
              {d.implantations.eyebrow}
            </p>
            <h2
              className="font-black leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              {d.implantations.heading}
            </h2>
          </motion.div>

          {/* ── BUREAUX — ancien style typographique + image subtile en fond ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-neutral-200 mb-28">
            {d.implantations.bureaux.map((o, i) => (
              <motion.div
                key={o.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative overflow-hidden pt-10 pb-10 ${
                  i < d.implantations.bureaux.length - 1 ? "border-b md:border-b-0 md:border-r border-neutral-200" : ""
                } ${i > 0 ? "md:pl-12" : ""} ${i > 0 && i < d.implantations.bureaux.length - 1 ? "md:pr-12" : ""}`}
              >
                {/* Image de ville en fond très subtil — bas de la carte */}
                <div className="absolute bottom-0 left-0 right-0 h-2/5 pointer-events-none overflow-hidden">
                  <Image
                    src={o.img}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover object-center"
                    sizes="33vw"
                  />
                  {/* Dégradé qui fait fondre l'image vers le blanc en haut */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, white 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0.4) 100%)" }}
                  />
                </div>

                {/* Contenu typographique — par-dessus l'image */}
                <div className="relative z-10">
                  <div className="w-8 h-[3px] rounded-full mb-7" style={{ backgroundColor: GOLD }} />

                  <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-3" style={{ color: "#999", fontFamily: "var(--font-inter)" }}>
                    {o.pays}
                  </p>

                  <h3
                    className="font-black leading-none mb-2"
                    style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
                  >
                    {o.city}
                  </h3>

                  <p className="text-xs uppercase tracking-widest font-semibold mb-7" style={{ color: GOLD, fontFamily: "var(--font-inter)" }}>
                    {o.role}
                  </p>

                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start gap-2">
                      <MapPin size={13} className="shrink-0 mt-0.5" style={{ color: GOLD }} />
                      <p className="text-sm leading-snug" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                        {o.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={13} className="shrink-0" style={{ color: GOLD }} />
                      <a href={`mailto:${o.email}`} className="text-sm hover:underline" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                        {o.email}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── ZONES D'INTERVENTION — minimaliste, épuré, sans images ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: GOLD, fontFamily: "var(--font-inter)" }}>
              {d.implantations.zonesEyebrow}
            </p>
            <h3
              className="font-black leading-tight mb-14"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              {d.implantations.zonesHeading}
            </h3>

            <div className="border-t border-neutral-200">
              {d.implantations.interventions.map((p, i) => (
                <motion.div
                  key={p.pays}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  className="flex items-baseline justify-between gap-8 py-7 border-b border-neutral-200 group"
                >
                  {/* Code pays */}
                  <span
                    className="text-xs font-semibold uppercase tracking-[0.25em] shrink-0 w-10"
                    style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
                  >
                    {p.code}
                  </span>

                  {/* Nom du pays */}
                  <span
                    className="flex-1 font-black leading-none"
                    style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
                  >
                    {p.pays}
                  </span>

                  {/* Détail — visible desktop */}
                  <span
                    className="hidden md:block text-sm text-right max-w-xs"
                    style={{ color: "#888", fontFamily: "var(--font-inter)" }}
                  >
                    {p.detail}
                  </span>

                  {/* Flèche discrète */}
                  <span style={{ color: GOLD, fontSize: 18, opacity: 0.5 }}>→</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-t" style={{ backgroundColor: OFF, borderColor: "#E8E8E8" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-2xl">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-6"
              style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
            >
              {d.cta.eyebrow}
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-black leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              {d.cta.heading}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="text-base md:text-lg leading-relaxed mb-10"
              style={{ color: BODY, fontFamily: "var(--font-inter)" }}
            >
              {d.cta.body}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:brightness-110"
                style={{ backgroundColor: GOLD, color: DARK, fontFamily: "var(--font-inter)" }}
              >
                {d.cta.primary} <ArrowRight size={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border text-sm font-semibold transition-colors duration-200 hover:bg-neutral-100"
                style={{ borderColor: "#D0D0D0", color: DARK, fontFamily: "var(--font-inter)" }}
              >
                {d.cta.secondary}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
