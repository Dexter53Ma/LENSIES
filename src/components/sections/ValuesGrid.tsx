"use client";

import { Reveal } from "@/components/reveal";

export interface ValuesGridProps {
  data: {
    items: {
      icon: string;
      heading: string;
      body: string;
    }[];
  };
}

const ICON_SVGS: Record<string, string> = {
  craft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  local: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  honest: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
};

export default function ValuesGrid({ data }: ValuesGridProps) {
  return (
    <section className="relative flex w-full justify-center bg-background px-24 py-80 text-foreground md:px-90 md:py-120">
      <div className="grid w-full max-w-[120rem] grid-cols-1 gap-40 md:grid-cols-3 md:gap-32">
        {data.items.map((item, i) => (
          <Reveal key={item.heading} variant="up" delay={(i + 1) as 1 | 2 | 3}>
            <div className="flex flex-col items-center gap-16 text-center md:items-start md:text-left md:gap-20">
              <div
                className="flex size-[7rem] items-center justify-center rounded-full bg-pink/10 text-pink md:size-[8rem] [&_svg]:size-[3.2rem] md:[&_svg]:size-[3.6rem]"
                dangerouslySetInnerHTML={{ __html: ICON_SVGS[item.icon] || item.icon }}
              />
              <div className="flex flex-col gap-8 md:gap-12">
                <h3
                  className="font-display text-foreground"
                  style={{
                    fontSize: "clamp(2rem, 2.5vw, 2.8rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.heading}
                </h3>
                <p className="max-w-[36rem] text-pretty font-body text-[1.4rem] leading-[1.5] text-foreground/60 md:text-[1.5rem]">
                  {item.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
