"use client";

import { Reveal } from "@/components/reveal";

export interface ServicePortfolioProps {
  filter?: string;
}

const PORTFOLIO_IMAGES = [
  { src: "/images/work-3.png", aspect: "aspect-[4/5]" },
  { src: "/images/work-5.png", aspect: "aspect-[3/4]" },
  { src: "/images/work-9.png", aspect: "aspect-square" },
  { src: "/images/work-11.png", aspect: "aspect-[4/3]" },
  { src: "/images/work-13.png", aspect: "aspect-[3/4]" },
  { src: "/images/work-15.png", aspect: "aspect-square" },
  { src: "/images/work-17.png", aspect: "aspect-[4/5]" },
  { src: "/images/work-19.png", aspect: "aspect-[3/4]" },
];

export default function ServicePortfolio({ filter }: ServicePortfolioProps) {
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
            Our Work
          </h2>
        </Reveal>

        <div className="columns-1 gap-16 sm:columns-2 md:columns-3 [&>*]:mb-16 [&>*]:break-inside-avoid">
          {PORTFOLIO_IMAGES.map((img, i) => (
            <Reveal key={img.src} variant="fade" delay={Math.min(i, 7) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7}>
              <div className="group relative overflow-hidden rounded-[1.2rem] bg-cream">
                <img
                  src={img.src}
                  alt={`Portfolio ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${img.aspect}`}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
