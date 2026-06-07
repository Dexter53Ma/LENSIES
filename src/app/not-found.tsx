"use client";

import { Reveal } from "@/components/reveal";
import { ArrowUpRight } from "@/components/icons";
import { useT } from "@/i18n/provider";

export default function NotFound() {
  const t = useT();
  return (
    <main className="relative flex min-h-[80vh] w-full items-center justify-center bg-background">
      <Reveal className="mx-auto flex max-w-[80rem] flex-col items-center gap-24 px-24 py-120 text-center">
        <span className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.2em] text-foreground/55">
          404
        </span>
        <h1
          className="font-display text-balance text-foreground"
          style={{
            fontSize: "clamp(3.6rem, 8vw, 8.4rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
          }}
        >
          {t.notFound.title}
        </h1>
        <p className="max-w-[58rem] text-pretty font-body text-[1.5rem] font-medium leading-[1.5] text-foreground/75 md:text-[1.7rem]">
          {t.notFound.body}
        </p>
        <a
          href="/"
          className="group mt-16 inline-flex items-center gap-12 rounded-full bg-foreground px-32 py-16 font-body text-[1.4rem] font-semibold text-white transition-all duration-500 hover:scale-[1.02] hover:bg-pink"
        >
          {t.notFound.ctaLabel}
          <ArrowUpRight className="size-16 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
        </a>
      </Reveal>
    </main>
  );
}
