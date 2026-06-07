"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useT } from "@/i18n/provider";

export default function BackToTop() {
  const t = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label={t.backToTop.label}
      onClick={handleClick}
      className="group fixed bottom-24 left-24 z-[450] grid size-48 place-items-center rounded-full border border-foreground/10 bg-white/90 text-foreground shadow-[0_1.5rem_4rem_-1.5rem_oklab(0_0_0_/0.25)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:border-pink hover:bg-pink hover:text-white md:bottom-32 md:left-32 md:size-56"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? "0" : "1.5rem"}) scale(${visible ? 1 : 0.85})`,
        pointerEvents: visible ? "auto" : "none",
        transition:
          "opacity 0.4s var(--ease-snappy), transform 0.4s var(--ease-snappy), background-color 0.3s var(--ease-snappy), color 0.3s var(--ease-snappy), border-color 0.3s var(--ease-snappy)",
      }}
    >
      <ArrowUp className="size-18 transition-transform duration-500 group-hover:-translate-y-2 md:size-22" />
    </button>
  );
}
