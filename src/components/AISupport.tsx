"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SparklesIcon } from "@/components/icons-extended";
import { CloseIcon } from "@/components/icons";
import { ArrowUp } from "lucide-react";
import { useT } from "@/i18n/provider";

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  pending?: boolean;
}

const STORAGE_KEY = "lensies-support-history";
const MAX_MESSAGES = 24;

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function loadHistory(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatMessage[];
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(-MAX_MESSAGES);
  } catch {
    return [];
  }
}

function saveHistory(messages: ChatMessage[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(messages.slice(-MAX_MESSAGES)),
    );
  } catch {
    /* ignore quota errors */
  }
}

export default function AISupport() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMessages(loadHistory());
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => inputRef.current?.focus(), 220);
    return () => clearTimeout(id);
  }, [open]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (messages.length > 0) saveHistory(messages);
  }, [messages]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;

    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      content: trimmed,
    };
    const placeholder: ChatMessage = {
      id: uid(),
      role: "assistant",
      content: "",
      pending: true,
    };

    setMessages((prev) => [...prev, userMsg, placeholder]);
    setInput("");
    setError(null);
    setPending(true);

    try {
      const historyPayload = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          messages: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }

      const data = (await res.json()) as { reply?: string; source?: string };
      const reply = data.reply?.trim() || t.aiSupport.emptyReply;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === placeholder.id ? { ...m, content: reply, pending: false } : m,
        ),
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Network error";
      setError(msg);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === placeholder.id
            ? { ...m, content: t.aiSupport.errorFallback, pending: false }
            : m,
        ),
      );
    } finally {
      setPending(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  }

  function clearChat() {
    setMessages([]);
    setError(null);
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.aiSupport.closeLabel : t.aiSupport.triggerLabel}
        aria-expanded={open}
        className="group fixed bottom-24 right-24 z-[450] grid size-48 place-items-center rounded-full bg-foreground text-white shadow-[0_1.5rem_4rem_-1.5rem_oklab(0_0_0_/0.45)] transition-all duration-500 hover:scale-105 hover:bg-pink md:bottom-32 md:right-32 md:size-56"
        style={{
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
        }}
      >
        {open ? (
          <CloseIcon className="size-20 text-white md:size-24" />
        ) : (
          <span className="relative flex items-center justify-center">
            <SparklesIcon className="size-22 text-white md:size-26" />
            <span className="absolute -top-4 -right-4 grid size-16 place-items-center rounded-full bg-pink text-[1rem] font-semibold text-white md:size-20">
              AI
            </span>
          </span>
        )}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="support-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[7.5rem] right-24 z-[445] flex h-[min(80vh,640px)] w-[min(92vw,400px)] flex-col overflow-hidden rounded-[2rem] border border-foreground/10 bg-white shadow-[0_3rem_8rem_-2rem_oklab(0_0_0_/0.35)] md:bottom-[8.5rem] md:right-32"
            role="dialog"
            aria-label={t.aiSupport.title}
          >
            <div className="flex items-center justify-between gap-12 border-b border-foreground/10 bg-foreground px-20 py-16 text-white">
              <div className="flex items-center gap-12">
                <span className="grid size-36 place-items-center rounded-full bg-pink/20">
                  <SparklesIcon className="size-18 text-pink" />
                </span>
                <div className="flex flex-col">
                  <span className="font-display text-[1.7rem] leading-none">
                    {t.aiSupport.title}
                  </span>
                  <span className="mt-4 font-body text-[1.1rem] font-medium uppercase tracking-[0.12em] text-cream/60">
                    {t.aiSupport.subtitle}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={clearChat}
                className="font-body text-[1.1rem] font-medium uppercase tracking-[0.12em] text-cream/50 transition-colors hover:text-cream"
                aria-label={t.aiSupport.clearAriaLabel}
              >
                {t.aiSupport.clearLabel}
              </button>
            </div>

            <div
              ref={scrollerRef}
              className="scrollbar-hide flex-1 space-y-12 overflow-y-auto bg-background px-20 py-20"
              style={{ scrollbarWidth: "none" }}
            >
              {messages.length === 0 ? (
                <div className="flex h-full flex-col justify-center gap-20">
                  <div className="flex flex-col gap-8">
                    <span className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.15em] text-foreground/50">
                      {t.aiSupport.welcomeLabel}
                    </span>
                    <p className="text-pretty font-body text-[1.5rem] font-medium leading-[1.4] text-foreground">
                      {t.aiSupport.welcome}
                    </p>
                  </div>
                  <div className="flex flex-col gap-8">
                    <span className="font-body text-[1.1rem] font-semibold uppercase tracking-[0.15em] text-foreground/40">
                      {t.aiSupport.tryLabel}
                    </span>
                    <div className="flex flex-wrap gap-8">
                      {t.aiSupport.suggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => void send(s)}
                          className="rounded-full border border-foreground/15 bg-white px-14 py-8 font-body text-[1.2rem] font-medium text-foreground/80 transition-all duration-300 hover:-translate-y-1 hover:border-pink hover:text-pink"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[1.4rem] px-16 py-12 font-body text-[1.4rem] leading-[1.5] ${
                        m.role === "user"
                          ? "bg-foreground text-white"
                          : "bg-white text-foreground shadow-[0_0.5rem_1.5rem_-0.5rem_oklab(0_0_0_/0.08)]"
                      }`}
                      style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {m.pending ? (
                        <span className="flex items-center gap-6">
                          <span className="size-6 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.3s]" />
                          <span className="size-6 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.15s]" />
                          <span className="size-6 animate-bounce rounded-full bg-foreground/40" />
                        </span>
                      ) : (
                        m.content
                      )}
                    </div>
                  </div>
                ))
              )}
              {error ? (
                <p className="font-body text-[1.1rem] font-medium text-pink">{error}</p>
              ) : null}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-end gap-8 border-t border-foreground/10 bg-white px-16 py-14"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={t.aiSupport.inputPlaceholder}
                className="scrollbar-hide flex-1 resize-none rounded-2xl border border-foreground/15 bg-background px-14 py-10 font-body text-[1.4rem] font-medium leading-[1.4] text-foreground outline-none transition-colors focus:border-pink"
                style={{ maxHeight: 120, minHeight: 44 }}
              />
              <button
                type="submit"
                disabled={pending || input.trim().length === 0}
                aria-label={t.aiSupport.sendLabel}
                className="grid size-44 shrink-0 place-items-center rounded-full bg-foreground text-white transition-all duration-300 hover:scale-105 hover:bg-pink disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowUp className="size-18" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
