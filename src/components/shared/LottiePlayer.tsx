"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface LottiePlayerProps {
  src: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Client-only Lottie wrapper using @lottiefiles/dotlottie-web directly.
 * Guards against StrictMode double-init and suppresses non-fatal load errors.
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
    initLottie();

    return () => {
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
