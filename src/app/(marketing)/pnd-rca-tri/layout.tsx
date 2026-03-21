import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "PND RCA 2024-2028 & Table Ronde des Investisseurs | GIRA — Partenaire officiel",
  description:
    "GIRA est partenaire officiel du Plan National de Développement de la République Centrafricaine 2024-2028. Structuration, mobilisation des financements et exécution des projets prioritaires de la TRI de Casablanca.",
  keywords: [
    "PND RCA 2024 2028",
    "Plan National Développement Centrafrique",
    "Table Ronde Investisseurs Casablanca",
    "investissement RCA",
    "financement projets Centrafrique",
    "développement Bangui",
    "GIRA Centrafrique",
  ],
  openGraph: {
    title: "GIRA × PND RCA 2024-2028 — Partenaire officiel de la transformation centrafricaine",
    description:
      "De la Table Ronde de Casablanca aux projets sur le terrain. GIRA structure et exécute les investissements stratégiques du Plan National de Développement de la RCA.",
    url: "https://www.gira-cf.com/pnd-rca-tri",
    type: "website",
  },
  alternates: { canonical: "https://www.gira-cf.com/pnd-rca-tri" },
};

export default function PndRcaTriLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
