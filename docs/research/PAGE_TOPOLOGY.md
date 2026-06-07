# Waabi.ai Clone — Page Topology

Target URL: https://waabi.ai/  |  Captured: 2026-06-06  |  Viewports: 1440×900 desktop, 390×844 mobile

## Site-wide facts
- Built on Next.js 16 with App Router; uses **Lenis** smooth scroll (`.lenis` on `<html>`).
- Custom fonts: **Zagma** (serif, display/headings) and **NeueHaas Grotesk Text 65 Medium** (sans, body).
- `html { font-size: 10px }` — the entire layout uses **rem** with a 10px base.
- Page is 11,267px tall on desktop — long, scroll-driven, multiple pinned sections.
- Brand color **pink** `#ff2c6b` (rgb(255,44,107)) is the primary accent.
- Light theme only. Background `#ffffff`, foreground `#191818`.

## Section list (top → bottom)

| # | Name | Interaction model | Notes |
|---|------|------------------|-------|
| 1 | Announcement bar | static, dismissible | Top strip "Let's talk autonomous trucking  Get in touch ↗" + close × |
| 2 | Floating header | static visual, hover states | Pill-shaped floating card, fixed, contains logo + Home + hamburger |
| 3 | Hero (Pioneering + Built to think) | scroll-pinned text reveal | Hero is 250vh tall, h1 is sticky; small "Waabi is pioneering..." line appears first, then the big "Built to think. Born to haul." h1 fades/scales in. Background = full-bleed video of truck. |
| 4 | Hero scroll-down button | click | Pink round button bottom-right with down arrow → smooth-scrolls to next section |
| 5 | "We built our own road" parallax grid | scroll-driven parallax | 200vh section. Right side = sticky text panel. Left = 4×3 image grid that translates on scroll. Background videos appear as you scroll. |
| 6 | "Unlocking scale in the real world" feature tabs | scroll-driven sticky stack | 200vh section. Two columns. Left column is a sticky panel with heading + 3 feature rows (Safe/Scalable/Practical). Right column is sticky video. Active feature row highlights as you scroll. |
| 7 | "The technology behind Waabi" product cards | scroll-driven horizontal pin | 200vh. Sticky title "The technology behind Waabi." with "Explore the tech" link. Then 3 large product cards (Waabi World, Mixed Reality Testing, Waabi Driver) translate horizontally. |
| 8 | "Setting new standards for AV safety" hero card | static | Full-viewport dark/video card with heading + paragraph + "Explore our approach" pink pill button |
| 9 | "Trusted by the best in the industry" partner tabs | click-driven | 4 partner buttons (Volvo, Uber, Uber Freight, NVIDIA) — clicking swaps the displayed partner card with quote + image. |
| 10 | "Insights" article carousel | click-driven carousel | Heading + "View all" link + Prev/Next buttons. Slides a row of article cards. Articles have tag pills, date, title. |
| 11 | "Build Physical AI with us" careers CTA | static | Large heading + "Join the team" pink pill button. Background includes a muted image strip at the bottom. |
| 12 | Footer | static | "We're just getting started" + email links + About nav + LinkedIn/YouTube/X icons + copyright. |

## Layout primitives observed
- **Page max-width:** `max-w-370` (370rem = 3700px) — design at 10px base means this is essentially full-width with side padding.
- **Section vertical padding:** `--padding-y: 12rem` (120px).
- **Default horizontal padding:** `px-24` (24rem = 240px) on desktop, less on mobile.
- **Pill border-radius:** 50px (used for buttons, header card).
- **Cards border-radius:** `--rounded-unit: 1.2rem` (12px).
- **Container border-radius (cards):** `1.25rem` (20px).
- **Default transition:** `--duration: 0.4` with `--ease-snappy: cubic-bezier(.19,1,.22,1)`.
- **Stacked cards on hover:** 4 cards in the parallax grid are layered with a small offset; they translate independently on scroll.

## File plan
Per-section components in `src/components/sections/`. Foundation files in `src/components/` and `src/lib/`. Global CSS tokens in `src/app/globals.css`. Layout & metadata in `src/app/layout.tsx`. Page assembly in `src/app/page.tsx`.

| Section | Component file | Status |
|---|---|---|
| Announcement bar | `src/components/sections/AnnouncementBar.tsx` | |
| Floating header | `src/components/sections/Header.tsx` | |
| Hero | `src/components/sections/Hero.tsx` | |
| "We built our own road" | `src/components/sections/ParallaxGrid.tsx` | |
| "Unlocking scale" | `src/components/sections/FeatureTabs.tsx` | |
| "The technology behind" | `src/components/sections/ProductShowcase.tsx` | |
| "Setting new standards" | `src/components/sections/SafetyHero.tsx` | |
| "Trusted by the best" | `src/components/sections/Partners.tsx` | |
| "Insights" carousel | `src/components/sections/Insights.tsx` | |
| "Build with us" | `src/components/sections/CareersCTA.tsx` | |
| Footer | `src/components/sections/Footer.tsx` | |
