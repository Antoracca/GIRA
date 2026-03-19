import type { MetadataRoute } from "next";
import { GIRA } from "@/lib/constants";

const BASE_URL = "https://www.gira-cf.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/a-propos`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/secteurs`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/pnd`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/reseau`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/carrieres`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/actualites`, priority: 0.8, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/contact`, priority: 0.7, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/mentions-legales`, priority: 0.2, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/politique-confidentialite`, priority: 0.2, changeFrequency: "yearly" as const },
    { url: `${BASE_URL}/rgpd`, priority: 0.2, changeFrequency: "yearly" as const },
  ];

  const articlePages = GIRA.articles.map((article) => ({
    url: `${BASE_URL}/actualites/${article.slug}`,
    priority: 0.7,
    changeFrequency: "yearly" as const,
    lastModified: new Date(article.date),
  }));

  return [...staticPages, ...articlePages];
}
