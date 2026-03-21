import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "GIRA Dev — Technologies & Innovation au service de l'Afrique",
  description:
    "GIRA Dev conçoit les plateformes numériques, systèmes de données et solutions IA qui accélèrent la transformation africaine. Data, e-gouvernement, infrastructure digitale et finance d'impact.",
  keywords: [
    "technologie Afrique",
    "numérique Centrafrique",
    "e-gouvernement Afrique",
    "data intelligence Afrique",
    "startup tech Afrique",
    "IA développement Afrique",
    "infrastructure digitale RCA",
    "fintech Afrique",
  ],
  openGraph: {
    title: "GIRA Dev — La tech africaine qui change les règles du jeu",
    description:
      "Intelligence artificielle, e-gouvernement, infrastructure IoT et finance d'impact. GIRA Dev bâtit les systèmes numériques qui propulsent l'Afrique vers 2030.",
    url: "https://www.gira-cf.com/x",
    type: "website",
  },
  alternates: { canonical: "https://www.gira-cf.com/x" },
};

export default function XLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
