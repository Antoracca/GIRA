import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Actualités & Analyses | GIRA — Développement Afrique, RCA, Investissements",
  description:
    "Suivez l'actualité de GIRA et nos analyses sur le développement africain, les projets structurants, le PND RCA et la Table Ronde des Investisseurs de Casablanca. Expertises terrain.",
  keywords: [
    "actualité développement Afrique",
    "analyse projets Centrafrique",
    "PND RCA actualité",
    "investissement Afrique 2024 2025",
    "infrastructure Afrique nouvelles",
    "financement projets africains",
  ],
  openGraph: {
    title: "Actualités GIRA — L'Afrique qui se construit",
    description:
      "Analyses, publications et actualités sur les projets structurants en Afrique. La vision terrain de GIRA, cabinet d'exécution basé à Paris.",
    url: "https://www.gira-cf.com/actualites",
    type: "website",
  },
  alternates: { canonical: "https://www.gira-cf.com/actualites" },
};

export default function ActualitesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
