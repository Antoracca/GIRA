import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Secteurs d'intervention | GIRA — Eau, Énergie, Santé, Agriculture en Afrique",
  description:
    "GIRA intervient dans 8 secteurs clés de la transformation africaine : Eau, Énergie, Santé, Agriculture, Mines, Construction, Technologies et Transports. Expertise opérationnelle terrain.",
  keywords: [
    "projets eau Afrique",
    "énergie solaire RCA",
    "santé Centrafrique",
    "agriculture Afrique centrale",
    "mines RCA",
    "infrastructure Afrique",
    "secteurs développement Afrique",
  ],
  openGraph: {
    title: "8 secteurs, une seule exigence : l'exécution | GIRA",
    description:
      "Eau, énergie, santé, agriculture, mines, construction, tech, transports. GIRA livre des résultats terrain dans les secteurs qui transforment l'Afrique.",
    url: "https://www.gira-cf.com/secteurs",
    type: "website",
  },
  alternates: { canonical: "https://www.gira-cf.com/secteurs" },
};

export default function SecteursLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
