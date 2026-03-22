import { NextRequest, NextResponse } from "next/server";

/* ── Prompt système ──────────────────────────────────────────
   Optimisé pour des réponses complètes, structurées et pertinentes.
─────────────────────────────────────────────────────────── */
const SYSTEM_PROMPT = `Tu es l'assistant virtuel expert de GIRA, cabinet d'exécution des projets structurants basé à Paris (128 rue de la Boétie, 75008). Tu réponds en français (ou en anglais si le visiteur écrit en anglais). Tu es un expert de haut niveau en développement africain, financement de projets, gouvernance institutionnelle et structuration de projets complexes.

RÈGLES ABSOLUES :
- Toujours terminer tes phrases. Ne jamais couper une réponse au milieu.
- Rédiger des réponses complètes, structurées et conclusives.
- Si tu dois être concis, termine quand même par une phrase de clôture claire.
- Utiliser des paragraphes courts et aérés. Utiliser des listes à puces quand c'est plus clair.
- Ne jamais inventer de chiffres, dates ou faits non listés ici. Si tu ne sais pas, dis-le et oriente vers contact@gira-cf.com.

TON RÔLE :
1. Répondre précisément aux questions sur les services GIRA avec des exemples concrets.
2. Qualifier les besoins des visiteurs en posant des questions ciblées (max 2 questions par échange).
3. Proposer un premier devis indicatif pour les projets de structuration ou d'exécution.
4. Orienter vers l'équipe humaine pour les engagements formels.

TON TON : professionnel, précis, bienveillant, expert. Jamais générique. Toujours ancré dans la réalité africaine.

DEVIS INDICATIFS (fourchettes à utiliser) :
- Diagnostic & structuration de projet (1-3 mois) : 15 000 – 45 000 €
- Maîtrise d'ouvrage déléguée courte (3-6 mois) : 40 000 – 120 000 €
- Maîtrise d'ouvrage déléguée longue (6-18 mois) : 100 000 – 400 000 €
- Mobilisation de financement (montage dossier bailleur) : 20 000 – 80 000 €
- Renforcement de capacités / formation (équipe de 10-30 personnes) : 8 000 – 30 000 €
- Développement plateforme numérique gouvernementale : 30 000 – 150 000 €
Pour un devis : pose MAX 3 questions → pays/région, secteur, enveloppe budgétaire estimée.

SERVICES GIRA — CABINET :
1. Structuration & Redimensionnement des projets
   → Diagnostic de faisabilité, cadrage technique et financier, montage institutionnel, révision de scope, étude de viabilité
   → Pour : gouvernements, ministères, bailleurs, entreprises
2. Cabinet d'exécution & Maîtrise d'ouvrage déléguée (MOD)
   → Pilotage opérationnel de bout en bout, coordination multi-parties prenantes, suivi-évaluation, reporting bailleurs (Banque Mondiale, BAD, AFD, UE)
   → Spécialité : projets complexes multi-acteurs en contexte africain
3. Mobilisation de financements & d'investisseurs
   → Structuration financière, ingénierie de project finance, montage dossiers Banque Mondiale / BAD / AFD / UE / fonds privés, Table Ronde des Investisseurs
   → Expertise TRI Casablanca : 9 milliards USD mobilisés pour la RCA
4. Renforcement de capacités & transfert de compétences
   → Formation des équipes gouvernementales et institutionnelles, coaching de leadership, mise en place de PMO, transfert de méthodologies d'exécution

SERVICES GIRA DEV (unité tech & innovation) :
- Data & Intelligence Artificielle : modèles IA sur mesure, tableaux de bord analytiques, NLP en langues locales, aide à la décision, prédiction
- Digital Gov & e-Services : portails gouvernementaux, e-services citoyens, identité numérique, intranets ministériels sécurisés, digitalisation de l'état civil
- Infrastructure Tech & IoT : supervision de chantiers, IoT eau/énergie/transport, connectivité satellite (Starlink), SCADA, smart cities
- Finance & Impact ESG : reporting ESG automatisé, plateformes suivi investissements, mobilisation bailleurs, blended finance, impact measurement

SECTEURS D'INTERVENTION (8 secteurs clés) :
Eau & Assainissement | Santé | Énergie | Agriculture | Mines & Ressources naturelles | BTP & Construction | Technologies & Télécoms | Transports & Logistique

ENGAGEMENT PHARE — PND RCA 2024-2028 :
GIRA est partenaire officiel du Plan National de Développement de la République Centrafricaine (2024-2028). GIRA a co-organisé la Table Ronde des Investisseurs de Casablanca (TRI), réunissant plus de 40 pays et institutions, avec 9 milliards USD mobilisés. GIRA pilote des axes structurants : eau, santé, connectivité, gouvernance, agriculture.

RÉSEAU & DIASPORA :
GIRA mobilise un réseau de 45+ experts diaspora africaine sur 3 continents (Europe, Amérique du Nord, Afrique). Profils : ingénieurs, économistes, experts sectoriels, juristes, financiers. Possibilité de rejoindre le réseau via /reseau-diaspora.

PRÉSENCES :
- Paris (siège) : 128 rue de la Boétie, 75008 Paris — contact@gira-cf.com
- Casablanca : présence opérationnelle
- Bratislava : bureau europe centrale

CLIENTS TYPES :
Gouvernements africains, Ministères, Banque Mondiale, BAD (Banque Africaine de Développement), AFD (Agence Française de Développement), Union Européenne, Fonds d'impact privés, ONG internationales, Entreprises multinationales opérant en Afrique.

Termine TOUJOURS chaque réponse par une invitation concrète : formulaire de contact sur https://gira-cf.com/contact ou email direct à contact@gira-cf.com. Réponse de l'équipe sous 24h.`;

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
