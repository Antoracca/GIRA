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
      style={{ backgroundColor: "#0D0D0D", minHeight: "clamp(560px, 85vh, 820px)" }}
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pnd.jpeg"
          alt="Ambition 28 — Table Ronde des Investisseurs de Casablanca, PND RCA 2024-2028"
          fill
          style={{ objectFit: "cover", objectPosition: "65% center" }}
          sizes="100vw"
        />
        {/* Gradient desktop: dark left → show image right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #0D0D0D 0%, #0D0D0D 38%, rgba(13,13,13,0.88) 52%, rgba(13,13,13,0.5) 72%, rgba(13,13,13,0.18) 100%)",
          }}
        />
        {/* Gradient mobile: dark at top+bottom */}
        <div
          className="md:hidden absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.1) 40%, rgba(13,13,13,0.1) 60%, rgba(13,13,13,0.97) 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-32">
        <div className="max-w-xl lg:max-w-2xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div
              className="inline-block border-l-2 pl-4"
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

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-black leading-[1.08] text-white mb-6"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            RCA 2024-2028 :{" "}
            <span style={{ color: G }}>Sceller la confiance</span>
            <br className="hidden sm:block" />
            {" "}entre l&apos;État et la finance internationale
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}
          >
            Né dans le sillage du Plan National de Développement de la République
            Centrafricaine, GIRA a orchestré la Table Ronde des Investisseurs (TRI) de
            Casablanca — un événement historique ayant mobilisé{" "}
            <strong className="font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
              9 milliards de dollars
            </strong>{" "}
            auprès de 500 participants issus de 4 continents, en septembre 2025.
          </motion.p>

          {/* Stats chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-10"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="px-4 py-3 border"
                style={{
                  borderColor: "rgba(201,168,76,0.22)",
                  backgroundColor: "rgba(201,168,76,0.04)",
                }}
              >
                <p
                  className="text-xl font-black leading-none mb-1"
                  style={{ color: G, fontFamily: "var(--font-montserrat)" }}
                >
                  {s.value}
                </p>
                <p
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.44 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <Link
              href="/pnd-rca-tri"
              className="inline-flex items-center gap-2 text-sm font-semibold group"
              style={{ color: G, fontFamily: "var(--font-inter)" }}
            >
              Découvrir notre implication dans le PND &amp; la TRI
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
            <span
              className="hidden sm:block w-px h-4"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
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

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, #0D0D0D)",
        }}
      />
    </section>
  );
}
