import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales — GIRA",
  description:
    "Mentions légales du site gira-cf.com. Informations sur l'éditeur, l'hébergeur, la propriété intellectuelle et les conditions d'utilisation du site GIRA.",
  alternates: { canonical: "https://www.gira-cf.com/mentions-legales" },
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

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-white pt-36 md:pt-44 pb-16 md:pb-20 border-b border-[#EBEBEB]">
        <div className="max-w-[820px] mx-auto px-6 md:px-8">
          <h1 className="font-montserrat text-[2.5rem] md:text-[3.5rem] font-light tracking-tight text-[#1A1A1A] leading-[1.1] mb-6">
            Mentions légales
          </h1>
          <p className="font-inter text-base md:text-lg text-[#777] leading-relaxed max-w-[600px]">
            Informations légales relatives à l'édition et à l'exploitation du
            site gira-cf.com, conformément à la loi n°&nbsp;2004-575 du 21 juin
            2004 pour la confiance dans l'économie numérique.
          </p>
          <p className="font-inter text-sm text-[#999] mt-6">
            Dernière mise à jour : mars 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-[820px] mx-auto px-6 md:px-8">

          {/* Éditeur du site */}
          <Section>
            <H2>Éditeur du site</H2>
            <P>
              Le site internet accessible à l'adresse{" "}
              <strong className="text-[#1A1A1A]">https://www.gira-cf.com</strong>{" "}
              (ci-après « le Site ») est édité par la société GIRA SAS, cabinet
              d'exécution des projets structurants, spécialisé dans
              l'accompagnement des gouvernements africains, des institutions
              internationales et des investisseurs dans la conception, le
              financement et l'exécution de projets à fort impact en Afrique.
            </P>
            <div className="bg-[#FAFAFA] rounded-lg p-6 md:p-8 mb-6">
              <InfoRow label="Dénomination sociale" value="GIRA SAS" />
              <InfoRow label="Forme juridique" value="Société par Actions Simplifiée (SAS) de droit français" />
              <InfoRow label="Siège social" value="128, rue de la Boétie — 75008 Paris, France" />
              <InfoRow label="SIRET" value={<em className="text-[#999]">En cours d'immatriculation</em>} />
              <InfoRow label="Capital social" value={<em className="text-[#999]">À compléter</em>} />
              <InfoRow label="N° TVA intracommunautaire" value={<em className="text-[#999]">À compléter</em>} />
              <InfoRow label="Code APE / NAF" value={<em className="text-[#999]">À compléter</em>} />
              <InfoRow
                label="Email de contact"
                value={
                  <a href="mailto:contact@gira-cf.com" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                    contact@gira-cf.com
                  </a>
                }
              />
              <InfoRow label="Présences opérationnelles" value="Paris · Casablanca · Bratislava" />
            </div>
            <P>
              GIRA SAS est un cabinet d'exécution indépendant. Il n'est affilié
              à aucun parti politique ni à aucune entité gouvernementale. En tant
              que partenaire officiel du Plan National de Développement de la
              République Centrafricaine (PND RCA 2024-2028), GIRA opère dans le
              strict respect des règles déontologiques et éthiques
              internationales applicables à son secteur d'activité.
            </P>
          </Section>

          <Divider />

          {/* Directeur de la publication */}
          <Section>
            <H2>Directeur de la publication</H2>
            <P>
              Le directeur de la publication du Site est le représentant légal de
              GIRA SAS, en qualité de Président ou de Directeur Général. Il est
              responsable de l'ensemble des contenus éditoriaux diffusés sur le
              Site, conformément à l'article 6-III de la loi n°&nbsp;2004-575 du
              21 juin 2004 pour la confiance dans l'économie numérique (LCEN).
            </P>
            <P>
              Toute demande relative aux contenus publiés sur le Site — incluant
              les demandes de droit de réponse, de rectification ou de retrait —
              doit être adressée par courrier électronique à l'adresse{" "}
              <a href="mailto:contact@gira-cf.com" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                contact@gira-cf.com
              </a>
              .
            </P>
            <P>
              Conformément à la législation en vigueur, le directeur de la
              publication assume la responsabilité pénale des contenus publiés
              sur le Site. GIRA SAS dispose d'une procédure interne de
              validation éditoriale préalable à toute publication, garantissant
              l'exactitude et la conformité des informations diffusées.
            </P>
          </Section>

          <Divider />

          {/* Hébergeur */}
          <Section>
            <H2>Hébergeur du site</H2>
            <P>
              Le Site est hébergé par la société Vercel Inc., plateforme cloud de
              référence mondiale pour le déploiement d'applications web modernes.
              Vercel exploite un réseau distribué (Edge Network) garantissant des
              temps de réponse optimaux, une haute disponibilité et une sécurité
              renforcée pour l'ensemble de ses clients.
            </P>
            <div className="bg-[#FAFAFA] rounded-lg p-6 md:p-8 mb-6">
              <InfoRow label="Raison sociale" value="Vercel Inc." />
              <InfoRow label="Siège social" value="340 Pine Street, Suite 603 — San Francisco, CA 94104, États-Unis" />
              <InfoRow
                label="Site web"
                value={
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                    https://vercel.com
                  </a>
                }
              />
              <InfoRow label="Infrastructure" value="Edge Network mondial — CDN distribué — régions UE disponibles" />
              <InfoRow label="Certifications" value="SOC 2 Type II · ISO 27001 · Conformité RGPD" />
              <InfoRow label="Disponibilité SLA" value="99,99 % — infrastructure redondée multi-régions" />
            </div>
            <P>
              Les données en transit et en stockage sont soumises aux garanties
              contractuelles de Vercel Inc., disponibles sur{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                vercel.com/legal/privacy-policy
              </a>
              . Les transferts de données hors de l'Union Européenne sont
              encadrés par des clauses contractuelles types (CCT) conformes au
              Chapitre V du Règlement (UE) 2016/679 (RGPD).
            </P>
          </Section>

          <Divider />

          {/* Propriété intellectuelle */}
          <Section>
            <H2>Propriété intellectuelle</H2>
            <P>
              L'ensemble des éléments composant le Site — incluant, de manière
              non limitative, les textes, articles, analyses, études, rapports,
              présentations institutionnelles, photographies, illustrations,
              vidéos, interfaces graphiques, code source, architecture logicielle
              et structure de base de données — constituent des œuvres protégées
              par le Code de la propriété intellectuelle français, le droit
              d'auteur international et les conventions internationales
              applicables (Convention de Berne, accords ADPIC).
            </P>
            <P>
              Ces éléments sont la propriété exclusive de GIRA SAS ou de ses
              partenaires et prestataires ayant consenti les droits d'utilisation
              nécessaires. La dénomination « GIRA », le logotype associé et tous
              les signes distinctifs visuels utilisés sur le Site sont protégés
              au titre du droit des marques, du droit d'auteur et du droit de la
              concurrence déloyale.
            </P>
            <P>
              Toute reproduction, représentation, modification, publication,
              adaptation, diffusion ou exploitation — totale ou partielle — des
              éléments du Site, par quelque procédé que ce soit, est strictement
              interdite sans autorisation écrite préalable de GIRA SAS. La
              violation de cette interdiction constitue une contrefaçon au sens
              des articles L.335-2 et suivants du Code de la propriété
              intellectuelle, passible de sanctions civiles et pénales.
            </P>
            <P>
              Par exception, les courtes citations à des fins d'information ou de
              critique sont autorisées sous réserve de mentionner explicitement
              la source (« GIRA — gira-cf.com ») et de ne pas dénaturer le propos
              original. Les demandes de droits et de licences doivent être
              adressées à{" "}
              <a href="mailto:contact@gira-cf.com" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                contact@gira-cf.com
              </a>
              .
            </P>
          </Section>

          <Divider />

          {/* Données personnelles */}
          <Section>
            <H2>Protection des données personnelles</H2>
            <P>
              GIRA SAS traite les données personnelles collectées via le Site
              dans le strict respect du Règlement Général sur la Protection des
              Données (RGPD — Règlement UE 2016/679) et de la loi Informatique
              et Libertés n°&nbsp;78-17 du 6 janvier 1978 modifiée. Les données
              personnelles des utilisateurs ne sont en aucun cas revendues,
              louées ou cédées à des tiers à des fins commerciales ou
              publicitaires.
            </P>
            <P>
              Le Site utilise exclusivement Vercel Analytics pour la mesure
              d'audience, un outil qui ne déploie aucun cookie publicitaire et
              qui traite des données agrégées et anonymisées. Aucun traceur de
              comportement inter-sites n'est mis en œuvre sur le Site.
            </P>
            <P>
              Pour une information complète sur les pratiques de GIRA SAS en
              matière de collecte, traitement, conservation et protection des
              données personnelles, veuillez consulter notre{" "}
              <Link href="/politique-confidentialite" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                Politique de confidentialité
              </Link>
              . Pour connaître vos droits et les modalités d'exercice de ceux-ci,
              consultez notre page{" "}
              <Link href="/rgpd" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                Vos droits RGPD
              </Link>
              .
            </P>
          </Section>

          <Divider />

          {/* Cookies */}
          <Section>
            <H2>Cookies et traceurs</H2>
            <P>
              Le Site utilise un nombre strictement limité de traceurs, tous
              exclusivement à des fins techniques ou de mesure d'audience
              anonymisée. Aucun cookie publicitaire, aucun pixel de suivi et
              aucun outil de tracking comportemental inter-sites n'est déployé
              sur le Site.
            </P>
            <P>
              Les traceurs mis en œuvre sont les suivants :
            </P>
            <ul className="font-inter text-[15px] leading-[1.9] text-[#444] mb-5 list-disc pl-6 space-y-2">
              <li>
                <strong className="text-[#1A1A1A]">Vercel Analytics</strong> —
                Mesure d'audience agrégée et anonymisée (pages consultées,
                sessions, type d'appareil). Soumis au consentement de
                l'utilisateur.
              </li>
              <li>
                <strong className="text-[#1A1A1A]">Cookie de consentement</strong>{" "}
                — Cookie technique essentiel permettant de mémoriser le choix de
                l'utilisateur concernant le bandeau de gestion des cookies
                (localStorage). Durée de conservation : 12 mois. Exempt de
                consentement.
              </li>
            </ul>
            <P>
              Vous pouvez à tout moment modifier vos préférences de cookies via
              le bandeau de consentement accessible depuis le pied de page du
              Site, ou en supprimant les cookies de votre navigateur depuis ses
              paramètres.
            </P>
          </Section>

          <Divider />

          {/* Liens hypertextes */}
          <Section>
            <H2>Liens hypertextes et contenus tiers</H2>
            <P>
              Le Site peut contenir des liens hypertextes renvoyant vers des
              sites internet exploités par des tiers, notamment des partenaires
              institutionnels, des organisations internationales, des médias ou
              des bases de données publiques. GIRA SAS n'exerce aucun contrôle
              sur ces sites tiers, leur contenu, leur accessibilité ou leurs
              pratiques en matière de protection des données personnelles, et
              décline toute responsabilité à leur égard.
            </P>
            <P>
              L'existence d'un lien hypertexte depuis le Site vers un site tiers
              ne saurait constituer une approbation, une recommandation ou une
              garantie de la part de GIRA SAS quant au contenu, aux produits ou
              aux services proposés par ce site tiers.
            </P>
            <P>
              La création de liens hypertextes pointant vers le Site est
              autorisée sans accord préalable, sous réserve que ces liens
              n'utilisent pas la technique du framing ou de l'inline linking, ne
              soient pas utilisés à des fins commerciales ou publicitaires sans
              accord écrit de GIRA SAS, et ne portent pas atteinte à l'image ou
              à la réputation de GIRA.
            </P>
          </Section>

          <Divider />

          {/* Limitation de responsabilité */}
          <Section>
            <H2>Limitation de responsabilité</H2>
            <P>
              GIRA SAS s'efforce d'assurer au mieux l'exactitude, l'actualité et
              l'exhaustivité des informations publiées sur le Site. Toutefois,
              GIRA SAS ne peut garantir que les informations diffusées soient
              complètes, précises ou exemptes de toute erreur ou omission, et se
              réserve le droit de modifier, de corriger ou de retirer tout
              contenu à tout moment et sans préavis.
            </P>
            <P>
              En conséquence, GIRA SAS décline toute responsabilité en cas de
              dommage direct ou indirect résultant de l'accès au Site ou de
              l'utilisation des informations qu'il contient, incluant notamment :
            </P>
            <ul className="font-inter text-[15px] leading-[1.9] text-[#444] mb-5 list-disc pl-6 space-y-2">
              <li>Toute inexactitude, erreur ou omission dans les informations disponibles sur le Site</li>
              <li>Toute interruption temporaire ou définitive du Site, quelle qu'en soit la cause</li>
              <li>Toute contamination par des virus informatiques ou tout autre élément nuisible</li>
              <li>Toute intrusion frauduleuse d'un tiers dans le système d'information du Site</li>
              <li>Tout dommage causé par l'utilisation d'informations publiées sur des sites tiers accessibles via les liens hypertextes du Site</li>
            </ul>
            <P>
              Les contenus diffusés sur le Site ont une vocation exclusivement
              informative et de présentation institutionnelle. Ils ne
              constituent en aucun cas un conseil juridique, financier, fiscal ou
              d'investissement. Pour toute décision stratégique, les utilisateurs
              sont invités à prendre contact directement avec l'équipe GIRA à
              l'adresse{" "}
              <a href="mailto:contact@gira-cf.com" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                contact@gira-cf.com
              </a>
              .
            </P>
          </Section>

          <Divider />

          {/* Accessibilité */}
          <Section>
            <H2>Accessibilité numérique</H2>
            <P>
              GIRA SAS s'engage à rendre le Site accessible conformément à
              l'article 47 de la loi n°&nbsp;2005-102 du 11 février 2005 pour
              l'égalité des droits et des chances, la participation et la
              citoyenneté des personnes handicapées, et au Référentiel Général
              d'Amélioration de l'Accessibilité (RGAA 4.1).
            </P>
            <P>
              Le Site a été conçu pour être compatible avec les principales
              technologies d'assistance (lecteurs d'écran, navigation au
              clavier, loupes logicielles) et pour respecter les critères de
              conformité WCAG 2.1 niveau AA publiés par le W3C.
            </P>
            <P>
              Si vous rencontrez un problème d'accessibilité ou si vous
              souhaitez obtenir une version alternative d'un contenu non
              accessible, contactez-nous à l'adresse{" "}
              <a href="mailto:contact@gira-cf.com" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                contact@gira-cf.com
              </a>
              . Nous nous engageons à vous répondre dans les meilleurs délais et
              à mettre en œuvre les corrections nécessaires.
            </P>
          </Section>

          <Divider />

          {/* Médiation */}
          <Section>
            <H2>Médiation et règlement des litiges en ligne</H2>
            <P>
              Conformément aux dispositions du Code de la consommation relatives
              au règlement amiable des litiges, GIRA SAS adhère au principe de
              médiation. En cas de litige non résolu à l'amiable, tout
              consommateur résidant dans un État membre de l'Union Européenne
              peut recourir à la plateforme européenne de Règlement en Ligne des
              Litiges (RLL) mise en place par la Commission Européenne, accessible
              à l'adresse suivante :{" "}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                https://ec.europa.eu/consumers/odr
              </a>
              .
            </P>
            <P>
              GIRA SAS invite tout utilisateur rencontrant une difficulté à
              prendre contact directement avec son service client à l'adresse{" "}
              <a href="mailto:contact@gira-cf.com" className="text-[#1A1A1A] underline underline-offset-2 hover:text-[#C9A84C] transition-colors">
                contact@gira-cf.com
              </a>{" "}
              avant de recourir à une procédure de médiation ou de règlement en
              ligne.
            </P>
          </Section>

          <Divider />

          {/* Droit applicable */}
          <Section>
            <H2>Droit applicable et juridiction compétente</H2>
            <P>
              Le présent Site, son contenu et les présentes mentions légales sont
              régis par le droit français. Tout litige relatif à l'utilisation du
              Site, à l'interprétation ou à l'exécution des présentes mentions
              légales sera soumis, à défaut de résolution amiable, à la
              compétence exclusive des juridictions du ressort de la Cour d'appel
              de Paris, y compris en cas de référé, d'appel en garantie ou de
              pluralité de défendeurs.
            </P>
            <P>
              La version de référence des présentes mentions légales est rédigée
              en langue française. En cas de traduction dans une autre langue, la
              version française prévaudra en toutes circonstances.
            </P>
          </Section>

          <Divider />

          {/* Crédits */}
          <Section>
            <H2>Crédits et remerciements</H2>
            <P>
              Le Site a été conçu et développé en interne par l'équipe GIRA avec
              le soutien de prestataires technologiques spécialisés. Les
              technologies utilisées incluent Next.js, React, TypeScript et
              Tailwind CSS. Le design a été réalisé selon les standards les plus
              élevés de l'industrie du conseil en management et du développement
              international.
            </P>
            <P>
              Les photographies et illustrations utilisées sur le Site
              proviennent de banques d'images sous licence ou ont été produites
              spécifiquement pour GIRA SAS. Les icônes proviennent de la
              bibliothèque open-source Lucide Icons, distribuée sous licence MIT.
            </P>
          </Section>

          {/* Footer links */}
          <div className="border-t border-[#E5E5E5] pt-12 mt-8">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/politique-confidentialite" className="font-inter text-sm text-[#777] hover:text-[#1A1A1A] underline underline-offset-2 transition-colors">
                Politique de confidentialité
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
