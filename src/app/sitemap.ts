import type { MetadataRoute } from "next";
import { GIRA } from "@/lib/constants";

const BASE = "https://www.gira-cf.com";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

function entry(
  path: string,
  priority: number,
  freq: Freq,
  lastMod?: string
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE}${path}`,
    lastModified: new Date(lastMod ?? "2026-03-21"),
    changeFrequency: freq,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {

  /* ── Pages core — priorité maximale ── */
  const core: MetadataRoute.Sitemap = [
    entry("/",                   1.0, "weekly",  "2026-03-21"),
    entry("/contact",            0.95, "yearly",  "2026-03-01"),
    entry("/services",           0.9,  "monthly", "2026-03-10"),
    entry("/a-propos",           0.85, "monthly", "2026-03-10"),
    entry("/secteurs",           0.85, "monthly", "2026-03-10"),
    entry("/pnd-rca-tri",        0.85, "monthly", "2026-02-01"),
    entry("/actualites",         0.8,  "weekly",  "2026-03-21"),
    entry("/reseau-diaspora",    0.75, "monthly", "2026-03-01"),
    entry("/carrieres",          0.7,  "monthly", "2026-03-15"),
  ];

  /* ── GIRA Dev /x — pôle technologie ── */
  const giraDev: MetadataRoute.Sitemap = [
    entry("/x",                  0.8,  "monthly", "2026-03-15"),
    entry("/x/data-ia",          0.65, "monthly", "2026-03-15"),
    entry("/x/digital-gov",      0.65, "monthly", "2026-03-15"),
    entry("/x/infrastructure",   0.65, "monthly", "2026-03-15"),
    entry("/x/finance-impact",   0.65, "monthly", "2026-03-15"),
  ];

  /* ── Pages légales ── */
  const legal: MetadataRoute.Sitemap = [
    entry("/mentions-legales",          0.2, "yearly", "2026-01-01"),
    entry("/politique-confidentialite", 0.2, "yearly", "2026-01-01"),
    entry("/rgpd",                      0.2, "yearly", "2026-01-01"),
  ];

  /* ── Articles — générés dynamiquement depuis constants ── */
  const articles: MetadataRoute.Sitemap = GIRA.articles.map((a) =>
    entry(`/actualites/${a.slug}`, 0.75, "yearly", a.date)
  );

  return [...core, ...giraDev, ...legal, ...articles];
}
