"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

/* ─── animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── data ─── */
const stats = [
  { value: "45+", label: "Experts mobilisables" },
  { value: "3", label: "Continents" },
  { value: "8", label: "Secteurs couverts" },
  { value: "1", label: "PND soutenu" },
];

const phases = [
  {
    num: "01",
    title: "Diagnostic",
    desc: "Audit de l’existant, cartographie des acteurs, identification des contraintes",
  },
  {
    num: "02",
    title: "Structuration",
    desc: "Architecture du projet, plan de financement, gouvernance opérationnelle",
  },
  {
    num: "03",
    title: "Mobilisation",
    desc: "Activation du réseau d’investisseurs et de bailleurs, présentation aux décideurs",
  },
  {
    num: "04",
    title: "Exécution",
    desc: "Pilotage quotidien, reporting transparent, gestion des risques en temps réel",
  },
  {
    num: "05",
    title: "Transfert",
    desc: "Formation des équipes locales, documentation, pérennisation des acquis",
  },
];

const values = [
  {
    num: "01",
    title: "Exigence",
    desc: "Nous ne livrons pas moins que l’excellence. Chaque livrable porte la signature d’une équipe qui refuse le compromis sur la qualité.",
  },
  {
    num: "02",
    title: "Impact",
    desc: "Nos projets se mesurent en vies transformées, pas en slides produits. L’impact concret est notre seul indicateur de succès.",
  },
  {
    num: "03",
    title: "Transparence",
    desc: "Nos clients savent exactement où en sont leurs projets à tout moment. Aucune opacité sur les difficultés, aucun retard non communiqué.",
  },
  {
    num: "04",
    title: "Innovation",
    desc: "Nous apportons les meilleures pratiques mondiales au contexte africain. Nos solutions sont conçues pour durer, pas pour impressionner.",
  },
];

const offices = [
  {
    city: "Paris",
    role: "Siège",
    badge: "SIÈGE",
    address: "128, rue de la Boétie, 75008 Paris — France",
    coords: "48°52’N · 2°18’E",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=85&auto=format&fit=crop",
  },
  {
    city: "Casablanca",
    role: "Bureau Afrique",
    badge: null,
    address: "Casablanca, Maroc",
    coords: "33°35’N · 7°39’O",
    img: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=800&q=85&auto=format&fit=crop",
  },
  {
    city: "Bratislava",
    role: "Bureau Europe Centrale",
    badge: null,
    address: "Bratislava, Slovaquie",
    coords: "48°08’N · 17°06’E",
    img: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=85&auto=format&fit=crop",
  },
];

/* ================================================================
   PAGE COMPONENT
   ================================================================ */
export default function AProposPage() {
  return (
    <main>
      {/* ── SECTION 0 : HERO ────────────────────────────── */}
      <section
        id="overview"
        className="relative min-h-[50vh] flex flex-col justify-end"
        style={{
          background: "linear-gradient(160deg, #0D0D0D 0%, #1A1A2E 100%)",
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-40 md:pb-24 md:pt-52">
          {/* breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-2 text-sm"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <Link
              href="/"
              className="transition-colors"
              style={{ color: "#C9A84C" }}
            >
              Accueil
            </Link>
            <span style={{ color: "#C9A84C" }}>/</span>
            <span style={{ color: "#E8D5A3" }}>Le Cabinet</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Le Cabinet GIRA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-2xl text-lg md:text-xl"
            style={{ fontFamily: "var(--font-inter)", color: "#E8D5A3" }}
          >
            Un cabinet d'exécution né de la conviction que
            l'Afrique mérite une ingénierie de projet
            irréprochable.
          </motion.p>
        </div>
      </section>

      {/* ── SECTION 1 : NOTRE MISSION ───────────────────── */}
      <section
        id="mission"
        className="py-20 md:py-32"
        style={{ backgroundColor: "#F5F5F0" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
            style={{
              fontFamily: "var(--font-montserrat)",
              color: "#0D0D0D",
            }}
          >
            Structurer. Financer. Exécuter.
          </motion.h2>

          {/* editorial columns */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 grid gap-8 md:grid-cols-2"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="text-base leading-relaxed md:text-lg"
              style={{
                fontFamily: "var(--font-inter)",
                color: "#444444",
              }}
            >
              GIRA est un cabinet d'exécution des projets
              structurants, fondé à Paris et opérant en
              Afrique. Nous ne sommes ni un bureau d'études
              classique, ni une société de conseil
              généraliste. Nous sommes des exécutants
              — des architectes de projets qui passent de la conception
              à la livraison, sans compromis sur la qualité.
            </motion.p>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="text-base leading-relaxed md:text-lg"
              style={{
                fontFamily: "var(--font-inter)",
                color: "#444444",
              }}
            >
              Notre conviction : l'Afrique dispose des talents, des
              ressources et de la vision nécessaires pour mener ses
              propres transformations. Ce qui manque, c'est une
              exécution rigoureuse, des processus fiables et des
              partenaires qui tiennent leurs engagements. C'est exactement
              ce que GIRA apporte.
            </motion.p>
          </motion.div>

          {/* stats band */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white shadow-lg md:grid-cols-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col items-center justify-center px-4 py-10 text-center"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                {/* vertical separator (not on first item of each row) */}
                {i !== 0 && (
                  <span
                    className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 md:block"
                    style={{ backgroundColor: "#EBEBEB" }}
                  />
                )}
                <span
                  className="text-4xl font-extrabold sm:text-5xl"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "#C9A84C",
                  }}
                >
                  {s.value}
                </span>
                <span
                  className="mt-2 text-sm"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "#444444",
                  }}
                >
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2 : NOTRE APPROCHE ──────────────────── */}
      <section
        id="approche"
        className="py-20 md:py-32"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          {/* section label */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-inter)", color: "#C9A84C" }}
          >
            MÉTHODOLOGIE
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Notre approche en 5 phases
          </motion.h2>

          {/* horizontal process — desktop: flex row, mobile: flex col */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 flex flex-col md:flex-row"
          >
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex md:flex-1"
              >
                {/* phase content */}
                <div className="flex flex-1 flex-col py-8 md:px-6 md:py-0">
                  {/* gold dot + connector line row (desktop only) */}
                  <div className="mb-6 hidden items-center md:flex">
                    <div
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: "#C9A84C" }}
                    />
                    {i < phases.length - 1 && (
                      <div
                        className="h-px flex-1"
                        style={{ backgroundColor: "rgba(201,168,76,0.2)" }}
                      />
                    )}
                  </div>

                  {/* mobile: gold dot inline */}
                  <div className="mb-4 flex items-center gap-3 md:hidden">
                    <div
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: "#C9A84C" }}
                    />
                    <div
                      className="h-px flex-1"
                      style={{ backgroundColor: "rgba(201,168,76,0.15)" }}
                    />
                  </div>

                  {/* phase number */}
                  <span
                    className="text-xs font-extrabold"
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      color: "#C9A84C",
                      opacity: 0.5,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {phase.num}
                  </span>

                  {/* phase name */}
                  <h3
                    className="mt-2 text-base font-bold text-white"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {phase.title}
                  </h3>

                  {/* description */}
                  <p
                    className="mt-2 text-[13px] leading-relaxed"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    {phase.desc}
                  </p>
                </div>

                {/* vertical separator between phases on mobile */}
                {i < phases.length - 1 && (
                  <div
                    className="mx-0 my-2 w-px self-stretch md:hidden"
                    style={{ backgroundColor: "rgba(201,168,76,0.15)" }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3 : NOS VALEURS ─────────────────────── */}
      <section
        id="valeurs"
        className="py-20 md:py-32"
        style={{ backgroundColor: "#F5F5F0" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          {/* section label */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-inter)", color: "#C9A84C" }}
          >
            CULTURE &amp; PRINCIPES
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-montserrat)", color: "#0D0D0D" }}
          >
            Ce qui nous guide
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 grid gap-0 sm:grid-cols-2"
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative py-10 pr-8"
                style={{
                  borderBottom: "1px solid rgba(201,168,76,0.3)",
                }}
              >
                {/* watermark number */}
                <span
                  className="pointer-events-none absolute right-4 top-4 select-none font-extrabold leading-none"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "96px",
                    color: "rgba(201,168,76,0.12)",
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  {v.num}
                </span>

                {/* value name */}
                <h3
                  className="relative text-[28px] font-extrabold leading-tight"
                  style={{ fontFamily: "var(--font-montserrat)", color: "#0D0D0D" }}
                >
                  {v.title}
                </h3>

                {/* description */}
                <p
                  className="relative mt-4 max-w-sm text-base leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)", color: "#444444" }}
                >
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4 : NOS IMPLANTATIONS ───────────────── */}
      <section
        id="implantations"
        className="py-20 md:py-32"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Nos Implantations
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 grid gap-6 md:grid-cols-3"
          >
            {offices.map((o, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-2xl"
                style={{ backgroundColor: "#1A1A2E" }}
              >
                {/* image */}
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <Image
                    src={o.img}
                    alt={`Bureau GIRA ${o.city}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="p-6">
                  {/* badge */}
                  {o.badge && (
                    <span
                      className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
                      style={{
                        fontFamily: "var(--font-inter)",
                        color: "#C9A84C",
                        backgroundColor: "rgba(201,168,76,0.15)",
                        border: "1px solid rgba(201,168,76,0.4)",
                      }}
                    >
                      {o.badge}
                    </span>
                  )}

                  <h3
                    className="flex items-center gap-2 text-xl font-bold text-white"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    <MapPin
                      size={18}
                      style={{ color: "#C9A84C" }}
                      aria-hidden="true"
                    />
                    {o.city}{" "}
                    <span
                      className="text-base font-normal"
                      style={{ color: "#EBEBEB" }}
                    >
                      — {o.role}
                    </span>
                  </h3>

                  <p
                    className="mt-2 text-sm"
                    style={{
                      fontFamily: "var(--font-inter)",
                      color: "#EBEBEB",
                    }}
                  >
                    {o.address}
                  </p>

                  <p
                    className="mt-1 text-xs tracking-wider"
                    style={{
                      fontFamily: "monospace",
                      color: "#C9A84C",
                      opacity: 0.7,
                    }}
                  >
                    {o.coords}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5 : CTA FINAL ───────────────────────── */}
      <section
        className="py-20 md:py-32"
        style={{
          background: "linear-gradient(160deg, #1A1A2E 0%, #0D0D0D 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Prêt à structurer votre prochain projet ?
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10"
          >
            <Link
              href="/contact"
              className="inline-block rounded-full px-10 py-4 text-base font-bold transition-all duration-200 hover:shadow-2xl"
              style={{
                fontFamily: "var(--font-montserrat)",
                backgroundColor: "#C9A84C",
                color: "#0D0D0D",
              }}
            >
              Initier un mandat
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
