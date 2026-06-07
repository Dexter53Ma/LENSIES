"use client";

import { useRef, useState } from "react";
import { Check, Sparkles, Crown } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useT } from "@/i18n/provider";

type Tone = {
  card: string;
  price: string;
  desc: string;
  cta: string;
  bullet: string;
  border: string;
  hover: string;
  bgOrb?: string;
};

const TIER_TONE: Record<"default" | "dark" | "pink", Tone> = {
  default: {
    card: "bg-white",
    price: "text-foreground",
    desc: "text-foreground/70",
    cta: "border border-foreground/15 bg-white text-foreground hover:bg-foreground hover:text-white hover:border-foreground",
    bullet: "border-foreground/15 bg-white text-foreground",
    border: "border-foreground/10",
    hover: "hover:-translate-y-2 hover:shadow-[0_3rem_6rem_-2rem_oklab(0_0_0_/0.18)]",
  },
  dark: {
    card: "bg-foreground text-white",
    price: "text-white",
    desc: "text-white/75",
    cta: "bg-pink text-white hover:bg-white hover:text-foreground",
    bullet: "border-white/15 bg-foreground text-white",
    border: "border-transparent",
    hover: "hover:-translate-y-2 hover:shadow-[0_3rem_6rem_-2rem_oklab(0_0_0_/0.35)]",
    bgOrb: "oklab(0.66 0.23 -0.05 / 0.18)",
  },
  pink: {
    card: "bg-pink-soft",
    price: "text-foreground",
    desc: "text-foreground/75",
    cta: "bg-foreground text-white hover:bg-pink hover:text-white",
    bullet: "border-pink/30 bg-white text-pink",
    border: "border-pink/30",
    hover: "hover:-translate-y-2 hover:shadow-[0_3rem_6rem_-2rem_oklab(0.66_0.23_-0.05_/_0.35)]",
    bgOrb: "oklab(0.66 0.23 -0.05 / 0.22)",
  },
};

export default function Pricing() {
  const t = useT();
  const data = t.pricing.data;
  const tiers = data.tiers.map((tier) => ({
    ...tier,
    accent: tier.accent ?? "default",
  }));
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-background"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[60rem] rounded-full opacity-50 blur-3xl md:opacity-100"
        style={{ background: "radial-gradient(circle, oklab(0.66 0.23 -0.05 / 0.18), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 size-[55rem] rounded-full opacity-40 blur-3xl md:opacity-100"
        style={{ background: "radial-gradient(circle, oklab(0.85 0.05 0.05 / 0.25), transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-[123rem] px-24 pb-60 pt-80 sm:px-40 md:px-90 md:pb-80 md:pt-120">
        <Reveal className="flex max-w-[80rem] flex-col gap-16">
          <span className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.2em] text-foreground/60">
            {data.eyebrow}
          </span>
          <h2
            className="font-display text-balance text-foreground"
            style={{
              fontSize: "clamp(3.6rem, 8vw, 8.4rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
            }}
          >
            {data.title}
          </h2>
          <p className="max-w-full text-pretty font-body text-[1.4rem] font-medium leading-[1.45] text-foreground/75 sm:max-w-[58rem] md:text-[1.6rem]">
            {data.body}
          </p>
        </Reveal>
        {data.billingNote ? (
          <Reveal delay={1} className="mt-24 font-body text-[1.2rem] font-medium text-foreground/55 md:text-[1.3rem]">
            {data.billingNote}
          </Reveal>
        ) : null}
      </div>

      <div className="relative mx-auto w-full max-w-[140rem] px-24 pb-80 sm:px-40 md:px-60 md:pb-120">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-20">
          {tiers.map((tier, i) => {
            const tone = TIER_TONE[tier.accent];
            const isPopular = tier.badge === "popular";
            const isNew = tier.badge === "new";
            const spanClass = isPopular ? "lg:col-span-2 lg:row-span-1" : "";
            return (
              <Reveal
                key={tier.id}
                variant="rise"
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                className={`group relative flex flex-col overflow-hidden rounded-[2rem] border p-28 transition-all duration-500 md:p-36 ${tone.card} ${tone.border} ${tone.hover} ${spanClass}`}
              >
                <div
                  aria-hidden
                  className="absolute inset-0"
                  onMouseEnter={() => setHovered(tier.id)}
                  onMouseLeave={() => setHovered(null)}
                />
                {tone.bgOrb ? (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-32 -right-32 size-[28rem] rounded-full opacity-90 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle, ${tone.bgOrb}, transparent 70%)` }}
                  />
                ) : null}

                {tier.badge ? (
                  <div className="absolute top-24 right-24 z-10 md:top-32 md:right-32">
                    {isPopular ? (
                      <span className="inline-flex items-center gap-6 rounded-full bg-pink px-12 py-6 font-body text-[1.1rem] font-semibold uppercase tracking-[0.15em] text-white">
                        <Crown className="size-12" />
                        {data.popularLabel}
                      </span>
                    ) : isNew ? (
                      <span className="inline-flex items-center gap-6 rounded-full bg-foreground px-12 py-6 font-body text-[1.1rem] font-semibold uppercase tracking-[0.15em] text-pink">
                        <Sparkles className="size-12" />
                        {data.newLabel}
                      </span>
                    ) : null}
                  </div>
                ) : null}

                <div className="relative flex flex-1 flex-col">
                  <div className="flex flex-col gap-12">
                    <h3
                      className={`font-display text-balance ${tone.price} ${tier.badge ? "pr-44 md:pr-56" : ""}`}
                      style={{
                        fontSize: "clamp(1.8rem, 2.2vw, 2.6rem)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {tier.name}
                    </h3>
                    <p className={`max-w-[42rem] text-pretty font-body text-[1.3rem] font-medium leading-[1.45] md:text-[1.4rem] ${tone.desc}`}>
                      {tier.description}
                    </p>
                  </div>

                  <div className={`mt-32 flex items-end gap-8 ${tone.price} md:mt-40`}>
                    {tier.pricePrefix ? (
                      <span className="mb-12 font-body text-[1.4rem] font-medium uppercase tracking-[0.1em] opacity-60 md:text-[1.5rem]">
                        {tier.pricePrefix}
                      </span>
                    ) : null}
                    <span
                      className="font-display"
                      style={{
                        fontSize: "clamp(4.4rem, 6.4vw, 7.2rem)",
                        lineHeight: 0.9,
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {tier.price}
                    </span>
                    {tier.priceSuffix ? (
                      <span className="mb-12 font-body text-[1.5rem] font-semibold uppercase tracking-[0.1em] opacity-70 md:text-[1.7rem]">
                        {tier.priceSuffix}
                      </span>
                    ) : null}
                  </div>

                  <div className={`my-32 h-[1px] w-full ${isPopular ? "bg-white/15" : "bg-foreground/10"} md:my-40`} />

                  <ul className="flex flex-1 flex-col gap-12 md:gap-14">
                    {tier.features.map((f) => (
                      <li key={f.text} className="flex items-start gap-12">
                        <span
                          className={`mt-2 grid size-20 shrink-0 place-items-center rounded-full border ${tone.bullet} md:size-22`}
                        >
                          <Check className="size-12 md:size-13" strokeWidth={3} />
                        </span>
                        <span
                          className={`flex-1 font-body text-[1.3rem] leading-[1.4] md:text-[1.4rem] ${f.highlight ? "font-semibold" : "font-medium"} ${tone.desc}`}
                        >
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={tier.ctaHref}
                    className={`mt-32 inline-flex w-full items-center justify-center gap-10 rounded-full px-24 py-16 text-center font-body text-[1.3rem] font-semibold transition-all duration-500 md:mt-40 md:text-[1.4rem] ${tone.cta}`}
                    style={{
                      transform: hovered === tier.id ? "scale(1.02)" : "scale(1)",
                    }}
                  >
                    {tier.ctaLabel}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
