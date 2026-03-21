"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

/* ─── Data ─── */

const heroStats = [
  { value: "9 Mds USD", label: "Mobilisés" },
  { value: "500+", label: "Participants" },
  { value: "18", label: "Accords signés" },
  { value: "Sept. 2025", label: "Casablanca" },
];

const axesPND = [
  "Gouvernance & État de droit",
  "Capital humain & développement social",
  "Relance économique & diversification du secteur privé",
  "Protection de l'environnement & résilience climatique",
  "Infrastructure & désenclavement du territoire",
];

const timelineSteps = [
  {
    num: "01",
    titre: "Diagnostic & cartographie",
    texte:
      "Analyse de l'écosystème de financement international et cartographie exhaustive des bailleurs potentiels. Banque Mondiale, BAD, AFD, fonds souverains, investisseurs privés qualifiés.",
  },
  {
    num: "02",
    titre: "Structuration des dossiers",
    texte:
      "Préparation de dossiers d'investissement conformes aux exigences des institutions multilatérales : études de faisabilité, modèles financiers, cadres de gouvernance et matrices de risques.",
  },
  {
    num: "03",
    titre: "Organisation de la TRI Casablanca",
    texte:
      "Co-organisation de la Table Ronde des Investisseurs à Casablanca en septembre 2025 — événement de deux jours réunissant 500+ participants issus de 47 pays autour du PND RCA 2024-2028.",
  },
  {
    num: "04",
    titre: "Facilitation des accords",
    texte:
      "Facilitation active des négociations ayant abouti à la signature de 18 accords d'investissement représentant 9 milliards USD d'engagements financiers fermes pour le développement de la RCA.",
  },
  {
    num: "05",
    titre: "Suivi post-TRI",
    texte:
      "Accompagnement continu dans la mise en œuvre des accords signés : coordination inter-institutionnelle, reporting aux bailleurs, suivi des jalons d'exécution et ajustement des plans d'action.",
  },
];

const resultatsStats = [
  { value: "9 Mds", suffix: "USD", label: "Engagements financiers mobilisés" },
  { value: "500+", suffix: "", label: "Participants (gouvernements, bailleurs, investisseurs privés)" },
  { value: "18", suffix: "", label: "Accords de financement signés" },
  { value: "47", suffix: "", label: "Pays représentés" },
];

/* ─── Page ─── */

export default function PNDPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO. Id="overview"
      ══════════════════════════════════════════════ */}
      <section
        id="overview"
        className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden"
      >
        {/* Background image */}
        <Image
          src="/pnd.jpeg"
          alt="Table Ronde des Investisseurs du PND RCA. Casablanca 2025"
          fill
          priority
          unoptimized={false}
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Gradient overlay. Dense left, fades right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #0D0D0D 40%, rgba(13,13,13,0.7) 70%, rgba(13,13,13,0.3) 100%)",
          }}
        />
        {/* Bottom gradient for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(13,13,13,0.8) 0%, rgba(13,13,13,0.15) 50%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 w-full pb-12 md:pb-20 pt-40">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-3 pl-4 pr-5 py-2 mb-6 border-l-2"
            style={{
              borderLeftColor: "#C9A84C",
              backgroundColor: "rgba(201,168,76,0.06)",
            }}
          >
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
            >
              Partenaire officiel · Plan National de Développement
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.08] max-w-3xl mb-5"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            PND RCA 2024-2028
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
            style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
          >
            Sceller la confiance entre l'État et la finance internationale
          </motion.p>

          {/* Stats chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(0,0,0,0.40)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <span
                  className="text-sm font-bold"
                  style={{ color: "#C9A84C", fontFamily: "var(--font-montserrat)" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.70)", fontFamily: "var(--font-inter)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTEXTE. Id="contexte"
      ══════════════════════════════════════════════ */}
      <section
        id="contexte"
        className="py-20 md:py-32"
        style={{ backgroundColor: "#F5F5F0" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left. Editorial text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-xs uppercase tracking-widest mb-3 font-medium"
                style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
              >
                Contexte
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight mb-8"
                style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
              >
                Un moment charnière pour la République Centrafricaine
              </h2>
              <div className="space-y-5">
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                >
                  La République Centrafricaine traverse une phase décisive de son
                  histoire. Après des années de fragilité institutionnelle, le
                  gouvernement a lancé en 2024 un Plan National de Développement
                  ambitieux couvrant la période 2024–2028, avec pour objectif de
                  poser les fondations d'un État stable, inclusif et économiquement
                  diversifié.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                >
                  Ce plan incarne une volonté politique forte de rompre avec les
                  cycles d'instabilité. Pour y parvenir, la RCA doit mobiliser des
                  financements massifs auprès d'acteurs internationaux exigeants,
                  qui conditionnent leurs engagements à des garanties de gouvernance
                  et d'exécution rigoureuses.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                >
                  C'est dans ce contexte que GIRA a été mandaté en tant que
                  partenaire officiel du PND RCA, avec pour mission de structurer
                  l'interface entre l'État centrafricain et la communauté financière
                  internationale.
                </p>
              </div>
            </motion.div>

            {/* Right. PND axes card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-sm border-l-4"
              style={{ borderLeftColor: "#C9A84C" }}
            >
              <h3
                className="text-lg font-bold mb-6"
                style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
              >
                Les 5 axes stratégiques du PND
              </h3>
              <ol className="space-y-4">
                {axesPND.map((axe, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                      style={{
                        backgroundColor: "rgba(201,168,76,0.15)",
                        color: "#C9A84C",
                        fontFamily: "var(--font-montserrat)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <p
                      className="text-sm leading-relaxed pt-0.5"
                      style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                    >
                      {axe}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="mt-8 pt-6 border-t border-[#EBEBEB]">
                <p
                  className="text-xs uppercase tracking-wide"
                  style={{ color: "#999999", fontFamily: "var(--font-inter)" }}
                >
                  Période d'exécution
                </p>
                <p
                  className="text-3xl font-black mt-1"
                  style={{ color: "#C9A84C", fontFamily: "var(--font-montserrat)" }}
                >
                  2024 – 2028
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          RÔLE DE GIRA. Id="role"
      ══════════════════════════════════════════════ */}
      <section
        id="role"
        className="py-20 md:py-32"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 max-w-xl"
          >
            <p
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
            >
              Partenaire d'exécution
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Le rôle de GIRA
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Gold vertical line */}
            <div
              className="absolute left-[19px] top-0 bottom-0 w-px hidden md:block"
              style={{ backgroundColor: "rgba(201,168,76,0.25)" }}
            />

            <div className="space-y-6">
              {timelineSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-6 md:gap-8"
                >
                  {/* Circle on line */}
                  <div
                    className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                    style={{
                      backgroundColor: "#0D0D0D",
                      border: "2px solid #C9A84C",
                      color: "#C9A84C",
                      fontFamily: "var(--font-montserrat)",
                    }}
                  >
                    {step.num}
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 p-6 rounded-2xl border border-white/5"
                    style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                  >
                    <h3
                      className="font-bold text-white mb-2"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {step.titre}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#9999AA", fontFamily: "var(--font-inter)" }}
                    >
                      {step.texte}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          RÉSULTATS TRI. Id="resultats"
      ══════════════════════════════════════════════ */}
      <section
        id="resultats"
        className="py-20 md:py-32"
        style={{ backgroundColor: "#F5F5F0" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
            >
              Résultats · Septembre 2025 · Casablanca
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight max-w-2xl"
              style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
            >
              Table Ronde des Investisseurs. Casablanca 2025
            </h2>
          </motion.div>

          {/* Stats grid 2x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {resultatsStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm"
              >
                <div className="flex items-baseline gap-2 mb-3">
                  <span
                    className="text-5xl md:text-6xl font-black leading-none"
                    style={{ color: "#C9A84C", fontFamily: "var(--font-montserrat)" }}
                  >
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span
                      className="text-2xl md:text-3xl font-bold"
                      style={{ color: "#C9A84C", fontFamily: "var(--font-montserrat)" }}
                    >
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Text + image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-base leading-relaxed"
                style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
              >
                Organisée les 14 et 15 septembre 2025 à Casablanca, la Table
                Ronde des Investisseurs du PND RCA a constitué un jalon
                historique dans la mobilisation de financements pour l'Afrique
                centrale. Réunissant gouvernements, institutions financières
                internationales et investisseurs privés de 47 pays, cet événement
                a permis de concrétiser des engagements à hauteur de 9 milliards
                de dollars américains en faveur du développement de la République
                Centrafricaine.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="relative"
            >
              <div
                className="relative w-full rounded-2xl overflow-hidden"
                style={{ aspectRatio: "16/10" }}
              >
                <Image
                  src="/pnd.jpeg"
                  alt="Table Ronde des Investisseurs du PND RCA. Casablanca, septembre 2025"
                  fill
                  unoptimized={false}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,13,13,0.5) 0%, transparent 40%)",
                  }}
                />
              </div>
              <p
                className="mt-3 text-xs italic"
                style={{ color: "#888888", fontFamily: "var(--font-inter)" }}
              >
                Table Ronde des Investisseurs du PND RCA. Casablanca,
                14–15 septembre 2025
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-32"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <h2
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Vous pilotez un projet de développement national ?
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter)" }}
              >
                Notre équipe est disponible pour vous présenter notre approche et
                discuter d'une éventuelle collaboration.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Link
                href="/services"
                className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-2xl"
                style={{
                  backgroundColor: "#C9A84C",
                  color: "#0D0D0D",
                  fontFamily: "var(--font-montserrat)",
                }}
              >
                Découvrir nos expertises
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
