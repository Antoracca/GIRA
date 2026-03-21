import type { Metadata } from "next";
import ServicesPageContent from "@/components/sections/services/ServicesPageContent";

export const metadata: Metadata = {
  title: "Nos Expertises — GIRA",
  description:
    "De la digitalisation institutionnelle à l'intelligence artificielle, GIRA conçoit et déploie les solutions technologiques qui transforment l'Afrique.",
  openGraph: {
    title: "Nos Expertises — GIRA",
    description:
      "De la digitalisation institutionnelle à l'intelligence artificielle, GIRA conçoit et déploie les solutions technologiques qui transforment l'Afrique.",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
