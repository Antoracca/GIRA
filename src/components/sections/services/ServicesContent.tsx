"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Settings, Briefcase, TrendingUp, Users } from "lucide-react";
import { GIRA } from "@/lib/constants";

const icons = [Settings, Briefcase, TrendingUp, Users];
const anchors = ["structuration", "execution", "financement", "renforcement"];

export default function ServicesContent() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex">
        {/* Sticky sidebar desktop */}
        <aside className="hidden lg:block w-64 shrink-0 self-start sticky top-24 pl-12 pr-6 py-8">
          <p className="text-xs uppercase tracking-widest mb-4 font-semibold" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
            Nos services
          </p>
          <nav className="space-y-3">
            {GIRA.services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block text-sm leading-snug transition-colors duration-200 py-1"
                style={{ color: "#666666", fontFamily: "var(--font-inter)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
              >
                {s.titre}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {GIRA.services.map((service, i) => {
            const Icon = icons[i];
            const isDark = i % 2 !== 0;
            return (
              <section
                key={service.id}
                id={anchors[i]}
                className="py-20 md:py-28 px-6 md:px-12 lg:px-16 scroll-mt-24"
                style={{ backgroundColor: isDark ? "#1A1A2E" : "#F5F5F0" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-3xl"
                >
                  {/* Icon */}
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
                    style={{ backgroundColor: isDark ? "rgba(201,168,76,0.15)" : "rgba(201,168,76,0.1)" }}
                  >
                    <Icon size={24} style={{ color: "#C9A84C" }} />
                  </div>

                  {/* Number */}
                  <p className="text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                    Service 0{i + 1}
                  </p>

                  <h2
                    className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2"
                    style={{ color: isDark ? "white" : "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
                  >
                    {service.titre}
                  </h2>
                  <p className="text-base font-medium mb-5" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                    {service.sousTitre}
                  </p>
                  <p className="text-base leading-relaxed mb-8" style={{ color: isDark ? "#AAAAAA" : "#444444", fontFamily: "var(--font-inter)" }}>
                    {service.description}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-3 mb-10">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: "#C9A84C" }} />
                        <span className="text-sm leading-relaxed" style={{ color: isDark ? "#CCCCCC" : "#555555", fontFamily: "var(--font-inter)" }}>
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center px-6 py-3 text-sm font-semibold transition-all duration-200"
                      style={{ backgroundColor: "#C9A84C", color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#D4AF37")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#C9A84C")}
                    >
                      Nous contacter
                    </Link>
                    <button
                      onClick={() => setModalOpen(true)}
                      className="inline-flex items-center px-6 py-3 text-sm font-semibold border transition-all duration-200"
                      style={{
                        borderColor: isDark ? "rgba(201,168,76,0.5)" : "#C9A84C",
                        color: "#C9A84C",
                        fontFamily: "var(--font-inter)",
                        backgroundColor: "transparent",
                      }}
                    >
                      Demander un devis IA
                    </button>
                  </div>
                </motion.div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Devis modal placeholder */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="rounded-2xl p-8 max-w-md w-full mx-4"
            style={{ backgroundColor: "#0D0D0D", border: "1px solid rgba(201,168,76,0.3)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>
              Parler à un expert GIRA
            </h3>
            <p className="text-sm mb-6" style={{ color: "#999999", fontFamily: "var(--font-inter)" }}>
              Notre assistant IA va vous aider à estimer votre besoin.
            </p>
            <p className="text-sm mb-6" style={{ color: "#CCCCCC", fontFamily: "var(--font-inter)" }}>
              Utilisez le bouton chat en bas à droite de la page pour démarrer une conversation.
            </p>
            <button
              onClick={() => setModalOpen(false)}
              className="w-full py-3 text-sm font-semibold transition-all duration-200"
              style={{ backgroundColor: "#C9A84C", color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
