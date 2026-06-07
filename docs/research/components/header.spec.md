# Header Specification

## Overview
- **Target file:** `src/components/sections/Header.tsx`
- **Screenshot:** `docs/design-references/waabi-desktop-viewport.png` (floating pill near top)
- **Interaction model:** static; click logo to go home, click menu to open nav overlay

## DOM Structure
```
<header>
  <div class="ring">
    <div class="card">
      <a href="/" class="logo">
        <svg waabi-logo />
      </a>
      <nav>
        <a href="/">Home</a>
      </nav>
      <button aria-label="Menu">
        <svg menu-icon />
      </button>
    </div>
    <div class="pink-progress" />  <!-- bottom edge progress bar -->
  </div>
</header>
```

## Computed Styles

### header (outer container)
- position: fixed
- top: 3.4rem (mobile: 2.4rem)
- left: 0; right: 0
- margin: 0 auto
- z-index: 500
- display: flex
- flex-direction: column
- alignItems: center
- gap: 1rem
- width: calc(100vw - 2.4rem) on mobile; w-338 (33.8rem) on sm+.

### ring (1px translucent dark border wrapper)
- background: rgba(0, 0, 0, 0.15) — creates a 1px dark ring effect
- padding: 1px
- border-radius: 1.2rem (12px)
- display: flex
- alignItems: flex-start
- width: 100%
- height: 5.5rem (55px)

### card (inner white pill)
- background: rgb(255, 255, 255)
- border-radius: 1.1rem (11px)
- width: 100%
- height: 100% (53px)
- display: flex
- alignItems: center
- justifyContent: space-between
- padding: 0 1.2rem 0 0

### logo link
- display: flex
- alignItems: center
- width: 7.5rem (75px)
- height: 5.3rem (53px)
- color: rgb(25, 24, 24)
- SVG: 7.5rem × 2.3rem (auto height)
- margin-top: -0.4rem (to visually center the SVG within the 5.3rem tall logo box)

### home link
- font-size: 1.4rem
- font-weight: 500
- color: rgb(25, 24, 24)
- padding: 0 1.6rem
- display: flex
- alignItems: center
- height: 100%
- text-decoration: none

### menu button
- 3.6rem × 3.6rem
- border-radius: 50% (rounded-full)
- color: rgb(25, 24, 24)
- background: transparent
- display: flex
- alignItems: center
- justifyContent: center
- cursor: pointer
- SVG inside: 2.4rem wide × 1.6rem tall (12×8 viewBox source, scaled)

### pink progress bar (decorative, animated)
- position: absolute
- bottom: 0
- left: 2.5rem; right: 2.5rem
- height: 2px
- background: rgb(255, 44, 107)
- transform-origin: left
- transform: scaleX(0) by default; animates to scaleX(1) over page load

## States & Behaviors
- **Static position:** never changes as user scrolls.
- **Logo hover:** subtle scale or no change (verify visually).
- **Menu button hover:** background lightens (transparent → rgba(0,0,0,0.05)).
- **Pink progress bar:** animates from 0 to 100% width over ~1.5s on page load (decorative).

## Text Content (verbatim)
- Logo: "Waabi"
- Nav: "Home"
- Button: aria-label="Menu"

## Assets
- Logo: `src/components/icons.tsx` → `WaabiLogo`
- Menu icon: `src/components/icons.tsx` → `MenuIcon`

## Responsive Behavior
- **Desktop (1440px):** width 33.8rem, top 3.4rem.
- **Mobile (390px):** width calc(100vw - 2.4rem), top 2.4rem.
- **Tablet (768px):** same as desktop (sm: breakpoint at 640px applies).

## Implementation Notes
- Header is a client component (Lenis may need scroll listener if progress animates with scroll, but for now just animate on mount).
- The pink bar is decorative only in this clone — not driven by scroll. If desired, can use `useEffect` + `setTimeout` to scaleX from 0 to 1 on mount.
