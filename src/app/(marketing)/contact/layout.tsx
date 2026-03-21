import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Nous contacter | GIRA — Parlez à un expert en projets africains",
  description:
    "Gouvernement, institution, investisseur ou entreprise ? Contactez GIRA pour structurer, financer ou exécuter votre projet en Afrique. Réponse sous 48h. Siège à Paris.",
  keywords: [
    "contact cabinet conseil Afrique",
    "GIRA contact Paris",
    "projet Afrique devis",
    "financement Afrique contact",
    "expert développement Afrique",
    "cabinet Paris Afrique contact",
  ],
  openGraph: {
    title: "Discutons de votre projet en Afrique | GIRA",
    description:
      "Un projet à structurer ? Un financement à mobiliser ? Une exécution à sécuriser ? L'équipe GIRA vous répond. Paris — Marrakech — Bratislava.",
    url: "https://www.gira-cf.com/contact",
    type: "website",
  },
  alternates: { canonical: "https://www.gira-cf.com/contact" },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
