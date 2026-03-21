import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { GIRA } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import HeroInterne from "@/components/shared/HeroInterne";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = GIRA.articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article introuvable — GIRA" };
  return {
    title: `${article.titre} — GIRA`,
    description: article.resume,
    openGraph: { images: [article.image] },
  };
}

export function generateStaticParams() {
  return GIRA.articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = GIRA.articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <>
      <HeroInterne
        title={article.titre}
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Actualités", href: "/actualites" },
          { label: article.categorie },
        ]}
      />
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl mx-auto">
            {/* Meta */}
            <div className="flex items-center gap-4 mb-8">
              <span
                className="text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wider"
                style={{ backgroundColor: "rgba(201,168,76,0.1)", color: "#C9A84C", fontFamily: "var(--font-inter)" }}
              >
                {article.categorie}
              </span>
              <span className="text-xs" style={{ color: "#999999", fontFamily: "var(--font-inter)" }}>
                {formatDate(article.date)}
              </span>
            </div>

            {/* Image */}
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.image}
                alt={article.titre}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Body */}
            <div className="prose prose-lg max-w-none">
              {article.corps.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed mb-5"
                  style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Back */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <Link
                href="/actualites"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
              >
                <ArrowLeft size={16} />
                Retour aux actualités
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
