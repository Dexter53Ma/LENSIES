"use client";

import { useRef } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { useSharedScroll } from "@/components/use-shared-scroll";
import type { SafetyHeroData } from "@/i18n/types";

export interface SafetyHeroProps {
  data: SafetyHeroData;
}

const DEFAULT_VIDEO = "/videos/light-tunnel.mp4";

export default function SafetyHero({ data }: SafetyHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = data.videoSrc ?? DEFAULT_VIDEO;

  useSharedScroll(() => {
    const sec = sectionRef.current;
    const video = videoRef.current;
    if (!sec || !video) return;
    const rect = sec.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrolled = -rect.top;
    if (scrolled > -200 && scrolled < vh + rect.height) {
      const scale = 1 + Math.min(0.08, Math.max(0, scrolled / vh) * 0.08);
      video.style.transform = `scale(${scale})`;
    }
  });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[80vh] w-full flex-col items-start justify-end overflow-hidden px-24 py-80 text-white md:min-h-screen md:px-90 md:py-120"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/parallax-11.jpg"
        src={videoSrc}
        className="absolute inset-0 size-full object-cover"
        style={{ willChange: "transform", transition: "transform 0.4s linear" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(oklab(0 0 0 / 0.65) 0%, oklab(0 0 0 / 0.2) 50%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative z-10 flex max-w-[80rem] flex-col items-start gap-24">
        <Reveal>
          <h2
            className="font-display text-balance text-white"
            style={{
              fontSize: "clamp(3.6rem, 7.2vw, 7.2rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
            }}
          >
            {data.heading}
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="max-w-[48rem] text-pretty font-body text-[1.4rem] font-medium leading-[1.4] text-white/85 md:text-[1.6rem]">
            {data.body}
          </p>
        </Reveal>
        <Reveal delay={2}>
          <a href={data.ctaHref} className="pill pill-pink mt-12 inline-flex items-center gap-8">
            <span>{data.ctaLabel}</span>
            <ArrowRightIcon className="size-12" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
