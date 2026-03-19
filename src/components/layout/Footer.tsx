"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";
import { GIRA } from "@/lib/constants";

const G = "#C9A84C";

const navCols = [
  {
    heading: "Cabinet",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "Nos secteurs", href: "/secteurs" },
      { label: "PND & TRI", href: "/pnd-rca-tri" },
      { label: "Notre réseau", href: "/reseau-diaspora" },
      { label: "Carrières", href: "/carrieres" },
      { label: "Actualités", href: "/actualites" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Digitalisation institutionnelle", href: "/services#digitalisation" },
      { label: "Développement Web & Mobile", href: "/services#applications" },
      { label: "Intelligence Artificielle", href: "/services#ia" },
      { label: "Connectivité & Points Relais", href: "/services#connectivite" },
      { label: "Communication Sécurisée", href: "/services#securite" },
      { label: "Fintech & Banques", href: "/services#fintech" },
    ],
  },
];

const presences = [
  {
    ville: "Paris",
    pays: "France",
    adresse: "128, rue de la Boétie, 75008",
    coord: "48°52'N · 2°18'E",
    siege: true,
  },
  {
    ville: "Casablanca",
    pays: "Maroc",
    adresse: "",
    coord: "33°35'N · 7°39'O",
    siege: false,
  },
  {
    ville: "Bratislava",
    pays: "Slovaquie",
    adresse: "",
    coord: "48°08'N · 17°06'E",
    siege: false,
  },
];

const socials = [
  { label: "LinkedIn", href: GIRA.linkedin, Icon: Linkedin },
  { label: "X / Twitter", href: GIRA.twitter, Icon: Twitter },
  { label: "Facebook", href: "https://facebook.com/giracabinet", Icon: Facebook },
  { label: "Instagram", href: "https://instagram.com/gira_cabinet", Icon: Instagram },
  { label: "YouTube", href: "https://youtube.com/@giracabinet", Icon: Youtube },
];

const legal = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "RGPD", href: "/rgpd" },
  { label: "Confidentialité", href: "/politique-confidentialite" },
];

export default function Footer() {
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
          {/* Top row: logo + CTA */}
          <div className="flex items-start justify-between mb-10 md:mb-12">
            {/* Logo */}
            <Link href="/" className="inline-block shrink-0">
              <Image
                src="/logoGIRA.png"
                alt="GIRA"
                width={110}
                height={36}
                style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
            </Link>

            {/* CTA button */}
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
              Initier un mandat
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Large statement */}
          <div className="max-w-4xl">
            <p
              className="font-black leading-[0.96] text-white"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "clamp(2.2rem, 5.5vw, 5rem)",
              }}
            >
              Nous ne gérons pas
              <br />
              des projets.{" "}
              <span
                style={{
                  color: "transparent",
                  WebkitTextStroke: `1.5px ${G}`,
                }}
              >
                Nous les
              </span>
              <br className="hidden sm:block" />
              <span style={{ color: G }}> exécutons.</span>
            </p>
            <p
              className="mt-5 text-sm md:text-base max-w-lg"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontFamily: "var(--font-inter)",
                lineHeight: 1.7,
              }}
            >
              {GIRA.tagline}
            </p>

            {/* Mobile CTA */}
            <Link
              href="/contact"
              className="sm:hidden inline-flex items-center gap-2 mt-6 text-sm font-semibold"
              style={{ color: G, fontFamily: "var(--font-inter)" }}
            >
              Initier un mandat
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── ZONE B: Navigation grid ── */}
      <div
        className="relative"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6 lg:gap-x-8">

            {/* Nav columns */}
            {navCols.map((col) => (
              <div key={col.heading}>
                <h4
                  className="text-[9px] uppercase tracking-[0.3em] font-semibold mb-5"
                  style={{ color: G, fontFamily: "var(--font-montserrat)" }}
                >
                  {col.heading}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm leading-none transition-colors duration-150"
                        style={{
                          color: "rgba(255,255,255,0.42)",
                          fontFamily: "var(--font-inter)",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.color = "#FFFFFF")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.42)")
                        }
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Présences column */}
            <div className="col-span-2 md:col-span-1 lg:col-span-1">
              <h4
                className="text-[9px] uppercase tracking-[0.3em] font-semibold mb-5"
                style={{ color: G, fontFamily: "var(--font-montserrat)" }}
              >
                Présences
              </h4>
              <ul className="space-y-6">
                {presences.map((p) => (
                  <li key={p.ville}>
                    <div className="flex items-center gap-2 mb-1">
                      <p
                        className="text-sm font-semibold leading-none"
                        style={{
                          color: "rgba(255,255,255,0.75)",
                          fontFamily: "var(--font-montserrat)",
                        }}
                      >
                        {p.ville}
                      </p>
                      {p.siege && (
                        <span
                          className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 border"
                          style={{
                            color: G,
                            borderColor: "rgba(201,168,76,0.35)",
                            fontFamily: "var(--font-inter)",
                          }}
                        >
                          Siège
                        </span>
                      )}
                    </div>
                    {p.adresse && (
                      <p
                        className="text-xs mb-1"
                        style={{
                          color: "rgba(255,255,255,0.28)",
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        {p.adresse}
                      </p>
                    )}
                    <p
                      className="text-[10px] font-mono"
                      style={{ color: "rgba(201,168,76,0.38)" }}
                    >
                      {p.coord}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div className="col-span-2 md:col-span-1 lg:col-span-1">
              <h4
                className="text-[9px] uppercase tracking-[0.3em] font-semibold mb-5"
                style={{ color: G, fontFamily: "var(--font-montserrat)" }}
              >
                Contact
              </h4>
              <div className="space-y-5">
                <div>
                  <p
                    className="text-[9px] uppercase tracking-wider mb-1.5"
                    style={{
                      color: "rgba(255,255,255,0.25)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    Général
                  </p>
                  <a
                    href={`mailto:${GIRA.email}`}
                    className="text-sm transition-colors duration-150 break-all"
                    style={{
                      color: "rgba(255,255,255,0.42)",
                      fontFamily: "var(--font-inter)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = G)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.42)")
                    }
                  >
                    {GIRA.email}
                  </a>
                </div>
                <div>
                  <p
                    className="text-[9px] uppercase tracking-wider mb-1.5"
                    style={{
                      color: "rgba(255,255,255,0.25)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    Recrutement
                  </p>
                  <a
                    href={`mailto:${GIRA.emailRecrut}`}
                    className="text-sm transition-colors duration-150 break-all"
                    style={{
                      color: "rgba(255,255,255,0.42)",
                      fontFamily: "var(--font-inter)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = G)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.42)")
                    }
                  >
                    {GIRA.emailRecrut}
                  </a>
                </div>
                {/* PND badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-2 border mt-2"
                  style={{
                    borderColor: "rgba(201,168,76,0.2)",
                    backgroundColor: "rgba(201,168,76,0.04)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: G }}
                  />
                  <span
                    className="text-[9px] uppercase tracking-wider"
                    style={{ color: "rgba(201,168,76,0.7)", fontFamily: "var(--font-inter)" }}
                  >
                    Partenaire PND RCA
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── ZONE C: Socials + Legal ── */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 py-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          {/* Social icons */}
          <div className="flex items-center gap-2">
            <span
              className="text-[9px] uppercase tracking-[0.25em] mr-2 hidden lg:block"
              style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-inter)" }}
            >
              Suivre GIRA
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
                  className="w-[38px] h-[38px] flex items-center justify-center border transition-all duration-200"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.35)",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = G;
                    el.style.color = G;
                    el.style.backgroundColor = "rgba(201,168,76,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.color = "rgba(255,255,255,0.35)";
                    el.style.backgroundColor = "transparent";
                  }}
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>

          {/* Copyright + Legal */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span
              className="text-[11px]"
              style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-inter)" }}
            >
              © 2026 GIRA
            </span>
            <span
              className="w-px h-3 hidden sm:block"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            />
            {legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[11px] transition-colors duration-150"
                style={{
                  color: "rgba(255,255,255,0.22)",
                  fontFamily: "var(--font-inter)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = G)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.22)")
                }
              >
                {l.label}
              </Link>
            ))}
          </div>

        </div>
      </div>

    </footer>
  );
}
