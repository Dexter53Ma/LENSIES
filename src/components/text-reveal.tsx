"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  stagger?: number;
  variant?: "words" | "lines" | "chars";
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {},
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.6,
    },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
      mass: 0.8,
    },
  },
};

export default function TextReveal({
  children,
  as: Tag = "p",
  className = "",
  stagger = 0.04,
  variant = "words",
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: threshold, margin: rootMargin as any, once });

  const segments =
    variant === "lines"
      ? children.split("\n").filter(Boolean)
      : variant === "chars"
        ? children.split("")
        : children.split(/\s+/).filter(Boolean);

  const MotionTag = motion.create(Tag);

  return (
    <MotionTag className={className} style={{ perspective: 600 }}>
      <motion.span
        ref={ref}
        className="inline"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {segments.map((segment, i) => (
          <motion.span
            key={i}
            className="inline-block"
            style={{ transformOrigin: "bottom" }}
            variants={variant === "lines" ? lineVariants : wordVariants}
            transition={{
              delay: i * stagger,
            }}
          >
            {segment}
            {variant === "words" && i < segments.length - 1 ? "\u00A0" : ""}
            {variant === "chars" && segment === " " ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </MotionTag>
  );
}
