import type { MetadataRoute } from "next";

/**
 * robots.ts — GIRA Website
 *
 * Stratégie :
 * - Moteurs classiques (Google, Bing, Yandex…) : accès complet au contenu public
 * - Bots IA (GPTBot, ClaudeBot, Perplexity…)   : accès autorisé → renforce la
 *   présence de GIRA dans les réponses des LLMs
 * - Mauvais bots (scrapers, spam, SEO toxique)  : bloqués
 * - Routes API et fichiers internes              : bloqués pour tous
 */

const SITE = "https://www.gira-cf.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [

      /* ══════════════════════════════════════════════
         MOTEURS DE RECHERCHE PRINCIPAUX
         Accès complet — toutes les pages publiques
      ══════════════════════════════════════════════ */
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Googlebot-Video",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      {
        userAgent: "Slurp", // Yahoo
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Applebot", // Apple Spotlight + Siri
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "LinkedInBot", // Aperçus LinkedIn — crucial pour GIRA
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Twitterbot", // Cartes X/Twitter
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "facebookexternalhit", // Open Graph Facebook/WhatsApp
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "WhatsApp", // Aperçus WhatsApp
        allow: "/",
        disallow: ["/api/"],
      },

      /* ══════════════════════════════════════════════
         BOTS IA — AUTORISÉS
         Permet à ChatGPT, Claude, Perplexity, Gemini
         d'indexer GIRA → visibilité dans les LLMs
      ══════════════════════════════════════════════ */
      {
        userAgent: "GPTBot",          // OpenAI / ChatGPT
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "ChatGPT-User",    // ChatGPT browsing plugin
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "OAI-SearchBot",   // OpenAI SearchGPT
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "ClaudeBot",       // Anthropic / Claude
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Claude-Web",      // Claude web browsing
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "anthropic-ai",    // Anthropic crawler général
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "PerplexityBot",   // Perplexity AI
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Perplexity-User", // Perplexity user browsing
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Google-Extended",  // Gemini / Google AI
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Gemini",          // Google Gemini
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "cohere-ai",       // Cohere
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Meta-ExternalAgent", // Meta AI (Llama)
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Meta-ExternalFetcher",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "YouBot",          // You.com AI search
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Diffbot",         // Diffbot knowledge graph
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Bytespider",      // ByteDance / TikTok AI
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "ICC-Crawler",     // Internet Archive + AI
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Amazonbot",       // Amazon Alexa AI
        allow: "/",
        disallow: ["/api/"],
      },

      /* ══════════════════════════════════════════════
         OUTILS SEO PROFESSIONNELS — AUTORISÉS
         Ahrefs, Semrush, Moz… permettent aux agences
         et partenaires d'analyser et référencer GIRA
      ══════════════════════════════════════════════ */
      {
        userAgent: "AhrefsBot",      // Ahrefs — analyse backlinks
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "SemrushBot",     // Semrush — audit SEO
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "MJ12bot",        // Majestic SEO
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "DotBot",         // OpenLinkProfiler
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "DataForSeoBot",  // DataForSEO
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "serpstatbot",    // Serpstat
        allow: "/",
        disallow: ["/api/"],
      },

      /* ══════════════════════════════════════════════
         BOTS NUISIBLES — BLOQUÉS
         Scrapers purs, spam, collecteurs de données
      ══════════════════════════════════════════════ */
      { userAgent: "Scrapy",          disallow: ["/"] }, // scraper Python
      { userAgent: "BLEXBot",         disallow: ["/"] }, // scraper agressif
      { userAgent: "SeznamBot",       disallow: ["/"] }, // moteur inconnu
      { userAgent: "Exabot",          disallow: ["/"] }, // scraper FR inactif
      { userAgent: "ia_archiver",     disallow: ["/"] }, // Alexa archiver obsolète
      { userAgent: "MegaIndex",       disallow: ["/"] }, // spam russe
      { userAgent: "spbot",           disallow: ["/"] }, // spam bot

      /* ══════════════════════════════════════════════
         RÈGLE GÉNÉRALE (fallback)
         Tous les autres bots : accès public, API bloquée
      ══════════════════════════════════════════════ */
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/*.json$",
          "/private/",
        ],
      },
    ],

    /* ── Sitemaps déclarés explicitement ── */
    sitemap: [
      `${SITE}/sitemap.xml`,
    ],

    /* ── URL canonique du site ── */
    host: SITE,
  };
}
