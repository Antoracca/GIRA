import type { Metadata } from "next";
import Link from "next/link";
import HeroInterne from "@/components/shared/HeroInterne";

export const metadata: Metadata = {
  title: "RGPD — Vos droits | GIRA",
  description: "Informations sur vos droits RGPD et comment les exercer auprès de GIRA.",
};

export default function RGPDPage() {
  const h2Class = "text-xl font-bold mb-4";
  const pClass = "text-sm leading-relaxed mb-3";
  const h2Style = { color: "#0D0D0D", fontFamily: "var(--font-montserrat)" };
  const pStyle = { color: "#444444", fontFamily: "var(--font-inter)" };

  return (
    <>
      <HeroInterne
        title="Vos droits RGPD"
        subtitle="Tout ce que vous devez savoir sur la protection de vos données personnelles chez GIRA."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "RGPD" }]}
      />
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="mb-10">
            <h2 className={h2Class} style={h2Style}>Le RGPD, qu&apos;est-ce que c&apos;est ?</h2>
            <p className={pClass} style={pStyle}>
              Le Règlement Général sur la Protection des Données (RGPD, ou GDPR en anglais) est un règlement de l&apos;Union Européenne entré en vigueur le 25 mai 2018. Il définit les règles applicables à la collecte, au traitement et à la conservation des données personnelles des résidents européens.
            </p>
          </div>

          <div className="mb-10">
            <h2 className={h2Class} style={h2Style}>Vos droits en résumé</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { titre: "Droit d'accès", texte: "Vous pouvez demander à connaître toutes les données que GIRA détient sur vous." },
                { titre: "Droit de rectification", texte: "Vous pouvez corriger des données inexactes ou incomplètes vous concernant." },
                { titre: "Droit à l'effacement", texte: "Vous pouvez demander la suppression de vos données (sous certaines conditions)." },
                { titre: "Droit à la portabilité", texte: "Vous pouvez récupérer vos données dans un format structuré et lisible." },
                { titre: "Droit d'opposition", texte: "Vous pouvez vous opposer au traitement de vos données pour des raisons légitimes." },
                { titre: "Droit à la limitation", texte: "Vous pouvez demander la limitation du traitement dans certains cas précis." },
              ].map((droit) => (
                <div
                  key={droit.titre}
                  className="bg-white rounded-2xl p-5 border-l-4 shadow-sm"
                  style={{ borderLeftColor: "#C9A84C" }}
                >
                  <h3 className="text-sm font-bold mb-2" style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}>{droit.titre}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#666666", fontFamily: "var(--font-inter)" }}>{droit.texte}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h2 className={h2Class} style={h2Style}>Comment exercer vos droits ?</h2>
            <p className={pClass} style={pStyle}>
              Pour exercer l&apos;un de ces droits, envoyez une demande par email à :{" "}
              <a href="mailto:contact@gira-cf.com" style={{ color: "#C9A84C" }}>contact@gira-cf.com</a>
            </p>
            <p className={pClass} style={pStyle}>
              Merci d&apos;indiquer dans votre message :
            </p>
            <ul className="list-none space-y-1 mb-3 ml-4">
              {["Votre identité (nom, prénom)", "Le droit que vous souhaitez exercer", "Les données concernées par votre demande"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm mb-1" style={pStyle}>
                  <span style={{ color: "#C9A84C" }}>—</span> {item}
                </li>
              ))}
            </ul>
            <p className={pClass} style={pStyle}>
              GIRA s&apos;engage à répondre à votre demande dans un délai d&apos;un mois.
            </p>
          </div>

          <div className="mb-10">
            <h2 className={h2Class} style={h2Style}>Réclamation auprès de la CNIL</h2>
            <p className={pClass} style={pStyle}>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la Commission Nationale de l&apos;Informatique et des Libertés (CNIL) :{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: "#C9A84C" }}>www.cnil.fr</a>
            </p>
          </div>

          <div className="p-6 rounded-2xl border" style={{ borderColor: "rgba(201,168,76,0.3)", backgroundColor: "rgba(201,168,76,0.05)" }}>
            <p className="text-sm" style={{ color: "#444444", fontFamily: "var(--font-inter)" }}>
              Pour plus d&apos;informations sur la façon dont GIRA traite vos données, consultez notre{" "}
              <Link href="/politique-confidentialite" style={{ color: "#C9A84C" }}>politique de confidentialité complète</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
