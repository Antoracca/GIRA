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
 * - IntersectionObserver: animation only initializes when visible in viewport
 * - Guards against StrictMode double-init and suppresses non-fatal load errors
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

      const instance = new DotLottie({
        canvas: canvasRef.current,
        src,
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
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Only initialize when the canvas enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          initLottie();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
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
