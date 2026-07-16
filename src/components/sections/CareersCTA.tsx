"use client";

import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import type { CareersCTAData } from "@/i18n/types";

export interface CareersCTAProps {
  data: CareersCTAData;
}

export default function CareersCTA({ data }: CareersCTAProps) {
  return (
    <section className="relative flex w-full items-center justify-center bg-white px-24 py-120 text-foreground md:px-90">
      <div className="relative flex w-full max-w-[120rem] flex-col items-center gap-32 text-center">
        <Reveal variant="scale">
          <h2
            className="font-display text-balance text-foreground"
            style={{
              fontSize: "clamp(4.4rem, 12vw, 12rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.045em",
            }}
          >
            {data.heading}
          </h2>
        </Reveal>
        <Reveal variant="rise" delay={1}>
          <p className="max-w-[64rem] text-pretty font-body text-[1.4rem] font-medium leading-[1.4] text-foreground/80 md:text-[1.8rem]">
            {data.body}
          </p>
        </Reveal>
        <Reveal variant="up" delay={2}>
          <a href={data.ctaHref} className="pill pill-pink mt-12 inline-flex items-center gap-8">
            <span>{data.ctaLabel}</span>
            <ArrowRightIcon className="size-12" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
