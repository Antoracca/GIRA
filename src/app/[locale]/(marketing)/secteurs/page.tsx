"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
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

/* ─── Tokens ─────────────────────────────────────────────────── */
const GOLD = "#C9A84C";
const DARK = "#0D0D0D";
const BODY = "#444444";

/* ─── Data ──────────────────────────────────────────────────── */
const SECTEURS: Secteur[] = [
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
];

/* ─── Drawer ─────────────────────────────────────────────────── */
function SecteurDrawer({ secteur, onClose }: { secteur: Secteur; onClose: () => void }) {
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
          aria-label="Fermer"
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
            Secteur d&apos;intervention
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
            Nos prestations
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
            Discuter d&apos;un projet dans ce secteur
            <ArrowRight size={15} />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function SecteursPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedSecteur = SECTEURS.find((s) => s.id === selectedId) ?? null;
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
              Accueil
            </Link>
            <ChevronRight size={11} style={{ color: "#CCCCCC" }} />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: GOLD, fontFamily: "var(--font-inter)" }}
            >
              Secteurs
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
              Domaines d&apos;expertise
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.0] tracking-tight mb-8"
              style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              Secteurs<br />
              <span style={{ color: GOLD }}>d&apos;Intervention</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{ color: BODY, fontFamily: "var(--font-inter)" }}
            >
              8 domaines stratégiques. Des expertises ciblées, au service de projets concrets
              qui transforment durablement l&apos;Afrique.
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
          {SECTEURS.map((s, i) => {
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
                      {s.services.length} prestations
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
            Nos résultats en chiffres
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            {[
              { value: "45+", label: "Experts mobilisés", sub: "profils séniors et spécialisés" },
              { value: "3", label: "Pays de présence", sub: "Paris · Marrakech · Bratislava" },
              { value: "8", label: "Secteurs couverts", sub: "de la santé aux télécoms" },
              { value: "100%", label: "Projets livrés", sub: "dans les délais contractuels" },
            ].map((stat, i) => (
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
              Un projet à concrétiser ?
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black leading-tight mb-6"
              style={{ color: DARK, fontFamily: "var(--font-montserrat)" }}
            >
              Votre secteur figure parmi nos domaines d&apos;expertise.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-base md:text-lg leading-relaxed mb-10 max-w-xl"
              style={{ color: BODY, fontFamily: "var(--font-inter)" }}
            >
              GIRA met à votre disposition une équipe d&apos;experts pour transformer votre
              vision en réalité concrète.
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
                Nous contacter
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-xl border transition-colors duration-200 hover:bg-neutral-50"
                style={{ borderColor: "#D0D0D0", color: DARK, fontFamily: "var(--font-inter)" }}
              >
                Découvrir nos services
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DRAWER ── */}
      <AnimatePresence>
        {selectedSecteur && (
          <SecteurDrawer secteur={selectedSecteur} onClose={closeDrawer} />
        )}
      </AnimatePresence>
    </>
  );
}
