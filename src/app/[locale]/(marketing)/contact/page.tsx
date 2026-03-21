"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronRight, MapPin, Mail, Globe } from "lucide-react";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */

const typesDemande = [
  "Gouvernement",
  "Institution internationale",
  "Investisseur",
  "Entreprise",
  "ONG",
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

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    organisation: "",
    fonction: "",
    pays: "",
    email: "",
    phone: "",
    typeDemande: "",
    message: "",
    honeypot: "",
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
    if (!form.organisation.trim()) e.organisation = "Organisation requise";
    if (!form.fonction.trim()) e.fonction = "Fonction requise";
    if (!form.pays.trim()) e.pays = "Pays requis";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email invalide";
    if (!form.typeDemande) e.typeDemande = "Type de demande requis";
    if (!form.message.trim() || form.message.trim().length < 20)
      e.message = "Message trop court (20 caractères min.)";
    if (!form.rgpd) e.rgpd = "Vous devez accepter la politique RGPD";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Honeypot check — bot trap
    if (form.honeypot) return;
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
        className="relative flex items-end min-h-[40vh] pt-32 pb-16 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 60%, #0D0D0D 100%)",
        }}
      >
        {/* Gold glow */}
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
              { label: "Contact" },
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
            Contactez-nous
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
          >
            Notre équipe répond sous 24h ouvrées.
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

      {/* ── FORMULAIRE + COORDONNÉES ─────────────── */}
      <section id="formulaire" className="py-20 md:py-32" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16">

            {/* ── LEFT: Form ── */}
            <motion.div {...fadeUp}>
              <h2
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
              >
                Écrivez-nous
              </h2>
              <p
                className="text-sm mb-8"
                style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
              >
                Remplissez le formulaire ci-dessous. Notre équipe vous répondra dans les meilleurs délais.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="p-8 rounded-2xl border bg-white shadow-sm"
                  style={{ borderColor: "rgba(201,168,76,0.3)" }}
                >
                  <p
                    className="text-base font-bold mb-2"
                    style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
                  >
                    Message envoyé avec succès.
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                  >
                    Nos équipes ont bien reçu votre demande. Nous reviendrons vers vous sous 24h ouvrées avec une première analyse.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot — hidden from real users */}
                  <div aria-hidden="true" style={{ display: "none" }}>
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.honeypot}
                      onChange={(e) => update("honeypot", e.target.value)}
                    />
                  </div>

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

                  {/* Organisation + Fonction */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={labelStyle}>Organisation *</label>
                      <input
                        type="text"
                        value={form.organisation}
                        onChange={(e) => update("organisation", e.target.value)}
                        placeholder="Votre organisation"
                        className={inputClass}
                        style={inputStyle}
                      />
                      {errors.organisation && (
                        <p className="text-xs mt-1" style={{ color: "#dc2626" }}>
                          {errors.organisation}
                        </p>
                      )}
                    </div>
                    <div>
                      <label style={labelStyle}>Fonction *</label>
                      <input
                        type="text"
                        value={form.fonction}
                        onChange={(e) => update("fonction", e.target.value)}
                        placeholder="Votre fonction"
                        className={inputClass}
                        style={inputStyle}
                      />
                      {errors.fonction && (
                        <p className="text-xs mt-1" style={{ color: "#dc2626" }}>
                          {errors.fonction}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Pays + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={labelStyle}>Pays *</label>
                      <input
                        type="text"
                        value={form.pays}
                        onChange={(e) => update("pays", e.target.value)}
                        placeholder="Votre pays"
                        className={inputClass}
                        style={inputStyle}
                      />
                      {errors.pays && (
                        <p className="text-xs mt-1" style={{ color: "#dc2626" }}>
                          {errors.pays}
                        </p>
                      )}
                    </div>
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
                  </div>

                  {/* Téléphone */}
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

                  {/* Type de demande */}
                  <div>
                    <label style={labelStyle}>Type de demande *</label>
                    <select
                      value={form.typeDemande}
                      onChange={(e) => update("typeDemande", e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                    >
                      <option value="">Sélectionner…</option>
                      {typesDemande.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.typeDemande && (
                      <p className="text-xs mt-1" style={{ color: "#dc2626" }}>
                        {errors.typeDemande}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>Message *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={4}
                      placeholder="Décrivez votre projet ou votre demande…"
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
                      id="rgpd-contact"
                      checked={form.rgpd}
                      onChange={(e) => update("rgpd", e.target.checked)}
                      className="mt-0.5 w-4 h-4 shrink-0"
                      style={{ accentColor: "#C9A84C" }}
                    />
                    <label
                      htmlFor="rgpd-contact"
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
                    {submitting ? "Envoi en cours…" : "Envoyer"}
                  </button>
                </form>
              )}
            </motion.div>

            {/* ── RIGHT: Coordonnées ── */}
            <motion.aside {...fadeUp} transition={{ duration: 0.55, delay: 0.15 }}>
              {/* Contact card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
                <h3
                  className="text-lg font-bold mb-6"
                  style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
                >
                  Nos coordonnées
                </h3>

                <div className="space-y-6">
                  {/* Siège Paris */}
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0" style={{ color: "#C9A84C" }} />
                    <div>
                      <p
                        className="text-sm font-semibold mb-0.5"
                        style={{ color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
                      >
                        Siège — Paris
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                      >
                        128, rue de la Boétie
                        <br />
                        75008 Paris — France
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="mt-0.5 shrink-0" style={{ color: "#C9A84C" }} />
                    <div>
                      <p
                        className="text-sm font-semibold mb-0.5"
                        style={{ color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
                      >
                        Email
                      </p>
                      <a
                        href="mailto:contact@gira-cf.com"
                        className="text-sm transition-colors duration-200 hover:underline"
                        style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
                      >
                        contact@gira-cf.com
                      </a>
                    </div>
                  </div>

                  {/* Bureaux */}
                  <div className="flex items-start gap-3">
                    <Globe size={18} className="mt-0.5 shrink-0" style={{ color: "#C9A84C" }} />
                    <div>
                      <p
                        className="text-sm font-semibold mb-0.5"
                        style={{ color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
                      >
                        Bureaux
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                      >
                        Casablanca &middot; Bratislava
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps embed */}
              <div className="overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9973960726795!2d2.3089695!3d48.8747545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc48a6b3a4d%3A0x6a33a2eed7b58a8f!2s128%20Rue%20de%20la%20Bo%C3%A9tie%2C%2075008%20Paris!5e0!3m2!1sfr!2sfr!4v1699999999999!5m2!1sfr!2sfr"
                  width="100%"
                  height="280"
                  style={{ borderRadius: "16px", border: "none" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GIRA — 128 rue de la Boétie, Paris"
                />
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ───────────────────────────── */}
      <section className="py-20 md:py-32" style={{ backgroundColor: "#0D0D0D" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div {...fadeUp}>
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Ou écrivez-nous directement
            </h2>
            <a
              href="mailto:contact@gira-cf.com"
              className="inline-block text-xl md:text-2xl font-semibold transition-colors duration-200 hover:underline"
              style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
            >
              contact@gira-cf.com
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
