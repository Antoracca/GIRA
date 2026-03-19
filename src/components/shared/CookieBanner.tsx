"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

const CONSENT_KEY = "gira_cookie_consent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      setAnalyticsEnabled(true);
    } else if (!stored) {
      // Small delay so it doesn't flash on first paint
      const t = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setAnalyticsEnabled(true);
    setShow(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setShow(false);
  }

  return (
    <>
      {analyticsEnabled && <Analytics />}

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6"
          >
            <div
              className="max-w-4xl mx-auto rounded-2xl shadow-2xl px-5 py-4 md:px-6 md:py-5 flex flex-col md:flex-row md:items-center gap-4"
              style={{ backgroundColor: "#1A1A2E", border: "1px solid #C9A84C33" }}
            >
              <div className="flex-1">
                <p className="text-white text-sm font-semibold mb-1">
                  🍪 Cookies & Confidentialité
                </p>
                <p className="text-gray-300 text-xs leading-relaxed">
                  Nous utilisons des cookies d&apos;analyse anonymes (Vercel Analytics) pour
                  améliorer votre expérience. Aucune donnée personnelle n&apos;est vendue.{" "}
                  <a
                    href="/politique-confidentialite"
                    className="underline hover:text-yellow-400 transition-colors"
                    style={{ color: "#E8D5A3" }}
                  >
                    En savoir plus
                  </a>
                </p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={decline}
                  className="text-xs px-4 py-2 rounded-lg border transition-colors text-gray-300 hover:text-white"
                  style={{ borderColor: "#ffffff33" }}
                >
                  Refuser
                </button>
                <button
                  onClick={accept}
                  className="text-xs px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-90"
                  style={{ backgroundColor: "#C9A84C", color: "#0D0D0D" }}
                >
                  Accepter
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
