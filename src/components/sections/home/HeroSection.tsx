"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

const animatedWords = [
  "Infrastructures",
  "Stratégiques",
  "Souverains",
  "Technologiques",
  "Régionaux",
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=90";

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % animatedWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── Background image (AFD-style full bleed) ───── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt="Paysage africain — GIRA projets structurants"
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



        {/* Main title — AFD-level impact */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-black text-white leading-[1.1] sm:leading-[1.05] tracking-tight mb-6 break-words"
          style={{ fontFamily: "var(--font-montserrat)", wordBreak: "break-word" }}
        >
          <motion.span
            className="block"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.04 } },
            }}
          >
            {"Structurer et exécuter".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
          <motion.span
            className="block mt-1"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.04, delayChildren: 0.9 } },
            }}
          >
            {"vos projets".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>

          {/* Animated rotating word (appears after typing finishes) */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="block relative mt-1"
            style={{ height: "1.15em", overflow: "hidden" }}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={index}
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
          GIRA structure, finance et exécute des projets qui transforment
          durablement l&apos;Afrique aux côtés des gouvernements,
          institutions internationales et investisseurs.
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
            Initier un mandat
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
            Découvrir la méthode
          </Link>
        </motion.div>

      </div>



      {/* ── Curved bottom mask (AFD-style transition) ─── */}
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
