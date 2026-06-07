"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/provider";
import { setLocale as persistLocale } from "@/i18n/client";
import { LOCALE_STORAGE_KEY, locales, type Locale } from "@/i18n/config";

export default function LanguageSwitcher() {
  const t = useT();
  const [active, setActive] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = (typeof window !== "undefined"
      ? (window.localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null)
      : null);
    if (stored && (locales as readonly string[]).includes(stored)) {
      setActive(stored);
    } else {
      // Read from cookie on the client too, as a fallback when
      // localStorage is empty (e.g. SSR set a different cookie).
      const m = typeof document !== "undefined"
        ? document.cookie.match(/(?:^|;\s*)lensies-locale=([^;]+)/)
        : null;
      if (m && (locales as readonly string[]).includes(m[1])) {
        setActive(m[1] as Locale);
      }
    }
  }, []);

  const switchTo = (next: Locale) => {
    if (next === active) return;
    setActive(next);
    persistLocale(next);
  };

  const labels: Record<Locale, string> = {
    en: t.localeSwitcher.enLabel,
    fr: t.localeSwitcher.frLabel,
  };

  return (
    <div
      role="group"
      aria-label={t.localeSwitcher.ariaLabel}
      className="relative inline-flex items-center rounded-full border border-foreground/15 bg-white/70 p-2 backdrop-blur-sm"
    >
      {/* Sliding indicator */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-2 bottom-2 rounded-full bg-foreground transition-all duration-500"
        style={{
          left: active === "en" ? "2px" : "calc(50% + 0px)",
          width: "calc(50% - 2px)",
          transitionTimingFunction: "var(--ease-snappy)",
        }}
      />
      {(Object.keys(labels) as Locale[]).map((code) => {
        const isActive = active === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            aria-pressed={isActive}
            className={`relative z-10 inline-flex h-22 min-w-32 items-center justify-center rounded-full px-10 font-body text-[1.1rem] font-semibold tracking-[0.06em] transition-colors duration-300 md:h-24 md:min-w-36 md:text-[1.15rem] ${
              mounted && isActive ? "text-white" : "text-foreground/65 hover:text-foreground"
            }`}
          >
            {labels[code]}
          </button>
        );
      })}
    </div>
  );
}
