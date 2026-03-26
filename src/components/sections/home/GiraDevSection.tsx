"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   GIRA DEV — Showcase section on homepage
   Full-width cinematic video block with parallax
═══════════════════════════════════════════════════════════════ */

const SECTION_DATA = {
  fr: {
    badge: "GIRA Dev — Unité Tech & Innovation",
    titleLine1: "Nous Bâtissons",
    titleLine2: "le Futur",
    titleLine3: "de l'Afrique.",
    button: "Découvrir GIRA Dev",
  },
  en: {
    badge: "GIRA Dev — Tech & Innovation Unit",
    titleLine1: "We Build",
    titleLine2: "the Future",
    titleLine3: "of Africa.",
    button: "Discover GIRA Dev",
  },
} as const;

export default function GiraDevSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const router = useRouter();
  const locale = useLocale() as "fr" | "en";
  const d = SECTION_DATA[locale];

  /* Force autoplay on mobile — iOS Safari blocks autoPlay attribute */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      video.play()
        .then(() => setVideoReady(true))
        .catch(() => {
          /* Browser blocked autoplay — gradient fallback stays visible */
        });
    };

    /* Try immediately */
    attemptPlay();

    /* Also retry on canplay event (for slow network loads) */
    video.addEventListener("canplay", attemptPlay, { once: true });
    return () => video.removeEventListener("canplay", attemptPlay);
  }, []);

  function handleNavigate() {
    // Force scroll to absolute top before navigating
    window.scrollTo({ top: 0, behavior: "instant" });
    router.push("/x");
  }
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* parallax: video moves slower than scroll */
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  /* slight scale-up as user scrolls in */
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1.05, 1.15]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(500px, 75vh, 800px)" }}
    >
      {/* ── Gradient fallback (always rendered, hidden once video plays) ── */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "linear-gradient(135deg, #1A1A2E 0%, #0D0D0D 100%)",
          zIndex: 0,
          opacity: videoReady ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}
      />

      {/* ── Video background with parallax ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: videoY, scale: videoScale }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 0,
            opacity: videoReady ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          <source
            src="https://media-publications.bcg.com/flash/BCGX/bcg_x_launch_film-15s_loop.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* ── Gradient overlays ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.50) 40%, rgba(13,13,13,0.20) 100%)",
          zIndex: 1,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,13,13,0.60) 0%, transparent 55%)",
          zIndex: 1,
        }}
      />

      {/* ── Content ── */}
      <div
        className="relative z-10 h-full flex flex-col justify-center md:justify-end px-6 sm:px-10 md:px-16 lg:px-24 pb-6 md:pb-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 md:mb-6"
        >
          <span
            className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-bold md:px-4 md:py-2 md:rounded-full"
            style={{
              color: "#C9A84C",
              backgroundColor: "transparent",
              border: "none",
              fontFamily: "var(--font-inter)",
            }}
          >
            {d.badge}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.06] tracking-tight text-white max-w-3xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {d.titleLine1}
          <br />
          <em className="not-italic" style={{ color: "#C9A84C" }}>
            {d.titleLine2}
          </em>
          <br />
          {d.titleLine3}
        </motion.h2>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-10"
        >
          <button
            onClick={handleNavigate}
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: "#C9A84C",
              color: "#0D0D0D",
              fontFamily: "var(--font-montserrat)",
            }}
          >
            {d.button}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>

      {/* ── Decorative bottom edge — subtle gold line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 30%, rgba(201,168,76,0.4) 70%, transparent 100%)",
        }}
      />
    </section>
  );
}
