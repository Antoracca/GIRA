"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// WASM served from same origin — avoids Chrome CORS/CORP blocks on CDN URLs
const WASM_PATH = "/dotlottie-player.wasm";

// Module-level flag: setWasmUrl must only be called once.
// Re-calling it after WASM is already loaded can corrupt Chrome's WASM state.
let wasmConfigured = false;

interface LottiePlayerProps {
  src: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Client-only Lottie wrapper using @lottiefiles/dotlottie-web directly.
 * - WASM served from /public (same-origin, no Chrome CORS issues)
 * - setWasmUrl called exactly once (module-level flag)
 * - Initializes via requestAnimationFrame — works inside AnimatePresence
 *   transitions where IntersectionObserver threshold was never reached
 */
export default function LottiePlayer({ src, style, className }: LottiePlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotLottieRef = useRef<import("@lottiefiles/dotlottie-web").DotLottie | null>(null);
  const initRef = useRef(false);
  const [, setReady] = useState(false);

  const initLottie = useCallback(async () => {
    if (!canvasRef.current || initRef.current || dotLottieRef.current) return;
    initRef.current = true;

    try {
      const { DotLottie } = await import("@lottiefiles/dotlottie-web");

      // Configure WASM exactly once — re-calling corrupts Chrome's WASM state
      if (!wasmConfigured) {
        DotLottie.setWasmUrl(WASM_PATH);
        wasmConfigured = true;
      }

      if (!canvasRef.current) {
        initRef.current = false;
        return;
      }

      // Convert relative paths to absolute URLs so DotLottie always fetches
      // from the origin root — not relative to the current locale path (/fr/)
      const resolvedSrc =
        src.startsWith("/")
          ? `${window.location.origin}${src}`
          : src;

      const instance = new DotLottie({
        canvas: canvasRef.current,
        src: resolvedSrc,
        loop: true,
        autoplay: true,
      });

      instance.addEventListener("ready", () => setReady(true));
      dotLottieRef.current = instance;
    } catch {
      // Suppress — prevents error overlay
    } finally {
      initRef.current = false;
    }
  }, [src]);

  useEffect(() => {
    // rAF ensures canvas has final dimensions before DotLottie reads them
    const raf = requestAnimationFrame(() => {
      initLottie();
    });

    return () => {
      cancelAnimationFrame(raf);
      if (dotLottieRef.current) {
        dotLottieRef.current.destroy();
        dotLottieRef.current = null;
      }
      initRef.current = false;
    };
  }, [initLottie]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", ...style }}
    />
  );
}
