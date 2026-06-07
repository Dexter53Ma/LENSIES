"use client";

import { useEffect, useRef, useState } from "react";

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
  apiPromise = new Promise((resolve) => {
    const w = window;
    const previous = w.onYouTubeIframeAPIReady;
    let settled = false;
    const done = (yt: YTNs | undefined) => {
      if (settled || !yt) return;
      settled = true;
      resolve(yt);
    };
    w.onYouTubeIframeAPIReady = () => {
      previous?.();
      done(w.YT);
    };
    if (w.YT?.Player) {
      done(w.YT);
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

export interface HeroVideoProps {
  videoId: string;
  className?: string;
}

export default function HeroVideo({ videoId, className }: HeroVideoProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShouldLoad(false);
      return;
    }
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShouldLoad(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !shouldLoad) return;
    let player: YTPlayer | null = null;
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !host.isConnected) return;
      player = new YT.Player(host, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: videoId,
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
  }, [shouldLoad, videoId]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={className}
    />
  );
}
