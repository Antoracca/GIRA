import type { Metadata } from "next";
import Link from "next/link";
import HeroInterne from "@/components/shared/HeroInterne";

export const metadata: Metadata = {
  title: "Mentions légales — GIRA | Cabinet d'exécution des projets structurants",
  description:
    "Mentions légales complètes du site officiel de GIRA SAS, cabinet d'exécution des projets structurants basé à Paris. Informations éditeur, hébergeur, propriété intellectuelle.",
  alternates: { canonical: "https://www.gira-cf.com/mentions-legales" },
};

const G = "#C9A84C";
const DARK = "#0D0D0D";
const BODY = "#4A4A4A";
const FM = "var(--font-montserrat)";
const FI = "var(--font-inter)";

function Num({ n }: { n: string }) {
  return (
    <span style={{ fontFamily: FM, fontWeight: 900, fontSize: "3rem", color: G, opacity: 0.15, lineHeight: 1, minWidth: "3rem", display: "inline-block" }}>
      {n}
    </span>
  );
}

function H2({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-5 mb-6">
      <Num n={n} />
      <h2 style={{ fontFamily: FM, fontWeight: 800, fontSize: "1.1rem", color: DARK, letterSpacing: "0.01em" }}>
        {children}
      </h2>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-[1.85] mb-4" style={{ fontFamily: FI, color: BODY }}>{children}</p>;
}

function Hr() {
  return <div className="my-10" style={{ height: "1px", background: "rgba(0,0,0,0.07)" }} />;
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 py-3" style={{ borderBottom: "1px solid rgba(0,0,0,0.055)" }}>
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold shrink-0" style={{ fontFamily: FM, color: G, minWidth: "210px", paddingTop: "2px" }}>{k}</span>
      <span className="text-sm leading-relaxed" style={{ fontFamily: FI, color: BODY }}>{v}</span>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 my-5" style={{ background: "rgba(201,168,76,0.07)", borderLeft: `3px solid ${G}` }}>
      <p className="text-sm leading-relaxed" style={{ fontFamily: FI, color: BODY }}>{children}</p>
    </div>
  );
}

export default function MentionsLegalesPage() {
  return (
    <>
      <HeroInterne
        title="Mentions légales"
        subtitle="Informations légales obligatoires relatives à l'édition et à l'exploitation du site gira-cf.com, conformément à la loi française n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Mentions légales" }]}
      />

      {/* Bandeau date */}
      <div style={{ backgroundColor: DARK }}>
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest" style={{ fontFamily: FM, color: "rgba(255,255,255,0.3)" }}>Dernière mise à jour</span>
          <span className="text-xs font-semibold" style={{ fontFamily: FI, color: G }}>Mars 2026</span>
        </div>
      </div>

      <section className="py-20 md:py-28" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-12">

          {/* 01 */}
          <div className="mb-12">
            <H2 n="01">Éditeur du site</H2>
            <P>
              Le site internet accessible à l'adresse <strong style={{ color: DARK }}>https://www.gira-cf.com</strong> est
              édité par la société <strong style={{ color: DARK }}>GIRA SAS</strong>, cabinet d'exécution des projets
              structurants, spécialisé dans l'accompagnement des gouvernements africains, institutions internationales
              et investisseurs dans la conception, le financement et l'exécution de projets à fort impact.
            </P>
            <div className="rounded-2xl overflow-hidden bg-white shadow-sm mb-4">
              <Row k="Dénomination sociale" v={<strong>GIRA SAS</strong>} />
              <Row k="Forme juridique" v="Société par Actions Simplifiée (SAS)" />
              <Row k="Siège social" v="128, rue de la Boétie — 75008 Paris, France" />
              <Row k="SIRET" v={<em className="text-gray-400">En cours d'immatriculation — à compléter</em>} />
              <Row k="Capital social" v={<em className="text-gray-400">À compléter</em>} />
              <Row k="N° TVA intracommunautaire" v={<em className="text-gray-400">À compléter</em>} />
              <Row k="Code APE / NAF" v={<em className="text-gray-400">À compléter</em>} />
              <Row k="Email de contact" v={<a href="mailto:contact@gira-cf.com" style={{ color: G }}>contact@gira-cf.com</a>} />
              <Row k="Présences opérationnelles" v="Paris · Marrakech · Bratislava" />
            </div>
            <Note>
              GIRA SAS est un cabinet d'exécution indépendant, non affilié à des partis politiques ou entités
              gouvernementales. Partenaire officiel du Plan National de Développement de la République Centrafricaine
              (PND RCA 2024-2028), GIRA opère dans le strict respect des règles déontologiques internationales.
            </Note>
          </div>

          <Hr />

          {/* 02 */}
          <div className="mb-12">
            <H2 n="02">Directeur de la publication</H2>
            <P>
              Le directeur de la publication est le représentant légal de GIRA SAS — Président ou Directeur Général —,
              responsable de l'ensemble des contenus éditoriaux diffusés sur le site <strong style={{ color: DARK }}>gira-cf.com</strong>,
              conformément à l'article 6 III de la loi n° 2004-575 du 21 juin 2004 (LCEN).
            </P>
            <P>
              Pour toute demande relative aux contenus publiés (droit de réponse, rectification, retrait) :{" "}
              <a href="mailto:contact@gira-cf.com" style={{ color: G }}>contact@gira-cf.com</a>
            </P>
            <Note>
              Conformément à la loi, le directeur de la publication est responsable pénalement des contenus publiés.
              GIRA SAS dispose d'une procédure interne de validation editoriale avant toute publication.
            </Note>
          </div>

          <Hr />

          {/* 03 */}
          <div className="mb-12">
            <H2 n="03">Hébergeur du site</H2>
            <P>
              Le site <strong style={{ color: DARK }}>gira-cf.com</strong> est hébergé et servi par la société{" "}
              <strong style={{ color: DARK }}>Vercel Inc.</strong>, plateforme cloud de référence mondiale pour le
              déploiement d'applications web modernes. Vercel opère via un réseau distribué (Edge Network) garantissant
              des temps de réponse optimaux et une haute disponibilité.
            </P>
            <div className="rounded-2xl overflow-hidden bg-white shadow-sm mb-4">
              <Row k="Société" v={<strong>Vercel Inc.</strong>} />
              <Row k="Siège social" v="340 Pine Street, Suite 603 — San Francisco, CA 94104, États-Unis" />
              <Row k="Site web" v={<a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: G }}>https://vercel.com</a>} />
              <Row k="Infrastructure" v="Edge Network mondial — CDN distribué — région UE disponible" />
              <Row k="Certifications" v="SOC 2 Type II · ISO 27001 · Conformité RGPD UE" />
              <Row k="Disponibilité SLA" v="99,99% — infrastructure redondée multi-régions" />
            </div>
            <P>
              Les données transit et stockage sont soumises aux garanties contractuelles de Vercel, disponibles sur{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: G }}>
                vercel.com/legal/privacy-policy
              </a>. Des clauses contractuelles types (CCT) encadrent les transferts de données hors UE.
            </P>
          </div>

          <Hr />

          {/* 04 */}
          <div className="mb-12">
            <H2 n="04">Propriété intellectuelle</H2>
            <P>
              L'intégralité des éléments composant le site <strong style={{ color: DARK }}>gira-cf.com</strong> —
              textes, articles, analyses, études, rapports, présentations institutionnelles, logos, marques,
              signes distinctifs, noms commerciaux, photographies, illustrations, vidéos, sons, interfaces graphiques,
              code source, architecture et structure — constitue des œuvres de l'esprit protégées par le Code de
              la propriété intellectuelle (CPI) français et les conventions internationales applicables.
            </P>
            <P>
              Ces éléments sont la propriété exclusive de <strong style={{ color: DARK }}>GIRA SAS</strong> ou de
              ses partenaires et prestataires ayant consenti les droits nécessaires. La marque{" "}
              <strong style={{ color: DARK }}>GIRA</strong>, le logotype associé et tous signes distinctifs visuels
              utilisés sur ce site sont protégés au titre du droit des marques.
            </P>
            <Note>
              <strong>Interdiction formelle :</strong> Toute reproduction, représentation, modification, publication,
              adaptation, diffusion ou exploitation — totale ou partielle — des éléments du site, par quelque procédé
              que ce soit (copie, impression, téléchargement, scraping, extraction automatisée…), est strictement
              interdite sans autorisation écrite préalable de GIRA SAS. Toute violation expose son auteur à des
              poursuites civiles et/ou pénales.
            </Note>
            <P>
              Exception : Les citations de courtes extraits à des fins d'information ou de critique sont autorisées
              sous réserve de mentionner explicitement la source (GIRA — gira-cf.com) et de ne pas dénaturer le propos.
            </P>
            <P>
              Demandes de droits et licences :{" "}
              <a href="mailto:contact@gira-cf.com" style={{ color: G }}>contact@gira-cf.com</a>
            </P>
          </div>

          <Hr />

          {/* 05 */}
          <div className="mb-12">
            <H2 n="05">Données personnelles et cookies</H2>
            <P>
              GIRA SAS traite les données personnelles collectées via ce site dans le strict respect du Règlement
              Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et de la loi Informatique et
              Libertés n° 78-17 du 6 janvier 1978 modifiée. Aucune donnée n'est revendue à des tiers à des fins
              commerciales.
            </P>
            <P>
              Le site utilise <strong style={{ color: DARK }}>Vercel Analytics</strong> pour la mesure d'audience
              (données agrégées et anonymisées uniquement). Aucun cookie publicitaire ni traceur de comportement
              inter-sites n'est déployé.
            </P>
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <Link href="/politique-confidentialite"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
                style={{ backgroundColor: G, color: DARK, fontFamily: FM }}>
                Politique de confidentialité →
              </Link>
              <Link href="/rgpd"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border"
                style={{ borderColor: G, color: G, fontFamily: FM }}>
                Exercer vos droits RGPD →
              </Link>
            </div>
          </div>

          <Hr />

          {/* 06 */}
          <div className="mb-12">
            <H2 n="06">Liens hypertextes et sites tiers</H2>
            <P>
              Le site gira-cf.com peut contenir des hyperliens vers des sites tiers (partenaires institutionnels,
              organisations internationales, médias, bases de données publiques). GIRA SAS n'exerce aucun contrôle
              sur ces sites externes, leur contenu, leur accessibilité ou leurs pratiques en matière de données
              personnelles, et décline toute responsabilité à leur égard.
            </P>
            <P>
              La création de liens hypertextes pointant vers le site gira-cf.com est autorisée sous réserve que
              ces liens ne soient pas utilisés à des fins commerciales ou publicitaires sans accord préalable écrit
              de GIRA SAS, et qu'ils ne portent pas atteinte à l'image ou à la réputation de GIRA.
            </P>
          </div>

          <Hr />

          {/* 07 */}
          <div className="mb-12">
            <H2 n="07">Limitation de responsabilité</H2>
            <P>
              GIRA SAS s'efforce d'assurer l'exactitude, l'actualité et l'exhaustivité des informations publiées
              sur ce site, et se réserve le droit de modifier ou retirer à tout moment tout contenu sans préavis.
              Malgré tous les soins apportés, GIRA SAS ne peut garantir l'absence d'erreur ou d'omission.
            </P>
            <P>
              GIRA SAS ne saurait être tenue responsable de tout dommage direct ou indirect résultant de l'accès
              ou de l'utilisation du site, d'une interruption de service, d'une contamination par virus informatique,
              d'une intrusion frauduleuse de tiers ou de toute panne technique indépendante de sa volonté.
            </P>
            <Note>
              <strong>Avertissement important :</strong> Les contenus de ce site ont une vocation informative et de
              présentation institutionnelle. Ils ne constituent en aucun cas un conseil juridique, financier, fiscal
              ou d'investissement. Pour toute décision stratégique, consultez directement l'équipe GIRA à{" "}
              contact@gira-cf.com.
            </Note>
          </div>

          <Hr />

          {/* 08 */}
          <div className="mb-12">
            <H2 n="08">Accessibilité numérique</H2>
            <P>
              GIRA SAS s'engage à garantir l'accessibilité de son site conformément à l'article 47 de la loi
              n° 2005-102 du 11 février 2005 et au Référentiel Général d'Amélioration de l'Accessibilité (RGAA 4).
              Le site a été conçu pour être compatible avec les technologies d'assistance (lecteurs d'écran,
              navigation clavier) et respecter les critères WCAG 2.1 niveau AA.
            </P>
            <P>
              Pour signaler un problème d'accessibilité ou obtenir une alternative accessible à un contenu non
              accessible :{" "}
              <a href="mailto:contact@gira-cf.com" style={{ color: G }}>contact@gira-cf.com</a>
            </P>
          </div>

          <Hr />

          {/* 09 */}
          <div className="mb-12">
            <H2 n="09">Médiation et litiges en ligne</H2>
            <P>
              Conformément aux dispositions du Code de la consommation concernant le règlement amiable des litiges,
              GIRA SAS adhère au principe de médiation. En cas de litige, vous pouvez recourir à la plateforme
              européenne de règlement en ligne des litiges (RLL) accessible à{" "}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: G }}>
                ec.europa.eu/consumers/odr
              </a>.
            </P>
          </div>

          <Hr />

          {/* 10 */}
          <div className="mb-12">
            <H2 n="10">Droit applicable et juridiction compétente</H2>
            <P>
              Le présent site, ses contenus et ses mentions légales sont soumis au{" "}
              <strong style={{ color: DARK }}>droit français</strong>. En cas de litige relatif à l'utilisation du
              site ou à l'interprétation des présentes mentions légales, et à défaut de règlement amiable, les
              tribunaux du ressort de la <strong style={{ color: DARK }}>Cour d'appel de Paris</strong> seront
              seuls compétents.
            </P>
            <P>
              La langue de référence des présentes mentions légales est le français. En cas de traduction, la
              version française fait foi.
            </P>
          </div>

          {/* CTA bas */}
          <div className="rounded-2xl p-8 mt-14 text-center" style={{ backgroundColor: DARK }}>
            <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ fontFamily: FM, color: "rgba(255,255,255,0.3)" }}>Une question sur ces mentions ?</p>
            <p className="text-white font-bold text-lg mb-1" style={{ fontFamily: FM }}>L'équipe juridique GIRA vous répond</p>
            <p className="text-sm mb-5" style={{ fontFamily: FI, color: "rgba(255,255,255,0.45)" }}>Réponse assurée sous 5 jours ouvrés</p>
            <a href="mailto:contact@gira-cf.com" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: G, fontFamily: FM }}>
              contact@gira-cf.com →
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
