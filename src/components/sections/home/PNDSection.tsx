"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const G = "#C9A84C";

const stats = [
  { value: "9 Mds $", label: "Mobilisés" },
  { value: "500+", label: "Participants" },
  { value: "18", label: "Accords signés" },
  { value: "Sept. 2025", label: "Casablanca" },
];

export default function PNDSection() {
  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{
        backgroundColor: "#0D0D0D",
        /* Mobile : hauteur raisonnée, Desktop : plus généreux */
        minHeight: "clamp(520px, 75vh, 820px)",
      }}
    >
      {/* ── Image d'arrière-plan ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pnd.jpeg"
          alt="Table Ronde des Investisseurs de Casablanca, PND RCA 2024-2028"
          fill
          /* Mobile : centré sur le sujet ; Desktop : décalé à droite */
          style={{
            objectFit: "cover",
            objectPosition: "center center",
          }}
          sizes="100vw"
        />

        {/*
          ── Overlay mobile : très sombre pour lisibilité totale ──
          Fond noir opaque en haut et en bas, fenêtre étroite au milieu.
          L'image reste en ambiance mais ne gêne pas la lecture.
        */}
        <div
          className="md:hidden absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.82) 35%, rgba(13,13,13,0.80) 65%, rgba(13,13,13,0.97) 100%)",
          }}
        />

        {/*
          ── Overlay desktop : sombre à gauche → image visible à droite ──
        */}
        <div
          className="hidden md:block absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #0D0D0D 0%, #0D0D0D 38%, rgba(13,13,13,0.88) 52%, rgba(13,13,13,0.5) 72%, rgba(13,13,13,0.18) 100%)",
          }}
        />
      </div>

      {/* ── Contenu ── */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-5 sm:px-8 md:px-12 lg:px-24 py-14 sm:py-20 md:py-32">
        <div className="max-w-lg sm:max-w-xl lg:max-w-2xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8"
          >
            <div
              className="inline-block border-l-2 pl-3 sm:pl-4"
              style={{ borderLeftColor: G }}
            >
              <p
                className="text-[9px] uppercase tracking-[0.38em] font-semibold leading-none mb-1.5"
                style={{ color: "rgba(201,168,76,0.6)", fontFamily: "var(--font-inter)" }}
              >
                Partenaire officiel
              </p>
              <p
                className="text-sm font-black leading-none"
                style={{ color: "#E8D5A3", fontFamily: "var(--font-montserrat)", letterSpacing: "0.04em" }}
              >
                PND RCA 2024–2028
              </p>
            </div>
          </motion.div>

          {/* Titre */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-black leading-[1.1] text-white mb-5 sm:mb-6"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(1.6rem, 5vw, 3.5rem)",
            }}
          >
            RCA 2024-2028&nbsp;:{" "}
            <span style={{ color: G }}>Sceller la confiance</span>
            <br />
            entre l&apos;État et la finance internationale
          </motion.h2>

          {/* Corps */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-inter)" }}
          >
            Né dans le sillage du Plan National de Développement de la République
            Centrafricaine, GIRA a orchestré la Table Ronde des Investisseurs (TRI) de
            Casablanca, un événement historique ayant mobilisé{" "}
            <strong className="font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
              9 milliards de dollars
            </strong>{" "}
            auprès de 500 participants issus de 4 continents, en septembre 2025.
          </motion.p>

          {/* Chips de stats ── 2 colonnes sur mobile, 4 sur sm+ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mb-8 sm:mb-10"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="px-3 sm:px-4 py-3 border"
                style={{
                  borderColor: "rgba(201,168,76,0.22)",
                  backgroundColor: "rgba(201,168,76,0.05)",
                }}
              >
                <p
                  className="text-lg sm:text-xl font-black leading-none mb-1"
                  style={{ color: G, fontFamily: "var(--font-montserrat)" }}
                >
                  {s.value}
                </p>
                <p
                  className="text-[9px] sm:text-[10px] uppercase tracking-wider"
                  style={{ color: "rgba(255,255,255,0.40)", fontFamily: "var(--font-inter)" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA ── colonne sur mobile, ligne sur sm+ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.44 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
          >
            <Link
              href="/pnd-rca-tri"
              className="inline-flex items-center gap-2 text-sm font-semibold group"
              style={{ color: G, fontFamily: "var(--font-inter)" }}
            >
              Découvrir notre implication dans le PND &amp; la TRI
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0"
              />
            </Link>

            <span
              className="hidden sm:block w-px h-4"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            />

            <Link
              href="/contact"
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#FFFFFF")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")
              }
            >
              Nous contacter
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Fondu bas */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 md:h-24 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent, #0D0D0D)" }}
      />
    </section>
  );
}
