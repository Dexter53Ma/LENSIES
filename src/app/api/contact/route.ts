import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

interface ContactBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export async function POST(req: Request) {
  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, email, subject, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM ?? "Lensies <contact@lensies.com>";
  const to = process.env.RESEND_TO ?? "contact@lensies.com";

  try {
    await resend.emails.send({
      from,
      to,
      subject: subject ? `[Lensies] ${subject}` : "[Lensies] New contact form message",
      replyTo: email,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
