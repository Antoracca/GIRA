"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight, Mail } from "lucide-react";

/* ─── Types ─── */
interface Article {
  slug: string;
  titre: string;
  date: string;
  categorie: "Analyses" | "Publications" | "Evenements";
  extrait: string;
  image: string;
}

/* ─── Data ─── */
const categories = ["Toutes", "Analyses", "Publications", "Evenements"] as const;

const badgeColors: Record<string, { bg: string; text: string }> = {
  Evenements: { bg: "#C9A84C", text: "#0D0D0D" },
  Analyses: { bg: "#1A1A2E", text: "#FFFFFF" },
  Publications: { bg: "#2D6A4F", text: "#FFFFFF" },
};

const articles: Article[] = [
  {
    slug: "tri-casablanca-9-milliards",
    titre:
      "Table Ronde des Investisseurs de Casablanca : 9 milliards USD mobilises",
    date: "2025-09-15",
    categorie: "Evenements",
    extrait:
      "GIRA a co-organise la Table Ronde des Investisseurs du PND RCA a Casablanca, un evenement historique reunissant plus de 500 participants et permettant de mobiliser des engagements financiers sans precedent pour le developpement de la Republique Centrafricaine.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85&auto=format&fit=crop",
  },
  {
    slug: "digitalisation-services-publics-afrique-centrale",
    titre:
      "Digitalisation des services publics en Afrique centrale : etat des lieux 2025",
    date: "2026-03-03",
    categorie: "Analyses",
    extrait:
      "Une analyse detaillee des progres et defis de la dematerialisation administrative dans les pays d'Afrique centrale, avec un focus sur les portails gouvernementaux et les systemes d'identite numerique.",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=85&auto=format&fit=crop",
  },
  {
    slug: "intelligence-artificielle-institutions-africaines",
    titre:
      "L'intelligence artificielle au service des institutions africaines",
    date: "2026-02-20",
    categorie: "Publications",
    extrait:
      "Comment les modeles de langage et l'IA generative peuvent transformer la gouvernance et l'administration publique en Afrique. Cas d'usage concrets et recommandations strategiques.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad979?w=800&q=85&auto=format&fit=crop",
  },
  {
    slug: "starlink-afrique-connectivite-satellitaire",
    titre:
      "Starlink en Afrique : opportunites et defis de la connectivite satellitaire",
    date: "2026-01-10",
    categorie: "Analyses",
    extrait:
      "Points relais communautaires, acces internet abordable en zone rurale. Le potentiel de Starlink pour reduire la fracture numerique et accelerer la transformation digitale du continent.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=85&auto=format&fit=crop",
  },
  {
    slug: "pnd-rca-feuille-de-route-realisations",
    titre:
      "PND RCA 2024-2028 : feuille de route et premieres realisations",
    date: "2025-11-28",
    categorie: "Publications",
    extrait:
      "Bilan des premiers mois d'accompagnement du Plan National de Developpement de la Republique Centrafricaine. Structuration des projets prioritaires, mobilisation des partenaires et premiers resultats tangibles.",
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=85&auto=format&fit=crop",
  },
  {
    slug: "fintech-afrique-ouest-tendances-2025-2030",
    titre:
      "Fintech en Afrique de l'Ouest : tendances et transformations 2025-2030",
    date: "2025-12-05",
    categorie: "Analyses",
    extrait:
      "Les systemes de core banking, le mobile money et les neobanques redessinent le paysage financier ouest-africain. Analyse des dynamiques de marche et des opportunites pour les acteurs institutionnels.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=85&auto=format&fit=crop",
  },
];

function formatDateFr(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/* ─── Animation variants ─── */
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ActualitesPage() {
  const [filtre, setFiltre] = useState<string>("Toutes");

  const filtered =
    filtre === "Toutes"
      ? articles
      : articles.filter((a) => a.categorie === filtre);

  return (
    <>
      {/* ── HERO ── */}
      <section
        id="overview"
        className="relative flex items-end min-h-[40vh] pt-32 pb-16 overflow-hidden"
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
          {/* Breadcrumb */}
          <nav
            aria-label="Fil d'Ariane"
            className="flex items-center gap-1 mb-5"
          >
            <Link
              href="/"
              className="text-xs uppercase tracking-widest transition-colors duration-200"
              style={{
                color: "rgba(201,168,76,0.7)",
                fontFamily: "var(--font-inter)",
              }}
            >
              Accueil
            </Link>
            <ChevronRight
              size={12}
              style={{ color: "rgba(201,168,76,0.5)" }}
            />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
            >
              Actualités
            </span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Actualités & Publications
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
          >
            Analyses, perspectives et publications de l'equipe GIRA.
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

      {/* ── FILTRES + GRILLE ── */}
      <section
        id="articles"
        className="py-20 md:py-32"
        style={{ backgroundColor: "#F5F5F0" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          {/* Filtres */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((c) => {
              const isActive = filtre === c;
              return (
                <button
                  key={c}
                  onClick={() => setFiltre(c)}
                  className="px-5 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg"
                  style={{
                    fontFamily: "var(--font-inter)",
                    backgroundColor: isActive ? "#C9A84C" : "#FFFFFF",
                    color: isActive ? "#0D0D0D" : "#444444",
                    border: isActive
                      ? "1px solid #C9A84C"
                      : "1px solid #E0E0E0",
                  }}
                >
                  {c === "Evenements" ? "Evenements" : c}
                </button>
              );
            })}
          </div>

          {/* Grid */}
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
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group flex flex-col"
                >
                  {/* Image + Badge */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.titre}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Badge */}
                    <span
                      className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md"
                      style={{
                        backgroundColor:
                          badgeColors[article.categorie]?.bg ?? "#1A1A2E",
                        color:
                          badgeColors[article.categorie]?.text ?? "#FFFFFF",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {article.categorie}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <span
                      className="text-xs mb-3 block"
                      style={{
                        color: "#999999",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {formatDateFr(article.date)}
                    </span>

                    <h2
                      className="text-base md:text-lg font-bold leading-snug mb-3 line-clamp-2"
                      style={{
                        color: "#0D0D0D",
                        fontFamily: "var(--font-montserrat)",
                      }}
                    >
                      {article.titre}
                    </h2>

                    <p
                      className="text-sm leading-relaxed mb-5 line-clamp-3 flex-1"
                      style={{
                        color: "#666666",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      {article.extrait}
                    </p>

                    <Link
                      href={`/actualites/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 group/link mt-auto"
                      style={{
                        color: "#C9A84C",
                        fontFamily: "var(--font-inter)",
                      }}
                    >
                      Lire l'article
                      <ArrowRight
                        size={14}
                        className="group-hover/link:translate-x-1 transition-transform duration-200"
                      />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p
                className="text-lg"
                style={{
                  color: "#999999",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Aucun article dans cette categorie pour le moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA NEWSLETTER ── */}
      <section
        className="py-20 md:py-32"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Mail
              size={40}
              className="mx-auto mb-6"
              style={{ color: "#C9A84C" }}
            />
            <h2
              className="text-2xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Recevoir nos publications par email
            </h2>
            <p
              className="text-base md:text-lg mb-10 max-w-xl mx-auto"
              style={{ color: "#999999", fontFamily: "var(--font-inter)" }}
            >
              Analyses sectorielles, publications et actualites de GIRA,
              directement dans votre boite mail.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="votre@email.com"
                required
                className="flex-1 px-5 py-3.5 rounded-lg text-sm outline-none transition-all duration-200"
                style={{
                  backgroundColor: "#1A1A2E",
                  color: "#FFFFFF",
                  border: "1px solid rgba(201,168,76,0.3)",
                  fontFamily: "var(--font-inter)",
                  fontSize: "16px",
                }}
              />
              <button
                type="submit"
                className="px-7 py-3.5 text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-2xl shrink-0"
                style={{
                  backgroundColor: "#C9A84C",
                  color: "#0D0D0D",
                  fontFamily: "var(--font-inter)",
                }}
              >
                S'abonner
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
