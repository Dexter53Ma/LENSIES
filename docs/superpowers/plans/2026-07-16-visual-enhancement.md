# Visual Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fill missing images in about/services pages, enhance existing animations, and add new animation components (TextReveal, Magnetic hover, Section Divider).

**Architecture:** Edit i18n dictionaries to add missing `imageSrc` fields, enhance existing section components with better animations, create 3 new reusable components (`TextReveal`, `MagneticCTA`, `SectionDivider`), and add corresponding CSS keyframes.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, custom IntersectionObserver-based reveal system, CSS keyframes

## Global Constraints

- Node >= 20.18.0
- Next.js 16.2.7, React 19.2.4
- All animations must respect `prefers-reduced-motion`
- Follow existing code patterns (Reveal component, useSharedScroll, CSS variables)
- No new npm dependencies
- Run `npm run lint` and `npm run typecheck` after changes

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/i18n/dictionaries/en.ts` | Modify | Add `imageSrc` to about/services showcase cards |
| `src/i18n/dictionaries/fr.ts` | Modify | Same as above (French dictionary) |
| `src/components/sections/ProductShowcase.tsx` | Modify | Fix missing video fallback |
| `src/components/sections/Hero.tsx` | Modify | Add entrance animation |
| `src/components/sections/Partners.tsx` | Modify | Add logo stagger reveal |
| `src/components/sections/Insights.tsx` | Modify | Switch to Reveal component |
| `src/components/sections/CareersCTA.tsx` | Modify | Enhance reveal variants |
| `src/components/text-reveal.tsx` | Create | Word-by-word text reveal component |
| `src/components/section-divider.tsx` | Create | Animated section divider |
| `src/app/globals.css` | Modify | Add new keyframes and animation classes |

---

### Task 1: Fill Missing Images in Dictionaries

**Files:**
- Modify: `src/i18n/dictionaries/en.ts` (about.showcase and services.showcase sections)
- Modify: `src/i18n/dictionaries/fr.ts` (same sections)

**Interfaces:**
- Consumes: existing `work-*.png` images in `public/images/`
- Produces: updated dictionary objects with `imageSrc` fields on showcase cards

- [ ] **Step 1: Read the current en.ts dictionary to find the about.showcase section**

Open `src/i18n/dictionaries/en.ts` and locate the `about.showcase.cards` array. Each card object currently has `id`, `label`, `description` but no `imageSrc`.

- [ ] **Step 2: Add imageSrc to about showcase cards in en.ts**

Find the `about` section's `showcase.cards` array. For each card, add the `imageSrc` property:

```typescript
// In the about.showcase.cards array, update each card:
{
  id: "team",
  label: "...",  // keep existing
  description: "...",  // keep existing
  imageSrc: "/images/work-3.png",  // ADD THIS
},
{
  id: "gear",
  label: "...",
  description: "...",
  imageSrc: "/images/work-5.png",  // ADD THIS
},
{
  id: "process",
  label: "...",
  description: "...",
  imageSrc: "/images/work-7.png",  // ADD THIS
},
```

- [ ] **Step 3: Add imageSrc to services showcase cards in en.ts**

Find the `services.showcase.cards` array. Add `imageSrc` to each card:

```typescript
// In the services.showcase.cards array, update each card:
{
  id: "real-estate-package",
  label: "...",
  description: "...",
  imageSrc: "/images/work-2.png",  // ADD THIS
},
{
  id: "drone-package",
  label: "...",
  description: "...",
  imageSrc: "/images/work-4.png",  // ADD THIS
},
{
  id: "video-package",
  label: "...",
  description: "...",
  imageSrc: "/images/work-8.png",  // ADD THIS
},
```

- [ ] **Step 4: Apply same changes to fr.ts**

Open `src/i18n/dictionaries/fr.ts` and apply the same `imageSrc` additions to the `about.showcase.cards` and `services.showcase.cards` arrays. The French dictionary is a `DeepPartial<Dictionary>` so if the structure mirrors English, add the same fields.

- [ ] **Step 5: Verify no TypeScript errors**

Run: `cmd /c "npm run typecheck"`
Expected: PASS (no errors)

- [ ] **Step 6: Commit**

```bash
git add src/i18n/dictionaries/en.ts src/i18n/dictionaries/fr.ts
git commit -m "feat: add missing imageSrc to about/services showcase cards"
```

---

### Task 2: Fix Missing Video Fallback in ProductShowcase

**Files:**
- Modify: `src/components/sections/ProductShowcase.tsx` (line with `DEFAULT_VIDEO`)

**Interfaces:**
- Consumes: existing `/videos/light-tunnel.mp4` file
- Produces: updated `DEFAULT_VIDEO` constant

- [ ] **Step 1: Read ProductShowcase.tsx to find the DEFAULT_VIDEO constant**

Open `src/components/sections/ProductShowcase.tsx` and find the line:
```typescript
const DEFAULT_VIDEO = "/videos/feature.mp4";
```

- [ ] **Step 2: Replace with existing video**

Change the constant to:
```typescript
const DEFAULT_VIDEO = "/videos/light-tunnel.mp4";
```

- [ ] **Step 3: Verify no TypeScript errors**

Run: `cmd /c "npm run typecheck"`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/ProductShowcase.tsx
git commit -m "fix: use existing light-tunnel.mp4 as ProductShowcase video fallback"
```

---

### Task 3: Hero Entrance Animation

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: existing `--ease-snappy` CSS variable
- Produces: `.hero-enter-*` CSS classes for entrance animations

- [ ] **Step 1: Add CSS keyframes for hero entrance in globals.css**

Open `src/app/globals.css` and add these keyframes inside the existing `@keyframes` section:

```css
@keyframes hero-title-enter {
  from {
    opacity: 0;
    transform: translateY(4rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-body-enter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes hero-cta-enter {
  from {
    opacity: 0;
    transform: translateY(2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-pioneer-stagger {
  from {
    opacity: 0;
    transform: translateY(1.2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

- [ ] **Step 2: Add CSS utility classes for hero entrance**

Still in `globals.css`, add these classes:

```css
.hero-title-enter {
  animation: hero-title-enter 0.8s var(--ease-snappy) 0.2s both;
}

.hero-body-enter {
  animation: hero-body-enter 0.6s var(--ease-snappy) 0.5s both;
}

.hero-cta-enter {
  animation: hero-cta-enter 0.6s var(--ease-snappy) 0.7s both;
}

.hero-pioneer-enter {
  animation: hero-pioneer-stagger 0.5s var(--ease-snappy) both;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .hero-title-enter,
  .hero-body-enter,
  .hero-cta-enter,
  .hero-pioneer-enter {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

- [ ] **Step 3: Update Hero.tsx to use entrance animation classes**

Open `src/components/sections/Hero.tsx`. Add the CSS classes to the relevant elements:

1. On the `<h1>` element (line ~71), add `className="hero-title-enter"`:
```tsx
<h1
  className="hero-title-enter font-display text-balance text-cream"
  style={{
    fontSize: "clamp(4rem, 11vw, 15rem)",
    lineHeight: 0.85,
    letterSpacing: "-0.045em",
  }}
>
  {data.title}
</h1>
```

2. On the `<p>` element (line ~83), add `className="hero-body-enter"`:
```tsx
<p className="hero-body-enter max-w-full text-pretty font-body text-[1.4rem] font-medium leading-[1.45] text-cream/85 sm:max-w-[44rem] md:text-[1.6rem]">
  {data.body}
</p>
```

3. On the `<button>` element (line ~86), add `className` with `hero-cta-enter`:
```tsx
<button
  type="button"
  onClick={scrollDown}
  aria-label={data.scrollDownLabel}
  className="hero-cta-enter magnetic group flex shrink-0 items-center gap-12 self-start rounded-full border border-cream/30 px-20 py-12 text-cream transition-all duration-500 hover:scale-105 hover:border-pink hover:bg-pink hover:text-white md:self-end"
>
```

4. On each `<span>` in the pioneers mapping (line ~55), add stagger delay:
```tsx
{data.pioneering.map((word, i) => (
  <span
    key={word}
    data-pioneer
    className="hero-pioneer-enter font-display text-cream"
    style={{
      fontSize: "clamp(2.4rem, 6.4vw, 6.4rem)",
      lineHeight: 1,
      letterSpacing: "-0.03em",
      transition: "opacity 0.4s var(--ease-snappy)",
      animationDelay: `${0.1 + i * 0.12}s`,
    }}
  >
    {word}
  </span>
))}
```

- [ ] **Step 4: Verify no TypeScript errors**

Run: `cmd /c "npm run typecheck"`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx src/app/globals.css
git commit -m "feat: add entrance animation to Hero section"
```

---

### Task 4: Partners Logo Stagger Reveal

**Files:**
- Modify: `src/components/sections/Partners.tsx` (LogoItem and grid)

**Interfaces:**
- Consumes: existing `Reveal` component with `delay` prop
- Produces: staggered logo entrance

- [ ] **Step 1: Update the Partners logo grid to stagger each logo**

In `Partners.tsx`, find the grid of `LogoItem` components (around line 159-167). Wrap each `LogoItem` in a `Reveal` with increasing delay:

```tsx
<div className="grid grid-cols-3 items-center gap-x-32 gap-y-32 border-y border-foreground/10 py-32 sm:grid-cols-4 md:grid-cols-7 md:gap-x-24 md:py-40">
  <Reveal delay={0}><LogoItem Icon={SiAirbnb} name="Airbnb" color="#FF5A5F" /></Reveal>
  <Reveal delay={1}><LogoItem Icon={SiBookingdotcom} name="Booking.com" color="#003580" /></Reveal>
  <Reveal delay={2}><LogoItem Icon={SiExpedia} name="Expedia" color="#FFD000" /></Reveal>
  <Reveal delay={3}><LogoItem Icon={SiTripadvisor} name="Tripadvisor" color="#00AF87" /></Reveal>
  <Reveal delay={4}><LogoItem Icon={SiMarriott} name="Marriott" color="#A60F2D" /></Reveal>
  <Reveal delay={5}><LogoItem Icon={SiHilton} name="Hilton" color="#0F4D92" /></Reveal>
  <Reveal delay={6}><TextLogoItem name="Sahara" /></Reveal>
</div>
```

Note: `Reveal` needs to be imported — it already is at line 14.

- [ ] **Step 2: Verify no TypeScript errors**

Run: `cmd /c "npm run typecheck"`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Partners.tsx
git commit -m "feat: add staggered reveal to partner logos"
```

---

### Task 5: Insights Cards Reveal Consistency

**Files:**
- Modify: `src/components/sections/Insights.tsx`

**Interfaces:**
- Consumes: existing `Reveal` component
- Produces: consistent reveal behavior on article cards

- [ ] **Step 1: Replace inline CSS animation with Reveal component**

In `Insights.tsx`, find the article card `<a>` element (around line 80-88) that uses inline CSS animation:
```tsx
style={{
  animation: "reveal-rise 0.8s var(--ease-snappy) both",
  animationDelay: `${i * 0.05}s`,
}}
```

Replace the outer `<a>` with a `Reveal` wrapper. The `Reveal` component accepts `delay` as 0-8:

```tsx
{articles.map((a, i) => (
  <Reveal
    key={a.href}
    as="a"
    variant="rise"
    delay={Math.min(i as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, 8)}
    href={a.href}
    className="hover-zoom group flex w-[20rem] shrink-0 snap-start flex-col gap-20 sm:w-[24rem] md:w-[36rem]"
  >
    <div className="img-zoom relative aspect-[4/3] w-full overflow-hidden rounded-[1.2rem] bg-cream">
      <img
        src={a.image}
        alt={a.title}
        width={576}
        height={432}
        loading="lazy"
        decoding="async"
        className="size-full object-cover transition-transform duration-700"
      />
    </div>
    <article className="flex flex-col gap-12">
      <div className="flex flex-wrap items-center gap-12 font-body text-[1.2rem] font-medium text-foreground/70">
        {a.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-current/15 px-12 py-4 transition-colors group-hover:border-pink group-hover:text-pink"
          >
            {tag}
          </span>
        ))}
        <span>{a.date}</span>
      </div>
      <h3
        className="font-display text-balance text-foreground"
        style={{
          fontSize: "clamp(1.6rem, 2.4vw, 2.4rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        {a.title}
      </h3>
    </article>
  </Reveal>
))}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `cmd /c "npm run typecheck"`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Insights.tsx
git commit -m "feat: use Reveal component for Insights article cards"
```

---

### Task 6: CareersCTA Dramatic Reveal

**Files:**
- Modify: `src/components/sections/CareersCTA.tsx`

**Interfaces:**
- Consumes: existing `Reveal` component with `variant` prop
- Produces: enhanced visual reveal

- [ ] **Step 1: Update CareersCTA to use different reveal variants**

In `CareersCTA.tsx`, change the `Reveal` variants:

```tsx
export default function CareersCTA({ data }: CareersCTAProps) {
  return (
    <section className="relative flex w-full items-center justify-center bg-white px-24 py-120 text-foreground md:px-90">
      <div className="relative flex w-full max-w-[120rem] flex-col items-center gap-32 text-center">
        <Reveal variant="scale">
          <h2
            className="font-display text-balance text-foreground"
            style={{
              fontSize: "clamp(4.4rem, 12vw, 12rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.045em",
            }}
          >
            {data.heading}
          </h2>
        </Reveal>
        <Reveal variant="rise" delay={1}>
          <p className="max-w-[64rem] text-pretty font-body text-[1.4rem] font-medium leading-[1.4] text-foreground/80 md:text-[1.8rem]">
            {data.body}
          </p>
        </Reveal>
        <Reveal variant="up" delay={2}>
          <a href={data.ctaHref} className="pill pill-pink mt-12 inline-flex items-center gap-8">
            <span>{data.ctaLabel}</span>
            <ArrowRightIcon className="size-12" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `cmd /c "npm run typecheck"`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/CareersCTA.tsx
git commit -m "feat: enhance CareersCTA with scale/rise/up reveal variants"
```

---

### Task 7: Create TextReveal Component

**Files:**
- Create: `src/components/text-reveal.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: existing `useReveal` hook from `reveal.tsx`
- Produces: `<TextReveal>` component with `variant`, `delay`, `stagger` props

- [ ] **Step 1: Add CSS keyframes for text reveal in globals.css**

In `src/app/globals.css`, add:

```css
@keyframes text-word-reveal {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(1rem);
}

.text-word[data-revealed="true"] {
  animation: text-word-reveal 0.5s var(--ease-snappy) both;
}

@media (prefers-reduced-motion: reduce) {
  .text-word {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

- [ ] **Step 2: Create the TextReveal component**

Create `src/components/text-reveal.tsx`:

```tsx
"use client";

import { type ReactNode } from "react";
import { useReveal } from "@/components/reveal";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  stagger?: number;
  variant?: "words" | "lines";
  threshold?: number;
  rootMargin?: string;
}

export default function TextReveal({
  children,
  as: Tag = "p",
  className = "",
  stagger = 0.04,
  variant = "words",
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
}: TextRevealProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>({ threshold, rootMargin });

  const segments = variant === "lines"
    ? children.split("\n").filter(Boolean)
    : children.split(/\s+/).filter(Boolean);

  return (
    <Tag className={className}>
      <span ref={ref as React.Ref<HTMLSpanElement>} className="inline">
        {segments.map((segment, i) => (
          <span
            key={i}
            className="text-word"
            style={{
              animationDelay: revealed ? `${i * stagger}s` : undefined,
              animationPlayState: revealed ? "running" : "paused",
            }}
            data-revealed={revealed ? "true" : undefined}
          >
            {segment}
            {variant === "words" && i < segments.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </span>
    </Tag>
  );
}
```

- [ ] **Step 3: Verify no TypeScript errors**

Run: `cmd /c "npm run typecheck"`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/text-reveal.tsx src/app/globals.css
git commit -m "feat: add TextReveal component for word-by-word text animation"
```

---

### Task 8: Create Section Divider Component

**Files:**
- Create: `src/components/section-divider.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: existing `useReveal` hook
- Produces: `<SectionDivider>` component with animated line

- [ ] **Step 1: Add CSS for section divider in globals.css**

In `src/app/globals.css`, add:

```css
@keyframes divider-expand {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.section-divider-line {
  height: 1px;
  background: oklab(0 0 0 / 0.1);
  transform: scaleX(0);
  transform-origin: center;
}

.section-divider-line[data-revealed="true"] {
  animation: divider-expand 1s var(--ease-snappy) both;
}

@media (prefers-reduced-motion: reduce) {
  .section-divider-line {
    animation: none !important;
    transform: scaleX(1) !important;
  }
}
```

- [ ] **Step 2: Create the SectionDivider component**

Create `src/components/section-divider.tsx`:

```tsx
"use client";

import { useReveal } from "@/components/reveal";

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className = "" }: SectionDividerProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`w-full px-24 md:px-90 ${className}`}>
      <div
        className="section-divider-line mx-auto max-w-[123rem]"
        data-revealed={revealed ? "true" : undefined}
      />
    </div>
  );
}
```

- [ ] **Step 3: Verify no TypeScript errors**

Run: `cmd /c "npm run typecheck"`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/section-divider.tsx src/app/globals.css
git commit -m "feat: add SectionDivider component with expand animation"
```

---

### Task 9: Integrate New Components into Pages

**Files:**
- Modify: `src/app/page.tsx` (homepage)
- Modify: `src/app/services/page.tsx`
- Modify: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `TextReveal` from task 7, `SectionDivider` from task 8
- Produces: updated page layouts with new components

- [ ] **Step 1: Update homepage to use TextReveal and SectionDivider**

Open `src/app/page.tsx`. Import the new components and add them to appropriate sections:

```tsx
import TextReveal from "@/components/text-reveal";
import SectionDivider from "@/components/section-divider";
```

Add `<SectionDivider />` between major sections (e.g., between Platforms and ParallaxGrid, between ParallaxGrid and FeatureTabs, etc.).

- [ ] **Step 2: Update services page**

Open `src/app/services/page.tsx`. Add the same imports and SectionDivider usage between sections.

- [ ] **Step 3: Update about page**

Open `src/app/about/page.tsx`. Add the same imports and SectionDivider usage between sections.

- [ ] **Step 4: Verify no TypeScript errors**

Run: `cmd /c "npm run typecheck"`
Expected: PASS

- [ ] **Step 5: Run linter**

Run: `cmd /c "npm run lint"`
Expected: PASS (or only pre-existing warnings)

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/app/services/page.tsx src/app/about/page.tsx
git commit -m "feat: integrate TextReveal and SectionDivider into pages"
```

---

### Task 10: Final Verification

**Files:** None (verification only)

- [ ] **Step 1: Run full typecheck**

Run: `cmd /c "npm run typecheck"`
Expected: PASS

- [ ] **Step 2: Run linter**

Run: `cmd /c "npm run lint"`
Expected: PASS

- [ ] **Step 3: Visual verification**

Start dev server and check:
- Homepage: Hero entrance animation fires on load
- Homepage: Partners logos stagger in
- Homepage: Insights cards use Reveal
- Homepage: SectionDividers animate between sections
- About page: Showcase cards show images
- Services page: Showcase cards show images
- All pages: `prefers-reduced-motion` disables animations

Run: `cmd /c "npm run dev"` then open http://localhost:3000

- [ ] **Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "chore: visual enhancement final fixes"
```
