"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
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

/* ─── Data ───────────────────────────────────────────────── */
const phases = [
  { title: "Diagnostic",    icon: Search,     desc: "Audit de l'existant, cartographie des acteurs, identification des contraintes réelles du terrain." },
  { title: "Structuration", icon: Layers,     desc: "Architecture du projet, plan de financement, mise en place de la gouvernance opérationnelle." },
  { title: "Mobilisation",  icon: Users,      desc: "Activation du réseau d'investisseurs et de bailleurs, présentation aux décideurs stratégiques." },
  { title: "Exécution",     icon: Crosshair,  desc: "Pilotage terrain avec standards internationaux, maîtrise rigoureuse des délais et des coûts." },
  { title: "Impact",        icon: TrendingUp, desc: "Mesure des résultats, transfert de compétences aux équipes locales, pérennisation des acquis." },
];

/* Valeurs : statements forts, aucune icône */
const values = [
  {
    headline: "Nous créons ce qui n'existait pas encore",
    title: "Innovation",
    desc: "Nos solutions ne sont pas importées. Elles sont conçues pour les réalités africaines, avec les standards les plus exigeants du monde. Chaque projet est une réponse inédite à un défi concret.",
  },
  {
    headline: "L'excellence est notre minimum, pas notre ambition",
    title: "Exigence",
    desc: "Chaque engagement GIRA est tenu. Chaque livrable porte notre signature. Pas de rapport de complaisance, pas de délai glissé sous silence. L'exigence est notre point de départ.",
  },
  {
    headline: "Nos clients ne découvrent jamais les mauvaises nouvelles trop tard",
    title: "Transparence",
    desc: "Ce qui ne va pas est dit immédiatement, avec clarté et solutions. Nos clients ont une visibilité totale sur l'avancement de leurs projets, à chaque étape de l'exécution.",
  },
  {
    headline: "Nos projets finissent dans les vies, pas dans les rapports",
    title: "Impact",
    desc: "Notre seul indicateur de succès est l'impact concret sur les populations. Pas les slides produits, pas les réunions tenues. Ce qui compte, c'est ce qui change sur le terrain.",
  },
];

const bureaux = [
  {
    city: "Paris",
    pays: "France",
    role: "Siège social",
    address: "128, rue de la Boétie, 75008 Paris",
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
];

const interventions = [
  {
    pays: "République Centrafricaine",
    code: "RCA",
    detail: "Partenaire PND 2024-2028",
    img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=85&auto=format&fit=crop",
  },
  {
    pays: "Cameroun",
    code: "CMR",
    detail: "Structuration et financement de projets",
    img: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=900&q=85&auto=format&fit=crop",
  },
  {
    pays: "Gabon",
    code: "GAB",
    detail: "Structuration de projets",
    img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=900&q=85&auto=format&fit=crop",
  },
  {
    pays: "Congo",
    code: "COG",
    detail: "Digitalisation des secteurs",
    img: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=900&q=85&auto=format&fit=crop",
  },
];

/* ================================================================
   PAGE
================================================================ */
export default function AProposPage() {
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
            <Link href="/" className="text-xs uppercase tracking-widest" style={{ color: "#999", fontFamily: "var(--font-inter)" }}>Accueil</Link>
            <span style={{ color: "#CCC", fontSize: 11 }}>›</span>
            <span className="text-xs uppercase tracking-widest" style={{ color: GOLD, fontFamily: "var(--font-inter)" }}>Le Cabinet</span>
          </motion.nav>

          {/* 2 colonnes : titre gauche / stats verticales droite */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-start">

            {/* Titre + sous-titre */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-6" style={{ color: GOLD, fontFamily: "var(--font-inter)" }}>
                Qui nous sommes
              </p>
              <h1
                className="font-black leading-[1.0] tracking-tight mb-8"
                style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
              >
                Le Cabinet<br /><span style={{ color: GOLD }}>GIRA</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed max-w-xl" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                Un cabinet d&apos;exécution né de la conviction que l&apos;Afrique mérite
                une ingénierie de projet irréprochable. Structurer, financer, exécuter.
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
              {[
                { v: "45+", l: "Experts mobilisés" },
                { v: "3",   l: "Pays de présence" },
                { v: "8",   l: "Secteurs couverts" },
                { v: "4",   l: "Piliers d'intervention" },
              ].map((s, i) => (
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
              Notre mission
            </p>
            <h2
              className="font-black leading-tight mb-16 max-w-3xl"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              Là où la théorie s&apos;arrête,<br />notre mandat commence.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                GIRA comble la fracture entre l&apos;ambition institutionnelle et la réalité
                du terrain africain. Nous accélérons la mise en œuvre des projets
                stratégiques définis par les États et leurs partenaires.
              </p>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                Nous renforçons la crédibilité de chaque projet auprès des bailleurs
                et investisseurs, par une structuration rigoureuse et une gouvernance
                irréprochable.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
              <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                Nous garantissons une exécution efficace, transparente et alignée avec
                les standards internationaux. De la conception à la livraison finale,
                sans compromis sur la qualité.
              </p>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                Nous contribuons à un développement inclusif, résilient et durable
                des pays africains, en plaçant l&apos;impact humain et social au cœur
                de chaque décision.
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
              Notre approche
            </p>
            <h2
              className="font-black leading-tight max-w-lg"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              Une méthode en cinq phases
            </h2>
          </motion.div>

          <div>
            {phases.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 py-7 md:py-9 ${i < phases.length - 1 ? "border-b border-neutral-200" : ""}`}
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
              Ce qui nous guide
            </p>
            <h2
              className="font-black leading-tight max-w-lg"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              Nos valeurs
            </h2>
          </motion.div>

          {/* Grid 2×2 — statements éditoriaux, zéro icône */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-neutral-200">
            {values.map((v, i) => (
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
              Présence internationale
            </p>
            <h2
              className="font-black leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              Nos bureaux
            </h2>
          </motion.div>

          {/* ── BUREAUX — ancien style typographique + image subtile en fond ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-neutral-200 mb-28">
            {bureaux.map((o, i) => (
              <motion.div
                key={o.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative overflow-hidden pt-10 pb-10 ${
                  i < bureaux.length - 1 ? "border-b md:border-b-0 md:border-r border-neutral-200" : ""
                } ${i > 0 ? "md:pl-12" : ""} ${i > 0 && i < bureaux.length - 1 ? "md:pr-12" : ""}`}
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
              Zones d&apos;intervention
            </p>
            <h3
              className="font-black leading-tight mb-14"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              Nous opérons principalement en Afrique
            </h3>

            <div className="border-t border-neutral-200">
              {interventions.map((p, i) => (
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
              Prêt à collaborer ?
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-black leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              Structurons ensemble votre prochain projet.
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="text-base md:text-lg leading-relaxed mb-10"
              style={{ color: BODY, fontFamily: "var(--font-inter)" }}
            >
              Notre équipe répond sous 24h. Paris, Marrakech, Bratislava.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:brightness-110"
                style={{ backgroundColor: GOLD, color: DARK, fontFamily: "var(--font-inter)" }}
              >
                Initier un mandat <ArrowRight size={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border text-sm font-semibold transition-colors duration-200 hover:bg-neutral-100"
                style={{ borderColor: "#D0D0D0", color: DARK, fontFamily: "var(--font-inter)" }}
              >
                Nos services
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
