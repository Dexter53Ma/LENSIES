"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type Variant = "up" | "fade" | "rise" | "scale" | "slide-right" | "slide-left";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  /**
   * Hard ceiling (ms) after which the element is forced visible even if
   * the IntersectionObserver never fires. This is a safety net for:
   *   • observer-not-supported browsers,
   *   • synthetic scroll (test runners, headless tools),
   *   • sections that are taller than the viewport and get observed
   *     off-screen at the bottom of the document.
   * Default: 1500 ms.
   */
  fallbackMs?: number;
}

export function useReveal<T extends Element = HTMLDivElement>(options: UseRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true, fallbackMs = 1500 } = options;
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => {
      setRevealed(true);
      el.setAttribute("data-revealed", "true");
    };
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setRevealed(false);
            el.removeAttribute("data-revealed");
          }
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    const raf = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh && rect.bottom > 0) reveal();
    });
    const t = window.setTimeout(() => {
      reveal();
    }, fallbackMs);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [threshold, rootMargin, once, fallbackMs]);

  return { ref, revealed };
}

interface RevealProps {
  as?: ElementType;
  variant?: Variant;
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  id?: string;
}

const variantClass: Record<Variant, string> = {
  up: "reveal",
  fade: "reveal-fade",
  rise: "reveal-rise",
  scale: "reveal-scale",
  "slide-right": "reveal-slide-right",
  "slide-left": "reveal-slide-left",
};

export function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  children,
  style,
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  ...rest
}: RevealProps) {
  const { ref, revealed } = useReveal<HTMLElement>({ threshold, rootMargin, once });
  const delayClass = delay > 0 ? ` delay-${delay}` : "";
  return (
    <Tag
      ref={ref as unknown as React.Ref<HTMLElement>}
      className={`${variantClass[variant]}${delayClass} ${className}`}
      data-revealed={revealed ? "true" : undefined}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
