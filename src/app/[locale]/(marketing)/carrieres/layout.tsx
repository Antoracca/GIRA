import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Carrières & Recrutement | GIRA — Rejoignez l'équipe qui transforme l'Afrique",
  description:
    "Vous voulez un impact réel en Afrique ? GIRA recrute des consultants, chefs de projet et experts sectoriels. Travaillez sur des projets structurants avec des gouvernements et institutions internationales.",
  keywords: [
    "emploi consultant Afrique",
    "recrutement développement Afrique",
    "carrière projet Afrique",
    "consultant RCA",
    "chef de projet Afrique",
    "emploi Paris Afrique",
    "cabinet conseil emploi",
  ],
  openGraph: {
    title: "Construire l'Afrique de demain, ça vous intéresse ? | GIRA Carrières",
    description:
      "Pas de PowerPoint vides. Des projets réels. Des résultats mesurables. GIRA recrute des talents qui veulent transformer l'Afrique, pas juste en parler.",
    url: "https://www.gira-cf.com/carrieres",
    type: "website",
  },
  alternates: { canonical: "https://www.gira-cf.com/carrieres" },
};

export default function CarrieresLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
