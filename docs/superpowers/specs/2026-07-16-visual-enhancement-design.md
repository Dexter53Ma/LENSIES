# Visual Enhancement Design Spec

**Date:** 2026-07-16
**Scope:** Fill missing images, enhance existing animations, add new animation types

---

## 1. Fill Missing Images

### 1.1 About Page Showcase Cards

The `about.showcase` section has 3 cards (team, gear, process) with no `imageSrc`. Add images from existing `work-*.png` files:

| Card | imageSrc | Rationale |
|------|----------|-----------|
| `team` | `/images/work-3.png` | People/team imagery |
| `gear` | `/images/work-5.png` | Equipment/gear imagery |
| `process` | `/images/work-7.png` | Process/workflow imagery |

**Files to edit:** `src/i18n/dictionaries/en.ts`, `src/i18n/dictionaries/fr.ts`

### 1.2 Services Page Showcase Cards

The `services.showcase` section has 3 cards with no `imageSrc`:

| Card | imageSrc | Rationale |
|------|----------|-----------|
| `real-estate-package` | `/images/work-2.png` | Real estate imagery |
| `drone-package` | `/images/work-4.png` | Drone/aerial imagery |
| `video-package` | `/images/work-8.png` | Video production imagery |

**Files to edit:** `src/i18n/dictionaries/en.ts`, `src/i18n/dictionaries/fr.ts`

### 1.3 Missing Video Fallback

`ProductShowcase.tsx` references `DEFAULT_VIDEO = "/videos/feature.mp4"` which doesn't exist. Replace with existing `/videos/light-tunnel.mp4`.

**Files to edit:** `src/components/sections/ProductShowcase.tsx`

---

## 2. Enhance Existing Animations

### 2.1 Hero Entrance Animation

Add a CSS entrance animation to the Hero section so the title, body, and CTA animate in on page load (before any scroll). This creates an immediate visual impact.

- Title: slides up + fades in (0.8s, delay 0.2s)
- Body text: fades in (0.6s, delay 0.5s)
- CTA button: slides up + fades in (0.6s, delay 0.7s)
- Pioneering words: stagger fade-in on load (each 0.15s apart)

**Files to edit:** `src/components/sections/Hero.tsx`, `src/app/globals.css`

### 2.2 Partners Logo Stagger

Add staggered reveal to the partner logos row. Each logo fades in with a slight delay (0.08s apart) when the section enters the viewport.

**Files to edit:** `src/components/sections/Partners.tsx`

### 2.3 Insights Cards Reveal Consistency

Replace the inline CSS `animation` on Insights cards with the `Reveal` component for consistency with the rest of the site. Use `variant="rise"` with stagger delays.

**Files to edit:** `src/components/sections/Insights.tsx`

### 2.4 CareersCTA Dramatic Reveal

Enhance the CareersCTA section with a more dramatic reveal:
- Heading: `scale` variant (starts slightly smaller, scales up)
- Body: `rise` variant with delay
- CTA: `up` variant with delay

**Files to edit:** `src/components/sections/CareersCTA.tsx`

---

## 3. New Animation Types

### 3.1 TextReveal Component

A new component that reveals text word-by-word or line-by-line on scroll. Useful for headings and key statements.

**Implementation:**
- Split text into words/lines
- Each word starts with `opacity: 0` + `translateY(1rem)`
- When section enters viewport, words animate in sequentially with configurable stagger (default: 0.04s per word)
- Uses existing `IntersectionObserver` pattern from `useReveal`
- Supports `variant` prop: `"words"` (word-by-word) or `"lines"` (line-by-line)

**Files to create:** `src/components/text-reveal.tsx`
**Files to edit:** `src/app/globals.css` (add keyframes)

### 3.2 Magnetic Hover Enhancement

Improve the existing `.magnetic` class to have a subtle cursor-following effect using vanilla JS (no framer-motion dependency). The element slightly follows the cursor position within a defined radius, then snaps back on mouse leave.

**Files to edit:** `src/components/sections/Hero.tsx`, `src/app/globals.css`

### 3.3 Section Divider Animation

Add animated decorative lines between major sections. Thin horizontal lines that expand from center when scrolled into view.

**Files to create:** `src/components/section-divider.tsx`
**Files to edit:** `src/app/globals.css`

---

## 4. Implementation Order

1. Fill missing images (dictionary edits + video fallback) — low risk, quick wins
2. Enhance existing animations (Hero entrance, Partners stagger, Insights consistency, CareersCTA) — moderate risk
3. New animation types (TextReveal, Magnetic enhancement, Section Divider) — higher complexity

## 5. Testing

- Visual inspection on all 8 pages
- Verify `prefers-reduced-motion` still disables all new animations
- Test on mobile viewport (animations should be simpler/lighter)
- Run `npm run lint` and `npm run typecheck` after changes
