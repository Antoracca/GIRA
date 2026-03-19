"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const G = "#C9A84C";

const etapesRole = [
  {
    num: "01",
    titre: "Structuration des projets",
    texte:
      "Structuration et redimensionnement des projets inscrits dans le PND pour les rendre finançables et crédibles auprès des investisseurs internationaux, selon les standards de la Banque Mondiale et de la BAD.",
  },
  {
    num: "02",
    titre: "Préparation de la TRI",
    texte:
      "Préparation complète de la Table Ronde des Investisseurs de Casablanca (14-15 septembre 2025) : documents projets, argumentaires techniques, supports de présentation et fiches de financement.",
  },
  {
    num: "03",
    titre: "Mobilisation de la diaspora",
    texte:
      "Mobilisation de la diaspora centrafricaine et d'experts internationaux pour renforcer la crédibilité technique des projets présentés aux 500+ participants de la TRI.",
  },
  {
    num: "04",
    titre: "Mise en relation stratégique",
    texte:
      "Mise en relation avec des bailleurs multilatéraux, fonds souverains et investisseurs institutionnels pertinents, ayant abouti à 18 accords de financement signés.",
  },
  {
    num: "05",
    titre: "Exécution post-financement",
    texte:
      "Organisation de l'exécution des projets après la mobilisation des 9 milliards de dollars, avec une gouvernance alignée sur les standards internationaux et un suivi rigoureux des engagements.",
  },
];

const etapesApproche = [
  {
    num: "01",
    titre: "Analyse & Priorisation",
    texte:
      "Analyse des projets du PND et priorisation selon leur faisabilité, leur impact et leur attractivité pour les investisseurs internationaux.",
  },
  {
    num: "02",
    titre: "Structuration & Alignement",
    texte:
      "Structuration et alignement des projets avec les attentes des bailleurs (Banque Mondiale, BAD, AFD) et des investisseurs privés internationaux.",
  },
  {
    num: "03",
    titre: "Animation de la TRI",
    texte:
      "Préparation et coordination des échanges dans le cadre de la Table Ronde de Casablanca — 500+ participants, 2 jours intenses, résultats historiques.",
  },
  {
    num: "04",
    titre: "Suivi des engagements",
    texte:
      "Suivi des 18 accords signés et mise en place de mécanismes de gouvernance transparents pour l'exécution des projets financés.",
  },
  {
    num: "05",
    titre: "Mise en œuvre effective",
    texte:
      "Accompagnement des ministères, agences et opérateurs centrafricains dans la mise en œuvre concrète des projets du PND.",
  },
];

const triStats = [
  { value: "9 Mds $", label: "Mobilisés", detail: "Contre 8 Mds projetés" },
  { value: "500+", label: "Participants", detail: "Europe, USA, Moyen-Orient, Asie, Afrique" },
  { value: "18", label: "Accords signés", detail: "Engagements formels de financement" },
  { value: "14-15/09", label: "Casablanca", detail: "Hyatt Regency, Royaume du Maroc" },
];

export default function PNDContent() {
  return (
    <>
      {/* ── Section Contexte ── */}
      <section className="py-20 md:py-32" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: texte */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 text-xs uppercase tracking-widest mb-6 border"
                style={{
                  backgroundColor: "rgba(201,168,76,0.08)",
                  borderColor: "rgba(201,168,76,0.35)",
                  color: G,
                  fontFamily: "var(--font-inter)",
                }}
              >
                Moment charnière pour la RCA
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight mb-6"
                style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
              >
                Un plan de transformation nationale sans précédent
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
              >
                La République Centrafricaine a défini un Plan National de Développement
                (PND) 2024-2028 — baptisé <strong className="font-semibold text-[#0D0D0D]">&ldquo;Ambition 28&rdquo;</strong> — visant à
                transformer son économie, renforcer ses infrastructures numériques et
                améliorer les conditions de vie de sa population sur l&apos;ensemble des
                8 secteurs prioritaires.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
              >
                Dans ce cadre, la Table Ronde des Investisseurs (TRI) s&apos;est tenue
                les <strong className="font-semibold text-[#0D0D0D]">14 et 15 septembre 2025</strong> à Casablanca, Royaume du Maroc —
                mobilisant des financements historiques auprès de 500 participants issus
                de 4 continents.
              </p>
            </motion.div>

            {/* Right: Image + stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-4"
            >
              {/* Ambition 28 image */}
              <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image
                  src="/pnd.jpeg"
                  alt="Ambition 28 — Table Ronde des Investisseurs de Casablanca 2025"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(13,13,13,0.6) 0%, transparent 50%)",
                  }}
                />
                <div className="absolute bottom-4 left-4">
                  <span
                    className="text-[9px] uppercase tracking-[0.25em] px-2.5 py-1 border"
                    style={{
                      borderColor: "rgba(201,168,76,0.5)",
                      color: "#E8D5A3",
                      backgroundColor: "rgba(13,13,13,0.7)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    Casablanca · Septembre 2025
                  </span>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {triStats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white rounded-2xl p-5 border border-neutral-100"
                  >
                    <p
                      className="text-2xl font-black leading-none mb-1"
                      style={{ color: G, fontFamily: "var(--font-montserrat)" }}
                    >
                      {s.value}
                    </p>
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
                    >
                      {s.label}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "#888888", fontFamily: "var(--font-inter)" }}
                    >
                      {s.detail}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Section Rôle GIRA — timeline ── */}
      <section className="py-20 md:py-32" style={{ backgroundColor: "#1A1A2E" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 max-w-xl"
          >
            <p
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: G, fontFamily: "var(--font-inter)" }}
            >
              Un partenaire d&apos;exécution
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Le rôle de GIRA au service de l&apos;État centrafricain
            </h2>
          </motion.div>
          <div className="space-y-4">
            {etapesRole.map((e, i) => (
              <motion.div
                key={e.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-6 p-6 rounded-2xl border border-white/5"
                style={{ backgroundColor: "rgba(255,255,255,0.025)" }}
              >
                <span
                  className="text-3xl font-black shrink-0 w-12"
                  style={{ color: G, fontFamily: "var(--font-montserrat)" }}
                >
                  {e.num}
                </span>
                <div>
                  <h3
                    className="font-bold text-white mb-1.5"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {e.titre}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#9999AA", fontFamily: "var(--font-inter)" }}
                  >
                    {e.texte}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section Approche intégrée ── */}
      <section className="py-20 md:py-32" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 max-w-xl"
          >
            <p
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: G, fontFamily: "var(--font-inter)" }}
            >
              Du PND à la mise en œuvre
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
            >
              Une approche intégrée : du PND à la mise en œuvre des projets
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {etapesApproche.map((e, i) => (
              <motion.div
                key={e.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-sm border-l-4"
                style={{ borderLeftColor: G }}
              >
                <span
                  className="text-4xl font-black block mb-3"
                  style={{ color: G, fontFamily: "var(--font-montserrat)" }}
                >
                  {e.num}
                </span>
                <h3
                  className="font-bold mb-2"
                  style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
                >
                  {e.titre}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#666666", fontFamily: "var(--font-inter)" }}
                >
                  {e.texte}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#0D0D0D" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <h2
                className="text-2xl md:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Vous souhaitez en savoir plus sur notre implication dans la TRI ?
              </h2>
              <p
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}
              >
                Notre équipe est disponible pour vous présenter notre approche et discuter
                d&apos;une éventuelle collaboration dans le cadre du PND RCA 2024-2028.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold transition-all duration-200"
              style={{ backgroundColor: G, color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "#D4AF37")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = G)
              }
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
