"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Serve WASM from CDN — removes the 1.4 MB dotlottie-player.wasm from the build
const WASM_CDN =
  "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@0.66.2/dist/dotlottie-player.wasm";

interface LottiePlayerProps {
  src: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Client-only Lottie wrapper using @lottiefiles/dotlottie-web directly.
 * - WASM loaded from CDN (no local 1.4 MB file)
 * - Initializes immediately on mount (IntersectionObserver skipped — causes
 *   silent failures inside AnimatePresence transitions where opacity/transform
 *   prevent the observer threshold from being reached on mobile)
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

      // Point WASM to CDN — skips the local 1.4 MB file
      DotLottie.setWasmUrl(WASM_CDN);

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
    // Small rAF delay so the canvas has its final dimensions before DotLottie
    // reads them — avoids a 0×0 canvas in the first render frame
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
