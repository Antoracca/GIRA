"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOLD = "#C9A84C";
const ORANGE = "#E85D04";

const LETTERS = [
  { char: "G", color: "#FFFFFF" },
  { char: "I", color: "#FFFFFF" },
  { char: "R", color: ORANGE },
  { char: "A", color: "#FFFFFF" },
];

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#0D0D0D" }}
        >
          {/* Lueur subtile */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 35% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 100%)",
            }}
          />

          <div className="flex flex-col items-center gap-6">

            {/* ── Lettres GIRA ── */}
            <div className="flex items-baseline" style={{ gap: "0.12em" }}>
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={letter.char}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.12,
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 900,
                    fontSize: "clamp(5rem, 15vw, 10rem)",
                    color: letter.color,
                    lineHeight: 1,
                    letterSpacing: "0.22em",
                  }}
                >
                  {letter.char}
                </motion.span>
              ))}
            </div>

            {/* ── Ligne dorée ── */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.65, duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
              style={{
                width: "clamp(80px, 12vw, 140px)",
                height: "1.5px",
                backgroundColor: GOLD,
                transformOrigin: "left",
                borderRadius: "1px",
              }}
            />

            {/* ── Tagline ── */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.55rem, 1.3vw, 0.68rem)",
                letterSpacing: "0.32em",
                color: "rgba(255,255,255,0.28)",
                textTransform: "uppercase",
              }}
            >
              Cabinet d&apos;exécution des projets structurants
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
