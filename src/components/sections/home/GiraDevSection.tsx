"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   GIRA DEV — Showcase section on homepage
   Full-width cinematic video block with parallax
═══════════════════════════════════════════════════════════════ */

export default function GiraDevSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
      {/* ── Video background with parallax ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: videoY, scale: videoScale }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
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
        className="relative z-10 h-full flex flex-col justify-end px-6 sm:px-10 md:px-16 lg:px-24 pb-14 sm:pb-16 md:pb-20"
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
            className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-bold px-4 py-2 rounded-full"
            style={{
              color: "#C9A84C",
              backgroundColor: "rgba(201,168,76,0.12)",
              border: "1px solid rgba(201,168,76,0.25)",
              fontFamily: "var(--font-inter)",
            }}
          >
            GIRA Dev — Unité Tech &amp; Innovation
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
          Nous Bâtissons
          <br />
          <em className="not-italic" style={{ color: "#C9A84C" }}>
            le Futur
          </em>
          <br />
          de l&apos;Afrique.
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
            Découvrir GIRA Dev
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
