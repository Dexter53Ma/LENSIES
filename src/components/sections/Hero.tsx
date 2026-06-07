"use client";

import { useEffect, useRef } from "react";
import { ArrowDownIcon } from "@/components/icons";
import type { HeroData } from "@/i18n/types";

export interface HeroProps {
  data: HeroData;
}

type YTPlayer = {
  mute: () => void;
  unMute: () => void;
  playVideo: () => void;
  pauseVideo: () => void;
  destroy: () => void;
  setSize?: (w: number, h: number) => void;
};

type YTPlayerOptions = {
  videoId: string;
  playerVars?: Record<string, number | string>;
  events?: {
    onReady?: (event: { target: YTPlayer }) => void;
  };
};

type YTNs = {
  Player: new (
    el: HTMLElement | string,
    options: YTPlayerOptions,
  ) => YTPlayer;
};

declare global {
  interface Window {
    YT?: YTNs;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YOUTUBE_IFRAME_API_SRC = "https://www.youtube.com/iframe_api";
const SCRIPT_ID = "lensies-youtube-iframe-api";

let apiPromise: Promise<YTNs> | null = null;

function loadYouTubeApi(): Promise<YTNs> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("window is not available"));
  }
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<YTNs>((resolve) => {
    const w = window;
    const previous = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      previous?.();
      if (w.YT) resolve(w.YT);
    };
    if (w.YT?.Player) {
      resolve(w.YT);
      return;
    }
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = YOUTUBE_IFRAME_API_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
  });
  return apiPromise;
}

export default function Hero({ data }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pioneersRef = useRef<HTMLDivElement>(null);
  const playerHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || !pioneersRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (vh * 0.6)));
      const spans = pioneersRef.current.querySelectorAll<HTMLSpanElement>("[data-pioneer]");
      spans.forEach((span, i) => {
        const local = Math.max(0, Math.min(1, progress * 1.4 - i * 0.2));
        span.style.opacity = String(1 - local);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const host = playerHostRef.current;
    if (!host) return;
    let player: YTPlayer | null = null;
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !host.isConnected) return;
      player = new YT.Player(host, {
        videoId: data.youtubeId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: data.youtubeId,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          showinfo: 0,
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
          },
        },
      });
    });

    return () => {
      cancelled = true;
      try {
        player?.destroy();
      } catch {
        /* player may not have finished initializing */
      }
    };
  }, [data.youtubeId]);

  const scrollDown = () => {
    const next = sectionRef.current?.nextElementSibling as HTMLElement | null;
    next?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-foreground text-cream"
    >
      <div
        ref={playerHostRef}
        aria-hidden
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
          {data.pioneering.map((word) => (
            <span
              key={word}
              data-pioneer
              className="font-display text-cream"
              style={{
                fontSize: "clamp(2.4rem, 6.4vw, 6.4rem)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                transition: "opacity 0.4s var(--ease-snappy)",
              }}
            >
              {word}
            </span>
          ))}
        </div>

        <h1
          className="font-display text-balance text-cream"
          style={{
            fontSize: "clamp(4rem, 11vw, 15rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.045em",
          }}
        >
          {data.title}
        </h1>

        <div className="flex w-full flex-col items-start justify-between gap-24 md:flex-row md:items-end">
          <p className="max-w-full text-pretty font-body text-[1.4rem] font-medium leading-[1.45] text-cream/85 sm:max-w-[44rem] md:text-[1.6rem]">
            {data.body}
          </p>
          <button
            type="button"
            onClick={scrollDown}
            aria-label={data.scrollDownLabel}
            className="magnetic group flex shrink-0 items-center gap-12 self-start rounded-full border border-cream/30 px-20 py-12 text-cream transition-all duration-500 hover:scale-105 hover:border-pink hover:bg-pink hover:text-white md:self-end"
          >
            <span className="font-body text-[1.3rem] font-medium">{data.scrollDownLabel}</span>
            <ArrowDownIcon className="size-12 transition-transform duration-500 group-hover:translate-y-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
