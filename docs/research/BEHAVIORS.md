# Waabi.ai — Behaviors

All behaviors observed at 1440×900 desktop and 390×844 mobile. Scroll-based interactions verified via slow scroll sweep with Playwright.

## Global behaviors

### Lenis smooth scroll
- `html.lenis` class is present; native scroll hijacked by Lenis library.
- Transition duration: `0.4s` (CSS var `--duration` set on `<html>`).
- Click handlers (e.g., "Scroll Down" button, nav links) use `lenis.scrollTo()` to animate scroll.
- Implementation: install `lenis` package, init in a client component on mount, destroy on unmount.

### Fonts load
- 3 woff2 files preloaded: Zagma Book (regular), Zagma Book Italic, NeueHaas Grotesk Text 65 Medium.
- `font-display: swap` on all faces.

## Section-level behaviors

### 1. Announcement bar
- **Static by default.** Top of page, full width, sits above the floating header.
- **Dismiss:** Click × button → banner collapses, page reflows.
- **Hover on "Get in touch":** underline appears (likely default `<a>` hover).

### 2. Floating header
- **Static visual, fixed position.** Centered, top: `2.4rem` (mobile) / `3.4rem` (desktop), max-width: 33.8rem (desktop). Contains logo + "Home" + hamburger.
- **No scroll-driven color/shadow change** observed — the card looks the same throughout the page.
- **Card has white background, ~rounded-full border-radius, thin border or subtle shadow** (verify in section spec).

### 3. Hero
- **Pinned text reveal (scroll-driven).** Container is 250vh tall. The h1 "Built to think. Born to haul." is sticky.
- **Pre-h1 line:** "Waabi is pioneering the future of Physical AI." appears above the h1 initially, then fades as user scrolls.
- **Background:** full-bleed autoplaying muted looped video of an autonomous truck on a highway.
- **Dark gradient overlay** at the bottom of the video for text legibility (`linear-gradient(oklab(0 0 0 / 0.5) 0%, rgba(0,0,0,0) 100%)`).
- **"Scroll Down" button:** pink round button bottom-right, animates a vertical bounce; click smooth-scrolls to next section.

### 4. "We built our own road" parallax
- **Scroll-driven parallax.** 200vh section. Right column is sticky text panel; left = grid of cards that translate on scroll.
- **Image grid layout:** 4 rows × 3 columns. Each row is a `flex` container of 3 image cells, with one cell per row containing a wider hero image and the other 2 being narrower.
- **Row stagger:** rows translate at different rates (parallax).
- **Card aspect:** each cell is a rounded rectangle with `overflow: hidden` and an `<img>` with `object-cover`.
- **Background videos:** 5+ autoplay muted looped videos mounted absolutely behind the cards. As cards move, videos are revealed.

### 5. "Unlocking scale in the real world" feature tabs
- **Scroll-driven sticky stack (NOT click-driven).** 200vh section.
- **Right column** is `position: sticky; top: 0; height: 100vh` — a video panel that stays pinned.
- **Left column** is 200vh tall, contains the heading + 3 feature items (Safe, Scalable, Practical) stacked vertically.
- **Active state:** as each feature item crosses the viewport center, it animates in (color/weight/scale) — the previous item fades back to neutral.
- **Implementation:** IntersectionObserver per feature item, or scroll-driven `animation-timeline: view()`. Simpler: track which item is closest to viewport center and toggle classes.

### 6. "The technology behind Waabi" product showcase
- **Scroll-driven horizontal pin.** 200vh section.
- **Top portion:** sticky heading "The technology behind Waabi." with "Explore the tech" link.
- **Bottom portion:** 3 large product cards translate from right to left as you scroll. Each card has a background image and content (eyebrow + title + Next button).
- **Cards are full-width, stacked horizontally** (each takes ~80% viewport width). Translates via `transform: translateX()` driven by scroll progress.

### 7. "Setting new standards for AV safety" hero card
- **Static.** Full-viewport (`min-h-svh`) card with full-bleed background video + dark overlay + heading + paragraph + pink pill button.
- **Heading:** large serif, white text, multi-line.
- **Strong text** inline: "we strengthen daily with" is in `<strong>` for emphasis.
- **CTA:** "Explore our approach" — pink pill, white text, with an inline arrow icon.

### 8. "Trusted by the best in the industry" partners
- **Click-driven tabs.** 4 partner buttons in a row. Clicking a button changes the displayed partner card.
- **Card content:** quote paragraph + author name + author title. Plus: visual area with a partner image, and a "See the details" link/button.
- **Visual area:** 2 layered images — a background image + an inset smaller image (Volvo logo etc.).
- **Default state:** Volvo is selected (only Volvo quote has the "Nils Jaeger" attribution).
- **Switching:** fade transition between cards (opacity).

### 9. "Insights" carousel
- **Click-driven carousel.** Header row has title + "View all" link + Prev/Next buttons.
- **Card row:** horizontally scrolling row of article cards.
- **Card structure:** image at top, then tag pills (Research, Technology, Company news), date, title.
- **Card aspect:** ~tall vertical card; image is full-width, content sits below.
- **Pagination:** dots indicator below the row.

### 10. "Build Physical AI with us" careers CTA
- **Static.** Large serif heading + "Join the team" pink pill button.
- **Background:** a soft, blurred photo strip at the bottom (likely absolute positioned images).
- **Heading color:** dark on white, no other treatment.

### 11. Footer
- **Static.** "We're just getting started" + email links + 6-link About nav + 3 social icons (LinkedIn, YouTube, X) + copyright + Privacy Policy link.
- **Social icons** are simple monochrome SVGs.
- **Bottom strip** has the small Waabi logo.

## Hover / focus states (where observed)
- **Pink pill button** ("Join the team", "Explore the tech", etc.): scale or slight color shift on hover (verify per section).
- **"Get in touch" inline link:** underline on hover.
- **Partner tabs:** active tab has different weight/color; hover lightens.
- **Article cards in Insights:** image scales on hover (typical).

## Responsive observations
- Hero h1: `text-[7.2rem]` mobile → `text-[min(14vw, 15rem)]` desktop.
- H2: `text-[3.6rem]` mobile → `text-[6rem]` desktop.
- Padding scales down on mobile; horizontal padding drops from 24rem to a smaller value.
- "The technology" horizontal showcase: cards stack vertically on mobile (NOT horizontal).
- Partner tabs: stack on mobile.
- Insights cards: 1-up on mobile, multi-up on desktop.
- Announcement bar: still visible on mobile, slightly smaller text.

## Video assets
13 autoplay muted looped videos, all `playsinline` and `object-cover`. Hosted on `static.ext.waabi.ai`. Listed in the asset manifest when download runs.
