"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const GOLD = "#C9A84C";

export default function PageLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on first visit this session
    if (sessionStorage.getItem("gira-splash-done")) return;

    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("gira-splash-done", "1");
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#0D0D0D" }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/logoGIRA.png"
              alt="GIRA"
              width={160}
              height={58}
              priority
              className="object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </motion.div>

          {/* Gold line animée */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeInOut" }}
            className="mt-6 h-[2px] w-16 origin-center"
            style={{ backgroundColor: GOLD }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-4 text-xs uppercase tracking-[0.3em]"
            style={{
              color: "rgba(201,168,76,0.7)",
              fontFamily: "var(--font-inter)",
            }}
          >
            Cabinet d&apos;exécution
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            style={{ backgroundColor: GOLD }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
