"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ArrowRight, MapPin } from "lucide-react";

/* ─── Types ─── */
interface Expert {
  initials: string;
  nom: string;
  role: string;
  ville: string;
  pays: string;
  domaine: string;
}

/* ─── Locale-keyed data ─── */

const EXPERTS_DATA: Record<"fr" | "en", Expert[]> = {
  fr: [
    { initials: "AD", nom: "Dr. Amara Diallo",      role: "Expert IA & Data",           ville: "Paris",    pays: "France",        domaine: "Technologie" },
    { initials: "FN", nom: "Fatou Ndiaye",           role: "Consultante Fintech",        ville: "Londres",  pays: "Royaume-Uni",   domaine: "Finance" },
    { initials: "JK", nom: "Jean-Baptiste Koffi",    role: "Architecte Solutions",       ville: "Casablanca", pays: "Maroc",       domaine: "Technologie" },
    { initials: "AB", nom: "Dr. Aïssatou Bah",       role: "Spécialiste Santé Digitale", ville: "Genève",   pays: "Suisse",        domaine: "Santé" },
    { initials: "TM", nom: "Thierry Mbeki",          role: "Expert Gouvernance",         ville: "Bruxelles", pays: "Belgique",     domaine: "Gouvernance" },
    { initials: "MT", nom: "Mariama Touré",          role: "Développeuse Full-Stack",    ville: "Berlin",   pays: "Allemagne",     domaine: "Technologie" },
    { initials: "PE", nom: "Patrick Essomba",        role: "Analyste Financier",         ville: "New York", pays: "États-Unis",    domaine: "Finance" },
    { initials: "GO", nom: "Dr. Grace Okafor",       role: "Experte Cybersécurité",      ville: "Toronto",  pays: "Canada",        domaine: "Technologie" },
  ],
  en: [
    { initials: "AD", nom: "Dr. Amara Diallo",      role: "AI & Data Expert",            ville: "Paris",    pays: "France",        domaine: "Technology" },
    { initials: "FN", nom: "Fatou Ndiaye",           role: "Fintech Consultant",         ville: "London",   pays: "UK",            domaine: "Finance" },
    { initials: "JK", nom: "Jean-Baptiste Koffi",    role: "Solutions Architect",        ville: "Casablanca", pays: "Morocco",     domaine: "Technology" },
    { initials: "AB", nom: "Dr. Aïssatou Bah",       role: "Digital Health Specialist",  ville: "Geneva",   pays: "Switzerland",   domaine: "Health" },
    { initials: "TM", nom: "Thierry Mbeki",          role: "Governance Expert",          ville: "Brussels", pays: "Belgium",       domaine: "Governance" },
    { initials: "MT", nom: "Mariama Touré",          role: "Full-Stack Developer",       ville: "Berlin",   pays: "Germany",       domaine: "Technology" },
    { initials: "PE", nom: "Patrick Essomba",        role: "Financial Analyst",          ville: "New York", pays: "USA",           domaine: "Finance" },
    { initials: "GO", nom: "Dr. Grace Okafor",       role: "Cybersecurity Expert",       ville: "Toronto",  pays: "Canada",        domaine: "Technology" },
  ],
};

const RESEAU_DATA = {
  fr: {
    hero: {
      badge: "Réseau & Diaspora",
      h1: "Réseau & Diaspora",
      subtitle: "La diaspora africaine comme levier stratégique de transformation.",
    },
    editorial: {
      badge: "Un acteur stratégique sous-valorisé",
      h2: "La diaspora africaine, moteur de la transformation",
      para1: "Avec plus de 170 millions d'Africains vivant hors du continent, la diaspora représente un capital humain, financier et intellectuel d'une ampleur sans précédent. Chaque année, près de 95 milliards de dollars transitent depuis la diaspora vers l'Afrique — soit trois fois le montant de l'aide publique au développement.",
      para2: "Au-delà des flux financiers, la diaspora incarne une expertise de pointe forgée dans les meilleurs établissements et entreprises du monde. GIRA a fait le choix stratégique de mobiliser ce réseau pour accélérer la transformation digitale et institutionnelle de l'Afrique.",
      para3: "Notre réseau d'experts diaspora intervient en complémentarité des équipes locales. Apportant des compétences techniques rares, des connexions internationales et une vision du continent ancrée dans la réalité quotidienne.",
    },
    diasporaStats: [
      { value: "170M", label: "Africains de la diaspora dans le monde" },
      { value: "95 Mds $", label: "Transferts annuels vers le continent" },
      { value: "3x", label: "Plus que l'aide publique au développement" },
    ],
    experts: {
      badge: "Experts & Consultants",
      h2: "Notre réseau d'experts",
      domaineOptions: ["Tous", "Technologie", "Finance", "Gouvernance", "Santé"],
      allKey: "Tous",
    },
    join: {
      badge: "Candidature ouverte",
      h2: "Rejoindre le réseau",
      para1: "Vous êtes un expert de la diaspora africaine et souhaitez contribuer à des projets à fort impact sur le continent ? GIRA constitue en permanence un vivier d'experts dans les domaines de la technologie, la finance, la gouvernance, la santé et l'infrastructure.",
      para2: "Intégrer notre réseau, c'est accéder à des missions à haute responsabilité, travailler avec des gouvernements et institutions internationales, et participer concrètement à la transformation de l'Afrique.",
      form: {
        nomLabel: "Nom complet",
        emailLabel: "Adresse email",
        paysLabel: "Pays de résidence",
        domaineLabel: "Domaine d'expertise",
        domainePlaceholder: "Sélectionner un domaine",
        domaineOptions: [
          { value: "Technologie", label: "Technologie & Numérique" },
          { value: "Finance", label: "Finance & Investissement" },
          { value: "Gouvernance", label: "Gouvernance & Institutions" },
          { value: "Santé", label: "Santé & Sciences" },
          { value: "Infrastructure", label: "Infrastructure & Énergie" },
          { value: "Agriculture", label: "Agriculture & Environnement" },
          { value: "Autre", label: "Autre" },
        ],
        messageLabel: "Votre parcours en quelques mots",
        submitLabel: "Rejoindre le réseau",
      },
    },
    cta: {
      h2: "Prêt à contribuer à la transformation de l'Afrique ?",
      para: "Rejoignez un réseau d'experts engagés sur des projets à fort impact institutionnel et sectoriel.",
      btn: "Découvrir nos expertises",
    },
  },
  en: {
    hero: {
      badge: "Network & Diaspora",
      h1: "Network & Diaspora",
      subtitle: "The African diaspora as a strategic lever for transformation.",
    },
    editorial: {
      badge: "An undervalued strategic player",
      h2: "The African diaspora, engine of transformation",
      para1: "With more than 170 million Africans living outside the continent, the diaspora represents human, financial and intellectual capital of unprecedented scale. Each year, nearly $95 billion flows from the diaspora to Africa — three times the amount of official development aid.",
      para2: "Beyond financial flows, the diaspora embodies cutting-edge expertise forged in the world's best institutions and companies. GIRA has made the strategic choice to mobilize this network to accelerate the digital and institutional transformation of Africa.",
      para3: "Our diaspora expert network operates in complementarity with local teams. Bringing rare technical skills, international connections and a vision of the continent rooted in daily reality.",
    },
    diasporaStats: [
      { value: "170M", label: "Africans in the diaspora worldwide" },
      { value: "$95B", label: "Annual transfers to the continent" },
      { value: "3x", label: "More than official development aid" },
    ],
    experts: {
      badge: "Experts & Consultants",
      h2: "Our expert network",
      domaineOptions: ["All", "Technology", "Finance", "Governance", "Health"],
      allKey: "All",
    },
    join: {
      badge: "Open application",
      h2: "Join the network",
      para1: "Are you an expert from the African diaspora who wants to contribute to high-impact projects on the continent? GIRA continuously builds a pool of experts in technology, finance, governance, health and infrastructure.",
      para2: "Joining our network means accessing high-responsibility missions, working with governments and international institutions, and actively participating in the transformation of Africa.",
      form: {
        nomLabel: "Full name",
        emailLabel: "Email address",
        paysLabel: "Country of residence",
        domaineLabel: "Area of expertise",
        domainePlaceholder: "Select a domain",
        domaineOptions: [
          { value: "Technology", label: "Technology & Digital" },
          { value: "Finance", label: "Finance & Investment" },
          { value: "Governance", label: "Governance & Institutions" },
          { value: "Health", label: "Health & Sciences" },
          { value: "Infrastructure", label: "Infrastructure & Energy" },
          { value: "Agriculture", label: "Agriculture & Environment" },
          { value: "Other", label: "Other" },
        ],
        messageLabel: "Your background in a few words",
        submitLabel: "Join the network",
      },
    },
    cta: {
      h2: "Ready to contribute to Africa's transformation?",
      para: "Join a network of committed experts working on high-impact institutional and sectoral projects.",
      btn: "Discover our expertise",
    },
  },
};

/* ─── Page ─── */

export default function ReseauDiasporaPage() {
  const locale = useLocale() as "fr" | "en";
  const t = RESEAU_DATA[locale];
  const experts = EXPERTS_DATA[locale];

  const [filtre, setFiltre] = useState(t.experts.allKey);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    pays: "",
    domaine: "",
    message: "",
  });

  const filtered =
    filtre === t.experts.allKey
      ? experts
      : experts.filter((e) => e.domaine === filtre);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      {/* ══════════════════════════════════════════════
          HERO. Id="overview"
      ══════════════════════════════════════════════ */}
      <section
        id="overview"
        className="relative flex items-end min-h-[50vh] pt-32 pb-16 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 0% 100%, rgba(201,168,76,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 w-full">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
          >
            {t.hero.badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {t.hero.h1}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 h-[2px] w-16 origin-left"
            style={{ backgroundColor: "#C9A84C" }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          RÉSEAU ÉDITORIAL. Id="reseau"
      ══════════════════════════════════════════════ */}
      <section
        id="reseau"
        className="py-20 md:py-32"
        style={{ backgroundColor: "#F5F5F0" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left. Editorial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-xs uppercase tracking-widest mb-3 font-medium"
                style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
              >
                {t.editorial.badge}
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight mb-6"
                style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
              >
                {t.editorial.h2}
              </h2>
              <div className="space-y-4">
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                >
                  {t.editorial.para1}
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                >
                  {t.editorial.para2}
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                >
                  {t.editorial.para3}
                </p>
              </div>
            </motion.div>

            {/* Right. Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-4"
            >
              {t.diasporaStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border-l-4"
                  style={{ borderLeftColor: "#C9A84C" }}
                >
                  <span
                    className="block text-3xl md:text-4xl font-black mb-1"
                    style={{ color: "#C9A84C", fontFamily: "var(--font-montserrat)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          RÉSEAU D'EXPERTS. Id="experts"
      ══════════════════════════════════════════════ */}
      <section
        id="experts"
        className="py-20 md:py-32"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p
              className="text-xs uppercase tracking-widest mb-3 font-medium"
              style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
            >
              {t.experts.badge}
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {t.experts.h2}
            </h2>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {t.experts.domaineOptions.map((d) => {
              const isActive = filtre === d;
              return (
                <button
                  key={d}
                  onClick={() => setFiltre(d)}
                  className="px-5 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundColor: isActive
                      ? "#C9A84C"
                      : "rgba(255,255,255,0.06)",
                    color: isActive ? "#0D0D0D" : "rgba(255,255,255,0.65)",
                    border: isActive
                      ? "1px solid #C9A84C"
                      : "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  {d}
                </button>
              );
            })}
          </div>

          {/* Expert cards grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filtre}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filtered.map((expert, i) => (
                <motion.div
                  key={expert.nom}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: "#1A1A2E",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Initials avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4 font-bold text-sm"
                    style={{
                      backgroundColor: "rgba(201,168,76,0.15)",
                      border: "1px solid #C9A84C",
                      color: "#C9A84C",
                      fontFamily: "var(--font-montserrat)",
                    }}
                  >
                    {expert.initials}
                  </div>

                  {/* Name */}
                  <h3
                    className="font-bold text-white leading-snug mb-1"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {expert.nom}
                  </h3>

                  {/* Role */}
                  <p
                    className="text-sm mb-3"
                    style={{ color: "#9999AA", fontFamily: "var(--font-inter)" }}
                  >
                    {expert.role}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <MapPin
                      size={12}
                      style={{ color: "rgba(201,168,76,0.70)" }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "rgba(201,168,76,0.80)", fontFamily: "var(--font-inter)" }}
                    >
                      {expert.ville}, {expert.pays}
                    </span>
                  </div>

                  {/* Domain badge */}
                  <span
                    className="inline-block px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      backgroundColor: "rgba(201,168,76,0.10)",
                      color: "#C9A84C",
                      border: "1px solid rgba(201,168,76,0.25)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {expert.domaine}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          REJOINDRE LE RÉSEAU. Id="rejoindre"
      ══════════════════════════════════════════════ */}
      <section
        id="rejoindre"
        className="py-20 md:py-32"
        style={{ backgroundColor: "#F5F5F0" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left. Editorial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-xs uppercase tracking-widest mb-3 font-medium"
                style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
              >
                {t.join.badge}
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight mb-6"
                style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
              >
                {t.join.h2}
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
              >
                {t.join.para1}
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
              >
                {t.join.para2}
              </p>
            </motion.div>

            {/* Right. Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 shadow-sm space-y-5"
              >
                {/* Nom */}
                <div>
                  <label
                    htmlFor="nom"
                    className="block text-xs uppercase tracking-wide font-medium mb-2"
                    style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                  >
                    {t.join.form.nomLabel}
                  </label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    required
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                    style={{
                      backgroundColor: "#F5F5F0",
                      border: "1px solid #EBEBEB",
                      color: "#0D0D0D",
                      fontFamily: "var(--font-inter)",
                      fontSize: "16px",
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-wide font-medium mb-2"
                    style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                  >
                    {t.join.form.emailLabel}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                    style={{
                      backgroundColor: "#F5F5F0",
                      border: "1px solid #EBEBEB",
                      color: "#0D0D0D",
                      fontFamily: "var(--font-inter)",
                      fontSize: "16px",
                    }}
                  />
                </div>

                {/* Pays de résidence */}
                <div>
                  <label
                    htmlFor="pays"
                    className="block text-xs uppercase tracking-wide font-medium mb-2"
                    style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                  >
                    {t.join.form.paysLabel}
                  </label>
                  <input
                    id="pays"
                    name="pays"
                    type="text"
                    required
                    value={formData.pays}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200"
                    style={{
                      backgroundColor: "#F5F5F0",
                      border: "1px solid #EBEBEB",
                      color: "#0D0D0D",
                      fontFamily: "var(--font-inter)",
                      fontSize: "16px",
                    }}
                  />
                </div>

                {/* Domaine */}
                <div>
                  <label
                    htmlFor="domaine"
                    className="block text-xs uppercase tracking-wide font-medium mb-2"
                    style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                  >
                    {t.join.form.domaineLabel}
                  </label>
                  <select
                    id="domaine"
                    name="domaine"
                    required
                    value={formData.domaine}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 appearance-none"
                    style={{
                      backgroundColor: "#F5F5F0",
                      border: "1px solid #EBEBEB",
                      color: formData.domaine ? "#0D0D0D" : "#999999",
                      fontFamily: "var(--font-inter)",
                      fontSize: "16px",
                    }}
                  >
                    <option value="">{t.join.form.domainePlaceholder}</option>
                    {t.join.form.domaineOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-wide font-medium mb-2"
                    style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                  >
                    {t.join.form.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 resize-none"
                    style={{
                      backgroundColor: "#F5F5F0",
                      border: "1px solid #EBEBEB",
                      color: "#0D0D0D",
                      fontFamily: "var(--font-inter)",
                      fontSize: "16px",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-xl"
                  style={{
                    backgroundColor: "#C9A84C",
                    color: "#0D0D0D",
                    fontFamily: "var(--font-montserrat)",
                  }}
                >
                  {t.join.form.submitLabel}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{
          background: "linear-gradient(135deg, #1A1A2E 0%, #0D0D0D 60%, #1A1A2E 100%)",
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-2xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {t.cta.h2}
            </h2>
            <p
              className="text-base md:text-lg mb-10 max-w-xl mx-auto"
              style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
            >
              {t.cta.para}
            </p>
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-2xl"
              style={{
                backgroundColor: "#C9A84C",
                color: "#0D0D0D",
                fontFamily: "var(--font-montserrat)",
              }}
            >
              {t.cta.btn}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
