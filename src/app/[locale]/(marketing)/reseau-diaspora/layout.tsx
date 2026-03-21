import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Réseau & Diaspora Africaine | GIRA — Experts africains mobilisés pour l'Afrique",
  description:
    "GIRA fédère un réseau d'experts africains de la diaspora engagés pour le développement du continent. Rejoignez un collectif d'élite qui transforme ses compétences en impact réel sur le terrain.",
  keywords: [
    "diaspora africaine",
    "experts africains développement",
    "réseau Africa",
    "talents africains",
    "diaspora RCA",
    "investisseurs diaspora Afrique",
    "compétences africaines",
  ],
  openGraph: {
    title: "La diaspora africaine passe à l'action | Réseau GIRA",
    description:
      "Des experts africains formés aux meilleures institutions mondiales, mobilisés pour transformer leur continent. Rejoignez le réseau GIRA.",
    url: "https://www.gira-cf.com/reseau-diaspora",
    type: "website",
  },
  alternates: { canonical: "https://www.gira-cf.com/reseau-diaspora" },
};

export default function ReseauDiasporaLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
