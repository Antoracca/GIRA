"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronRight, MapPin, Mail, Globe } from "lucide-react";

/* ─────────────────────────────────────────
   i18n Data
───────────────────────────────────────── */

const PAGE_DATA = {
  fr: {
    breadcrumbHome: "Accueil",
    heroTitle: "Contactez-nous",
    heroSubtitle: "Notre équipe répond sous 24h ouvrées.",
    formTitle: "Écrivez-nous",
    formSubtitle: "Remplissez le formulaire ci-dessous. Notre équipe vous répondra dans les meilleurs délais.",
    successTitle: "Message envoyé avec succès.",
    successDesc: "Nos équipes ont bien reçu votre demande. Nous reviendrons vers vous sous 24h ouvrées avec une première analyse.",
    labels: {
      firstName: "Prénom *",
      firstNamePh: "Votre prénom",
      lastName: "Nom *",
      lastNamePh: "Votre nom",
      organisation: "Organisation *",
      organisationPh: "Votre organisation",
      fonction: "Fonction *",
      fonctionPh: "Votre fonction",
      pays: "Pays *",
      paysPh: "Votre pays",
      email: "Email *",
      emailPh: "prenom@exemple.com",
      phone: "Téléphone (optionnel)",
      typeDemande: "Type de demande *",
      typeSelect: "Sélectionner…",
      message: "Message *",
      messagePh: "Décrivez votre projet ou votre demande…",
      rgpd: "J'accepte que GIRA traite mes données conformément à sa",
      rgpdLink: "politique de confidentialité",
      submit: "Envoyer",
      submitting: "Envoi en cours…",
    },
    typesDemande: ["Gouvernement", "Institution internationale", "Investisseur", "Entreprise", "ONG", "Autre"],
    errors: {
      firstName: "Prénom requis (min. 2 caractères)",
      lastName: "Nom requis (min. 2 caractères)",
      organisation: "Organisation requise",
      fonction: "Fonction requise",
      pays: "Pays requis",
      email: "Email invalide",
      typeDemande: "Type de demande requis",
      message: "Message trop court (20 caractères min.)",
      rgpd: "Vous devez accepter la politique RGPD",
    },
    coords: "Nos coordonnées",
    hq: "Siège — Paris",
    offices: "Bureaux",
    writeDirectly: "Ou écrivez-nous directement",
  },
  en: {
    breadcrumbHome: "Home",
    heroTitle: "Contact Us",
    heroSubtitle: "Our team responds within 24 business hours.",
    formTitle: "Write to Us",
    formSubtitle: "Fill in the form below. Our team will respond as soon as possible.",
    successTitle: "Message sent successfully.",
    successDesc: "Our team has received your request. We will get back to you within 24 business hours with an initial analysis.",
    labels: {
      firstName: "First name *",
      firstNamePh: "Your first name",
      lastName: "Last name *",
      lastNamePh: "Your last name",
      organisation: "Organization *",
      organisationPh: "Your organization",
      fonction: "Position *",
      fonctionPh: "Your position",
      pays: "Country *",
      paysPh: "Your country",
      email: "Email *",
      emailPh: "firstname@example.com",
      phone: "Phone (optional)",
      typeDemande: "Request type *",
      typeSelect: "Select…",
      message: "Message *",
      messagePh: "Describe your project or request…",
      rgpd: "I agree that GIRA processes my data in accordance with its",
      rgpdLink: "privacy policy",
      submit: "Send",
      submitting: "Sending…",
    },
    typesDemande: ["Government", "International institution", "Investor", "Company", "NGO", "Other"],
    errors: {
      firstName: "First name required (min. 2 characters)",
      lastName: "Last name required (min. 2 characters)",
      organisation: "Organization required",
      fonction: "Position required",
      pays: "Country required",
      email: "Invalid email",
      typeDemande: "Request type required",
      message: "Message too short (20 characters min.)",
      rgpd: "You must accept the GDPR policy",
    },
    coords: "Our Contact Details",
    hq: "HQ — Paris",
    offices: "Offices",
    writeDirectly: "Or write to us directly",
  },
} as const;

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
  const locale = useLocale() as "fr" | "en";
  const d = PAGE_DATA[locale];

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
      e.firstName = d.errors.firstName;
    if (!form.lastName.trim() || form.lastName.trim().length < 2)
      e.lastName = d.errors.lastName;
    if (!form.organisation.trim()) e.organisation = d.errors.organisation;
    if (!form.fonction.trim()) e.fonction = d.errors.fonction;
    if (!form.pays.trim()) e.pays = d.errors.pays;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = d.errors.email;
    if (!form.typeDemande) e.typeDemande = d.errors.typeDemande;
    if (!form.message.trim() || form.message.trim().length < 20)
      e.message = d.errors.message;
    if (!form.rgpd) e.rgpd = d.errors.rgpd;
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
              { label: d.breadcrumbHome, href: "/" },
              { label: d.heroTitle },
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
            {d.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
          >
            {d.heroSubtitle}
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
                {d.formTitle}
              </h2>
              <p
                className="text-sm mb-8"
                style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
              >
                {d.formSubtitle}
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
                    {d.successTitle}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                  >
                    {d.successDesc}
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

                  {/* First name + Last name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={labelStyle}>{d.labels.firstName}</label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        placeholder={d.labels.firstNamePh}
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
                      <label style={labelStyle}>{d.labels.lastName}</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        placeholder={d.labels.lastNamePh}
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
                      <label style={labelStyle}>{d.labels.organisation}</label>
                      <input
                        type="text"
                        value={form.organisation}
                        onChange={(e) => update("organisation", e.target.value)}
                        placeholder={d.labels.organisationPh}
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
                      <label style={labelStyle}>{d.labels.fonction}</label>
                      <input
                        type="text"
                        value={form.fonction}
                        onChange={(e) => update("fonction", e.target.value)}
                        placeholder={d.labels.fonctionPh}
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
                      <label style={labelStyle}>{d.labels.pays}</label>
                      <input
                        type="text"
                        value={form.pays}
                        onChange={(e) => update("pays", e.target.value)}
                        placeholder={d.labels.paysPh}
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
                      <label style={labelStyle}>{d.labels.email}</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder={d.labels.emailPh}
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

                  {/* Phone */}
                  <div>
                    <label style={labelStyle}>{d.labels.phone}</label>
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
                    <label style={labelStyle}>{d.labels.typeDemande}</label>
                    <select
                      value={form.typeDemande}
                      onChange={(e) => update("typeDemande", e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                    >
                      <option value="">{d.labels.typeSelect}</option>
                      {d.typesDemande.map((t) => (
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
                    <label style={labelStyle}>{d.labels.message}</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={4}
                      placeholder={d.labels.messagePh}
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
                      {d.labels.rgpd}{" "}
                      <Link
                        href="/politique-confidentialite"
                        className="underline"
                        style={{ color: "#C9A84C" }}
                      >
                        {d.labels.rgpdLink}
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
                    {submitting ? d.labels.submitting : d.labels.submit}
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
                  {d.coords}
                </h3>

                <div className="space-y-6">
                  {/* HQ Paris */}
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0" style={{ color: "#C9A84C" }} />
                    <div>
                      <p
                        className="text-sm font-semibold mb-0.5"
                        style={{ color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
                      >
                        {d.hq}
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

                  {/* Offices */}
                  <div className="flex items-start gap-3">
                    <Globe size={18} className="mt-0.5 shrink-0" style={{ color: "#C9A84C" }} />
                    <div>
                      <p
                        className="text-sm font-semibold mb-0.5"
                        style={{ color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
                      >
                        {d.offices}
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
              {d.writeDirectly}
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
