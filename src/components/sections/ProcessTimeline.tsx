"use client";

import { Reveal } from "@/components/reveal";
import type { ProcessTimelineData } from "@/i18n/types";

export interface ProcessTimelineProps {
  data: ProcessTimelineData;
}

export default function ProcessTimeline({ data }: ProcessTimelineProps) {
  return (
    <section className="relative w-full bg-cream px-24 py-80 text-foreground md:px-90 md:py-120">
      <div className="mx-auto max-w-[120rem]">
        <Reveal variant="up">
          <h2
            className="mb-48 font-display text-balance text-center text-foreground md:mb-64"
            style={{
              fontSize: "clamp(3.2rem, 7vw, 7.2rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
            }}
          >
            {data.heading}
          </h2>
        </Reveal>

        {/* Mobile: vertical timeline */}
        <div className="relative flex flex-col gap-32 md:hidden">
          <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-foreground/10" />
          {data.steps.map((step, i) => (
            <Reveal key={step.title} variant="slide-right" delay={Math.min(i, 4) as 0 | 1 | 2 | 3 | 4}>
              <div className="flex gap-20">
                <div className="relative z-10 flex h-40 w-40 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-cream">
                  <span className="font-display text-[1.8rem] font-semibold text-foreground">
                    {i + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-6 pt-6">
                  <h3
                    className="font-display font-semibold text-foreground"
                    style={{
                      fontSize: "clamp(1.8rem, 4vw, 2.2rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p className="max-w-[28rem] text-pretty font-body text-[1.3rem] font-medium leading-[1.5] text-foreground/60">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="relative hidden md:block">
          <div className="absolute left-0 right-0 top-[19px] h-[2px] bg-foreground/10" />
          <div className="grid grid-cols-5 gap-20">
            {data.steps.map((step, i) => (
              <Reveal key={step.title} variant="up" delay={Math.min(i, 4) as 0 | 1 | 2 | 3 | 4}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 mb-24 flex h-40 w-40 items-center justify-center rounded-full border-2 border-foreground bg-cream">
                    <span className="font-display text-[1.8rem] font-semibold text-foreground">
                      {i + 1}
                    </span>
                  </div>
                  <h3
                    className="mb-8 font-display font-semibold text-foreground"
                    style={{
                      fontSize: "clamp(1.6rem, 1.8vw, 2rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p className="max-w-[20rem] text-pretty font-body text-[1.3rem] font-medium leading-[1.5] text-foreground/60">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
