"use client";

import { useEffect, useRef } from "react";

type ScrollCallback = () => void;

let scheduled = false;
let lastY = -1;
const callbacks = new Set<ScrollCallback>();

function onScroll() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    const y = window.scrollY;
    if (y === lastY) return;
    lastY = y;
    for (const cb of callbacks) {
      try {
        cb();
      } catch {
        /* swallow per-listener errors to keep the loop alive */
      }
    }
  });
}

function ensureListener() {
  if (typeof window === "undefined") return () => {};
  if (callbacks.size === 0) {
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  return () => {
    if (callbacks.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("scroll", onScroll);
    }
  };
}

export function useSharedScroll(callback: ScrollCallback, enabled = true) {
  const cbRef = useRef(callback);
  cbRef.current = callback;
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const entry: ScrollCallback = () => cbRef.current();
    callbacks.add(entry);
    const cleanup = ensureListener();
    return () => {
      callbacks.delete(entry);
      cleanup();
    };
  }, [enabled]);
}
