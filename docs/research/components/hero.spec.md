# Hero Specification

## Overview
- **Target file:** `src/components/sections/Hero.tsx`
- **Screenshot:** `docs/design-references/waabi-desktop-viewport.png`
- **Interaction model:** scroll-driven (pinned content)

## DOM Structure
```
<section class="hero-relative h-[250vh]">  <!-- 250vh scroll runway -->
  <div class="sticky top-0 h-screen">
    <!-- Background video fills the sticky panel -->
    <video autoplay loop muted playsinline class="size-full object-cover" />
    <div class="gradient-overlay absolute inset-0" />  <!-- bottom gradient -->

    <!-- Content -->
    <div class="container-x pt-[var(--padding-y)] pb-[var(--padding-y)] flex flex-col gap-X">
      <p class="pioneering">Waabi is pioneering the future of Physical AI.</p>
      <h1>
        <span>Built to think.</span>
        <span>Born to haul.</span>
      </h1>
    </div>

    <!-- Scroll-down button bottom-right -->
    <button class="scroll-down" aria-label="Scroll Down">
      <svg down-arrow />
    </button>
  </div>
</section>
```

## Computed Styles

### Hero section
- position: relative
- width: 100%
- height: 250vh (runway)
- display: flex, flex-direction: column

### Sticky content panel (inside section)
- position: sticky
- top: 0
- height: 100vh
- display: flex
- flex-direction: column
- justify-content: flex-end (or items end)
- padding: var(--padding-y) 2.4rem

### Video
- position: absolute
- inset: 0
- width: 100%, height: 100%
- object-fit: cover
- autoplay, loop, muted, playsinline

### Gradient overlay
- position: absolute, inset: 0
- background: linear-gradient(oklab(0 0 0 / 0.5) 0%, rgba(0,0,0,0) 100%)
- pointer-events: none

### Pioneering line
- font-family: Zagma
- font-size: 4rem (mobile 2.4rem)
- font-weight: 400
- line-height: 1.1 (44px / 40px)
- letter-spacing: -0.03em (-1.2px)
- color: rgb(255, 255, 255)
- max-width: 49.5rem (495px)
- text-align: start

### H1 ("Built to think. Born to haul.")
- font-family: Zagma
- font-size: 15rem (mobile 7.2rem) → clamp: min(14vw, 15rem)
- font-weight: 400
- line-height: 0.85 (127.5px / 150px)
- letter-spacing: -0.048em (-7.2px)
- color: rgb(255, 255, 255)
- text-wrap: balance
- Words split into individual spans: "Built", "to", "think.", "Born", "to", "haul."

### Scroll-down button
- 2.4rem × 2.4rem (24x24)
- background: rgb(255, 44, 107) (pink)
- border-radius: 50%
- display: flex, alignItems: center, justifyContent: center
- cursor: pointer
- SVG: 2.4rem × 2.4rem, white down arrow
- Position: bottom-right of sticky panel, with 2.4rem right padding
- Hover: slight scale (transform: scale(1.1))

## States & Behaviors
- **Pioneering line:** visible at top of hero on load; fades out (opacity 1 → 0) as user scrolls within the section. The h1 remains anchored to bottom.
- **H1:** static; remains visible throughout the 250vh section. The h1 acts as the bottom-anchored reveal.
- **Scroll-down click:** triggers Lenis smooth-scroll to the next section (the "We built our own road" parallax grid).
- **Video:** autoplays muted looped; pauses when out of viewport (browser default).

## Text Content (verbatim)
- Pioneering: "Waabi is pioneering the future of Physical AI."
- H1: "Built to think." / "Born to haul."

## Assets
- Hero video: `public/videos/hero.mp4` (autoplay, loop, muted, playsinline)
- Down arrow icon: `src/components/icons.tsx` → `ArrowDownIcon`

## Responsive Behavior
- **Desktop (1440px):** h1 15rem, pioneering 4rem, full video.
- **Mobile (390px):** h1 7.2rem, pioneering 2.4rem.
- **Video covers full viewport** at all sizes; gradient overlay ensures text legibility.

## Implementation Notes
- This is a **client component** because of scroll behavior and Lenis.
- The sticky content uses `position: sticky; top: 0; height: 100vh` inside a `250vh` container.
- Pioneering line fade is driven by `IntersectionObserver` on the section: when the section is at the top of the viewport, opacity=1; when scrolled past 50% of the section, opacity=0. Simpler: use a scroll progress 0–1 mapped to opacity 1–0.
- The h1 is the bottom-anchored visual; the pioneering line is a smaller line that scrolls/fades as the user moves into the section.
