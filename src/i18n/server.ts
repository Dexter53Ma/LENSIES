import type { Locale } from "./config";
import { defaultLocale, LOCALE_COOKIE, isLocale, pickLocale } from "./config";
import { cookies } from "next/headers";

/**
 * Read the active locale on the server, from a cookie set by the
 * LanguageSwitcher. Falls back to the default locale.
 *
 * Must be called inside a server component / route / generateMetadata.
 */
export async function getServerLocale(): Promise<Locale> {
  try {
    const store = await cookies();
    const cookie = store.get(LOCALE_COOKIE)?.value;
    return isLocale(cookie) ? cookie : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

/**
 * Read locale from a plain value (e.g. request header, prefetch signal).
 * Used for places that don't have access to next/headers.
 */
export function resolveLocale(value: string | undefined | null): Locale {
  return pickLocale(value);
}
