"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, LineChart, CheckCircle2, ChevronRight } from "lucide-react";

const SIBLINGS = [
  { label: "Data & IA", sub: "Systèmes intelligents", href: "/x/data-ia" },
  { label: "Digital Gov", sub: "e-Services publics", href: "/x/digital-gov" },
  { label: "Infrastructure Tech", sub: "IoT & supervision", href: "/x/infrastructure" },
];

const POINTS = [
  "Reporting ESG automatisé pour investisseurs institutionnels et fonds d'impact",
  "Plateformes de suivi et de traçabilité des investissements projet",
  "Outils de mobilisation des bailleurs : prospectus numériques, fiches projets",
  "Tableaux de bord financiers temps réel pour comités de pilotage",
  "Modélisation de l'impact social et environnemental des projets",
  "Conformité aux standards GRI, TCFD et cadres bailleurs (IDA, BAD, AFD)",
];

const USECASES = [
  {
    titre: "Plateforme de suivi PND",
    desc: "Outil de reporting financier en temps réel pour le suivi des décaissements du PND-RCA, avec tableaux de bord à destination des bailleurs et du gouvernement.",
    tag: "Gouvernance",
  },
  {
    titre: "Reporting ESG fonds d'impact",
    desc: "Automatisation du rapport ESG annuel d'un fonds d'investissement africain : collecte des données, calcul des indicateurs, mise en forme conforme GRI.",
    tag: "ESG",
  },
  {
    titre: "Prospectus numérique investisseurs",
    desc: "Plateforme de présentation des projets bancables pour la Table Ronde des Investisseurs de Marrakech, avec fiches projets interactives et système de manifestation d'intérêt.",
    tag: "Financement",
  },
];

export default function FinanceImpactPage() {
  return (
    <div style={{ backgroundColor: "#0D0D0D", minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 60% at 15% 50%, rgba(201,168,76,0.06) 0%, transparent 65%)",
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
              Finance & Impact ESG
            </span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl"
                style={{ backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.18)" }}
              >
                <LineChart size={30} style={{ color: "#C9A84C" }} strokeWidth={1.3} />
              </motion.div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-[10px] font-bold uppercase tracking-[0.4em] block mb-4"
                style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
              >
                GIRA Dev · Domaine 04
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Finance &<br /><em style={{ color: "#C9A84C" }}>Impact ESG</em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base md:text-lg leading-relaxed mb-10"
                style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-inter)", maxWidth: "480px" }}
              >
                Reporting ESG automatisé, outils de suivi des investissements, plateformes de mobilisation des bailleurs. Nous donnons aux acteurs financiers la visibilité dont ils ont besoin.
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
                  Discutons de votre projet
                  <ArrowRight size={15} />
                </Link>
                <Link href="/x"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full transition-all hover:opacity-70"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-inter)" }}
                >
                  Retour GIRA Dev
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p className="text-xs uppercase tracking-widest font-bold mb-6" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
                Ce que nous faisons
              </p>
              <ul className="space-y-4">
                {POINTS.map((pt, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.07 }}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-inter)" }}>
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
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] block mb-3" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>Applications concrètes</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>Cas d'usage en Afrique</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {USECASES.map((u, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md mb-5"
                  style={{ backgroundColor: "rgba(201,168,76,0.1)", color: "#C9A84C", fontFamily: "var(--font-inter)" }}>{u.tag}</span>
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
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}>Autres domaines GIRA Dev</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {SIBLINGS.map((s) => (
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
