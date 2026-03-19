"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight, ArrowUpRight, X, Check } from "lucide-react";

/* ─── Types ─── */
interface Highlight {
  value: string;
  label: string;
}
interface Secteur {
  id: string;
  label: string;
  tagline: string;
  description: string;
  services: string[];
  highlights: Highlight[];
  image: string;
}

/* ─── Data ─── */
const SECTEURS: Secteur[] = [
  {
    id: "gouvernement",
    label: "Portails Gouvernementaux",
    tagline: "La transformation numérique de l'État au service des citoyens africains",
    description:
      "GIRA conçoit et déploie des plateformes numériques souveraines pour les administrations publiques africaines. Nos solutions permettent aux citoyens d'accéder aux services publics en ligne, réduisent les délais administratifs et renforcent la transparence institutionnelle. De l'état civil aux marchés publics, nous accompagnons chaque ministère dans sa transition numérique avec une attention particulière à la souveraineté des données.",
    services: [
      "Portails de services citoyens multilingues et entièrement accessibles",
      "Dématérialisation des procédures administratives, fiscales et civiles",
      "Systèmes d'identité numérique et d'authentification sécurisée pour agents et citoyens",
      "Intégration aux bases de données nationales et registres d'État",
      "Formation des agents publics et conduite du changement organisationnel",
    ],
    highlights: [
      { value: "15+", label: "Ministères accompagnés" },
      { value: "3M+", label: "Usagers digitalisés" },
      { value: "60%", label: "Délais administratifs réduits" },
    ],
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "applications",
    label: "Applications Web & Mobile",
    tagline: "Des solutions numériques sur mesure du concept à la mise en production",
    description:
      "GIRA développe des applications web et mobiles pour les entreprises, les institutions et les organisations souhaitant digitaliser leurs opérations. Notre approche couvre l'ensemble du cycle de développement, de la conception UX à la mise en production, avec des standards internationaux de qualité, de sécurité et de performance adaptés aux contextes africains.",
    services: [
      "Applications web responsive avec React, Next.js et Vue.js",
      "Applications mobiles iOS et Android natives ou cross-platform (React Native, Flutter)",
      "Plateformes SaaS et outils de gestion métier (ERP, CRM, HRMS)",
      "Architecture microservices et intégration d'API tierces",
      "Maintenance applicative, hébergement cloud et support technique continu",
    ],
    highlights: [
      { value: "50+", label: "Applications livrées" },
      { value: "4", label: "Pays couverts" },
      { value: "99.9%", label: "Disponibilité garantie" },
    ],
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "ia",
    label: "Intelligence Artificielle",
    tagline: "L'IA au service des décisions stratégiques et de l'inclusion numérique",
    description:
      "L'intelligence artificielle est un levier stratégique pour les institutions africaines. GIRA développe des solutions IA sur mesure adaptées aux contextes locaux : chatbots multilingues incluant les langues nationales, systèmes d'aide à la décision pour les politiques publiques, analyse prédictive pour la planification sectorielle. Chaque solution intègre les principes d'une gouvernance éthique et d'une souveraineté totale des données.",
    services: [
      "Chatbots institutionnels multilingues incluant les langues nationales africaines",
      "Systèmes d'aide à la décision pour ministères et agences publiques",
      "Analyse prédictive appliquée à la santé, l'agriculture et la sécurité publique",
      "Traitement automatique du langage naturel et reconnaissance documentaire",
      "Audit et gouvernance éthique de l'IA pour les organisations publiques et privées",
    ],
    highlights: [
      { value: "12", label: "Modèles IA déployés" },
      { value: "8", label: "Langues supportées" },
      { value: "40%", label: "Gains de productivité moyens" },
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "connectivite",
    label: "Connectivité & Internet",
    tagline: "Briser la fracture numérique en connectant les communautés les plus isolées",
    description:
      "La fracture numérique reste l'un des principaux obstacles au développement en Afrique. GIRA déploie des solutions de connectivité innovantes pour les zones rurales et périurbaines : hotspots Starlink communautaires, points relais WiFi, infrastructures réseau pour collectivités. Notre approche combine technologie satellitaire de pointe et modèles économiques adaptés aux réalités locales pour garantir un accès internet abordable et durable.",
    services: [
      "Déploiement de hotspots Starlink communautaires et points relais WiFi",
      "Conception d'infrastructures réseau pour collectivités et zones rurales",
      "Modélisation économique de la connectivité en zones à faible densité de population",
      "Partenariats stratégiques avec opérateurs télécoms et autorités de régulation",
      "Formation et autonomisation des communautés locales dans la gestion des infrastructures",
    ],
    highlights: [
      { value: "200+", label: "Hotspots déployés" },
      { value: "500K", label: "Bénéficiaires connectés" },
      { value: "12", label: "Régions couvertes" },
    ],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "securite",
    label: "Communication Sécurisée",
    tagline: "Protéger les échanges institutionnels dans un monde connecté et vulnérable",
    description:
      "À l'ère de la cybersécurité, les institutions africaines sont des cibles prioritaires. GIRA conçoit des systèmes de communication sécurisée pour les gouvernements, les ambassades et les organisations internationales : canaux chiffrés de bout en bout, VPN institutionnels, protocoles anti-écoute et messageries souveraines conformes aux normes diplomatiques internationales.",
    services: [
      "Déploiement de canaux de communication chiffrés de bout en bout (AES-256)",
      "VPN institutionnels et réseaux privés dédiés pour ambassades et consulats",
      "Messageries souveraines sécurisées conformes aux normes diplomatiques",
      "Audit de sécurité des systèmes d'information et tests d'intrusion",
      "Formation des équipes gouvernementales à la cybersécurité opérationnelle",
    ],
    highlights: [
      { value: "20+", label: "Institutions sécurisées" },
      { value: "0", label: "Incident de sécurité enregistré" },
      { value: "AES-256", label: "Standard de chiffrement" },
    ],
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "finance",
    label: "Banques & Finance",
    tagline: "Moderniser l'infrastructure financière africaine pour une inclusion totale",
    description:
      "Le secteur financier africain connaît une transformation accélérée portée par le mobile money, les néobanques et la régulation prudentielle. GIRA accompagne les institutions financières dans la modernisation de leurs systèmes de core banking, le développement de solutions de paiement mobile et la mise en conformité réglementaire KYC/AML pour une inclusion financière à grande échelle.",
    services: [
      "Migration et déploiement de systèmes core banking nouvelle génération",
      "Développement de plateformes de paiement mobile et portefeuilles numériques",
      "Conformité réglementaire KYC/AML et intégration aux systèmes de supervision",
      "Portails clients digitaux et applications bancaires mobiles sécurisées",
      "Conseil en transformation digitale des banques centrales et établissements commerciaux",
    ],
    highlights: [
      { value: "8", label: "Institutions financières accompagnées" },
      { value: "2M+", label: "Transactions traitées par mois" },
      { value: "30%", label: "Réduction des coûts opérationnels" },
    ],
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "sante",
    label: "Santé Digitale",
    tagline: "Numériser les systèmes de santé pour des soins accessibles et de qualité",
    description:
      "GIRA intervient dans la digitalisation des systèmes de santé publique africains : dossiers patients numériques, systèmes d'information hospitaliers, plateformes de télémédecine et outils de traçabilité pharmaceutique. Nos solutions améliorent l'accès aux soins dans les zones les plus éloignées et renforcent la capacité de réponse aux crises sanitaires.",
    services: [
      "Systèmes d'information hospitaliers (SIH) et dossiers patients électroniques",
      "Plateformes de télémédecine et consultation médicale à distance pour zones rurales",
      "Outils de traçabilité pharmaceutique et lutte contre les médicaments falsifiés",
      "Tableaux de bord épidémiologiques pour les ministères de la Santé",
      "Applications de santé communautaire pour agents et relais de terrain",
    ],
    highlights: [
      { value: "10", label: "Hôpitaux numérisés" },
      { value: "50K", label: "Patients suivis numériquement" },
      { value: "5", label: "Pays d'intervention" },
    ],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "agriculture",
    label: "Agriculture & Tracabilité",
    tagline: "Digitaliser la chaîne agricole pour une production durable et transparente",
    description:
      "L'agriculture représente plus de 60% des emplois en Afrique subsaharienne. GIRA développe des solutions numériques pour moderniser les filières agricoles : plateformes AgriTech pour les coopératives, outils de traçabilité de la chaîne d'approvisionnement, applications de conseil agronomique pour les agriculteurs et systèmes de collecte de données pour les décideurs publics.",
    services: [
      "Plateformes numériques de gestion des coopératives et organisations paysannes",
      "Systèmes de traçabilité des filières certifiées (cacao, café, coton, arachide)",
      "Applications mobiles de conseil agronomique et prévisions météo locales",
      "Marchés numériques reliant directement producteurs et acheteurs institutionnels",
      "Outils de collecte de données terrain pour les ministères de l'Agriculture",
    ],
    highlights: [
      { value: "15K", label: "Agriculteurs connectés" },
      { value: "8", label: "Filières tracées et certifiées" },
      { value: "+25%", label: "Revenu agricole supplémentaire" },
    ],
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=85&auto=format&fit=crop",
  },
];

/* ─── Drawer Component ─── */
function SecteurDrawer({
  secteur,
  onClose,
}: {
  secteur: Secteur;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex justify-end"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 38 }}
        className="relative w-full max-w-2xl h-full overflow-y-auto flex-shrink-0"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{
            backgroundColor: "rgba(201,168,76,0.12)",
            color: "#C9A84C",
            border: "1px solid rgba(201,168,76,0.25)",
          }}
        >
          <X size={16} />
        </button>

        {/* Image header */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={secteur.image}
            alt={secteur.label}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #0D0D0D 0%, rgba(13,13,13,0.35) 55%, transparent 100%)",
            }}
          />
        </div>

        {/* Body */}
        <div className="px-8 pb-14 -mt-6 relative">
          {/* Badge */}
          <span
            className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full mb-5"
            style={{
              backgroundColor: "rgba(201,168,76,0.12)",
              color: "#C9A84C",
              border: "1px solid rgba(201,168,76,0.25)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Secteur d&apos;intervention
          </span>

          <h2
            className="text-3xl font-black text-white mb-2 leading-tight"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {secteur.label}
          </h2>

          <p
            className="text-base mb-7"
            style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
          >
            {secteur.tagline}
          </p>

          <div
            className="h-px mb-7"
            style={{ backgroundColor: "rgba(201,168,76,0.18)" }}
          />

          <p
            className="text-sm leading-relaxed mb-9"
            style={{ color: "#AAAAAA", fontFamily: "var(--font-inter)" }}
          >
            {secteur.description}
          </p>

          {/* Services */}
          <h3
            className="text-xs font-bold uppercase tracking-widest mb-5"
            style={{ color: "#C9A84C", fontFamily: "var(--font-montserrat)" }}
          >
            Nos prestations
          </h3>
          <ul className="space-y-3 mb-10">
            {secteur.services.map((srv, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check
                  size={13}
                  className="mt-0.5 shrink-0"
                  style={{ color: "#C9A84C" }}
                />
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: "#DDDDDD", fontFamily: "var(--font-inter)" }}
                >
                  {srv}
                </span>
              </li>
            ))}
          </ul>

          {/* Highlights */}
          <div
            className="grid grid-cols-3 gap-4 p-6 rounded-2xl mb-10"
            style={{
              backgroundColor: "rgba(201,168,76,0.04)",
              border: "1px solid rgba(201,168,76,0.14)",
            }}
          >
            {secteur.highlights.map((h, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-2xl font-black leading-none"
                  style={{ color: "#C9A84C", fontFamily: "var(--font-montserrat)" }}
                >
                  {h.value}
                </div>
                <div
                  className="text-xs mt-2 leading-snug"
                  style={{ color: "#666666", fontFamily: "var(--font-inter)" }}
                >
                  {h.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={`/contact?secteur=${secteur.id}`}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            style={{
              backgroundColor: "#C9A84C",
              color: "#0D0D0D",
              fontFamily: "var(--font-inter)",
            }}
          >
            Discuter d&apos;un projet dans ce secteur
            <ArrowRight size={15} />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Page ─── */
export default function SecteursPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedSecteur = SECTEURS.find((s) => s.id === selectedId) ?? null;
  const openDrawer = useCallback((id: string) => setSelectedId(id), []);
  const closeDrawer = useCallback(() => setSelectedId(null), []);

  return (
    <>
      {/* ── HERO ── */}
      <section
        id="overview"
        className="relative flex items-end min-h-[52vh] pt-32 pb-16 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 0% 100%, rgba(201,168,76,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 w-full">
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-1 mb-5">
            <Link
              href="/"
              className="text-xs uppercase tracking-widest transition-colors duration-200 hover:text-white"
              style={{ color: "rgba(201,168,76,0.7)", fontFamily: "var(--font-inter)" }}
            >
              Accueil
            </Link>
            <ChevronRight size={12} style={{ color: "rgba(201,168,76,0.5)" }} />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
            >
              Secteurs
            </span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Secteurs d&apos;Intervention
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
          >
            8 domaines stratégiques. Une exécution sans compromis pour la transformation numérique de l&apos;Afrique.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 h-[2px] w-16 origin-left"
            style={{ backgroundColor: "#C9A84C" }}
          />
        </div>
      </section>

      {/* ── GRILLE 8 CARDS ── */}
      <section
        id="domaines"
        className="py-20 md:py-32"
        style={{ backgroundColor: "#F5F5F0" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-widest text-center mb-3"
            style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
          >
            Nos domaines d&apos;expertise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold text-center mb-4"
            style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}
          >
            Du portail gouvernemental à la fintech
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-base md:text-lg mb-14 max-w-2xl mx-auto"
            style={{ color: "#444444", fontFamily: "var(--font-inter)" }}
          >
            Cliquez sur un secteur pour découvrir nos prestations détaillées et nos références.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SECTEURS.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ scale: 1.03 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openDrawer(s.id)}
              >
                <Image
                  src={s.image}
                  alt={`Secteur ${s.label}`}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.35) 50%, rgba(13,13,13,0.1) 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-300 group-hover:-translate-y-2">
                  <h3
                    className="text-base font-bold text-white mb-1.5"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {s.label}
                  </h3>
                  <p
                    className="text-xs leading-relaxed max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100"
                    style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
                  >
                    {s.tagline}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold mt-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
                  >
                    En savoir plus
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8 SECTIONS DÉTAIL (alternées) ── */}
      {SECTEURS.map((s, idx) => {
        const isDark = idx % 2 !== 0;
        return (
          <section
            key={s.id}
            id={s.id}
            className="py-20 md:py-28"
            style={{ backgroundColor: isDark ? "#0D0D0D" : "#F5F5F0" }}
          >
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col gap-12 md:gap-16 ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center`}
              >
                {/* Image */}
                <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.label}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%)",
                    }}
                  />
                  {/* Number badge */}
                  <div
                    className="absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center text-xs font-black"
                    style={{
                      backgroundColor: "rgba(201,168,76,0.85)",
                      color: "#0D0D0D",
                      fontFamily: "var(--font-montserrat)",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2">
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
                  >
                    Secteur {String(idx + 1).padStart(2, "0")} / 08
                  </p>
                  <h2
                    className="text-2xl md:text-3xl font-black mb-3 leading-tight"
                    style={{
                      color: isDark ? "#FFFFFF" : "#0D0D0D",
                      fontFamily: "var(--font-montserrat)",
                    }}
                  >
                    {s.label}
                  </h2>
                  <p
                    className="text-base font-medium mb-5"
                    style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
                  >
                    {s.tagline}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-7"
                    style={{
                      color: isDark ? "#AAAAAA" : "#444444",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    {s.description}
                  </p>

                  {/* Services preview */}
                  <ul className="space-y-2.5 mb-8">
                    {s.services.slice(0, 3).map((srv, si) => (
                      <li
                        key={si}
                        className="flex items-start gap-3 text-sm"
                        style={{
                          color: isDark ? "#CCCCCC" : "#444444",
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        <span
                          className="mt-1.5 block w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: "#C9A84C" }}
                        />
                        {srv}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => openDrawer(s.id)}
                    className="inline-flex items-center gap-2 text-sm font-semibold group transition-colors duration-200"
                    style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
                  >
                    Voir toutes les prestations
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* ── CTA FINAL ── */}
      <section className="py-20 md:py-32" style={{ backgroundColor: "#1A1A2E" }}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
          >
            Un projet à concrétiser ?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Votre secteur figure parmi nos domaines d&apos;expertise.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base md:text-lg mb-10 max-w-xl mx-auto"
            style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
          >
            Parlons-en. GIRA met à votre disposition une équipe d&apos;experts pour transformer votre vision en réalité numérique.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl transition-all duration-200 hover:brightness-110 hover:shadow-2xl"
              style={{
                backgroundColor: "#C9A84C",
                color: "#0D0D0D",
                fontFamily: "var(--font-inter)",
              }}
            >
              Nous contacter
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── DRAWER MODAL ── */}
      <AnimatePresence>
        {selectedSecteur && (
          <SecteurDrawer secteur={selectedSecteur} onClose={closeDrawer} />
        )}
      </AnimatePresence>
    </>
  );
}
