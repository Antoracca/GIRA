import type { Metadata } from "next";
import HeroInterne from "@/components/shared/HeroInterne";

export const metadata: Metadata = {
  title: "Politique de confidentialité — GIRA",
  description: "Politique de confidentialité et de protection des données personnelles du site GIRA.",
};

export default function PolitiqueConfidentialitePage() {
  const sectionClass = "mb-10";
  const h2Class = "text-xl font-bold mb-4";
  const pClass = "text-sm leading-relaxed mb-3";
  const liClass = "text-sm leading-relaxed mb-2 flex items-start gap-2";
  const h2Style = { color: "#0D0D0D", fontFamily: "var(--font-montserrat)" };
  const pStyle = { color: "#444444", fontFamily: "var(--font-inter)" };

  return (
    <>
      <HeroInterne
        title="Politique de confidentialité"
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Confidentialité" }]}
      />
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <p className={pClass} style={{ ...pStyle, marginBottom: "2rem" }}>
            <em>Dernière mise à jour : Mars 2026</em>
          </p>

          <div className={sectionClass}>
            <h2 className={h2Class} style={h2Style}>1. Responsable du traitement</h2>
            <p className={pClass} style={pStyle}>
              GIRA SAS, 128 rue de la Boétie, 75008 Paris — France<br />
              Email : <a href="mailto:contact@gira-cf.com" style={{ color: "#C9A84C" }}>contact@gira-cf.com</a>
            </p>
          </div>

          <div className={sectionClass}>
            <h2 className={h2Class} style={h2Style}>2. Données collectées</h2>
            <p className={pClass} style={pStyle}>
              Dans le cadre de l&apos;utilisation du formulaire de contact, GIRA collecte les données suivantes :
            </p>
            <ul className="list-none space-y-1 mb-3 ml-4">
              {["Nom et prénom", "Adresse email professionnelle", "Organisation et fonction", "Pays de résidence ou d'activité", "Numéro de téléphone (optionnel)", "Contenu du message"].map((item) => (
                <li key={item} className={liClass} style={pStyle}>
                  <span style={{ color: "#C9A84C" }}>—</span> {item}
                </li>
              ))}
            </ul>
            <p className={pClass} style={pStyle}>
              Aucune donnée sensible (données de santé, opinions politiques ou religieuses) n&apos;est collectée.
            </p>
          </div>

          <div className={sectionClass}>
            <h2 className={h2Class} style={h2Style}>3. Finalité du traitement</h2>
            <p className={pClass} style={pStyle}>
              Les données collectées via le formulaire de contact sont utilisées exclusivement pour :
            </p>
            <ul className="list-none space-y-1 mb-3 ml-4">
              {["Répondre aux demandes de contact, de renseignements ou de devis", "Qualifier et traiter les demandes de partenariat ou de collaboration", "Adresser des propositions commerciales dans le cadre de votre demande"].map((item) => (
                <li key={item} className={liClass} style={pStyle}>
                  <span style={{ color: "#C9A84C" }}>—</span> {item}
                </li>
              ))}
            </ul>
            <p className={pClass} style={pStyle}>
              GIRA ne vend pas, ne loue pas et ne commercialise pas vos données personnelles à des tiers.
            </p>
          </div>

          <div className={sectionClass}>
            <h2 className={h2Class} style={h2Style}>4. Durée de conservation</h2>
            <p className={pClass} style={pStyle}>
              Les données sont conservées pendant <strong>3 ans à compter du dernier contact</strong>, puis sont supprimées ou anonymisées.
            </p>
          </div>

          <div className={sectionClass}>
            <h2 className={h2Class} style={h2Style}>5. Vos droits</h2>
            <p className={pClass} style={pStyle}>
              Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et à la loi Informatique et Libertés, vous disposez des droits suivants :
            </p>
            <ul className="list-none space-y-1 mb-3 ml-4">
              {["Droit d'accès à vos données personnelles", "Droit de rectification en cas d'inexactitude", "Droit à l'effacement (droit à l'oubli)", "Droit à la portabilité de vos données", "Droit d'opposition au traitement de vos données", "Droit à la limitation du traitement"].map((item) => (
                <li key={item} className={liClass} style={pStyle}>
                  <span style={{ color: "#C9A84C" }}>—</span> {item}
                </li>
              ))}
            </ul>
            <p className={pClass} style={pStyle}>
              Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@gira-cf.com" style={{ color: "#C9A84C" }}>contact@gira-cf.com</a>
            </p>
            <p className={pClass} style={pStyle}>
              Vous pouvez également introduire une réclamation auprès de la{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: "#C9A84C" }}>CNIL</a>{" "}
              (Commission Nationale de l&apos;Informatique et des Libertés).
            </p>
          </div>

          <div className={sectionClass}>
            <h2 className={h2Class} style={h2Style}>6. Sous-traitants</h2>
            <p className={pClass} style={pStyle}>
              GIRA fait appel aux sous-traitants suivants, soumis à des obligations de confidentialité et de sécurité :
            </p>
            <ul className="list-none space-y-1 mb-3 ml-4">
              <li className={liClass} style={pStyle}><span style={{ color: "#C9A84C" }}>—</span> <strong>Vercel Inc.</strong> : hébergement du site web (USA — conformité via Data Transfer Agreements)</li>
              <li className={liClass} style={pStyle}><span style={{ color: "#C9A84C" }}>—</span> <strong>Resend</strong> : service d&apos;envoi des emails de contact</li>
            </ul>
          </div>

          <div className={sectionClass}>
            <h2 className={h2Class} style={h2Style}>7. Cookies et analytics</h2>
            <p className={pClass} style={pStyle}>
              Le site GIRA utilise <strong>Vercel Analytics</strong> pour mesurer l&apos;audience du site de manière anonyme et agrégée.
            </p>
            <p className={pClass} style={pStyle}>
              <strong>Aucun cookie publicitaire n&apos;est déposé</strong> sur votre appareil. Aucune donnée de navigation n&apos;est vendue ou transmise à des régies publicitaires.
            </p>
            <p className={pClass} style={pStyle}>
              Les analytics ne s&apos;activent qu&apos;après votre consentement explicite via le bandeau de cookies affiché lors de votre première visite.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
