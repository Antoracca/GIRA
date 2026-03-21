"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const G = "#C9A84C";
const BG = "#F5F5F0";

const TREE_IMG = "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1400&q=85";

const profiles = [
  {
    id: "gouvernements",
    label: "Gouvernements",
    sublabel: "& Ministères",
    desc: "GIRA accompagne les États dans la structuration et l'exécution de leurs projets prioritaires, du cadrage stratégique au transfert de compétences aux équipes locales.",
    img: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1400&q=85",
  },
  {
    id: "institutions",
    label: "Institutions",
    sublabel: "& Bailleurs",
    desc: "Banque Mondiale, BAD, AFD : GIRA sécurise l'impact de vos financements grâce à une maîtrise d'ouvrage transparente et une gouvernance sans compromis.",
    img: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1400&q=85",
  },
  {
    id: "entreprises",
    label: "Entreprises",
    sublabel: "& Groupes Privés",
    desc: "Pour les groupes souhaitant s'implanter ou croître en Afrique, GIRA structure les projets, mobilise les financements et pilote l'exécution jusqu'à la livraison.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=85",
  },
  {
    id: "investisseurs",
    label: "Fonds",
    sublabel: "& Investisseurs",
    desc: "GIRA identifie et structure des opportunités alignées sur les priorités stratégiques des États africains, viabilisées, dé-risquées et prêtes à financer.",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=85",
  },
  {
    id: "startups",
    label: "Startups",
    sublabel: "& Innovateurs",
    desc: "Porteurs de solutions pour le continent, GIRA vous accompagne dans la structuration, la mise à l'échelle et l'accès aux marchés publics africains.",
    img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1400&q=85",
  },
];

const textV = {
  enter: { opacity: 0, y: 14 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.28 },
  },
};

const imgV = {
  enter: { opacity: 0, scale: 1.05 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

export default function AudienceSection() {
  const [idx, setIdx] = useState(-1);

  const goTo = useCallback((i: number) => setIdx(i), []);
  const next = useCallback(() => setIdx((p) => (p + 1) % profiles.length), []);
  const prev = useCallback(
    () => setIdx((p) => (p <= 0 ? profiles.length - 1 : p - 1)),
    []
  );

  useEffect(() => {
    const delay = idx === -1 ? 7000 : 12000;
    const t = setTimeout(next, delay);
    return () => clearTimeout(t);
  }, [idx, next]);

  const profile = idx >= 0 ? profiles[idx] : null;
  const imgSrc = profile ? profile.img : TREE_IMG;
  const imgKey = profile ? profile.id : "tree";
  const controlsVisible = profile !== null;

  return (
    <section className="w-full overflow-hidden" style={{ backgroundColor: BG }}>
      {/*
        ANTI-LAYOUT-SHIFT : hauteur FIXE sur mobile, auto sur desktop.
        Sur mobile (flex-col) : exactement 800px.
          → text panel ≈ 554px (flex-none) + image panel ≈ 246px (flex-1)
          → Un conteneur image de 375×246 a un ratio 1.52:1, proche du
             ratio des images Unsplash (1400×933 = 1.5:1) → object-cover
             n'a PLUS besoin de zoomer : l'image remplit la largeur sans crop
             visible. Résultat : image dezoomée, on voit tout le sujet.
        Sur desktop (lg: flex-row) : hauteur auto avec min 560px.
      */}
      <div
        className="flex flex-col lg:flex-row h-[800px] lg:h-auto"
        style={{ minHeight: "clamp(560px, 60vh, 640px)" }}
      >

        {/* ── LEFT: Content ── */}
        <div
          className="flex flex-col justify-between
                     px-8 py-12 md:px-14 md:py-16
                     lg:py-20 lg:px-16 xl:px-20
                     flex-none w-full lg:w-[46%]"
        >
          {/* Overline */}
          <p
            className="text-[11px] uppercase tracking-[0.32em] font-bold mb-8"
            style={{ color: G, fontFamily: "var(--font-inter)" }}
          >
            Nos cibles
          </p>

          {/* Titre statique */}
          <h2
            className="leading-tight mb-8"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 300,
              fontSize: "clamp(2rem, 3.6vw, 3rem)",
              color: "#0D0D0D",
              letterSpacing: "-0.02em",
            }}
          >
            Comment pouvons-nous
            <br />
            vous accompagner&nbsp;?
          </h2>

          {/*
            Zone de contenu animé :
            - Hauteur FIXE (240px) — le contenu animé est en position absolute
              à l'intérieur, donc sa taille n'affecte JAMAIS la hauteur du parent.
            - Pendant les transitions AnimatePresence, le conteneur reste stable.
          */}
          <div
            className="flex-1 relative overflow-hidden"
            style={{ minHeight: 240 }}
          >
            <AnimatePresence mode="wait">
              {profile ? (
                <motion.div
                  key={profile.id}
                  variants={textV}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ position: "absolute", top: 0, left: 0, right: 0 }}
                >
                  <p
                    className="text-[11px] uppercase tracking-[0.28em] font-bold mb-3"
                    style={{ color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-inter)" }}
                  >
                    Vous êtes
                  </p>
                  <h3
                    className="font-black leading-none uppercase mb-1"
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "clamp(2rem, 3.8vw, 3rem)",
                      color: "#0D0D0D",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {profile.label}
                  </h3>
                  <p
                    className="text-xl font-light mb-5"
                    style={{ fontFamily: "var(--font-montserrat)", color: G }}
                  >
                    {profile.sublabel}
                  </p>
                  <p
                    className="text-sm md:text-base leading-relaxed"
                    style={{
                      color: "rgba(13,13,13,0.52)",
                      fontFamily: "var(--font-inter)",
                      maxWidth: 380,
                    }}
                  >
                    {profile.desc}
                  </p>
                </motion.div>
              ) : (
                <motion.p
                  key="default"
                  variants={textV}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-base md:text-lg leading-relaxed"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    color: "rgba(13,13,13,0.45)",
                    fontFamily: "var(--font-inter)",
                    maxWidth: 380,
                    fontStyle: "italic",
                  }}
                >
                  Gouvernements, institutions, investisseurs, entreprises. GIRA
                  structure, finance et exécute des projets à fort impact en Afrique.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/*
            Contrôles toujours dans le DOM — transition opacity uniquement,
            jamais de mount/unmount qui ferait changer la hauteur.
          */}
          <div
            className="mt-10 flex items-center gap-2 transition-opacity duration-500"
            style={{
              opacity: controlsVisible ? 1 : 0,
              pointerEvents: controlsVisible ? "auto" : "none",
            }}
          >
            <button
              onClick={prev}
              aria-label="Précédent"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:border-black/30"
              style={{
                border: "1px solid rgba(0,0,0,0.14)",
                color: "rgba(0,0,0,0.38)",
              }}
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={next}
              aria-label="Suivant"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                border: `1px solid ${G}`,
                backgroundColor: "rgba(201,168,76,0.10)",
                color: G,
              }}
            >
              <ChevronRight size={15} />
            </button>
            <div className="flex gap-1 ml-3">
              {profiles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Profil ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === idx ? 18 : 5,
                    height: 5,
                    backgroundColor: i === idx ? G : "rgba(0,0,0,0.15)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Image ──
            Sur mobile : flex-1 donne ~246px de hauteur dans les 800px fixes.
            Ratio conteneur 375×246 ≈ 1.52:1 ≈ ratio images Unsplash 1.5:1
            → object-cover remplit la largeur sans zoom perceptible.
            Sur desktop : flex-1 remplit la hauteur 560px+ du panneau gauche.
        */}
        <div className="relative overflow-hidden flex-1" style={{ minHeight: 200 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={imgKey}
              variants={imgV}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
              style={{ backgroundColor: BG }}
            >
              <Image
                src={imgSrc}
                alt={profile ? profile.label : "GIRA projets structurants en Afrique"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 54vw"
                unoptimized
                priority={idx === -1}
              />

              {/* Fondu mobile : du bas vers le haut (vers le texte au-dessus) */}
              <div
                className="lg:hidden absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${BG} 0%, rgba(245,245,240,0.15) 40%, transparent 70%)`,
                }}
              />

              {/* Fondu desktop : de gauche vers droite (vers le panneau texte) */}
              <div
                className="hidden lg:block absolute inset-0"
                style={{
                  background: `linear-gradient(to right, ${BG} 0%, rgba(245,245,240,0.25) 30%, transparent 55%),
                               linear-gradient(to top, rgba(245,245,240,0.35) 0%, transparent 40%)`,
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
