"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, ArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import type { ProductShowcaseData } from "@/i18n/types";

export interface ProductShowcaseProps {
  data: ProductShowcaseData;
}

const DEFAULT_VIDEO = "/videos/light-tunnel.mp4";

export default function ProductShowcase({ data }: ProductShowcaseProps) {
  const cards = data.cards.map((c) => ({
    ...c,
    videoSrc: c.imageSrc ? undefined : (c.videoSrc ?? DEFAULT_VIDEO),
    align: c.align ?? "left",
  }));
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sec = sectionRef.current;
      const track = trackRef.current;
      if (!sec || !track) return;
      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const pinRange = rect.height - vh;
      const scrolled = Math.max(0, Math.min(pinRange, -rect.top));
      const p = pinRange > 0 ? scrolled / pinRange : 0;
      setProgress(p);

      const maxScroll = track.scrollWidth - vh;
      track.style.transform = `translate3d(${-p * maxScroll}px, 0, 0)`;

      const idx = Math.min(
        cards.length - 1,
        Math.max(0, Math.round(p * (cards.length - 1))),
      );
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [cards.length]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative hidden w-full bg-white text-foreground md:block"
        style={{ height: "200vh" }}
      >
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
          <div className="mx-auto flex h-full w-full max-w-[160rem] flex-col px-24 md:px-90">
            <div className="flex shrink-0 items-center justify-between py-24">
              <div className="flex items-center gap-12 font-body text-[1.2rem] font-medium text-foreground/70">
                <span className="rounded-full border border-current/15 px-12 py-4">
                  {data.eyebrow}
                </span>
                <span className="font-mono text-foreground/50">
                  {String(active + 1).padStart(2, "0")}/{String(cards.length).padStart(2, "0")}
                </span>
              </div>
              <a href="/portfolio" className="pill pill-pink inline-flex items-center gap-8">
                <span>{data.seeFullPictureLabel}</span>
                <ArrowUpRight className="size-12" />
              </a>
            </div>

            <div
              ref={trackRef}
              className="flex h-full w-max flex-1 items-center gap-40"
              style={{
                willChange: "transform",
                transition: "transform 0.1s linear",
              }}
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="grid h-full w-screen shrink-0 grid-cols-1 items-center gap-32 md:grid-cols-12"
                >
                  <div
                    className={`flex flex-col gap-24 ${
                      card.align === "right" ? "md:col-span-5 md:order-2" : "md:col-span-5"
                    }`}
                  >
                    <p className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.1em] text-foreground/60">
                      {card.eyebrow}
                    </p>
                    <h3
                      className="font-display text-balance text-foreground"
                      style={{
                        fontSize: "clamp(2.8rem, 5.2vw, 5.6rem)",
                        lineHeight: 0.95,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p className="max-w-[48rem] text-pretty font-body text-[1.4rem] font-medium leading-[1.45] text-foreground/80 md:text-[1.6rem]">
                      {card.body}
                    </p>
                    {card.ctaLabel ? (
                      <a
                        href={card.ctaHref}
                        className="pill pill-pink mt-12 inline-flex w-fit items-center gap-8"
                      >
                        <span>{card.ctaLabel}</span>
                        <ArrowRightIcon className="size-12" />
                      </a>
                    ) : null}
                  </div>

                <div
                  className={`img-zoom relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-cream md:col-span-7 ${
                    card.align === "right" ? "md:order-1" : ""
                  }`}
                >
                  {card.imageSrc ? (
                    <img src={card.imageSrc} alt={card.title} width={1080} height={810} loading="lazy" decoding="async" className="size-full object-cover" />
                  ) : card.videoSrc ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/images/parallax-9.jpg"
                      src={card.videoSrc}
                      className="size-full object-cover"
                    />
                  ) : null}
                </div>
                </div>
              ))}
            </div>

            <div className="shrink-0 pb-24">
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-foreground/10">
                <div
                  className="h-full bg-foreground"
                  style={{
                    width: `${progress * 100}%`,
                    transition: "width 0.1s linear",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-white py-80 text-foreground md:hidden">
        <div className="mx-auto flex w-full max-w-[64rem] flex-col gap-48 px-24">
          <Reveal>
            <div className="flex items-center gap-12 font-body text-[1.2rem] font-medium text-foreground/70">
              <span className="rounded-full border border-current/15 px-12 py-4">
                {data.eyebrow}
              </span>
            </div>
            <h2
              className="font-display text-balance text-foreground mt-16"
              style={{
                fontSize: "clamp(3.6rem, 9vw, 5.2rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
              }}
            >
              {data.mobileTitle}
            </h2>
          </Reveal>

          <div className="flex flex-col gap-48">
            {cards.map((card, i) => (
              <Reveal
                key={card.id}
                delay={((i + 1) as 1 | 2 | 3)}
                className="flex flex-col gap-16"
              >
                <div className="img-zoom relative aspect-[4/3] w-full overflow-hidden rounded-[1.6rem] bg-cream">
                  {card.imageSrc ? (
                    <img src={card.imageSrc} alt={card.title} width={1080} height={810} loading="lazy" decoding="async" className="size-full object-cover" />
                  ) : card.videoSrc ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/images/parallax-9.jpg"
                      src={card.videoSrc}
                      className="size-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex flex-col gap-12">
                  <p className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.1em] text-foreground/60">
                    {card.eyebrow}
                  </p>
                  <h3
                    className="font-display text-balance text-foreground"
                    style={{
                      fontSize: "clamp(2.4rem, 7vw, 3.6rem)",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-pretty font-body text-[1.4rem] font-medium leading-[1.45] text-foreground/80">
                    {card.body}
                  </p>
                  {card.ctaLabel ? (
                    <a
                      href={card.ctaHref}
                      className="pill pill-pink mt-8 inline-flex w-fit items-center gap-8"
                    >
                      <span>{card.ctaLabel}</span>
                      <ArrowRightIcon className="size-12" />
                    </a>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
