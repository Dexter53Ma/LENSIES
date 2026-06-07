# AnnouncementBar Specification

## Overview
- **Target file:** `src/components/sections/AnnouncementBar.tsx`
- **Screenshot:** `docs/design-references/waabi-desktop-viewport.png` (top strip visible)
- **Interaction model:** static; clickable link; dismissible

## DOM Structure
```
<div role="region">
  <p>Let's talk autonomous trucking</p>
  <a href="https://tally.so/r/ob9a0M" target="_blank" rel="noopener">
    <span>Get in touch</span>
    <svg arrow-up-right />
  </a>
  <button aria-label="Close news banner">
    <svg x />
  </button>
</div>
```

## Computed Styles
- **Outer container:**
  - display: flex
  - alignItems: center
  - justifyContent: space-between
  - gap: 1rem
  - padding: 1.2rem 2.4rem
  - font-size: 1.2rem
  - color: rgb(25, 24, 24)
  - background: rgba(0, 0, 0, 0) (transparent — sits on white page bg)
  - font-family: NeueHaas (body)

- **Eyebrow text ("Let's talk autonomous trucking"):**
  - font-size: 1.2rem
  - font-weight: 500
  - line-height: 1.4
  - color: rgb(25, 24, 24)

- **Link ("Get in touch"):**
  - display: inline-flex
  - alignItems: center
  - gap: 0.4rem
  - font-size: 1rem
  - font-weight: 500
  - color: rgb(25, 24, 24)
  - text-decoration: none
  - Hover: underline appears

- **Arrow icon:**
  - 1.2rem × 1.2rem
  - Color: currentColor (inherits text)
  - Slightly offset right (used `top-1 left-1` to align text baseline)

- **Close button:**
  - 3.2rem × 3.2rem
  - display: flex
  - alignItems: center
  - justifyContent: center
  - border-radius: 50% (rounded-full)
  - color: rgb(25, 24, 24)
  - background: transparent
  - cursor: pointer
  - SVG inside: 1.6rem × 1.6rem (8 × 8 viewBox in source; scaled)

## States & Behaviors
- **Visible on page load.**
- **Click "Get in touch":** opens tally.so in a new tab.
- **Click × button:** banner collapses (sets `display: none` or unmounts). State stored locally — once dismissed, stays dismissed for the session (no localStorage required for clone).
- **Hover on "Get in touch":** underline appears.

## Text Content (verbatim)
- "Let's talk autonomous trucking"
- "Get in touch"

## Assets
- None (only inline SVG icons)

## Responsive Behavior
- **Desktop (1440px):** centered, normal text.
- **Mobile (390px):** text scales; arrow icon stays inline. No major change.
