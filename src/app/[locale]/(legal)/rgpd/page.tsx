import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vos droits RGPD — GIRA",
  description:
    "Exercez vos droits en matière de protection des données personnelles auprès de GIRA SAS. Accès, rectification, effacement, portabilité, opposition — tout savoir sur vos droits RGPD.",
  alternates: { canonical: "https://www.gira-cf.com/rgpd" },
};

/* ──────────────────────────── shared primitives ──────────────────────────── */

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-16 md:mb-20">{children}</section>;
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-montserrat text-[1.75rem] md:text-[2.1rem] font-light tracking-tight text-[#1A1A1A] mb-6 leading-[1.2]">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-montserrat text-lg md:text-xl font-semibold text-[#1A1A1A] mb-4 mt-10 first:mt-0">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-inter text-[15px] md:text-base leading-[1.9] text-[#444] mb-5">
      {children}
    </p>
  );
}

function Divider() {
  return <hr className="border-t border-[#E5E5E5] my-14 md:my-20" />;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="font-inter text-[15px] leading-[1.9] text-[#444] mb-5 list-disc pl-6 space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-8 py-4 border-b border-[#EBEBEB] last:border-b-0">
      <span className="font-inter text-sm font-semibold text-[#1A1A1A] sm:min-w-[220px] shrink-0 mb-1 sm:mb-0">
        {label}
      </span>
      <span className="font-inter text-[15px] text-[#555]">{value}</span>
    </div>
  );
}

/* ──────────────────────────── page ──────────────────────────── */

export default function RGPDPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-white pt-36 md:pt-44 pb-16 md:pb-20 border-b border-[#EBEBEB]">
        <div className="max-w-[820px] mx-auto px-6 md:px-8">
          <h1 className="font-montserrat text-[2.5rem] md:text-[3.5rem] font-light tracking-tight text-[#1A1A1A] leading-[1.1] mb-6">
            Vos droits RGPD
          </h1>
          <p className="font-inter text-base md:text-lg text-[#777] leading-relaxed max-w-[620px]">
            Le Règlement Général sur la Protection des Données vous confère des
            droits étendus sur vos données personnelles. GIRA SAS s'engage à
            les respecter pleinement et à en faciliter l'exercice.
          </p>
          <p className="font-inter text-sm text-[#999] mt-6">
            Dernière mise à jour : mars 2026 · Règlement (UE) 2016/679
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-[820px] mx-auto px-6 md:px-8">

          {/* Qu'est-ce que le RGPD */}
          <Section>
            <H2>Qu'est-ce que le RGPD ?</H2>
            <P>
              Le Règlement Général sur la Protection des Données (RGPD, ou GDPR
              en anglais — Règlement UE 2016/679) est le cadre juridique
              européen de référence en matière de protection des données
              personnelles. Adopté le 27 avril 2016 par le Parlement européen et
              le Conseil de l'Union Européenne, il est entré en application le
              25 mai 2018 dans l'ensemble des États membres.
            </P>
            <P>
              Le RGPD s'applique à toute organisation — publique ou privée, quel
              que soit son lieu d'établissement — dès lors qu'elle collecte,
              stocke, utilise ou transmet des données personnelles de résidents
              de l'Union Européenne. Il a pour objectif de renforcer et d'unifier
              la protection des données pour toutes les personnes physiques au
              sein de l'UE et de l'Espace Économique Européen.
            </P>
            <P>
              Le RGPD repose sur un ensemble de principes fondamentaux que tout
              responsable de traitement doit respecter :
            </P>
            <BulletList items={[
              "Licéité, loyauté et transparence du traitement",
              "Limitation des finalités — les données ne peuvent être collectées que pour des finalités déterminées, explicites et légitimes",
              "Minimisation des données — seules les données adéquates, pertinentes et strictement nécessaires sont collectées",
              "Exactitude — les données doivent être tenues à jour et corrigées sans délai",
              "Limitation de la conservation — les données ne sont conservées que le temps nécessaire à la réalisation des finalités",
              "Intégrité et confidentialité — les données doivent être protégées contre tout accès non autorisé, toute perte ou toute destruction",
              "Responsabilité (accountability) — le responsable du traitement doit être en mesure de démontrer sa conformité au RGPD",
            ]} />
            <P>
              GIRA SAS, en tant que société de droit français basée à Paris, est
              soumise au RGPD ainsi qu'à la loi n°&nbsp;78-17 du 6 janvier 1978
              relative à l'informatique, aux fichiers et aux libertés, dans sa
              version modifiée. L'autorité de contrôle compétente est la CNIL
              (Commission Nationale de l'Informatique et des Libertés).
            </P>
          </Section>

          <Divider />

          {/* Vos droits fondamentaux */}
          <Section>
            <H2>Vos droits fondamentaux</H2>
            <P>
              Le RGPD vous reconnaît un ensemble de droits opposables à toute
              organisation traitant vos données personnelles. Voici le détail de
              chacun de ces droits et les modalités de leur exercice auprès de
              GIRA SAS.
            </P>

            <H3>Droit d'accès (article 15 du RGPD)</H3>
            <P>
              Vous avez le droit d'obtenir de GIRA SAS la confirmation que des
              données à caractère personnel vous concernant sont ou ne sont pas
              traitées. Lorsque c'est le cas, vous avez le droit d'accéder à ces
              données et d'obtenir les informations suivantes : les finalités du
              traitement, les catégories de données traitées, les destinataires
              ou catégories de destinataires, la durée de conservation envisagée,
              l'existence de vos droits, le droit d'introduire une réclamation
              auprès de la CNIL, et l'origine des données lorsqu'elles n'ont pas
              été collectées directement auprès de vous.
            </P>
            <P>
              GIRA SAS fournira une copie gratuite des données personnelles
              faisant l'objet du traitement. Pour toute copie supplémentaire, un
              montant raisonnable fondé sur les coûts administratifs pourra être
              demandé.
            </P>

            <H3>Droit de rectification (article 16 du RGPD)</H3>
            <P>
              Vous avez le droit d'obtenir dans les meilleurs délais la
              rectification des données à caractère personnel vous concernant
              qui seraient inexactes. Vous avez également le droit d'obtenir que
              des données incomplètes soient complétées, y compris en
              fournissant une déclaration complémentaire. Ce droit s'applique
              notamment à vos coordonnées professionnelles, votre fonction,
              votre organisation ou votre pays d'activité.
            </P>

            <H3>Droit à l'effacement (article 17 du RGPD)</H3>
            <P>
              Vous avez le droit d'obtenir l'effacement de vos données
              personnelles dans les meilleurs délais, dans les cas suivants :
            </P>
            <BulletList items={[
              "Les données ne sont plus nécessaires au regard des finalités pour lesquelles elles ont été collectées ou traitées",
              "Vous retirez le consentement sur lequel le traitement est fondé et il n'existe pas d'autre fondement juridique au traitement",
              "Vous exercez votre droit d'opposition et il n'existe pas de motif légitime impérieux pour le traitement",
              "Les données ont fait l'objet d'un traitement illicite",
              "Les données doivent être effacées pour respecter une obligation légale",
            ]} />
            <P>
              Ce droit est toutefois limité lorsque le traitement est nécessaire
              à l'exercice du droit à la liberté d'expression et d'information,
              au respect d'une obligation légale, à l'exécution d'une mission
              d'intérêt public, ou à la constatation, l'exercice ou la défense
              de droits en justice.
            </P>

            <H3>Droit à la limitation du traitement (article 18 du RGPD)</H3>
            <P>
              Vous avez le droit d'obtenir la limitation du traitement de vos
              données personnelles — c'est-à-dire la suspension temporaire de
              leur utilisation, sans effacement — dans les situations suivantes :
            </P>
            <BulletList items={[
              "Vous contestez l'exactitude des données, pendant une durée permettant à GIRA SAS de vérifier cette exactitude",
              "Le traitement est illicite et vous vous opposez à l'effacement des données, demandant à la place la limitation de leur utilisation",
              "GIRA SAS n'a plus besoin des données aux fins du traitement, mais celles-ci vous sont encore nécessaires pour la constatation, l'exercice ou la défense de droits en justice",
              "Vous avez exercé votre droit d'opposition, pendant la vérification de la question de savoir si les motifs légitimes poursuivis par GIRA SAS prévalent sur les vôtres",
            ]} />

            <H3>Droit à la portabilité des données (article 20 du RGPD)</H3>
            <P>
              Pour les données que vous avez fournies à GIRA SAS et qui font
              l'objet d'un traitement automatisé fondé sur votre consentement ou
              sur l'exécution d'un contrat, vous avez le droit de recevoir ces
              données dans un format structuré, couramment utilisé et lisible par
              machine (par exemple JSON ou CSV). Vous avez également le droit de
              transmettre ces données à un autre responsable de traitement sans
              que GIRA SAS y fasse obstacle.
            </P>

            <H3>Droit d'opposition (article 21 du RGPD)</H3>
            <P>
              Vous avez le droit de vous opposer à tout moment, pour des raisons
              tenant à votre situation particulière, au traitement de vos données
              personnelles fondé sur l'intérêt légitime de GIRA SAS (article
              6.1.f du RGPD). GIRA SAS cessera alors le traitement, à moins de
              démontrer l'existence de motifs légitimes et impérieux pour le
              traitement qui prévalent sur vos intérêts, droits et libertés, ou
              pour la constatation, l'exercice ou la défense de droits en
              justice.
            </P>
            <P>
              En matière de prospection commerciale, le droit d'opposition est
              absolu : vous pouvez vous y opposer à tout moment, sans avoir à
              justifier de motifs particuliers, et GIRA SAS cessera
              immédiatement tout envoi de communications à caractère commercial.
            </P>

            <H3>Droit de retrait du consentement (article 7 du RGPD)</H3>
            <P>
              Lorsque le traitement de vos données repose sur votre
              consentement, vous avez le droit de retirer ce consentement à tout
              moment. Le retrait du consentement ne compromet pas la licéité du
              traitement fondé sur le consentement effectué avant ce retrait.
              L'exercice du droit de retrait doit être aussi simple que
              l'expression initiale du consentement.
            </P>

            <H3>Droit relatif aux décisions automatisées (article 22 du RGPD)</H3>
            <P>
              Vous avez le droit de ne pas faire l'objet d'une décision fondée
              exclusivement sur un traitement automatisé, y compris le
              profilage, produisant des effets juridiques vous concernant ou vous
              affectant de manière significative. GIRA SAS n'a actuellement pas
              recours à de tels traitements dans le cadre de l'exploitation du
              Site.
            </P>
          </Section>

          <Divider />

          {/* Comment exercer vos droits */}
          <Section>
            <H2>Comment exercer vos droits</H2>
            <P>
              Pour exercer l'un de vos droits en matière de protection des
              données personnelles, adressez votre demande par courrier
              électronique à l'adresse suivante :
            </P>
            <div className="bg-[#FAFAFA] rounded-lg p-6 md:p-8 mb-6">
              <InfoRow label="Email" value={
                <a href="mailto:contact@gira-cf.com" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                  contact@gira-cf.com
                </a>
              } />
              <InfoRow label="Objet recommandé" value="Exercice de droit RGPD — [Nom du droit]" />
              <InfoRow label="Courrier postal" value="GIRA SAS — 128, rue de la Boétie — 75008 Paris, France" />
            </div>
            <P>
              Afin de traiter votre demande dans les meilleures conditions,
              veuillez préciser les informations suivantes dans votre message :
            </P>
            <BulletList items={[
              "Votre identité (nom, prénom) et l'adresse email utilisée lors de votre contact avec GIRA",
              "Le droit que vous souhaitez exercer (accès, rectification, effacement, limitation, portabilité, opposition, retrait du consentement)",
              "Toute information utile permettant de localiser les données concernées (date de la demande initiale, formulaire utilisé, etc.)",
            ]} />
            <P>
              GIRA SAS peut vous demander de fournir un justificatif d'identité
              afin de vérifier que la demande émane bien de la personne
              concernée. Ce justificatif sera traité dans le seul but de
              répondre à votre demande et sera supprimé immédiatement après
              vérification.
            </P>
          </Section>

          <Divider />

          {/* Délais de réponse */}
          <Section>
            <H2>Délais de réponse</H2>
            <P>
              Conformément à l'article 12 du RGPD, GIRA SAS s'engage à répondre
              à toute demande d'exercice de droits dans les délais suivants :
            </P>
            <div className="overflow-x-auto mb-6">
              <table className="w-full font-inter text-[15px]">
                <thead>
                  <tr className="border-b-2 border-[#1A1A1A]">
                    <th className="text-left py-3 pr-6 font-semibold text-[#1A1A1A]">Type de demande</th>
                    <th className="text-left py-3 pr-6 font-semibold text-[#1A1A1A]">Délai standard</th>
                    <th className="text-left py-3 font-semibold text-[#1A1A1A]">Délai maximum légal</th>
                  </tr>
                </thead>
                <tbody className="text-[#444]">
                  <tr className="border-b border-[#EBEBEB]">
                    <td className="py-4 pr-6">Accusé de réception</td>
                    <td className="py-4 pr-6">24 heures ouvrées</td>
                    <td className="py-4">Sans délai</td>
                  </tr>
                  <tr className="border-b border-[#EBEBEB]">
                    <td className="py-4 pr-6">Droit d'accès</td>
                    <td className="py-4 pr-6">15 jours ouvrés</td>
                    <td className="py-4">30 jours</td>
                  </tr>
                  <tr className="border-b border-[#EBEBEB]">
                    <td className="py-4 pr-6">Rectification ou effacement</td>
                    <td className="py-4 pr-6">7 jours ouvrés</td>
                    <td className="py-4">30 jours</td>
                  </tr>
                  <tr className="border-b border-[#EBEBEB]">
                    <td className="py-4 pr-6">Portabilité des données</td>
                    <td className="py-4 pr-6">15 jours ouvrés</td>
                    <td className="py-4">30 jours</td>
                  </tr>
                  <tr className="border-b border-[#EBEBEB]">
                    <td className="py-4 pr-6">Opposition au traitement</td>
                    <td className="py-4 pr-6">48 heures</td>
                    <td className="py-4">30 jours</td>
                  </tr>
                  <tr className="border-b border-[#EBEBEB]">
                    <td className="py-4 pr-6">Opposition à la prospection</td>
                    <td className="py-4 pr-6">Immédiat</td>
                    <td className="py-4">Immédiat</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6">Demande complexe ou volumineuse</td>
                    <td className="py-4 pr-6">30 jours avec notification</td>
                    <td className="py-4">90 jours (article 12.3 RGPD)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <P>
              Le traitement de votre demande est gratuit. Toutefois,
              conformément à l'article 12.5 du RGPD, GIRA SAS se réserve le
              droit de facturer des frais raisonnables fondés sur les coûts
              administratifs en cas de demandes manifestement infondées ou
              excessives, notamment en raison de leur caractère répétitif, ou de
              refuser de donner suite à de telles demandes.
            </P>
          </Section>

          <Divider />

          {/* Réclamation CNIL */}
          <Section>
            <H2>Introduction d'une réclamation auprès de la CNIL</H2>
            <P>
              Si, après avoir exercé vos droits auprès de GIRA SAS, vous
              estimez que le traitement de vos données personnelles n'est pas
              conforme à la réglementation en vigueur ou que vos droits n'ont
              pas été respectés, vous avez le droit d'introduire une
              réclamation auprès de l'autorité de contrôle compétente.
            </P>
            <P>
              En France, l'autorité compétente est la Commission Nationale de
              l'Informatique et des Libertés (CNIL). Nous recommandons toutefois
              de nous contacter préalablement afin de tenter de résoudre le
              différend à l'amiable.
            </P>
            <div className="bg-[#FAFAFA] rounded-lg p-6 md:p-8 mb-6">
              <InfoRow label="Organisme" value="CNIL — Commission Nationale de l'Informatique et des Libertés" />
              <InfoRow label="Adresse" value="3 Place de Fontenoy — TSA 80715 — 75334 Paris Cedex 07" />
              <InfoRow label="Téléphone" value="+33 (0)1 53 73 22 22" />
              <InfoRow label="Horaires" value="Lundi au jeudi : 9h–18h30 · Vendredi : 9h–18h" />
              <InfoRow label="Site web" value={
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                  www.cnil.fr
                </a>
              } />
              <InfoRow label="Plainte en ligne" value={
                <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                  Déposer une plainte sur cnil.fr
                </a>
              } />
            </div>
            <P>
              La procédure recommandée pour introduire une réclamation est la
              suivante :
            </P>
            <BulletList items={[
              "Contactez d'abord GIRA SAS à l'adresse contact@gira-cf.com en exposant votre demande",
              "Attendez la réponse de GIRA SAS dans le délai légal de 30 jours",
              "En l'absence de réponse satisfaisante, constituez un dossier de réclamation comprenant vos échanges avec GIRA SAS",
              "Saisissez la CNIL en ligne ou par courrier postal en joignant votre dossier",
              "La CNIL dispose d'un délai de 3 mois pour traiter votre réclamation et vous informer de ses suites",
            ]} />
          </Section>

          <Divider />

          {/* Glossaire */}
          <Section>
            <H2>Glossaire</H2>
            <P>
              Pour faciliter la compréhension de la présente page et de la
              réglementation applicable, voici les définitions des principaux
              termes utilisés :
            </P>

            <H3>Donnée personnelle</H3>
            <P>
              Toute information se rapportant à une personne physique identifiée
              ou identifiable, directement ou indirectement. Cela inclut
              notamment le nom, le prénom, l'adresse email, le numéro de
              téléphone, l'adresse IP, les cookies, les identifiants en ligne ou
              tout autre élément spécifique propre à l'identité d'une personne
              physique.
            </P>

            <H3>Traitement</H3>
            <P>
              Toute opération ou ensemble d'opérations effectuées sur des
              données personnelles, que ce soit par des moyens automatisés ou
              non. Cela inclut la collecte, l'enregistrement, l'organisation, la
              structuration, le stockage, l'adaptation, la modification,
              l'extraction, la consultation, l'utilisation, la communication par
              transmission, la diffusion, l'effacement ou la destruction.
            </P>

            <H3>Responsable du traitement</H3>
            <P>
              La personne physique ou morale, l'autorité publique, le service ou
              tout autre organisme qui, seul ou conjointement avec d'autres,
              détermine les finalités et les moyens du traitement de données
              personnelles. Dans le cadre du Site, le responsable du traitement
              est GIRA SAS.
            </P>

            <H3>Sous-traitant</H3>
            <P>
              La personne physique ou morale qui traite des données personnelles
              pour le compte du responsable du traitement, selon ses
              instructions. Les sous-traitants de GIRA SAS incluent notamment
              Vercel (hébergement), Resend (envoi d'emails) et OpenAI
              (assistant virtuel).
            </P>

            <H3>Consentement</H3>
            <P>
              Toute manifestation de volonté libre, spécifique, éclairée et
              univoque par laquelle la personne concernée accepte, par une
              déclaration ou par un acte positif clair, que des données
              personnelles la concernant fassent l'objet d'un traitement.
            </P>

            <H3>Profilage</H3>
            <P>
              Toute forme de traitement automatisé de données personnelles
              consistant à utiliser ces données pour évaluer certains aspects
              personnels relatifs à une personne physique, notamment pour
              analyser ou prédire des aspects concernant ses performances
              professionnelles, sa situation économique, sa santé, ses
              préférences, ses intérêts, sa fiabilité, son comportement, sa
              localisation ou ses déplacements. GIRA SAS n'a pas recours au
              profilage.
            </P>
          </Section>

          <Divider />

          {/* Textes de référence */}
          <Section>
            <H2>Textes de référence</H2>
            <P>
              La présente page s'inscrit dans le cadre des textes législatifs et
              réglementaires suivants :
            </P>
            <BulletList items={[
              "Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 (Règlement Général sur la Protection des Données — RGPD)",
              "Loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés, modifiée par la loi n° 2018-493 du 20 juin 2018",
              "Décret n° 2019-536 du 29 mai 2019 pris pour l'application de la loi n° 78-17 du 6 janvier 1978",
              "Lignes directrices et recommandations du Comité Européen de la Protection des Données (EDPB / CEPD)",
              "Délibérations et recommandations de la Commission Nationale de l'Informatique et des Libertés (CNIL)",
              "Décision d'exécution (UE) 2021/914 de la Commission du 4 juin 2021 relative aux clauses contractuelles types",
            ]} />
          </Section>

          {/* Footer links */}
          <div className="border-t border-[#E5E5E5] pt-12 mt-8">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/politique-confidentialite" className="font-inter text-sm text-[#777] hover:text-[#1A1A1A] underline underline-offset-2 transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/mentions-legales" className="font-inter text-sm text-[#777] hover:text-[#1A1A1A] underline underline-offset-2 transition-colors">
                Mentions légales
              </Link>
              <Link href="/contact" className="font-inter text-sm text-[#777] hover:text-[#1A1A1A] underline underline-offset-2 transition-colors">
                Nous contacter
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
