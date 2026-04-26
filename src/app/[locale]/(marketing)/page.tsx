import type { Metadata } from "next";
import HeroSection from "@/components/sections/home/HeroSection";
import AudienceSection from "@/components/sections/home/AudienceSection";
import PiliersSection from "@/components/sections/home/PiliersSection";
import DomainesSection from "@/components/sections/home/DomainesSection";
import ChiffresSection from "@/components/sections/home/ChiffresSection";
import PNDSection from "@/components/sections/home/PNDSection";
import CTASection from "@/components/sections/home/CTASection";
import GiraDevSection from "@/components/sections/home/GiraDevSection";

export const metadata: Metadata = {
  title: "GIRA — Cabinet d'exécution de projets en Afrique",
  description:
    "GIRA accompagne gouvernements, institutions et investisseurs dans la conception, structuration et exécution de projets à fort impact en Afrique.",
  openGraph: {
    title: "GIRA — Cabinet d'exécution de projets en Afrique",
    description:
      "GIRA accompagne gouvernements, institutions et investisseurs dans la conception, structuration et exécution de projets à fort impact en Afrique.",
    type: "website",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GIRA",
  alternateName: "Cabinet d'exécution des projets structurants",
  url: "https://www.gira-cf.com",
  logo: "https://www.gira-cf.com/logoGIRA.png",
  description:
    "GIRA accompagne gouvernements, institutions et investisseurs dans la conception, structuration et exécution de projets à fort impact en Afrique.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "128, rue de la Boétie",
    addressLocality: "Paris",
    postalCode: "75008",
    addressCountry: "FR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@gira-cf.com",
    contactType: "customer service",
    availableLanguage: ["French", "English"],
  },
  sameAs: ["https://linkedin.com/company/gira"],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HeroSection />
      <AudienceSection />
      <PiliersSection />
      <DomainesSection />
      <GiraDevSection />
      <ChiffresSection />
      <PNDSection />
      <CTASection />
    </>
  );
}
