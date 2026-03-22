"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { scrollToElement } from "@/lib/lenis-instance";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Globe, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   DATA TYPES
───────────────────────────────────────────────────────────── */
interface NavSubItem {
  label: string;
  href: string;
  img: string;
  desc: string;
  group?: string;
}
interface NavSection {
  label: string;
  href: string;
  overview?: string;
  items: NavSubItem[];
}
interface PageTab { label: string; anchor: string; }
interface PageContext { label: string; tabs: PageTab[]; }

/* ─────────────────────────────────────────────────────────────
   NAVIGATION DATA — FR / EN
───────────────────────────────────────────────────────────── */
const SECTIONS_DATA: Record<"fr" | "en", NavSection[]> = {
  fr: [
    {
      label: "GIRA Dev",
      href: "/x",
      overview: "L'unité tech & innovation de GIRA. Nous concevons les outils numériques qui transforment durablement l'Afrique : IA, plateformes gouvernementales, infrastructure digitale.",
      items: [
        { group: "Plateformes & IA", label: "Data & Intelligence Artificielle", href: "/x/data-ia", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=85&auto=format&fit=crop", desc: "Systèmes d'IA et de traitement de la donnée pour les institutions africaines, de la collecte terrain à la décision stratégique en temps réel." },
        { group: "Plateformes & IA", label: "Digital Gov & e-Services", href: "/x/digital-gov", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=85&auto=format&fit=crop", desc: "Portails gouvernementaux, e-services publics et systèmes d'identité numérique. Nous numérisons les États pour rapprocher citoyens et institutions." },
        { group: "Infrastructure & Finance", label: "Infrastructure Tech & IoT", href: "/x/infrastructure", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop", desc: "Supervision intelligente des chantiers, IoT sur les projets d'eau et d'énergie. Tableaux de bord de pilotage en temps réel pour les maîtres d'ouvrage." },
        { group: "Infrastructure & Finance", label: "Finance & Impact ESG", href: "/x/finance-impact", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85&auto=format&fit=crop", desc: "Plateformes de suivi des investissements, reporting ESG automatisé, outils de mobilisation des bailleurs et fonds d'impact pour l'Afrique." },
      ],
    },
    {
      label: "Nos Expertises",
      href: "/services",
      overview: "De la digitalisation des institutions publiques au déploiement de l'IA. GIRA conçoit, développe et opère les solutions technologiques qui transforment l'Afrique.",
      items: [
        { group: "Plateformes & Applications", label: "Digitalisation Institutionnelle", href: "/services#digitalisation", img: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&q=85&auto=format&fit=crop", desc: "Portails gouvernementaux, sites d'ambassades, intranets sécurisés et plateformes institutionnelles conçus sur mesure pour les États et organisations internationales." },
        { group: "Plateformes & Applications", label: "Développement Web & Mobile", href: "/services#applications", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=85&auto=format&fit=crop", desc: "Applications web et mobiles sur mesure pour PME, grandes entreprises et organisations. De la conception UX au déploiement en production." },
        { group: "Technologies Émergentes", label: "Intelligence Artificielle", href: "/services#ia", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85&auto=format&fit=crop", desc: "Développement et entraînement de modèles IA personnalisés. Intégration dans les systèmes métier des banques, ministères et entreprises." },
        { group: "Technologies Émergentes", label: "Connectivité & Points Relais", href: "/services#connectivite", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85&auto=format&fit=crop", desc: "Déploiement de hotspots Starlink et points relais WiFi communautaires. Accès internet à prix accessible dans les zones isolées et péri-urbaines." },
        { group: "Sécurité & Finance", label: "Communication Sécurisée", href: "/services#securite", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=85&auto=format&fit=crop", desc: "Canaux chiffrés et plateformes de liaison inter-institutions. Protocoles sécurisés pour les communications diplomatiques et échanges sensibles." },
        { group: "Sécurité & Finance", label: "Fintech & Transformation Bancaire", href: "/services#fintech", img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=85&auto=format&fit=crop", desc: "Accompagnement des institutions financières : core banking, paiement mobile, portails client nouvelle génération et conformité KYC/AML." },
      ],
    },
    {
      label: "Le Cabinet",
      href: "/a-propos",
      overview: "Basé à Paris, présent à Casablanca et Bratislava. GIRA est le partenaire d'exécution des institutions africaines et des bailleurs internationaux.",
      items: [
        { group: "Identité & Mission", label: "Notre mission & approche", href: "/a-propos", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=85&auto=format&fit=crop", desc: "Un cabinet né de la conviction que l'Afrique mérite une exécution irréprochable. Notre mantra : structurer, financer, exécuter." },
        { group: "Identité & Mission", label: "Secteurs d'intervention", href: "/secteurs", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=85&auto=format&fit=crop", desc: "8 secteurs clés : gouvernement, santé, éducation, finance, agriculture, connectivité, infrastructure et technologies." },
        { group: "Engagements Stratégiques", label: "PND RCA 2024-2028 & TRI", href: "/pnd-rca-tri", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=85&auto=format&fit=crop", desc: "Partenaire officiel du Plan National de Développement RCA. GIRA a co-organisé la Table Ronde des Investisseurs de Casablanca, avec 9 Mds USD mobilisés." },
        { group: "Engagements Stratégiques", label: "Réseau & Diaspora", href: "/reseau-diaspora", img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=85&auto=format&fit=crop", desc: "Un réseau actif de consultants africains sur 3 continents. La diaspora comme levier de co-investissement et de transfert d'expertise." },
      ],
    },
    {
      label: "Nous Rejoindre",
      href: "/carrieres",
      overview: "GIRA recrute des profils exigeants, animés par l'impact et la rigueur. Rejoignez un cabinet en croissance, présent sur 3 continents.",
      items: [
        { group: "Opportunités", label: "Carrières chez GIRA", href: "/carrieres", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=85&auto=format&fit=crop", desc: "Consultants, chefs de projets, développeurs, experts sectoriels. Des profils engagés pour des missions à fort impact sur le continent." },
        { group: "Opportunités", label: "Actualités & Publications", href: "/actualites", img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=85&auto=format&fit=crop", desc: "Analyses de marché, perspectives stratégiques et publications de l'équipe GIRA sur la transformation numérique en Afrique." },
        { group: "Contact", label: "Initier un mandat", href: "/contact", img: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&q=85&auto=format&fit=crop", desc: "Vous avez un projet stratégique ? Notre équipe répond sous 24h. Paris · Casablanca · Bratislava." },
      ],
    },
  ],
  en: [
    {
      label: "GIRA Dev",
      href: "/x",
      overview: "GIRA's tech & innovation unit. We design the digital tools that durably transform Africa: AI, government platforms, digital infrastructure.",
      items: [
        { group: "Platforms & AI", label: "Data & Artificial Intelligence", href: "/x/data-ia", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=85&auto=format&fit=crop", desc: "AI and data processing systems for African institutions, from field collection to real-time strategic decision-making." },
        { group: "Platforms & AI", label: "Digital Gov & e-Services", href: "/x/digital-gov", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=85&auto=format&fit=crop", desc: "Government portals, public e-services and digital identity systems. We digitize states to bring citizens and institutions closer together." },
        { group: "Infrastructure & Finance", label: "Tech Infrastructure & IoT", href: "/x/infrastructure", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop", desc: "Intelligent construction site supervision, IoT on water and energy projects. Real-time management dashboards for project owners." },
        { group: "Infrastructure & Finance", label: "Finance & ESG Impact", href: "/x/finance-impact", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85&auto=format&fit=crop", desc: "Investment monitoring platforms, automated ESG reporting, donor mobilization tools and impact funds for Africa." },
      ],
    },
    {
      label: "Our Expertise",
      href: "/services",
      overview: "From digitizing public institutions to deploying AI. GIRA designs, develops and operates the technological solutions that transform Africa.",
      items: [
        { group: "Platforms & Applications", label: "Institutional Digitalization", href: "/services#digitalisation", img: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&q=85&auto=format&fit=crop", desc: "Government portals, embassy sites, secure intranets and institutional platforms custom-built for states and international organizations." },
        { group: "Platforms & Applications", label: "Web & Mobile Development", href: "/services#applications", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=85&auto=format&fit=crop", desc: "Custom web and mobile applications for SMEs, large enterprises and organizations. From UX design to production deployment." },
        { group: "Emerging Technologies", label: "Artificial Intelligence", href: "/services#ia", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85&auto=format&fit=crop", desc: "Development and training of custom AI models. Integration into business systems of banks, ministries and companies." },
        { group: "Emerging Technologies", label: "Connectivity & Relay Points", href: "/services#connectivite", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85&auto=format&fit=crop", desc: "Deployment of Starlink hotspots and community WiFi relay points. Affordable internet access in isolated and peri-urban areas." },
        { group: "Security & Finance", label: "Secure Communications", href: "/services#securite", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=85&auto=format&fit=crop", desc: "Encrypted channels and inter-institutional liaison platforms. Secure protocols for diplomatic communications and sensitive exchanges." },
        { group: "Security & Finance", label: "Fintech & Banking Transformation", href: "/services#fintech", img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=85&auto=format&fit=crop", desc: "Support for financial institutions: core banking, mobile payment, next-generation client portals and KYC/AML compliance." },
      ],
    },
    {
      label: "The Firm",
      href: "/a-propos",
      overview: "Based in Paris, present in Casablanca and Bratislava. GIRA is the execution partner for African institutions and international donors.",
      items: [
        { group: "Identity & Mission", label: "Our mission & approach", href: "/a-propos", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=85&auto=format&fit=crop", desc: "A firm born from the conviction that Africa deserves impeccable execution. Our mantra: structure, finance, execute." },
        { group: "Identity & Mission", label: "Intervention sectors", href: "/secteurs", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=85&auto=format&fit=crop", desc: "8 key sectors: government, health, education, finance, agriculture, connectivity, infrastructure and technology." },
        { group: "Strategic Commitments", label: "NDP RCA 2024-2028 & IRT", href: "/pnd-rca-tri", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=85&auto=format&fit=crop", desc: "Official partner of the RCA National Development Plan. GIRA co-organized the Casablanca Investor Roundtable, with USD 9Bn mobilized." },
        { group: "Strategic Commitments", label: "Network & Diaspora", href: "/reseau-diaspora", img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=85&auto=format&fit=crop", desc: "An active network of African consultants across 3 continents. The diaspora as a lever for co-investment and expertise transfer." },
      ],
    },
    {
      label: "Join Us",
      href: "/carrieres",
      overview: "GIRA recruits demanding profiles, driven by impact and rigor. Join a growing firm, present on 3 continents.",
      items: [
        { group: "Opportunities", label: "Careers at GIRA", href: "/carrieres", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=85&auto=format&fit=crop", desc: "Consultants, project managers, developers, sector experts. Committed profiles for high-impact missions on the continent." },
        { group: "Opportunities", label: "News & Publications", href: "/actualites", img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=85&auto=format&fit=crop", desc: "Market analyses, strategic perspectives and GIRA team publications on digital transformation in Africa." },
        { group: "Contact", label: "Initiate a mandate", href: "/contact", img: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&q=85&auto=format&fit=crop", desc: "Do you have a strategic project? Our team responds within 24h. Paris · Casablanca · Bratislava." },
      ],
    },
  ],
};

/* ─────────────────────────────────────────────────────────────
   CONTEXTUAL PAGE TABS — FR / EN
───────────────────────────────────────────────────────────── */
const PAGE_CONTEXTS_DATA: Record<"fr" | "en", Record<string, PageContext>> = {
  fr: {
    "/services": { label: "EXPERTISES", tabs: [{ label: "Aperçu", anchor: "#overview" }, { label: "Digitalisation", anchor: "#digitalisation" }, { label: "Web & Mobile", anchor: "#applications" }, { label: "IA", anchor: "#ia" }, { label: "Connectivité", anchor: "#connectivite" }, { label: "Sécurité", anchor: "#securite" }, { label: "Fintech", anchor: "#fintech" }] },
    "/a-propos": { label: "LE CABINET", tabs: [{ label: "Mission", anchor: "#mission" }, { label: "Approche", anchor: "#approche" }, { label: "Valeurs", anchor: "#valeurs" }, { label: "Implantations", anchor: "#implantations" }] },
    "/secteurs": { label: "SECTEURS", tabs: [{ label: "Gouv.", anchor: "#gouvernement" }, { label: "Web & App", anchor: "#applications" }, { label: "IA", anchor: "#ia" }, { label: "Connectivité", anchor: "#connectivite" }, { label: "Sécurité", anchor: "#securite" }, { label: "ERP & SI", anchor: "#systemes" }, { label: "Santé", anchor: "#sante" }, { label: "Agriculture", anchor: "#agriculture" }] },
    "/pnd-rca-tri": { label: "PND RCA & TRI", tabs: [{ label: "Contexte", anchor: "#contexte" }, { label: "Rôle GIRA", anchor: "#role" }, { label: "Résultats TRI", anchor: "#resultats" }] },
    "/reseau-diaspora": { label: "RÉSEAU & DIASPORA", tabs: [{ label: "Notre réseau", anchor: "#reseau" }, { label: "Experts", anchor: "#experts" }, { label: "Rejoindre", anchor: "#rejoindre" }] },
    "/carrieres": { label: "CARRIÈRES", tabs: [{ label: "Pourquoi GIRA", anchor: "#pourquoi" }, { label: "Profils recherchés", anchor: "#profils" }, { label: "Postuler", anchor: "#postuler" }] },
    "/contact": { label: "CONTACT", tabs: [{ label: "Formulaire", anchor: "#formulaire" }, { label: "Coordonnées", anchor: "#coordonnees" }] },
    "/actualites": { label: "ACTUALITÉS", tabs: [{ label: "Toutes", anchor: "#toutes" }, { label: "Analyses", anchor: "#analyses" }, { label: "Publications", anchor: "#publications" }] },
    "/x": { label: "GIRA DEV", tabs: [{ label: "Vision", anchor: "#vision" }, { label: "Impact", anchor: "#impact" }, { label: "Capacités", anchor: "#capabilities" }, { label: "Équipe", anchor: "#team" }, { label: "Domaines", anchor: "#domaines" }, { label: "Insights", anchor: "#insights" }] },
    "/x/data-ia": { label: "GIRA DEV", tabs: [{ label: "GIRA Dev", anchor: "/x" }, { label: "Data & IA", anchor: "/x/data-ia" }, { label: "Digital Gov", anchor: "/x/digital-gov" }, { label: "Infrastructure", anchor: "/x/infrastructure" }, { label: "Finance ESG", anchor: "/x/finance-impact" }] },
    "/x/digital-gov": { label: "GIRA DEV", tabs: [{ label: "GIRA Dev", anchor: "/x" }, { label: "Data & IA", anchor: "/x/data-ia" }, { label: "Digital Gov", anchor: "/x/digital-gov" }, { label: "Infrastructure", anchor: "/x/infrastructure" }, { label: "Finance ESG", anchor: "/x/finance-impact" }] },
    "/x/infrastructure": { label: "GIRA DEV", tabs: [{ label: "GIRA Dev", anchor: "/x" }, { label: "Data & IA", anchor: "/x/data-ia" }, { label: "Digital Gov", anchor: "/x/digital-gov" }, { label: "Infrastructure", anchor: "/x/infrastructure" }, { label: "Finance ESG", anchor: "/x/finance-impact" }] },
    "/x/finance-impact": { label: "GIRA DEV", tabs: [{ label: "GIRA Dev", anchor: "/x" }, { label: "Data & IA", anchor: "/x/data-ia" }, { label: "Digital Gov", anchor: "/x/digital-gov" }, { label: "Infrastructure", anchor: "/x/infrastructure" }, { label: "Finance ESG", anchor: "/x/finance-impact" }] },
  },
  en: {
    "/services": { label: "EXPERTISE", tabs: [{ label: "Overview", anchor: "#overview" }, { label: "Digitalization", anchor: "#digitalisation" }, { label: "Web & Mobile", anchor: "#applications" }, { label: "AI", anchor: "#ia" }, { label: "Connectivity", anchor: "#connectivite" }, { label: "Security", anchor: "#securite" }, { label: "Fintech", anchor: "#fintech" }] },
    "/a-propos": { label: "THE FIRM", tabs: [{ label: "Mission", anchor: "#mission" }, { label: "Approach", anchor: "#approche" }, { label: "Values", anchor: "#valeurs" }, { label: "Locations", anchor: "#implantations" }] },
    "/secteurs": { label: "SECTORS", tabs: [{ label: "Gov.", anchor: "#gouvernement" }, { label: "Web & App", anchor: "#applications" }, { label: "AI", anchor: "#ia" }, { label: "Connectivity", anchor: "#connectivite" }, { label: "Security", anchor: "#securite" }, { label: "ERP & SI", anchor: "#systemes" }, { label: "Health", anchor: "#sante" }, { label: "Agriculture", anchor: "#agriculture" }] },
    "/pnd-rca-tri": { label: "NDP RCA & IRT", tabs: [{ label: "Context", anchor: "#contexte" }, { label: "GIRA's Role", anchor: "#role" }, { label: "IRT Results", anchor: "#resultats" }] },
    "/reseau-diaspora": { label: "NETWORK & DIASPORA", tabs: [{ label: "Our network", anchor: "#reseau" }, { label: "Experts", anchor: "#experts" }, { label: "Join", anchor: "#rejoindre" }] },
    "/carrieres": { label: "CAREERS", tabs: [{ label: "Why GIRA", anchor: "#pourquoi" }, { label: "Profiles sought", anchor: "#profils" }, { label: "Apply", anchor: "#postuler" }] },
    "/contact": { label: "CONTACT", tabs: [{ label: "Form", anchor: "#formulaire" }, { label: "Coordinates", anchor: "#coordonnees" }] },
    "/actualites": { label: "NEWS", tabs: [{ label: "All", anchor: "#toutes" }, { label: "Analyses", anchor: "#analyses" }, { label: "Publications", anchor: "#publications" }] },
    "/x": { label: "GIRA DEV", tabs: [{ label: "Vision", anchor: "#vision" }, { label: "Impact", anchor: "#impact" }, { label: "Capabilities", anchor: "#capabilities" }, { label: "Team", anchor: "#team" }, { label: "Domains", anchor: "#domaines" }, { label: "Insights", anchor: "#insights" }] },
    "/x/data-ia": { label: "GIRA DEV", tabs: [{ label: "GIRA Dev", anchor: "/x" }, { label: "Data & AI", anchor: "/x/data-ia" }, { label: "Digital Gov", anchor: "/x/digital-gov" }, { label: "Infrastructure", anchor: "/x/infrastructure" }, { label: "Finance ESG", anchor: "/x/finance-impact" }] },
    "/x/digital-gov": { label: "GIRA DEV", tabs: [{ label: "GIRA Dev", anchor: "/x" }, { label: "Data & AI", anchor: "/x/data-ia" }, { label: "Digital Gov", anchor: "/x/digital-gov" }, { label: "Infrastructure", anchor: "/x/infrastructure" }, { label: "Finance ESG", anchor: "/x/finance-impact" }] },
    "/x/infrastructure": { label: "GIRA DEV", tabs: [{ label: "GIRA Dev", anchor: "/x" }, { label: "Data & AI", anchor: "/x/data-ia" }, { label: "Digital Gov", anchor: "/x/digital-gov" }, { label: "Infrastructure", anchor: "/x/infrastructure" }, { label: "Finance ESG", anchor: "/x/finance-impact" }] },
    "/x/finance-impact": { label: "GIRA DEV", tabs: [{ label: "GIRA Dev", anchor: "/x" }, { label: "Data & AI", anchor: "/x/data-ia" }, { label: "Digital Gov", anchor: "/x/digital-gov" }, { label: "Infrastructure", anchor: "/x/infrastructure" }, { label: "Finance ESG", anchor: "/x/finance-impact" }] },
  },
};

/* ─────────────────────────────────────────────────────────────
   UI STRINGS — FR / EN
───────────────────────────────────────────────────────────── */
const UI_DATA = {
  fr: {
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    cta: "Initier un mandat",
    viewAll: "Voir tout",
    viewPage: "Voir la page",
    visitGiraDev: "Visiter GIRA Dev",
    defaultOverview: "Sélectionnez une rubrique pour explorer notre offre.",
    navLinks: [{ label: "Actualités", href: "/actualites" }, { label: "Contact", href: "/contact" }],
    giraDevHero: { line1: "Nous Bâtissons", line2: "le Futur", line3: "de l\u2019Afrique." },
  },
  en: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    cta: "Initiate a Mandate",
    viewAll: "View all",
    viewPage: "View page",
    visitGiraDev: "Visit GIRA Dev",
    defaultOverview: "Select a section to explore our offering.",
    navLinks: [{ label: "News", href: "/actualites" }, { label: "Contact", href: "/contact" }],
    giraDevHero: { line1: "We Build", line2: "the Future", line3: "of Africa." },
  },
};

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [menuOpen, setMenuOpen]               = useState(false);
  const [activeSection, setActiveSection]     = useState<string | null>(null);
  const [hoveredItem, setHoveredItem]         = useState<NavSubItem | null>(null);
  const [activeTab, setActiveTab]             = useState(0);
  const [isDark, setIsDark]                   = useState(false);
  const locale    = useLocale() as "fr" | "en";
  const pathname  = usePathname();
  const router    = useRouter();
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Locale-resolved data */
  const sections      = SECTIONS_DATA[locale] ?? SECTIONS_DATA.fr;
  const pageContextsMap = PAGE_CONTEXTS_DATA[locale] ?? PAGE_CONTEXTS_DATA.fr;
  const ui            = UI_DATA[locale] ?? UI_DATA.fr;

  const pageContext = pageContextsMap[pathname] ?? null;

  /* Detect dark hero background */
  useEffect(() => {
    if (pathname.startsWith("/x")) {
      setIsDark(true);
      let obs: IntersectionObserver | null = null;
      const timer = setTimeout(() => {
        const lightSections = document.querySelectorAll("[data-nav-light]");
        if (!lightSections.length) return;
        const intersecting = new Set<Element>();
        obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) intersecting.add(e.target);
              else intersecting.delete(e.target);
            });
            setIsDark(intersecting.size === 0);
          },
          { rootMargin: "-76px 0px 0px 0px", threshold: 0 }
        );
        lightSections.forEach((el) => obs!.observe(el));
      }, 250);
      return () => { clearTimeout(timer); obs?.disconnect(); };
    }
    if (pathname !== "/") { setIsDark(false); return; }
    const onScroll = () => setIsDark(window.scrollY < window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  /* Reset on route change */
  useEffect(() => {
    setMenuOpen(false);
    setActiveSection(null);
    setHoveredItem(null);
    setActiveTab(0);
  }, [pathname]);

  /* IntersectionObserver : met à jour activeTab */
  useEffect(() => {
    if (!pageContext) return;
    const ids = pageContext.tabs.map((t) => t.anchor.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = ids.indexOf(entry.target.id);
            if (idx !== -1) setActiveTab(idx);
          }
        });
      },
      { rootMargin: "-88px 0px -55% 0px", threshold: 0 }
    );
    const timer = setTimeout(() => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 300);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [pathname, pageContext]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const openMenu = useCallback(() => {
    const matchedSection = sections.find((sec) =>
      sec.href === pathname ||
      sec.items.some((item) => pathname.startsWith(item.href.split("#")[0]) && item.href.split("#")[0] !== "/")
    ) ?? sections[0];
    setMenuOpen(true);
    setActiveSection(matchedSection.label);
    setHoveredItem(matchedSection.items[0]);
  }, [pathname, sections]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setActiveSection(null);
    setHoveredItem(null);
  }, []);

  const toggleMenu = useCallback(
    () => (menuOpen ? closeMenu() : openMenu()),
    [menuOpen, closeMenu, openMenu]
  );

  const handleItemHover = useCallback((item: NavSubItem) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setHoveredItem(item), 60);
  }, []);

  const handleItemClick = useCallback(
    (item: NavSubItem) => {
      closeMenu();
      router.push(item.href);
    },
    [closeMenu, router]
  );

  const currentSection = sections.find((s) => s.label === activeSection);
  const isGiraDevSection = currentSection?.label === (locale === "fr" ? "GIRA Dev" : "GIRA Dev");

  /* Pill tokens */
  const dark      = isDark && !menuOpen;
  const pillBg    = dark ? "rgba(255,255,255,0.10)" : "#FFFFFF";
  const pillBrd   = dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)";
  const pillSh    = dark ? "0 2px 16px rgba(0,0,0,0.30)" : "0 2px 12px rgba(0,0,0,0.06)";
  const hamBg     = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.05)";
  const iconClr   = dark ? "#FFFFFF" : "#0D0D0D";
  const logoflt   = dark ? "brightness(0) invert(1)" : "none";
  const txtMuted  = dark ? "rgba(255,255,255,0.50)" : "#888";
  const G         = "#C9A84C";

  function getGroups(items: NavSubItem[]) {
    const seen = new Set<string>();
    const groups: string[] = [];
    items.forEach((it) => {
      if (it.group && !seen.has(it.group)) { seen.add(it.group); groups.push(it.group); }
    });
    return groups;
  }

  return (
    <>
      {/* ══════════════════════════════════════
          STICKY HEADER BAR
      ══════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 w-full z-50 pointer-events-none"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <div className="flex items-center gap-3 px-4 sm:px-5 lg:px-8 h-[76px] pointer-events-auto">

          {/* ── LEFT PILL: hamburger | logo ── */}
          <motion.div
            className="flex items-center gap-0 rounded-2xl flex-shrink-0 overflow-hidden"
            style={{ background: pillBg, border: `1px solid ${pillBrd}`, boxShadow: pillSh, backdropFilter: dark ? "blur(12px)" : "none", WebkitBackdropFilter: dark ? "blur(12px)" : "none", transition: "background 0.35s, border 0.35s, box-shadow 0.35s" }}
            whileTap={{ scale: 0.97 }}
          >
            <button
              onClick={toggleMenu}
              aria-label={menuOpen ? ui.closeMenu : ui.openMenu}
              aria-expanded={menuOpen}
              className="flex items-center justify-center rounded-xl m-1.5 flex-shrink-0 focus:outline-none"
              style={{ width: 42, height: 42, background: hamBg, transition: "background 0.35s" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <X size={18} strokeWidth={2} style={{ color: iconClr }} />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Menu size={18} strokeWidth={2} style={{ color: iconClr }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <div className="w-px self-stretch my-2.5 flex-shrink-0" style={{ background: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.07)" }} />

            <Link href="/" onClick={menuOpen ? closeMenu : undefined} className="pr-4 pl-3 flex items-center h-full focus:outline-none" aria-label="GIRA" title="Home">
              <Image src="/logoGIRA.png" alt={pathname.startsWith("/x") ? "GIRA Dev" : "GIRA"} width={80} height={30} className="object-contain" style={{ filter: logoflt, transition: "filter 0.35s" }} priority />
              {pathname.startsWith("/x") && (
                <span style={{ fontFamily: "var(--font-montserrat)", fontWeight: 900, fontSize: "1.55rem", lineHeight: 1, color: "#E8C547", letterSpacing: "-0.06em", display: "inline-block", transform: "rotate(-9deg) translateY(-4px)", textShadow: "0 0 20px rgba(232,197,71,0.75), 0 0 6px rgba(232,197,71,0.5)", marginLeft: "-6px" }}>X</span>
              )}
            </Link>
          </motion.div>

          {/* ── CENTER PILL: page context tabs ── */}
          <AnimatePresence>
            {!menuOpen && pageContext && (
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:flex items-center gap-1 rounded-2xl px-3 py-2 flex-shrink-0"
                style={{ background: pillBg, border: `1px solid ${pillBrd}`, boxShadow: pillSh }}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] pr-2 border-r flex-shrink-0" style={{ color: G, borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)", fontFamily: "var(--font-montserrat)" }}>
                  {pageContext.label}
                </span>

                {/* md→lg compact */}
                <div className="flex xl:hidden items-center gap-2 pl-1">
                  <a
                    href={pageContext.tabs[activeTab]?.anchor}
                    onClick={(e) => { e.preventDefault(); const a = pageContext.tabs[activeTab].anchor; a.startsWith("/") ? router.push(a) : scrollToElement(a); }}
                    className="relative px-3 py-1.5 rounded-xl text-[11px] font-semibold"
                    style={{ color: "#0D0D0D", fontFamily: "var(--font-inter)", textDecoration: "none" }}
                  >
                    <span className="absolute inset-0 rounded-xl" style={{ background: dark ? "rgba(201,168,76,0.85)" : "rgba(201,168,76,0.15)" }} />
                    <span className="relative z-10">{pageContext.tabs[activeTab]?.label}</span>
                  </a>
                  <div className="flex items-center gap-0.5">
                    <button onClick={() => { const prev = (activeTab - 1 + pageContext.tabs.length) % pageContext.tabs.length; setActiveTab(prev); const a = pageContext.tabs[prev].anchor; a.startsWith("/") ? router.push(a) : scrollToElement(a); }} className="w-5 h-5 flex items-center justify-center rounded-lg transition-opacity hover:opacity-70" style={{ color: txtMuted, fontSize: 14 }} aria-label="Previous tab">‹</button>
                    <button onClick={() => { const next = (activeTab + 1) % pageContext.tabs.length; setActiveTab(next); const a = pageContext.tabs[next].anchor; a.startsWith("/") ? router.push(a) : scrollToElement(a); }} className="w-5 h-5 flex items-center justify-center rounded-lg transition-opacity hover:opacity-70" style={{ color: txtMuted, fontSize: 14 }} aria-label="Next tab">›</button>
                  </div>
                  <span className="text-[10px] tabular-nums" style={{ color: txtMuted, fontFamily: "var(--font-inter)" }}>{activeTab + 1}/{pageContext.tabs.length}</span>
                </div>

                {/* xl+ full tabs */}
                <div className="hidden xl:flex items-center gap-0.5 pl-1">
                  {pageContext.tabs.map((tab, i) => {
                    const isA = tab.anchor === pathname || i === activeTab;
                    return (
                      <a key={tab.anchor} href={tab.anchor}
                        onClick={(e) => { e.preventDefault(); setActiveTab(i); tab.anchor.startsWith("/") ? router.push(tab.anchor) : scrollToElement(tab.anchor); }}
                        className="relative px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-colors duration-200"
                        style={{ color: isA ? "#0D0D0D" : txtMuted, fontFamily: "var(--font-inter)", textDecoration: "none" }}
                      >
                        {isA && (
                          <motion.span layoutId="ctx-tab-bg" className="absolute inset-0 rounded-xl" style={{ background: dark ? "rgba(201,168,76,0.85)" : "rgba(201,168,76,0.15)" }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1" />

          {/* ── RIGHT PILL: lang + CTA ── */}
          <motion.div
            className="flex items-center gap-2 px-3 py-2 rounded-2xl flex-shrink-0"
            style={{ background: pillBg, border: `1px solid ${pillBrd}`, boxShadow: pillSh, backdropFilter: dark ? "blur(12px)" : "none", WebkitBackdropFilter: dark ? "blur(12px)" : "none", transition: "background 0.35s, border 0.35s" }}
          >
            <button
              onClick={() => { const nextLocale = locale === "fr" ? "en" : "fr"; router.replace(pathname as "/", { locale: nextLocale }); }}
              aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}
              className="flex items-center gap-1.5 px-2 py-1 rounded-xl text-[11px] font-semibold tracking-wider transition-colors"
              style={{ color: txtMuted }}
            >
              <Globe size={12} style={{ color: G }} />
              <span style={{ color: locale === "fr" ? G : txtMuted }}>FR</span>
              <span style={{ color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)" }}>|</span>
              <span style={{ color: locale === "en" ? G : txtMuted }}>EN</span>
            </button>
            <Link href="/contact" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all hover:opacity-90 whitespace-nowrap" style={{ backgroundColor: G, color: "#0D0D0D", fontFamily: "var(--font-inter)" }}>
              {ui.cta}
              <ArrowRight size={11} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>
      </header>

      {/* ══════════════════════════════════════
          MEGA-MENU PANEL
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col md:flex-row bg-white pt-[76px] overflow-hidden"
          >
            {/* LEFT SIDEBAR */}
            <div className="w-full md:w-[360px] lg:w-[400px] h-full flex flex-col bg-white border-r overflow-y-auto flex-shrink-0 overscroll-contain" style={{ borderColor: "rgba(0,0,0,0.05)" }} data-lenis-prevent>
              <nav className="flex-1 px-5 lg:px-7 pt-6 pb-4">

                <div className="flex flex-col gap-1 mb-6">
                  {sections.map((sec) => {
                    const isA = activeSection === sec.label;
                    const isGiraDev = sec.href === "/x";
                    return (
                      <button
                        key={sec.href}
                        onClick={() => { setActiveSection(isA ? null : sec.label); if (!isA) setHoveredItem(sec.items[0]); if (isGiraDev) router.push("/x"); }}
                        className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-all duration-200"
                        style={{ backgroundColor: isA ? (isGiraDev ? "#C9A84C" : "#0D0D0D") : (isGiraDev ? "rgba(201,168,76,0.06)" : "transparent"), border: isGiraDev && !isA ? "1px solid rgba(201,168,76,0.2)" : "1px solid transparent" }}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base font-bold tracking-tight" style={{ color: isA ? (isGiraDev ? "#0D0D0D" : "#FFFFFF") : (isGiraDev ? "#C9A84C" : "#333"), fontFamily: "var(--font-montserrat)", transition: "color 0.2s" }}>
                            {sec.label}
                          </span>
                          {isGiraDev && !isA && (
                            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#C9A84C", fontFamily: "var(--font-inter)" }}>NEW</span>
                          )}
                        </span>
                        <ChevronRight size={15} style={{ color: isA ? (isGiraDev ? "#0D0D0D" : G) : (isGiraDev ? G : "#ccc"), transform: isA ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.22s, color 0.22s" }} />
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence initial={false}>
                  {currentSection && (
                    <motion.div key={currentSection.label} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28, ease: "easeInOut" }} className="overflow-hidden">
                      <div className="h-px mx-4 mb-5" style={{ backgroundColor: "rgba(201,168,76,0.2)" }} />

                      {getGroups(currentSection.items).map((grp) => (
                        <div key={grp} className="mb-4">
                          <p className="text-[9px] font-black uppercase tracking-[0.32em] px-4 mb-2" style={{ color: "rgba(201,168,76,0.65)", fontFamily: "var(--font-inter)" }}>{grp}</p>
                          {currentSection.items.filter((it) => it.group === grp).map((item) => {
                            const isSel = hoveredItem?.label === item.label;
                            return (
                              <button key={item.label} onMouseEnter={() => handleItemHover(item)} onClick={() => handleItemClick(item)} className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left group transition-all duration-150 mb-0.5" style={{ backgroundColor: isSel ? "rgba(201,168,76,0.07)" : "transparent" }}>
                                <span className="text-[13px] leading-snug transition-colors duration-150" style={{ color: isSel ? "#0D0D0D" : "#555", fontWeight: isSel ? 600 : 400, fontFamily: "var(--font-inter)" }}>{item.label}</span>
                                <ArrowRight size={12} style={{ color: isSel ? G : "transparent", transition: "color 0.15s", flexShrink: 0 }} />
                              </button>
                            );
                          })}
                        </div>
                      ))}

                      <Link href={currentSection.href} onClick={closeMenu} className="flex items-center gap-2 px-4 py-2.5 mt-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors" style={{ color: "#aaa", fontFamily: "var(--font-inter)" }} onMouseEnter={(e) => (e.currentTarget.style.color = G)} onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}>
                        {ui.viewAll}
                        <ArrowRight size={11} strokeWidth={2.5} />
                      </Link>
                      <div className="h-px mx-4 mt-4 mb-1" style={{ backgroundColor: "rgba(0,0,0,0.05)" }} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 flex flex-col gap-0.5">
                  {ui.navLinks.map((l) => (
                    <Link key={l.href} href={l.href} onClick={closeMenu} className="flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors" style={{ color: "#777", fontFamily: "var(--font-inter)" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#0D0D0D"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#777"; }}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              </nav>

              <div className="px-5 lg:px-7 pt-4 pb-10 md:pb-6 border-t mt-auto flex-shrink-0" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
                <Link href="/contact" onClick={closeMenu} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all hover:opacity-90" style={{ backgroundColor: G, color: "#0D0D0D", fontFamily: "var(--font-inter)" }}>
                  {ui.cta}
                  <ArrowRight size={13} strokeWidth={2.5} />
                </Link>
                <p className="text-center text-[10px] mt-3" style={{ color: "#bbb", fontFamily: "var(--font-inter)" }}>Paris · Casablanca · Bratislava</p>
              </div>
            </div>

            {/* RIGHT PREVIEW PANEL */}
            <div className="hidden md:flex flex-1 overflow-hidden relative transition-colors duration-300" style={{ backgroundColor: isGiraDevSection ? "#0D0D0D" : "#F5F4F0" }}>
              <AnimatePresence mode="wait">
                {hoveredItem ? (
                  <motion.div key={hoveredItem.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2, ease: "easeOut" }} className="absolute inset-0 flex flex-col">
                    <div className="relative w-full" style={{ height: "52%" }}>
                      <Image src={hoveredItem.img} alt={hoveredItem.label} fill className="object-cover" sizes="900px" unoptimized />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(245,244,240,0.0) 40%, rgba(245,244,240,1) 100%)" }} />
                      <div className="absolute top-6 left-8 flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase tracking-[0.35em] bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full" style={{ color: G, fontFamily: "var(--font-inter)" }}>{currentSection?.label}</span>
                        <ChevronRight size={10} style={{ color: "rgba(255,255,255,0.5)" }} />
                        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full" style={{ color: "rgba(255,255,255,0.9)", fontFamily: "var(--font-inter)" }}>{hoveredItem.group}</span>
                      </div>
                    </div>

                    <div className="flex-1 px-10 py-7 flex flex-col justify-between">
                      <div>
                        <h3 className="text-3xl lg:text-4xl font-black leading-tight mb-4" style={{ fontFamily: "var(--font-montserrat)", color: isGiraDevSection ? "#FFFFFF" : "#0D0D0D" }}>{hoveredItem.label}</h3>
                        <p className="text-[15px] leading-relaxed" style={{ color: isGiraDevSection ? "rgba(255,255,255,0.55)" : "#555", fontFamily: "var(--font-inter)", maxWidth: 520 }}>{hoveredItem.desc}</p>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <button
                          onClick={() => handleItemClick(hoveredItem)}
                          className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all group"
                          style={{ backgroundColor: isGiraDevSection ? G : "#0D0D0D", color: isGiraDevSection ? "#0D0D0D" : "#FFFFFF", fontFamily: "var(--font-inter)" }}
                          onMouseEnter={(e) => { if (isGiraDevSection) { (e.currentTarget as HTMLElement).style.backgroundColor = "#D4AF37"; } else { (e.currentTarget as HTMLElement).style.backgroundColor = G; (e.currentTarget as HTMLElement).style.color = "#0D0D0D"; } }}
                          onMouseLeave={(e) => { if (isGiraDevSection) { (e.currentTarget as HTMLElement).style.backgroundColor = G; } else { (e.currentTarget as HTMLElement).style.backgroundColor = "#0D0D0D"; (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; } }}
                        >
                          {ui.viewPage}
                          <ArrowRight size={13} strokeWidth={2.5} />
                        </button>
                        <span className="text-[10px] font-mono" style={{ color: isGiraDevSection ? "rgba(255,255,255,0.25)" : "#bbb", fontFamily: "var(--font-inter)" }}>gira-cf.com{hoveredItem.href}</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-start justify-center w-full h-full px-14">
                    {isGiraDevSection ? (
                      <>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 px-3 py-1.5 rounded-full" style={{ color: "#0D0D0D", backgroundColor: G, fontFamily: "var(--font-inter)" }}>GIRA DEV</span>
                        <p className="text-3xl lg:text-4xl font-bold leading-tight mb-6" style={{ color: "#FFFFFF", fontFamily: "var(--font-playfair)", maxWidth: 420 }}>
                          {ui.giraDevHero.line1}<br />
                          <em style={{ color: G }}>{ui.giraDevHero.line2}</em><br />
                          {ui.giraDevHero.line3}
                        </p>
                        <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter)", maxWidth: 380 }}>{currentSection?.overview}</p>
                        <Link href="/x" onClick={closeMenu} className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all" style={{ backgroundColor: G, color: "#0D0D0D", fontFamily: "var(--font-inter)" }}>
                          {ui.visitGiraDev}
                          <ArrowRight size={12} strokeWidth={2.5} />
                        </Link>
                      </>
                    ) : (
                      <>
                        <Image src="/logoGIRA.png" alt="GIRA" width={72} height={28} className="object-contain mb-8 opacity-30" />
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: G, fontFamily: "var(--font-inter)" }}>{currentSection?.label ?? "Navigation"}</p>
                        <p className="text-xl leading-relaxed" style={{ color: "#555", fontFamily: "var(--font-inter)", maxWidth: 420 }}>{currentSection?.overview ?? ui.defaultOverview}</p>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
