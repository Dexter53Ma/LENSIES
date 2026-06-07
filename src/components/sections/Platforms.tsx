"use client";

import { SiAirbnb, SiBookingdotcom, SiExpedia } from "react-icons/si";
import { Reveal } from "@/components/reveal";
import { useT } from "@/i18n/provider";

const PLATFORMS = [
  { name: "Airbnb", Icon: SiAirbnb, href: "https://airbnb.com", brandColor: "#FF5A5F" },
  { name: "Booking.com", Icon: SiBookingdotcom, href: "https://booking.com", brandColor: "#003580" },
  { name: "Expedia", Icon: SiExpedia, href: "https://expedia.com", brandColor: "#FFD200" },
] as const;

export default function Platforms() {
  const t = useT();
  return (
    <section className="relative w-full bg-background">
      <div className="mx-auto w-full max-w-[123rem] px-24 py-60 sm:px-40 md:px-90 md:py-80">
        <Reveal className="flex flex-col items-center gap-32 text-center md:gap-40">
          <span className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.2em] text-foreground/60">
            {t.home.platforms.eyebrow}
          </span>

          <ul className="flex flex-wrap items-center justify-center gap-x-40 gap-y-24 text-foreground/70 md:gap-x-64">
            {PLATFORMS.map(({ name, Icon, href, brandColor }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="group inline-flex items-center gap-12 transition-colors duration-300 hover:text-foreground"
                  style={{ ["--brand" as string]: brandColor }}
                >
                  <Icon
                    className="size-28 transition-all duration-300 group-hover:[color:var(--brand)] md:size-32"
                    aria-hidden
                  />
                  <span className="hidden font-body text-[1.5rem] font-medium transition-colors duration-300 group-hover:[color:var(--brand)] sm:inline md:text-[1.7rem]">
                    {name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
