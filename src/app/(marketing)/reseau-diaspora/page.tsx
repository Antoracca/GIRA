"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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

/* ─── Data ─── */
const experts: Expert[] = [
  {
    initials: "AD",
    nom: "Dr. Amara Diallo",
    role: "Expert IA & Data",
    ville: "Paris",
    pays: "France",
    domaine: "Technologie",
  },
  {
    initials: "FN",
    nom: "Fatou Ndiaye",
    role: "Consultante Fintech",
    ville: "Londres",
    pays: "Royaume-Uni",
    domaine: "Finance",
  },
  {
    initials: "JK",
    nom: "Jean-Baptiste Koffi",
    role: "Architecte Solutions",
    ville: "Casablanca",
    pays: "Maroc",
    domaine: "Technologie",
  },
  {
    initials: "AB",
    nom: "Dr. Aïssatou Bah",
    role: "Spécialiste Santé Digitale",
    ville: "Genève",
    pays: "Suisse",
    domaine: "Santé",
  },
  {
    initials: "TM",
    nom: "Thierry Mbeki",
    role: "Expert Gouvernance",
    ville: "Bruxelles",
    pays: "Belgique",
    domaine: "Gouvernance",
  },
  {
    initials: "MT",
    nom: "Mariama Touré",
    role: "Développeuse Full-Stack",
    ville: "Berlin",
    pays: "Allemagne",
    domaine: "Technologie",
  },
  {
    initials: "PE",
    nom: "Patrick Essomba",
    role: "Analyste Financier",
    ville: "New York",
    pays: "États-Unis",
    domaine: "Finance",
  },
  {
    initials: "GO",
    nom: "Dr. Grace Okafor",
    role: "Experte Cybersécurité",
    ville: "Toronto",
    pays: "Canada",
    domaine: "Technologie",
  },
];

const domaineOptions = ["Tous", "Technologie", "Finance", "Gouvernance", "Santé"];

const diasporaStats = [
  { value: "170M", label: "Africains de la diaspora dans le monde" },
  { value: "95 Mds $", label: "Transferts annuels vers le continent" },
  { value: "3x", label: "Plus que l'aide publique au développement" },
];

/* ─── Page ─── */

export default function ReseauDiasporaPage() {
  const [filtre, setFiltre] = useState("Tous");
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    pays: "",
    domaine: "",
    message: "",
  });

  const filtered =
    filtre === "Tous" ? experts : experts.filter((e) => e.domaine === filtre);

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
            Réseau & Diaspora
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Réseau & Diaspora
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
          >
            La diaspora africaine comme levier stratégique de transformation.
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
                Un acteur stratégique sous-valorisé
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight mb-6"
                style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
              >
                La diaspora africaine, moteur de la transformation
              </h2>
              <div className="space-y-4">
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                >
                  Avec plus de 170 millions d'Africains vivant hors du continent,
                  la diaspora représente un capital humain, financier et intellectuel
                  d'une ampleur sans précédent. Chaque année, près de 95 milliards
                  de dollars transitent depuis la diaspora vers l'Afrique —
                  soit trois fois le montant de l'aide publique au développement.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                >
                  Au-delà des flux financiers, la diaspora incarne une expertise
                  de pointe forgée dans les meilleurs établissements et entreprises
                  du monde. GIRA a fait le choix stratégique de mobiliser ce réseau
                  pour accélérer la transformation digitale et institutionnelle de
                  l'Afrique.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                >
                  Notre réseau d'experts diaspora intervient en complémentarité
                  des équipes locales. Apportant des compétences techniques rares,
                  des connexions internationales et une vision du continent ancrée
                  dans la réalité quotidienne.
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
              {diasporaStats.map((stat, i) => (
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
              Experts & Consultants
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Notre réseau d'experts
            </h2>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {domaineOptions.map((d) => {
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
                Candidature ouverte
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight mb-6"
                style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
              >
                Rejoindre le réseau
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
              >
                Vous êtes un expert de la diaspora africaine et souhaitez
                contribuer à des projets à fort impact sur le continent ?
                GIRA constitue en permanence un vivier d'experts dans
                les domaines de la technologie, la finance, la gouvernance,
                la santé et l'infrastructure.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
              >
                Intégrer notre réseau, c'est accéder à des missions à haute
                responsabilité, travailler avec des gouvernements et institutions
                internationales, et participer concrètement à la transformation
                de l'Afrique.
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
                    Nom complet
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
                    Adresse email
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
                    Pays de résidence
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
                    Domaine d'expertise
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
                    <option value="">Sélectionner un domaine</option>
                    <option value="Technologie">Technologie & Numérique</option>
                    <option value="Finance">Finance & Investissement</option>
                    <option value="Gouvernance">Gouvernance & Institutions</option>
                    <option value="Santé">Santé & Sciences</option>
                    <option value="Infrastructure">Infrastructure & Énergie</option>
                    <option value="Agriculture">Agriculture & Environnement</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-wide font-medium mb-2"
                    style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                  >
                    Votre parcours en quelques mots
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
                  Rejoindre le réseau
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
              Prêt à contribuer à la transformation de l'Afrique ?
            </h2>
            <p
              className="text-base md:text-lg mb-10 max-w-xl mx-auto"
              style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
            >
              Rejoignez un réseau d'experts engagés sur des projets à fort
              impact institutionnel et sectoriel.
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
              Découvrir nos expertises
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
