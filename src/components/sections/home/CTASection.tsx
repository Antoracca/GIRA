"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function CTASection() {
  const locale = useLocale() as "fr" | "en";

  return (
    <section
      className="py-20 md:py-32"
      style={{ backgroundColor: "#F5F5F0" }}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5"
            style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
          >
            {locale === "en"
              ? "Do you have a strategic project to bring to life?"
              : "Vous avez un projet stratégique à concrétiser\u00a0?"}
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed mb-10"
            style={{ color: "#666666", fontFamily: "var(--font-inter)" }}
          >
            {locale === "en"
              ? "Let's talk. GIRA puts a team of experts at your disposal to help you structure, finance and execute your projects."
              : "Parlons-en. GIRA met à votre disposition une équipe d\u2019experts pour vous aider à structurer, financer et exécuter vos projets."}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold transition-all duration-200"
            style={{
              backgroundColor: "#C9A84C",
              color: "#0D0D0D",
              fontFamily: "var(--font-inter)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#D4AF37";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#C9A84C";
            }}
          >
            {locale === "en" ? "Contact us" : "Nous contacter"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
