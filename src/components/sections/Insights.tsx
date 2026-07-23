"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { useT } from "@/i18n/provider";

export default function Insights() {
  const t = useT();
  const data = t.home.insights;
  const posts = t.blog.data.posts;
  const articles = posts.map((p) => ({
    title: p.title,
    date: p.date,
    tags: p.tags,
    image: p.heroImage,
    href: `/blog/${p.slug}`,
  }));
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("article") as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : 400;
    rail.scrollBy({ left: step * dir * 1.5, behavior: "smooth" });
  };

  return (
    <section className="relative flex w-full flex-col gap-40 overflow-hidden bg-cream py-[var(--padding-y)]">
      <div className="mx-auto flex w-full max-w-[123rem] flex-col gap-32 px-24 md:px-90">
        <div className="flex flex-col gap-24 md:flex-row md:items-start md:justify-between">
          <Reveal className="flex flex-col gap-16">
            <span className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.2em] text-foreground/60">
              {data.eyebrow}
            </span>
            <h2
              className="font-display text-foreground"
              style={{
                fontSize: "clamp(3.6rem, 7.2vw, 7.2rem)",
                lineHeight: 0.85,
                letterSpacing: "-0.04em",
              }}
            >
              {data.heading}
            </h2>
            <p className="max-w-[55rem] text-pretty font-body text-[1.4rem] font-medium leading-[1.4] text-foreground/80 md:text-[1.6rem]">
              {data.intro}
            </p>
          </Reveal>
          <Reveal delay={1} className="flex items-center gap-12">
            <a href="/blog" className="pill pill-pink inline-flex items-center gap-8">
              <span>{data.viewAllLabel}</span>
            </a>
            <button
              type="button"
              aria-label={data.previousLabel}
              onClick={() => scroll(-1)}
              className="grid size-40 place-items-center rounded-full border border-current/15 transition-all duration-300 hover:scale-110 hover:bg-pink hover:border-transparent hover:text-white md:size-50"
            >
              <ArrowLeftIcon className="size-12" />
            </button>
            <button
              type="button"
              aria-label={data.nextLabel}
              onClick={() => scroll(1)}
              className="grid size-40 place-items-center rounded-full border border-current/15 transition-all duration-300 hover:scale-110 hover:bg-pink hover:border-transparent hover:text-white md:size-50"
            >
              <ArrowRightIcon className="size-12" />
            </button>
          </Reveal>
        </div>

        <div
          ref={railRef}
          className="scrollbar-hide -mx-24 flex snap-x snap-mandatory gap-24 overflow-x-auto px-24 pb-12 md:-mx-90 md:px-90"
          style={{ scrollbarWidth: "none" }}
        >
          {articles.map((a, i) => (
            <Reveal
              key={a.href}
              as="a"
              variant="rise"
              delay={(i > 8 ? 8 : i) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}
              href={a.href}
              className="hover-zoom group flex w-[20rem] shrink-0 snap-start flex-col gap-20 sm:w-[24rem] md:w-[36rem]"
            >
              <div className="img-zoom relative aspect-[4/3] w-full overflow-hidden rounded-[1.2rem] bg-cream">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 360px"
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-700"
                />
              </div>
              <article className="flex flex-col gap-12">
                <div className="flex flex-wrap items-center gap-12 font-body text-[1.2rem] font-medium text-foreground/70">
                  {a.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-current/15 px-12 py-4 transition-colors group-hover:border-pink group-hover:text-pink"
                    >
                      {tag}
                    </span>
                  ))}
                  <span>{a.date}</span>
                </div>
                <h3
                  className="font-display text-balance text-foreground"
                  style={{
                    fontSize: "clamp(1.6rem, 2.4vw, 2.4rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {a.title}
                </h3>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
