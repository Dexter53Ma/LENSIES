export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "lensies-locale";
export const LOCALE_STORAGE_KEY = "lensies-locale";

export const LOCALE_LABELS: Record<Locale, { native: string; english: string; dir: "ltr" | "rtl" }> = {
  en: { native: "English", english: "English", dir: "ltr" },
  fr: { native: "Français", english: "French", dir: "ltr" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function pickLocale(input: string | undefined | null): Locale {
  if (!input) return defaultLocale;
  const head = input.toLowerCase().split(/[-_]/)[0];
  return isLocale(head) ? head : defaultLocale;
}
