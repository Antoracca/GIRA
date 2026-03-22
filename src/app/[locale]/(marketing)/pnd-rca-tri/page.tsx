"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

/* ─── i18n Data ─── */

const PND_DATA = {
  fr: {
    hero: {
      badge: "Partenaire officiel \u00b7 Plan National de D\u00e9veloppement",
      title: "PND RCA 2024-2028",
      subtitle: "Sceller la confiance entre l\u2019\u00c9tat et la finance internationale",
      stats: [
        { value: "9 Mds USD", label: "Mobilis\u00e9s" },
        { value: "500+",      label: "Participants" },
        { value: "18",        label: "Accords sign\u00e9s" },
        { value: "Sept. 2025", label: "Casablanca" },
      ],
    },
    contexte: {
      label: "Contexte",
      title: "Un moment charni\u00e8re pour la R\u00e9publique Centrafricaine",
      paragraphs: [
        "La R\u00e9publique Centrafricaine traverse une phase d\u00e9cisive de son histoire. Apr\u00e8s des ann\u00e9es de fragilit\u00e9 institutionnelle, le gouvernement a lanc\u00e9 en 2024 un Plan National de D\u00e9veloppement ambitieux couvrant la p\u00e9riode 2024\u20132028, avec pour objectif de poser les fondations d\u2019un \u00c9tat stable, inclusif et \u00e9conomiquement diversifi\u00e9.",
        "Ce plan incarne une volont\u00e9 politique forte de rompre avec les cycles d\u2019instabilit\u00e9. Pour y parvenir, la RCA doit mobiliser des financements massifs aupr\u00e8s d\u2019acteurs internationaux exigeants, qui conditionnent leurs engagements \u00e0 des garanties de gouvernance et d\u2019ex\u00e9cution rigoureuses.",
        "C\u2019est dans ce contexte que GIRA a \u00e9t\u00e9 mandat\u00e9 en tant que partenaire officiel du PND RCA, avec pour mission de structurer l\u2019interface entre l\u2019\u00c9tat centrafricain et la communaut\u00e9 financi\u00e8re internationale.",
      ],
      axesCard: {
        title: "Les 5 axes strat\u00e9giques du PND",
        periodeLabel: "P\u00e9riode d\u2019ex\u00e9cution",
        axes: [
          "Gouvernance & \u00c9tat de droit",
          "Capital humain & d\u00e9veloppement social",
          "Relance \u00e9conomique & diversification du secteur priv\u00e9",
          "Protection de l\u2019environnement & r\u00e9silience climatique",
          "Infrastructure & d\u00e9senclavement du territoire",
        ],
      },
    },
    role: {
      label: "Partenaire d\u2019ex\u00e9cution",
      title: "Le r\u00f4le de GIRA",
      steps: [
        {
          num: "01",
          titre: "Diagnostic & cartographie",
          texte: "Analyse de l\u2019\u00e9cosyst\u00e8me de financement international et cartographie exhaustive des bailleurs potentiels. Banque Mondiale, BAD, AFD, fonds souverains, investisseurs priv\u00e9s qualifi\u00e9s.",
        },
        {
          num: "02",
          titre: "Structuration des dossiers",
          texte: "Pr\u00e9paration de dossiers d\u2019investissement conformes aux exigences des institutions multilat\u00e9rales\u00a0: \u00e9tudes de faisabilit\u00e9, mod\u00e8les financiers, cadres de gouvernance et matrices de risques.",
        },
        {
          num: "03",
          titre: "Organisation de la TRI Casablanca",
          texte: "Co-organisation de la Table Ronde des Investisseurs \u00e0 Casablanca en septembre 2025 \u2014 \u00e9v\u00e9nement de deux jours r\u00e9unissant 500+ participants issus de 47 pays autour du PND RCA 2024-2028.",
        },
        {
          num: "04",
          titre: "Facilitation des accords",
          texte: "Facilitation active des n\u00e9gociations ayant abouti \u00e0 la signature de 18 accords d\u2019investissement repr\u00e9sentant 9 milliards USD d\u2019engagements financiers fermes pour le d\u00e9veloppement de la RCA.",
        },
        {
          num: "05",
          titre: "Suivi post-TRI",
          texte: "Accompagnement continu dans la mise en \u0153uvre des accords sign\u00e9s\u00a0: coordination inter-institutionnelle, reporting aux bailleurs, suivi des jalons d\u2019ex\u00e9cution et ajustement des plans d\u2019action.",
        },
      ],
    },
    resultats: {
      label: "R\u00e9sultats \u00b7 Septembre 2025 \u00b7 Casablanca",
      title: "Table Ronde des Investisseurs. Casablanca 2025",
      stats: [
        { value: "9 Mds", suffix: "USD", label: "Engagements financiers mobilis\u00e9s" },
        { value: "500+",  suffix: "",    label: "Participants (gouvernements, bailleurs, investisseurs priv\u00e9s)" },
        { value: "18",    suffix: "",    label: "Accords de financement sign\u00e9s" },
        { value: "47",    suffix: "",    label: "Pays repr\u00e9sent\u00e9s" },
      ],
      body: "Organis\u00e9e les 14 et 15 septembre 2025 \u00e0 Casablanca, la Table Ronde des Investisseurs du PND RCA a constitu\u00e9 un jalon historique dans la mobilisation de financements pour l\u2019Afrique centrale. R\u00e9unissant gouvernements, institutions financi\u00e8res internationales et investisseurs priv\u00e9s de 47 pays, cet \u00e9v\u00e9nement a permis de concr\u00e9tiser des engagements \u00e0 hauteur de 9 milliards de dollars am\u00e9ricains en faveur du d\u00e9veloppement de la R\u00e9publique Centrafricaine.",
      imageCaption: "Table Ronde des Investisseurs du PND RCA. Casablanca, 14\u201315 septembre 2025",
    },
    cta: {
      title: "Vous pilotez un projet de d\u00e9veloppement national\u00a0?",
      body: "Notre \u00e9quipe est disponible pour vous pr\u00e9senter notre approche et discuter d\u2019une \u00e9ventuelle collaboration.",
      cta: "D\u00e9couvrir nos expertises",
    },
  },
  en: {
    hero: {
      badge: "Official NDP RCA 2024-2028 Partner",
      title: "NDP CAR 2024-2028",
      subtitle: "Sealing trust between the State and international finance",
      stats: [
        { value: "9B USD",     label: "Mobilized" },
        { value: "500+",       label: "Participants" },
        { value: "18",         label: "Agreements signed" },
        { value: "Sept. 2025", label: "Casablanca" },
      ],
    },
    contexte: {
      label: "Context",
      title: "A pivotal moment for the Central African Republic",
      paragraphs: [
        "The Central African Republic is going through a decisive phase in its history. After years of institutional fragility, the government launched in 2024 an ambitious National Development Plan covering the period 2024\u20132028, with the aim of laying the foundations of a stable, inclusive and economically diversified State.",
        "This plan embodies a strong political will to break with cycles of instability. To achieve this, the CAR must mobilize massive financing from demanding international actors, who condition their commitments on guarantees of governance and rigorous execution.",
        "It is in this context that GIRA was mandated as official partner of the NDP CAR, with the mission of structuring the interface between the Central African State and the international financial community.",
      ],
      axesCard: {
        title: "The 5 strategic axes of the NDP",
        periodeLabel: "Execution period",
        axes: [
          "Governance & Rule of Law",
          "Human capital & social development",
          "Economic recovery & private sector diversification",
          "Environmental protection & climate resilience",
          "Infrastructure & territorial connectivity",
        ],
      },
    },
    role: {
      label: "Execution partner",
      title: "GIRA\u2019s role",
      steps: [
        {
          num: "01",
          titre: "Diagnosis & Mapping",
          texte: "Analysis of the international financing ecosystem and comprehensive mapping of potential donors. World Bank, AfDB, AFD, sovereign funds, qualified private investors.",
        },
        {
          num: "02",
          titre: "File Structuring",
          texte: "Preparation of investment files compliant with multilateral institution requirements: feasibility studies, financial models, governance frameworks and risk matrices.",
        },
        {
          num: "03",
          titre: "Organization of the Casablanca IRT",
          texte: "Co-organization of the Investor Roundtable in Casablanca in September 2025 \u2014 a two-day event bringing together 500+ participants from 47 countries around the NDP RCA 2024-2028.",
        },
        {
          num: "04",
          titre: "Facilitation of Agreements",
          texte: "Active facilitation of negotiations leading to the signing of 18 investment agreements representing 9 billion USD in firm financial commitments for the development of the CAR.",
        },
        {
          num: "05",
          titre: "Post-IRT Follow-up",
          texte: "Continuous support in implementing signed agreements: inter-institutional coordination, donor reporting, execution milestone monitoring and action plan adjustment.",
        },
      ],
    },
    resultats: {
      label: "Results \u00b7 September 2025 \u00b7 Casablanca",
      title: "Investor Roundtable. Casablanca 2025",
      stats: [
        { value: "9B",   suffix: "USD", label: "Financial commitments mobilized" },
        { value: "500+", suffix: "",    label: "Participants (governments, donors, private investors)" },
        { value: "18",   suffix: "",    label: "Financing agreements signed" },
        { value: "47",   suffix: "",    label: "Countries represented" },
      ],
      body: "Held on September 14 and 15, 2025 in Casablanca, the Investor Roundtable of the NDP CAR marked a historic milestone in mobilizing financing for Central Africa. Bringing together governments, international financial institutions and private investors from 47 countries, this event resulted in commitments totaling 9 billion US dollars for the development of the Central African Republic.",
      imageCaption: "Investor Roundtable of the NDP CAR. Casablanca, September 14\u201315, 2025",
    },
    cta: {
      title: "Are you managing a national development project?",
      body: "Our team is available to present our approach and discuss a potential collaboration.",
      cta: "Discover our expertise",
    },
  },
} as const;

/* ─── Page ─── */

export default function PNDPage() {
  const locale = useLocale() as "fr" | "en";
  const t = PND_DATA[locale];

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
              {t.hero.badge}
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
            {t.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
            style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Stats chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {t.hero.stats.map((stat) => (
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
                {t.contexte.label}
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight mb-8"
                style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
              >
                {t.contexte.title}
              </h2>
              <div className="space-y-5">
                {t.contexte.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed"
                    style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                  >
                    {para}
                  </p>
                ))}
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
                {t.contexte.axesCard.title}
              </h3>
              <ol className="space-y-4">
                {t.contexte.axesCard.axes.map((axe, i) => (
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
                  {t.contexte.axesCard.periodeLabel}
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
              {t.role.label}
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {t.role.title}
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
              {t.role.steps.map((step, i) => (
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
              {t.resultats.label}
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight max-w-2xl"
              style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
            >
              {t.resultats.title}
            </h2>
          </motion.div>

          {/* Stats grid 2x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {t.resultats.stats.map((stat, i) => (
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
                {t.resultats.body}
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
                {t.resultats.imageCaption}
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
                {t.cta.title}
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter)" }}
              >
                {t.cta.body}
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
                {t.cta.cta}
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
