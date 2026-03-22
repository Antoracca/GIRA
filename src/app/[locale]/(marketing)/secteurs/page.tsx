"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  X,
  Check,
  Landmark,
  Code2,
  BrainCircuit,
  Wifi,
  ShieldCheck,
  Database,
  HeartPulse,
  Sprout,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────── */
interface Highlight { value: string; label: string; }
interface Secteur {
  id: string;
  label: string;
  tagline: string;
  description: string;
  services: string[];
  highlights: Highlight[];
  image: string;
  Icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
}

interface DrawerStrings {
  badge: string;
  services: string;
  cta: string;
  closeLabel: string;
}

interface PageData {
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  heroEyebrow: string;
  heroLine1: string;
  heroLine2: string;
  heroSubtitle: string;
  prestationsLabel: (count: number) => string;
  statsEyebrow: string;
  stats: { value: string; label: string; sub: string }[];
  ctaEyebrow: string;
  ctaHeading: string;
  ctaBody: string;
  ctaContact: string;
  ctaServices: string;
  drawer: DrawerStrings;
}

/* ─── Tokens ─────────────────────────────────────────────────── */
const GOLD = "#C9A84C";
const DARK = "#0D0D0D";
const BODY = "#444444";

/* ─── Locale-keyed sector data ──────────────────────────────── */
const SECTEURS_DATA: Record<"fr" | "en", Secteur[]> = {
  fr: [
    {
      id: "gouvernement",
      label: "Portails Gouvernementaux",
      tagline: "La transformation numérique de l'État au service des citoyens africains",
      description:
        "GIRA conçoit et déploie des plateformes numériques souveraines pour les administrations publiques africaines. Nos solutions permettent aux citoyens d'accéder aux services publics en ligne, réduisent les délais administratifs et renforcent la transparence institutionnelle.",
      services: [
        "Portails de services citoyens multilingues et entièrement accessibles",
        "Dématérialisation des procédures administratives, fiscales et civiles",
        "Systèmes d'identité numérique et d'authentification sécurisée",
        "Intégration aux bases de données nationales et registres d'État",
        "Formation des agents publics et conduite du changement organisationnel",
      ],
      highlights: [
        { value: "15+", label: "Ministères accompagnés" },
        { value: "3M+", label: "Usagers digitalisés" },
        { value: "60%", label: "Délais administratifs réduits" },
      ],
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=85&auto=format&fit=crop",
      Icon: Landmark,
    },
    {
      id: "applications",
      label: "Applications Web & Mobile",
      tagline: "Des solutions numériques sur mesure du concept à la mise en production",
      description:
        "GIRA développe des applications web et mobiles pour les entreprises, les institutions et les organisations souhaitant digitaliser leurs opérations. Notre approche couvre l'ensemble du cycle de développement, de la conception UX à la mise en production.",
      services: [
        "Applications web responsive avec React, Next.js et Vue.js",
        "Applications mobiles iOS et Android (React Native, Flutter)",
        "Plateformes SaaS et outils de gestion métier (ERP, CRM, HRMS)",
        "Architecture microservices et intégration d'API tierces",
        "Maintenance applicative, hébergement cloud et support continu",
      ],
      highlights: [
        { value: "50+", label: "Applications livrées" },
        { value: "4", label: "Pays couverts" },
        { value: "99.9%", label: "Disponibilité garantie" },
      ],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=85&auto=format&fit=crop",
      Icon: Code2,
    },
    {
      id: "ia",
      label: "Intelligence Artificielle",
      tagline: "L'IA au service des décisions stratégiques et de l'inclusion numérique",
      description:
        "L'intelligence artificielle est un levier stratégique pour les institutions africaines. GIRA développe des solutions IA sur mesure : chatbots multilingues, systèmes d'aide à la décision pour les politiques publiques, analyse prédictive pour la planification sectorielle.",
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
        { value: "40%", label: "Gains de productivité" },
      ],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85&auto=format&fit=crop",
      Icon: BrainCircuit,
    },
    {
      id: "connectivite",
      label: "Connectivité & Internet",
      tagline: "Briser la fracture numérique en connectant les communautés les plus isolées",
      description:
        "La fracture numérique reste l'un des principaux obstacles au développement en Afrique. GIRA déploie des solutions de connectivité innovantes pour les zones rurales et périurbaines, combinant technologie satellitaire de pointe et modèles économiques adaptés aux réalités locales.",
      services: [
        "Déploiement de hotspots Starlink communautaires et points relais WiFi",
        "Conception d'infrastructures réseau pour collectivités et zones rurales",
        "Modélisation économique de la connectivité en zones à faible densité",
        "Partenariats avec opérateurs télécoms et autorités de régulation",
        "Formation et autonomisation des communautés locales",
      ],
      highlights: [
        { value: "200+", label: "Hotspots déployés" },
        { value: "500K", label: "Bénéficiaires connectés" },
        { value: "12", label: "Régions couvertes" },
      ],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85&auto=format&fit=crop",
      Icon: Wifi,
    },
    {
      id: "securite",
      label: "Communication Sécurisée",
      tagline: "Protéger les échanges institutionnels dans un monde connecté et vulnérable",
      description:
        "Les institutions africaines sont des cibles prioritaires de cybermenaces croissantes. GIRA conçoit des systèmes de communication sécurisée pour les gouvernements, ambassades et organisations internationales, avec des standards diplomatiques de grade gouvernemental.",
      services: [
        "Canaux de communication chiffrés de bout en bout (AES-256)",
        "VPN institutionnels et réseaux privés dédiés pour ambassades et consulats",
        "Messageries souveraines sécurisées conformes aux normes diplomatiques",
        "Audit de sécurité des systèmes d'information et tests d'intrusion",
        "Formation des équipes gouvernementales à la cybersécurité opérationnelle",
      ],
      highlights: [
        { value: "20+", label: "Institutions sécurisées" },
        { value: "0", label: "Incident enregistré" },
        { value: "AES-256", label: "Standard de chiffrement" },
      ],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=85&auto=format&fit=crop",
      Icon: ShieldCheck,
    },
    {
      id: "systemes",
      label: "ERP & Systèmes d'Information",
      tagline: "Intégration de solutions clés en main pour entreprises et institutions publiques",
      description:
        "GIRA accompagne entreprises et institutions publiques dans le déploiement de systèmes d'information structurants : ERP intégrés, bases de données gouvernementales, outils statistiques et plateformes d'évaluation orientées résultats.",
      services: [
        "Intégration et déploiement de solutions ERP clés en main",
        "Systèmes d'information d'État et bases de données centralisées",
        "Tableaux de bord statistiques et outils de pilotage décisionnel",
        "Plateformes d'évaluation, de suivi et de reporting institutionnel",
        "Interopérabilité entre systèmes existants et nouvelles architectures",
      ],
      highlights: [
        { value: "25+", label: "SI déployés" },
        { value: "6", label: "Pays d'intervention" },
        { value: "100%", label: "Projets livrés dans les délais" },
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85&auto=format&fit=crop",
      Icon: Database,
    },
    {
      id: "sante",
      label: "Santé Digitale",
      tagline: "Numériser les systèmes de santé pour des soins accessibles et de qualité",
      description:
        "GIRA intervient dans la digitalisation des systèmes de santé publique africains : dossiers patients numériques, systèmes d'information hospitaliers, plateformes de télémédecine et outils de traçabilité pharmaceutique.",
      services: [
        "Systèmes d'information hospitaliers (SIH) et dossiers patients électroniques",
        "Plateformes de télémédecine pour zones rurales",
        "Traçabilité pharmaceutique et lutte contre les médicaments falsifiés",
        "Tableaux de bord épidémiologiques pour les ministères de la Santé",
        "Applications de santé communautaire pour agents et relais de terrain",
      ],
      highlights: [
        { value: "10", label: "Hôpitaux numérisés" },
        { value: "50K", label: "Patients suivis" },
        { value: "5", label: "Pays d'intervention" },
      ],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=85&auto=format&fit=crop",
      Icon: HeartPulse,
    },
    {
      id: "agriculture",
      label: "Agriculture & Traçabilité",
      tagline: "Digitaliser la chaîne agricole pour une production durable et transparente",
      description:
        "L'agriculture représente plus de 60% des emplois en Afrique subsaharienne. GIRA développe des solutions numériques pour moderniser les filières agricoles : plateformes AgriTech, traçabilité de la chaîne d'approvisionnement, conseil agronomique digital.",
      services: [
        "Plateformes numériques de gestion des coopératives et organisations paysannes",
        "Traçabilité des filières certifiées (cacao, café, coton, arachide)",
        "Applications mobiles de conseil agronomique et prévisions météo locales",
        "Marchés numériques reliant directement producteurs et acheteurs institutionnels",
        "Outils de collecte de données terrain pour les ministères de l'Agriculture",
      ],
      highlights: [
        { value: "15K", label: "Agriculteurs connectés" },
        { value: "8", label: "Filières tracées" },
        { value: "+25%", label: "Revenu agricole supplémentaire" },
      ],
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=85&auto=format&fit=crop",
      Icon: Sprout,
    },
  ],
  en: [
    {
      id: "gouvernement",
      label: "Government Portals",
      tagline: "Digital transformation of the state in service of African citizens",
      description:
        "GIRA designs and deploys sovereign digital platforms for African public administrations. Our solutions allow citizens to access public services online, reduce administrative delays and strengthen institutional transparency.",
      services: [
        "Multilingual, fully accessible citizen service portals",
        "Digitization of administrative, tax and civil procedures",
        "Digital identity and secure authentication systems",
        "Integration with national databases and state registries",
        "Training of public servants and organizational change management",
      ],
      highlights: [
        { value: "15+", label: "Ministries supported" },
        { value: "3M+", label: "Digitized users" },
        { value: "60%", label: "Administrative delays reduced" },
      ],
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=85&auto=format&fit=crop",
      Icon: Landmark,
    },
    {
      id: "applications",
      label: "Web & Mobile Applications",
      tagline: "Custom digital solutions from concept to production",
      description:
        "GIRA develops web and mobile applications for companies, institutions and organizations seeking to digitize their operations. Our approach covers the entire development cycle, from UX design to production deployment.",
      services: [
        "Responsive web applications with React, Next.js and Vue.js",
        "iOS and Android mobile applications (React Native, Flutter)",
        "SaaS platforms and business management tools (ERP, CRM, HRMS)",
        "Microservices architecture and third-party API integration",
        "Application maintenance, cloud hosting and ongoing support",
      ],
      highlights: [
        { value: "50+", label: "Applications delivered" },
        { value: "4", label: "Countries covered" },
        { value: "99.9%", label: "Guaranteed uptime" },
      ],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=85&auto=format&fit=crop",
      Icon: Code2,
    },
    {
      id: "ia",
      label: "Artificial Intelligence",
      tagline: "AI in service of strategic decisions and digital inclusion",
      description:
        "Artificial intelligence is a strategic lever for African institutions. GIRA develops custom AI solutions: multilingual chatbots, decision support systems for public policies, predictive analytics for sector planning.",
      services: [
        "Multilingual institutional chatbots including African national languages",
        "Decision support systems for ministries and public agencies",
        "Predictive analytics applied to health, agriculture and public safety",
        "Natural language processing and document recognition",
        "AI audit and ethical governance for public and private organizations",
      ],
      highlights: [
        { value: "12", label: "AI models deployed" },
        { value: "8", label: "Languages supported" },
        { value: "40%", label: "Productivity gains" },
      ],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85&auto=format&fit=crop",
      Icon: BrainCircuit,
    },
    {
      id: "connectivite",
      label: "Connectivity & Internet",
      tagline: "Breaking the digital divide by connecting the most isolated communities",
      description:
        "The digital divide remains one of the main obstacles to development in Africa. GIRA deploys innovative connectivity solutions for rural and peri-urban areas, combining cutting-edge satellite technology with economic models adapted to local realities.",
      services: [
        "Deployment of community Starlink hotspots and WiFi relay points",
        "Network infrastructure design for communities and rural areas",
        "Economic modeling of connectivity in low-density areas",
        "Partnerships with telecom operators and regulatory authorities",
        "Training and empowerment of local communities",
      ],
      highlights: [
        { value: "200+", label: "Hotspots deployed" },
        { value: "500K", label: "Connected beneficiaries" },
        { value: "12", label: "Regions covered" },
      ],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85&auto=format&fit=crop",
      Icon: Wifi,
    },
    {
      id: "securite",
      label: "Secure Communication",
      tagline: "Protecting institutional exchanges in a connected and vulnerable world",
      description:
        "African institutions are priority targets of growing cyber threats. GIRA designs secure communication systems for governments, embassies and international organizations, with government-grade diplomatic standards.",
      services: [
        "End-to-end encrypted communication channels (AES-256)",
        "Institutional VPNs and dedicated private networks for embassies and consulates",
        "Secure sovereign messaging compliant with diplomatic standards",
        "Information system security audits and penetration testing",
        "Training of government teams in operational cybersecurity",
      ],
      highlights: [
        { value: "20+", label: "Secured institutions" },
        { value: "0", label: "Recorded incident" },
        { value: "AES-256", label: "Encryption standard" },
      ],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=85&auto=format&fit=crop",
      Icon: ShieldCheck,
    },
    {
      id: "systemes",
      label: "ERP & Information Systems",
      tagline: "Turnkey solution integration for businesses and public institutions",
      description:
        "GIRA supports companies and public institutions in deploying structural information systems: integrated ERPs, government databases, statistical tools and results-oriented evaluation platforms.",
      services: [
        "Integration and deployment of turnkey ERP solutions",
        "State information systems and centralized databases",
        "Statistical dashboards and decision management tools",
        "Evaluation, monitoring and institutional reporting platforms",
        "Interoperability between existing systems and new architectures",
      ],
      highlights: [
        { value: "25+", label: "IS deployed" },
        { value: "6", label: "Intervention countries" },
        { value: "100%", label: "Projects delivered on time" },
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85&auto=format&fit=crop",
      Icon: Database,
    },
    {
      id: "sante",
      label: "Digital Health",
      tagline: "Digitizing health systems for accessible, quality care",
      description:
        "GIRA intervenes in the digitalization of African public health systems: digital patient records, hospital information systems, telemedicine platforms and pharmaceutical traceability tools.",
      services: [
        "Hospital information systems (HIS) and electronic patient records",
        "Telemedicine platforms for rural areas",
        "Pharmaceutical traceability and anti-counterfeiting",
        "Epidemiological dashboards for health ministries",
        "Community health applications for field agents and health workers",
      ],
      highlights: [
        { value: "10", label: "Digitized hospitals" },
        { value: "50K", label: "Patients monitored" },
        { value: "5", label: "Intervention countries" },
      ],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=85&auto=format&fit=crop",
      Icon: HeartPulse,
    },
    {
      id: "agriculture",
      label: "Agriculture & Traceability",
      tagline: "Digitalizing the agricultural chain for sustainable and transparent production",
      description:
        "Agriculture represents more than 60% of jobs in sub-Saharan Africa. GIRA develops digital solutions to modernize agricultural sectors: AgriTech platforms, supply chain traceability, digital agronomic advisory.",
      services: [
        "Digital management platforms for cooperatives and farmers' organizations",
        "Traceability of certified supply chains (cocoa, coffee, cotton, groundnut)",
        "Mobile applications for agronomic advisory and local weather forecasts",
        "Digital markets directly connecting producers and institutional buyers",
        "Field data collection tools for agriculture ministries",
      ],
      highlights: [
        { value: "15K", label: "Connected farmers" },
        { value: "8", label: "Traced supply chains" },
        { value: "+25%", label: "Additional agricultural income" },
      ],
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=85&auto=format&fit=crop",
      Icon: Sprout,
    },
  ],
};

/* ─── Page-level string data ────────────────────────────────── */
const PAGE_DATA: Record<"fr" | "en", PageData> = {
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbCurrent: "Secteurs",
    heroEyebrow: "Domaines d'expertise",
    heroLine1: "Secteurs",
    heroLine2: "d'Intervention",
    heroSubtitle:
      "8 domaines stratégiques. Des expertises ciblées, au service de projets concrets qui transforment durablement l'Afrique.",
    prestationsLabel: (count) => `${count} prestations`,
    statsEyebrow: "Nos résultats en chiffres",
    stats: [
      { value: "45+", label: "Experts mobilisés", sub: "profils séniors et spécialisés" },
      { value: "3", label: "Pays de présence", sub: "Paris · Marrakech · Bratislava" },
      { value: "8", label: "Secteurs couverts", sub: "de la santé aux télécoms" },
      { value: "100%", label: "Projets livrés", sub: "dans les délais contractuels" },
    ],
    ctaEyebrow: "Un projet à concrétiser ?",
    ctaHeading: "Votre secteur figure parmi nos domaines d'expertise.",
    ctaBody:
      "GIRA met à votre disposition une équipe d'experts pour transformer votre vision en réalité concrète.",
    ctaContact: "Nous contacter",
    ctaServices: "Découvrir nos services",
    drawer: {
      badge: "Secteur d'intervention",
      services: "Nos prestations",
      cta: "Discuter d'un projet dans ce secteur",
      closeLabel: "Fermer",
    },
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Sectors",
    heroEyebrow: "Areas of Expertise",
    heroLine1: "Intervention",
    heroLine2: "Sectors",
    heroSubtitle:
      "8 strategic domains. Targeted expertise, in service of concrete projects that sustainably transform Africa.",
    prestationsLabel: (count) => `${count} services`,
    statsEyebrow: "Our results in numbers",
    stats: [
      { value: "45+", label: "Mobilized experts", sub: "senior and specialized profiles" },
      { value: "3", label: "Countries of presence", sub: "Paris · Marrakech · Bratislava" },
      { value: "8", label: "Sectors covered", sub: "from health to telecoms" },
      { value: "100%", label: "Projects delivered", sub: "within contractual deadlines" },
    ],
    ctaEyebrow: "A project to bring to life?",
    ctaHeading: "Your sector is among our areas of expertise.",
    ctaBody:
      "GIRA places a team of experts at your disposal to transform your vision into concrete reality.",
    ctaContact: "Contact us",
    ctaServices: "Discover our services",
    drawer: {
      badge: "Intervention Sector",
      services: "Our services",
      cta: "Discuss a project in this sector",
      closeLabel: "Close",
    },
  },
};

/* ─── Drawer ─────────────────────────────────────────────────── */
function SecteurDrawer({
  secteur,
  onClose,
  drawerStrings,
}: {
  secteur: Secteur;
  onClose: () => void;
  drawerStrings: DrawerStrings;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handleKey); };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex justify-end"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 38 }}
        className="relative w-full max-w-2xl h-full overflow-y-auto flex-shrink-0 bg-white"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label={drawerStrings.closeLabel}
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center border transition-colors duration-200 hover:bg-neutral-100"
          style={{ borderColor: "#E0E0E0", color: DARK }}
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
            sizes="672px"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.1) 60%, transparent 100%)" }}
          />
        </div>

        {/* Body */}
        <div className="px-8 pb-14 -mt-4 relative">
          {/* Badge */}
          <span
            className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full mb-5 border"
            style={{ backgroundColor: `${GOLD}12`, color: GOLD, borderColor: `${GOLD}30`, fontFamily: "var(--font-inter)" }}
          >
            {drawerStrings.badge}
          </span>

          <h2
            className="text-3xl font-black mb-2 leading-tight"
            style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}
          >
            {secteur.label}
          </h2>

          <p className="text-base mb-6" style={{ color: GOLD, fontFamily: "var(--font-inter)" }}>
            {secteur.tagline}
          </p>

          <div className="h-px mb-6" style={{ backgroundColor: "#E8E8E8" }} />

          <p
            className="text-sm leading-relaxed mb-8"
            style={{ color: BODY, fontFamily: "var(--font-inter)" }}
          >
            {secteur.description}
          </p>

          {/* Services */}
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: GOLD, fontFamily: "var(--font-montserrat)" }}
          >
            {drawerStrings.services}
          </p>
          <ul className="space-y-3 mb-10">
            {secteur.services.map((srv, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check size={13} className="mt-0.5 shrink-0" style={{ color: GOLD }} />
                <span className="text-sm leading-relaxed" style={{ color: BODY, fontFamily: "var(--font-inter)" }}>
                  {srv}
                </span>
              </li>
            ))}
          </ul>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-px bg-neutral-200 rounded-xl overflow-hidden mb-10">
            {secteur.highlights.map((h, i) => (
              <div key={i} className="bg-white p-5 text-center">
                <div className="text-2xl font-black leading-none mb-1" style={{ color: GOLD, fontFamily: "var(--font-montserrat)" }}>
                  {h.value}
                </div>
                <div className="text-xs leading-snug" style={{ color: "#888", fontFamily: "var(--font-inter)" }}>
                  {h.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href={`/contact?secteur=${secteur.id}`}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:brightness-110"
            style={{ backgroundColor: GOLD, color: DARK, fontFamily: "var(--font-inter)" }}
          >
            {drawerStrings.cta}
            <ArrowRight size={15} />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function SecteursPage() {
  const rawLocale = useLocale();
  const locale: "fr" | "en" = rawLocale === "en" ? "en" : "fr";

  const secteurs = SECTEURS_DATA[locale];
  const pd = PAGE_DATA[locale];

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedSecteur = secteurs.find((s) => s.id === selectedId) ?? null;
  const openDrawer = useCallback((id: string) => setSelectedId(id), []);
  const closeDrawer = useCallback(() => setSelectedId(null), []);

  return (
    <>
      {/* ── HERO — style BCG: fond clair, typo noire géante ── */}
      <section
        className="pt-36 pb-20 md:pt-44 md:pb-28"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
          {/* Fil d'Ariane */}
          <nav className="flex items-center gap-1.5 mb-10">
            <Link
              href="/"
              className="text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: "#999999", fontFamily: "var(--font-inter)" }}
            >
              {pd.breadcrumbHome}
            </Link>
            <ChevronRight size={11} style={{ color: "#CCCCCC" }} />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
            >
              {pd.breadcrumbCurrent}
            </span>
          </nav>

          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-6"
              style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
            >
              {pd.heroEyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.0] tracking-tight mb-8"
              style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              {pd.heroLine1}<br />
              <span style={{ color: GOLD }}>{pd.heroLine2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{ color: BODY, fontFamily: "var(--font-inter)" }}
            >
              {pd.heroSubtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── SÉPARATEUR OR ── */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="h-px" style={{ backgroundColor: "#E8E8E8" }} />
      </div>

      {/* ── LISTE BCG — rows typographiques ── */}
      <section className="py-0" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
          {secteurs.map((s, i) => {
            const Icon = s.Icon;
            return (
              <motion.button
                key={s.id}
                id={s.id}
                onClick={() => openDrawer(s.id)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="w-full text-left group"
              >
                <div
                  className="flex items-center gap-6 md:gap-10 py-7 md:py-9 border-b transition-colors duration-200 group-hover:bg-neutral-50"
                  style={{ borderColor: "#E8E8E8" }}
                >
                  {/* Numéro */}
                  <span
                    className="hidden sm:block text-xs font-black tracking-widest shrink-0 w-8 text-right"
                    style={{ color: `${GOLD}60`, fontFamily: "var(--font-montserrat)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icône outline */}
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border transition-colors duration-200 group-hover:border-gold-400"
                    style={{ borderColor: "#E0E0E0", backgroundColor: "#FAFAFA" }}
                  >
                    <Icon
                      size={22}
                      style={{
                        color: "#444444",
                        transition: "color 0.2s",
                      }}
                      className="group-hover:text-gold-500"
                    />
                  </div>

                  {/* Titre + tagline */}
                  <div className="flex-1 min-w-0">
                    <h2
                      className="text-xl md:text-2xl font-black mb-1 transition-colors duration-200 group-hover:text-gold-500 leading-tight"
                      style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}
                    >
                      {s.label}
                    </h2>
                    <p
                      className="text-sm md:text-base leading-relaxed line-clamp-1"
                      style={{ color: "#888888", fontFamily: "var(--font-inter)" }}
                    >
                      {s.tagline}
                    </p>
                  </div>

                  {/* Services count + flèche */}
                  <div className="hidden lg:flex items-center gap-8 shrink-0">
                    <span
                      className="text-xs uppercase tracking-widest font-semibold"
                      style={{ color: "#BBBBBB", fontFamily: "var(--font-inter)" }}
                    >
                      {pd.prestationsLabel(s.services.length)}
                    </span>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:border-gold-400 group-hover:bg-gold-50"
                      style={{ borderColor: "#E0E0E0" }}
                    >
                      <ArrowUpRight
                        size={16}
                        style={{ color: "#BBBBBB", transition: "color 0.2s" }}
                        className="group-hover:text-gold-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>

                  {/* Mobile arrow */}
                  <div className="lg:hidden shrink-0">
                    <ArrowUpRight size={18} style={{ color: "#CCCCCC" }} />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ── STATS — directement sur le fond, sans cadre ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-16"
            style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
          >
            {pd.statsEyebrow}
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {pd.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="text-5xl md:text-6xl font-black mb-2 leading-none"
                  style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm font-bold mb-1"
                  style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}
                >
                  {stat.label}
                </div>
                <div
                  className="text-xs leading-relaxed"
                  style={{ color: "#888888", fontFamily: "var(--font-inter)" }}
                >
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL sobre ── */}
      <section className="py-24 md:py-32 border-t" style={{ backgroundColor: "#FFFFFF", borderColor: "#E8E8E8" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-6"
              style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
            >
              {pd.ctaEyebrow}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black leading-tight mb-6"
              style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              {pd.ctaHeading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-base md:text-lg leading-relaxed mb-10 max-w-xl"
              style={{ color: BODY, fontFamily: "var(--font-inter)" }}
            >
              {pd.ctaBody}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl transition-all duration-200 hover:brightness-110"
                style={{ backgroundColor: GOLD, color: DARK, fontFamily: "var(--font-inter)" }}
              >
                {pd.ctaContact}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl border transition-colors duration-200 hover:bg-neutral-50"
                style={{ borderColor: "#D0D0D0", color: DARK, fontFamily: "var(--font-inter)" }}
              >
                {pd.ctaServices}
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DRAWER ── */}
      <AnimatePresence>
        {selectedSecteur && (
          <SecteurDrawer
            secteur={selectedSecteur}
            onClose={closeDrawer}
            drawerStrings={pd.drawer}
          />
        )}
      </AnimatePresence>
    </>
  );
}
