"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Brain, CheckCircle2, ChevronRight } from "lucide-react";

/* ── Locale-keyed data ────────────────────────────────── */
const PAGE_DATA = {
  fr: {
    siblings: [
      { label: "Digital Gov", sub: "e-Services publics", href: "/x/digital-gov" },
      { label: "Infrastructure Tech", sub: "IoT & supervision", href: "/x/infrastructure" },
      { label: "Finance & Impact", sub: "ESG & investissements", href: "/x/finance-impact" },
    ],
    points: [
      "Modèles de machine learning adaptés aux données fragmentées des marchés africains",
      "Tableaux de bord analytiques temps réel pour ministères et bailleurs",
      "Automatisation des rapports de suivi (IDA, BAD, AFD)",
      "Prédiction de risques sur les projets d'infrastructure",
      "Systèmes de collecte terrain via mobile (zones sans connectivité)",
      "Traitement du langage naturel en français et langues locales",
    ],
    usecases: [
      {
        titre: "Pilotage de portefeuille PND",
        desc: "Dashboard de suivi en temps réel des 543 projets du PND-RCA, avec alertes automatiques sur les indicateurs critiques.",
        tag: "Gouvernance",
      },
      {
        titre: "Analyse prédictive eau & énergie",
        desc: "Modèles IA pour anticiper les ruptures d'approvisionnement et optimiser la distribution dans les zones périurbaines.",
        tag: "Infrastructure",
      },
      {
        titre: "Reporting ESG automatisé",
        desc: "Agrégation et mise en forme automatique des données ESG pour les investisseurs institutionnels et fonds d'impact.",
        tag: "Finance",
      },
    ],
    hero: {
      breadcrumb: "Data & Intelligence Artificielle",
      domainLabel: "GIRA Dev · Domaine 01",
      titleLine1: "Data &",
      titleEm: "Intelligence",
      titleLine3: "Artificielle",
      subtitle:
        "Nous concevons des systèmes d'intelligence artificielle et d'analyse de la donnée pour les institutions africaines. De la collecte terrain à la décision stratégique, chaque information compte.",
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
      { label: "Digital Gov", sub: "Public e-services", href: "/x/digital-gov" },
      { label: "Tech Infrastructure", sub: "IoT & supervision", href: "/x/infrastructure" },
      { label: "Finance & Impact", sub: "ESG & investments", href: "/x/finance-impact" },
    ],
    points: [
      "Machine learning models adapted to fragmented data from African markets",
      "Real-time analytical dashboards for ministries and donors",
      "Automated monitoring reports (IDA, AfDB, AFD)",
      "Risk prediction for infrastructure projects",
      "Field data collection via mobile (areas without connectivity)",
      "Natural language processing in French and local languages",
    ],
    usecases: [
      {
        titre: "NDP Portfolio Management",
        desc: "Real-time monitoring dashboard for the 543 projects of the NDP-CAR, with automatic alerts on critical indicators.",
        tag: "Governance",
      },
      {
        titre: "Predictive water & energy analytics",
        desc: "AI models to anticipate supply disruptions and optimize distribution in peri-urban areas.",
        tag: "Infrastructure",
      },
      {
        titre: "Automated ESG reporting",
        desc: "Automatic aggregation and formatting of ESG data for institutional investors and impact funds.",
        tag: "Finance",
      },
    ],
    hero: {
      breadcrumb: "Data & Artificial Intelligence",
      domainLabel: "GIRA Dev · Domain 01",
      titleLine1: "Data &",
      titleEm: "Artificial",
      titleLine3: "Intelligence",
      subtitle:
        "We design artificial intelligence and data analytics systems for African institutions. From field collection to strategic decision-making, every piece of information counts.",
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

/* ── Page ─────────────────────────────────────────────── */
export default function DataIAPage() {
  const locale = useLocale() as "fr" | "en";
  const d = PAGE_DATA[locale];

  return (
    <div style={{ backgroundColor: "#0D0D0D", minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Glow background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 60% at 15% 50%, rgba(201,168,76,0.07) 0%, transparent 65%)",
        }} />

        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          {/* Breadcrumb */}
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
              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl"
                style={{ backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}
              >
                <Brain size={30} style={{ color: "#C9A84C" }} strokeWidth={1.3} />
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
                {d.hero.titleLine1}<br /><em style={{ color: "#C9A84C" }}>{d.hero.titleEm}</em><br />{d.hero.titleLine3}
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

            {/* Points clés */}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] block mb-3" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
              {d.sections.concreteApps}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              {d.sections.usecasesTitle}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {d.usecases.map((u, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md mb-5"
                  style={{ backgroundColor: "rgba(201,168,76,0.1)", color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                  {u.tag}
                </span>
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
                style={{ border: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)" }}
              >
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
