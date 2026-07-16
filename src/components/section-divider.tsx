"use client";

import { useReveal } from "@/components/reveal";

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className = "" }: SectionDividerProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`w-full px-24 md:px-90 ${className}`}>
      <div
        className="section-divider-line mx-auto max-w-[123rem]"
        data-revealed={revealed ? "true" : undefined}
      />
    </div>
  );
}
