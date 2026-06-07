"use client";

import { LinkedInIcon, YouTubeIcon, XIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { useT } from "@/i18n/provider";

const ICON_MAP = {
  instagram: LinkedInIcon,
  youtube: YouTubeIcon,
  x: XIcon,
} as const;

export interface FooterProps {
  videoSrc?: string;
  posterSrc?: string;
}

export default function Footer({
  videoSrc = "/videos/light-tunnel.mp4",
  posterSrc,
}: FooterProps) {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-foreground text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={posterSrc ?? "/images/parallax-9.jpg"}
        src={videoSrc}
        className="absolute inset-0 size-full object-cover"
      />
      <div
        aria-hidden
        className="absolute top-0 right-0 left-0 h-[2px] bg-pink"
        style={{ opacity: 0.7 }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[123rem] flex-col gap-48 px-24 py-80 sm:gap-64 md:px-90 md:py-120">
        <Reveal className="flex flex-col gap-32 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-20">
            <img
              src="/images/logo.png"
              alt="Lensies"
              width={156}
              height={130}
              loading="lazy"
              decoding="async"
              className="h-110 w-auto md:h-130"
            />
            <p className="max-w-full text-pretty font-body text-[1.3rem] font-medium leading-[1.5] text-white/85 sm:max-w-[44rem] sm:text-[1.4rem] md:text-[1.5rem]">
              {t.footer.taglineTemplate}{" "}
              <a
                href={`mailto:${t.footer.email}`}
                className="text-white/70 underline decoration-solid underline-offset-auto transition-colors hover:text-white"
              >
                {t.footer.email}
              </a>
              <span className="px-6 text-white/60">|</span>
              <a
                href={`mailto:${t.footer.pressEmail}`}
                className="text-white/70 underline decoration-solid underline-offset-auto transition-colors hover:text-white"
              >
                {t.footer.pressEmail}
              </a>
            </p>
          </div>

          <div className="flex w-full flex-col gap-12 md:w-[32.5rem] md:gap-24">
            <p className="font-body text-[1.1rem] font-semibold uppercase tracking-[0.1em] text-white/60 md:text-[1.2rem]">
              {t.footer.studioLabel}
            </p>
            <nav className="flex flex-col gap-6 md:gap-8">
              {t.footer.aboutLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="link-underline inline-flex w-fit font-body text-[1.6rem] font-medium text-white transition-colors hover:text-white/80 sm:text-[1.4rem] md:text-[2rem]"
                  style={{ lineHeight: 1.1, letterSpacing: "-0.01em" }}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </Reveal>

        <Reveal
          delay={1}
          className="flex flex-col items-start gap-24 border-t border-white/15 pt-24 md:flex-row md:items-center md:justify-between md:gap-32 md:pt-32"
        >
          <p className="font-body text-[1.2rem] font-medium text-white/70 md:text-[1.3rem]">
            {t.format(t.footer.copyrightTemplate, { year })}
          </p>

          <div className="flex items-start gap-12">
            {t.footer.socials.map((s) => {
              const Icon = ICON_MAP[s.kind];
              return (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-36 place-items-center rounded-full bg-white text-foreground transition-all duration-300 hover:scale-110 hover:bg-pink hover:text-white md:size-50"
                >
                  <Icon className="size-16 md:size-20" />
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
