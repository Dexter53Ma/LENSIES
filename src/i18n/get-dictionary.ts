import type { Locale } from "./config";
import { enDictionary, frDictionary } from "./dictionaries";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = {
  en: enDictionary,
  fr: frDictionary,
};

/**
 * Synchronously load a dictionary by locale. Each locale's
 * dictionary is statically imported so server + client see the same
 * data, and bundlers can tree-shake unused locales if you ever want
 * code-splitting.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? enDictionary;
}
