import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité — GIRA",
  description:
    "Politique de confidentialité de GIRA SAS. Découvrez comment nous collectons, utilisons, protégeons et conservons vos données personnelles conformément au RGPD.",
  alternates: { canonical: "https://www.gira-cf.com/politique-confidentialite" },
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
    <h3 className="font-montserrat text-lg md:text-xl font-semibold text-[#1A1A1A] mb-4 mt-10">
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

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-white pt-36 md:pt-44 pb-16 md:pb-20 border-b border-[#EBEBEB]">
        <div className="max-w-[820px] mx-auto px-6 md:px-8">
          <h1 className="font-montserrat text-[2.5rem] md:text-[3.5rem] font-light tracking-tight text-[#1A1A1A] leading-[1.1] mb-6">
            Politique de confidentialité
          </h1>
          <p className="font-inter text-base md:text-lg text-[#777] leading-relaxed max-w-[600px]">
            GIRA SAS s'engage à protéger la vie privée de ses utilisateurs.
            Cette politique décrit de manière transparente les pratiques de
            collecte, de traitement et de conservation de vos données
            personnelles.
          </p>
          <p className="font-inter text-sm text-[#999] mt-6">
            Dernière mise à jour : mars 2026 · Conforme au Règlement (UE) 2016/679 (RGPD)
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-[820px] mx-auto px-6 md:px-8">

          {/* Introduction */}
          <Section>
            <H2>Introduction</H2>
            <P>
              La présente politique de confidentialité (ci-après la «&nbsp;Politique&nbsp;»)
              s'applique au site internet accessible à l'adresse{" "}
              <strong className="text-[#1A1A1A]">https://www.gira-cf.com</strong>{" "}
              (ci-après le «&nbsp;Site&nbsp;»), édité par GIRA SAS, cabinet
              d'exécution des projets structurants basé à Paris. Elle a pour
              objet d'informer les utilisateurs du Site sur les modalités de
              collecte, de traitement, d'utilisation et de protection de leurs
              données personnelles.
            </P>
            <P>
              GIRA SAS accorde la plus haute importance à la protection de la vie
              privée et des données personnelles de ses utilisateurs,
              partenaires, candidats et visiteurs. La présente Politique a été
              rédigée conformément au Règlement (UE) 2016/679 du Parlement
              européen et du Conseil du 27 avril 2016 relatif à la protection
              des personnes physiques à l'égard du traitement des données à
              caractère personnel (RGPD), ainsi qu'à la loi n°&nbsp;78-17 du
              6 janvier 1978 relative à l'informatique, aux fichiers et aux
              libertés, dans sa version modifiée.
            </P>
            <P>
              En accédant au Site et en utilisant ses services, vous reconnaissez
              avoir pris connaissance de la présente Politique. Si vous
              n'acceptez pas les termes de cette Politique, nous vous invitons à
              ne pas communiquer de données personnelles via le Site.
            </P>
          </Section>

          <Divider />

          {/* Responsable du traitement */}
          <Section>
            <H2>Responsable du traitement</H2>
            <P>
              Le responsable du traitement de vos données personnelles collectées
              via le Site est :
            </P>
            <div className="bg-[#FAFAFA] rounded-lg p-6 md:p-8 mb-6">
              <InfoRow label="Raison sociale" value="GIRA SAS" />
              <InfoRow label="Siège social" value="128, rue de la Boétie — 75008 Paris, France" />
              <InfoRow label="Contact DPO" value={
                <a href="mailto:contact@gira-cf.com" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                  contact@gira-cf.com
                </a>
              } />
              <InfoRow label="Autorité de contrôle" value="CNIL — Commission Nationale de l'Informatique et des Libertés" />
            </div>
            <P>
              Pour toute question relative au traitement de vos données
              personnelles ou pour exercer vos droits, vous pouvez contacter
              notre équipe à l'adresse{" "}
              <a href="mailto:contact@gira-cf.com" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                contact@gira-cf.com
              </a>
              .
            </P>
          </Section>

          <Divider />

          {/* Modifications */}
          <Section>
            <H2>Modifications de la présente Politique</H2>
            <P>
              GIRA SAS se réserve le droit de modifier, de compléter ou de
              mettre à jour la présente Politique à tout moment, afin notamment
              de se conformer à toute évolution législative, réglementaire,
              jurisprudentielle ou technologique. La date de la dernière mise à
              jour est indiquée en haut du présent document.
            </P>
            <P>
              Il est recommandé aux utilisateurs de consulter régulièrement cette
              page afin de prendre connaissance des éventuelles modifications. En
              cas de modification substantielle affectant les droits des
              utilisateurs, GIRA SAS s'engage à en informer les personnes
              concernées par courrier électronique (si une adresse a été
              communiquée) ou par un bandeau d'information visible sur le Site,
              dans un délai raisonnable précédant l'entrée en vigueur des
              modifications.
            </P>
          </Section>

          <Divider />

          {/* Données collectées */}
          <Section>
            <H2>Données personnelles collectées</H2>
            <P>
              GIRA SAS collecte uniquement les données personnelles strictement
              nécessaires aux finalités décrites ci-après. Nous ne collectons
              jamais de données dites «&nbsp;sensibles&nbsp;» au sens de
              l'article 9 du RGPD (données révélant l'origine raciale ou
              ethnique, les opinions politiques, les convictions religieuses, les
              données de santé, l'orientation sexuelle, etc.).
            </P>

            <H3>Formulaire de contact</H3>
            <P>
              Lorsque vous utilisez le formulaire de contact disponible sur le
              Site, les données suivantes sont collectées :
            </P>
            <BulletList items={[
              "Nom et prénom",
              "Adresse email professionnelle",
              "Organisation et fonction",
              "Pays d'activité",
              "Numéro de téléphone (optionnel)",
              "Type de demande (gouvernement, investisseur, institution, entreprise, ONG, autre)",
              "Contenu du message",
            ]} />
            <P>
              <strong className="text-[#1A1A1A]">Base légale :</strong>{" "}
              Exécution de mesures précontractuelles et intérêt légitime de GIRA
              SAS à répondre aux sollicitations de ses prospects et partenaires
              (articles 6.1.b et 6.1.f du RGPD).
            </P>

            <H3>Formulaire de candidature</H3>
            <P>
              Lorsque vous postulez via la section Carrières du Site, les données
              suivantes sont collectées :
            </P>
            <BulletList items={[
              "Nom, prénom, adresse email et numéro de téléphone",
              "Poste visé",
              "Lettre de motivation et message d'accompagnement",
              "Curriculum Vitae (fichier PDF, 5 Mo maximum)",
            ]} />
            <P>
              <strong className="text-[#1A1A1A]">Base légale :</strong>{" "}
              Consentement explicite du candidat au moment de la soumission du
              formulaire (article 6.1.a du RGPD).
            </P>

            <H3>Réseau et Diaspora</H3>
            <P>
              Si vous choisissez de rejoindre le réseau d'experts de la diaspora
              africaine de GIRA, les données suivantes sont collectées :
            </P>
            <BulletList items={[
              "Nom et prénom",
              "Adresse email",
              "Domaine d'expertise",
              "Pays de résidence",
            ]} />
            <P>
              <strong className="text-[#1A1A1A]">Base légale :</strong>{" "}
              Consentement explicite de l'utilisateur (article 6.1.a du RGPD).
            </P>

            <H3>Données de navigation et analytics</H3>
            <P>
              Le Site utilise Vercel Analytics, un service de mesure d'audience
              qui collecte des données agrégées et anonymisées. Les données
              traitées incluent :
            </P>
            <BulletList items={[
              "Pages consultées (données agrégées)",
              "Durée des sessions (anonymisée)",
              "Type d'appareil et navigateur (données agrégées)",
              "Pays d'origine de la visite (niveau pays uniquement, pas d'adresse IP individuelle)",
            ]} />
            <P>
              <strong className="text-[#1A1A1A]">Base légale :</strong>{" "}
              Intérêt légitime de GIRA SAS à mesurer l'audience de son Site et à
              en améliorer les performances (article 6.1.f du RGPD).
            </P>
          </Section>

          <Divider />

          {/* Finalités */}
          <Section>
            <H2>Finalités du traitement</H2>
            <P>
              Vos données personnelles sont collectées et traitées
              exclusivement pour les finalités suivantes :
            </P>
            <BulletList items={[
              "Répondre à vos demandes de contact, de renseignements ou de devis transmises via le formulaire de contact du Site",
              "Qualifier et traiter les demandes de partenariat, de collaboration ou d'investissement reçues de la part de gouvernements, institutions internationales, entreprises ou investisseurs",
              "Adresser des propositions commerciales adaptées à votre demande initiale, dans le respect du cadre légal applicable",
              "Traiter les candidatures professionnelles reçues via le formulaire de la section Carrières du Site",
              "Intégrer les profils d'experts au réseau de la diaspora africaine de GIRA, sur la base du consentement explicite de chaque participant",
              "Améliorer les performances, l'ergonomie et l'accessibilité du Site grâce à l'analyse de données de navigation anonymisées",
              "Assurer la sécurité du Site et prévenir les abus (rate limiting, honeypot anti-spam)",
              "Respecter les obligations légales et réglementaires applicables à GIRA SAS",
            ]} />
            <P>
              Conformément au principe de minimisation des données (article 5.1.c
              du RGPD), GIRA SAS s'engage à ne collecter que les données
              strictement nécessaires à chaque finalité déclarée et à ne jamais
              utiliser vos données à des fins incompatibles avec celles pour
              lesquelles elles ont été initialement collectées.
            </P>
          </Section>

          <Divider />

          {/* Durées de conservation */}
          <Section>
            <H2>Durées de conservation</H2>
            <P>
              GIRA SAS conserve vos données personnelles pendant une durée
              strictement proportionnée à la finalité du traitement, conformément
              au principe de limitation de la conservation énoncé à l'article
              5.1.e du RGPD. Les durées de conservation appliquées sont les
              suivantes :
            </P>
            <div className="overflow-x-auto mb-6">
              <table className="w-full font-inter text-[15px]">
                <thead>
                  <tr className="border-b-2 border-[#1A1A1A]">
                    <th className="text-left py-3 pr-6 font-semibold text-[#1A1A1A]">Catégorie de données</th>
                    <th className="text-left py-3 pr-6 font-semibold text-[#1A1A1A]">Durée de conservation</th>
                    <th className="text-left py-3 font-semibold text-[#1A1A1A]">Fondement</th>
                  </tr>
                </thead>
                <tbody className="text-[#444]">
                  <tr className="border-b border-[#EBEBEB]">
                    <td className="py-4 pr-6">Demandes de contact et devis</td>
                    <td className="py-4 pr-6">3 ans à compter du dernier échange</td>
                    <td className="py-4">Prescription commerciale</td>
                  </tr>
                  <tr className="border-b border-[#EBEBEB]">
                    <td className="py-4 pr-6">Candidatures non retenues</td>
                    <td className="py-4 pr-6">2 ans à compter de la réception</td>
                    <td className="py-4">Recommandation CNIL</td>
                  </tr>
                  <tr className="border-b border-[#EBEBEB]">
                    <td className="py-4 pr-6">Profils réseau diaspora</td>
                    <td className="py-4 pr-6">Durée du partenariat + 1 an</td>
                    <td className="py-4">Gestion des contacts actifs</td>
                  </tr>
                  <tr className="border-b border-[#EBEBEB]">
                    <td className="py-4 pr-6">Données analytics</td>
                    <td className="py-4 pr-6">13 mois maximum</td>
                    <td className="py-4">Recommandation CNIL</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6">Données de facturation</td>
                    <td className="py-4 pr-6">10 ans</td>
                    <td className="py-4">Obligation légale (Code de commerce)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <P>
              À l'expiration des délais de conservation indiqués ci-dessus, les
              données personnelles concernées sont supprimées de manière
              définitive ou anonymisées de façon irréversible, de sorte qu'elles
              ne permettent plus l'identification directe ou indirecte des
              personnes concernées.
            </P>
          </Section>

          <Divider />

          {/* Destinataires */}
          <Section>
            <H2>Destinataires et sous-traitants</H2>
            <P>
              Vos données personnelles sont traitées exclusivement par les
              membres habilités de l'équipe GIRA SAS ayant besoin d'y accéder
              dans le cadre de leurs fonctions. Elles ne sont en aucun cas
              vendues, louées, échangées ou cédées à des tiers à des fins
              commerciales, publicitaires ou de prospection.
            </P>
            <P>
              Dans le cadre de l'exploitation du Site et de la fourniture de ses
              services, GIRA SAS fait appel aux sous-traitants techniques
              suivants :
            </P>
            <div className="space-y-6 mb-6">
              <div className="bg-[#FAFAFA] rounded-lg p-6">
                <h4 className="font-montserrat font-semibold text-[#1A1A1A] mb-3">Vercel Inc.</h4>
                <P>
                  Hébergement et infrastructure web du Site. Vercel assure le
                  déploiement, la diffusion via CDN (Content Delivery Network) et
                  la disponibilité du Site. Les données transitant par les
                  serveurs de Vercel sont protégées par des mesures de sécurité
                  conformes aux standards SOC 2 Type II et ISO 27001.
                </P>
                <p className="font-inter text-sm text-[#777]">
                  Siège : San Francisco, États-Unis · Garanties : Clauses contractuelles types UE · DPA disponible
                </p>
              </div>

              <div className="bg-[#FAFAFA] rounded-lg p-6">
                <h4 className="font-montserrat font-semibold text-[#1A1A1A] mb-3">Resend Inc.</h4>
                <P>
                  Service d'envoi transactionnel d'emails. Resend est utilisé
                  pour l'envoi des confirmations de réception des formulaires de
                  contact et de candidature, ainsi que pour la transmission des
                  demandes à l'équipe GIRA.
                </P>
                <p className="font-inter text-sm text-[#777]">
                  Siège : États-Unis · Garanties : Clauses contractuelles types UE · Conformité RGPD
                </p>
              </div>

              <div className="bg-[#FAFAFA] rounded-lg p-6">
                <h4 className="font-montserrat font-semibold text-[#1A1A1A] mb-3">OpenAI, Inc.</h4>
                <P>
                  Moteur d'intelligence artificielle alimentant l'assistant
                  virtuel du Site (chatbot). Les échanges sont traités à la volée
                  et ne sont pas stockés de manière permanente par le
                  sous-traitant. Les données conversationnelles ne sont pas
                  utilisées pour l'entraînement des modèles.
                </P>
                <p className="font-inter text-sm text-[#777]">
                  Siège : San Francisco, États-Unis · Garanties : Data Processing Agreement · Données non utilisées pour l'entraînement
                </p>
              </div>
            </div>
          </Section>

          <Divider />

          {/* Transferts hors UE */}
          <Section>
            <H2>Transferts de données hors de l'Union Européenne</H2>
            <P>
              Certains des sous-traitants de GIRA SAS sont établis en dehors de
              l'Espace Économique Européen, notamment aux États-Unis. GIRA SAS
              s'assure que ces transferts internationaux de données sont
              encadrés par des garanties appropriées conformément au Chapitre V
              du RGPD, incluant notamment :
            </P>
            <BulletList items={[
              "Des clauses contractuelles types (CCT) adoptées par la Commission Européenne (Décision d'exécution 2021/914 du 4 juin 2021)",
              "L'adhésion des entités destinataires au Data Privacy Framework UE-États-Unis, lorsque ces entités y sont certifiées",
              "Des accords de traitement des données (Data Processing Agreements) comportant des engagements de confidentialité et de sécurité de niveau au moins équivalent aux exigences du RGPD",
            ]} />
            <P>
              En tout état de cause, GIRA SAS ne transfère des données
              personnelles en dehors de l'Union Européenne que lorsque cela est
              strictement nécessaire à l'exécution des services proposés sur le
              Site, et uniquement dans les conditions prévues par la
              réglementation européenne applicable.
            </P>
          </Section>

          <Divider />

          {/* Cookies */}
          <Section>
            <H2>Cookies et technologies de suivi</H2>
            <P>
              Le Site utilise un nombre strictement limité de cookies et de
              technologies de suivi. GIRA SAS ne déploie aucun cookie
              publicitaire, aucun pixel de suivi tiers et aucun outil de tracking
              comportemental inter-sites.
            </P>

            <H3>Cookies utilisés</H3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full font-inter text-[15px]">
                <thead>
                  <tr className="border-b-2 border-[#1A1A1A]">
                    <th className="text-left py-3 pr-6 font-semibold text-[#1A1A1A]">Nom / Service</th>
                    <th className="text-left py-3 pr-6 font-semibold text-[#1A1A1A]">Type</th>
                    <th className="text-left py-3 pr-6 font-semibold text-[#1A1A1A]">Finalité</th>
                    <th className="text-left py-3 font-semibold text-[#1A1A1A]">Consentement</th>
                  </tr>
                </thead>
                <tbody className="text-[#444]">
                  <tr className="border-b border-[#EBEBEB]">
                    <td className="py-4 pr-6">Vercel Analytics</td>
                    <td className="py-4 pr-6">Mesure d'audience</td>
                    <td className="py-4 pr-6">Statistiques agrégées et anonymisées (pages vues, sessions, type d'appareil)</td>
                    <td className="py-4">Requis</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6">Cookie de consentement</td>
                    <td className="py-4 pr-6">Technique essentiel</td>
                    <td className="py-4 pr-6">Mémorisation du choix de l'utilisateur (localStorage, 12 mois)</td>
                    <td className="py-4">Exempt</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <P>
              Vous pouvez à tout moment modifier vos préférences en matière de
              cookies via le bandeau de consentement accessible depuis le pied de
              page du Site, ou en supprimant les cookies directement depuis les
              paramètres de votre navigateur. La suppression ou le refus de
              certains cookies peut affecter votre expérience de navigation sur
              le Site, sans toutefois en empêcher l'accès.
            </P>
          </Section>

          <Divider />

          {/* Sécurité */}
          <Section>
            <H2>Sécurité des données</H2>
            <P>
              GIRA SAS met en œuvre l'ensemble des mesures techniques et
              organisationnelles appropriées pour garantir un niveau de sécurité
              adapté au risque, conformément à l'article 32 du RGPD. Ces mesures
              incluent notamment :
            </P>
            <BulletList items={[
              "Chiffrement des communications via les protocoles SSL/TLS (HTTPS) sur l'intégralité du Site et des échanges de données",
              "Hébergement sur une infrastructure certifiée SOC 2 Type II et ISO 27001 (Vercel Inc.)",
              "Restriction de l'accès aux données personnelles aux seuls collaborateurs habilités, selon le principe du moindre privilège",
              "Mise en place de mécanismes de limitation du débit (rate limiting) sur les interfaces de programmation (API) pour prévenir les abus et les attaques automatisées",
              "Déploiement d'un champ honeypot anti-spam invisible sur les formulaires de contact pour filtrer les soumissions automatisées",
              "Revue périodique des accès, des permissions et des configurations de sécurité",
              "Mise en œuvre d'une procédure de notification en cas de violation de données personnelles, conformément à l'article 33 du RGPD (notification à la CNIL sous 72 heures) et à l'article 34 (notification aux personnes concernées en cas de risque élevé)",
            ]} />
          </Section>

          <Divider />

          {/* Vos droits */}
          <Section>
            <H2>Vos droits</H2>
            <P>
              Conformément aux articles 15 à 22 du RGPD et à la loi Informatique
              et Libertés, vous disposez des droits suivants concernant vos
              données personnelles :
            </P>
            <BulletList items={[
              "Droit d'accès (article 15) — Vous pouvez obtenir confirmation que GIRA SAS traite ou non des données vous concernant et, le cas échéant, en recevoir une copie complète",
              "Droit de rectification (article 16) — Vous pouvez demander la correction de données inexactes, incomplètes ou obsolètes vous concernant",
              "Droit à l'effacement (article 17) — Vous pouvez demander la suppression de vos données personnelles dans les cas prévus par la réglementation applicable",
              "Droit à la limitation du traitement (article 18) — Vous pouvez demander la suspension du traitement de vos données dans certaines circonstances",
              "Droit à la portabilité (article 20) — Vous pouvez recevoir les données que vous avez fournies dans un format structuré, couramment utilisé et lisible par machine",
              "Droit d'opposition (article 21) — Vous pouvez vous opposer à tout moment au traitement de vos données fondé sur l'intérêt légitime, pour des raisons tenant à votre situation particulière",
              "Droit de retrait du consentement (article 7) — Lorsque le traitement est fondé sur votre consentement, vous pouvez le retirer à tout moment sans que cela n'affecte la licéité du traitement antérieur",
              "Droit de ne pas faire l'objet d'une décision automatisée (article 22) — Vous avez le droit de ne pas faire l'objet d'une décision fondée exclusivement sur un traitement automatisé produisant des effets juridiques vous concernant",
            ]} />
            <P>
              Pour exercer l'un de ces droits, adressez votre demande par
              courrier électronique à{" "}
              <a href="mailto:contact@gira-cf.com" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                contact@gira-cf.com
              </a>{" "}
              en précisant votre identité et le droit que vous souhaitez exercer.
              GIRA SAS s'engage à répondre à votre demande dans un délai maximum
              de 30 jours à compter de sa réception. Ce délai peut être prolongé
              de deux mois supplémentaires en cas de demandes nombreuses ou
              complexes, avec notification préalable.
            </P>
            <P>
              Pour plus de détails sur les modalités d'exercice de vos droits,
              consultez notre page dédiée :{" "}
              <Link href="/rgpd" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                Vos droits RGPD
              </Link>
              .
            </P>
          </Section>

          <Divider />

          {/* Réclamation CNIL */}
          <Section>
            <H2>Réclamation auprès de la CNIL</H2>
            <P>
              Si vous estimez, après avoir contacté GIRA SAS, que vos droits en
              matière de protection des données ne sont pas respectés, ou que le
              traitement de vos données personnelles constitue une violation du
              RGPD, vous avez le droit d'introduire une réclamation auprès de
              l'autorité de contrôle compétente.
            </P>
            <P>
              En France, l'autorité de contrôle est la Commission Nationale de
              l'Informatique et des Libertés (CNIL), que vous pouvez contacter
              aux coordonnées suivantes :
            </P>
            <div className="bg-[#FAFAFA] rounded-lg p-6 md:p-8 mb-6">
              <InfoRow label="Organisme" value="CNIL — Commission Nationale de l'Informatique et des Libertés" />
              <InfoRow label="Adresse" value="3 Place de Fontenoy — TSA 80715 — 75334 Paris Cedex 07" />
              <InfoRow label="Téléphone" value="+33 (0)1 53 73 22 22" />
              <InfoRow label="Site web" value={
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                  www.cnil.fr
                </a>
              } />
              <InfoRow label="Plainte en ligne" value={
                <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                  cnil.fr/fr/plaintes
                </a>
              } />
            </div>
          </Section>

          <Divider />

          {/* Contact */}
          <Section>
            <H2>Nous contacter</H2>
            <P>
              Pour toute question, demande d'information ou réclamation relative
              à la présente Politique de confidentialité ou au traitement de vos
              données personnelles par GIRA SAS, vous pouvez nous contacter :
            </P>
            <BulletList items={[
              "Par email : contact@gira-cf.com",
              "Par courrier : GIRA SAS — 128, rue de la Boétie — 75008 Paris, France",
            ]} />
            <P>
              Nous nous engageons à traiter votre demande dans les meilleurs
              délais et, en tout état de cause, dans le respect des délais légaux
              applicables.
            </P>
          </Section>

          {/* Footer links */}
          <div className="border-t border-[#E5E5E5] pt-12 mt-8">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/mentions-legales" className="font-inter text-sm text-[#777] hover:text-[#1A1A1A] underline underline-offset-2 transition-colors">
                Mentions légales
              </Link>
              <Link href="/rgpd" className="font-inter text-sm text-[#777] hover:text-[#1A1A1A] underline underline-offset-2 transition-colors">
                Vos droits RGPD
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
