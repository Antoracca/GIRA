"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronRight, ArrowRight, ArrowUpRight, Mail, Clock, Tag } from "lucide-react";

/* ─── Types ─── */
interface Article {
  slug: string;
  titre: string;
  date: string;
  categorie: "Analyses" | "Publications" | "Événements";
  theme: string;
  extrait: string;
  image: string;
  lecture: number; // minutes
  source?: string;
  featured?: boolean;
}

/* ─── Data ─── */
const categories = ["Toutes", "Analyses", "Publications", "Événements"] as const;

const articles: Article[] = [
  {
    slug: "tri-casablanca-9-milliards-pnd-rca",
    titre: "Table Ronde des Investisseurs de Casablanca : 9 milliards USD engagés pour le PND-RCA 2024-2028",
    date: "2025-09-15",
    categorie: "Événements",
    theme: "Financement",
    extrait:
      "Les 14 et 15 septembre 2025 à l'Hôtel Hyatt Regency de Casablanca, la République centrafricaine a organisé sa Table Ronde internationale des investisseurs. Résultat : 9 milliards USD mobilisés — dépassant l'objectif initial de 8 milliards — 18 protocoles d'accord signés et plus de 500 participants. La Banque mondiale a seule annoncé 1,2 milliard de dollars d'engagement. GIRA a joué un rôle central dans la structuration des 40 projets bancables présentés aux décideurs.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85&auto=format&fit=crop",
    lecture: 6,
    source: "GIRA / Pravda RCA",
    featured: true,
  },
  {
    slug: "pnd-rca-543-projets-feuille-de-route",
    titre: "PND RCA 2024-2028 : 543 projets, 12,8 milliards USD et une vision d'émergence",
    date: "2025-11-28",
    categorie: "Publications",
    theme: "Gouvernance",
    extrait:
      "Validé en septembre 2024 sous la présidence de Faustin-Archange Touadera, le Plan National de Développement de la République centrafricaine fixe un cap ambitieux : 2 300 km de routes asphaltées, 3 000 km de fibre optique déployés, et un taux d'électrification porté de 4 % à 38 % d'ici 2028. GIRA détaille les premiers projets structurants mis en chantier.",
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=85&auto=format&fit=crop",
    lecture: 8,
    source: "GIRA / UNDP",
  },
  {
    slug: "bad-acwa-power-5-milliards-energie-eau-afrique",
    titre: "BAD et ACWA Power mobilisent 5 milliards USD pour l'énergie et l'eau en Afrique",
    date: "2026-02-10",
    categorie: "Analyses",
    theme: "Énergie",
    extrait:
      "Un partenariat stratégique entre la Banque africaine de développement et ACWA Power vise à financer des projets d'énergies renouvelables et de dessalement d'eau entre 2025 et 2030. En Afrique subsaharienne, 65 % des habitants n'ont toujours pas accès à l'électricité. Cette enveloppe de 5 milliards représente un signal fort pour les investisseurs privés.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=85&auto=format&fit=crop",
    lecture: 5,
    source: "BAD / Agence Ecofin",
  },
  {
    slug: "mission-300-afd-electrification-afrique-subsaharienne",
    titre: "Mission 300 : l'AFD mobilise 1 milliard d'euros pour électrifier l'Afrique subsaharienne",
    date: "2026-01-20",
    categorie: "Analyses",
    theme: "Énergie",
    extrait:
      "Lancé lors du Sommet africain de l'énergie à Dar es Salaam, le programme Mission 300 — initiative conjointe de la BAD et de la Banque mondiale — vise à fournir l'électricité à 300 millions de personnes d'ici 2030. La France s'est engagée à hauteur de 1 milliard d'euros via le groupe AFD. Quelles opportunités pour les cabinets d'exécution présents sur le terrain ?",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=85&auto=format&fit=crop",
    lecture: 4,
    source: "AFD / Banque mondiale",
  },
  {
    slug: "corridor-bangui-douala-desenclavement-rca",
    titre: "Corridor Bangui-Douala : enjeux et opportunités du désenclavement centrafricain",
    date: "2025-12-10",
    categorie: "Analyses",
    theme: "Infrastructure",
    extrait:
      "La RCA, pays sans façade maritime, dépend du couloir routier vers Douala pour 80 % de ses importations. La réhabilitation de cet axe stratégique figure parmi les 40 projets bancables du PND. GIRA analyse les contraintes logistiques, le montage financier envisagé et le potentiel de transformation économique pour les populations riveraines.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop",
    lecture: 5,
    source: "GIRA",
  },
  {
    slug: "diaspora-africaine-investisseurs-strategiques",
    titre: "La diaspora africaine, nouveau levier de financement des projets structurants",
    date: "2026-03-03",
    categorie: "Publications",
    theme: "Financement",
    extrait:
      "Avec 100 milliards USD de transferts annuels vers l'Afrique — dépassant l'aide publique au développement — la diaspora africaine représente un capital dormant immense. Comment transformer ces flux en investissements productifs ? GIRA présente son approche de mobilisation des compétences et des capitaux diasporiques au service du développement.",
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=85&auto=format&fit=crop",
    lecture: 6,
    source: "GIRA",
  },
  {
    slug: "gouvernance-portefeuilles-projets-bad-afrique-centrale",
    titre: "Gouvernance des projets BAD en Afrique centrale : les leçons du plan 2025-2027",
    date: "2025-11-12",
    categorie: "Publications",
    theme: "Gouvernance",
    extrait:
      "La Banque africaine de développement et la République du Congo ont adopté un Plan d'amélioration du portefeuille 2025-2027. Les défis identifiés — qualité des études techniques, lenteurs de passation de marchés, faiblesse des unités de gestion — éclairent les pratiques que GIRA cherche à corriger dans ses mandats d'exécution.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85&auto=format&fit=crop",
    lecture: 7,
    source: "BAD / GIRA",
  },
  {
    slug: "forum-investir-afrique-2026-paris",
    titre: "Forum Investir en Afrique 2026 : GIRA présente son cadre d'exécution intégrée",
    date: "2026-01-30",
    categorie: "Événements",
    theme: "Financement",
    extrait:
      "Lors du Forum Investir en Afrique organisé à Paris, GIRA a exposé son modèle de cabinet d'exécution comme maillon manquant entre la mobilisation des financements et la livraison des projets. Devant 300 représentants d'institutions et de fonds d'investissement, l'équipe a présenté le cadre d'exécution intégrée appliqué au PND RCA.",
    image:
      "https://images.unsplash.com/photo-1560523160-754a9e25c68f?w=800&q=85&auto=format&fit=crop",
    lecture: 3,
    source: "GIRA",
  },
];

const badgeStyle: Record<string, { bg: string; text: string }> = {
  Événements: { bg: "#C9A84C", text: "#0D0D0D" },
  Analyses:   { bg: "#1A1A2E", text: "#FFFFFF" },
  Publications: { bg: "#2D6A4F", text: "#FFFFFF" },
};

function formatDateFr(dateStr: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

export default function ActualitesPage() {
  const [filtre, setFiltre] = useState<string>("Toutes");

  const featured = articles[0];
  const rest = articles.slice(1);

  const filtered =
    filtre === "Toutes"
      ? rest
      : rest.filter((a) => a.categorie === filtre);

  const featuredVisible = filtre === "Toutes" || filtre === featured.categorie;

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative flex items-end min-h-[44vh] pt-32 pb-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 0% 100%, rgba(201,168,76,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 w-full">
          <nav className="flex items-center gap-1 mb-5" aria-label="Fil d'Ariane">
            <Link href="/" className="text-xs uppercase tracking-widest transition-colors duration-200" style={{ color: "rgba(201,168,76,0.7)", fontFamily: "var(--font-inter)" }}>
              Accueil
            </Link>
            <ChevronRight size={12} style={{ color: "rgba(201,168,76,0.5)" }} />
            <span className="text-xs uppercase tracking-widest" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
              Actualités
            </span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black text-white leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Analyses &<br />
            <span style={{ color: "#C9A84C" }}>Publications</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
          >
            Perspectives stratégiques, analyses sectorielles et retours d&apos;expérience de l&apos;équipe GIRA sur le développement africain.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 h-[2px] w-16 origin-left"
            style={{ backgroundColor: "#C9A84C" }}
          />

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-8 mt-10"
          >
            {[
              { v: "8", l: "Publications" },
              { v: "3", l: "Catégories" },
              { v: "2025–2026", l: "Période" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-black" style={{ color: "#C9A84C", fontFamily: "var(--font-montserrat)" }}>{s.v}</div>
                <div className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTENU ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">

          {/* Filtres */}
          <div className="flex flex-wrap gap-2 mb-14">
            {categories.map((c) => {
              const isActive = filtre === c;
              return (
                <button
                  key={c}
                  onClick={() => setFiltre(c)}
                  className="px-5 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundColor: isActive ? "#0D0D0D" : "#FFFFFF",
                    color: isActive ? "#C9A84C" : "#444444",
                    border: isActive ? "1px solid #0D0D0D" : "1px solid #E0E0E0",
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Article featured — hero card */}
          <AnimatePresence mode="wait">
            {featuredVisible && (
              <motion.div
                key="featured"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-16"
              >
                <Link href={`/actualites/${featured.slug}`} className="group block">
                  <div
                    className="relative rounded-3xl overflow-hidden grid md:grid-cols-2 min-h-[420px] md:min-h-[480px] shadow-2xl"
                    style={{ backgroundColor: "#0D0D0D" }}
                  >
                    {/* Image */}
                    <div className="relative h-64 md:h-auto overflow-hidden order-1 md:order-2">
                      <Image
                        src={featured.image}
                        alt={featured.titre}
                        fill
                        priority
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to left, transparent 40%, rgba(13,13,13,0.6))" }} />
                    </div>

                    {/* Text */}
                    <div className="relative flex flex-col justify-between p-8 md:p-12 order-2 md:order-1">
                      {/* Top badges */}
                      <div className="flex items-center gap-3 flex-wrap mb-6">
                        <span
                          className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md"
                          style={{ backgroundColor: "#C9A84C", color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
                        >
                          À la une
                        </span>
                        <span
                          className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md"
                          style={{ backgroundColor: badgeStyle[featured.categorie].bg, color: badgeStyle[featured.categorie].text, fontFamily: "var(--font-inter)" }}
                        >
                          {featured.categorie}
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-5 group-hover:text-gold-300 transition-colors duration-300"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                      >
                        {featured.titre}
                      </h2>

                      {/* Extrait */}
                      <p
                        className="text-sm md:text-base leading-relaxed mb-8 line-clamp-3"
                        style={{ color: "rgba(232,213,163,0.85)", fontFamily: "var(--font-inter)" }}
                      >
                        {featured.extrait}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between flex-wrap gap-4 mt-auto">
                        <div className="flex items-center gap-4">
                          <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
                            {formatDateFr(featured.date)}
                          </span>
                          <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                            <Clock size={11} />
                            {featured.lecture} min
                          </span>
                          {featured.source && (
                            <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(201,168,76,0.6)", fontFamily: "var(--font-inter)" }}>
                              <Tag size={11} />
                              {featured.source}
                            </span>
                          )}
                        </div>
                        <span
                          className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                          style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
                        >
                          Lire l&apos;analyse
                          <ArrowUpRight size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Séparateur */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] flex-1" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
            <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
              Dernières publications
            </span>
            <div className="h-[1px] flex-1" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
          </div>

          {/* Grille articles */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filtre}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((article, i) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="bg-white rounded-2xl overflow-hidden flex flex-col group"
                  style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.titre}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top, rgba(13,13,13,0.4), transparent)" }} />
                    {/* Category badge */}
                    <span
                      className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md"
                      style={{
                        backgroundColor: badgeStyle[article.categorie].bg,
                        color: badgeStyle[article.categorie].text,
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {article.categorie}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="text-xs" style={{ color: "#999999", fontFamily: "var(--font-inter)" }}>
                        {formatDateFr(article.date)}
                      </span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: "#BBBBBB", fontFamily: "var(--font-inter)" }}>
                        <Clock size={10} />
                        {article.lecture} min
                      </span>
                      <span
                        className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: "rgba(45,106,79,0.08)", color: "#2D6A4F", fontFamily: "var(--font-inter)" }}
                      >
                        {article.theme}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="text-base font-bold leading-snug mb-3 line-clamp-2 group-hover:text-gold-500 transition-colors duration-200"
                      style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
                    >
                      {article.titre}
                    </h2>

                    {/* Extrait */}
                    <p
                      className="text-sm leading-relaxed mb-5 line-clamp-3 flex-1"
                      style={{ color: "#666666", fontFamily: "var(--font-inter)" }}
                    >
                      {article.extrait}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t mt-auto" style={{ borderColor: "#F0F0F0" }}>
                      {article.source && (
                        <span className="text-xs" style={{ color: "#AAAAAA", fontFamily: "var(--font-inter)" }}>
                          Source : {article.source}
                        </span>
                      )}
                      <Link
                        href={`/actualites/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold ml-auto transition-all duration-200 group/link"
                        style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
                      >
                        Lire
                        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg" style={{ color: "#999999", fontFamily: "var(--font-inter)" }}>
                Aucun article dans cette catégorie pour le moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA NEWSLETTER ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#0D0D0D" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs uppercase tracking-widest font-medium block mb-4" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                Newsletter GIRA
              </span>
              <h2
                className="text-2xl md:text-4xl font-bold text-white leading-tight mb-4"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Recevoir nos analyses<br />
                <span style={{ color: "#C9A84C" }}>directement par email</span>
              </h2>
              <p className="text-sm md:text-base" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
                Analyses sectorielles, publications et actualités sur le financement et l&apos;exécution des projets en Afrique — sans publicité.
              </p>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-3"
              >
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Votre prénom"
                    className="flex-1 px-5 py-4 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ backgroundColor: "#1A1A2E", color: "#FFFFFF", border: "1px solid rgba(201,168,76,0.2)", fontFamily: "var(--font-inter)", fontSize: "16px" }}
                  />
                  <input
                    type="text"
                    placeholder="Organisation"
                    className="flex-1 px-5 py-4 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ backgroundColor: "#1A1A2E", color: "#FFFFFF", border: "1px solid rgba(201,168,76,0.2)", fontFamily: "var(--font-inter)", fontSize: "16px" }}
                  />
                </div>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  required
                  className="w-full px-5 py-4 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ backgroundColor: "#1A1A2E", color: "#FFFFFF", border: "1px solid rgba(201,168,76,0.3)", fontFamily: "var(--font-inter)", fontSize: "16px" }}
                />
                <button
                  type="submit"
                  className="w-full px-7 py-4 text-sm font-bold rounded-xl transition-all duration-200 hover:shadow-2xl flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#C9A84C", color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
                >
                  <Mail size={16} />
                  Rejoindre les 400+ abonnés
                </button>
                <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-inter)" }}>
                  Pas de spam. Désinscription en un clic.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
