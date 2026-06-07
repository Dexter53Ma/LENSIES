import { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-foreground text-cream">
      <div className="mx-auto flex min-h-[60vh] w-full max-w-[123rem] flex-col items-start justify-end gap-24 px-24 pb-60 pt-160 sm:min-h-[70vh] sm:px-40 md:px-90 md:pb-90 md:pt-200">
        <span className="font-body text-[1.2rem] font-semibold uppercase tracking-[0.2em] text-cream/60">
          {eyebrow}
        </span>
        <h1
          className="font-display text-balance text-cream"
          style={{
            fontSize: "clamp(4rem, 11vw, 13rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.045em",
          }}
        >
          {title}
        </h1>
        {description ? (
          <p className="max-w-full text-pretty font-body text-[1.5rem] font-medium leading-[1.5] text-cream/80 sm:max-w-[60rem] md:text-[1.7rem]">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
