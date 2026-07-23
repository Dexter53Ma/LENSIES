"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import { useSharedScroll } from "@/components/use-shared-scroll";
import type { FeatureTabsData } from "@/i18n/types";

export interface FeatureTabsProps {
  data: FeatureTabsData;
}

const DEFAULT_IMAGE = "/images/feature-safe.jpg";

export default function FeatureTabs({ data }: FeatureTabsProps) {
  const features = data.features;
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const image = data.image ?? DEFAULT_IMAGE;

  useSharedScroll(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const totalScrollable = rect.height - vh;
    const scrolled = Math.max(0, Math.min(totalScrollable, -rect.top + vh * 0.5));
    const ratio = totalScrollable > 0 ? scrolled / totalScrollable : 0;
    const idx = Math.min(features.length - 1, Math.max(0, Math.floor(ratio * features.length)));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background text-foreground h-auto md:h-[200vh]"
    >
      <div className="absolute top-[25vh] left-0 hidden h-[25vh] w-[0.1rem] bg-foreground/15 md:block" />
      <div className="absolute top-[100vh] left-0 hidden h-[200vh] w-[0.1rem] bg-foreground/15 md:block" />

      <div className="relative mx-auto h-full w-full max-w-[123rem] px-24 md:px-90">
        <div className="flex h-full w-full flex-col gap-24 md:gap-40 md:flex-row md:justify-between">
          <div className="relative flex flex-1 flex-col md:h-full md:max-w-[52.7rem]">
            <div className="flex items-start md:h-screen md:items-center md:sticky md:top-0">
              <div className="img-zoom relative aspect-[4/5] w-full overflow-hidden rounded-[1.2rem] bg-cream">
                <img
                  src={image}
                  alt={data.imageAlt ?? data.heading}
                  width={1080}
                  height={1350}
                  decoding="async"
                  fetchPriority="high"
                  className="size-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="relative flex flex-1 flex-col md:h-[200vh] md:max-w-[37rem]">
            <div className="flex min-h-0 flex-wrap items-start py-40 md:min-h-[60vh] md:h-screen md:items-center md:py-0">
              <Reveal>
                <h2
                  className="font-display text-balance text-foreground mb-20"
                  style={{
                    fontSize: "clamp(3.6rem, 6vw, 6rem)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {data.heading}
                </h2>
                <p className="max-w-[34rem] text-pretty font-body text-[1.4rem] font-medium leading-[1.4] text-foreground/80 md:text-[1.6rem]">
                  {data.intro}
                </p>
              </Reveal>
            </div>

            <div className="pointer-events-none sticky top-0 -mt-[50svh] hidden h-screen flex-col items-start justify-center gap-20 md:flex">
              {features.map((f, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={f.label}
                    className="flex flex-col gap-8"
                    style={{
                      opacity: isActive ? 1 : 0.4,
                      transform: isActive ? "translateX(0.4rem)" : "translateX(0)",
                      transition:
                        "opacity 0.6s var(--ease-snappy), transform 0.6s var(--ease-snappy)",
                    }}
                  >
                    <p
                      className="font-display text-foreground"
                      style={{
                        fontSize: "clamp(2.4rem, 4vw, 4rem)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {f.label}
                    </p>
                    <div
                      className="overflow-hidden"
                      style={{
                        maxHeight: isActive ? "12rem" : "0",
                        opacity: isActive ? 1 : 0,
                        transition:
                          "max-height 0.6s var(--ease-snappy), opacity 0.5s var(--ease-snappy) 0.05s",
                      }}
                    >
                      <p className="max-w-[34rem] text-pretty font-body text-[1.4rem] font-medium leading-[1.4] text-foreground/85 md:text-[1.6rem]">
                        {f.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-32 pt-40 pb-80 md:hidden">
              {features.map((f, i) => (
                <Reveal
                  key={f.label}
                  delay={((i + 1) as 1 | 2 | 3)}
                  className="flex flex-col gap-12 border-t border-foreground/10 pt-24"
                >
                  <p
                    className="font-display text-foreground"
                    style={{
                      fontSize: "clamp(2.8rem, 8vw, 4rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {f.label}
                  </p>
                  <p className="text-pretty font-body text-[1.4rem] font-medium leading-[1.4] text-foreground/80">
                    {f.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
