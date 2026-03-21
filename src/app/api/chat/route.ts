import { NextRequest, NextResponse } from "next/server";

/* ── Prompt système ──────────────────────────────────────────
   Optimisé pour des réponses complètes, structurées et pertinentes.
─────────────────────────────────────────────────────────── */
const SYSTEM_PROMPT = `Tu es l'assistant virtuel expert de GIRA, cabinet d'exécution des projets structurants basé à Paris. Tu réponds en français (ou en anglais si le visiteur écrit en anglais). Tu es un expert de haut niveau en développement africain, financement de projets, gouvernance institutionnelle et structuration de projets complexes.

RÈGLES ABSOLUES :
- Toujours terminer tes phrases. Ne jamais couper une réponse au milieu.
- Rédiger des réponses complètes, structurées et conclusives.
- Si tu dois être concis, termine quand même par une phrase de clôture claire.
- Utiliser des paragraphes courts et aérés. Utiliser des listes à puces quand c'est plus clair.

Ton rôle :
(1) Répondre précisément aux questions sur les services GIRA avec des exemples concrets.
(2) Qualifier les besoins des visiteurs en posant des questions ciblées.
(3) Proposer un premier devis indicatif pour les projets de structuration ou d'exécution.
(4) Orienter vers l'équipe humaine pour les engagements formels.

Ton ton : professionnel, précis, bienveillant, expert. Jamais générique. Toujours ancré dans la réalité africaine et les enjeux de développement.

Pour un devis, pose MAXIMUM 3 questions : le pays/région concerné, le secteur d'intervention, l'enveloppe budgétaire estimée. Puis donne une fourchette indicative honnête en euros, avec les grandes lignes de la prestation.

Termine TOUJOURS chaque réponse par une invitation à compléter le formulaire de contact : https://gira-cf.com/contact

SERVICES GIRA (détails) :
1. Structuration & Redimensionnement des projets
   → Diagnostic de faisabilité, cadrage technique et financier, montage institutionnel, révision de scope
2. Cabinet d'exécution & Maîtrise d'ouvrage déléguée (MOD)
   → Pilotage opérationnel, coordination des parties prenantes, suivi-évaluation, reporting bailleurs
3. Mobilisation de financements & d'investisseurs
   → Structuration financière, relations avec la Banque Mondiale, BAD, AFD, UE, fonds privés
4. Renforcement de capacités & transfert de compétences
   → Formation des équipes, coaching de leadership, mise en place de PMO

Unité tech GIRA Dev :
- Data & Intelligence Artificielle (tableaux de bord, modélisation prédictive)
- Digital Gov & e-Services (plateformes gouvernementales, digitalisation des services publics)
- Infrastructure Tech & IoT (smart cities, SCADA, connectivité)
- Finance & Impact ESG (reporting extra-financier, blended finance)

Secteurs d'intervention : Eau & Assainissement, Santé, Énergie, Agriculture, Mines & Ressources naturelles, BTP & Construction, Technologies & Télécoms, Transports & Logistique.

Présences GIRA : Paris (siège), Casablanca, Bratislava.
Email : contact@gira-cf.com
Partenariat clé : PND RCA 2024-2028 (Plan National de Développement de la République Centrafricaine).`;

/* ── Types ───────────────────────────────────────────────── */
interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

/* ── Cache mémoire pour la liste des modèles (TTL 1h) ───── */
let cachedModels: string[] = [];
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 heure

async function listAvailableModels(apiKey: string): Promise<string[]> {
  const now = Date.now();
  if (cachedModels.length > 0 && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedModels;
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}&pageSize=100`
    );
    if (!res.ok) return [];
    const data = await res.json();
    const models: Array<{ name: string; supportedGenerationMethods?: string[] }> =
      data.models ?? [];

    const scored = models
      .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
      .map((m) => m.name.replace("models/", ""))
      .sort((a, b) => {
        // Priorité : 2.5 > 2.0 > 1.5, flash > pro > autres
        const version = (id: string) => {
          if (id.startsWith("gemini-2.5")) return 300;
          if (id.startsWith("gemini-2.0")) return 200;
          if (id.startsWith("gemini-1.5")) return 100;
          return 50;
        };
        const type = (id: string) => {
          if (id.includes("flash")) return 20;
          if (id.includes("pro"))   return 10;
          return 1;
        };
        return (version(b) + type(b)) - (version(a) + type(a));
      });

    cachedModels = scored;
    cacheTimestamp = now;
    console.log("[chat] Modèles découverts :", scored.slice(0, 6).join(", "));
    return scored;
  } catch {
    return [];
  }
}

/* ── Gemini REST helper ──────────────────────────────────── */
async function callGemini(messages: ChatMsg[], apiKey: string): Promise<string> {
  // IMPORTANT : Gemini exige que le premier message soit "user"
  const allMapped = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const firstUserIdx = allMapped.findIndex((m) => m.role === "user");
  if (firstUserIdx === -1) throw new Error("NO_USER_MESSAGE");
  const contents = firstUserIdx > 0 ? allMapped.slice(firstUserIdx) : allMapped;

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: {
      maxOutputTokens: 2048,   // ← Augmenté (était 600) pour des réponses complètes
      temperature: 0.65,       // Légèrement plus focalisé
      topP: 0.92,
      topK: 40,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT",        threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_HATE_SPEECH",       threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",  threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    ],
  };

  // Modèles disponibles via découverte dynamique + fallback statique
  const dynamic = await listAvailableModels(apiKey);
  const STATIC_FALLBACK = [
    "gemini-2.5-flash",
    "gemini-2.5-pro",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
  ];
  const MODELS = dynamic.length > 0 ? dynamic : STATIC_FALLBACK;

  let lastError = "";

  for (const model of MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    let res: Response;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (networkErr) {
      lastError = `Network error: ${networkErr}`;
      continue;
    }

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[chat] Gemini ${model} → HTTP ${res.status}:`, errText);
      lastError = `${res.status}: ${errText}`;

      if (res.status === 404) continue;

      if (res.status === 400) {
        const lower = errText.toLowerCase();
        if (lower.includes("not found") || lower.includes("deprecated") || lower.includes("does not exist")) {
          continue;
        }
        throw new Error(`BAD_REQUEST:${errText}`);
      }

      if (res.status === 401 || res.status === 403) {
        throw new Error(`AUTH_ERROR:${errText}`);
      }

      if (res.status === 429) continue;
      continue;
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      const finishReason = data?.candidates?.[0]?.finishReason;
      console.log(`[chat] Réponse OK — modèle : ${model} | fin : ${finishReason} | tokens : ${data?.usageMetadata?.candidatesTokenCount ?? "?"}`);
      return text;
    }

    const blockReason = data?.candidates?.[0]?.finishReason;
    if (blockReason && blockReason !== "STOP") {
      console.warn(`[chat] Gemini ${model} blocked: ${blockReason}`);
      continue;
    }
  }

  throw new Error(`ALL_MODELS_FAILED:${lastError}`);
}

/* ── Route POST ──────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  const geminiKey = process.env.GOOGLE_AI_API_KEY;

  if (!geminiKey || geminiKey === "your_google_ai_api_key_here") {
    return NextResponse.json({
      message:
        "Bonjour ! Je suis l'assistant GIRA. Pour activer le chatbot IA, configurez GOOGLE_AI_API_KEY dans .env.local. En attendant, contactez-nous directement à contact@gira-cf.com.",
    });
  }

  let messages: ChatMsg[];
  try {
    const body = await req.json();
    messages = body.messages ?? [];
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  /* Limiter l'historique aux 20 derniers messages */
  const trimmed = messages.slice(-20);

  try {
    const reply = await callGemini(trimmed, geminiKey);
    return NextResponse.json({ message: reply });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[chat/route] Erreur Gemini :", msg);

    if (msg.startsWith("AUTH_ERROR:")) {
      return NextResponse.json({
        message:
          "La clé API Google n'est pas autorisée. Vérifiez que l'API Generative Language est activée dans Google Cloud Console. Pour toute question, contactez contact@gira-cf.com.",
      });
    }

    if (msg.startsWith("BAD_REQUEST:")) {
      return NextResponse.json({
        message:
          "Je rencontre un problème technique. Réessayez dans quelques instants ou contactez-nous directement à contact@gira-cf.com.",
      });
    }

    if (msg === "NO_USER_MESSAGE") {
      return NextResponse.json({
        message: "Comment puis-je vous aider ? Posez-moi votre question.",
      });
    }

    return NextResponse.json({
      message:
        "Je suis temporairement indisponible. Vous pouvez nous contacter directement à contact@gira-cf.com ou via le formulaire de contact. Notre équipe répond sous 24h.",
    });
  }
}
