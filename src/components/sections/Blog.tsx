"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { useT } from "@/i18n/provider";
import type { BlogPost as BlogPostCard } from "@/i18n/types";

function toCardPost(p: BlogPostCard) {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    readTime: p.readTime,
    tags: p.tags,
    image: p.heroImage,
    author: { name: p.author.name, role: p.author.role },
  };
}

export default function Blog() {
  const t = useT();
  const { featuredLabel, noPostsLabel, ...blogData } = t.blog.data;
  const posts = useMemo(() => blogData.posts.map(toCardPost), [blogData.posts]);

  const [activeTag, setActiveTag] = useState<string>("All");

  const tags = useMemo(
    () => ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags)))],
    [posts]
  );

  const visible = useMemo(
    () =>
      activeTag === "All"
        ? posts
        : posts.filter((p) => p.tags.includes(activeTag)),
    [activeTag, posts]
  );

  const [featured, ...rest] = visible;

  return (
    <section className="relative w-full bg-background">
      <div className="mx-auto w-full max-w-[123rem] px-24 pb-40 pt-80 sm:px-40 md:px-90 md:pb-60 md:pt-120">
        <Reveal className="flex max-w-[80rem] flex-col gap-16">
          <span className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.2em] text-foreground/60">
            {blogData.eyebrow}
          </span>
          <h1
            className="font-display text-balance text-foreground"
            style={{
              fontSize: "clamp(3.6rem, 8vw, 8.4rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
            }}
          >
            {blogData.title}
          </h1>
          <p className="max-w-full text-pretty font-body text-[1.4rem] font-medium leading-[1.45] text-foreground/75 sm:max-w-[58rem] md:text-[1.7rem]">
            {blogData.body}
          </p>
        </Reveal>

        <Reveal delay={1} className="mt-32 flex flex-wrap gap-8 md:mt-40">
          {tags.map((tag) => {
            const isActive = tag === activeTag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className="rounded-full border px-16 py-8 font-body text-[1.2rem] font-medium transition-all duration-300 md:text-[1.3rem]"
                style={{
                  borderColor: isActive ? "var(--color-pink)" : "oklab(0 0 0 / 0.15)",
                  backgroundColor: isActive ? "var(--color-pink)" : "transparent",
                  color: isActive ? "white" : "inherit",
                }}
              >
                {tag}
              </button>
            );
          })}
        </Reveal>
      </div>

      <div className="mx-auto w-full max-w-[140rem] px-24 pb-80 sm:px-40 md:px-60 md:pb-120">
        {featured ? (
          <Reveal variant="scale" className="mb-32 md:mb-48">
            <a
              href={`/blog/${featured.slug}`}
              className="hover-zoom group block overflow-hidden rounded-[2rem] border border-foreground/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="img-zoom relative aspect-[4/3] overflow-hidden md:aspect-auto md:h-full">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    decoding="async"
                    fetchPriority="high"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center gap-24 bg-cream-light p-32 md:p-60">
                  <div className="flex flex-wrap items-center gap-8 font-body text-[1.1rem] font-semibold uppercase tracking-[0.15em]">
                    <span className="rounded-full bg-pink px-12 py-4 text-white">
                      {featuredLabel}
                    </span>
                    {featured.tags.map((tag) => (
                      <span key={tag} className="text-foreground/55">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2
                    className="font-display text-balance text-foreground"
                    style={{
                      fontSize: "clamp(2.4rem, 4vw, 4.4rem)",
                      lineHeight: 1.02,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p className="max-w-[48rem] text-pretty font-body text-[1.4rem] font-medium leading-[1.5] text-foreground/75 md:text-[1.5rem]">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between gap-16">
                    <div className="flex flex-col gap-2">
                      <span className="font-body text-[1.3rem] font-semibold text-foreground">
                        {featured.author.name}
                      </span>
                      <span className="font-body text-[1.2rem] text-foreground/55">
                        {featured.author.role} · {featured.date} · {featured.readTime}
                      </span>
                    </div>
                    <span className="grid size-48 place-items-center rounded-full border border-foreground/15 text-foreground transition-all duration-500 group-hover:scale-110 group-hover:border-pink group-hover:bg-pink group-hover:text-white md:size-56">
                      <ArrowUpRight className="size-16 md:size-20" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>
        ) : null}

        {rest.length > 0 ? (
          <div className="grid grid-cols-1 gap-24 sm:grid-cols-2 lg:grid-cols-3 lg:gap-32">
            {rest.map((post, i) => (
              <Reveal
                key={post.slug}
                variant="rise"
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              >
                <a
                  href={`/blog/${post.slug}`}
                  className="hover-zoom group flex h-full flex-col gap-20 overflow-hidden rounded-[1.6rem] border border-foreground/10 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_3rem_6rem_-2rem_oklab(0_0_0_/0.15)]"
                >
                  <div className="img-zoom relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-16 p-24 md:p-32">
                    <div className="flex flex-wrap items-center gap-8 font-body text-[1.1rem] font-semibold uppercase tracking-[0.12em]">
                      {post.tags.slice(0, 2).map((tag) => (
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
                      {post.title}
                    </h3>
                    <p className="line-clamp-3 text-pretty font-body text-[1.3rem] font-medium leading-[1.45] text-foreground/65">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-foreground/10 pt-16 font-body text-[1.2rem] text-foreground/55">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        ) : null}

        {visible.length === 0 ? (
          <p className="py-80 text-center font-body text-[1.4rem] text-foreground/60">
            {noPostsLabel}
          </p>
        ) : null}
      </div>
    </section>
  );
}
