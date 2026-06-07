"use client";

import { LOCALE_COOKIE, LOCALE_STORAGE_KEY, type Locale } from "./config";

/**
 * Switch the active locale from a client component. Writes both a
 * cookie (so the next server render uses the new locale — important
 * for SEO and metadata) and a localStorage entry (for instant client
 * reads). Reloads the page to re-run server components in the new
 * locale.
 */
export function setLocale(locale: Locale): void {
  if (typeof document === "undefined") return;
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${oneYear}; SameSite=Lax`;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* storage unavailable */
  }
  document.documentElement.lang = locale;
  // Re-run server components (metadata, page-level data) in the new locale.
  window.location.reload();
}
