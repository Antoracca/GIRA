"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */

const avantages = [
  {
    titre: "Impact direct",
    texte:
      "Chez GIRA, chaque mission produit un impact mesurable sur la vie de millions de personnes. Vous ne produisez pas de rapports — vous livrez des projets.",
  },
  {
    titre: "Excellence opérationnelle",
    texte:
      "Nous recrutons les meilleurs et les poussons à se dépasser. Standards McKinsey, terrain africain, résultats concrets.",
  },
  {
    titre: "Croissance accélérée",
    texte:
      "Exposition directe aux décideurs — ministres, directeurs généraux, bailleurs internationaux. Des responsabilités dès le premier jour.",
  },
];

const profils = [
  {
    titre: "Consultant Senior",
    description:
      "Structuration de projets, gouvernance, pilotage opérationnel. 5+ ans d'expérience en conseil ou secteur public africain.",
  },
  {
    titre: "Développeur Full-Stack",
    description:
      "Next.js, React, Node.js, TypeScript. Expérience en plateformes institutionnelles ou fintech à fort trafic.",
  },
  {
    titre: "Expert IA & Data",
    description:
      "Machine Learning, NLP, Computer Vision. Intégration de modèles dans des systèmes métier à grande échelle.",
  },
  {
    titre: "Chef de Projet Digital",
    description:
      "Gestion de projets complexes multi-pays. Coordination d'équipes techniques et relation client haut niveau.",
  },
];

const postes = [
  "Consultant Senior",
  "Développeur Full-Stack",
  "Expert IA & Data",
  "Chef de Projet Digital",
  "Autre",
];

/* ─────────────────────────────────────────
   Animation variant
───────────────────────────────────────── */

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.55 },
};

/* ─────────────────────────────────────────
   Shared input styles
───────────────────────────────────────── */

const inputClass =
  "bg-white border border-black/10 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#C9A84C] w-full";
const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter)",
  color: "#0D0D0D",
};
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 500,
  marginBottom: "6px",
  color: "#444444",
  fontFamily: "var(--font-inter)",
};

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */

export default function CarrieresPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    poste: "",
    message: "",
    rgpd: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.firstName.trim() || form.firstName.trim().length < 2)
      e.firstName = "Prénom requis (min. 2 caractères)";
    if (!form.lastName.trim() || form.lastName.trim().length < 2)
      e.lastName = "Nom requis (min. 2 caractères)";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email invalide";
    if (!form.poste) e.poste = "Veuillez sélectionner un poste";
    if (!form.message.trim() || form.message.trim().length < 20)
      e.message = "Message trop court (20 caractères min.)";
    if (!form.rgpd) e.rgpd = "Vous devez accepter la politique RGPD";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────── */}
      <section
        id="overview"
        className="relative flex items-end min-h-[50vh] pt-32 pb-16 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 60%, #0D0D0D 100%)",
        }}
      >
        {/* Subtle gold radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 10% 90%, rgba(201,168,76,0.07) 0%, transparent 65%)",
          }}
        />

        <div className="relative max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 w-full">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-1 mb-5">
            {[
              { label: "Accueil", href: "/" },
              { label: "Nous Rejoindre", href: "/carrieres" },
              { label: "Carrières" },
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && (
                  <ChevronRight size={12} style={{ color: "rgba(201,168,76,0.5)" }} />
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-xs uppercase tracking-widest transition-colors duration-200 hover:text-[#C9A84C]"
                    style={{ color: "rgba(201,168,76,0.65)", fontFamily: "var(--font-inter)" }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-xs uppercase tracking-widest"
                    style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
                  >
                    {item.label}
                  </span>
                )}
              </span>
            ))}
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Rejoindre GIRA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
          >
            Des missions à fort impact. Un continent à transformer.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-8 h-[2px] w-16"
            style={{ backgroundColor: "#C9A84C" }}
          />
        </div>
      </section>

      {/* ── POURQUOI NOUS REJOINDRE ──────────────── */}
      <section id="pourquoi" className="py-20 md:py-32" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="mb-14 max-w-xl">
            <p
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
            >
              Pourquoi GIRA
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
            >
              Pourquoi nous rejoindre
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {avantages.map((a, i) => (
              <motion.div
                key={a.titre}
                {...fadeUp}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="bg-white border-l-4 border-[#C9A84C] rounded-2xl p-8 shadow-sm"
              >
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
                >
                  {a.titre}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                >
                  {a.texte}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFILS RECHERCHÉS ───────────────────── */}
      <section id="profils" className="py-20 md:py-32" style={{ backgroundColor: "#0D0D0D" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div {...fadeUp} className="mb-14 max-w-xl">
            <p
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
            >
              Nos opportunités
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Profils recherchés
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {profils.map((p, i) => (
              <motion.div
                key={p.titre}
                {...fadeUp}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="rounded-2xl p-8 border border-white/10"
                style={{ backgroundColor: "#1A1A2E" }}
              >
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {p.titre}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#AAAAAA", fontFamily: "var(--font-inter)" }}
                >
                  {p.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CANDIDATURE SPONTANÉE ────────────────── */}
      <section id="postuler" className="py-20 md:py-32" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-2xl mx-auto">
            <motion.div {...fadeUp} className="mb-10">
              <p
                className="text-xs uppercase tracking-widest mb-3 font-medium"
                style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
              >
                Candidature
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
              >
                Candidature spontanée
              </h2>
            </motion.div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="p-8 rounded-2xl border"
                style={{
                  borderColor: "rgba(201,168,76,0.3)",
                  backgroundColor: "rgba(201,168,76,0.05)",
                }}
              >
                <p
                  className="text-base font-bold mb-2"
                  style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
                >
                  Candidature envoyée avec succès.
                </p>
                <p
                  className="text-sm"
                  style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                >
                  Notre équipe RH vous recontactera sous 5 jours ouvrés.
                </p>
              </motion.div>
            ) : (
              <motion.form
                {...fadeUp}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                {/* Prénom + Nom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Prénom *</label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      placeholder="Votre prénom"
                      className={inputClass}
                      style={inputStyle}
                    />
                    {errors.firstName && (
                      <p className="text-xs mt-1" style={{ color: "#dc2626" }}>
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label style={labelStyle}>Nom *</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      placeholder="Votre nom"
                      className={inputClass}
                      style={inputStyle}
                    />
                    {errors.lastName && (
                      <p className="text-xs mt-1" style={{ color: "#dc2626" }}>
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email + Téléphone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="prenom@exemple.com"
                      className={inputClass}
                      style={inputStyle}
                    />
                    {errors.email && (
                      <p className="text-xs mt-1" style={{ color: "#dc2626" }}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label style={labelStyle}>Téléphone (optionnel)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+33 6 00 00 00 00"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Poste */}
                <div>
                  <label style={labelStyle}>Poste souhaité *</label>
                  <select
                    value={form.poste}
                    onChange={(e) => update("poste", e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  >
                    <option value="">Sélectionner un poste</option>
                    {postes.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  {errors.poste && (
                    <p className="text-xs mt-1" style={{ color: "#dc2626" }}>
                      {errors.poste}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Message / Motivation *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={5}
                    placeholder="Décrivez brièvement votre parcours et votre motivation..."
                    className={inputClass}
                    style={{ ...inputStyle, resize: "none" }}
                  />
                  {errors.message && (
                    <p className="text-xs mt-1" style={{ color: "#dc2626" }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* RGPD */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="rgpd-carrieres"
                    checked={form.rgpd}
                    onChange={(e) => update("rgpd", e.target.checked)}
                    className="mt-0.5 w-4 h-4 shrink-0"
                    style={{ accentColor: "#C9A84C" }}
                  />
                  <label
                    htmlFor="rgpd-carrieres"
                    className="text-xs leading-relaxed"
                    style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                  >
                    J'accepte que GIRA traite mes données conformément à sa{" "}
                    <Link
                      href="/politique-confidentialite"
                      className="underline"
                      style={{ color: "#C9A84C" }}
                    >
                      politique de confidentialité
                    </Link>
                    . *
                  </label>
                </div>
                {errors.rgpd && (
                  <p className="text-xs" style={{ color: "#dc2626" }}>
                    {errors.rgpd}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-60 hover:opacity-90"
                  style={{
                    backgroundColor: "#C9A84C",
                    color: "#0D0D0D",
                    fontFamily: "var(--font-inter)",
                    minHeight: "44px",
                  }}
                >
                  {submitting ? "Envoi en cours…" : "Envoyer ma candidature"}
                </button>

                {/* Note */}
                <p
                  className="text-xs text-center"
                  style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                >
                  Envoyez aussi votre CV à{" "}
                  <a
                    href="mailto:recrutement@gira-cf.com"
                    className="underline"
                    style={{ color: "#C9A84C" }}
                  >
                    recrutement@gira-cf.com
                  </a>
                </p>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────── */}
      <section className="py-20 md:py-32" style={{ backgroundColor: "#0D0D0D" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div {...fadeUp}>
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Des questions ?
            </h2>
            <p
              className="text-sm mb-8 max-w-md mx-auto"
              style={{ color: "#AAAAAA", fontFamily: "var(--font-inter)" }}
            >
              Notre équipe est disponible pour répondre à toutes vos interrogations sur les opportunités chez GIRA.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: "#C9A84C",
                color: "#0D0D0D",
                fontFamily: "var(--font-inter)",
                minHeight: "44px",
              }}
            >
              Nous contacter
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
