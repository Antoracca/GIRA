"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const ANIMATED_WORDS = {
  fr: ["Infrastructures", "Stratégiques", "Souverains", "Technologiques", "Régionaux"],
  en: ["Infrastructural", "Strategic", "Sovereign", "Technological", "Regional"],
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=90";

export default function HeroSection() {
  const locale = useLocale() as "fr" | "en";
  const [index, setIndex] = useState(0);

  const animatedWords = ANIMATED_WORDS[locale] ?? ANIMATED_WORDS.fr;

  // Reset index when locale changes
  useEffect(() => { setIndex(0); }, [locale]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % animatedWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [animatedWords.length]);

  const line1 = locale === "en" ? "Structure and execute" : "Structurer et exécuter";
  const line2 = locale === "en" ? "your projects" : "vos projets";
  const subtitle =
    locale === "en"
      ? "GIRA structures, finances and executes projects that sustainably transform Africa alongside governments, international institutions and investors."
      : "GIRA structure, finance et exécute des projets qui transforment durablement l'Afrique aux côtés des gouvernements, institutions internationales et investisseurs.";
  const cta1 = locale === "en" ? "Start a mandate" : "Initier un mandat";
  const cta2 = locale === "en" ? "Discover our method" : "Découvrir la méthode";

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── Background image ───── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt={locale === "en" ? "African landscape — GIRA structural projects" : "Paysage africain — GIRA projets structurants"}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[300px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 0% 100%, rgba(201,168,76,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Foreground content ──────── */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-32 flex flex-col items-start text-left">

        {/* Main title */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-black text-white leading-[1.1] sm:leading-[1.05] tracking-tight mb-6 break-words"
          style={{ fontFamily: "var(--font-montserrat)", wordBreak: "break-word" }}
        >
          <motion.span
            key={`line1-${locale}`}
            className="block"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          >
            {line1.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={{ duration: 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
          <motion.span
            key={`line2-${locale}`}
            className="block mt-1"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.9 } } }}
          >
            {line2.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={{ duration: 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>

          {/* Animated rotating word */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="block relative mt-1"
            style={{ height: "1.15em", overflow: "hidden" }}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`${locale}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                className="block absolute inset-x-0 top-0"
                style={{ color: "#C9A84C" }}
              >
                {animatedWords[index]}<span className="text-white">.</span>
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          key={`subtitle-${locale}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
          style={{
            color: "rgba(255,255,255,0.75)",
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
          }}
        >
          {subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <Link
            href="/contact"
            className="group flex items-center gap-2.5 px-7 py-4 rounded-full font-bold text-sm sm:text-base uppercase tracking-wider transition-all hover:opacity-90 hover:scale-[1.02] shadow-lg shadow-black/20"
            style={{
              backgroundColor: "#C9A84C",
              color: "#0D0D0D",
              fontFamily: "var(--font-inter)",
            }}
          >
            {cta1}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <Link
            href="/services"
            className="flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm sm:text-base border transition-all hover:bg-white/10"
            style={{
              color: "white",
              borderColor: "rgba(255,255,255,0.3)",
              fontFamily: "var(--font-inter)",
            }}
          >
            {cta2}
          </Link>
        </motion.div>

      </div>

      {/* ── Curved bottom mask ─── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 72"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "72px" }}
        >
          <path d="M0,36 C480,72 960,0 1440,36 L1440,72 L0,72 Z" fill="#F5F5F0" />
        </svg>
      </div>
    </section>
  );
}
