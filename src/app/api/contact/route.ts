import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  organisation: z.string().min(1),
  fonction: z.string().min(1),
  pays: z.string().min(1),
  email: z.string().email(),
  telephone: z.string().optional(),
  typeDemande: z.string().min(1),
  message: z.string().min(20),
  rgpd: z.boolean().refine((v) => v === true, "Consentement RGPD requis"),
  honeypot: z.string().max(0, "Spam détecté"),
});

// In-memory rate limiting (resets on server restart)
const requests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const max = 5;

  const timestamps = (requests.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= max) return true;

  timestamps.push(now);
  requests.set(ip, timestamps);
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Trop de requêtes. Réessayez dans 10 minutes." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Corps invalide" }, { status: 400 });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides", details: parsed.error.flatten() }, { status: 400 });
  }

  const { honeypot, ...data } = parsed.data;
  void honeypot;

  // Send email via Resend if API key is configured
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey && resendKey !== "your_resend_api_key_here") {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from: "GIRA Website <noreply@gira-cf.com>",
        to: ["contact@gira-cf.com"],
        subject: `[GIRA] Nouveau message de ${data.nom} ${data.prenom} — ${data.typeDemande}`,
        html: `
          <h2>Nouveau message depuis le site GIRA</h2>
          <p><strong>Nom :</strong> ${data.nom} ${data.prenom}</p>
          <p><strong>Organisation :</strong> ${data.organisation}</p>
          <p><strong>Fonction :</strong> ${data.fonction}</p>
          <p><strong>Pays :</strong> ${data.pays}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          ${data.telephone ? `<p><strong>Téléphone :</strong> ${data.telephone}</p>` : ""}
          <p><strong>Type de demande :</strong> ${data.typeDemande}</p>
          <hr />
          <p><strong>Message :</strong></p>
          <p>${data.message.replace(/\n/g, "<br>")}</p>
        `,
      });
    } catch {
      // Log error server-side but still return success to user
      console.error("Resend error");
    }
  }

  return NextResponse.json({ success: true });
}
