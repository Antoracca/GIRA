"use client";

import { useState } from "react";
import { Mail, ArrowRight, Bell, FileText, BarChart2, Calendar } from "lucide-react";

/* ─────────────────────────── Newsletter Form ─────────────────────────── */

function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}
        >
          <Mail size={20} style={{ color: "#C9A84C" }} />
        </div>
        <p
          className="font-montserrat text-lg font-semibold text-white mb-2"
        >
          Merci pour votre inscription
        </p>
        <p className="font-inter text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          Vous recevrez nos premières publications dès leur parution.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Prénom + Organisation : row sur desktop, colonne sur mobile */}
      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <input
          type="text"
          placeholder="Votre prénom"
          className="w-full sm:flex-1 px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "#FFFFFF",
            border: "1px solid rgba(201,168,76,0.2)",
            fontFamily: "var(--font-inter)",
            fontSize: "16px",
          }}
        />
        <input
          type="text"
          placeholder="Organisation"
          className="w-full sm:flex-1 px-4 py-3.5 rounded-xl text-sm outline-none transition-all"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "#FFFFFF",
            border: "1px solid rgba(201,168,76,0.2)",
            fontFamily: "var(--font-inter)",
            fontSize: "16px",
          }}
        />
      </div>

      {/* Email */}
      <input
        type="email"
        placeholder="votre@email.com"
        required
        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none mb-3"
        style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          color: "#FFFFFF",
          border: "1px solid rgba(201,168,76,0.25)",
          fontFamily: "var(--font-inter)",
          fontSize: "16px",
        }}
      />

      {/* Submit */}
      <button
        type="submit"
        className="w-full px-6 py-4 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:brightness-105"
        style={{
          backgroundColor: "#C9A84C",
          color: "#0D0D0D",
          fontFamily: "var(--font-montserrat)",
        }}
      >
        <Mail size={15} />
        S&apos;inscrire à la newsletter
      </button>

      <p
        className="text-xs text-center mt-3"
        style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-inter)" }}
      >
        Pas de spam · Désinscription en un clic · Données protégées (RGPD)
      </p>
    </form>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

export default function ActualitesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <div className="bg-white pt-36 md:pt-44 pb-16 md:pb-20 border-b border-[#EBEBEB]">
        <div className="max-w-[820px] mx-auto px-6 md:px-8">
          <h1
            className="font-montserrat text-[2.5rem] md:text-[3.5rem] font-light tracking-tight text-[#1A1A1A] leading-[1.1] mb-6"
          >
            Actualités &amp; Publications
          </h1>
          <p
            className="font-inter text-base md:text-lg leading-relaxed max-w-[580px]"
            style={{ color: "#777" }}
          >
            Analyses sectorielles, perspectives stratégiques et retours
            d&apos;expérience de l&apos;équipe GIRA sur le développement et le
            financement de projets en Afrique.
          </p>
        </div>
      </div>

      {/* ── COMING SOON ── */}
      <div className="bg-white py-20 md:py-32">
        <div className="max-w-[820px] mx-auto px-6 md:px-8">

          {/* Titre section */}
          <div className="mb-16 md:mb-20">
            <h2
              className="font-montserrat text-[1.75rem] md:text-[2.1rem] font-light tracking-tight text-[#1A1A1A] mb-4 leading-[1.2]"
            >
              Bientôt disponible
            </h2>
            <p
              className="font-inter text-[15px] md:text-base leading-[1.9] max-w-[560px]"
              style={{ color: "#666" }}
            >
              Notre équipe éditoriale prépare les premières publications GIRA.
              Analyses, études de cas et perspectives sur le financement et
              l&apos;exécution de projets structurants en Afrique seront
              disponibles prochainement.
            </p>
          </div>

          <hr className="border-t border-[#EBEBEB] mb-16 md:mb-20" />

          {/* Ce qui arrive */}
          <div className="mb-16 md:mb-20">
            <p
              className="font-montserrat text-sm font-semibold uppercase tracking-widest mb-10"
              style={{ color: "#999" }}
            >
              Au programme
            </p>

            <div className="space-y-10">
              {[
                {
                  Icon: BarChart2,
                  titre: "Analyses sectorielles",
                  desc: "Décryptages approfondis des dynamiques de financement, de gouvernance et d'exécution dans les secteurs eau, énergie, santé, agriculture et infrastructures en Afrique.",
                },
                {
                  Icon: FileText,
                  titre: "Publications & études de cas",
                  desc: "Retours d'expérience sur les mandats GIRA, méthodologies de structuration de projets et enseignements tirés des programmes PND accompagnés.",
                },
                {
                  Icon: Calendar,
                  titre: "Événements & actualités",
                  desc: "Compte-rendus des tables rondes d'investisseurs, forums de développement et missions institutionnelles auxquels GIRA participe à Paris, Casablanca et sur le continent africain.",
                },
              ].map(({ Icon, titre, desc }) => (
                <div
                  key={titre}
                  className="flex gap-6 items-start"
                >
                  <div
                    className="shrink-0 mt-1 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#F5F5F0" }}
                  >
                    <Icon size={18} style={{ color: "#C9A84C" }} />
                  </div>
                  <div>
                    <h3
                      className="font-montserrat text-base font-semibold text-[#1A1A1A] mb-2"
                    >
                      {titre}
                    </h3>
                    <p
                      className="font-inter text-[15px] leading-[1.85]"
                      style={{ color: "#666" }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-t border-[#EBEBEB] mb-16 md:mb-20" />

          {/* Notification */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Bell size={16} style={{ color: "#C9A84C" }} />
              <span
                className="font-montserrat text-sm font-semibold uppercase tracking-widest"
                style={{ color: "#999" }}
              >
                Être notifié
              </span>
            </div>
            <p
              className="font-inter text-[15px] leading-[1.85] mb-6"
              style={{ color: "#666" }}
            >
              Laissez votre email pour être informé dès la publication du
              premier article. Aucune sollicitation commerciale.
            </p>
            {/* Mini inline form — juste email sur cette section */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-[480px]"
            >
              <input
                type="email"
                placeholder="votre@email.com"
                required
                className="w-full flex-1 px-4 py-3.5 rounded-xl text-sm outline-none"
                style={{
                  border: "1px solid #E5E5E5",
                  color: "#1A1A1A",
                  fontFamily: "var(--font-inter)",
                  fontSize: "16px",
                  backgroundColor: "#FAFAFA",
                }}
              />
              <button
                type="submit"
                className="shrink-0 px-5 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:brightness-105 whitespace-nowrap"
                style={{
                  backgroundColor: "#1A1A1A",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-montserrat)",
                }}
              >
                M&apos;alerter
                <ArrowRight size={14} />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ── NEWSLETTER COMPLÈTE ── */}
      <div style={{ backgroundColor: "#0D0D0D" }}>
        <div className="max-w-[820px] mx-auto px-6 md:px-8 py-20 md:py-28">

          {/* Header */}
          <div className="mb-10">
            <span
              className="font-inter text-xs uppercase tracking-widest block mb-4"
              style={{ color: "#C9A84C" }}
            >
              Newsletter GIRA
            </span>
            <h2
              className="font-montserrat text-[1.75rem] md:text-[2.25rem] font-semibold text-white leading-tight mb-4"
            >
              Recevoir nos analyses par email
            </h2>
            <p
              className="font-inter text-[15px] leading-[1.85] max-w-[500px]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Perspectives stratégiques, publications et actualités sur le
              financement et l&apos;exécution de projets en Afrique —
              sans publicité, sans spam.
            </p>
          </div>

          {/* Form */}
          <div className="max-w-[520px]">
            <NewsletterForm />
          </div>

          {/* Garanties */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-10 pt-10 border-t border-white/10">
            {[
              "Données protégées — conformité RGPD",
              "Désinscription en un clic",
              "Aucun partenaire publicitaire",
            ].map((item) => (
              <span
                key={item}
                className="font-inter text-xs"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {item}
              </span>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
