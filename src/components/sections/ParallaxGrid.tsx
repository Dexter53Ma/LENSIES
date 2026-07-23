"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { useSharedScroll } from "@/components/use-shared-scroll";
import type { ParallaxGridData } from "@/i18n/types";

export interface ParallaxGridProps {
  data: ParallaxGridData;
}

type Cell = { hasImage: boolean; src?: string; opacity?: number };

const COLUMNS: { side: "left" | "right"; offset: string; initialY: number; cells: Cell[] }[] = [
  {
    side: "left",
    offset: "2.4rem",
    initialY: 600,
    cells: [
      { hasImage: true, src: "/images/work-2.png" },
      { hasImage: false },
      { hasImage: true, src: "/images/work-5.png" },
      { hasImage: true, src: "/images/work-8.png" },
    ],
  },
  {
    side: "left",
    offset: "16.667%",
    initialY: 0,
    cells: [
      { hasImage: true, src: "/images/work-3.png" },
      { hasImage: false },
      { hasImage: true, src: "/images/work-6.png" },
      { hasImage: true, src: "/images/work-9.png", opacity: 0 },
    ],
  },
  {
    side: "right",
    offset: "16.667%",
    initialY: 0,
    cells: [
      { hasImage: true, src: "/images/work-10.png" },
      { hasImage: true, src: "/images/work-12.png" },
      { hasImage: false },
      { hasImage: true, src: "/images/work-14.png" },
    ],
  },
  {
    side: "right",
    offset: "2.4rem",
    initialY: 600,
    cells: [
      { hasImage: true, src: "/images/work-15.png" },
      { hasImage: false },
      { hasImage: true, src: "/images/work-18.png" },
      { hasImage: true, src: "/images/work-22.png" },
    ],
  },
];

const MOBILE_CELLS = [
  "/images/work-2.png",
  "/images/work-3.png",
  "/images/work-4.png",
  "/images/work-5.png",
  "/images/work-6.png",
  "/images/work-7.png",
  "/images/work-8.png",
  "/images/work-9.png",
  "/images/work-10.png",
  "/images/work-11.png",
  "/images/work-12.png",
  "/images/work-13.png",
  "/images/work-26.png",
];

const DEFAULT_PREVIEW = "/images/work-26.png";

export default function ParallaxGrid({ data }: ParallaxGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const previewImage = data.previewImage ?? DEFAULT_PREVIEW;

  useSharedScroll(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height;
    const scrolled = Math.max(0, -rect.top);
    const p = Math.min(1, scrolled / (total - vh));
    setProgress(p);
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-background md:h-[150vh]"
    >
      <div className="absolute top-0 left-0 h-full w-[0.1rem] bg-foreground/15" />

      <div className="absolute inset-0 origin-top">
        {COLUMNS.map((col, i) => {
          const translateY = col.initialY - col.initialY * progress * 1.2;
          return (
            <div
              key={i}
              className="absolute hidden h-full w-[calc(133/1440*100vw)] flex-col justify-between will-change-transform md:flex"
              style={{
                ...(col.side === "left" ? { left: col.offset } : { right: col.offset }),
                transform: `translateY(${translateY}px)`,
                transition: "transform 0.1s linear",
              }}
            >
              {col.cells.map((cell, j) => (
                <div
                  key={j}
                  className="img-zoom relative aspect-square w-full overflow-hidden rounded-[1.2rem] bg-cream"
                  style={{ opacity: cell.opacity ?? 1 }}
                >
                  {cell.hasImage && cell.src ? (
                    <Image
                      src={cell.src}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 50vw, 133px"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      className="size-full object-cover"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-0 hidden flex-col items-center justify-center gap-40 px-24 md:flex">
        <Reveal as="div" className="max-w-[55rem] text-center" delay={1}>
          <h2 className="font-display text-balance text-foreground type-z-40 mb-20">
            {data.title}
          </h2>
          <p className="text-pretty font-body text-[1.4rem] font-medium leading-[1.4] text-foreground">
            {data.body}
          </p>
        </Reveal>
        <Reveal
          as="div"
          variant="scale"
          delay={2}
          className="img-zoom relative aspect-square w-[calc(133/1440*100vw)] overflow-hidden rounded-[1.2rem] bg-cream"
        >
          <Image
            src={previewImage}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 133px"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="size-full object-cover"
          />
        </Reveal>
      </div>

      <div className="flex flex-col items-center gap-40 px-24 py-80 md:hidden">
        <Reveal as="div" className="max-w-[44rem] text-center">
          <h2 className="font-display text-balance text-foreground type-z-32 mb-20">
            {data.title}
          </h2>
          <p className="text-pretty font-body text-[1.4rem] font-medium leading-[1.4] text-foreground">
            {data.body}
          </p>
        </Reveal>
        <div className="grid w-full grid-cols-2 gap-12">
          {MOBILE_CELLS.map((src, i) => (
            <Reveal
              key={src}
              variant="scale"
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="img-zoom relative aspect-square w-full overflow-hidden rounded-[1.2rem] bg-cream"
            >
              <Image src={src} alt="" fill sizes="50vw" loading="lazy" decoding="async" fetchPriority="low" className="size-full object-cover" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
