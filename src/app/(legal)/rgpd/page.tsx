import type { Metadata } from "next";
import Link from "next/link";
import HeroInterne from "@/components/shared/HeroInterne";

export const metadata: Metadata = {
  title: "Vos droits RGPD — GIRA | Protection & exercice de vos droits",
  description:
    "Tout ce que vous devez savoir sur vos droits RGPD chez GIRA SAS. Accès, rectification, effacement, portabilité, opposition : exercez vos droits simplement et rapidement.",
  alternates: { canonical: "https://www.gira-cf.com/rgpd" },
};

const G = "#C9A84C";
const DARK = "#0D0D0D";
const BODY = "#4A4A4A";
const FM = "var(--font-montserrat)";
const FI = "var(--font-inter)";

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-[1.85] mb-4" style={{ fontFamily: FI, color: BODY }}>{children}</p>;
}

function Hr() {
  return <div className="my-10" style={{ height: "1px", background: "rgba(0,0,0,0.07)" }} />;
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 my-5" style={{ background: "rgba(201,168,76,0.07)", borderLeft: `3px solid ${G}` }}>
      <p className="text-sm leading-relaxed" style={{ fontFamily: FI, color: BODY }}>{children}</p>
    </div>
  );
}

export default function RGPDPage() {
  return (
    <>
      <HeroInterne
        title="Vos droits RGPD"
        subtitle="Le Règlement Général sur la Protection des Données vous confère des droits forts sur vos données personnelles. GIRA SAS s'engage à les respecter pleinement et à faciliter leur exercice."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "RGPD" }]}
      />

      {/* Bandeau réglementaire */}
      <div style={{ backgroundColor: DARK }}>
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-5">
          <div className="flex flex-wrap gap-3">
            {[
              "Règlement UE 2016/679",
              "Loi Informatique et Libertés modifiée",
              "Délibérations CNIL applicables",
              "Lignes directrices EDPB",
            ].map((tag) => (
              <span key={tag} className="text-[10px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider"
                style={{ backgroundColor: "rgba(201,168,76,0.12)", color: G, fontFamily: FM, border: `1px solid rgba(201,168,76,0.2)` }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="py-20 md:py-28" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-4xl mx-auto px-6 md:px-12">

          {/* Intro */}
          <div className="mb-14">
            <h2 className="font-black mb-5" style={{ fontFamily: FM, fontSize: "1.6rem", color: DARK, lineHeight: 1.2 }}>
              Qu'est-ce que le RGPD ?
            </h2>
            <P>
              Le <strong style={{ color: DARK }}>Règlement Général sur la Protection des Données</strong> (RGPD, ou GDPR
              en anglais — Règlement UE 2016/679) est le texte de référence européen en matière de protection des
              données personnelles. Entré en application le <strong style={{ color: DARK }}>25 mai 2018</strong> dans
              l'ensemble des pays membres de l'Union Européenne, il s'applique à toute organisation — quelle que soit
              sa localisation — dès lors qu'elle traite des données concernant des résidents européens.
            </P>
            <P>
              Le RGPD repose sur un ensemble de principes fondamentaux : licéité, loyauté et transparence du
              traitement ; limitation des finalités ; minimisation des données ; exactitude ; limitation de la
              conservation ; intégrité et confidentialité ; et responsabilité (accountability).
            </P>
            <Note>
              GIRA SAS, en tant que cabinet opérant depuis Paris (France), est soumis au RGPD et à la loi Informatique
              et Libertés n° 78-17 du 6 janvier 1978 modifiée. L'autorité de contrôle compétente est la{" "}
              <strong>CNIL (Commission Nationale de l'Informatique et des Libertés)</strong>.
            </Note>
          </div>

          <Hr />

          {/* Les 8 droits */}
          <div className="mb-14">
            <h2 className="font-black mb-3" style={{ fontFamily: FM, fontSize: "1.6rem", color: DARK, lineHeight: 1.2 }}>
              Vos 8 droits fondamentaux
            </h2>
            <P>
              Le RGPD vous reconnaît <strong style={{ color: DARK }}>8 droits opposables</strong> à toute organisation
              traitant vos données personnelles. Voici comment les exercer chez GIRA SAS :
            </P>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
              {[
                {
                  num: "01",
                  droit: "Droit d'accès",
                  ref: "Art. 15 RGPD",
                  desc: "Vous avez le droit d'obtenir confirmation que GIRA SAS traite ou non des données vous concernant et, si tel est le cas, d'en recevoir une copie. Vous pouvez également obtenir des informations sur les finalités, les catégories de données traitées, les destinataires, la durée de conservation et l'origine des données.",
                  delai: "30 jours",
                  format: "Email avec fichier récapitulatif",
                },
                {
                  num: "02",
                  droit: "Droit de rectification",
                  ref: "Art. 16 RGPD",
                  desc: "Si des données vous concernant sont inexactes, incomplètes ou obsolètes, vous pouvez demander leur correction ou leur mise à jour sans délai. Ce droit s'applique notamment à vos coordonnées, fonction, organisation ou pays.",
                  delai: "30 jours",
                  format: "Confirmation écrite de rectification",
                },
                {
                  num: "03",
                  droit: "Droit à l'effacement",
                  ref: "Art. 17 RGPD",
                  desc: "Vous pouvez demander la suppression définitive de vos données dans les cas suivants : les données ne sont plus nécessaires à la finalité initiale ; vous retirez votre consentement ; vous vous opposez au traitement ; les données ont été traitées illicitement. Ce droit est limité par certaines obligations légales de conservation.",
                  delai: "30 jours",
                  format: "Confirmation de suppression",
                },
                {
                  num: "04",
                  droit: "Droit à la limitation du traitement",
                  ref: "Art. 18 RGPD",
                  desc: "Vous pouvez demander que le traitement de vos données soit suspendu (sans effacement) dans des cas précis : contestation de l'exactitude des données, traitement illicite, données nécessaires pour la constatation de droits en justice, ou opposition en cours d'examen.",
                  delai: "30 jours",
                  format: "Notification de mise en attente",
                },
                {
                  num: "05",
                  droit: "Droit à la portabilité",
                  ref: "Art. 20 RGPD",
                  desc: "Pour les données que vous avez fournies et qui font l'objet d'un traitement automatisé fondé sur votre consentement ou un contrat, vous pouvez recevoir ces données dans un format structuré, couramment utilisé et lisible par machine (JSON, CSV), et les transmettre à un autre responsable de traitement.",
                  delai: "30 jours",
                  format: "Fichier JSON / CSV exportable",
                },
                {
                  num: "06",
                  droit: "Droit d'opposition",
                  ref: "Art. 21 RGPD",
                  desc: "Vous pouvez vous opposer à tout moment au traitement de vos données fondé sur l'intérêt légitime de GIRA SAS, pour des raisons tenant à votre situation particulière. En matière de prospection commerciale, le droit d'opposition est absolu et sans justification requise.",
                  delai: "Immédiat pour la prospection",
                  format: "Confirmation d'arrêt du traitement",
                },
                {
                  num: "07",
                  droit: "Droit de retrait du consentement",
                  ref: "Art. 7 RGPD",
                  desc: "Lorsque le traitement est fondé sur votre consentement, vous pouvez le retirer à tout moment. Le retrait du consentement n'affecte pas la licéité des traitements effectués avant ce retrait. Il doit être aussi simple à exercer que de donner son consentement.",
                  delai: "Immédiat",
                  format: "Confirmation par email",
                },
                {
                  num: "08",
                  droit: "Droit de ne pas faire l'objet d'une décision automatisée",
                  ref: "Art. 22 RGPD",
                  desc: "Vous avez le droit de ne pas faire l'objet d'une décision fondée exclusivement sur un traitement automatisé (y compris le profilage) produisant des effets juridiques significatifs vous concernant. GIRA SAS n'a pas recours à ce type de traitement.",
                  delai: "N/A",
                  format: "Confirmation de non-recours",
                },
              ].map((item) => (
                <div key={item.num}
                  className="bg-white rounded-2xl p-6 shadow-sm flex flex-col"
                  style={{ borderTop: `3px solid ${G}` }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span style={{ fontFamily: FM, fontWeight: 900, fontSize: "1.8rem", color: G, opacity: 0.2, lineHeight: 1 }}>{item.num}</span>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ backgroundColor: "rgba(201,168,76,0.1)", color: G, fontFamily: FM }}>
                      {item.ref}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm mb-3" style={{ fontFamily: FM, color: DARK }}>{item.droit}</h3>
                  <p className="text-xs leading-relaxed mb-4 flex-1" style={{ fontFamily: FI, color: BODY }}>{item.desc}</p>
                  <div className="pt-3 flex flex-col gap-1" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    <p className="text-[10px]" style={{ fontFamily: FI, color: "#999" }}>
                      <strong style={{ color: G }}>Délai de réponse :</strong> {item.delai}
                    </p>
                    <p className="text-[10px]" style={{ fontFamily: FI, color: "#999" }}>
                      <strong style={{ color: G }}>Format :</strong> {item.format}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Hr />

          {/* Comment exercer */}
          <div className="mb-14">
            <h2 className="font-black mb-5" style={{ fontFamily: FM, fontSize: "1.6rem", color: DARK }}>
              Comment exercer vos droits ?
            </h2>
            <P>
              Pour exercer l'un de vos droits, envoyez une demande écrite à l'équipe GIRA SAS. Pour faciliter
              le traitement, précisez dans votre email :
            </P>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              {[
                { step: "1", titre: "Identifiez-vous", desc: "Indiquez votre nom, prénom et l'adresse email utilisée lors de votre contact avec GIRA." },
                { step: "2", titre: "Précisez votre droit", desc: "Mentionnez clairement quel droit vous souhaitez exercer (accès, rectification, effacement…)." },
                { step: "3", titre: "Envoyez votre demande", desc: "Adressez votre email à contact@gira-cf.com. Un justificatif d'identité peut être demandé." },
              ].map((s) => (
                <div key={s.step} className="rounded-2xl bg-white shadow-sm p-6 text-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-black"
                    style={{ backgroundColor: G, color: DARK, fontFamily: FM }}>
                    {s.step}
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ fontFamily: FM, color: DARK }}>{s.titre}</h3>
                  <p className="text-xs leading-relaxed" style={{ fontFamily: FI, color: BODY }}>{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: DARK }}>
              <p className="text-[10px] uppercase tracking-widest mb-3" style={{ fontFamily: FM, color: "rgba(255,255,255,0.3)" }}>
                Exercer vos droits
              </p>
              <p className="font-bold text-white text-xl mb-2" style={{ fontFamily: FM }}>contact@gira-cf.com</p>
              <p className="text-sm mb-5" style={{ fontFamily: FI, color: "rgba(255,255,255,0.4)" }}>
                Objet de l'email : <em>"Exercice de droit RGPD — [Nom du droit]"</em>
              </p>
              <a href="mailto:contact@gira-cf.com?subject=Exercice%20de%20droit%20RGPD"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold"
                style={{ backgroundColor: G, color: DARK, fontFamily: FM }}>
                Envoyer ma demande →
              </a>
            </div>

            <Note>
              <strong>Délai légal de réponse :</strong> GIRA SAS s'engage à répondre à toute demande d'exercice de
              droits dans un délai maximum de <strong>30 jours</strong> à compter de la réception de la demande.
              Ce délai peut être prolongé de 2 mois supplémentaires en cas de demandes nombreuses ou complexes,
              avec notification préalable. Conformément à l'article 12 du RGPD.
            </Note>
          </div>

          <Hr />

          {/* Délais tableau */}
          <div className="mb-14">
            <h2 className="font-black mb-5" style={{ fontFamily: FM, fontSize: "1.6rem", color: DARK }}>
              Délais de réponse garantis
            </h2>
            <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 px-5 py-3" style={{ backgroundColor: DARK }}>
                <span className="text-[10px] uppercase tracking-widest font-bold" style={{ fontFamily: FM, color: "rgba(255,255,255,0.4)" }}>Type de demande</span>
                <span className="text-[10px] uppercase tracking-widest font-bold" style={{ fontFamily: FM, color: "rgba(255,255,255,0.4)" }}>Délai standard</span>
                <span className="text-[10px] uppercase tracking-widest font-bold" style={{ fontFamily: FM, color: "rgba(255,255,255,0.4)" }}>Délai max légal</span>
              </div>
              {[
                ["Accusé de réception", "24h ouvrées", "Immédiat"],
                ["Accès aux données", "15 jours ouvrés", "30 jours"],
                ["Rectification / effacement", "7 jours ouvrés", "30 jours"],
                ["Portabilité des données", "15 jours ouvrés", "30 jours"],
                ["Opposition au traitement", "48h (prospection : immédiat)", "30 jours"],
                ["Demande complexe ou volumineuse", "30 jours avec notification", "90 jours"],
              ].map(([type, std, max], i) => (
                <div key={i} className="grid grid-cols-3 px-5 py-3" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <span className="text-sm" style={{ fontFamily: FI, color: BODY }}>{type}</span>
                  <span className="text-sm font-semibold" style={{ fontFamily: FM, color: G }}>{std}</span>
                  <span className="text-sm" style={{ fontFamily: FI, color: BODY }}>{max}</span>
                </div>
              ))}
            </div>
          </div>

          <Hr />

          {/* Réclamation CNIL */}
          <div className="mb-14">
            <h2 className="font-black mb-5" style={{ fontFamily: FM, fontSize: "1.6rem", color: DARK }}>
              Réclamation auprès de la CNIL
            </h2>
            <P>
              Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés ou que le traitement
              de vos données n'est pas conforme au RGPD, vous avez le droit d'introduire une réclamation (plainte)
              auprès de l'autorité de contrôle compétente. En France, il s'agit de la <strong style={{ color: DARK }}>CNIL</strong>.
            </P>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white shadow-sm p-6">
                <h3 className="font-bold text-sm mb-3" style={{ fontFamily: FM, color: DARK }}>
                  CNIL — France (autorité principale)
                </h3>
                <div className="space-y-1 text-sm" style={{ fontFamily: FI, color: BODY }}>
                  <p>3 Place de Fontenoy — TSA 80715</p>
                  <p>75334 Paris Cedex 07</p>
                  <p>Tél. : +33 (0)1 53 73 22 22</p>
                  <p>Du lundi au jeudi : 9h – 18h30 | Vendredi : 9h – 18h</p>
                  <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer"
                    className="inline-block mt-2 font-semibold" style={{ color: G }}>
                    Déposer une plainte en ligne →
                  </a>
                </div>
              </div>
              <div className="rounded-2xl bg-white shadow-sm p-6">
                <h3 className="font-bold text-sm mb-3" style={{ fontFamily: FM, color: DARK }}>
                  Procédure recommandée
                </h3>
                <ol className="space-y-2">
                  {[
                    "Contactez d'abord GIRA SAS (contact@gira-cf.com)",
                    "Attendez la réponse dans le délai légal (30j)",
                    "En l'absence de réponse satisfaisante, saisissez la CNIL",
                    "La CNIL dispose de 3 mois pour traiter la réclamation",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs" style={{ fontFamily: FI, color: BODY }}>
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5"
                        style={{ backgroundColor: G, color: DARK, fontFamily: FM }}>{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <Hr />

          {/* Définitions */}
          <div className="mb-14">
            <h2 className="font-black mb-5" style={{ fontFamily: FM, fontSize: "1.6rem", color: DARK }}>
              Glossaire RGPD
            </h2>
            <div className="space-y-3">
              {[
                { terme: "Donnée personnelle", def: "Toute information se rapportant à une personne physique identifiée ou identifiable (nom, email, téléphone, adresse IP, cookies…)." },
                { terme: "Traitement", def: "Toute opération appliquée à des données personnelles : collecte, enregistrement, organisation, structuration, stockage, consultation, utilisation, transmission, effacement…" },
                { terme: "Responsable du traitement", def: "La personne ou l'organisme qui détermine les finalités et les moyens du traitement. Ici : GIRA SAS." },
                { terme: "Sous-traitant", def: "L'entité qui traite les données pour le compte du responsable (ex : Vercel pour l'hébergement, Resend pour l'envoi d'emails)." },
                { terme: "Base légale", def: "Le fondement juridique qui autorise le traitement. Les bases légales RGPD sont : consentement, contrat, obligation légale, intérêts vitaux, mission d'intérêt public, intérêts légitimes." },
                { terme: "Profilage", def: "Toute forme de traitement automatisé de données personnelles consistant à évaluer des aspects personnels concernant une personne physique. GIRA SAS n'y a pas recours." },
              ].map((g) => (
                <div key={g.terme} className="bg-white rounded-2xl px-5 py-4 shadow-sm flex flex-col md:flex-row gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider shrink-0 md:w-48" style={{ fontFamily: FM, color: G }}>{g.terme}</span>
                  <span className="text-sm leading-relaxed" style={{ fontFamily: FI, color: BODY }}>{g.def}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Liens croisés */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">
            {[
              { label: "Politique de confidentialité", desc: "Détail complet de nos traitements de données", href: "/politique-confidentialite" },
              { label: "Mentions légales", desc: "Informations sur l'éditeur et l'hébergeur du site", href: "/mentions-legales" },
              { label: "Nous contacter", desc: "Parler directement à un responsable GIRA", href: "/contact" },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                className="rounded-2xl p-5 transition-all hover:shadow-md"
                style={{ backgroundColor: DARK, display: "block" }}>
                <p className="text-sm font-bold mb-1" style={{ fontFamily: FM, color: G }}>{l.label} →</p>
                <p className="text-xs" style={{ fontFamily: FI, color: "rgba(255,255,255,0.35)" }}>{l.desc}</p>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
