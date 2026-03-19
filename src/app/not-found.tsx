import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable — GIRA",
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "#0D0D0D" }}
    >
      {/* Logo */}
      <Link href="/" className="mb-12 flex flex-col items-center gap-1 group">
        <span
          className="text-3xl font-extrabold tracking-widest group-hover:opacity-80 transition-opacity"
          style={{ fontFamily: "var(--font-montserrat)", color: "#C9A84C" }}
        >
          GIRA
        </span>
        <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "#E8D5A3" }}>
          Projets Structurants
        </span>
      </Link>

      {/* 404 */}
      <p
        className="text-8xl md:text-[160px] font-extrabold leading-none select-none"
        style={{
          fontFamily: "var(--font-montserrat)",
          color: "transparent",
          WebkitTextStroke: "2px #C9A84C",
          opacity: 0.3,
        }}
      >
        404
      </p>

      <h1
        className="mt-6 text-2xl md:text-3xl font-bold text-white"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        Page introuvable
      </h1>
      <p className="mt-3 text-gray-400 max-w-md text-sm leading-relaxed">
        La page que vous recherchez n&apos;existe pas ou a été déplacée. Retournez à
        l&apos;accueil pour explorer nos services.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
          style={{ backgroundColor: "#C9A84C", color: "#0D0D0D" }}
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-lg font-semibold text-sm border transition-all hover:bg-white hover:text-gray-900 text-white"
          style={{ borderColor: "#ffffff33" }}
        >
          Nous contacter
        </Link>
      </div>
    </div>
  );
}
