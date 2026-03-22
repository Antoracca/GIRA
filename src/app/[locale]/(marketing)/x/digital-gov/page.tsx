"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Landmark, CheckCircle2, ChevronRight } from "lucide-react";

/* ── Locale-keyed data ────────────────────────────────── */
const PAGE_DATA = {
  fr: {
    siblings: [
      { label: "Data & IA", sub: "Systèmes intelligents", href: "/x/data-ia" },
      { label: "Infrastructure Tech", sub: "IoT & supervision", href: "/x/infrastructure" },
      { label: "Finance & Impact", sub: "ESG & investissements", href: "/x/finance-impact" },
    ],
    points: [
      "Portails institutionnels multilingues pour États et ministères",
      "Systèmes d'identité numérique citoyenne sécurisés",
      "Plateformes e-services : état civil, fiscalité, permis en ligne",
      "Intranets gouvernementaux et solutions de communication sécurisée",
      "Formation et transfert de compétences aux agents de l'État",
      "Conformité RGPD et standards internationaux de sécurité",
    ],
    usecases: [
      {
        titre: "Portail institutionnel ministériel",
        desc: "Refonte complète du portail web d'un ministère africain : accessibilité mobile, multilingue (français, anglais, langue locale), formulaires en ligne.",
        tag: "Gouvernance",
      },
      {
        titre: "Plateforme e-services citoyens",
        desc: "Guichet numérique unique permettant aux citoyens d'accéder aux services publics essentiels depuis leur téléphone, sans déplacement.",
        tag: "e-Services",
      },
      {
        titre: "Système d'identité numérique",
        desc: "Architecture d'identité numérique pour un pays de 5M d'habitants, avec intégration des bases de données d'état civil existantes.",
        tag: "Identité",
      },
    ],
    hero: {
      breadcrumb: "Digital Gov & e-Services",
      domainLabel: "GIRA Dev · Domaine 02",
      titleLine1: "Digital Gov",
      titleEm: "& e-Services",
      subtitle:
        "Portails gouvernementaux, e-services publics, systèmes d'identité numérique. Nous accompagnons les États dans leur transformation digitale, de la conception à l'opération.",
      ctaPrimary: "Discutons de votre projet",
      ctaSecondary: "Retour GIRA Dev",
    },
    sections: {
      whatWeDo: "Ce que nous faisons",
      concreteApps: "Applications concrètes",
      usecasesTitle: "Cas d'usage en Afrique",
      otherDomains: "Autres domaines GIRA Dev",
    },
  },
  en: {
    siblings: [
      { label: "Data & AI", sub: "Intelligent systems", href: "/x/data-ia" },
      { label: "Tech Infrastructure", sub: "IoT & supervision", href: "/x/infrastructure" },
      { label: "Finance & Impact", sub: "ESG & investments", href: "/x/finance-impact" },
    ],
    points: [
      "Multilingual institutional portals for states and ministries",
      "Secure citizen digital identity systems",
      "e-Services platforms: civil registration, taxation, online permits",
      "Government intranets and secure communication solutions",
      "Training and skills transfer to civil servants",
      "GDPR compliance and international security standards",
    ],
    usecases: [
      {
        titre: "Ministerial institutional portal",
        desc: "Complete redesign of an African ministry's web portal: mobile accessibility, multilingual (French, English, local language), online forms.",
        tag: "Governance",
      },
      {
        titre: "Citizen e-services platform",
        desc: "Single digital counter allowing citizens to access essential public services from their phone, without travel.",
        tag: "e-Services",
      },
      {
        titre: "Digital identity system",
        desc: "Digital identity architecture for a country of 5M inhabitants, with integration of existing civil registration databases.",
        tag: "Identity",
      },
    ],
    hero: {
      breadcrumb: "Digital Gov & e-Services",
      domainLabel: "GIRA Dev · Domain 02",
      titleLine1: "Digital Gov",
      titleEm: "& e-Services",
      subtitle:
        "Government portals, public e-services, digital identity systems. We support governments in their digital transformation, from design to operation.",
      ctaPrimary: "Discuss your project",
      ctaSecondary: "Back to GIRA Dev",
    },
    sections: {
      whatWeDo: "What we do",
      concreteApps: "Concrete applications",
      usecasesTitle: "Use cases in Africa",
      otherDomains: "Other GIRA Dev domains",
    },
  },
} as const;

export default function DigitalGovPage() {
  const locale = useLocale() as "fr" | "en";
  const d = PAGE_DATA[locale];

  return (
    <div style={{ backgroundColor: "#0D0D0D", minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 60% at 15% 50%, rgba(45,106,79,0.07) 0%, transparent 65%)",
        }} />

        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-10"
          >
            <Link href="/x" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest transition-colors hover:opacity-70"
              style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
              <ArrowLeft size={13} />
              GIRA Dev
            </Link>
            <ChevronRight size={12} style={{ color: "rgba(255,255,255,0.2)" }} />
            <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
              {d.hero.breadcrumb}
            </span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl"
                style={{ backgroundColor: "rgba(45,106,79,0.12)", border: "1px solid rgba(45,106,79,0.25)" }}
              >
                <Landmark size={30} style={{ color: "#2D6A4F" }} strokeWidth={1.3} />
              </motion.div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-[10px] font-bold uppercase tracking-[0.4em] block mb-4"
                style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
              >
                {d.hero.domainLabel}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {d.hero.titleLine1}<br /><em style={{ color: "#C9A84C" }}>{d.hero.titleEm}</em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-lg leading-relaxed mb-10"
                style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-inter)", maxWidth: "480px" }}
              >
                {d.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold rounded-full transition-all hover:opacity-90"
                  style={{ backgroundColor: "#C9A84C", color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
                >
                  {d.hero.ctaPrimary}
                  <ArrowRight size={15} />
                </Link>
                <Link href="/x"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full transition-all hover:opacity-70"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-inter)" }}
                >
                  {d.hero.ctaSecondary}
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p className="text-xs uppercase tracking-widest font-bold mb-6" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
                {d.sections.whatWeDo}
              </p>
              <ul className="space-y-4">
                {d.points.map((pt, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-inter)" }}
                  >
                    <CheckCircle2 size={15} style={{ color: "#C9A84C", flexShrink: 0, marginTop: 2 }} strokeWidth={1.8} />
                    {pt}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── USE CASES ────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] block mb-3" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
              {d.sections.concreteApps}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              {d.sections.usecasesTitle}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {d.usecases.map((u, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md mb-5"
                  style={{ backgroundColor: "rgba(45,106,79,0.12)", color: "#2D6A4F", fontFamily: "var(--font-inter)" }}>{u.tag}</span>
                <h3 className="text-base font-bold text-white mb-3" style={{ fontFamily: "var(--font-montserrat)" }}>{u.titre}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter)" }}>{u.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NAVIGATION SIBLINGS ──────────────────────────── */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#0D0D0D", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>
            {d.sections.otherDomains}
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {d.siblings.map((s) => (
              <Link key={s.href} href={s.href}
                className="group flex items-center justify-between p-5 rounded-2xl transition-all duration-200 hover:border-[rgba(201,168,76,0.3)]"
                style={{ border: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)" }}>
                <div>
                  <p className="text-sm font-bold text-white mb-0.5 group-hover:text-[#C9A84C] transition-colors" style={{ fontFamily: "var(--font-montserrat)" }}>{s.label}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>{s.sub}</p>
                </div>
                <ArrowRight size={15} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: "#C9A84C" }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
