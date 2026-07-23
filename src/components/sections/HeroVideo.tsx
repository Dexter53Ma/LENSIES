"use client";

import { useEffect, useRef, useState } from "react";

export interface HeroVideoProps {
  videoSrc: string;
  className?: string;
}

export default function HeroVideo({ videoSrc, className }: HeroVideoProps) {
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
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src={videoSrc}
        className="pointer-events-none size-full object-cover"
      />
    </div>
  );
}
