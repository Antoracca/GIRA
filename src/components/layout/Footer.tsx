"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Linkedin, Twitter, Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";
import { GIRA } from "@/lib/constants";

const G = "#C9A84C";

/* ── Inline statement data (complex multi-span text, Pattern A) ── */
const STATEMENT_DATA = {
  fr: {
    statLine1: "Nous ne gérons pas",
    statLine2: "des projets.",
    statLine3: "Nous les",
    statLine4: "exécutons.",
    tagline: "Nous structurons, finançons et exécutons des projets qui transforment durablement l'Afrique.",
    devLine1: "La technologie au service",
    devLine2: "de ",
    devLine3: "l'Afrique.",
    devSub: "GIRA Dev conçoit les plateformes, systèmes et solutions numériques qui accélèrent la transformation du continent.",
  },
  en: {
    statLine1: "We don't manage",
    statLine2: "projects.",
    statLine3: "We",
    statLine4: "execute them.",
    tagline: "We structure, finance and execute projects that sustainably transform Africa.",
    devLine1: "Technology in service",
    devLine2: "of ",
    devLine3: "Africa.",
    devSub: "GIRA Dev designs the platforms, systems and digital solutions that accelerate the continent's transformation.",
  },
} as const;

const socials = [
  { label: "LinkedIn", href: GIRA.linkedin, Icon: Linkedin },
  { label: "X / Twitter", href: GIRA.twitter, Icon: Twitter },
  { label: "Facebook", href: "https://facebook.com/giracabinet", Icon: Facebook },
  { label: "Instagram", href: "https://instagram.com/gira_cabinet", Icon: Instagram },
  { label: "YouTube", href: "https://youtube.com/@giracabinet", Icon: Youtube },
];

export default function Footer() {
  const pathname = usePathname();
  const isGiraDevPage = pathname === "/x";
  const locale = useLocale() as "fr" | "en";
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const stmts = STATEMENT_DATA[locale];

  const navLinks = [
    { label: tNav("about"), href: "/a-propos" },
    { label: tNav("services"), href: "/services" },
    { label: tNav("sectors"), href: "/secteurs" },
    { label: tNav("pnd"), href: "/pnd-rca-tri" },
    { label: tNav("network"), href: "/reseau-diaspora" },
    { label: tNav("careers"), href: "/carrieres" },
    { label: tNav("news"), href: "/actualites" },
    { label: "Contact", href: "/contact" },
    { label: "GIRA Dev", href: "/x" },
  ];

  const legalLinks = [
    { label: t("legal"), href: "/mentions-legales" },
    { label: t("gdpr"), href: "/rgpd" },
    { label: t("privacy"), href: "/politique-confidentialite" },
    { label: t("planDuSite"), href: "/plan-du-site" },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "#0D0D0D" }}>

      {/* ── Gold gradient top border ── */}
      <div
        className="h-[2px] w-full"
        style={{
          background: `linear-gradient(to right, transparent 0%, ${G} 30%, ${G} 70%, transparent 100%)`,
        }}
      />

      {/* ── ZONE A: Statement ── */}
      <div
        className="relative"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 py-14 md:py-16">
          {/* Top row: CTA only */}
          <div className="flex items-start justify-end mb-10 md:mb-12">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2.5 px-5 py-3 text-xs font-semibold uppercase tracking-widest border transition-all duration-200 group"
              style={{
                borderColor: G,
                color: G,
                fontFamily: "var(--font-montserrat)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = G;
                el.style.color = "#0D0D0D";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "transparent";
                el.style.color = G;
              }}
            >
              {t("cta")}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Large statement */}
          <div className="max-w-4xl">
            {isGiraDevPage ? (
              <>
                <p
                  className="font-black leading-[0.96] text-white"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
                  }}
                >
                  {stmts.devLine1}
                  <br />
                  <span
                    style={{
                      color: "transparent",
                      WebkitTextStroke: `1.5px ${G}`,
                    }}
                  >
                    {stmts.devLine2}
                  </span>
                  <span style={{ color: G }}>{stmts.devLine3}</span>
                </p>
                <p
                  className="mt-5 text-sm md:text-base max-w-lg"
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "var(--font-inter)",
                    lineHeight: 1.7,
                  }}
                >
                  {stmts.devSub}
                </p>
              </>
            ) : (
              <>
                <p
                  className="font-black leading-[0.96] text-white"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
                  }}
                >
                  {stmts.statLine1}
                  <br />
                  {stmts.statLine2}{" "}
                  <span
                    style={{
                      color: "transparent",
                      WebkitTextStroke: `1.5px ${G}`,
                    }}
                  >
                    {stmts.statLine3}
                  </span>
                  <br className="hidden sm:block" />
                  <span style={{ color: G }}> {stmts.statLine4}</span>
                </p>
                <p
                  className="mt-5 text-sm md:text-base max-w-lg"
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "var(--font-inter)",
                    lineHeight: 1.7,
                  }}
                >
                  {stmts.tagline}
                </p>
              </>
            )}

            {/* Mobile CTA */}
            <Link
              href="/contact"
              className="sm:hidden inline-flex items-center gap-2 mt-6 text-sm font-semibold"
              style={{ color: G, fontFamily: "var(--font-inter)" }}
            >
              {t("cta")}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── ZONE B: BCG-style bottom — logo · socials · nav · legal ── */}
      <div
        className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 pt-10 pb-10 md:pt-14 md:pb-12"
      >

        {/* Row 1 : Logo + FOLLOW GIRA + social icons */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <Link href={isGiraDevPage ? "/x" : "/"} className="inline-block shrink-0">
            {isGiraDevPage ? (
              <div className="flex items-center select-none">
                <Image
                  src="/logoGIRA.png"
                  alt="GIRA Dev"
                  width={90}
                  height={28}
                  style={{ objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.75 }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 900,
                    fontSize: "2.2rem",
                    lineHeight: 1,
                    color: "#E8C547",
                    letterSpacing: "-0.06em",
                    display: "inline-block",
                    transform: "rotate(-9deg) translateY(-4px)",
                    marginLeft: "-7px",
                    opacity: 0.75,
                  }}
                >
                  X
                </span>
              </div>
            ) : (
              <Image
                src="/logoGIRA.png"
                alt="GIRA"
                width={90}
                height={28}
                style={{ objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.75 }}
              />
            )}
          </Link>

          {/* Socials */}
          <div className="flex items-center gap-4 md:gap-5">
            <span
              className="text-[9px] uppercase tracking-[0.28em] font-semibold hidden sm:block"
              style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-inter)" }}
            >
              {t("followGira")}
            </span>
            {socials.map((s) => {
              const Icon = s.Icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.30)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#FFFFFF")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.30)")
                  }
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Separator */}
        <div
          className="mb-7"
          style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.07)" }}
        />

        {/* Row 2 : Main nav links — BCG-style uppercase */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[11px] uppercase tracking-[0.18em] font-semibold transition-all duration-150"
              style={{
                color: "rgba(255,255,255,0.38)",
                fontFamily: "var(--font-inter)",
                textDecoration: "underline",
                textDecorationColor: "transparent",
                textUnderlineOffset: "3px",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "rgba(255,255,255,0.80)";
                el.style.textDecorationColor = "rgba(255,255,255,0.30)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "rgba(255,255,255,0.38)";
                el.style.textDecorationColor = "transparent";
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Row 3 : Legal links + copyright — smaller, dimmer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Legal */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[10px] uppercase tracking-[0.18em] transition-colors duration-150"
                style={{
                  color: "rgba(255,255,255,0.22)",
                  fontFamily: "var(--font-inter)",
                  textDecoration: "underline",
                  textDecorationColor: "rgba(255,255,255,0.12)",
                  textUnderlineOffset: "3px",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = G;
                  el.style.textDecorationColor = G;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "rgba(255,255,255,0.22)";
                  el.style.textDecorationColor = "rgba(255,255,255,0.12)";
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Copyright + cities */}
          <div className="flex items-center gap-4">
            <span
              className="text-[10px] hidden sm:block"
              style={{ color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-inter)" }}
            >
              Paris · Marrakech · Bratislava
            </span>
            <span
              className="text-[10px]"
              style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-inter)" }}
            >
              {isGiraDevPage ? (
                <>
                  © 2026 GIRA{" "}
                  <span style={{ color: G, fontStyle: "italic", fontWeight: 700 }}>X</span>
                </>
              ) : (
                "© 2026 GIRA"
              )}
            </span>
          </div>
        </div>

      </div>

    </footer>
  );
}
