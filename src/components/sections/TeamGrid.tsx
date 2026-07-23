"use client";

import { Reveal } from "@/components/reveal";

export interface TeamGridProps {
  data: {
    heading: string;
    members: {
      name: string;
      role: string;
      bio: string;
      photo: string;
    }[];
  };
}

export default function TeamGrid({ data }: TeamGridProps) {
  return (
    <section className="relative flex w-full justify-center bg-background px-24 py-80 text-foreground md:px-90 md:py-120">
      <div className="flex w-full max-w-[120rem] flex-col items-center gap-48 md:gap-64">
        <Reveal variant="scale">
          <h2
            className="font-display text-balance text-center text-foreground"
            style={{
              fontSize: "clamp(3.2rem, 7vw, 7.2rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
            }}
          >
            {data.heading}
          </h2>
        </Reveal>

        <div className="grid w-full grid-cols-2 gap-16 sm:gap-24 md:grid-cols-4 md:gap-24">
          {data.members.map((member, i) => (
            <Reveal key={member.name} variant="up" delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div className="flex flex-col gap-12 md:gap-16">
                <div className="img-zoom relative aspect-[3/4] w-full overflow-hidden rounded-[1.2rem] bg-cream">
                  <img
                    src={member.photo}
                    alt={member.name}
                    width={600}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <h3
                    className="font-display text-foreground"
                    style={{
                      fontSize: "clamp(1.6rem, 2vw, 2rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p className="font-body text-[1.1rem] font-semibold uppercase tracking-[0.12em] text-foreground/50 md:text-[1.2rem]">
                    {member.role}
                  </p>
                  <p className="text-pretty font-body text-[1.2rem] leading-[1.5] text-foreground/60 md:text-[1.3rem]">
                    {member.bio}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
