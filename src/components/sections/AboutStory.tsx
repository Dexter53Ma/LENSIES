"use client";

import { Reveal } from "@/components/reveal";

export interface AboutStoryProps {
  data: {
    heading: string;
    body: string;
    image: string;
    imageAlt: string;
  };
}

export default function AboutStory({ data }: AboutStoryProps) {
  return (
    <section className="relative flex w-full justify-center bg-background px-24 py-80 text-foreground md:px-90 md:py-120">
      <div className="grid w-full max-w-[120rem] grid-cols-1 items-center gap-32 md:grid-cols-2 md:gap-48">
        <Reveal variant="slide-right" className="overflow-hidden">
          <img
            src={data.image}
            alt={data.imageAlt}
            width={1080}
            height={1350}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover rounded-[1.2rem]"
          />
        </Reveal>

        <div className="flex flex-col gap-24 md:gap-32">
          <Reveal variant="rise">
            <h2
              className="font-display text-balance text-foreground"
              style={{
                fontSize: "clamp(3.2rem, 6vw, 7.2rem)",
                lineHeight: 0.85,
                letterSpacing: "-0.04em",
              }}
            >
              {data.heading}
            </h2>
          </Reveal>
          <Reveal variant="up" delay={1}>
            <p className="max-w-[48rem] text-pretty font-body text-[1.4rem] font-medium leading-[1.5] text-foreground/70 md:text-[1.6rem]">
              {data.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
