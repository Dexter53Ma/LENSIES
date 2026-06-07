"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import type { Dictionary } from "./types";
import type { Locale } from "./config";

interface TranslationContextValue {
  dictionary: Dictionary;
  locale: Locale;
}

const TranslationContext = createContext<TranslationContextValue | null>(null);

export interface TranslationProviderProps {
  dictionary: Dictionary;
  locale: Locale;
  children: ReactNode;
}

export function TranslationProvider({ dictionary, locale, children }: TranslationProviderProps) {
  return (
    <TranslationContext.Provider value={{ dictionary, locale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useDictionary(): Dictionary {
  const ctx = useContext(TranslationContext);
  if (!ctx) {
    throw new Error("useDictionary must be used inside <TranslationProvider>.");
  }
  return ctx.dictionary;
}

export function useLocale(): Locale {
  const ctx = useContext(TranslationContext);
  if (!ctx) {
    throw new Error("useLocale must be used inside <TranslationProvider>.");
  }
  return ctx.locale;
}

export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : `{${key}}`,
  );
}

export function useT() {
  const dict = useDictionary();
  const locale = useLocale();
  const fmt = useCallback(
    (template: string, values: Record<string, string | number>) => format(template, values),
    [],
  );
  return { ...dict, locale, format: fmt };
}
