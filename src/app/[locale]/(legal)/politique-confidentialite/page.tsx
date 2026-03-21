import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import HeroInterne from "@/components/shared/HeroInterne";

export const metadata: Metadata = {
  title: "Politique de confidentialité — GIRA | Protection de vos données personnelles",
  description:
    "Politique de confidentialité complète de GIRA SAS. Découvrez comment nous collectons, traitons et protégeons vos données personnelles, conformément au RGPD et à la loi Informatique et Libertés.",
  alternates: { canonical: "https://www.gira-cf.com/politique-confidentialite" },
};

const G = "#C9A84C";
const DARK = "#0D0D0D";
const BODY = "#4A4A4A";
const FM = "var(--font-montserrat)";
const FI = "var(--font-inter)";

function H2({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-5 mb-6">
      <span style={{ fontFamily: FM, fontWeight: 900, fontSize: "3rem", color: G, opacity: 0.15, lineHeight: 1, minWidth: "3rem" }}>{n}</span>
      <h2 style={{ fontFamily: FM, fontWeight: 800, fontSize: "1.1rem", color: DARK }}>{children}</h2>
    </div>
  );
}

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

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mr-2 mb-2"
      style={{ backgroundColor: "rgba(201,168,76,0.12)", color: G, fontFamily: FM }}>
      {children}
    </span>
  );
}

function Bullet({ items }: { items: string[] }) {
  return (
    <ul className="mb-4 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ fontFamily: FI, color: BODY }}>
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: G }} />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <HeroInterne
        title="Politique de confidentialité"
        subtitle="GIRA SAS s'engage à protéger vos données personnelles avec la plus haute rigueur. Cette politique vous informe de manière transparente sur nos pratiques de collecte, traitement et conservation de vos données."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Confidentialité" }]}
      />

      <div style={{ backgroundColor: DARK }}>
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[10px] uppercase tracking-widest" style={{ fontFamily: FM, color: "rgba(255,255,255,0.3)" }}>Dernière mise à jour</span>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold" style={{ fontFamily: FI, color: G }}>Mars 2026</span>
            <span className="text-[10px] px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: G, fontFamily: FM }}>
              Conforme RGPD UE 2016/679
            </span>
          </div>
        </div>
      </div>

      {/* Résumé visuel */}
      <div style={{ backgroundColor: DARK }}>
        <div className="max-w-4xl mx-auto px-6 md:px-12 pb-14 pt-10">
          <p className="text-xs uppercase tracking-widest mb-6" style={{ fontFamily: FM, color: "rgba(255,255,255,0.3)" }}>
            En résumé — notre engagement
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🔒", titre: "Zéro revente", texte: "Vos données ne sont jamais vendues à des tiers" },
              { icon: "🎯", titre: "Usage limité", texte: "Utilisées uniquement pour répondre à vos demandes" },
              { icon: "⏱", titre: "3 ans max", texte: "Conservation limitée à 3 ans après dernier contact" },
              { icon: "✉️", titre: "Droits garantis", texte: "Accès, rectification et suppression à tout moment" },
            ].map((item) => (
              <div key={item.titre} className="rounded-2xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-2xl mb-3">{item.icon}</div>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ fontFamily: FM, color: G }}>{item.titre}</p>
                <p className="text-xs leading-relaxed" style={{ fontFamily: FI, color: "rgba(255,255,255,0.45)" }}>{item.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-20 md:py-28" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-12">

          {/* 01 */}
          <div className="mb-12">
            <H2 n="01">Responsable du traitement</H2>
            <P>
              Le responsable du traitement de vos données personnelles collectées via le site{" "}
              <strong style={{ color: DARK }}>gira-cf.com</strong> est :
            </P>
            <div className="rounded-2xl bg-white shadow-sm overflow-hidden mb-4">
              {[
                ["Raison sociale", "GIRA SAS"],
                ["Siège social", "128, rue de la Boétie — 75008 Paris, France"],
                ["Email DPO / Contact données", "contact@gira-cf.com"],
                ["Téléphone", "Disponible sur demande écrite"],
                ["Autorité de contrôle", "CNIL — Commission Nationale de l'Informatique et des Libertés"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col sm:flex-row gap-1 sm:gap-6 py-3 px-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <span className="text-[10px] uppercase tracking-widest font-bold shrink-0" style={{ fontFamily: FM, color: G, minWidth: "230px" }}>{k}</span>
                  <span className="text-sm" style={{ fontFamily: FI, color: BODY }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <Hr />

          {/* 02 */}
          <div className="mb-12">
            <H2 n="02">Données collectées et traitées</H2>
            <P>
              GIRA SAS collecte uniquement les données strictement nécessaires à l'exercice de ses activités.
              Nous n'collectons jamais de données sensibles (origine ethnique, opinions politiques, santé,
              croyances religieuses, orientation sexuelle).
            </P>

            <div className="space-y-4 mt-6">
              {[
                {
                  contexte: "Formulaire de contact",
                  tags: ["Obligatoire"],
                  donnees: ["Nom et prénom", "Adresse email professionnelle", "Organisation et fonction", "Pays d'activité", "Numéro de téléphone (optionnel)", "Type de demande", "Contenu du message"],
                  base: "Intérêt légitime / Exécution d'un contrat (Art. 6.1.b et 6.1.f RGPD)",
                },
                {
                  contexte: "Candidature (formulaire Carrières)",
                  tags: ["Obligatoire"],
                  donnees: ["Nom, prénom, email, téléphone", "Poste visé et lettre de motivation", "CV (fichier PDF)"],
                  base: "Consentement explicite du candidat (Art. 6.1.a RGPD)",
                },
                {
                  contexte: "Réseau & Diaspora",
                  tags: ["Optionnel"],
                  donnees: ["Nom, prénom, email", "Domaine d'expertise", "Pays de résidence"],
                  base: "Consentement explicite (Art. 6.1.a RGPD)",
                },
                {
                  contexte: "Analytics (Vercel)",
                  tags: ["Anonymisé"],
                  donnees: ["Pages visitées (agrégées)", "Temps de session (anonymisé)", "Type d'appareil et navigateur (agrégé)"],
                  base: "Intérêt légitime — mesure d'audience anonymisée (Art. 6.1.f RGPD)",
                },
              ].map((item) => (
                <div key={item.contexte} className="rounded-2xl bg-white shadow-sm p-5">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <h3 className="font-bold text-sm" style={{ fontFamily: FM, color: DARK }}>{item.contexte}</h3>
                    <div>{item.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
                  </div>
                  <Bullet items={item.donnees} />
                  <p className="text-[11px] mt-3 pt-3" style={{ fontFamily: FI, color: "#888", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    <strong style={{ color: G }}>Base légale :</strong> {item.base}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Hr />

          {/* 03 */}
          <div className="mb-12">
            <H2 n="03">Finalités du traitement</H2>
            <P>Vos données sont collectées et traitées exclusivement pour les finalités suivantes :</P>
            <Bullet items={[
              "Répondre à vos demandes de contact, de renseignements ou de devis",
              "Qualifier et traiter les demandes de partenariat, de collaboration ou d'investissement",
              "Adresser des propositions commerciales adaptées à votre demande initiale",
              "Traiter les candidatures professionnelles reçues via le formulaire Carrières",
              "Intégrer les profils au réseau d'experts de la diaspora africaine (sur demande explicite)",
              "Améliorer les performances et l'accessibilité du site (analytics anonymisé)",
              "Respecter nos obligations légales et réglementaires",
            ]} />
            <Note>
              <strong>Principe de minimisation :</strong> GIRA SAS s'engage à ne collecter que les données strictement
              nécessaires à la finalité déclarée et à ne pas utiliser vos données à des fins incompatibles avec
              celles pour lesquelles elles ont été collectées.
            </Note>
          </div>

          <Hr />

          {/* 04 */}
          <div className="mb-12">
            <H2 n="04">Durée de conservation</H2>
            <P>
              GIRA SAS applique des durées de conservation strictement proportionnées à la finalité du traitement,
              conformément au principe de limitation de la conservation (Art. 5.1.e RGPD) :
            </P>
            <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
              {[
                { type: "Demandes de contact / devis", durée: "3 ans à compter du dernier échange", motif: "Délai de prescription commerciale" },
                { type: "Candidatures non retenues", durée: "2 ans à compter de la réception du CV", motif: "Recommandation CNIL pour le recrutement" },
                { type: "Profils réseau diaspora", durée: "Durée du partenariat + 1 an", motif: "Gestion des contacts actifs" },
                { type: "Données analytics", durée: "13 mois maximum", motif: "Recommandation CNIL pour les outils analytics" },
                { type: "Données de facturation", durée: "10 ans", motif: "Obligation légale comptable (Code de commerce)" },
              ].map((r, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <span className="text-sm font-semibold" style={{ fontFamily: FM, color: DARK }}>{r.type}</span>
                  <span className="text-sm font-bold" style={{ fontFamily: FI, color: G }}>{r.durée}</span>
                  <span className="text-xs" style={{ fontFamily: FI, color: "#888" }}>{r.motif}</span>
                </div>
              ))}
            </div>
            <P>
              À l'expiration de ces délais, les données sont supprimées définitivement ou anonymisées de manière
              irréversible.
            </P>
          </div>

          <Hr />

          {/* 05 */}
          <div className="mb-12">
            <H2 n="05">Destinataires des données</H2>
            <P>
              Vos données sont traitées par les seuls membres habilités de l'équipe GIRA SAS ayant besoin d'y accéder
              dans le cadre de leur mission. Elles ne sont jamais vendues, louées ou cédées à des tiers à des fins
              commerciales.
            </P>
            <P>GIRA SAS peut partager certaines données avec les sous-traitants techniques suivants :</P>
            <div className="space-y-3 mt-4">
              {[
                { nom: "Vercel Inc.", role: "Hébergement et infrastructure web", pays: "États-Unis (UE disponible)", garantie: "Clauses contractuelles types UE — DPA disponible" },
                { nom: "Resend Inc.", role: "Envoi transactionnel des emails (confirmations, accusés de réception)", pays: "États-Unis", garantie: "Clauses contractuelles types UE — conformité RGPD" },
                { nom: "OpenAI / Google AI", role: "Moteur IA du chat assistant GIRA (traitement à la volée, non stocké)", pays: "États-Unis", garantie: "DPA — données non utilisées pour l'entraînement" },
              ].map((s) => (
                <div key={s.nom} className="rounded-2xl bg-white shadow-sm p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <strong className="text-sm" style={{ fontFamily: FM, color: DARK }}>{s.nom}</strong>
                    <span className="text-[10px] px-2 py-1 rounded-full shrink-0" style={{ backgroundColor: "rgba(201,168,76,0.1)", color: G, fontFamily: FM }}>Sous-traitant</span>
                  </div>
                  <p className="text-xs mb-1" style={{ fontFamily: FI, color: BODY }}><strong>Rôle :</strong> {s.role}</p>
                  <p className="text-xs mb-1" style={{ fontFamily: FI, color: BODY }}><strong>Pays :</strong> {s.pays}</p>
                  <p className="text-xs" style={{ fontFamily: FI, color: "#888" }}><strong>Garanties :</strong> {s.garantie}</p>
                </div>
              ))}
            </div>
          </div>

          <Hr />

          {/* 06 */}
          <div className="mb-12">
            <H2 n="06">Transferts hors Union Européenne</H2>
            <P>
              Certains de nos sous-traitants sont établis en dehors de l'Union Européenne (notamment aux États-Unis).
              GIRA SAS s'assure que ces transferts sont encadrés par des garanties appropriées conformément au
              Chapitre V du RGPD, notamment :
            </P>
            <Bullet items={[
              "Clauses contractuelles types (CCT) approuvées par la Commission Européenne (Décision 2021/914)",
              "Adhésion au Data Privacy Framework UE-États-Unis (pour les entités certifiées)",
              "Accords de traitement des données (DPA) avec garanties de niveau équivalent au RGPD",
            ]} />
          </div>

          <Hr />

          {/* 07 */}
          <div className="mb-12">
            <H2 n="07">Cookies et traceurs</H2>
            <P>
              Le site gira-cf.com utilise un nombre strictement limité de traceurs, tous à des fins techniques
              ou de mesure d'audience anonymisée. Aucun cookie publicitaire ni outil de tracking comportemental
              inter-sites n'est utilisé.
            </P>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {[
                { nom: "Vercel Analytics", type: "Mesure d'audience", finalite: "Statistiques agrégées et anonymisées (pages vues, sessions). Aucune donnée personnelle identifiable.", consent: true },
                { nom: "Cookie de consentement", type: "Technique essentiel", finalite: "Mémorisation de votre choix sur le bandeau cookie (localStorage). Durée : 12 mois.", consent: false },
              ].map((c) => (
                <div key={c.nom} className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <strong className="text-sm" style={{ fontFamily: FM, color: DARK }}>{c.nom}</strong>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ backgroundColor: c.consent ? "rgba(201,168,76,0.12)" : "rgba(0,0,0,0.05)", color: c.consent ? G : "#888", fontFamily: FM }}>
                      {c.consent ? "Soumis au consentement" : "Exempt de consentement"}
                    </span>
                  </div>
                  <Tag>{c.type}</Tag>
                  <p className="text-xs leading-relaxed mt-2" style={{ fontFamily: FI, color: BODY }}>{c.finalite}</p>
                </div>
              ))}
            </div>
            <P>
              Vous pouvez à tout moment modifier vos préférences via le bandeau de consentement ou en
              supprimant les cookies de votre navigateur.
            </P>
          </div>

          <Hr />

          {/* 08 */}
          <div className="mb-12">
            <H2 n="08">Sécurité des données</H2>
            <P>
              GIRA SAS met en œuvre toutes les mesures techniques et organisationnelles appropriées pour garantir
              la sécurité, la confidentialité et l'intégrité de vos données personnelles, conformément à l'article
              32 du RGPD :
            </P>
            <Bullet items={[
              "Chiffrement SSL/TLS (HTTPS) sur l'ensemble du site et des échanges de données",
              "Hébergement sur infrastructure certifiée SOC 2 Type II (Vercel)",
              "Accès aux données limité aux seuls collaborateurs habilités (principe du moindre privilège)",
              "Limitation du débit des API (rate limiting) pour prévenir les abus",
              "Champ honeypot anti-spam sur les formulaires de contact",
              "Revue régulière des accès et des permissions",
              "Procédure de notification en cas de violation de données (72h — Art. 33 RGPD)",
            ]} />
          </div>

          <Hr />

          {/* 09 */}
          <div className="mb-12">
            <H2 n="09">Vos droits</H2>
            <P>
              Conformément au RGPD (Articles 15 à 22), vous disposez des droits suivants sur vos données personnelles
              traitées par GIRA SAS :
            </P>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {[
                { droit: "Droit d'accès", desc: "Obtenir confirmation que des données vous concernant sont traitées et en recevoir une copie.", ref: "Art. 15" },
                { droit: "Droit de rectification", desc: "Faire corriger des données inexactes ou incomplètes vous concernant.", ref: "Art. 16" },
                { droit: "Droit à l'effacement", desc: "Obtenir la suppression de vos données dans les cas prévus par la réglementation.", ref: "Art. 17" },
                { droit: "Droit à la portabilité", desc: "Recevoir vos données dans un format structuré, lisible et interopérable.", ref: "Art. 20" },
                { droit: "Droit d'opposition", desc: "Vous opposer à tout moment au traitement de vos données pour des raisons tenant à votre situation.", ref: "Art. 21" },
                { droit: "Droit à la limitation", desc: "Demander la suspension du traitement de vos données dans certains cas.", ref: "Art. 18" },
              ].map((d) => (
                <div key={d.droit} className="bg-white rounded-2xl p-5 shadow-sm border-l-4" style={{ borderLeftColor: G }}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold" style={{ fontFamily: FM, color: DARK }}>{d.droit}</h3>
                    <span className="text-[10px] font-semibold" style={{ fontFamily: FM, color: G }}>{d.ref}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ fontFamily: FI, color: BODY }}>{d.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/rgpd"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
                style={{ backgroundColor: G, color: DARK, fontFamily: FM }}>
                Comment exercer vos droits →
              </Link>
            </div>
          </div>

          <Hr />

          {/* 10 */}
          <div className="mb-12">
            <H2 n="10">Réclamation auprès de la CNIL</H2>
            <P>
              Si vous estimez que vos droits ne sont pas respectés ou que le traitement de vos données n'est pas
              conforme au RGPD, vous avez le droit d'introduire une réclamation auprès de l'autorité de contrôle
              compétente :
            </P>
            <div className="rounded-2xl bg-white shadow-sm p-6">
              <p className="font-bold text-sm mb-2" style={{ fontFamily: FM, color: DARK }}>
                Commission Nationale de l'Informatique et des Libertés (CNIL)
              </p>
              <p className="text-sm mb-1" style={{ fontFamily: FI, color: BODY }}>3 Place de Fontenoy — 75007 Paris</p>
              <p className="text-sm mb-1" style={{ fontFamily: FI, color: BODY }}>Tél. : +33 (0)1 53 73 22 22</p>
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: G, fontFamily: FI, fontSize: "0.875rem" }}>
                www.cnil.fr →
              </a>
            </div>
          </div>

          <Hr />

          {/* 11 */}
          <div className="mb-12">
            <H2 n="11">Modifications de la politique</H2>
            <P>
              GIRA SAS se réserve le droit de modifier la présente politique de confidentialité à tout moment pour
              refléter les évolutions légales, réglementaires ou opérationnelles. La date de dernière mise à jour
              est indiquée en haut de ce document.
            </P>
            <P>
              En cas de modification substantielle affectant vos droits, GIRA SAS s'engage à vous en informer
              par email (si vous nous avez fourni votre adresse) ou via un bandeau visible sur le site, au moins
              15 jours avant l'entrée en vigueur des modifications.
            </P>
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-8 mt-14 text-center" style={{ backgroundColor: DARK }}>
            <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ fontFamily: FM, color: "rgba(255,255,255,0.3)" }}>Vos droits sont une priorité</p>
            <p className="text-white font-bold text-lg mb-1" style={{ fontFamily: FM }}>Une question sur vos données ?</p>
            <p className="text-sm mb-5" style={{ fontFamily: FI, color: "rgba(255,255,255,0.45)" }}>
              Réponse assurée sous 30 jours (délai légal RGPD)
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:contact@gira-cf.com" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: G, fontFamily: FM }}>
                contact@gira-cf.com →
              </a>
              <Link href="/rgpd" className="text-sm" style={{ fontFamily: FI, color: "rgba(255,255,255,0.4)" }}>
                Voir tous vos droits →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
