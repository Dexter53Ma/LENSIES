"use client";

import { type ReactNode } from "react";
import { motion, type Variants, type HTMLMotionProps } from "framer-motion";

/* ─── Parallax ────────────────────────────────────────────────────────── */

interface ParallaxProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.15, className = "", ...rest }: ParallaxProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: speed * -100 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ type: "spring", stiffness: 60, damping: 20, mass: 1.2 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ─── StaggerGroup ────────────────────────────────────────────────────── */

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

const groupVariants: Variants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  }),
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 16,
      mass: 0.8,
    },
  },
};

export function StaggerGroup({
  children,
  className = "",
  staggerDelay = 0.08,
  once = true,
}: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      custom={staggerDelay}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

/* ─── HoverCard ────────────────────────────────────────────────────────── */

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  lift?: number;
}

export function HoverCard({
  children,
  className = "",
  scale = 1.02,
  lift = -8,
}: HoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        y: lift,
        boxShadow: "0 2rem 4rem -1rem oklab(0 0 0 / 0.12)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── RevealText (standalone) ─────────────────────────────────────────── */

interface RevealTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
}

export function RevealText({
  children,
  className = "",
  as: Tag = "p",
  once = true,
}: RevealTextProps) {
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag className={className} style={{ perspective: 600 }}>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ transformOrigin: "bottom" }}
          initial={{ opacity: 0, y: 30, rotateX: -40 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            delay: i * 0.03,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </MotionTag>
  );
}

/* ─── ScaleIn ──────────────────────────────────────────────────────────── */

interface ScaleInProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
}

export function ScaleIn({ children, className = "", once = true }: ScaleInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, margin: "0px 0px -15% 0px" }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 18,
        mass: 1,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── SlideReveal ─────────────────────────────────────────────────────── */

interface SlideRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  once?: boolean;
  distance?: number;
}

const slideDirections = {
  left: { x: -80, y: 0 },
  right: { x: 80, y: 0 },
  up: { x: 0, y: 80 },
  down: { x: 0, y: -80 },
};

export function SlideReveal({
  children,
  className = "",
  direction = "up",
  once = true,
  distance = 80,
}: SlideRevealProps) {
  const dir = slideDirections[direction];
  const scale = distance / 80;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: dir.x * scale, y: dir.y * scale, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 18,
        mass: 0.9,
      }}
    >
      {children}
    </motion.div>
  );
}
