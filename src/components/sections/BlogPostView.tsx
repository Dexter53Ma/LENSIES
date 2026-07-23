"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeftIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { useT } from "@/i18n/provider";
import type { BlogPost } from "@/i18n/types";

interface BlogPostViewProps {
  post: BlogPost;
  related: BlogPost[];
}

export default function BlogPostView({ post, related }: BlogPostViewProps) {
  const t = useT();
  const labels = t.blogPost;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [post.slug]);

  const shareUrl = `https://lensies.ma/blog/${post.slug}`;

  return (
    <article className="relative w-full bg-background">
      <div
        aria-hidden
        className="fixed top-0 left-0 z-[600] h-3 origin-left bg-pink"
        style={{
          transform: `scaleX(${progress})`,
          transition: "transform 0.1s linear",
          width: "100%",
        }}
      />

      <header className="relative w-full overflow-hidden">
        <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
          <AnimatePresence mode="wait">
            <motion.img
              key={post.heroImage}
              src={post.heroImage}
              alt={post.title}
              width={1920}
              height={823}
              decoding="async"
              fetchPriority="high"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="size-full object-cover"
            />
          </AnimatePresence>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, oklab(0 0 0 / 0.25) 0%, oklab(0 0 0 / 0) 30%, oklab(0 0 0 / 0) 60%, oklab(0 0 0 / 0.7) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 px-24 pb-40 sm:px-40 md:px-90 md:pb-60">
            <div className="mx-auto w-full max-w-[123rem]">
              <Reveal>
                <a
                  href="/blog"
                  className="group inline-flex items-center gap-8 font-body text-[1.2rem] font-semibold uppercase tracking-[0.15em] text-cream/80 transition-colors hover:text-cream"
                >
                  <ArrowLeftIcon className="h-12 w-12 transition-transform duration-300 group-hover:-translate-x-2" />
                  {labels.backToAllLabel}
                </a>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[80rem] px-24 pb-40 pt-60 sm:px-40 md:px-0 md:pb-60 md:pt-100">
          <Reveal className="flex flex-col gap-20">
            <div className="flex flex-wrap items-center gap-12 font-body text-[1.2rem] font-semibold uppercase tracking-[0.18em]">
              <span className="rounded-full bg-pink px-14 py-6 text-white">
                {post.category}
              </span>
              {post.tags
                .filter((tag) => tag !== post.category)
                .map((tag) => (
                  <span key={tag} className="text-foreground/55">
                    {tag}
                  </span>
                ))}
            </div>

            <h1
              className="font-display text-balance text-foreground"
              style={{
                fontSize: "clamp(3rem, 6.5vw, 7.2rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              {post.title}
            </h1>

            <p className="max-w-full text-pretty font-body text-[1.5rem] font-medium leading-[1.5] text-foreground/75 sm:max-w-[68rem] md:text-[1.8rem]">
              {post.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-16 border-t border-foreground/10 pt-20">
              <div className="flex items-center gap-16">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={56}
                  height={56}
                  decoding="async"
                  className="size-56 rounded-full object-cover"
                  sizes="56px"
                />
                <div className="flex flex-col gap-2">
                  <span className="font-body text-[1.4rem] font-semibold text-foreground">
                    {post.author.name}
                  </span>
                  <span className="font-body text-[1.2rem] text-foreground/55">
                    {post.author.role}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-20 font-body text-[1.2rem] text-foreground/55">
                <span>{post.date}</span>
                <span className="hidden h-3 w-3 rounded-full bg-foreground/15 sm:block" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[80rem] px-24 pb-80 sm:px-40 md:px-0 md:pb-120">
        <Reveal>
          <p className="text-pretty font-body text-[1.6rem] font-medium leading-[1.6] text-foreground/85 md:text-[1.8rem]">
            {post.intro}
          </p>
        </Reveal>

        <div className="mt-60 flex flex-col gap-60 md:mt-80 md:gap-80">
          {post.sections.map((section, i) => (
            <Reveal key={i} variant="rise" delay={(((i % 3) + 1) as 1 | 2 | 3)}>
              {section.heading ? (
                <h2
                  className="mb-24 font-display text-balance text-foreground"
                  style={{
                    fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {section.heading}
                </h2>
              ) : null}

              {section.body ? (
                <p className="mb-32 text-pretty font-body text-[1.5rem] font-medium leading-[1.65] text-foreground/80 md:text-[1.6rem]">
                  {section.body}
                </p>
              ) : null}

              {section.image ? (
                <figure className="my-32 overflow-hidden rounded-[1.6rem]">
                  <Image
                    src={section.image}
                    alt={section.imageCaption ?? ""}
                    width={960}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="aspect-[3/2] w-full object-cover"
                  />
                  {section.imageCaption ? (
                    <figcaption className="mt-12 font-body text-[1.2rem] italic text-foreground/55">
                      {section.imageCaption}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}

              {section.list ? (
                <ul className="my-24 flex flex-col gap-12 rounded-[1.2rem] border border-foreground/10 bg-cream-light/40 p-24 md:p-32">
                  {section.list.map((item, j) => (
                    <li
                      key={j}
                      className="flex gap-16 font-body text-[1.4rem] font-medium leading-[1.55] text-foreground/80 md:text-[1.5rem]"
                    >
                      <span className="font-mono text-[1.2rem] text-pink">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.pullquote ? (
                <blockquote
                  className="my-32 border-l-4 border-pink pl-24 font-display text-foreground md:pl-40"
                  style={{
                    fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                  }}
                >
                  &ldquo;{section.pullquote}&rdquo;
                </blockquote>
              ) : null}
            </Reveal>
          ))}
        </div>

        <Reveal variant="rise" className="mt-60 md:mt-80">
          <p className="text-pretty font-body text-[1.5rem] font-medium leading-[1.65] text-foreground/80 md:text-[1.6rem]">
            {post.outro}
          </p>
        </Reveal>

        <Reveal className="mt-60 flex flex-col items-start justify-between gap-24 border-t border-foreground/10 pt-32 sm:flex-row sm:items-center md:mt-80">
          <div className="flex flex-col gap-8">
            <span className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.18em] text-foreground/55">
              {labels.shareLabel}
            </span>
            <div className="flex items-center gap-8">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-foreground/15 px-16 py-8 font-body text-[1.2rem] font-medium transition-all duration-300 hover:border-pink hover:bg-pink hover:text-white"
              >
                {labels.shareOnXLabel}
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-foreground/15 px-16 py-8 font-body text-[1.2rem] font-medium transition-all duration-300 hover:border-pink hover:bg-pink hover:text-white"
              >
                {labels.shareOnLinkedInLabel}
              </a>
              <button
                type="button"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(shareUrl);
                  }
                }}
                className="rounded-full border border-foreground/15 px-16 py-8 font-body text-[1.2rem] font-medium transition-all duration-300 hover:border-pink hover:bg-pink hover:text-white"
              >
                {labels.copyLinkLabel}
              </button>
            </div>
          </div>

          <a
            href="/contact"
            className="group inline-flex items-center gap-12 rounded-full bg-foreground px-20 py-14 text-white transition-all duration-500 hover:bg-pink"
          >
            <span className="font-body text-[1.2rem] font-semibold">
              {labels.bookSessionLabel}
            </span>
            <ArrowUpRight className="h-14 w-14 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
          </a>
        </Reveal>
      </div>

      {related.length > 0 ? (
        <section className="border-t border-foreground/10 bg-cream-light/30 py-80 md:py-120">
          <div className="mx-auto w-full max-w-[123rem] px-24 sm:px-40 md:px-90">
            <Reveal className="mb-40 flex items-end justify-between gap-16 md:mb-60">
              <h2
                className="font-display text-balance text-foreground"
                style={{
                  fontSize: "clamp(2.4rem, 5vw, 4.8rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.035em",
                }}
              >
                {labels.relatedHeading}
              </h2>
              <a
                href="/blog"
                className="group hidden items-center gap-8 font-body text-[1.3rem] font-semibold md:inline-flex"
              >
                <span className="link-underline">{labels.allPostsLabel}</span>
                <ArrowUpRight className="h-14 w-14 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2" />
              </a>
            </Reveal>

            <div className="grid grid-cols-1 gap-24 sm:grid-cols-2 lg:grid-cols-3 lg:gap-32">
              {related.map((p, i) => (
                <Reveal
                  key={p.slug}
                  variant="rise"
                  delay={(((i % 3) + 1) as 1 | 2 | 3)}
                >
                  <a
                    href={`/blog/${p.slug}`}
                    className="hover-zoom group flex h-full flex-col gap-20 overflow-hidden rounded-[1.6rem] border border-foreground/10 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_3rem_6rem_-2rem_oklab(0_0_0_/0.15)]"
                  >
                    <div className="img-zoom relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={p.heroImage}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-16 p-24 md:p-32">
                      <div className="flex flex-wrap items-center gap-8 font-body text-[1.1rem] font-semibold uppercase tracking-[0.12em]">
                        {p.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-foreground/15 px-10 py-3 text-foreground/65 transition-colors group-hover:border-pink group-hover:text-pink"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3
                        className="font-display text-balance text-foreground"
                        style={{
                          fontSize: "clamp(1.8rem, 2.2vw, 2.2rem)",
                          lineHeight: 1.1,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {p.title}
                      </h3>
                      <p className="line-clamp-3 text-pretty font-body text-[1.3rem] font-medium leading-[1.45] text-foreground/65">
                        {p.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between border-t border-foreground/10 pt-16 font-body text-[1.2rem] text-foreground/55">
                        <span>{p.date}</span>
                        <span>{p.readTime}</span>
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
