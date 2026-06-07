import { en } from "./en";
import { fr } from "./fr";
import type { Dictionary } from "../types";

/**
 * Deep-merge a partial dictionary on top of a full base. Falls back to
 * the base (English) for any key that is `undefined` or an empty
 * string. Arrays are replaced as a whole (not merged item-by-item) —
 * this is the only sane way to translate lists/tabs/testimonials.
 */
function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function deepMerge<T>(base: T, patch: unknown): T {
  if (patch === undefined || patch === null) return base;
  if (patch === "") return base; // empty string → fall back to English
  if (Array.isArray(patch)) return patch as unknown as T;
  if (isPlainObject(patch) && isPlainObject(base)) {
    const out: Record<string, unknown> = { ...base };
    for (const key of Object.keys(patch)) {
      out[key] = deepMerge((base as Record<string, unknown>)[key], (patch as Record<string, unknown>)[key]);
    }
    return out as T;
  }
  return patch as T;
}

export const enDictionary: Dictionary = en;
export const frDictionary: Dictionary = deepMerge(en, fr) as Dictionary;

export { en, fr };
export type { Dictionary };
