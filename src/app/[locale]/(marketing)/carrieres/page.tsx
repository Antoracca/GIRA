"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

/* ── Tokens ──────────────────────────────────────────── */
const GOLD  = "#C9A84C";
const DARK  = "#0D0D0D";
const BODY  = "#444444";
const WHITE = "#FFFFFF";
const OFF   = "#F5F5F0";

/* ── i18n Data ────────────────────────────────────────── */

const CARRIERES_DATA = {
  fr: {
    hero: {
      labelTop: "Rejoindre GIRA",
      h1Line1: "Bâtisseurs",
      h1Line2: "d\u2019impact.",
      subtitle: "Un continent à transformer. Des missions à fort impact. Une équipe qui ne se satisfait pas du bon.",
      cta1: "Postuler",
      cta2: "Découvrir la culture GIRA",
    },
    manifeste: {
      label: "Notre conviction",
      headline1: "L\u2019Afrique n\u2019a pas besoin de plus de rapports.\u00a0",
      headline2: "Elle a besoin d\u2019exécution.",
    },
    pourquoi: {
      label: "Pourquoi nous rejoindre",
      title: "Trois raisons qui font la différence",
    },
    raisons: [
      {
        label: "Impact",
        headline: "Vos décisions auront un poids réel",
        desc: "Ici, les livrables finissent dans des vies, pas dans des tiroirs. Chaque mission que vous portez produit un résultat mesurable sur des populations, des territoires, des institutions.",
      },
      {
        label: "Excellence",
        headline: "L\u2019exigence est notre point de départ",
        desc: "Nous recrutons des profils qui ne se satisfont pas du bon. Standards internationaux, terrain africain, résultats concrets. Dès votre premier jour, vous opérez au niveau le plus haut.",
      },
      {
        label: "Exposition",
        headline: "Vous serez exposé là où peu accèdent",
        desc: "Ministres, directeurs généraux, bailleurs de la Banque Mondiale et de la BAD. Des responsabilités directes dès le premier jour. Pas de stage factice, pas de hiérarchie opaque.",
      },
    ],
    profils: {
      label: "Nos opportunités",
      title: "Profils recherchés",
      cta: "Postuler maintenant",
      list: [
        { titre: "Consultant en Gouvernance & Politique Publique",    domaine: "Gouvernance · Secteur public" },
        { titre: "Expert Infrastructure & BTP",                       domaine: "Infrastructure · Génie civil" },
        { titre: "Ingénieur Eau, Énergie & Environnement",            domaine: "Eau · Énergie · Environnement" },
        { titre: "Spécialiste Agriculture & Développement Rural",     domaine: "Agriculture · Territoire" },
        { titre: "Consultant Financement & Mobilisation de Capitaux", domaine: "Finance · Bailleurs internationaux" },
        { titre: "Expert Santé & Systèmes de Santé",                  domaine: "Santé publique · OMS · Bailleurs" },
        { titre: "Spécialiste Mines & Ressources Naturelles",         domaine: "Mines · Industrie extractive" },
        { titre: "Développeur Full-Stack & Solutions Numériques",     domaine: "Tech · Numérique · ERP" },
        { titre: "Expert IA & Analyse de Données",                    domaine: "Intelligence artificielle · Data" },
        { titre: "Chef de Projet & Maîtrise d\u2019Ouvrage Déléguée",domaine: "Management · Coordination" },
      ],
      autre: "Autre domaine",
    },
    form: {
      labelSection: "Candidature",
      title: "Candidature spontanée",
      body: "Vous ne trouvez pas le profil idéal\u00a0? Envoyez-nous votre dossier. Notre équipe RH étudie chaque candidature avec attention et revient vers vous sous 5 jours ouvrés.",
      emailIntro: "Vous pouvez aussi envoyer votre CV à",
      fields: {
        firstName: { label: "Prénom *",              placeholder: "Votre prénom" },
        lastName:  { label: "Nom *",                 placeholder: "Votre nom" },
        email:     { label: "Email *",               placeholder: "vous@exemple.com" },
        phone:     { label: "Téléphone (optionnel)", placeholder: "+33 6 00 00 00 00" },
        domaine:   { label: "Domaine d\u2019expertise *", placeholder: "Sélectionner un domaine" },
        message:   { label: "Message & Motivation *", placeholder: "Décrivez votre parcours, vos motivations et ce que vous apporteriez à GIRA..." },
      },
      rgpd: {
        text: "J\u2019accepte que GIRA traite mes données conformément à sa",
        link: "politique de confidentialité",
      },
      submit: "Envoyer ma candidature",
      submitting: "Envoi en cours\u2026",
      success: {
        title: "Candidature reçue.",
        body: "Notre équipe RH vous recontactera sous 5 jours ouvrés. Merci de l\u2019intérêt que vous portez à GIRA.",
      },
      errors: {
        firstName: "Prénom requis",
        lastName:  "Nom requis",
        email:     "Email invalide",
        domaine:   "Veuillez sélectionner un domaine",
        message:   "Message trop court (20 car. min.)",
        rgpd:      "Vous devez accepter la politique RGPD",
      },
    },
    cta: {
      label: "Des questions\u00a0?",
      title: "Notre équipe répond à toutes vos questions sur les opportunités chez GIRA.",
      contact: "Nous contacter",
    },
  },
  en: {
    hero: {
      labelTop: "Join GIRA",
      h1Line1: "Builders",
      h1Line2: "of impact.",
      subtitle: "A continent to transform. High-impact missions. A team that is not satisfied with good enough.",
      cta1: "Apply",
      cta2: "Discover GIRA culture",
    },
    manifeste: {
      label: "Our conviction",
      headline1: "Africa doesn\u2019t need more reports.\u00a0",
      headline2: "It needs execution.",
    },
    pourquoi: {
      label: "Why join us",
      title: "Three reasons that make the difference",
    },
    raisons: [
      {
        label: "Impact",
        headline: "Your decisions will have real weight",
        desc: "Here, deliverables end up in lives, not drawers. Every mission you carry produces a measurable result on populations, territories, institutions.",
      },
      {
        label: "Excellence",
        headline: "Excellence is our starting point",
        desc: "We recruit profiles who are not satisfied with good. International standards, African ground, concrete results. From your first day, you operate at the highest level.",
      },
      {
        label: "Exposure",
        headline: "You will be exposed where few get access",
        desc: "Ministers, CEOs, donors from the World Bank and AfDB. Direct responsibilities from day one. No token internship, no opaque hierarchy.",
      },
    ],
    profils: {
      label: "Our opportunities",
      title: "Sought profiles",
      cta: "Apply now",
      list: [
        { titre: "Governance & Public Policy Consultant",          domaine: "Governance · Public sector" },
        { titre: "Infrastructure & Civil Engineering Expert",      domaine: "Infrastructure · Civil engineering" },
        { titre: "Water, Energy & Environment Engineer",           domaine: "Water · Energy · Environment" },
        { titre: "Agriculture & Rural Development Specialist",     domaine: "Agriculture · Territory" },
        { titre: "Financing & Capital Mobilization Consultant",    domaine: "Finance · International donors" },
        { titre: "Health & Health Systems Expert",                 domaine: "Public health · WHO · Donors" },
        { titre: "Mining & Natural Resources Specialist",          domaine: "Mining · Extractive industry" },
        { titre: "Full-Stack Developer & Digital Solutions",       domaine: "Tech · Digital · ERP" },
        { titre: "AI & Data Analysis Expert",                      domaine: "Artificial intelligence · Data" },
        { titre: "Project Manager & Delegated Project Management", domaine: "Management · Coordination" },
      ],
      autre: "Other domain",
    },
    form: {
      labelSection: "Application",
      title: "Spontaneous Application",
      body: "Don\u2019t find the ideal profile? Send us your application. Our HR team studies each application carefully and gets back to you within 5 business days.",
      emailIntro: "You can also send your CV to",
      fields: {
        firstName: { label: "First name *",        placeholder: "Your first name" },
        lastName:  { label: "Last name *",         placeholder: "Your last name" },
        email:     { label: "Email *",             placeholder: "you@example.com" },
        phone:     { label: "Phone (optional)",    placeholder: "+33 6 00 00 00 00" },
        domaine:   { label: "Area of expertise *", placeholder: "Select a domain" },
        message:   { label: "Message & Motivation *", placeholder: "Describe your background, motivations and what you would bring to GIRA..." },
      },
      rgpd: {
        text: "I agree that GIRA processes my data in accordance with its",
        link: "privacy policy",
      },
      submit: "Submit my application",
      submitting: "Submitting\u2026",
      success: {
        title: "Application received.",
        body: "Our HR team will contact you within 5 business days. Thank you for your interest in GIRA.",
      },
      errors: {
        firstName: "First name required",
        lastName:  "Last name required",
        email:     "Invalid email",
        domaine:   "Please select a domain",
        message:   "Message too short (20 chars min.)",
        rgpd:      "You must accept the GDPR policy",
      },
    },
    cta: {
      label: "Questions?",
      title: "Our team answers all your questions about opportunities at GIRA.",
      contact: "Contact us",
    },
  },
} as const;

/* ── Page ────────────────────────────────────────────── */
export default function CarrieresPage() {
  const locale = useLocale() as "fr" | "en";
  const t = CARRIERES_DATA[locale];

  const postes: string[] = [...t.profils.list.map((p) => p.titre as string), t.profils.autre];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", poste: "", message: "", rgpd: false,
  });
  const [errors, setErrors]         = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  function update(field: string, value: string | boolean) {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    const errs = t.form.errors;
    if (!form.firstName.trim() || form.firstName.trim().length < 2) e.firstName = errs.firstName;
    if (!form.lastName.trim()  || form.lastName.trim().length  < 2) e.lastName  = errs.lastName;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = errs.email;
    if (!form.poste)   e.poste   = errs.domaine;
    if (!form.message.trim() || form.message.trim().length < 20) e.message = errs.message;
    if (!form.rgpd)    e.rgpd    = errs.rgpd;
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  }

  const inputBase: React.CSSProperties = {
    fontFamily: "var(--font-inter)",
    color: DARK,
    fontSize: 15,
    backgroundColor: WHITE,
    border: "1px solid #E0E0E0",
    borderRadius: 10,
    padding: "12px 16px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ backgroundColor: DARK }}>

      {/* ══════════════════════════════════════════════════════
          HERO — même pattern que /x : flex items-end, label top-left, parallax
      ══════════════════════════════════════════════════════ */}
      <section
        id="overview"
        ref={heroRef}
        className="relative w-full min-h-screen overflow-hidden flex items-end"
      >
        {/* Vidéo de fond */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0, objectPosition: "center 30%" }}
        >
          <source src="https://media-publications.bcg.com/flash/banners/Purpose_ambient_video_v3.mp4" type="video/mp4" />
        </video>

        {/* Overlays — même double gradient que /x */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.45) 45%, rgba(13,13,13,0.15) 100%)", zIndex: 1 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(13,13,13,0.55) 0%, transparent 55%)", zIndex: 1 }}
        />

        {/* Label haut-gauche — même position que /x */}
        <div className="absolute left-8 md:left-16 lg:left-24 z-10" style={{ top: "calc(76px + 24px)" }}>
          <span
            className="text-[10px] uppercase tracking-[0.45em] font-bold"
            style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
          >
            {t.hero.labelTop}
          </span>
        </div>

        {/* Contenu hero — en bas, avec parallax */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, zIndex: 10 }}
          className="relative w-full max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 pt-[120px] pb-20 md:pb-28"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-black leading-[1.0] tracking-tight text-white max-w-3xl"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontFamily: "var(--font-montserrat)" }}
          >
            {t.hero.h1Line1}<br />
            <span style={{ color: GOLD }}>{t.hero.h1Line2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base md:text-lg max-w-md leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-inter)" }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#postuler"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:brightness-110"
              style={{ backgroundColor: GOLD, color: DARK, fontFamily: "var(--font-inter)" }}
            >
              {t.hero.cta1} <ArrowRight size={15} />
            </a>
            <a
              href="#pourquoi"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium border transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: WHITE, fontFamily: "var(--font-inter)" }}
            >
              {t.hero.cta2}
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MANIFESTE — section sombre éditoriale, zéro stats
      ══════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#111111" }} className="py-24 md:py-36">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em] mb-8"
              style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
            >
              {t.manifeste.label}
            </p>
            <h2
              className="font-black leading-tight text-white"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", fontFamily: "var(--font-montserrat)" }}
            >
              {t.manifeste.headline1}
              <span style={{ color: GOLD }}>{t.manifeste.headline2}</span>
            </h2>
            <div className="mt-10 w-12 h-[2px]" style={{ backgroundColor: GOLD }} />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          POURQUOI — 3 rows typographiques, fond blanc
      ══════════════════════════════════════════════════════ */}
      <section id="pourquoi" className="py-24 md:py-36" style={{ backgroundColor: WHITE }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-5" style={{ color: GOLD, fontFamily: "var(--font-inter)" }}>
              {t.pourquoi.label}
            </p>
            <h2
              className="font-black leading-tight max-w-2xl"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              {t.pourquoi.title}
            </h2>
          </motion.div>

          <div className="border-t border-neutral-200">
            {t.raisons.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-[160px_1fr_1fr] gap-6 md:gap-12 items-start py-10 md:py-12 border-b border-neutral-200"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] pt-1" style={{ color: GOLD, fontFamily: "var(--font-inter)" }}>
                  {r.label}
                </span>
                <h3 className="font-black leading-tight" style={{ fontSize: "clamp(1.2rem, 2vw, 1.65rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}>
                  {r.headline}
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                  {r.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROFILS — liste typographique sans numérotation, fond noir
      ══════════════════════════════════════════════════════ */}
      <section id="profils" className="py-24 md:py-36" style={{ backgroundColor: DARK }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-5" style={{ color: GOLD, fontFamily: "var(--font-inter)" }}>
              {t.profils.label}
            </p>
            <h2
              className="font-black leading-tight text-white max-w-xl"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontFamily: "var(--font-montserrat)" }}
            >
              {t.profils.title}
            </h2>
          </motion.div>

          <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {t.profils.list.map((p, i) => (
              <motion.div
                key={p.titre}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-12 py-6 md:py-7 border-b group cursor-default"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <h3
                  className="font-black text-white leading-tight transition-colors group-hover:text-[#C9A84C] flex-1"
                  style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)", fontFamily: "var(--font-montserrat)" }}
                >
                  {p.titre}
                </h3>
                <span
                  className="text-xs uppercase tracking-[0.18em] shrink-0"
                  style={{ color: "rgba(201,168,76,0.5)", fontFamily: "var(--font-inter)" }}
                >
                  {p.domaine}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-14"
          >
            <a
              href="#postuler"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:brightness-110"
              style={{ backgroundColor: GOLD, color: DARK, fontFamily: "var(--font-inter)" }}
            >
              {t.profils.cta} <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FORMULAIRE — 2 colonnes, fond off-white
      ══════════════════════════════════════════════════════ */}
      <section id="postuler" className="py-24 md:py-36" style={{ backgroundColor: OFF }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24 items-start">

            {/* Gauche — accroche sticky */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="lg:sticky lg:top-28"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-5" style={{ color: GOLD, fontFamily: "var(--font-inter)" }}>
                {t.form.labelSection}
              </p>
              <h2
                className="font-black leading-tight mb-6"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
              >
                {t.form.title}
              </h2>
              <div className="w-10 h-[2px] mb-8" style={{ backgroundColor: GOLD }} />
              <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                {t.form.body}
              </p>
              <p className="text-sm" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                {t.form.emailIntro}{" "}
                <a href="mailto:recrutement@gira-cf.com" className="font-semibold hover:underline" style={{ color: GOLD }}>
                  recrutement@gira-cf.com
                </a>
              </p>
            </motion.div>

            {/* Droite — formulaire */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-10 rounded-2xl bg-white border"
                    style={{ borderColor: `${GOLD}30` }}
                  >
                    <div className="w-10 h-[2px] mb-6" style={{ backgroundColor: GOLD }} />
                    <h3 className="text-xl font-black mb-3" style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}>
                      {t.form.success.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                      {t.form.success.body}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="bg-white rounded-2xl p-8 md:p-10 space-y-6"
                    style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 40px rgba(0,0,0,0.06)" }}
                  >
                    {/* Prénom + Nom */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { field: "firstName", label: t.form.fields.firstName.label, placeholder: t.form.fields.firstName.placeholder },
                        { field: "lastName",  label: t.form.fields.lastName.label,  placeholder: t.form.fields.lastName.placeholder },
                      ].map(({ field, label, placeholder }) => (
                        <div key={field}>
                          <label className="block text-xs font-medium mb-2" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>{label}</label>
                          <input
                            type="text"
                            value={form[field as keyof typeof form] as string}
                            onChange={e => update(field, e.target.value)}
                            placeholder={placeholder}
                            style={inputBase}
                            onFocus={e  => (e.target.style.borderColor = GOLD)}
                            onBlur={e   => (e.target.style.borderColor = errors[field] ? "#dc2626" : "#E0E0E0")}
                          />
                          {errors[field] && <p className="text-xs mt-1" style={{ color: "#dc2626", fontFamily: "var(--font-inter)" }}>{errors[field]}</p>}
                        </div>
                      ))}
                    </div>

                    {/* Email + Téléphone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium mb-2" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>{t.form.fields.email.label}</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => update("email", e.target.value)}
                          placeholder={t.form.fields.email.placeholder}
                          style={inputBase}
                          onFocus={e  => (e.target.style.borderColor = GOLD)}
                          onBlur={e   => (e.target.style.borderColor = errors.email ? "#dc2626" : "#E0E0E0")}
                        />
                        {errors.email && <p className="text-xs mt-1" style={{ color: "#dc2626", fontFamily: "var(--font-inter)" }}>{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>{t.form.fields.phone.label}</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={e => update("phone", e.target.value)}
                          placeholder={t.form.fields.phone.placeholder}
                          style={inputBase}
                          onFocus={e  => (e.target.style.borderColor = GOLD)}
                          onBlur={e   => (e.target.style.borderColor = "#E0E0E0")}
                        />
                      </div>
                    </div>

                    {/* Domaine */}
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>{t.form.fields.domaine.label}</label>
                      <select
                        value={form.poste}
                        onChange={e => update("poste", e.target.value)}
                        style={{ ...inputBase, appearance: "none", cursor: "pointer" }}
                        onFocus={e  => (e.target.style.borderColor = GOLD)}
                        onBlur={e   => (e.target.style.borderColor = errors.poste ? "#dc2626" : "#E0E0E0")}
                      >
                        <option value="">{t.form.fields.domaine.placeholder}</option>
                        {postes.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      {errors.poste && <p className="text-xs mt-1" style={{ color: "#dc2626", fontFamily: "var(--font-inter)" }}>{errors.poste}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>{t.form.fields.message.label}</label>
                      <textarea
                        value={form.message}
                        onChange={e => update("message", e.target.value)}
                        rows={5}
                        placeholder={t.form.fields.message.placeholder}
                        style={{ ...inputBase, resize: "none" }}
                        onFocus={e  => (e.target.style.borderColor = GOLD)}
                        onBlur={e   => (e.target.style.borderColor = errors.message ? "#dc2626" : "#E0E0E0")}
                      />
                      {errors.message && <p className="text-xs mt-1" style={{ color: "#dc2626", fontFamily: "var(--font-inter)" }}>{errors.message}</p>}
                    </div>

                    {/* RGPD */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="rgpd-car"
                        checked={form.rgpd}
                        onChange={e => update("rgpd", e.target.checked)}
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ accentColor: GOLD }}
                      />
                      <label htmlFor="rgpd-car" className="text-xs leading-relaxed" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                        {t.form.rgpd.text}{" "}
                        <Link href="/politique-confidentialite" className="underline" style={{ color: GOLD }}>{t.form.rgpd.link}</Link>. *
                      </label>
                    </div>
                    {errors.rgpd && <p className="text-xs" style={{ color: "#dc2626", fontFamily: "var(--font-inter)" }}>{errors.rgpd}</p>}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-60 hover:brightness-110 flex items-center justify-center gap-2"
                      style={{ backgroundColor: GOLD, color: DARK, fontFamily: "var(--font-inter)", minHeight: 52 }}
                    >
                      {submitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          {t.form.submitting}
                        </>
                      ) : (
                        <>{t.form.submit} <ArrowRight size={15} /></>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 border-t" style={{ backgroundColor: DARK, borderColor: "#1A1A1A" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-[0.25em] mb-6"
              style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
            >
              {t.cta.label}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-black text-white leading-tight mb-10"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontFamily: "var(--font-montserrat)" }}
            >
              {t.cta.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:brightness-110"
                style={{ backgroundColor: GOLD, color: DARK, fontFamily: "var(--font-inter)" }}
              >
                {t.cta.contact} <ArrowRight size={15} />
              </Link>
              <a
                href="mailto:recrutement@gira-cf.com"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium border transition-colors hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: WHITE, fontFamily: "var(--font-inter)" }}
              >
                recrutement@gira-cf.com
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
