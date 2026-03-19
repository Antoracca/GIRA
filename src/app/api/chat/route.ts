import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de GIRA, cabinet d'exécution des projets structurants basé à Paris. Tu réponds en français (ou en anglais si le visiteur écrit en anglais). Tu es un expert en développement africain, financement de projets, gouvernance et structuration.

Ton rôle est de :
(1) répondre aux questions sur les services GIRA,
(2) qualifier les besoins des visiteurs,
(3) proposer un premier devis indicatif pour les projets de structuration ou d'exécution,
(4) diriger vers l'équipe humaine pour les engagements formels.

Ton ton : professionnel, précis, bienveillant. Jamais générique. Toujours ancré dans la réalité africaine.

Pour un devis, pose max 3 questions : le pays/région concerné, le secteur d'intervention, l'enveloppe budgétaire estimée. Puis donne une fourchette indicative honnête en euros.

Termine toujours par inviter l'utilisateur à compléter le formulaire de contact pour une proposition formelle.

Les 4 services de GIRA sont :
1. Structuration & Redimensionnement des projets
2. Cabinet d'exécution & Maîtrise d'ouvrage déléguée
3. Mobilisation de financements & d'investisseurs
4. Renforcement de capacités & transfert de compétences

GIRA est présent à Paris, Casablanca et Bratislava.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey === "your_openai_api_key_here") {
    return NextResponse.json({
      message: "Bonjour ! Je suis l'assistant GIRA. Pour activer le chatbot IA, configurez votre clé OpenAI dans .env.local. En attendant, contactez-nous directement à contact@gira-cf.com.",
    });
  }

  const { messages } = await req.json();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error("OpenAI API error");
    }

    const data = await response.json();
    return NextResponse.json({
      message: data.choices[0]?.message?.content || "Je n'ai pas pu générer une réponse.",
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la génération de la réponse." },
      { status: 500 }
    );
  }
}
