import type { Metadata } from "next";
import HeroInterne from "@/components/shared/HeroInterne";

export const metadata: Metadata = {
  title: "Mentions légales — GIRA",
  description: "Mentions légales du site officiel de GIRA, cabinet d'exécution des projets structurants.",
};

export default function MentionsLegalesPage() {
  const sectionClass = "mb-10";
  const h2Class = "text-xl font-bold mb-4";
  const pClass = "text-sm leading-relaxed mb-3";
  const h2Style = { color: "#0D0D0D", fontFamily: "var(--font-montserrat)" };
  const pStyle = { color: "#444444", fontFamily: "var(--font-inter)" };

  return (
    <>
      <HeroInterne
        title="Mentions légales"
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Mentions légales" }]}
      />
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className={sectionClass}>
            <h2 className={h2Class} style={h2Style}>1. Éditeur du site</h2>
            <p className={pClass} style={pStyle}>
              Le site <strong>gira-cf.com</strong> est édité par la société <strong>GIRA SAS</strong>, cabinet d&apos;exécution des projets structurants.
            </p>
            <p className={pClass} style={pStyle}>
              <strong>Siège social :</strong> 128, rue de la Boétie, 75008 Paris — France<br />
              <strong>Forme juridique :</strong> SAS (Société par Actions Simplifiée)<br />
              <strong>SIRET :</strong> À compléter par GIRA<br />
              <strong>Capital social :</strong> À compléter par GIRA<br />
              <strong>N° TVA intracommunautaire :</strong> À compléter par GIRA
            </p>
          </div>

          <div className={sectionClass}>
            <h2 className={h2Class} style={h2Style}>2. Directeur de la publication</h2>
            <p className={pClass} style={pStyle}>
              Le directeur de la publication est [Prénom Nom — à compléter par GIRA], en qualité de représentant légal de la société GIRA SAS.
            </p>
          </div>

          <div className={sectionClass}>
            <h2 className={h2Class} style={h2Style}>3. Contact</h2>
            <p className={pClass} style={pStyle}>
              Pour toute question relative au site ou à son contenu :<br />
              <strong>Email :</strong> <a href="mailto:contact@gira-cf.com" style={{ color: "#C9A84C" }}>contact@gira-cf.com</a><br />
              <strong>Adresse :</strong> GIRA — 128, rue de la Boétie, 75008 Paris
            </p>
          </div>

          <div className={sectionClass}>
            <h2 className={h2Class} style={h2Style}>4. Hébergeur</h2>
            <p className={pClass} style={pStyle}>
              Le site est hébergé par :<br />
              <strong>Vercel Inc.</strong><br />
              340 Pine Street Suite 603<br />
              San Francisco, CA 94104 — États-Unis<br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: "#C9A84C" }}>vercel.com</a>
            </p>
          </div>

          <div className={sectionClass}>
            <h2 className={h2Class} style={h2Style}>5. Propriété intellectuelle</h2>
            <p className={pClass} style={pStyle}>
              L&apos;ensemble des contenus figurant sur le site (textes, images, graphismes, logo, icônes, sons, vidéos…) est la propriété exclusive de GIRA SAS ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p className={pClass} style={pStyle}>
              Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, est interdite sans l&apos;autorisation écrite préalable de GIRA SAS.
            </p>
          </div>

          <div className={sectionClass}>
            <h2 className={h2Class} style={h2Style}>6. Droit applicable et juridiction compétente</h2>
            <p className={pClass} style={pStyle}>
              Le présent site et ses mentions légales sont soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.
            </p>
          </div>

          <div className={sectionClass}>
            <h2 className={h2Class} style={h2Style}>7. Responsabilité</h2>
            <p className={pClass} style={pStyle}>
              GIRA SAS s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site. Cependant, GIRA SAS ne peut garantir l&apos;exactitude, la complétude et l&apos;actualité des informations diffusées. En conséquence, GIRA SAS décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
