"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
  group?: string; // groupe visuel BCG-style
}
interface NavSection {
  label: string;       // ex. "Nos Expertises"
  href: string;        // lien direct sur la section
  overview?: string;   // courte accroche affiché dans le panel
  items: NavSubItem[];
}

/* ─────────────────────────────────────────────────────────────
   NAVIGATION DATA. GIRA
   Hover → prévisualise dans le panel droit
   Click → navigue ET ferme le menu
───────────────────────────────────────────────────────────── */
const sections: NavSection[] = [
  /* ── 1. NOS EXPERTISES ──────────────────────────────────── */
  {
    label: "Nos Expertises",
    href: "/services",
    overview:
      "De la digitalisation des institutions publiques au déploiement de l'IA. GIRA conçoit, développe et opère les solutions technologiques qui transforment l'Afrique.",
    items: [
      /* Groupe A */
      {
        group: "Plateformes & Applications",
        label: "Digitalisation Institutionnelle",
        href: "/services#digitalisation",
        img: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&q=85&auto=format&fit=crop",
        desc: "Portails gouvernementaux, sites d'ambassades, intranets sécurisés et plateformes institutionnelles conçus sur mesure pour les États et organisations internationales.",
      },
      {
        group: "Plateformes & Applications",
        label: "Développement Web & Mobile",
        href: "/services#applications",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=85&auto=format&fit=crop",
        desc: "Applications web et mobiles sur mesure pour PME, grandes entreprises et organisations. De la conception UX au déploiement en production.",
      },
      /* Groupe B */
      {
        group: "Technologies Émergentes",
        label: "Intelligence Artificielle",
        href: "/services#ia",
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85&auto=format&fit=crop",
        desc: "Développement et entraînement de modèles IA personnalisés. Intégration dans les systèmes métier des banques, ministères et entreprises.",
      },
      {
        group: "Technologies Émergentes",
        label: "Connectivité & Points Relais",
        href: "/services#connectivite",
        img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=85&auto=format&fit=crop",
        desc: "Déploiement de hotspots Starlink et points relais WiFi communautaires. Accès internet à prix accessible dans les zones isolées et péri-urbaines.",
      },
      /* Groupe C */
      {
        group: "Sécurité & Finance",
        label: "Communication Sécurisée",
        href: "/services#securite",
        img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=85&auto=format&fit=crop",
        desc: "Canaux chiffrés et plateformes de liaison inter-institutions. Protocoles sécurisés pour les communications diplomatiques et échanges sensibles.",
      },
      {
        group: "Sécurité & Finance",
        label: "Fintech & Transformation Bancaire",
        href: "/services#fintech",
        img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=85&auto=format&fit=crop",
        desc: "Accompagnement des institutions financières : core banking, paiement mobile, portails client nouvelle génération et conformité KYC/AML.",
      },
    ],
  },

  /* ── 2. LE CABINET GIRA ─────────────────────────────────── */
  {
    label: "Le Cabinet",
    href: "/a-propos",
    overview:
      "Basé à Paris, présent à Casablanca et Bratislava. GIRA est le partenaire d'exécution des institutions africaines et des bailleurs internationaux.",
    items: [
      {
        group: "Identité & Mission",
        label: "Notre mission & approche",
        href: "/a-propos",
        img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=85&auto=format&fit=crop",
        desc: "Un cabinet né de la conviction que l'Afrique mérite une exécution irréprochable. Notre mantra : structurer, financer, exécuter.",
      },
      {
        group: "Identité & Mission",
        label: "Secteurs d'intervention",
        href: "/secteurs",
        img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=85&auto=format&fit=crop",
        desc: "8 secteurs clés : gouvernement, santé, éducation, finance, agriculture, connectivité, infrastructure et technologies.",
      },
      {
        group: "Engagements Stratégiques",
        label: "PND RCA 2024-2028 & TRI",
        href: "/pnd-rca-tri",
        img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=85&auto=format&fit=crop",
        desc: "Partenaire officiel du Plan National de Développement RCA. GIRA a co-organisé la Table Ronde des Investisseurs de Casablanca — 9 Mds USD mobilisés.",
      },
      {
        group: "Engagements Stratégiques",
        label: "Réseau & Diaspora",
        href: "/reseau-diaspora",
        img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=85&auto=format&fit=crop",
        desc: "Un réseau actif de consultants africains sur 3 continents. La diaspora comme levier de co-investissement et de transfert d'expertise.",
      },
    ],
  },

  /* ── 3. NOUS REJOINDRE ──────────────────────────────────── */
  {
    label: "Nous Rejoindre",
    href: "/carrieres",
    overview:
      "GIRA recrute des profils exigeants, animés par l'impact et la rigueur. Rejoignez un cabinet en croissance, présent sur 3 continents.",
    items: [
      {
        group: "Opportunités",
        label: "Carrières chez GIRA",
        href: "/carrieres",
        img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=85&auto=format&fit=crop",
        desc: "Consultants, chefs de projets, développeurs, experts sectoriels. Des profils engagés pour des missions à fort impact sur le continent.",
      },
      {
        group: "Opportunités",
        label: "Actualités & Publications",
        href: "/actualites",
        img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=85&auto=format&fit=crop",
        desc: "Analyses de marché, perspectives stratégiques et publications de l'équipe GIRA sur la transformation numérique en Afrique.",
      },
      {
        group: "Contact",
        label: "Initier un mandat",
        href: "/contact",
        img: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&q=85&auto=format&fit=crop",
        desc: "Vous avez un projet stratégique ? Notre équipe répond sous 24h. Paris · Casablanca · Bratislava.",
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   CONTEXTUAL PAGE TABS (pill central sur pages internes)
───────────────────────────────────────────────────────────── */
interface PageTab { label: string; anchor: string; }
interface PageContext { label: string; tabs: PageTab[]; }

const PAGE_CONTEXTS: Record<string, PageContext> = {
  "/services": {
    label: "EXPERTISES",
    tabs: [
      { label: "Aperçu", anchor: "#overview" },
      { label: "Digitalisation", anchor: "#digitalisation" },
      { label: "Web & Mobile", anchor: "#applications" },
      { label: "IA", anchor: "#ia" },
      { label: "Connectivité", anchor: "#connectivite" },
      { label: "Sécurité", anchor: "#securite" },
      { label: "Fintech", anchor: "#fintech" },
    ],
  },
  "/a-propos": {
    label: "LE CABINET",
    tabs: [
      { label: "Mission", anchor: "#mission" },
      { label: "Approche", anchor: "#approche" },
      { label: "Valeurs", anchor: "#valeurs" },
      { label: "Implantations", anchor: "#implantations" },
    ],
  },
  "/secteurs": {
    label: "SECTEURS",
    tabs: [
      { label: "Gouv.", anchor: "#gouvernement" },
      { label: "Web & App", anchor: "#applications" },
      { label: "IA", anchor: "#ia" },
      { label: "Réseau", anchor: "#connectivite" },
      { label: "Sécurité", anchor: "#securite" },
      { label: "Finance", anchor: "#finance" },
      { label: "Santé", anchor: "#sante" },
      { label: "Agri.", anchor: "#agriculture" },
    ],
  },
  "/pnd-rca-tri": {
    label: "PND RCA & TRI",
    tabs: [
      { label: "Contexte", anchor: "#contexte" },
      { label: "Rôle GIRA", anchor: "#role" },
      { label: "Résultats TRI", anchor: "#resultats" },
    ],
  },
  "/reseau-diaspora": {
    label: "RÉSEAU & DIASPORA",
    tabs: [
      { label: "Notre réseau", anchor: "#reseau" },
      { label: "Experts", anchor: "#experts" },
      { label: "Rejoindre", anchor: "#rejoindre" },
    ],
  },
  "/carrieres": {
    label: "CARRIÈRES",
    tabs: [
      { label: "Pourquoi GIRA", anchor: "#pourquoi" },
      { label: "Profils recherchés", anchor: "#profils" },
      { label: "Postuler", anchor: "#postuler" },
    ],
  },
  "/contact": {
    label: "CONTACT",
    tabs: [
      { label: "Formulaire", anchor: "#formulaire" },
      { label: "Coordonnées", anchor: "#coordonnees" },
    ],
  },
  "/actualites": {
    label: "ACTUALITÉS",
    tabs: [
      { label: "Toutes", anchor: "#toutes" },
      { label: "Analyses", anchor: "#analyses" },
      { label: "Publications", anchor: "#publications" },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [menuOpen, setMenuOpen]               = useState(false);
  const [activeSection, setActiveSection]     = useState<string | null>(null);
  const [hoveredItem, setHoveredItem]         = useState<NavSubItem | null>(null);
  const [lang, setLang]                       = useState<"FR" | "EN">("FR");
  const [activeTab, setActiveTab]             = useState(0);
  const [isDark, setIsDark]                   = useState(false);
  const pathname  = usePathname();
  const router    = useRouter();
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Resolved early — used in useEffects below */
  const pageContext = PAGE_CONTEXTS[pathname] ?? null;

  /* Detect dark hero background */
  useEffect(() => {
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

  /* ── IntersectionObserver : met à jour activeTab selon la section visible */
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
    // Pre-select the section that matches current pathname
    const matchedSection = sections.find((sec) =>
      sec.href === pathname ||
      sec.items.some((item) => pathname.startsWith(item.href.split("#")[0]) && item.href.split("#")[0] !== "/")
    ) ?? sections[0];
    setMenuOpen(true);
    setActiveSection(matchedSection.label);
    setHoveredItem(matchedSection.items[0]);
  }, [pathname]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setActiveSection(null);
    setHoveredItem(null);
  }, []);

  const toggleMenu = useCallback(
    () => (menuOpen ? closeMenu() : openMenu()),
    [menuOpen, closeMenu, openMenu]
  );

  /* Debounced hover. Évite les flickers */
  const handleItemHover = useCallback((item: NavSubItem) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setHoveredItem(item), 60);
  }, []);

  /* Click sub-item → navigate & close */
  const handleItemClick = useCallback(
    (item: NavSubItem) => {
      closeMenu();
      router.push(item.href);
    },
    [closeMenu, router]
  );

  const currentSection = sections.find((s) => s.label === activeSection);

  /* ── Pill tokens */
  const dark      = isDark && !menuOpen;
  const pillBg    = dark ? "rgba(255,255,255,0.10)" : "#FFFFFF";
  const pillBrd   = dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)";
  const pillSh    = dark ? "0 2px 16px rgba(0,0,0,0.30)" : "0 2px 12px rgba(0,0,0,0.06)";
  const hamBg     = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.05)";
  const iconClr   = dark ? "#FFFFFF" : "#0D0D0D";
  const logoflt   = dark ? "brightness(0) invert(1)" : "none";
  const txtClr    = dark ? "rgba(255,255,255,0.85)" : "#0D0D0D";
  const txtMuted  = dark ? "rgba(255,255,255,0.50)" : "#888";
  const G         = "#C9A84C";

  /* ── Group helper. Extraire les groupes uniques dans l'ordre */
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

          {/* ── LEFT PILL: hamburger + logo ── */}
          <motion.button
            onClick={toggleMenu}
            className="flex items-center gap-0 rounded-2xl focus:outline-none flex-shrink-0 overflow-hidden"
            style={{
              background: pillBg,
              border: `1px solid ${pillBrd}`,
              boxShadow: pillSh,
              backdropFilter: dark ? "blur(12px)" : "none",
              WebkitBackdropFilter: dark ? "blur(12px)" : "none",
              transition: "background 0.35s, border 0.35s, box-shadow 0.35s",
            }}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            whileTap={{ scale: 0.97 }}
          >
            <div
              className="flex items-center justify-center rounded-xl m-1.5 flex-shrink-0"
              style={{ width: 42, height: 42, background: hamBg, transition: "background 0.35s" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span key="close"
                    initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.18 }}
                  >
                    <X size={18} strokeWidth={2} style={{ color: iconClr }} />
                  </motion.span>
                ) : (
                  <motion.span key="open"
                    initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.18 }}
                  >
                    <Menu size={18} strokeWidth={2} style={{ color: iconClr }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="pr-4 pl-2 flex items-center">
              <Image src="/logoGIRA.png" alt="GIRA" width={80} height={30}
                className="object-contain"
                style={{ filter: logoflt, transition: "filter 0.35s" }}
                priority
              />
            </div>
          </motion.button>

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
                <span
                  className="text-[10px] font-black uppercase tracking-[0.2em] pr-2 border-r flex-shrink-0"
                  style={{ color: G, borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)", fontFamily: "var(--font-montserrat)" }}
                >
                  {pageContext.label}
                </span>

                {/* ── md→lg : compact — only active tab label + counter ── */}
                <div className="flex xl:hidden items-center gap-2 pl-1">
                  <a
                    href={pageContext.tabs[activeTab]?.anchor}
                    onClick={(e) => { e.preventDefault(); scrollToElement(pageContext.tabs[activeTab].anchor); }}
                    className="relative px-3 py-1.5 rounded-xl text-[11px] font-semibold"
                    style={{ color: "#0D0D0D", fontFamily: "var(--font-inter)", textDecoration: "none" }}
                  >
                    <span
                      className="absolute inset-0 rounded-xl"
                      style={{ background: dark ? "rgba(201,168,76,0.85)" : "rgba(201,168,76,0.15)" }}
                    />
                    <span className="relative z-10">{pageContext.tabs[activeTab]?.label}</span>
                  </a>
                  {/* Prev / Next micro-arrows */}
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => {
                        const prev = (activeTab - 1 + pageContext.tabs.length) % pageContext.tabs.length;
                        setActiveTab(prev);
                        scrollToElement(pageContext.tabs[prev].anchor);
                      }}
                      className="w-5 h-5 flex items-center justify-center rounded-lg transition-opacity hover:opacity-70"
                      style={{ color: txtMuted, fontSize: 14 }}
                      aria-label="Onglet précédent"
                    >‹</button>
                    <button
                      onClick={() => {
                        const next = (activeTab + 1) % pageContext.tabs.length;
                        setActiveTab(next);
                        scrollToElement(pageContext.tabs[next].anchor);
                      }}
                      className="w-5 h-5 flex items-center justify-center rounded-lg transition-opacity hover:opacity-70"
                      style={{ color: txtMuted, fontSize: 14 }}
                      aria-label="Onglet suivant"
                    >›</button>
                  </div>
                  <span
                    className="text-[10px] tabular-nums"
                    style={{ color: txtMuted, fontFamily: "var(--font-inter)" }}
                  >
                    {activeTab + 1}/{pageContext.tabs.length}
                  </span>
                </div>

                {/* ── xl+ (large desktop) : full tabs row ── */}
                <div className="hidden xl:flex items-center gap-0.5 pl-1">
                  {pageContext.tabs.map((tab, i) => {
                    const isA = i === activeTab;
                    return (
                      <a key={tab.anchor} href={tab.anchor}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab(i);
                          scrollToElement(tab.anchor);
                        }}
                        className="relative px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-colors duration-200"
                        style={{ color: isA ? "#0D0D0D" : txtMuted, fontFamily: "var(--font-inter)", textDecoration: "none" }}
                      >
                        {isA && (
                          <motion.span layoutId="ctx-tab-bg"
                            className="absolute inset-0 rounded-xl"
                            style={{ background: dark ? "rgba(201,168,76,0.85)" : "rgba(201,168,76,0.15)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
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
            <button onClick={() => setLang(lang === "FR" ? "EN" : "FR")}
              className="flex items-center gap-1.5 px-2 py-1 rounded-xl text-[11px] font-semibold tracking-wider transition-colors"
              style={{ color: txtMuted }}
            >
              <Globe size={12} style={{ color: G }} />
              <span style={{ color: lang === "FR" ? G : txtMuted }}>FR</span>
              <span style={{ color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)" }}>|</span>
              <span style={{ color: lang === "EN" ? G : txtMuted }}>EN</span>
            </button>
            <Link href="/contact"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: G, color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
            >
              Initier un mandat
              <ArrowRight size={11} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>
      </header>

      {/* ══════════════════════════════════════
          MEGA-MENU PANEL (full-screen)
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

            {/* ──────────────────────────────────
                LEFT SIDEBAR
            ────────────────────────────────── */}
            <div
              className="w-full md:w-[360px] lg:w-[400px] h-full flex flex-col bg-white border-r overflow-y-auto flex-shrink-0 overscroll-contain"
              style={{ borderColor: "rgba(0,0,0,0.05)" }}
              data-lenis-prevent
            >
              {/* Section tabs */}
              <nav className="flex-1 px-5 lg:px-7 pt-6 pb-4">

                {/* ── Top-level section buttons ── */}
                <div className="flex flex-col gap-1 mb-6">
                  {sections.map((sec) => {
                    const isA = activeSection === sec.label;
                    return (
                      <button
                        key={sec.label}
                        onClick={() => {
                          setActiveSection(isA ? null : sec.label);
                          if (!isA) setHoveredItem(sec.items[0]);
                        }}
                        className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-all duration-200"
                        style={{
                          backgroundColor: isA ? "#0D0D0D" : "transparent",
                        }}
                      >
                        <span
                          className="text-base font-bold tracking-tight"
                          style={{
                            color: isA ? "#FFFFFF" : "#333",
                            fontFamily: "var(--font-montserrat)",
                            transition: "color 0.2s",
                          }}
                        >
                          {sec.label}
                        </span>
                        <ChevronRight
                          size={15}
                          style={{
                            color: isA ? G : "#ccc",
                            transform: isA ? "rotate(90deg)" : "rotate(0deg)",
                            transition: "transform 0.22s, color 0.22s",
                          }}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* ── Sub-items with group headers ── */}
                <AnimatePresence initial={false}>
                  {currentSection && (
                    <motion.div
                      key={currentSection.label}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      {/* Thin gold separator */}
                      <div className="h-px mx-4 mb-5" style={{ backgroundColor: "rgba(201,168,76,0.2)" }} />

                      {getGroups(currentSection.items).map((grp) => (
                        <div key={grp} className="mb-4">
                          {/* Group label */}
                          <p
                            className="text-[9px] font-black uppercase tracking-[0.32em] px-4 mb-2"
                            style={{ color: "rgba(201,168,76,0.65)", fontFamily: "var(--font-inter)" }}
                          >
                            {grp}
                          </p>

                          {/* Items in this group */}
                          {currentSection.items
                            .filter((it) => it.group === grp)
                            .map((item) => {
                              const isSel = hoveredItem?.label === item.label;
                              return (
                                <button
                                  key={item.label}
                                  onMouseEnter={() => handleItemHover(item)}
                                  onClick={() => handleItemClick(item)}
                                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left group transition-all duration-150 mb-0.5"
                                  style={{
                                    backgroundColor: isSel ? "rgba(201,168,76,0.07)" : "transparent",
                                  }}
                                >
                                  <span
                                    className="text-[13px] leading-snug transition-colors duration-150"
                                    style={{
                                      color: isSel ? "#0D0D0D" : "#555",
                                      fontWeight: isSel ? 600 : 400,
                                      fontFamily: "var(--font-inter)",
                                    }}
                                  >
                                    {item.label}
                                  </span>
                                  <ArrowRight
                                    size={12}
                                    style={{
                                      color: isSel ? G : "transparent",
                                      transition: "color 0.15s",
                                      flexShrink: 0,
                                    }}
                                  />
                                </button>
                              );
                            })}
                        </div>
                      ))}

                      {/* "Voir tout →" for section */}
                      <Link
                        href={currentSection.href}
                        onClick={closeMenu}
                        className="flex items-center gap-2 px-4 py-2.5 mt-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors"
                        style={{ color: "#aaa", fontFamily: "var(--font-inter)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = G)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
                      >
                        Voir tout
                        <ArrowRight size={11} strokeWidth={2.5} />
                      </Link>

                      <div className="h-px mx-4 mt-4 mb-1" style={{ backgroundColor: "rgba(0,0,0,0.05)" }} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Direct links (hors méga-menu) ── */}
                <div className="mt-4 flex flex-col gap-0.5">
                  {[
                    { label: "Actualités", href: "/actualites" },
                    { label: "Contact", href: "/contact" },
                  ].map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors"
                      style={{ color: "#777", fontFamily: "var(--font-inter)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#0D0D0D"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#777"; }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Bottom CTA */}
              <div className="px-5 lg:px-7 pt-4 pb-10 md:pb-6 border-t mt-auto flex-shrink-0"
                style={{ borderColor: "rgba(0,0,0,0.05)" }}
              >
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all hover:opacity-90"
                  style={{ backgroundColor: G, color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
                >
                  Initier un mandat
                  <ArrowRight size={13} strokeWidth={2.5} />
                </Link>
                <p className="text-center text-[10px] mt-3" style={{ color: "#bbb", fontFamily: "var(--font-inter)" }}>
                  Paris · Casablanca · Bratislava
                </p>
              </div>
            </div>

            {/* ──────────────────────────────────
                RIGHT PREVIEW PANEL
            ────────────────────────────────── */}
            <div className="hidden md:flex flex-1 overflow-hidden relative bg-[#F5F4F0]">
              <AnimatePresence mode="wait">
                {hoveredItem ? (
                  <motion.div
                    key={hoveredItem.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col"
                  >
                    {/* Image full-bleed — 55% hauteur */}
                    <div className="relative w-full" style={{ height: "52%" }}>
                      <Image
                        src={hoveredItem.img}
                        alt={hoveredItem.label}
                        fill
                        className="object-cover"
                        sizes="900px"
                        unoptimized
                      />
                      {/* Gradient bottom → fond panel */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(245,244,240,0.0) 40%, rgba(245,244,240,1) 100%)",
                        }}
                      />
                      {/* Breadcrumb en haut gauche */}
                      <div className="absolute top-6 left-8 flex items-center gap-2">
                        <span
                          className="text-[9px] font-black uppercase tracking-[0.35em] bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full"
                          style={{ color: G, fontFamily: "var(--font-inter)" }}
                        >
                          {currentSection?.label}
                        </span>
                        <ChevronRight size={10} style={{ color: "rgba(255,255,255,0.5)" }} />
                        <span
                          className="text-[9px] font-semibold uppercase tracking-[0.2em] bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full"
                          style={{ color: "rgba(255,255,255,0.9)", fontFamily: "var(--font-inter)" }}
                        >
                          {hoveredItem.group}
                        </span>
                      </div>
                    </div>

                    {/* Text zone */}
                    <div className="flex-1 px-10 py-7 flex flex-col justify-between">
                      <div>
                        <h3
                          className="text-3xl lg:text-4xl font-black leading-tight mb-4"
                          style={{ fontFamily: "var(--font-montserrat)", color: "#0D0D0D" }}
                        >
                          {hoveredItem.label}
                        </h3>
                        <p
                          className="text-[15px] leading-relaxed"
                          style={{ color: "#555", fontFamily: "var(--font-inter)", maxWidth: 520 }}
                        >
                          {hoveredItem.desc}
                        </p>
                      </div>

                      {/* CTA row */}
                      <div className="flex items-center justify-between mt-6">
                        <button
                          onClick={() => handleItemClick(hoveredItem)}
                          className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all group"
                          style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", fontFamily: "var(--font-inter)" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = G; (e.currentTarget as HTMLElement).style.color = "#0D0D0D"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#0D0D0D"; (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; }}
                        >
                          Voir la page
                          <ArrowRight size={13} strokeWidth={2.5} />
                        </button>

                        {/* Page URL hint */}
                        <span
                          className="text-[10px] font-mono"
                          style={{ color: "#bbb", fontFamily: "var(--font-inter)" }}
                        >
                          gira-cf.com{hoveredItem.href}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* État vide. Aperçu global section */
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-start justify-center w-full h-full px-14"
                  >
                    <Image
                      src="/logoGIRA.png"
                      alt="GIRA"
                      width={72}
                      height={28}
                      className="object-contain mb-8 opacity-30"
                    />
                    <p
                      className="text-[11px] font-black uppercase tracking-[0.3em] mb-4"
                      style={{ color: G, fontFamily: "var(--font-inter)" }}
                    >
                      {currentSection?.label ?? "Navigation"}
                    </p>
                    <p
                      className="text-xl leading-relaxed"
                      style={{ color: "#555", fontFamily: "var(--font-inter)", maxWidth: 420 }}
                    >
                      {currentSection?.overview ?? "Sélectionnez une rubrique pour explorer notre offre."}
                    </p>
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
