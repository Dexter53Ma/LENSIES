"use client";

import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import type { ServiceCardsData } from "@/i18n/types";

export interface ServiceCardsProps {
  data: ServiceCardsData;
}

export default function ServiceCards({ data }: ServiceCardsProps) {
  return (
    <section className="relative w-full bg-background px-24 py-80 text-foreground md:px-90 md:py-120">
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

        <div className="grid grid-cols-1 gap-24 sm:grid-cols-2 lg:grid-cols-3 md:gap-32">
          {data.items.map((item, i) => (
            <Reveal key={item.id} variant="up" delay={Math.min(i, 5) as 0 | 1 | 2 | 3 | 4 | 5}>
              <a
                href={item.href}
                className="group flex flex-col gap-16 transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_3rem_6rem_-2rem_oklab(0_0_0_/0.18)] md:gap-20"
              >
                <div className="img-zoom relative aspect-[4/3] w-full overflow-hidden rounded-[1.2rem] bg-cream">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-8 md:gap-12">
                  <h3
                    className="font-display text-foreground"
                    style={{
                      fontSize: "clamp(2rem, 2.5vw, 2.6rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.name}
                  </h3>
                  <p className="max-w-[36rem] text-pretty font-body text-[1.4rem] font-medium leading-[1.45] text-foreground/70 md:text-[1.5rem]">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-6 font-body text-[1.3rem] font-semibold text-foreground transition-colors group-hover:text-pink md:text-[1.4rem]">
                    Learn more
                    <ArrowRightIcon className="size-12 transition-transform duration-300 group-hover:translate-x-4" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
