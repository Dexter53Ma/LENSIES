"use client";

import { Reveal } from "@/components/reveal";
import type { PricingComparisonData } from "@/i18n/types";

export interface PricingComparisonProps {
  data: PricingComparisonData;
}

export default function PricingComparison({ data }: PricingComparisonProps) {
  return (
    <section className="relative w-full bg-background px-24 py-80 text-foreground md:px-90 md:py-120">
      <div className="mx-auto max-w-[120rem]">
        <Reveal className="mb-40 md:mb-48">
          <h2
            className="font-display text-balance text-foreground"
            style={{
              fontSize: "clamp(3.2rem, 6vw, 6.4rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
            }}
          >
            {data.heading}
          </h2>
        </Reveal>

        <Reveal delay={1}>
          <div className="-mx-24 overflow-x-auto px-24 md:mx-0 md:px-0" style={{ scrollbarWidth: "none" }}>
            <table className="w-full min-w-[70rem] border-collapse md:min-w-0">
              <thead>
                <tr>
                  <th className="pb-16 pr-16 text-left font-body text-[1.1rem] font-semibold uppercase tracking-[0.15em] text-foreground/50 md:pb-20 md:pr-24 md:text-[1.3rem]">
                    Features
                  </th>
                  {data.tierNames.map((name) => (
                    <th
                      key={name}
                      className="pb-16 text-center font-display text-[1.4rem] font-semibold text-foreground md:pb-20 md:text-[1.8rem]"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 1 ? "bg-foreground/[0.03]" : ""}
                  >
                    <td className="py-14 pr-16 font-body text-[1.2rem] font-medium text-foreground/80 md:py-18 md:pr-24 md:text-[1.4rem]">
                      {row.feature}
                    </td>
                    {row.values.map((val, j) => (
                      <td key={j} className="py-14 text-center md:py-18">
                        {val === "✓" || val === "Yes" ? (
                          <span className="mx-auto grid size-24 place-items-center rounded-full bg-foreground/10 text-foreground md:size-28">
                            <svg
                              className="size-12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={3}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        ) : val === "—" || val === "-" ? (
                          <span className="font-body text-[1.2rem] text-foreground/30 md:text-[1.3rem]">—</span>
                        ) : (
                          <span className="font-body text-[1.2rem] font-medium text-foreground/80 md:text-[1.4rem]">
                            {val}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
