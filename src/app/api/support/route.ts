import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are the Lensies Studio concierge — a friendly, knowledgeable assistant for Lensies, a Marrakech-based creative studio specializing in real estate photography, videography, drone, events, experiences, and curated tours across Morocco.

Lensies facts (use these when relevant):
- Studio: Gueliz, Marrakech 40000, Morocco
- Email: contact@lensies.com · Press: Press@lensies.com
- Phone / WhatsApp: +212 621 947 493
- Hours: Mon–Sat, 9:00–19:00 (GMT+1)
- Founded: 2017 · Team: 4 core people, plus trusted local collaborators
- Services: Real Estate, Drone & Aerial, Video & Cinematic, Events, Tours/Experiences, 3D tours

Pricing (MAD, excl. VAT, quotes valid 30 days):
- Appartement: 1,000 MAD — 20 photos, 24h delivery
- Riads: 1,500 MAD — 30 photos, 12h express
- Villa: 2,000 MAD — 40 photos + 3–5 min video, drone
- Events: 3,000–5,000 MAD — full coverage, multiple photographers
- Drone Tour Pack: 4,500 MAD — 4K cinematic drone video + 30+ aerial photos

All packages include commercial usage rights, online gallery, and a 24-hour quote response. Multi-day, multi-location, and quarterly retainers are quoted on request.

Tone: warm, concise, professional. Default to short answers (2–4 sentences). Use lists when comparing options. When the user wants to book, send them to /contact or WhatsApp +212 621 947 493. If asked something outside Lensies, say so politely and offer to put them in touch with the team.`;

type IncomingMessage = { role: "user" | "assistant" | "system"; content: string };

interface RequestBody {
  messages?: IncomingMessage[];
  message?: string;
}

const MAX_HISTORY = 12;
const MAX_CHARS = 4000;

function trimHistory(messages: IncomingMessage[]): IncomingMessage[] {
  const trimmed = messages.slice(-MAX_HISTORY);
  return trimmed.map((m) => ({
    role: m.role,
    content: m.content.slice(0, MAX_CHARS),
  }));
}

function fallbackAnswer(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("price") || p.includes("cost") || p.includes("how much") || p.includes("mad")) {
    return "Lensies pricing (MAD, excl. VAT):\n• Appartement — 1,000\n• Riads — 1,500\n• Villa — 2,000\n• Events — 3,000–5,000\n• Drone Tour Pack — 4,500\n\nAll packages include commercial usage rights and a 24h quote response. Want a custom quote? Email contact@lensies.com or tap /contact.";
  }
  if (p.includes("book") || p.includes("contact") || p.includes("reach") || p.includes("email") || p.includes("phone")) {
    return "You can reach Lensies at contact@lensies.com or +212 621 947 493 (WhatsApp). Studio hours: Mon–Sat, 9–19 (GMT+1), Gueliz, Marrakech. For a quick brief, use the form on /contact.";
  }
  if (p.includes("drone") || p.includes("aerial")) {
    return "Lensies drone work is shot on DJI Mavic 3 Pro in 4K HDR, with a licensed pilot and all Moroccan permits handled. Aerial-only packages start at 4,500 MAD. Fly-inside-medina requests need a 10–15 day permit — share the location and I'll confirm.";
  }
  if (p.includes("delivery") || p.includes("turnaround") || p.includes("how long")) {
    return "Standard delivery is 24–48 hours for real estate (Riads express is 12h). Drone packs ship in 48–72h. Events: same-day preview + full gallery in 48h. Rush delivery is available on request.";
  }
  if (p.includes("service") || p.includes("what do you") || p.includes("offer")) {
    return "Lensies covers real estate photography, drone & aerial, video & cinematic, events, tours/experiences, and 3D tours — all under one studio in Marrakech. Pick a single craft or bundle a shoot day. Tell me what you're working on and I'll suggest the right package.";
  }
  return "I'm the Lensies concierge — ask me about services, pricing, delivery, or how to book. For anything specific, the team replies within 24h at contact@lensies.com or +212 621 947 493.";
}

export async function POST(req: Request) {
  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const history = Array.isArray(body.messages) ? body.messages : [];
  const latest =
    typeof body.message === "string" && body.message.trim().length > 0
      ? body.message.trim()
      : history.filter((m) => m.role === "user").slice(-1)[0]?.content ?? "";

  if (!latest) {
    return NextResponse.json({ error: "No message provided." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const apiBase = process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  if (!apiKey) {
    return NextResponse.json({
      reply: fallbackAnswer(latest),
      source: "fallback",
    });
  }

  const messages: IncomingMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...trimHistory(history),
    { role: "user", content: latest },
  ];

  try {
    const res = await fetch(`${apiBase}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.4,
        max_tokens: 500,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return NextResponse.json({
        reply: fallbackAnswer(latest),
        source: "fallback",
        warning: `Upstream ${res.status}: ${errText.slice(0, 200)}`,
      });
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json({ reply: fallbackAnswer(latest), source: "fallback" });
    }

    return NextResponse.json({ reply, source: "openai" });
  } catch (err) {
    return NextResponse.json({
      reply: fallbackAnswer(latest),
      source: "fallback",
      warning: err instanceof Error ? err.message : "Unknown error",
    });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "Lensies support",
    usage: "POST { message: string, messages?: {role,content}[] }",
  });
}
