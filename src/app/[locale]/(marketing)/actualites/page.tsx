"use client";

import { useState } from "react";
import { Mail, ArrowRight, Bell, FileText, BarChart2, Calendar } from "lucide-react";
import { useLocale } from "next-intl";

/* ─── i18n Data ─── */

const ACTUALITES_DATA = {
  fr: {
    hero: {
      title: "Actualités & Publications",
      subtitle:
        "Analyses sectorielles, perspectives stratégiques et retours d\u2019expérience de l\u2019équipe GIRA sur le développement et le financement de projets en Afrique.",
    },
    comingSoon: {
      title: "Bientôt disponible",
      body: "Notre équipe éditoriale prépare les premières publications GIRA. Analyses, études de cas et perspectives sur le financement et l\u2019exécution de projets structurants en Afrique seront disponibles prochainement.",
      programme: "Au programme",
      items: [
        {
          icon: "BarChart2" as const,
          titre: "Analyses sectorielles",
          desc: "Décryptages approfondis des dynamiques de financement, de gouvernance et d\u2019exécution dans les secteurs eau, énergie, santé, agriculture et infrastructures en Afrique.",
        },
        {
          icon: "FileText" as const,
          titre: "Publications & études de cas",
          desc: "Retours d\u2019expérience sur les mandats GIRA, méthodologies de structuration de projets et enseignements tirés des programmes PND accompagnés.",
        },
        {
          icon: "Calendar" as const,
          titre: "Événements & actualités",
          desc: "Compte-rendus des tables rondes d\u2019investisseurs, forums de développement et missions institutionnelles auxquels GIRA participe à Paris, Casablanca et sur le continent africain.",
        },
      ],
    },
    notification: {
      label: "Être notifié",
      body: "Laissez votre email pour être informé dès la publication du premier article. Aucune sollicitation commerciale.",
      emailPlaceholder: "votre@email.com",
      button: "M\u2019alerter",
    },
    newsletter: {
      label: "Newsletter GIRA",
      title: "Recevoir nos analyses par email",
      subtitle:
        "Perspectives stratégiques, publications et actualités sur le financement et l\u2019exécution de projets en Afrique — sans publicité, sans spam.",
      guarantees: [
        "Données protégées — conformité RGPD",
        "Désinscription en un clic",
        "Aucun partenaire publicitaire",
      ],
    },
    newsletterForm: {
      firstNamePlaceholder: "Votre prénom",
      orgPlaceholder: "Organisation",
      emailPlaceholder: "votre@email.com",
      submitButton: "S\u2019inscrire à la newsletter",
      footerNote: "Pas de spam · Désinscription en un clic · Données protégées (RGPD)",
      successTitle: "Merci pour votre inscription",
      successBody: "Vous recevrez nos premières publications dès leur parution.",
    },
  },
  en: {
    hero: {
      title: "News & Publications",
      subtitle:
        "Sector analyses, strategic perspectives and feedback from the GIRA team on development and project financing in Africa.",
    },
    comingSoon: {
      title: "Coming soon",
      body: "Our editorial team is preparing the first GIRA publications. Analyses, case studies and perspectives on the financing and execution of structuring projects in Africa will be available shortly.",
      programme: "Coming up",
      items: [
        {
          icon: "BarChart2" as const,
          titre: "Sector analyses",
          desc: "In-depth breakdowns of financing, governance and execution dynamics in the water, energy, health, agriculture and infrastructure sectors in Africa.",
        },
        {
          icon: "FileText" as const,
          titre: "Publications & case studies",
          desc: "Feedback on GIRA mandates, project structuring methodologies and lessons learned from accompanied NDP programs.",
        },
        {
          icon: "Calendar" as const,
          titre: "Events & news",
          desc: "Reports from investor roundtables, development forums and institutional missions in which GIRA participates in Paris, Casablanca and across the African continent.",
        },
      ],
    },
    notification: {
      label: "Get notified",
      body: "Leave your email to be informed as soon as the first article is published. No commercial solicitations.",
      emailPlaceholder: "your@email.com",
      button: "Notify me",
    },
    newsletter: {
      label: "GIRA Newsletter",
      title: "Receive our analyses by email",
      subtitle:
        "Strategic perspectives, publications and news on project financing and execution in Africa — no advertising, no spam.",
      guarantees: [
        "Protected data — GDPR compliance",
        "Unsubscribe in one click",
        "No advertising partners",
      ],
    },
    newsletterForm: {
      firstNamePlaceholder: "Your first name",
      orgPlaceholder: "Organization",
      emailPlaceholder: "your@email.com",
      submitButton: "Subscribe to the newsletter",
      footerNote: "No spam · Unsubscribe in one click · Protected data (GDPR)",
      successTitle: "Thank you for subscribing",
      successBody: "You will receive our first publications as soon as they are released.",
    },
  },
} as const;

const ICON_MAP = {
  BarChart2,
  FileText,
  Calendar,
} as const;

/* ─────────────────────────── Newsletter Form ─────────────────────────── */

interface NewsletterFormStrings {
  firstNamePlaceholder: string;
  orgPlaceholder: string;
  emailPlaceholder: string;
  submitButton: string;
  footerNote: string;
  successTitle: string;
  successBody: string;
}

function NewsletterForm({ t }: { t: NewsletterFormStrings }) {
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
          {t.successTitle}
        </p>
        <p className="font-inter text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          {t.successBody}
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
          placeholder={t.firstNamePlaceholder}
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
          placeholder={t.orgPlaceholder}
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
        placeholder={t.emailPlaceholder}
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
        {t.submitButton}
      </button>

      <p
        className="text-xs text-center mt-3"
        style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-inter)" }}
      >
        {t.footerNote}
      </p>
    </form>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */

export default function ActualitesPage() {
  const locale = useLocale() as "fr" | "en";
  const t = ACTUALITES_DATA[locale];

  return (
    <>
      {/* ── HERO ── */}
      <div className="bg-white pt-36 md:pt-44 pb-16 md:pb-20 border-b border-[#EBEBEB]">
        <div className="max-w-[820px] mx-auto px-6 md:px-8">
          <h1
            className="font-montserrat text-[2.5rem] md:text-[3.5rem] font-light tracking-tight text-[#1A1A1A] leading-[1.1] mb-6"
          >
            {t.hero.title}
          </h1>
          <p
            className="font-inter text-base md:text-lg leading-relaxed max-w-[580px]"
            style={{ color: "#777" }}
          >
            {t.hero.subtitle}
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
              {t.comingSoon.title}
            </h2>
            <p
              className="font-inter text-[15px] md:text-base leading-[1.9] max-w-[560px]"
              style={{ color: "#666" }}
            >
              {t.comingSoon.body}
            </p>
          </div>

          <hr className="border-t border-[#EBEBEB] mb-16 md:mb-20" />

          {/* Ce qui arrive */}
          <div className="mb-16 md:mb-20">
            <p
              className="font-montserrat text-sm font-semibold uppercase tracking-widest mb-10"
              style={{ color: "#999" }}
            >
              {t.comingSoon.programme}
            </p>

            <div className="space-y-10">
              {t.comingSoon.items.map(({ icon, titre, desc }) => {
                const Icon = ICON_MAP[icon];
                return (
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
                );
              })}
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
                {t.notification.label}
              </span>
            </div>
            <p
              className="font-inter text-[15px] leading-[1.85] mb-6"
              style={{ color: "#666" }}
            >
              {t.notification.body}
            </p>
            {/* Mini inline form — juste email sur cette section */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-[480px]"
            >
              <input
                type="email"
                placeholder={t.notification.emailPlaceholder}
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
                {t.notification.button}
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
              {t.newsletter.label}
            </span>
            <h2
              className="font-montserrat text-[1.75rem] md:text-[2.25rem] font-semibold text-white leading-tight mb-4"
            >
              {t.newsletter.title}
            </h2>
            <p
              className="font-inter text-[15px] leading-[1.85] max-w-[500px]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {t.newsletter.subtitle}
            </p>
          </div>

          {/* Form */}
          <div className="max-w-[520px]">
            <NewsletterForm t={t.newsletterForm} />
          </div>

          {/* Garanties */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-10 pt-10 border-t border-white/10">
            {t.newsletter.guarantees.map((item) => (
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
