"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import {
  motion,
  useInView,
  type Variants,
} from "framer-motion";

type Variant = "up" | "fade" | "rise" | "scale" | "slide-right" | "slide-left";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  fallbackMs?: number;
}

export function useReveal<T extends Element = HTMLDivElement>(options: UseRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } = options;
  const ref = useRef<T>(null);
  const isInView = useInView(ref, { amount: threshold, margin: rootMargin as any, once });
  return { ref, revealed: isInView };
}

const variantVariants: Record<Variant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  rise: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
};

const springTransition = {
  type: "spring" as const,
  stiffness: 80,
  damping: 20,
  mass: 0.8,
};

const delayMap: Record<number, number> = {
  0: 0,
  1: 0.08,
  2: 0.16,
  3: 0.24,
  4: 0.32,
  5: 0.4,
  6: 0.48,
  7: 0.56,
  8: 0.64,
};

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
  href?: string;
}

export function Reveal({
  as,
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
  const MotionTag = motion.create(as || "div");
  return (
    <MotionTag
      className={className}
      style={style}
      variants={variantVariants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: threshold, margin: rootMargin as any, once }}
      transition={{
        ...springTransition,
        delay: delayMap[delay] ?? delay * 0.08,
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
