import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plan du site — GIRA",
  description:
    "Plan du site complet de gira-cf.com. Retrouvez l'ensemble des pages, services, secteurs et ressources du cabinet GIRA.",
  alternates: { canonical: "https://www.gira-cf.com/plan-du-site" },
};

/* ──────────────────────────── types ──────────────────────────── */

interface SitemapLink {
  label: string;
  href: string;
}

interface SitemapSection {
  title: string;
  href?: string;
  sub?: { heading?: string; links: SitemapLink[] }[];
  links?: SitemapLink[];
}

/* ──────────────────────────── data ──────────────────────────── */

const SECTIONS: SitemapSection[] = [
  {
    title: "Accueil",
    href: "/",
  },
  {
    title: "À propos",
    href: "/a-propos",
    links: [
      { label: "Notre mission", href: "/a-propos" },
      { label: "Notre approche", href: "/a-propos" },
      { label: "Nos valeurs", href: "/a-propos" },
      { label: "Implantations", href: "/a-propos" },
    ],
  },
  {
    title: "Services",
    href: "/services",
    sub: [
      {
        heading: "Notre offre",
        links: [
          { label: "Structuration & Redimensionnement des projets", href: "/services" },
          { label: "Cabinet d'exécution & Maîtrise d'ouvrage déléguée", href: "/services" },
          { label: "Mobilisation de financements & d'investisseurs", href: "/services" },
          { label: "Renforcement de capacités & transfert de compétences", href: "/services" },
        ],
      },
    ],
  },
  {
    title: "Secteurs",
    href: "/secteurs",
    sub: [
      {
        heading: "Domaines d'intervention",
        links: [
          { label: "Eau & Assainissement", href: "/secteurs" },
          { label: "Santé", href: "/secteurs" },
          { label: "Énergie", href: "/secteurs" },
          { label: "Agriculture", href: "/secteurs" },
          { label: "Mines & Ressources naturelles", href: "/secteurs" },
          { label: "Construction & Infrastructures", href: "/secteurs" },
          { label: "Technologies & Télécoms", href: "/secteurs" },
          { label: "Transports & Logistique", href: "/secteurs" },
        ],
      },
    ],
  },
  {
    title: "PND RCA & Table Ronde des Investisseurs",
    href: "/pnd-rca-tri",
  },
  {
    title: "GIRA Dev",
    href: "/x",
    sub: [
      {
        heading: "Pôles technologiques",
        links: [
          { label: "Data & Intelligence Artificielle", href: "/x/data-ia" },
          { label: "Digital Government", href: "/x/digital-gov" },
          { label: "Infrastructure numérique", href: "/x/infrastructure" },
          { label: "Finance à impact", href: "/x/finance-impact" },
        ],
      },
    ],
  },
  {
    title: "Réseau & Diaspora",
    href: "/reseau-diaspora",
  },
  {
    title: "Carrières",
    href: "/carrieres",
  },
  {
    title: "Actualités",
    href: "/actualites",
    links: [
      { label: "Actualités", href: "/actualites" },
      { label: "Analyses", href: "/actualites" },
      { label: "Publications", href: "/actualites" },
    ],
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Informations légales",
    sub: [
      {
        links: [
          { label: "Mentions légales", href: "/mentions-legales" },
          { label: "Politique de confidentialité", href: "/politique-confidentialite" },
          { label: "Vos droits RGPD", href: "/rgpd" },
          { label: "Plan du site", href: "/plan-du-site" },
        ],
      },
    ],
  },
];

/* ──────────────────────────── components ──────────────────────────── */

function InlineLinks({ links }: { links: SitemapLink[] }) {
  return (
    <div className="flex flex-wrap items-center gap-y-1 ml-6 md:ml-10">
      {links.map((link, i) => (
        <span key={link.label} className="flex items-center">
          <Link
            href={link.href}
            className="font-inter text-[15px] text-[#444] underline underline-offset-2 hover:text-[#1A1A1A] transition-colors"
          >
            {link.label}
          </Link>
          {i < links.length - 1 && (
            <span className="mx-2 text-[#CCC] select-none">|</span>
          )}
        </span>
      ))}
    </div>
  );
}

/* ──────────────────────────── page ──────────────────────────── */

export default function PlanDuSitePage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-white pt-36 md:pt-44 pb-16 md:pb-20 border-b border-[#EBEBEB]">
        <div className="max-w-[900px] mx-auto px-6 md:px-8">
          <h1 className="font-montserrat text-[2.5rem] md:text-[3.5rem] font-light tracking-tight text-[#1A1A1A] leading-[1.1]">
            Plan du site
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-6 md:px-8">
          <nav aria-label="Plan du site">
            <ul className="space-y-10">
              {SECTIONS.map((section) => (
                <li key={section.title}>
                  {/* Section header */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#CCC] font-inter text-lg select-none">/</span>
                    {section.href ? (
                      <Link
                        href={section.href}
                        className="font-montserrat text-lg font-semibold text-[#1A1A1A] underline underline-offset-4 decoration-[#1A1A1A] hover:text-[#C9A84C] hover:decoration-[#C9A84C] transition-colors"
                      >
                        {section.title}
                      </Link>
                    ) : (
                      <span className="font-montserrat text-lg font-semibold text-[#1A1A1A]">
                        {section.title}
                      </span>
                    )}
                  </div>

                  {/* Direct links */}
                  {section.links && (
                    <InlineLinks links={section.links} />
                  )}

                  {/* Sub-sections */}
                  {section.sub?.map((sub) => (
                    <div key={sub.heading ?? "default"} className="mt-3">
                      {sub.heading && (
                        <p className="font-montserrat text-sm font-semibold text-[#1A1A1A] ml-6 md:ml-10 mb-2">
                          {sub.heading}
                        </p>
                      )}
                      <InlineLinks links={sub.links} />
                    </div>
                  ))}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer links */}
          <div className="border-t border-[#E5E5E5] pt-12 mt-16">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/mentions-legales" className="font-inter text-sm text-[#777] hover:text-[#1A1A1A] underline underline-offset-2 transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="font-inter text-sm text-[#777] hover:text-[#1A1A1A] underline underline-offset-2 transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/rgpd" className="font-inter text-sm text-[#777] hover:text-[#1A1A1A] underline underline-offset-2 transition-colors">
                Vos droits RGPD
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
