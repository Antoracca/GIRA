"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const profiles = [
  {
    label: "Gouvernements & Ministères",
    img: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80",
    href: "/a-propos",
    desc: "À la recherche d'un partenaire d'exécution crédible pour concrétiser les projets prioritaires.",
  },
  {
    label: "Institutions & Bailleurs",
    img: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=900&q=80",
    href: "/services",
    desc: "Souhaitant sécuriser l'impact de leurs financements grâce à une maîtrise d'ouvrage rigoureuse.",
  },
  {
    label: "Entreprises & Groupes Privés",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
    href: "/services",
    desc: "Investis en Afrique ou souhaitant y développer leurs activités avec un partenaire de confiance.",
  },
  {
    label: "ONG & Organisations Intl.",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80",
    href: "/reseau-diaspora",
    desc: "Engagées dans des projets de développement à fort impact social et environnemental.",
  },
  {
    label: "Fonds & Investisseurs",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80",
    href: "/services",
    desc: "À la recherche d'opportunités structurées, alignées sur les priorités des États africains.",
  },
  {
    label: "Startups & Innovation",
    img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&q=80",
    href: "/carrieres",
    desc: "Porteurs de solutions concrètes pour le continent, en quête de structuration et de marchés.",
  },
];

const secteurs = [
  "Eau & Assainissement",
  "Santé",
  "Énergie",
  "Agriculture",
  "Mines & Ressources",
  "Construction",
  "Technologies & Télécoms",
  "Transports & Logistique",
];

const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80";

export default function AudienceSection() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [selectedSecteur, setSelectedSecteur] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [secteurOpen, setSecteurOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const secteurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (secteurRef.current && !secteurRef.current.contains(e.target as Node)) {
        setSecteurOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const activeProfile = profiles.find((p) => p.label === selectedProfile) ?? null;
  const displayImg = activeProfile?.img ?? DEFAULT_IMG;

  return (
    <section className="w-full" style={{ backgroundColor: "#F5F5F0" }}>
      <div className="flex flex-col lg:flex-row min-h-[560px]">

        {/* ── LEFT column ─────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-14 lg:px-16 xl:px-20 py-16 lg:py-20">

          {/* Overline */}
          <p
            className="text-xs uppercase tracking-[0.28em] font-semibold mb-5"
            style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
          >
            Nos cibles
          </p>

          {/* Title — light weight like BCG */}
          <h2
            className="text-4xl md:text-5xl leading-[1.12] mb-4"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 300,
              color: "#0D0D0D",
            }}
          >
            Comment pouvons-nous<br />
            vous accompagner ?
          </h2>

          {/* Subtitle */}
          <p
            className="text-base mb-10 max-w-md"
            style={{ color: "#777", fontFamily: "var(--font-inter)", fontWeight: 400 }}
          >
            Sélectionnez votre profil et votre secteur pour découvrir comment GIRA intervient.
          </p>

          {/* Dropdown pills */}
          <div className="flex flex-wrap gap-3">

            {/* Profil dropdown */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setSecteurOpen(false); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200"
                style={{
                  backgroundColor: selectedProfile ? "#1A1A2E" : "white",
                  color: selectedProfile ? "white" : "#0D0D0D",
                  borderColor: selectedProfile ? "#1A1A2E" : "rgba(0,0,0,0.15)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {selectedProfile ?? "Profil"}
                <ChevronDown
                  size={14}
                  style={{
                    transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    color: selectedProfile ? "rgba(255,255,255,0.7)" : "#999",
                  }}
                />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 left-0 z-20 bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden min-w-[220px]"
                  >
                    {profiles.map((p) => (
                      <li key={p.label}>
                        <button
                          onClick={() => {
                            setSelectedProfile(p.label);
                            setProfileOpen(false);
                          }}
                          className="w-full text-left px-5 py-3 text-sm transition-colors hover:bg-[#F5F5F0]"
                          style={{
                            fontFamily: "var(--font-inter)",
                            color: selectedProfile === p.label ? "#C9A84C" : "#333",
                            fontWeight: selectedProfile === p.label ? 600 : 400,
                          }}
                        >
                          {p.label}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Secteur dropdown */}
            <div ref={secteurRef} className="relative">
              <button
                onClick={() => { setSecteurOpen(!secteurOpen); setProfileOpen(false); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200"
                style={{
                  backgroundColor: selectedSecteur ? "#1A1A2E" : "white",
                  color: selectedSecteur ? "white" : "#0D0D0D",
                  borderColor: selectedSecteur ? "#1A1A2E" : "rgba(0,0,0,0.15)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {selectedSecteur ?? "Secteur"}
                <ChevronDown
                  size={14}
                  style={{
                    transform: secteurOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                    color: selectedSecteur ? "rgba(255,255,255,0.7)" : "#999",
                  }}
                />
              </button>

              <AnimatePresence>
                {secteurOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 left-0 z-20 bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden min-w-[220px]"
                  >
                    {secteurs.map((s) => (
                      <li key={s}>
                        <button
                          onClick={() => {
                            setSelectedSecteur(s);
                            setSecteurOpen(false);
                          }}
                          className="w-full text-left px-5 py-3 text-sm transition-colors hover:bg-[#F5F5F0]"
                          style={{
                            fontFamily: "var(--font-inter)",
                            color: selectedSecteur === s ? "#C9A84C" : "#333",
                            fontWeight: selectedSecteur === s ? 600 : 400,
                          }}
                        >
                          {s}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── RIGHT column ────────────────────────────── */}
        <div className="flex-1 relative min-h-[320px] lg:min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProfile ?? "default"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={displayImg}
                alt={activeProfile?.label ?? "GIRA projets structurants"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Glassmorphism card — appears on selection */}
          <AnimatePresence>
            {activeProfile && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute top-6 right-6 z-10 max-w-[280px] rounded-2xl p-6"
                style={{
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  backgroundColor: "rgba(255,255,255,0.75)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
                }}
              >
                <h3
                  className="text-lg font-bold mb-2 leading-snug"
                  style={{ fontFamily: "var(--font-montserrat)", color: "#0D0D0D" }}
                >
                  {activeProfile.label}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "#555", fontFamily: "var(--font-inter)" }}
                >
                  {activeProfile.desc}
                </p>
                <Link
                  href={activeProfile.href}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:opacity-90"
                  style={{ backgroundColor: "#C9A84C", color: "#0D0D0D", fontFamily: "var(--font-inter)" }}
                >
                  Explorer
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
