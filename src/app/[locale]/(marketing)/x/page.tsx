"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ArrowRight, Play, X, ChevronRight, Brain, Landmark, Server, LineChart } from "lucide-react";

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */

const STATS_DATA = {
  fr: [
    { value: 45,  suffix: "+", label: "Experts mobilisés",    sub: "sur 3 continents" },
    { value: 4,   suffix: "",  label: "Domaines tech",         sub: "Data, GovTech, Infra, Finance" },
    { value: 8,   suffix: "",  label: "Secteurs couverts",     sub: "de l'eau à la connectivité" },
    { value: 3,   suffix: "",  label: "Pays de présence",      sub: "Paris · Marrakech · Bratislava" },
  ],
  en: [
    { value: 45,  suffix: "+", label: "Mobilized experts",     sub: "across 3 continents" },
    { value: 4,   suffix: "",  label: "Tech domains",           sub: "Data, GovTech, Infra, Finance" },
    { value: 8,   suffix: "",  label: "Sectors covered",        sub: "from water to connectivity" },
    { value: 3,   suffix: "",  label: "Countries of presence",  sub: "Paris · Marrakech · Bratislava" },
  ],
};

const CAPABILITIES_DATA = {
  fr: [
    {
      icon: Brain,
      title: "Data & IA",
      headline: "La donnée au service de la décision",
      desc: "Nous concevons des systèmes d'intelligence artificielle et d'analyse de la donnée pour les institutions africaines. De la collecte terrain à la décision stratégique, chaque octet compte.",
      points: ["Modèles IA sur mesure", "Tableaux de bord analytiques", "Automatisation des rapports", "Prédiction et aide à la décision"],
      bg: "from-[#0D0D0D] to-[#111827]",
    },
    {
      icon: Landmark,
      title: "Digital Gov",
      headline: "Numériser l'État, rapprocher les citoyens",
      desc: "Portails gouvernementaux, e-services publics, systèmes d'identité numérique. Nous accompagnons les États dans leur transformation digitale, de la conception à l'opération.",
      points: ["Portails institutionnels", "e-Services publics", "Identité numérique", "Formation des agents"],
      bg: "from-[#111827] to-[#1a1a2e]",
    },
    {
      icon: Server,
      title: "Infrastructure Tech",
      headline: "Des systèmes robustes pour des projets complexes",
      desc: "Supervision des chantiers, IoT sur les projets d'eau et d'énergie, connectivité en zones reculées. Nous posons les fondations numériques des infrastructures de demain.",
      points: ["IoT et capteurs terrain", "Connectivité satellite", "Supervision en temps réel", "Résilience et redondance"],
      bg: "from-[#1a1a2e] to-[#0D0D0D]",
    },
    {
      icon: LineChart,
      title: "Finance & Impact",
      headline: "Mesurer et maximiser l'impact réel",
      desc: "Reporting ESG automatisé, outils de suivi des investissements, plateformes de mobilisation des bailleurs. Nous donnons aux acteurs financiers la visibilité dont ils ont besoin.",
      points: ["Reporting ESG automatisé", "Suivi des investissements", "Outils de mobilisation", "Impact measurement"],
      bg: "from-[#0D0D0D] to-[#111111]",
    },
  ],
  en: [
    {
      icon: Brain,
      title: "Data & AI",
      headline: "Data in service of decisions",
      desc: "We design artificial intelligence and data analysis systems for African institutions. From field collection to strategic decision, every byte counts.",
      points: ["Custom AI models", "Analytical dashboards", "Report automation", "Prediction and decision support"],
      bg: "from-[#0D0D0D] to-[#111827]",
    },
    {
      icon: Landmark,
      title: "Digital Gov",
      headline: "Digitize the state, bring citizens closer",
      desc: "Government portals, public e-services, digital identity systems. We support states in their digital transformation, from design to operation.",
      points: ["Institutional portals", "Public e-Services", "Digital identity", "Agent training"],
      bg: "from-[#111827] to-[#1a1a2e]",
    },
    {
      icon: Server,
      title: "Tech Infrastructure",
      headline: "Robust systems for complex projects",
      desc: "Site supervision, IoT on water and energy projects, connectivity in remote areas. We lay the digital foundations for tomorrow's infrastructure.",
      points: ["IoT and field sensors", "Satellite connectivity", "Real-time supervision", "Resilience and redundancy"],
      bg: "from-[#1a1a2e] to-[#0D0D0D]",
    },
    {
      icon: LineChart,
      title: "Finance & Impact",
      headline: "Measure and maximize real impact",
      desc: "Automated ESG reporting, investment tracking tools, donor mobilization platforms. We give financial stakeholders the visibility they need.",
      points: ["Automated ESG reporting", "Investment tracking", "Mobilization tools", "Impact measurement"],
      bg: "from-[#0D0D0D] to-[#111111]",
    },
  ],
};

const TEAM_SLOTS_DATA = {
  fr: [
    { initials: "DG", role: "Fondateur & Directeur Général" },
    { initials: "DT", role: "Directrice Technique" },
    { initials: "RI", role: "Responsable Innovation" },
    { initials: "RP", role: "Responsable Partenariats" },
    { initials: "RO", role: "Responsable Opérations" },
  ],
  en: [
    { initials: "DG", role: "Founder & CEO" },
    { initials: "DT", role: "Technical Director" },
    { initials: "RI", role: "Head of Innovation" },
    { initials: "RP", role: "Head of Partnerships" },
    { initials: "RO", role: "Head of Operations" },
  ],
};

const GIRA_X_DATA = {
  fr: {
    hero: {
      titleLine1: "Nous Bâtissons",
      titleLine2: "le Futur",
      titleLine3: "de l\u2019Afrique.",
      subtitle: "GIRA Dev est l\u2019unit\u00e9 tech et innovation de GIRA. Nous construisons les outils num\u00e9riques qui transforment durablement l\u2019Afrique.",
      cta1: "Voir la vid\u00e9o",
      cta2: "Nous contacter",
    },
    manifesto: {
      h2: "Nous r\u00e9inventons l\u2019ex\u00e9cution des projets structurants par la technologie, la donn\u00e9e et l\u2019innovation.",
      para: "L\u2019Afrique a besoin d\u2019outils con\u00e7us pour ses r\u00e9alit\u00e9s. Ses contraintes de connectivit\u00e9, ses structures administratives, ses langues, ses donn\u00e9es. GIRA Dev construit ces outils avec des ing\u00e9nieurs, des designers et des experts du d\u00e9veloppement africain. Nous sommes des b\u00e2tisseurs.",
      cta: "Nous contacter",
    },
    impact: {
      badge: "Notre trajectoire",
      h2line1: "Nous d\u00e9marrons.",
      h2em: "Construisons ensemble.",
      para: "GIRA Dev vient de na\u00eetre. Nos premiers projets sont en cours de structuration. Nous cherchons des partenaires, des institutions et des organisations visionnaires pr\u00eats \u00e0 co-construire les solutions num\u00e9riques de l\u2019Afrique de demain.",
      cta: "D\u00e9marrer un projet",
      pipeline: [
        { num: "01", titre: "Projets en pipeline", desc: "Plusieurs mandats de structuration et de d\u00e9veloppement tech sont en cours de cadrage avec des institutions africaines et des bailleurs internationaux." },
        { num: "02", titre: "Partenaires strat\u00e9giques", desc: "Nous activons notre r\u00e9seau de 45+ experts pour constituer des \u00e9quipes pluridisciplinaires d\u00e9di\u00e9es \u00e0 chaque projet, secteur par secteur." },
        { num: "03", titre: "Ambition continentale", desc: "De Paris \u00e0 Marrakech, de Bratislava \u00e0 Bangui. GIRA Dev se positionne comme le partenaire tech de r\u00e9f\u00e9rence pour l\u2019ex\u00e9cution des projets structurants en Afrique." },
      ],
    },
    capabilities: {
      badge: "Nos capacit\u00e9s",
      h2line1: "Ce que nous",
      h2line2: "faisons",
      para: "GIRA Dev r\u00e9unit ing\u00e9nieurs, designers et experts du d\u00e9veloppement africain pour livrer des solutions num\u00e9riques int\u00e9gr\u00e9es, du prototype au d\u00e9ploiement national.",
      cta: "Parlons de votre projet",
      accordionCta: "Discutons de votre projet",
    },
    team: {
      badge: "Les b\u00e2tisseurs",
      h2: "Notre \u00c9quipe",
      subtitle: "Cinq profils compl\u00e9mentaires, un objectif commun. Rejoignez-nous ou collaborons ensemble.",
      photoPlaceholder: "Photo \u00e0 venir",
      memberLabel: "Membre",
      cta: "Nous rejoindre",
    },
    domaines: {
      badge: "Nos quatre domaines",
      h2: "Choisissez votre domaine",
      para: "Chaque domaine GIRA Dev est une unit\u00e9 d\u2019expertise autonome, avec ses propres cas d\u2019usage, outils et \u00e9quipes terrain.",
      items: [
        {
          label: "Data & IA",
          sub: "Syst\u00e8mes intelligents",
          desc: "ML, dashboards analytiques, NLP en langues locales. La donn\u00e9e au service de la d\u00e9cision strat\u00e9gique.",
          discover: "D\u00e9couvrir",
        },
        {
          label: "Digital Gov",
          sub: "e-Services publics",
          desc: "Portails minist\u00e9riels, identit\u00e9 num\u00e9rique, e-services citoyens. Num\u00e9riser l\u2019\u00c9tat pour rapprocher les citoyens.",
          discover: "D\u00e9couvrir",
        },
        {
          label: "Infrastructure",
          sub: "IoT & supervision",
          desc: "Capteurs IoT, connectivit\u00e9 satellite, supervision temps r\u00e9el des chantiers eau, \u00e9nergie et transport.",
          discover: "D\u00e9couvrir",
        },
        {
          label: "Finance & Impact",
          sub: "ESG & investissements",
          desc: "Reporting ESG automatis\u00e9, suivi des investissements, mobilisation des bailleurs institutionnels.",
          discover: "D\u00e9couvrir",
        },
      ],
    },
    insights: {
      badge: "Publications & Insights",
      h2: "Nos analyses arrivent.",
      h3: "Nos publications et analyses sectorielles seront disponibles tr\u00e8s prochainement.",
      para: "Data, IA, GovTech, infrastructure num\u00e9rique en Afrique. Notre \u00e9quipe pr\u00e9pare des analyses pointues sur les enjeux tech du continent. En attendant, retrouvez nos actualit\u00e9s g\u00e9n\u00e9rales GIRA.",
      ctaNews: "Voir les actualit\u00e9s GIRA",
      ctaNotify: "\u00catre notifi\u00e9",
    },
    cta: {
      h2line1: "Un projet tech",
      h2em: "pour l\u2019Afrique\u00a0?",
      para: "Parlons-en. GIRA Dev met \u00e0 votre disposition une \u00e9quipe pr\u00eate \u00e0 co-construire la solution avec vous, d\u00e8s maintenant.",
      btn: "D\u00e9marrer un projet",
    },
    videoCloseAriaLabel: "Fermer la vid\u00e9o",
  },
  en: {
    hero: {
      titleLine1: "We Build",
      titleLine2: "the Future",
      titleLine3: "of Africa.",
      subtitle: "GIRA Dev is the tech and innovation unit of GIRA. We build the digital tools that sustainably transform Africa.",
      cta1: "Watch the video",
      cta2: "Contact us",
    },
    manifesto: {
      h2: "We are reinventing the execution of structural projects through technology, data and innovation.",
      para: "Africa needs tools designed for its realities. Its connectivity constraints, administrative structures, languages, data. GIRA Dev builds these tools with engineers, designers and experts in African development. We are builders.",
      cta: "Contact us",
    },
    impact: {
      badge: "Our trajectory",
      h2line1: "We are starting.",
      h2em: "Let\u2019s build together.",
      para: "GIRA Dev was just born. Our first projects are being structured. We are looking for visionary partners, institutions and organizations ready to co-build the digital solutions of tomorrow\u2019s Africa.",
      cta: "Start a project",
      pipeline: [
        { num: "01", titre: "Projects in pipeline", desc: "Several structuring and tech development mandates are being scoped with African institutions and international donors." },
        { num: "02", titre: "Strategic partners", desc: "We are activating our network of 45+ experts to form multidisciplinary teams dedicated to each project, sector by sector." },
        { num: "03", titre: "Continental ambition", desc: "From Paris to Marrakech, from Bratislava to Bangui. GIRA Dev positions itself as the reference tech partner for the execution of structural projects in Africa." },
      ],
    },
    capabilities: {
      badge: "Our capabilities",
      h2line1: "What we",
      h2line2: "do",
      para: "GIRA Dev brings together engineers, designers and African development experts to deliver integrated digital solutions, from prototype to national deployment.",
      cta: "Let\u2019s talk about your project",
      accordionCta: "Let\u2019s discuss your project",
    },
    team: {
      badge: "The builders",
      h2: "Our Team",
      subtitle: "Five complementary profiles, one common goal. Join us or let\u2019s collaborate.",
      photoPlaceholder: "Coming soon",
      memberLabel: "Member",
      cta: "Join us",
    },
    domaines: {
      badge: "Our four domains",
      h2: "Choose your domain",
      para: "Each GIRA Dev domain is an autonomous expertise unit, with its own use cases, tools and field teams.",
      items: [
        {
          label: "Data & AI",
          sub: "Intelligent systems",
          desc: "ML, analytical dashboards, NLP in local languages. Data in service of strategic decision-making.",
          discover: "Discover",
        },
        {
          label: "Digital Gov",
          sub: "Public e-Services",
          desc: "Ministerial portals, digital identity, citizen e-services. Digitizing the state to bring citizens closer.",
          discover: "Discover",
        },
        {
          label: "Infrastructure",
          sub: "IoT & supervision",
          desc: "IoT sensors, satellite connectivity, real-time supervision of water, energy and transport projects.",
          discover: "Discover",
        },
        {
          label: "Finance & Impact",
          sub: "ESG & investments",
          desc: "Automated ESG reporting, investment tracking, mobilization of institutional donors.",
          discover: "Discover",
        },
      ],
    },
    insights: {
      badge: "Publications & Insights",
      h2: "Our analyses are coming.",
      h3: "Our publications and sector analyses will be available very soon.",
      para: "Data, AI, GovTech, digital infrastructure in Africa. Our team is preparing in-depth analyses on the tech challenges of the continent. In the meantime, find our general GIRA news.",
      ctaNews: "See GIRA news",
      ctaNotify: "Get notified",
    },
    cta: {
      h2line1: "A tech project",
      h2em: "for Africa?",
      para: "Let\u2019s talk. GIRA Dev puts a team at your disposal ready to co-build the solution with you, right now.",
      btn: "Start a project",
    },
    videoCloseAriaLabel: "Close video",
  },
};

/* ══════════════════════════════════════════════════════════
   COUNT-UP HOOK
══════════════════════════════════════════════════════════ */
function useCountUp(target: number, duration = 1800, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (frame >= totalFrames) { setCount(target); clearInterval(timer); }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

function StatCard({ value, suffix, label, sub, started }: {
  value: number; suffix: string; label: string; sub: string; started: boolean;
}) {
  const count = useCountUp(value, 1800, started);
  return (
    <div className="border-t pt-8" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none mb-3 tabular-nums" style={{ fontFamily: "var(--font-playfair)", color: "#FFFFFF" }}>
        {count}{suffix}
      </div>
      <div className="text-xs font-bold uppercase tracking-[0.18em] mb-1" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>{label}</div>
      <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>{sub}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HORIZONTAL ACCORDION (capabilities)
══════════════════════════════════════════════════════════ */

type CapabilityItem = {
  icon: React.ElementType;
  title: string;
  headline: string;
  desc: string;
  points: string[];
  bg: string;
};

function CapabilitiesAccordion({ capabilities, accordionCta }: { capabilities: CapabilityItem[]; accordionCta: string }) {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* ── Mobile : accordion vertical ── */}
      <div className="md:hidden">
        {capabilities.map((cap, i) => {
          const isOpen = active === i;
          const Icon = cap.icon;
          return (
            <div
              key={i}
              className={`bg-gradient-to-b ${cap.bg}`}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <button
                onClick={() => setActive(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} style={{ color: "#C9A84C" }} strokeWidth={1.5} />
                  <span
                    className="text-sm font-bold text-white"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {cap.title}
                  </span>
                </div>
                <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronRight size={16} style={{ color: "rgba(255,255,255,0.35)" }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-6 pb-8 pt-1">
                      <p
                        className="text-sm leading-relaxed mb-5"
                        style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}
                      >
                        {cap.desc}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {cap.points.map((pt, j) => (
                          <li
                            key={j}
                            className="flex items-center gap-2 text-xs"
                            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-inter)" }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#C9A84C" }} />
                            {pt}
                          </li>
                        ))}
                      </ul>
                      <Link href="/contact" className="gx-btn-gold inline-flex text-xs px-4 py-2.5">
                        {accordionCta} <ArrowRight size={12} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ── Desktop : accordion horizontal ── */}
      <div className="hidden md:flex h-[520px] w-full overflow-hidden">
        {capabilities.map((cap, i) => {
          const isActive = active === i;
          const Icon = cap.icon;
          return (
            <motion.div
              key={i}
              animate={{ flex: isActive ? 5 : 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActive(i)}
              className={`relative overflow-hidden cursor-pointer bg-gradient-to-b ${cap.bg} flex flex-col justify-end`}
              style={{ borderRight: i < capabilities.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", minWidth: 0 }}
            >
              {/* Collapsed: vertical label */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-3"
                  >
                    <Icon size={22} style={{ color: "#C9A84C", flexShrink: 0 }} strokeWidth={1.5} />
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap"
                      style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", fontFamily: "var(--font-inter)" }}
                    >
                      {cap.title}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expanded: full content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="relative z-10 p-8 md:p-12 flex flex-col justify-end h-full"
                  >
                    <div className="mb-auto pt-8">
                      <Icon size={36} style={{ color: "#C9A84C" }} strokeWidth={1.2} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: "rgba(201,168,76,0.7)", fontFamily: "var(--font-inter)" }}>
                        GIRA Dev
                      </span>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                        {cap.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-6 max-w-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}>
                        {cap.desc}
                      </p>
                      <ul className="space-y-1.5 mb-8">
                        {cap.points.map((pt, j) => (
                          <li key={j} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-inter)" }}>
                            <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "#C9A84C" }} />
                            {pt}
                          </li>
                        ))}
                      </ul>
                      <Link href="/contact" className="gx-btn-gold inline-flex text-xs px-5 py-3">
                        {accordionCta}
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover glow */}
              {!isActive && (
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(201,168,76,0.04), transparent)" }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════ */
export default function GiraXPage() {
  const locale = useLocale() as "fr" | "en";
  const t = GIRA_X_DATA[locale];
  const STATS = STATS_DATA[locale];
  const CAPABILITIES = CAPABILITIES_DATA[locale];
  const TEAM_SLOTS = TEAM_SLOTS_DATA[locale];

  const [videoOpen, setVideoOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const heroRef  = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleKey = useCallback((e: KeyboardEvent) => { if (e.key === "Escape") setVideoOpen(false); }, []);
  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const domainHrefs = ["/x/data-ia", "/x/digital-gov", "/x/infrastructure", "/x/finance-impact"];
  const domainColors = ["#C9A84C", "#4ade80", "#60a5fa", "#a78bfa"];
  const domainIcons = [Brain, Landmark, Server, LineChart];

  return (
    <div style={{ backgroundColor: "#0D0D0D" }}>

      {/* ════════════════════════════════════════════
          S1 — HERO
      ════════════════════════════════════════════ */}
      <section id="vision" ref={heroRef} className="relative w-full min-h-screen overflow-hidden flex items-end">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }}>
          <source src="https://media-publications.bcg.com/flash/BCGX/bcg_x_launch_film-15s_loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.45) 45%, rgba(13,13,13,0.15) 100%)", zIndex: 1 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,13,13,0.55) 0%, transparent 55%)", zIndex: 1 }} />

        <div className="absolute left-8 md:left-16 lg:left-24 z-10" style={{ top: "calc(76px + 24px)" }}>
          <span className="text-[10px] uppercase tracking-[0.45em] font-bold" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>GIRA Dev</span>
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, zIndex: 10 }}
          className="relative w-full max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 pt-[120px] pb-24 md:pb-32"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.04] tracking-tight text-white max-w-3xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t.hero.titleLine1}<br />
            <em>{t.hero.titleLine2}</em><br />
            {t.hero.titleLine3}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base md:text-lg max-w-md leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-inter)" }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <button onClick={() => setVideoOpen(true)} className="gx-btn-gold inline-flex items-center gap-3 self-start">
              <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center shrink-0">
                <Play size={9} fill="currentColor" />
              </span>
              {t.hero.cta1}
            </button>
            <Link href="/contact" className="gx-btn-outline self-start">
              {t.hero.cta2}
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 right-10 z-10">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ChevronRight size={18} className="rotate-90" style={{ color: "rgba(255,255,255,0.25)" }} />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          S2 — MANIFESTO
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-36" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl lg:text-[52px] font-bold leading-[1.1] text-white mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {t.manifesto.h2}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base md:text-lg leading-relaxed mb-10"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-inter)" }}
            >
              {t.manifesto.para}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <Link href="/contact" className="gx-btn-gold inline-flex">{t.manifesto.cta}</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          S3 — STATS
      ════════════════════════════════════════════ */}
      <section ref={statsRef} className="py-20 md:py-28" style={{ backgroundColor: "#111111", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            {STATS.map((s, i) => (
              <StatCard key={i} {...s} started={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          S4 — NOTRE VISION D'IMPACT (honnête)
          Transition dégradée vers la section suivante
      ════════════════════════════════════════════ */}
      <section id="impact" className="relative" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 pt-0 pb-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white relative overflow-hidden px-6 pt-10 pb-16 md:px-12 md:pt-16 md:pb-20 lg:px-16"
            style={{ borderRadius: "24px 24px 0 0" }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] block mb-4" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                  {t.impact.badge}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)", color: "#0D0D0D" }}>
                  {t.impact.h2line1}<br />
                  <em>{t.impact.h2em}</em>
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "#666", fontFamily: "var(--font-inter)" }}>
                  {t.impact.para}
                </p>
              </div>
              <Link href="/contact" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider shrink-0 group" style={{ color: "#0D0D0D", fontFamily: "var(--font-inter)" }}>
                {t.impact.cta}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 3 colonnes: ce qu'on prépare */}
            <div className="grid md:grid-cols-3 gap-8">
              {t.impact.pipeline.map((item) => (
                <div key={item.num}>
                  <div className="text-4xl font-black mb-4" style={{ color: "rgba(201,168,76,0.15)", fontFamily: "var(--font-playfair)" }}>{item.num}</div>
                  <h3 className="text-base font-bold mb-2" style={{ fontFamily: "var(--font-montserrat)", color: "#0D0D0D" }}>{item.titre}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#777", fontFamily: "var(--font-inter)" }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Masque de dissolution — la carte blanche se dissout dans le fond sombre */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{
                height: "160px",
                background: "linear-gradient(to bottom, transparent 0%, rgba(17,17,17,0.55) 65%, #111111 100%)",
                zIndex: 10,
              }}
            />
          </motion.div>
        </div>
        {/* Pont de section : le fond sombre s'efface vers le blanc de S5 */}
        <div className="h-20 w-full" style={{ background: "linear-gradient(to bottom, #111111 0%, #FFFFFF 100%)" }} />
      </section>

      {/* ════════════════════════════════════════════
          S5 — CE QUE NOUS FAISONS (accordion horizontal)
      ════════════════════════════════════════════ */}
      <section id="capabilities" className="bg-white pb-0" data-nav-light="true">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 pt-4 pb-20">
          <div className="grid md:grid-cols-2 gap-12 items-end mb-16">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] block mb-4" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                {t.capabilities.badge}
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-[50px] font-bold leading-tight" style={{ fontFamily: "var(--font-playfair)", color: "#0D0D0D" }}>
                {t.capabilities.h2line1}<br />{t.capabilities.h2line2}
              </h2>
            </div>
            <div>
              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "#555", fontFamily: "var(--font-inter)" }}>
                {t.capabilities.para}
              </p>
              <Link href="/contact" className="gx-btn-dark inline-flex">{t.capabilities.cta}</Link>
            </div>
          </div>
        </div>

        {/* Accordion pleine largeur */}
        <CapabilitiesAccordion capabilities={CAPABILITIES} accordionCta={t.capabilities.accordionCta} />
      </section>

      {/* ════════════════════════════════════════════
          S6 — ÉQUIPE (placeholders)
      ════════════════════════════════════════════ */}
      <section id="team" className="py-24 md:py-32 bg-white" data-nav-light="true">
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] block mb-4" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                {t.team.badge}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)", color: "#0D0D0D" }}>
                {t.team.h2}
              </h2>
              <p className="text-base max-w-xl leading-relaxed" style={{ color: "#666", fontFamily: "var(--font-inter)" }}>
                {t.team.subtitle}
              </p>
            </div>
            <Link href="/carrieres" className="gx-btn-dark shrink-0 inline-flex">{t.team.cta}</Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {TEAM_SLOTS.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group"
              >
                {/* Placeholder avatar */}
                <div
                  className="relative aspect-[4/5] rounded-2xl mb-4 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: "#F0EEE8", border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-1" style={{ color: "rgba(201,168,76,0.3)", fontFamily: "var(--font-playfair)" }}>
                      {i + 1}
                    </div>
                    <div className="text-[9px] uppercase tracking-widest" style={{ color: "#ccc", fontFamily: "var(--font-inter)" }}>
                      {t.team.photoPlaceholder}
                    </div>
                  </div>
                  {/* Gold corner accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: "rgba(201,168,76,0.2)" }} />
                </div>
                <div className="text-xs font-semibold" style={{ color: "#0D0D0D", fontFamily: "var(--font-montserrat)" }}>
                  {t.team.memberLabel} {i + 1}
                </div>
                <div className="text-[11px] mt-0.5 leading-snug" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                  {m.role}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          S6.5 — DOMAINES (4 sub-pages)
      ════════════════════════════════════════════ */}
      <section id="domaines" className="py-24 md:py-32" style={{ backgroundColor: "#111111" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span
              className="text-[10px] font-bold uppercase tracking-[0.4em] block mb-4"
              style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
            >
              {t.domaines.badge}
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {t.domaines.h2}
            </h2>
            <p
              className="text-sm md:text-base max-w-xl"
              style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-inter)" }}
            >
              {t.domaines.para}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-10 md:gap-y-14">
            {t.domaines.items.map((domain, i) => {
              const Icon = domainIcons[i];
              const color = domainColors[i];
              const href = domainHrefs[i];
              return (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={href} className="group flex flex-col gap-4 md:gap-5">
                    <Icon size={26} style={{ color }} strokeWidth={1.5} />
                    <div>
                      <div className="w-6 h-px mb-3 md:mb-4" style={{ backgroundColor: color }} />
                      <p
                        className="text-sm md:text-base font-bold text-white mb-1 group-hover:opacity-75 transition-opacity"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                      >
                        {domain.label}
                      </p>
                      <p
                        className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wider mb-3"
                        style={{ color, fontFamily: "var(--font-inter)" }}
                      >
                        {domain.sub}
                      </p>
                      <p
                        className="text-[11px] md:text-xs leading-relaxed hidden sm:block"
                        style={{ color: "rgba(255,255,255,0.38)", fontFamily: "var(--font-inter)" }}
                      >
                        {domain.desc}
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-1.5 text-[11px] md:text-xs font-semibold mt-auto"
                      style={{ color, fontFamily: "var(--font-inter)" }}
                    >
                      {domain.discover}
                      <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          S7 — INSIGHTS (coming soon)
      ════════════════════════════════════════════ */}
      <section id="insights" className="py-24 md:py-32" style={{ backgroundColor: "#0D0D0D" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] block mb-4" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>
                {t.insights.badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                {t.insights.h2}
              </h2>
            </div>
          </div>

          {/* Coming soon state */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-12 py-16 px-10 rounded-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)" }}
          >
            <div className="flex-1">
              <div className="mb-8" style={{ width: 48, height: 2, backgroundColor: "rgba(201,168,76,0.35)" }} />
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                {t.insights.h3}
              </h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
                {t.insights.para}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/actualites" className="gx-btn-gold inline-flex text-xs px-6 py-3">
                  {t.insights.ctaNews}
                </Link>
                <Link href="/contact" className="gx-btn-outline inline-flex text-xs px-6 py-3">
                  {t.insights.ctaNotify}
                </Link>
              </div>
            </div>
            <div className="shrink-0 hidden md:flex flex-col items-center gap-3" style={{ opacity: 0.25 }}>
              {["Data & IA", "GovTech", "Infrastructure", "Finance ESG"].map((tag) => (
                <div key={tag} className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white" style={{ border: "1px solid rgba(255,255,255,0.15)", fontFamily: "var(--font-inter)" }}>
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          S8 — CTA FINAL
      ════════════════════════════════════════════ */}
      <section className="py-24 md:py-36" style={{ backgroundColor: "#111111", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.45em] font-bold block mb-6" style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}>GIRA DEV</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              {t.cta.h2line1}<br />
              <em style={{ color: "#C9A84C" }}>{t.cta.h2em}</em>
            </h2>
            <p className="text-base md:text-lg max-w-lg mx-auto mb-12" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>
              {t.cta.para}
            </p>
            <Link href="/contact" className="gx-btn-gold inline-flex text-sm px-10 py-4">{t.cta.btn}</Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          VIDEO LIGHTBOX
      ════════════════════════════════════════════ */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.96)" }}
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <video autoPlay controls className="w-full h-full object-cover">
                <source src="https://media-publications.bcg.com/flash/BCGX/bcg_x_launch_film-15s_loop.mp4" type="video/mp4" />
              </video>
            </motion.div>
            <button
              onClick={() => setVideoOpen(false)}
              aria-label={t.videoCloseAriaLabel}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <X size={20} color="white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
