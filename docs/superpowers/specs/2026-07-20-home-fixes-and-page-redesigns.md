# Design Spec: Home Page Fixes & About/Services/Pricing Redesign

## Overview

Fix home page bugs and animation issues, then redesign About, Services, and Pricing pages with unique, purpose-built layouts in an editorial/magazine style. Currently these three pages reuse identical Home page section components.

---

## Part 1: Home Page Bug Fixes

### Critical Fixes

| # | File | Issue | Fix |
|---|------|-------|-----|
| 1 | `src/components/sections/Footer.tsx:8` | Instagram link renders LinkedIn icon | Replace `LinkedInIcon` with proper Instagram icon |
| 2 | `src/components/sections/ProductShowcase.tsx:73` | Links to non-existent `/our-ai` | Change to `/portfolio` |
| 3 | `src/components/sections/Insights.tsx:52` | Links to `/insights` | Change to `/blog` |

### Animation & Transition Fixes

| # | File | Issue | Fix |
|---|------|-------|-----|
| 4 | `src/components/sections/FeatureTabs.tsx:34-35` | `style={{ height: "auto" }}` overrides `md:[height:200vh]`, breaking desktop scroll-driven tab switching | Remove inline `height: "auto"` style; use conditional height via CSS class or media query |
| 5 | `src/components/sections/SafetyHero.tsx:48` | Video scale transition `0.4s` too slow for scroll-linked animation, causes lag | Reduce to `0.12s` |
| 6 | `src/components/sections/ProductShowcase.tsx:129-130` | Desktop card images missing `width`/`height`/`loading` attributes, causing CLS | Add `width`, `height`, and `loading="lazy"` to card images |
| 7 | `src/app/globals.css:343,350,357,364,371,378` | `will-change` on all reveal elements creates GPU layers for every element even off-screen | Move `will-change` to `[data-revealed="true"]` state only |
| 8 | `src/components/sections/ProductShowcase.tsx:132-139,192-199` | Videos lack `poster` attributes, causing flash before autoplay | Add `poster` prop to video elements |
| 9 | `src/components/sections/SafetyHero.tsx:55` | `oklab()` color function has no fallback for older browsers | Add `rgb()` fallback before `oklab()` value |

### Minor Cleanup

| # | File | Issue | Fix |
|---|------|-------|-----|
| 10 | `src/app/globals.css:524,572` | Duplicate `@media (prefers-reduced-motion: reduce)` blocks | Consolidate into single block |
| 11 | `src/app/globals.css:134-149` | `.container-x` responsive rules are dead code (all set same padding) | Remove duplicate responsive rules |

---

## Part 2: About Page Redesign

**Layout: Story-driven editorial**

### Section 1: Page Hero
- Full-width cinematic image of Marrakech landscape/studio
- Large editorial headline: "Built in Marrakech."
- Subtitle: "We shoot what we love, where we live."
- Scroll-down indicator
- Reuse existing `page-hero.tsx` component with new content

### Section 2: Origin Story
- Two-column editorial layout (stacked on mobile)
- Left: large portrait/team photo with parallax reveal
- Right: long-form text block — studio founding story, mission, philosophy
- Generous whitespace, editorial typography
- New component: `src/components/sections/AboutStory.tsx`

### Section 3: Team Grid
- Section heading: "The Team"
- 4 team member cards in responsive grid (2 cols mobile, 4 cols desktop)
- Each card: portrait photo, name, role, short bio
- Cards reveal with stagger animation
- New component: `src/components/sections/TeamGrid.tsx`

### Section 4: Gear Showcase
- Full-width section showing key equipment
- Items: Sony A7R V, DJI Mavic 3 Pro, Ronin, Aputure, Profoto
- Each item: image + name + one-line description
- Horizontal scroll on mobile, grid on desktop
- New component: `src/components/sections/GearShowcase.tsx`

### Section 5: Values
- Three-column grid: "Craft" / "Local" / "Honest"
- Each: icon, heading, short paragraph
- Clean, minimal design
- New component: `src/components/sections/ValuesGrid.tsx`

### Section 6: CareersCTA
- Reuse existing `CareersCTA.tsx` component

### Page file
- Rewrite `src/app/about/page.tsx` to use new sections

---

## Part 3: Services Page Redesign

**Layout: Service-focused**

### Section 1: Page Hero
- Full-width image/video background
- Headline: "Six Crafts. One Studio."
- Subtitle: "Real estate, video, drone, events, tours, 3D."
- Reuse existing `page-hero.tsx`

### Section 2: Service Cards
- 6 service cards in responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)
- Each card: large feature image, service name, short description, "Learn more" link
- Hover effect: subtle scale + shadow
- Stagger reveal animation
- New component: `src/components/sections/ServiceCards.tsx`

### Section 3: Process Workflow
- Horizontal timeline (vertical on mobile) showing: Brief → Scout → Shoot → Edit → Deliver
- Each step: icon, title, short description
- Connected by animated line/progress indicator
- New component: `src/components/sections/ProcessTimeline.tsx`

### Section 4: Portfolio Highlights
- Filterable gallery showing 2-3 best works per service category
- `ServiceCards` and `ServicePortfolio` are separate components; the services page (`services/page.tsx`) holds the selected filter state and passes it down
- Clicking a service card updates the filter state in the parent page, which filters the portfolio section
- Reuse existing portfolio data from `MasonryGallery.tsx`
- New component: `src/components/sections/ServicePortfolio.tsx`

### Section 5: CareersCTA
- Reuse existing `CareersCTA.tsx` component

### Page file
- Rewrite `src/app/services/page.tsx` to use new sections

---

## Part 4: Pricing Page Redesign

**Layout: Cards + comparison table**

### Section 1: Page Hero
- Clean editorial hero
- Headline: "Five Packages. One Studio."
- Subtitle: "Pricing, kept simple."
- Minimal background
- Reuse existing `page-hero.tsx`

### Section 2: Pricing Cards
- 5 tier cards in responsive layout
- Stacked on mobile, horizontal scroll or grid on desktop
- Each card: package name, price (MAD), feature list, "Book now" CTA
- "Riads" tier: "Most Popular" badge with pink accent border
- "Drone Tour" tier: "New" badge
- Refactor existing `src/components/sections/Pricing.tsx`

### Section 3: Feature Comparison Table
- Full-width table comparing all 5 packages
- Features: photos count, video, drone, delivery time, express option, coverage hours
- Responsive: horizontal scroll on mobile
- Alternating row backgrounds for readability
- Checkmarks/icons for included features
- New component: `src/components/sections/PricingComparison.tsx`

### Section 4: FAQ Section
- Accordion with 5-6 common pricing questions
- Questions: VAT, travel fees, rescheduling, payment terms, bulk discounts, cancellation
- Clean expand/collapse animation
- New component: `src/components/sections/PricingFAQ.tsx`

### Section 5: CareersCTA
- Reuse existing `CareersCTA.tsx` component

### Page file
- Rewrite `src/app/pricing/page.tsx` to use new sections

---

## New Components Summary

| Component | Page | Purpose |
|-----------|------|---------|
| `AboutStory.tsx` | About | Two-column origin story layout |
| `TeamGrid.tsx` | About | Team member cards grid |
| `GearShowcase.tsx` | About | Equipment showcase |
| `ValuesGrid.tsx` | About | Three-column values display |
| `ServiceCards.tsx` | Services | 6 service cards grid |
| `ProcessTimeline.tsx` | Services | Studio process timeline |
| `ServicePortfolio.tsx` | Services | Filterable portfolio per service |
| `PricingComparison.tsx` | Pricing | Feature comparison table |
| `PricingFAQ.tsx` | Pricing | FAQ accordion |

---

## Design Principles

- **Editorial typography**: Strong headlines, generous whitespace, high-contrast imagery
- **Consistent reveal system**: Use existing `Reveal` component with stagger animations
- **Responsive first**: Mobile-first design, graceful degradation
- **i18n ready**: All text via `useT()` hook for EN/FR support
- **Performance**: Lazy loading, proper `width`/`height` on images, `loading="lazy"` for off-screen content
- **Dark theme preserved**: Keep existing `--color-dark`, `--color-cream`, `--color-pink` palette

---

## Files to Modify

- `src/app/about/page.tsx` (rewrite)
- `src/app/services/page.tsx` (rewrite)
- `src/app/pricing/page.tsx` (rewrite)
- `src/components/sections/Footer.tsx` (bug fix)
- `src/components/sections/ProductShowcase.tsx` (bug fixes)
- `src/components/sections/Insights.tsx` (bug fix)
- `src/components/sections/FeatureTabs.tsx` (animation fix)
- `src/components/sections/SafetyHero.tsx` (animation fix)
- `src/components/sections/Pricing.tsx` (refactor)
- `src/app/globals.css` (animation fixes, cleanup)
- `src/i18n/dictionaries/en.ts` (new content keys)
- `src/i18n/types.ts` (new type definitions)

## Files to Create

- `src/components/sections/AboutStory.tsx`
- `src/components/sections/TeamGrid.tsx`
- `src/components/sections/GearShowcase.tsx`
- `src/components/sections/ValuesGrid.tsx`
- `src/components/sections/ServiceCards.tsx`
- `src/components/sections/ProcessTimeline.tsx`
- `src/components/sections/ServicePortfolio.tsx`
- `src/components/sections/PricingComparison.tsx`
- `src/components/sections/PricingFAQ.tsx`
