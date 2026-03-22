"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";

/* ─── Types ──────────────────────────────────────────── */

interface ServiceSection {
  id: string;
  category: string;
  title: string;
  paragraph: string;
  items: string[];
  image: string;
  imageAlt: string;
  dark: boolean;
  reversed: boolean;
}

/* ─── i18n Data ──────────────────────────────────────── */

const SERVICES_DATA = {
  fr: {
    hero: {
      breadcrumbHome: "Accueil",
      breadcrumbCurrent: "Nos Expertises",
      title: "Nos Expertises",
      subtitle:
        "De la gouvernance digitale à l\u2019intelligence artificielle, nous concevons, développons et déployons des solutions numériques sur mesure.",
    },
    sidebarLabel: "Nos expertises",
    cta: {
      title: "Vous avez un projet numérique stratégique\u00a0?",
      subtitle: "Notre équipe d\u2019experts répond sous 24h.",
      button: "Initier un mandat",
    },
    servicesCta: "Discuter de votre projet",
    services: [
      {
        id: "digitalisation",
        category: "PLATEFORMES & APPLICATIONS",
        title: "Digitalisation Institutionnelle",
        paragraph:
          "GIRA accompagne les États, ambassades et institutions internationales dans leur transformation numérique. Nous concevons et déployons des portails gouvernementaux, des intranets sécurisés, des plateformes de service public et des sites institutionnels de référence. Conformes aux standards internationaux d\u2019accessibilité et de sécurité.",
        items: [
          "Portails gouvernementaux et sites institutionnels officiels",
          "Intranets ministériels et plateformes de gestion documentaire",
          "Sites d\u2019ambassades et consulats. Multilingues et sécurisés",
          "Plateformes de services publics dématérialisés (état civil, impôts, douanes)",
        ],
        image:
          "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1400&q=85&auto=format&fit=crop",
        imageAlt:
          "Immeuble institutionnel moderne illustrant la digitalisation gouvernementale",
        dark: false,
        reversed: false,
      },
      {
        id: "applications",
        category: "PLATEFORMES & APPLICATIONS",
        title: "Développement Web & Mobile",
        paragraph:
          "Des applications web et mobiles sur mesure pour les PME, grandes entreprises et organisations internationales. De la conception UX au déploiement en production, GIRA prend en charge l\u2019intégralité du cycle de développement. Avec une exigence de qualité industrielle.",
        items: [
          "Applications web responsive et Progressive Web Apps (PWA)",
          "Applications mobiles natives iOS et Android",
          "Plateformes e-commerce et marketplaces sectorielles",
          "API et systèmes d\u2019intégration inter-applicatifs",
        ],
        image:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&q=85&auto=format&fit=crop",
        imageAlt:
          "Équipe de développeurs travaillant sur du code dans un bureau moderne",
        dark: true,
        reversed: true,
      },
      {
        id: "ia",
        category: "TECHNOLOGIES ÉMERGENTES",
        title: "Intelligence Artificielle",
        paragraph:
          "GIRA développe et entraîne des modèles d\u2019intelligence artificielle adaptés aux réalités du marché africain. Nous intégrons l\u2019IA dans les systèmes métier des banques, des ministères et des entreprises pour automatiser les processus, prédire les tendances et améliorer la prise de décision.",
        items: [
          "Développement et fine-tuning de modèles de langage (LLM)",
          "Chatbots institutionnels et assistants IA métier",
          "Systèmes de reconnaissance documentaire et OCR intelligent",
          "Tableaux de bord prédictifs et aide à la décision",
        ],
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=85&auto=format&fit=crop",
        imageAlt:
          "Circuit imprimé et composants technologiques symbolisant l\u2019intelligence artificielle",
        dark: false,
        reversed: false,
      },
      {
        id: "connectivite",
        category: "TECHNOLOGIES ÉMERGENTES",
        title: "Connectivité & Points Relais",
        paragraph:
          "GIRA déploie des infrastructures de connectivité dans les zones isolées et péri-urbaines du continent africain. Grâce à la technologie Starlink et à nos hotspots communautaires, nous rendons l\u2019accès à internet abordable. À partir de 200 FCFA pour 30 minutes de connexion.",
        items: [
          "Déploiement de hotspots WiFi communautaires Starlink",
          "Points relais internet à prépaiement (200-300 FCFA / session)",
          "Infrastructure réseau pour écoles, centres de santé et marchés",
          "Supervision et maintenance à distance des équipements",
        ],
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=85&auto=format&fit=crop",
        imageAlt:
          "Vue nocturne de la Terre depuis l\u2019espace montrant les connexions réseau",
        dark: true,
        reversed: true,
      },
      {
        id: "securite",
        category: "SÉCURITÉ & FINANCE",
        title: "Communication Sécurisée",
        paragraph:
          "GIRA met en place des canaux de communication chiffrés pour les institutions qui échangent des données sensibles. Des protocoles diplomatiques aux liaisons inter-ministérielles, nous sécurisons les flux d\u2019information avec des standards de grade gouvernemental.",
        items: [
          "Canaux de communication chiffrés de bout en bout",
          "VPN diplomatiques et réseaux privés inter-institutions",
          "Plateformes de visioconférence sécurisées",
          "Audits de sécurité et conformité aux normes ISO 27001",
        ],
        image:
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&q=85&auto=format&fit=crop",
        imageAlt:
          "Cadenas numérique symbolisant la cybersécurité et le chiffrement",
        dark: false,
        reversed: false,
      },
      {
        id: "fintech",
        category: "SYSTÈMES & INTÉGRATION",
        title: "ERP, Bases de données & Solutions clés en main",
        paragraph:
          "GIRA accompagne entreprises et institutions publiques dans le déploiement de systèmes d\u2019information structurants\u00a0: ERP intégrés, bases de données gouvernementales, outils statistiques et plateformes d\u2019évaluation orientées résultats.",
        items: [
          "Intégration et déploiement de solutions ERP clés en main",
          "Systèmes d\u2019information d\u2019État et bases de données centralisées",
          "Tableaux de bord statistiques et outils de pilotage",
          "Plateformes d\u2019évaluation, de suivi et de reporting institutionnel",
        ],
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=85&auto=format&fit=crop",
        imageAlt:
          "Tableaux de bord et systèmes d\u2019information pour entreprises et institutions publiques",
        dark: true,
        reversed: true,
      },
    ] satisfies ServiceSection[],
  },
  en: {
    hero: {
      breadcrumbHome: "Home",
      breadcrumbCurrent: "Our Expertise",
      title: "Our Expertise",
      subtitle:
        "From digital governance to artificial intelligence, we design, develop and deploy tailor-made digital solutions.",
    },
    sidebarLabel: "Our expertise",
    cta: {
      title: "Do you have a strategic digital project?",
      subtitle: "Our team of experts responds within 24 hours.",
      button: "Initiate a mandate",
    },
    servicesCta: "Discuss your project",
    services: [
      {
        id: "digitalisation",
        category: "PLATFORMS & APPLICATIONS",
        title: "Institutional Digitalisation",
        paragraph:
          "GIRA supports States, embassies and international institutions in their digital transformation. We design and deploy government portals, secure intranets, public service platforms and reference institutional websites. Compliant with international accessibility and security standards.",
        items: [
          "Government portals and official institutional websites",
          "Ministerial intranets and document management platforms",
          "Embassy and consulate websites. Multilingual and secure",
          "Dematerialized public service platforms (civil registration, taxes, customs)",
        ],
        image:
          "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1400&q=85&auto=format&fit=crop",
        imageAlt:
          "Modern institutional building illustrating government digitalisation",
        dark: false,
        reversed: false,
      },
      {
        id: "applications",
        category: "PLATFORMS & APPLICATIONS",
        title: "Web & Mobile Development",
        paragraph:
          "Custom web and mobile applications for SMEs, large companies and international organizations. From UX design to production deployment, GIRA handles the entire development cycle. With an industrial quality requirement.",
        items: [
          "Responsive web applications and Progressive Web Apps (PWA)",
          "Native iOS and Android mobile applications",
          "E-commerce platforms and sectoral marketplaces",
          "APIs and inter-application integration systems",
        ],
        image:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&q=85&auto=format&fit=crop",
        imageAlt:
          "Team of developers working on code in a modern office",
        dark: true,
        reversed: true,
      },
      {
        id: "ia",
        category: "EMERGING TECHNOLOGIES",
        title: "Artificial Intelligence",
        paragraph:
          "GIRA develops and trains artificial intelligence models adapted to the realities of the African market. We integrate AI into the business systems of banks, ministries and companies to automate processes, predict trends and improve decision-making.",
        items: [
          "Development and fine-tuning of language models (LLM)",
          "Institutional chatbots and business AI assistants",
          "Document recognition and intelligent OCR systems",
          "Predictive dashboards and decision support",
        ],
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=85&auto=format&fit=crop",
        imageAlt:
          "Circuit board and technological components symbolizing artificial intelligence",
        dark: false,
        reversed: false,
      },
      {
        id: "connectivite",
        category: "EMERGING TECHNOLOGIES",
        title: "Connectivity & Relay Points",
        paragraph:
          "GIRA deploys connectivity infrastructure in isolated and peri-urban areas of the African continent. Thanks to Starlink technology and our community hotspots, we make internet access affordable. Starting from 200 FCFA for 30 minutes of connection.",
        items: [
          "Deployment of Starlink community WiFi hotspots",
          "Prepaid internet relay points (200-300 FCFA / session)",
          "Network infrastructure for schools, health centers and markets",
          "Remote monitoring and maintenance of equipment",
        ],
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=85&auto=format&fit=crop",
        imageAlt:
          "Nighttime view of the Earth from space showing network connections",
        dark: true,
        reversed: true,
      },
      {
        id: "securite",
        category: "SECURITY & FINANCE",
        title: "Secure Communication",
        paragraph:
          "GIRA sets up encrypted communication channels for institutions that exchange sensitive data. From diplomatic protocols to inter-ministerial links, we secure information flows with government-grade standards.",
        items: [
          "End-to-end encrypted communication channels",
          "Diplomatic VPNs and inter-institutional private networks",
          "Secure videoconferencing platforms",
          "Security audits and ISO 27001 compliance",
        ],
        image:
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&q=85&auto=format&fit=crop",
        imageAlt:
          "Digital padlock symbolizing cybersecurity and encryption",
        dark: false,
        reversed: false,
      },
      {
        id: "fintech",
        category: "SYSTEMS & INTEGRATION",
        title: "ERP, Databases & Turnkey Solutions",
        paragraph:
          "GIRA supports companies and public institutions in deploying structuring information systems: integrated ERPs, government databases, statistical tools and results-oriented evaluation platforms.",
        items: [
          "Integration and deployment of turnkey ERP solutions",
          "State information systems and centralized databases",
          "Statistical dashboards and management tools",
          "Evaluation, monitoring and institutional reporting platforms",
        ],
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=85&auto=format&fit=crop",
        imageAlt:
          "Dashboards and information systems for companies and public institutions",
        dark: true,
        reversed: true,
      },
    ] satisfies ServiceSection[],
  },
} as const;

/* ─── Animation variants ────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Sidebar nav ───────────────────────────────────── */

function SidebarNav({ label, services }: { label: string; services: ServiceSection[] }) {
  return (
    <aside className="hidden xl:block fixed top-32 left-8 z-30 w-52">
      <p
        className="text-xs uppercase tracking-widest mb-4 font-semibold"
        style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
      >
        {label}
      </p>
      <nav className="space-y-2">
        {services.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="block text-sm leading-snug py-1 transition-colors duration-200 hover:text-[#C9A84C]"
            style={{ color: "#888888", fontFamily: "var(--font-inter)" }}
          >
            {s.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}

/* ─── Service section component ─────────────────────── */

function ServiceBlock({ service, ctaLabel }: { service: ServiceSection; ctaLabel: string }) {
  const bg = service.dark ? "#0D0D0D" : "#F5F5F0";
  const titleColor = service.dark ? "#FFFFFF" : "#0D0D0D";
  const textColor = service.dark ? "#AAAAAA" : "#444444";
  const itemColor = service.dark ? "#CCCCCC" : "#555555";

  const textCol = (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col justify-center"
    >
      <p
        className="text-xs uppercase tracking-[0.2em] mb-3 font-semibold"
        style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
      >
        {service.category}
      </p>

      <h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4"
        style={{ color: titleColor, fontFamily: "var(--font-montserrat)" }}
      >
        {service.title}
      </h2>

      <p
        className="text-base leading-relaxed mb-8"
        style={{ color: textColor, fontFamily: "var(--font-inter)" }}
      >
        {service.paragraph}
      </p>

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4 mb-10"
      >
        {service.items.map((item) => (
          <motion.li
            key={item}
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            className="flex items-start gap-4"
          >
            <span
              className="mt-[10px] shrink-0 w-4 h-px"
              style={{ backgroundColor: "#C9A84C" }}
            />
            <span
              className="text-sm leading-relaxed"
              style={{ color: itemColor, fontFamily: "var(--font-inter)" }}
            >
              {item}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      <div>
        <Link
          href="/contact"
          className="inline-flex items-center px-7 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 hover:brightness-110"
          style={{
            backgroundColor: "#C9A84C",
            color: "#0D0D0D",
            fontFamily: "var(--font-inter)",
          }}
        >
          {ctaLabel}
        </Link>
      </div>
    </motion.div>
  );

  const imageCol = (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
    >
      <Image
        src={service.image}
        alt={service.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        className="object-cover"
        unoptimized
      />
      {/* Subtle gold gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: service.dark
            ? "linear-gradient(135deg, rgba(13,13,13,0.3) 0%, transparent 60%)"
            : "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%)",
        }}
      />
    </motion.div>
  );

  return (
    <section
      id={service.id}
      className="scroll-mt-24 py-20 md:py-32"
      style={{ backgroundColor: bg }}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {service.reversed ? (
            <>
              <div className="lg:col-span-5 order-2 lg:order-1">
                {imageCol}
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2">
                {textCol}
              </div>
            </>
          ) : (
            <>
              <div className="lg:col-span-7">{textCol}</div>
              <div className="lg:col-span-5">{imageCol}</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Main export ───────────────────────────────────── */

export default function ServicesPageContent() {
  const locale = useLocale() as "fr" | "en";
  const t = SERVICES_DATA[locale];

  return (
    <>
      {/* ── Hero ──────────────────────────────────── */}
      <section
        id="overview"
        className="relative flex items-end min-h-[50vh] pt-36 pb-16 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 100%)",
        }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 70% at 20% 80%, rgba(201,168,76,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 w-full">
          {/* Breadcrumb */}
          <nav
            aria-label="Fil d'Ariane"
            className="flex items-center gap-1.5 mb-6"
          >
            <Link
              href="/"
              className="text-xs uppercase tracking-widest transition-colors duration-200 hover:text-[#C9A84C]"
              style={{
                color: "rgba(201,168,76,0.7)",
                fontFamily: "var(--font-inter)",
              }}
            >
              {t.hero.breadcrumbHome}
            </Link>
            <ChevronRight
              size={12}
              style={{ color: "rgba(201,168,76,0.5)" }}
            />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
            >
              {t.hero.breadcrumbCurrent}
            </span>
          </nav>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white font-black leading-tight max-w-3xl"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            {t.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 h-[2px] w-16 origin-left"
            style={{ backgroundColor: "#C9A84C" }}
          />
        </div>
      </section>

      {/* ── Sidebar nav ───────────────────────────── */}
      <SidebarNav label={t.sidebarLabel} services={t.services} />

      {/* ── Service sections ──────────────────────── */}
      {t.services.map((service) => (
        <ServiceBlock key={service.id} service={service} ctaLabel={t.servicesCta} />
      ))}

      {/* ── CTA final ─────────────────────────────── */}
      <section
        className="py-20 md:py-32"
        style={{
          background: "linear-gradient(135deg, #1A1A2E 0%, #0D0D0D 100%)",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {t.cta.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg mb-10"
            style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
          >
            {t.cta.subtitle}
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center px-10 py-4 rounded-2xl text-base font-semibold transition-all duration-200 hover:brightness-110 hover:shadow-xl"
              style={{
                backgroundColor: "#C9A84C",
                color: "#0D0D0D",
                fontFamily: "var(--font-inter)",
              }}
            >
              {t.cta.button}
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
