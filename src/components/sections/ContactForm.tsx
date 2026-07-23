"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/reveal";
import { useT } from "@/i18n/provider";
import type { ContactInfo } from "@/i18n/types";

export interface ContactFormProps {
  subjects: string[];
  nameLabel: string;
  emailLabel: string;
  subjectLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  sendInquiryLabel: string;
  info: ContactInfo[];
  ctaBody: string;
}

export default function ContactForm() {
  const t = useT();
  const form = t.contact.form;
  const info = t.contact.info;
  const ctaBody = t.contact.ctaBody;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(form.subjects[0] ?? "");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setSubject(form.subjects[0] ?? "");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-background py-120">
      <div className="mx-auto grid w-full max-w-[123rem] grid-cols-1 gap-60 px-24 md:grid-cols-12 md:px-90">
        <Reveal className="md:col-span-7">
          <h3
            className="font-display text-balance text-foreground mb-32"
            style={{ fontSize: "clamp(3rem, 5vw, 5rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}
          >
            {form.sendInquiryLabel}
          </h3>
          {status === "sent" ? (
            <div className="rounded-[1.2rem] border border-foreground/10 bg-cream-light p-32 text-center">
              <p className="font-body text-[1.6rem] font-medium text-foreground">
                {t.locale === "fr"
                  ? "Merci ! Votre message a été envoyé. Nous vous répondrons sous 24 heures."
                  : "Thank you! Your message has been sent. We'll reply within 24 hours."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-32">
              <div className="grid grid-cols-1 gap-24 sm:grid-cols-2">
                <label className="flex flex-col gap-8">
                  <span className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.1em] text-foreground/60">
                    {form.nameLabel}
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-b border-foreground/20 bg-transparent py-12 font-body text-[1.5rem] font-medium text-foreground outline-none transition-colors focus:border-pink"
                  />
                </label>
                <label className="flex flex-col gap-8">
                  <span className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.1em] text-foreground/60">
                    {form.emailLabel}
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-b border-foreground/20 bg-transparent py-12 font-body text-[1.5rem] font-medium text-foreground outline-none transition-colors focus:border-pink"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-12">
                <span className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.1em] text-foreground/60">
                  {form.subjectLabel}
                </span>
                <div className="flex flex-wrap gap-8">
                  {form.subjects.map((s) => (
                    <label
                      key={s}
                      className="cursor-pointer rounded-full border border-foreground/15 px-16 py-8 font-body text-[1.3rem] font-medium text-foreground/70 transition-colors has-[:checked]:border-pink has-[:checked]:bg-pink has-[:checked]:text-white"
                    >
                      <input
                        type="radio"
                        name="subject"
                        value={s}
                        checked={subject === s}
                        onChange={() => setSubject(s)}
                        className="sr-only"
                      />
                      {s}
                    </label>
                  ))}
                </div>
              </label>

              <label className="flex flex-col gap-8">
                <span className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.1em] text-foreground/60">
                  {form.messageLabel}
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={form.messagePlaceholder}
                  className="resize-none border-b border-foreground/20 bg-transparent py-12 font-body text-[1.5rem] font-medium text-foreground placeholder:text-foreground/30 outline-none transition-colors focus:border-pink"
                />
              </label>

              {status === "error" && (
                <p className="font-body text-[1.3rem] text-pink">
                  {t.locale === "fr"
                    ? "Une erreur s'est produite. Veuillez réessayer ou nous contacter directement."
                    : "Something went wrong. Please try again or contact us directly."}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="magnetic group mt-16 inline-flex w-fit items-center gap-12 self-start rounded-full border border-foreground bg-foreground px-32 py-16 font-body text-[1.4rem] font-medium text-cream transition-all duration-500 hover:scale-105 hover:bg-pink hover:border-pink hover:text-white disabled:opacity-50 disabled:hover:scale-100"
              >
                {status === "sending"
                  ? (t.locale === "fr" ? "Envoi…" : "Sending…")
                  : form.submitLabel}
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={1} className="md:col-span-5">
          <div className="flex flex-col gap-32">
            {info.map((i) => (
              <div key={i.label} className="flex flex-col gap-6 border-t border-foreground/10 pt-20">
                <span className="font-body text-[1.1rem] font-semibold uppercase tracking-[0.1em] text-foreground/50">
                  {i.label}
                </span>
                {i.href ? (
                  <a
                    href={i.href}
                    className="link-underline font-display text-balance text-foreground hover:text-pink"
                    style={{ fontSize: "clamp(1.8rem, 2.4vw, 2.4rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                  >
                    {i.value}
                  </a>
                ) : (
                  <p
                    className="font-display text-balance text-foreground"
                    style={{ fontSize: "clamp(1.8rem, 2.4vw, 2.4rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                  >
                    {i.value}
                  </p>
                )}
              </div>
            ))}
            <p className="font-body text-[1.3rem] font-medium text-foreground/70 md:text-[1.4rem]">
              {ctaBody}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
