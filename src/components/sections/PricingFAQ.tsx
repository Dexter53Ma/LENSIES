"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { PricingFAQData } from "@/i18n/types";

export interface PricingFAQProps {
  data: PricingFAQData;
}

export default function PricingFAQ({ data }: PricingFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-background px-24 py-80 text-foreground md:px-90 md:py-120">
      <div className="mx-auto max-w-[80rem]">
        <Reveal className="mb-40 md:mb-48">
          <h2
            className="font-display text-balance text-foreground"
            style={{
              fontSize: "clamp(3.2rem, 6vw, 6.4rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
            }}
          >
            {data.heading}
          </h2>
        </Reveal>

        <div className="flex flex-col gap-0">
          {data.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <div className="border-b border-foreground/10">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-12 py-20 text-left transition-colors hover:text-foreground/80 md:gap-16 md:py-24"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="font-display font-semibold text-foreground"
                      style={{
                        fontSize: "clamp(1.6rem, 2vw, 2rem)",
                        lineHeight: 1.15,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {item.question}
                    </span>
                    <ChevronDown
                      className="size-16 shrink-0 text-foreground/50 transition-transform duration-300 md:size-20"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isOpen ? "20rem" : "0",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="pb-20 font-body text-[1.3rem] font-medium leading-[1.6] text-foreground/70 md:pb-24 md:text-[1.5rem]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
