"use client";

import { useEffect, useRef, useState } from "react";

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

  if (!shouldLoad) {
    return <div ref={hostRef} aria-hidden className={className} />;
  }

  return (
    <div ref={hostRef} aria-hidden className={className}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&showinfo=0`}
        allow="autoplay; encrypted-media"
        className="pointer-events-none size-full object-cover"
        style={{ border: 0 }}
      />
    </div>
  );
}
