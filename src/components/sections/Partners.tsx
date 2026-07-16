"use client";

import { useState, useEffect } from "react";
import {
  SiAirbnb,
  SiBookingdotcom,
  SiExpedia,
  SiTripadvisor,
  SiMarriott,
  SiHilton,
} from "react-icons/si";
import { ArrowRightIcon, ArrowLeftIcon } from "@/components/icons";
import { Star as StarIcon, Quote as QuoteIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { PartnersData, Testimonial } from "@/i18n/types";

const ICONS = {
  airbnb: SiAirbnb,
  booking: SiBookingdotcom,
  expedia: SiExpedia,
  tripadvisor: SiTripadvisor,
  marriott: SiMarriott,
  hilton: SiHilton,
} as const;

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "marrakech-living",
    company: "Marrakech Living",
    companyLogoKind: "text",
    companyTextLogo: "Marrakech Living",
    brandColor: "#7A4A2B",
    rating: 5,
    quote:
      "Lensies is the only studio we trust with our Marrakech listings. Twilight aerials, fast turnarounds — our agents specifically ask for them by name now.",
    authorName: "Sofia Bennani",
    authorTitle: "Director, Marrakech Living Real Estate",
    authorInitials: "SB",
    authorBg: "linear-gradient(135deg, #C58A5E 0%, #7A4A2B 100%)",
  },
  {
    id: "riads-du-sud",
    company: "Riads du Sud",
    companyLogoKind: "text",
    companyTextLogo: "Riads du Sud",
    brandColor: "#2F4A3A",
    rating: 5,
    quote:
      "They get riads. The light, the tile, the proportions. We've worked with bigger agencies — Lensies still wins the brief.",
    authorName: "Karim Tazi",
    authorTitle: "Founder, Riads du Sud",
    authorInitials: "KT",
    authorBg: "linear-gradient(135deg, #4A6E55 0%, #2F4A3A 100%)",
  },
  {
    id: "atlas-hotels",
    company: "Atlas Hotels",
    companyLogoKind: "text",
    companyTextLogo: "Atlas Hotels",
    brandColor: "#1F2A44",
    rating: 5,
    quote:
      "Brand films, drone, social cuts — one studio, one invoice, one deadline. They quietly became our default for every property launch.",
    authorName: "Lina Ouazzani",
    authorTitle: "Head of Marketing, Atlas Hotels",
    authorInitials: "LO",
    authorBg: "linear-gradient(135deg, #3B4D78 0%, #1F2A44 100%)",
  },
  {
    id: "sahara-experiences",
    company: "Sahara Experiences",
    companyLogoKind: "text",
    companyTextLogo: "Sahara",
    brandColor: "#A4551B",
    rating: 5,
    quote:
      "Tours, balloon, desert camps. Lensies shoots it all in a way that feels like the actual day, not a brochure. Our conversion rate doubled.",
    authorName: "Youssef El Fassi",
    authorTitle: "Co-founder, Sahara Experiences",
    authorInitials: "YF",
    authorBg: "linear-gradient(135deg, #D8843A 0%, #A4551B 100%)",
  },
  {
    id: "royal-mansour",
    company: "Royal Mansour",
    companyLogoKind: "text",
    companyTextLogo: "Royal Mansour",
    brandColor: "#8C7331",
    rating: 5,
    quote:
      "Discretion, craft, and a real understanding of heritage architecture. They are the only studio we onboard for private residence work.",
    authorName: "Hind Alaoui",
    authorTitle: "Residences Marketing Lead",
    authorInitials: "HA",
    authorBg: "linear-gradient(135deg, #C8A24A 0%, #8C7331 100%)",
  },
];

export interface PartnersProps {
  data: PartnersData;
}

export default function Partners({ data }: PartnersProps) {
  const testimonials = data.testimonials ?? DEFAULT_TESTIMONIALS;
  const previousLabel = data.previousLabel ?? "Previous testimonial";
  const nextLabel = data.nextLabel ?? "Next testimonial";
  const [active, setActive] = useState(0);
  const featured = testimonials[active];

  useEffect(() => {
    if (testimonials.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(id);
  }, [testimonials]);

  const go = (delta: number) => {
    setActive((i) => (i + delta + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-background py-[var(--padding-y)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[55rem] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklab(0.66 0.23 -0.05 / 0.15), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[140rem] flex-col gap-60 px-24 md:px-90">
        <div className="flex flex-col gap-24 md:flex-row md:items-end md:justify-between">
          <Reveal as="div" className="flex max-w-[60rem] flex-col gap-16">
            <span className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.2em] text-foreground/60">
              {data.eyebrow}
            </span>
            <h2
              className="font-display text-balance text-foreground"
              style={{
                fontSize: "clamp(3.6rem, 7vw, 7.2rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
              }}
            >
              {data.heading}
            </h2>
          </Reveal>
          <Reveal as="p" delay={1} className="text-pretty font-body text-[1.4rem] font-medium leading-[1.4] text-foreground/80 md:max-w-[40rem] md:text-[1.6rem]">
            {data.intro}
          </Reveal>
        </div>

        <Reveal as="div" className="flex flex-col gap-20">
          <span className="font-body text-[1.1rem] font-semibold uppercase tracking-[0.18em] text-foreground/45">
            {data.trustedByLabel}
          </span>
          <div className="grid grid-cols-3 items-center gap-x-32 gap-y-32 border-y border-foreground/10 py-32 sm:grid-cols-4 md:grid-cols-7 md:gap-x-24 md:py-40">
            <Reveal delay={0}><LogoItem Icon={SiAirbnb} name="Airbnb" color="#FF5A5F" /></Reveal>
            <Reveal delay={1}><LogoItem Icon={SiBookingdotcom} name="Booking.com" color="#003580" /></Reveal>
            <Reveal delay={2}><LogoItem Icon={SiExpedia} name="Expedia" color="#FFD000" /></Reveal>
            <Reveal delay={3}><LogoItem Icon={SiTripadvisor} name="Tripadvisor" color="#00AF87" /></Reveal>
            <Reveal delay={4}><LogoItem Icon={SiMarriott} name="Marriott" color="#A60F2D" /></Reveal>
            <Reveal delay={5}><LogoItem Icon={SiHilton} name="Hilton" color="#0F4D92" /></Reveal>
            <Reveal delay={6}><TextLogoItem name="Sahara" /></Reveal>
          </div>
        </Reveal>

        {testimonials.length > 0 ? (
          <Reveal as="div" className="grid grid-cols-1 gap-32 md:grid-cols-12 md:gap-48">
            <div className="md:col-span-7">
              <div
                key={featured.id}
                className="relative flex h-full flex-col justify-between gap-40 rounded-[2.4rem] bg-foreground p-32 text-cream md:p-60"
                style={{ animation: "reveal-fade 0.6s var(--ease-snappy)" }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-20 size-[24rem] rounded-full opacity-30 blur-2xl"
                  style={{ background: featured.brandColor ?? "oklab(0.66 0.23 -0.05 / 0.6)" }}
                />

                <div className="flex items-start justify-between gap-24">
                  <QuoteIcon className="size-48 text-pink md:size-64" />
                  <Stars rating={featured.rating} />
                </div>

                <p
                  className="text-pretty font-display text-cream"
                  style={{
                    fontSize: "clamp(2rem, 3.2vw, 3.4rem)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.025em",
                  }}
                >
                  &ldquo;{featured.quote}&rdquo;
                </p>

                <div className="flex flex-col gap-24 border-t border-cream/15 pt-24 md:flex-row md:items-end md:justify-between md:pt-32">
                  <div className="flex items-center gap-16">
                    <span
                      className="grid size-56 shrink-0 place-items-center rounded-full font-display text-[1.8rem] text-white shadow-lg"
                      style={{ background: featured.authorBg }}
                    >
                      {featured.authorInitials}
                    </span>
                    <div className="flex flex-col gap-2">
                      <span className="font-body text-[1.4rem] font-semibold text-cream md:text-[1.5rem]">
                        {featured.authorName}
                      </span>
                      <span className="font-body text-[1.2rem] font-medium text-cream/65 md:text-[1.3rem]">
                        {featured.authorTitle}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 rounded-full border border-cream/15 bg-cream/5 px-20 py-10">
                    <CompanyMark
                      kind={featured.companyLogoKind}
                      icon={featured.companyIcon}
                      text={featured.companyTextLogo}
                      color={featured.brandColor}
                      dark
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-32 md:col-span-5">
              <div className="flex items-start gap-12 font-mono text-[1.2rem] uppercase tracking-[0.15em] text-foreground/50">
                <span className="text-foreground">{String(active + 1).padStart(2, "0")}</span>
                <span aria-hidden>/</span>
                <span>{String(testimonials.length).padStart(2, "0")}</span>
              </div>

              <div className="flex flex-col gap-12">
                {testimonials.map((t, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActive(i)}
                      className="group flex items-center justify-between gap-16 border-b border-foreground/10 py-16 text-left transition-colors last:border-b-0 hover:border-foreground/30"
                    >
                      <span className="flex items-center gap-16">
                        <span
                          className="grid size-36 shrink-0 place-items-center rounded-full font-body text-[1.2rem] font-semibold text-white"
                          style={{ background: t.authorBg, opacity: isActive ? 1 : 0.6 }}
                        >
                          {t.authorInitials}
                        </span>
                        <span className="flex flex-col gap-2">
                          <span
                            className="font-body text-[1.4rem] font-semibold transition-colors"
                            style={{ color: isActive ? "var(--color-foreground)" : "oklab(0 0 0 / 0.55)" }}
                          >
                            {t.authorName}
                          </span>
                          <span className="font-body text-[1.1rem] font-medium uppercase tracking-[0.1em] text-foreground/40">
                            {t.company}
                          </span>
                        </span>
                      </span>
                      <ArrowRightIcon
                        className="size-18 shrink-0 text-foreground/30 transition-all duration-500 group-hover:translate-x-4 group-hover:text-foreground"
                        style={{ opacity: isActive ? 1 : 0.4 }}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="mt-auto flex items-center gap-12">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={previousLabel}
                  className="grid size-50 place-items-center rounded-full border border-foreground/15 text-foreground transition-all duration-300 hover:scale-110 hover:border-pink hover:bg-pink hover:text-white"
                >
                  <ArrowLeftIcon className="size-18" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={nextLabel}
                  className="grid size-50 place-items-center rounded-full border border-foreground/15 text-foreground transition-all duration-300 hover:scale-110 hover:border-pink hover:bg-pink hover:text-white"
                >
                  <ArrowRightIcon className="size-18" />
                </button>
                <a
                  href="/contact"
                  className="ml-8 inline-flex items-center gap-8 self-end rounded-full bg-foreground px-20 py-12 font-body text-[1.2rem] font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-pink md:ml-16"
                >
                  <span>{data.becomePartnerLabel}</span>
                  <ArrowRightIcon className="size-14" />
                </a>
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function LogoItem({
  Icon,
  name,
  color,
}: {
  Icon: typeof SiAirbnb;
  name: string;
  color: string;
}) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="group flex items-center justify-center gap-10 text-foreground/35 transition-colors duration-300 hover:text-foreground"
      style={{ ["--brand" as string]: color }}
      aria-label={name}
    >
      <Icon
        className="size-32 transition-all duration-300 group-hover:[color:var(--brand)] md:size-40"
        aria-hidden
      />
      <span className="hidden font-body text-[1.3rem] font-semibold transition-colors group-hover:text-foreground sm:inline md:text-[1.5rem]">
        {name}
      </span>
    </a>
  );
}

function TextLogoItem({ name }: { name: string }) {
  return (
    <span className="flex items-center justify-center font-display text-[1.6rem] font-semibold uppercase tracking-[0.12em] text-foreground/35 transition-colors hover:text-foreground md:text-[1.9rem]">
      {name}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-4" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className="size-20"
          style={{
            color: i < rating ? "var(--color-pink)" : "oklab(1 0 0 / 0.25)",
            fill: i < rating ? "var(--color-pink)" : "oklab(1 0 0 / 0.25)",
          }}
        />
      ))}
    </div>
  );
}

function CompanyMark({
  kind,
  icon,
  text,
  color,
  dark = false,
}: {
  kind: "icon" | "text";
  icon?: Testimonial["companyIcon"];
  text?: string;
  color?: string;
  dark?: boolean;
}) {
  if (kind === "icon" && icon) {
    const Icon = ICONS[icon];
    return (
      <span className="flex items-center gap-10">
        <Icon
          className="size-26"
          style={{ color: dark ? "white" : color ?? "currentColor" }}
          aria-hidden
        />
        <span
          className="font-body text-[1.3rem] font-semibold capitalize"
          style={{ color: dark ? "white" : "currentColor" }}
        >
          {text ?? icon}
        </span>
      </span>
    );
  }
  return (
    <span
      className="font-display text-[1.6rem] font-semibold tracking-tight"
      style={{ color: dark ? "white" : "currentColor" }}
    >
      {text}
    </span>
  );
}
