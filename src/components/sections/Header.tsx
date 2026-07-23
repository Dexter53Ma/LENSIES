"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MenuIcon, CloseIcon, ArrowUpRight } from "@/components/icons";
import { CalendarIcon } from "@/components/icons-extended";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import BookingModal from "@/components/BookingModal";
import { useT } from "@/i18n/provider";
import { useSharedScroll } from "@/components/use-shared-scroll";

export default function Header() {
  const t = useT();
  const NAV = t.nav.items;
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setProgress(1), 200);
    return () => clearTimeout(id);
  }, []);

  useSharedScroll(() => {
    const y = window.scrollY;
    setScrolled((prev) => (prev !== (y > 24) ? y > 24 : prev));
    setHidden((prev) => {
      const next = y > (window.__lastHeaderY ?? y) && y > 200;
      window.__lastHeaderY = y;
      return next;
    });
  });

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <>
      <header
        className="page-enter page-enter-2 fixed inset-x-0 top-24 z-[500] mx-auto flex w-[min(100rem,calc(100vw-3rem))] flex-col items-center justify-center gap-10 transition-transform duration-500 sm:top-34 sm:w-[min(100rem,calc(100vw-4rem))]"
        style={{
          transform: hidden && !open ? "translateY(-200%)" : "translateY(0)",
          transition: "transform 0.5s var(--ease-snappy)",
        }}
      >
        <div
          className="relative flex h-55 w-full items-start overflow-hidden rounded-[1.2rem] p-1 transition-all duration-500"
          style={{
            backgroundImage:
              "linear-gradient(oklab(0 0 0 / 0.15), oklab(0 0 0 / 0.15))",
            boxShadow: scrolled
              ? "0 1rem 3rem -1rem oklab(0 0 0 / 0.15)"
              : "none",
          }}
        >
          <div
            className="relative h-full w-full rounded-[1.1rem] pr-12 pl-24 transition-all duration-500 sm:pl-28"
            style={{
              backgroundColor: scrolled ? "rgba(255,255,255,0.94)" : "#ffffff",
              backdropFilter: scrolled ? "blur(12px)" : "none",
            }}
          >
            <div className="item-start relative flex h-full w-full items-center justify-between gap-12">
              <a
                href="/"
                aria-label={t.header.logoAriaLabel}
                className="flex h-full w-auto shrink-0 items-center text-foreground"
              >
                <Image
                  src="/images/logo.png"
                  alt="Lensies"
                  width={120}
                  height={36}
                  decoding="async"
                  fetchPriority="high"
                  className="h-32 w-auto sm:h-36"
                  sizes="80px"
                />
              </a>

              <div className="flex h-full items-center gap-6">
                <div className="hidden md:block">
                  <LanguageSwitcher />
                </div>

                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="magnetic group hidden h-34 items-center gap-6 self-center rounded-full bg-foreground px-14 text-white transition-all duration-500 hover:scale-[1.04] hover:bg-pink md:flex md:h-36 md:px-18"
                >
                  <CalendarIcon className="h-12 w-12 md:h-14 md:w-14" />
                  <span className="font-body text-[1.1rem] font-semibold tracking-[0.02em] md:text-[1.2rem]">
                    {t.header.bookButton}
                  </span>
                </button>

                <button
                  type="button"
                  aria-label={open ? t.header.closeMenuLabel : t.header.openMenuLabel}
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                  className="grid size-36 shrink-0 place-items-center text-foreground transition-all duration-300 hover:bg-black/5 sm:size-40"
                >
                  {open ? (
                    <CloseIcon className="h-12 w-12" />
                  ) : (
                    <MenuIcon className="h-10 w-16" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div
            aria-hidden
            className="absolute bottom-0 left-25 right-25 h-2 origin-left bg-pink"
            style={{
              transform: `scaleX(${progress})`,
              transition: "transform 1.2s var(--ease-snappy)",
            }}
          />
        </div>
      </header>

      {/* Megamenu overlay */}
      <div
        aria-hidden={!open}
        className="fixed inset-0 z-[490] overflow-hidden bg-foreground text-cream"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          transition:
            "clip-path 0.7s var(--ease-snappy), opacity 0.5s var(--ease-snappy)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 size-[60rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklab(0.66 0.23 -0.05 / 0.25), transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[140rem] flex-col overflow-y-auto px-24 pb-40 pt-100 md:overflow-visible md:px-90 md:pt-160">
          <div className="grid flex-1 grid-cols-1 gap-24 md:grid-cols-12 md:gap-32">
            {/* Left: nav links */}
            <nav className="flex flex-col md:col-span-7">
              <p className="mb-12 font-body text-[1.1rem] font-semibold uppercase tracking-[0.2em] text-cream/50 md:mb-16 md:text-[1.2rem]">
                {t.header.navigationLabel}
              </p>
              <ul className="flex flex-col">
                {NAV.map((item, i) => (
                  <li
                    key={item.href}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => setActiveIdx(i)}
                    className="border-b border-cream/10 last:border-b-0"
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between gap-16 py-10 text-cream md:py-12"
                      style={{
                        transform: open ? "translateY(0)" : "translateY(2rem)",
                        opacity: open ? 1 : 0,
                        transition: `transform 0.7s var(--ease-snappy) ${0.1 + i * 0.05}s, opacity 0.6s var(--ease-snappy) ${0.1 + i * 0.05}s`,
                      }}
                    >
                      <span className="flex items-baseline gap-12 md:gap-16">
                        <span className="font-mono text-[1.1rem] font-normal text-cream/40 md:text-[1.2rem]">
                          0{i + 1}
                        </span>
                        <span
                          className="font-display"
                          style={{
                            fontSize: "clamp(2.4rem, 8vw, 7.2rem)",
                            lineHeight: 0.95,
                            letterSpacing: "-0.035em",
                            transition: "color 0.4s var(--ease-snappy)",
                            color: i === activeIdx ? "var(--color-pink)" : "inherit",
                          }}
                        >
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="size-20 shrink-0 transition-all duration-500 md:size-32"
                        style={{
                          opacity: i === activeIdx ? 1 : 0.3,
                          transform:
                            i === activeIdx
                              ? "translate(0.4rem, -0.4rem)"
                              : "translate(0, 0)",
                        }}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right: photo card for active item */}
            <div
              className="hidden md:col-span-5 md:flex md:flex-col md:gap-20"
              style={{
                transform: open ? "translateY(0)" : "translateY(2rem)",
                opacity: open ? 1 : 0,
                transition:
                  "transform 0.7s var(--ease-snappy) 0.4s, opacity 0.6s var(--ease-snappy) 0.4s",
              }}
            >
              <p className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.2em] text-cream/50">
                {t.header.previewLabel}
              </p>
              <div
                key={activeIdx}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.6rem] bg-cream/5"
              >
                {NAV[activeIdx].image.endsWith(".mp4") ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="none"
                    src={NAV[activeIdx].image}
                    className="size-full object-cover"
                    style={{
                      animation: "reveal-fade 0.5s var(--ease-snappy)",
                    }}
                  />
                ) : (
                  <Image
                    src={NAV[activeIdx].image}
                    alt={NAV[activeIdx].label}
                    width={640}
                    height={480}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="size-full object-cover"
                    style={{
                      animation: "reveal-scale 0.5s var(--ease-snappy)",
                    }}
                  />
                )}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, oklab(0 0 0 / 0.7) 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-24">
                  <p className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.1em] text-cream/70">
                    {NAV[activeIdx].label}
                  </p>
                </div>
              </div>

              <p
                key={`desc-${activeIdx}`}
                className="text-pretty font-body text-[1.4rem] font-medium leading-[1.5] text-cream/80"
                style={{
                  animation: "reveal-fade 0.5s var(--ease-snappy) 0.1s both",
                }}
              >
                {NAV[activeIdx].description}
              </p>

              <div className="flex flex-wrap gap-8">
                {NAV[activeIdx].tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cream/20 px-12 py-6 font-body text-[1.2rem] font-medium text-cream/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            className="mt-24 flex flex-col-reverse items-start gap-16 border-t border-cream/10 pt-20 md:mt-32 md:flex-row md:items-end md:justify-between md:pt-24"
            style={{
              transform: open ? "translateY(0)" : "translateY(1rem)",
              opacity: open ? 1 : 0,
              transition:
                "transform 0.6s var(--ease-snappy) 0.7s, opacity 0.6s var(--ease-snappy) 0.7s",
            }}
          >
            <div className="flex flex-col gap-4">
              <p className="font-body text-[1.1rem] font-semibold uppercase tracking-[0.1em] text-cream/50 md:text-[1.2rem]">
                {t.header.getInTouchLabel}
              </p>
              <a
                href={`mailto:${t.footer.email}`}
                className="link-underline font-body text-[1.3rem] font-medium text-cream md:text-[1.4rem]"
              >
                {t.footer.email}
              </a>
            </div>
            <p className="font-mono text-[1.1rem] text-cream/50 md:text-[1.2rem]">
              {t.format(t.header.copyrightTemplate, { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
