"use client";

import { useRef } from "react";
import { ArrowDownIcon } from "@/components/icons";
import HeroVideo from "@/components/sections/HeroVideo";
import { useSharedScroll } from "@/components/use-shared-scroll";
import type { HeroData } from "@/i18n/types";

export interface HeroProps {
  data: HeroData;
}

export default function Hero({ data }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pioneersRef = useRef<HTMLDivElement>(null);

  useSharedScroll(() => {
    if (!sectionRef.current || !pioneersRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / (vh * 0.6)));
    const spans = pioneersRef.current.querySelectorAll<HTMLSpanElement>("[data-pioneer]");
    spans.forEach((span, i) => {
      const local = Math.max(0, Math.min(1, progress * 1.4 - i * 0.2));
      span.style.opacity = String(1 - local);
    });
  });

  const scrollDown = () => {
    const next = sectionRef.current?.nextElementSibling as HTMLElement | null;
    next?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-foreground text-cream"
    >
      <HeroVideo
        videoSrc={data.videoSrc}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[56.25vw] w-[100vw] min-h-[100vh] min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklab(0 0 0 / 0.3) 0%, oklab(0 0 0 / 0.55) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[123rem] flex-col items-start justify-end gap-24 overflow-hidden px-24 pb-40 sm:px-40 md:overflow-visible md:px-90 md:pb-90">
        <div ref={pioneersRef} className="flex flex-col items-start gap-4 md:gap-8">
          {data.pioneering.map((word, i) => (
            <span
              key={word}
              data-pioneer
              className="hero-pioneer-enter font-display text-cream"
              style={{
                fontSize: "clamp(2.4rem, 6.4vw, 6.4rem)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                transition: "opacity 0.4s var(--ease-snappy)",
                animationDelay: `${0.1 + i * 0.12}s`,
              }}
            >
              {word}
            </span>
          ))}
        </div>

        <h1
          className="hero-title-enter font-display text-balance text-cream"
          style={{
            fontSize: "clamp(4rem, 11vw, 15rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.045em",
          }}
        >
          {data.title}
        </h1>

        <div className="flex w-full flex-col items-start justify-between gap-24 md:flex-row md:items-end">
          <p className="hero-body-enter max-w-full text-pretty font-body text-[1.4rem] font-medium leading-[1.45] text-cream/85 sm:max-w-[44rem] md:text-[1.6rem]">
            {data.body}
          </p>
          <button
            type="button"
            onClick={scrollDown}
            aria-label={data.scrollDownLabel}
            className="hero-cta-enter magnetic group flex shrink-0 items-center gap-12 self-start rounded-full border border-cream/30 px-20 py-12 text-cream transition-all duration-500 hover:scale-105 hover:border-pink hover:bg-pink hover:text-white md:self-end"
          >
            <span className="font-body text-[1.3rem] font-medium">{data.scrollDownLabel}</span>
            <ArrowDownIcon className="size-12 transition-transform duration-500 group-hover:translate-y-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
