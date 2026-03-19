import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { HeroInterneProps } from "@/lib/types";

export default function HeroInterne({ title, subtitle, breadcrumb }: HeroInterneProps) {
  return (
    <section
      className="relative flex items-end min-h-[40vh] pt-32 pb-16 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 100%)",
      }}
    >
      {/* Subtle gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 0% 100%, rgba(201,168,76,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 w-full">
        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-1 mb-5">
          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && (
                <ChevronRight size={12} style={{ color: "rgba(201,168,76,0.5)" }} />
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-xs uppercase tracking-widest transition-colors duration-200"
                  style={{ color: "rgba(201,168,76,0.7)", fontFamily: "var(--font-inter)" }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "#C9A84C", fontFamily: "var(--font-inter)" }}
                >
                  {item.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        {/* Title */}
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-3xl"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className="mt-4 text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: "#E8D5A3", fontFamily: "var(--font-inter)" }}
          >
            {subtitle}
          </p>
        )}

        {/* Gold line */}
        <div
          className="mt-8 h-[2px] w-16"
          style={{ backgroundColor: "#C9A84C" }}
        />
      </div>
    </section>
  );
}
