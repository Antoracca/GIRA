"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

/* ── Tokens ──────────────────────────────────────────── */
const GOLD  = "#C9A84C";
const DARK  = "#0D0D0D";
const BODY  = "#444444";
const WHITE = "#FFFFFF";
const OFF   = "#F5F5F0";

/* ── Data ────────────────────────────────────────────── */
const raisons = [
  {
    label: "Impact",
    headline: "Vos décisions auront un poids réel",
    desc: "Ici, les livrables finissent dans des vies, pas dans des tiroirs. Chaque mission que vous portez produit un résultat mesurable sur des populations, des territoires, des institutions.",
  },
  {
    label: "Excellence",
    headline: "L'exigence est notre point de départ",
    desc: "Nous recrutons des profils qui ne se satisfont pas du bon. Standards internationaux, terrain africain, résultats concrets. Dès votre premier jour, vous opérez au niveau le plus haut.",
  },
  {
    label: "Exposition",
    headline: "Vous serez exposé là où peu accèdent",
    desc: "Ministres, directeurs généraux, bailleurs de la Banque Mondiale et de la BAD. Des responsabilités directes dès le premier jour. Pas de stage factice, pas de hiérarchie opaque.",
  },
];

const profils = [
  { titre: "Consultant en Gouvernance & Politique Publique",  domaine: "Gouvernance · Secteur public" },
  { titre: "Expert Infrastructure & BTP",                     domaine: "Infrastructure · Génie civil" },
  { titre: "Ingénieur Eau, Énergie & Environnement",          domaine: "Eau · Énergie · Environnement" },
  { titre: "Spécialiste Agriculture & Développement Rural",   domaine: "Agriculture · Territoire" },
  { titre: "Consultant Financement & Mobilisation de Capitaux", domaine: "Finance · Bailleurs internationaux" },
  { titre: "Expert Santé & Systèmes de Santé",                domaine: "Santé publique · OMS · Bailleurs" },
  { titre: "Spécialiste Mines & Ressources Naturelles",       domaine: "Mines · Industrie extractive" },
  { titre: "Développeur Full-Stack & Solutions Numériques",   domaine: "Tech · Numérique · ERP" },
  { titre: "Expert IA & Analyse de Données",                  domaine: "Intelligence artificielle · Data" },
  { titre: "Chef de Projet & Maîtrise d'Ouvrage Déléguée",   domaine: "Management · Coordination" },
];

const postes = profils.map(p => p.titre).concat(["Autre domaine"]);

/* ── Page ────────────────────────────────────────────── */
export default function CarrieresPage() {
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
    if (!form.firstName.trim() || form.firstName.trim().length < 2) e.firstName = "Prénom requis";
    if (!form.lastName.trim()  || form.lastName.trim().length  < 2) e.lastName  = "Nom requis";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalide";
    if (!form.poste)   e.poste   = "Veuillez sélectionner un domaine";
    if (!form.message.trim() || form.message.trim().length < 20) e.message = "Message trop court (20 car. min.)";
    if (!form.rgpd)    e.rgpd    = "Vous devez accepter la politique RGPD";
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
            Rejoindre GIRA
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
            Bâtisseurs<br />
            <span style={{ color: GOLD }}>d&apos;impact.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base md:text-lg max-w-md leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-inter)" }}
          >
            Un continent à transformer. Des missions à fort impact. Une équipe qui ne se satisfait pas du bon.
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
              Postuler <ArrowRight size={15} />
            </a>
            <a
              href="#pourquoi"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium border transition-colors hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: WHITE, fontFamily: "var(--font-inter)" }}
            >
              Découvrir la culture GIRA
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
              Notre conviction
            </p>
            <h2
              className="font-black leading-tight text-white"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", fontFamily: "var(--font-montserrat)" }}
            >
              L&apos;Afrique n&apos;a pas besoin de plus de rapports.{" "}
              <span style={{ color: GOLD }}>Elle a besoin d&apos;exécution.</span>
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
              Pourquoi nous rejoindre
            </p>
            <h2
              className="font-black leading-tight max-w-2xl"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              Trois raisons qui font la différence
            </h2>
          </motion.div>

          <div className="border-t border-neutral-200">
            {raisons.map((r, i) => (
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
              Nos opportunités
            </p>
            <h2
              className="font-black leading-tight text-white max-w-xl"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontFamily: "var(--font-montserrat)" }}
            >
              Profils recherchés
            </h2>
          </motion.div>

          <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {profils.map((p, i) => (
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
              Postuler maintenant <ArrowRight size={15} />
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
                Candidature
              </p>
              <h2
                className="font-black leading-tight mb-6"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: DARK, fontFamily: "var(--font-montserrat)" }}
              >
                Candidature spontanée
              </h2>
              <div className="w-10 h-[2px] mb-8" style={{ backgroundColor: GOLD }} />
              <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                Vous ne trouvez pas le profil idéal ? Envoyez-nous votre dossier. Notre équipe RH étudie chaque candidature avec attention et revient vers vous sous 5 jours ouvrés.
              </p>
              <p className="text-sm" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                Vous pouvez aussi envoyer votre CV à{" "}
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
                      Candidature reçue.
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                      Notre équipe RH vous recontactera sous 5 jours ouvrés. Merci de l&apos;intérêt que vous portez à GIRA.
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
                        { field: "firstName", label: "Prénom *", placeholder: "Votre prénom" },
                        { field: "lastName",  label: "Nom *",    placeholder: "Votre nom" },
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
                        <label className="block text-xs font-medium mb-2" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>Email *</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={e => update("email", e.target.value)}
                          placeholder="vous@exemple.com"
                          style={inputBase}
                          onFocus={e  => (e.target.style.borderColor = GOLD)}
                          onBlur={e   => (e.target.style.borderColor = errors.email ? "#dc2626" : "#E0E0E0")}
                        />
                        {errors.email && <p className="text-xs mt-1" style={{ color: "#dc2626", fontFamily: "var(--font-inter)" }}>{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>Téléphone (optionnel)</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={e => update("phone", e.target.value)}
                          placeholder="+33 6 00 00 00 00"
                          style={inputBase}
                          onFocus={e  => (e.target.style.borderColor = GOLD)}
                          onBlur={e   => (e.target.style.borderColor = "#E0E0E0")}
                        />
                      </div>
                    </div>

                    {/* Domaine */}
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>Domaine d&apos;expertise *</label>
                      <select
                        value={form.poste}
                        onChange={e => update("poste", e.target.value)}
                        style={{ ...inputBase, appearance: "none", cursor: "pointer" }}
                        onFocus={e  => (e.target.style.borderColor = GOLD)}
                        onBlur={e   => (e.target.style.borderColor = errors.poste ? "#dc2626" : "#E0E0E0")}
                      >
                        <option value="">Sélectionner un domaine</option>
                        {postes.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      {errors.poste && <p className="text-xs mt-1" style={{ color: "#dc2626", fontFamily: "var(--font-inter)" }}>{errors.poste}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>Message & Motivation *</label>
                      <textarea
                        value={form.message}
                        onChange={e => update("message", e.target.value)}
                        rows={5}
                        placeholder="Décrivez votre parcours, vos motivations et ce que vous apporteriez à GIRA..."
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
                        J&apos;accepte que GIRA traite mes données conformément à sa{" "}
                        <Link href="/politique-confidentialite" className="underline" style={{ color: GOLD }}>politique de confidentialité</Link>. *
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
                          Envoi en cours…
                        </>
                      ) : (
                        <>Envoyer ma candidature <ArrowRight size={15} /></>
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
              Des questions ?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-black text-white leading-tight mb-10"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontFamily: "var(--font-montserrat)" }}
            >
              Notre équipe répond à toutes vos questions sur les opportunités chez GIRA.
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
                Nous contacter <ArrowRight size={15} />
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
