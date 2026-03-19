"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GIRA } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

const categories = ["Toutes", "Actualités", "Analyses", "Publications"];

export default function ActualitesList() {
  const [categorie, setCategorie] = useState("Toutes");

  const articles = categorie === "Toutes"
    ? GIRA.articles
    : GIRA.articles.filter((a) => a.categorie === categorie);

  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: "#F5F5F0" }}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategorie(c)}
              className="px-5 py-2 text-sm font-medium transition-all duration-200 rounded-sm"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: categorie === c ? "#C9A84C" : "white",
                color: categorie === c ? "#0D0D0D" : "#444444",
                border: categorie === c ? "1px solid #C9A84C" : "1px solid #E0E0E0",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm group"
            >
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.titre}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium uppercase tracking-wider"
                    style={{ backgroundColor: "rgba(201,168,76,0.1)", color: "#C9A84C", fontFamily: "var(--font-inter)" }}
                  >
                    {article.categorie}
                  </span>
                  <span className="text-xs" style={{ color: "#999999", fontFamily: "var(--font-inter)" }}>
                    {formatDate(article.date)}
                  </span>
                </div>
                <h2
                  className="text-base font-bold leading-snug mb-3 line-clamp-2"
                  style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
                >
                  {article.titre}
                </h2>
                <p
                  className="text-sm leading-relaxed mb-5 line-clamp-3"
                  style={{ color: "#666666", fontFamily: "var(--font-inter)" }}
                >
                  {article.resume}
                </p>
                <Link
                  href={`/actualites/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 group/link"
                  style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
                >
                  Lire l&apos;article
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
