import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Qui sommes-nous | GIRA — Cabinet d'exécution des projets en Afrique",
  description:
    "GIRA transforme les projets stratégiques en réalisations concrètes. Cabinet d'exécution basé à Paris, nous opérons en Afrique avec gouvernements, bailleurs et investisseurs. Partenaire PND RCA 2024-2028.",
  keywords: [
    "cabinet conseil Afrique",
    "exécution projets Centrafrique",
    "GIRA Paris",
    "projets structurants RCA",
    "cabinet développement Afrique",
    "maîtrise d'ouvrage Afrique",
  ],
  openGraph: {
    title: "GIRA — Le cabinet qui exécute, pas qui conseille",
    description:
      "15+ experts. 3 continents. Une obsession : transformer les projets africains en réalisations concrètes.",
    url: "https://www.gira-cf.com/a-propos",
    type: "website",
  },
  alternates: { canonical: "https://www.gira-cf.com/a-propos" },
};

export default function AProposLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
