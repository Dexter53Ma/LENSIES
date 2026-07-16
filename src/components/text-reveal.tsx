"use client";

import { type ReactNode } from "react";
import { useReveal } from "@/components/reveal";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  stagger?: number;
  variant?: "words" | "lines";
  threshold?: number;
  rootMargin?: string;
}

export default function TextReveal({
  children,
  as: Tag = "p",
  className = "",
  stagger = 0.04,
  variant = "words",
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
}: TextRevealProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold, rootMargin });

  const segments = variant === "lines"
    ? children.split("\n").filter(Boolean)
    : children.split(/\s+/).filter(Boolean);

  return (
    <Tag className={className}>
      <span ref={ref as React.Ref<HTMLSpanElement>} className="inline">
        {segments.map((segment, i) => (
          <span
            key={i}
            className="text-word"
            style={{
              animationDelay: revealed ? `${i * stagger}s` : undefined,
              animationPlayState: revealed ? "running" : "paused",
            }}
            data-revealed={revealed ? "true" : undefined}
          >
            {segment}
            {variant === "words" && i < segments.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </span>
    </Tag>
  );
}
