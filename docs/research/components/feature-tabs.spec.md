# FeatureTabs Specification

## Overview
- **Target file:** `src/components/sections/FeatureTabs.tsx`
- **Screenshot:** `docs/design-references/waabi-desktop-full.png` (after the parallax grid, dark left panel)
- **Interaction model:** scroll-driven sticky tabs

## DOM Structure
```
<section class="h-[200vh] bg-background text-foreground relative">
  <!-- decorative left vertical lines + a small image at top -->
  <div class="left-rule-1 absolute top-[25vh] left-0 h-[25vh] w-30" />
  <div class="left-rule-2 absolute top-[100vh] left-0 h-[200vh] w-30" />
  <div class="decorative-img absolute -top-133 left-[16.667%]" />

  <div class="container">
    <div class="row flex w-full gap-40 md:h-full md:justify-between">

      <!-- LEFT: sticky media panel (50% width) -->
      <div class="col-left relative flex flex-1 flex-col md:h-full md:max-w-527">
        <div class="md:sticky md:top-0 md:flex md:h-screen md:items-center">
          <div class="media">
            <img src="/images/feature-safe.png" alt="Unlocking scale in the real world." class="size-full object-cover" />
          </div>
        </div>
      </div>

      <!-- RIGHT: heading (scrolls out) + sticky tab stack -->
      <div class="col-right relative flex flex-1 flex-col md:h-[200vh] md:max-w-370">
        <div class="heading md:flex md:h-screen md:flex-wrap md:items-center">
          <h2>Unlocking scale in the real world.</h2>
          <p>We deliver a product that's faster, safer, more scalable, and efficient—unlocking the true potential of autonomous transportation.</p>
        </div>
        <div class="tabs sticky top-0 hidden md:flex md:h-screen md:flex-col md:items-start md:justify-center md:gap-20 -mt-[50svh]">
          {features.map(feature => (
            <div class="feature-row">
              <p class="feature-label">{feature.label}</p>
              <p class="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
```

## Computed Styles

### Section
- position: relative
- width: 100%
- height: 200vh
- background: white
- color: dark

### Container / row
- display: flex
- gap: 4rem (40px)
- width: 100%
- max-width: ~123rem (1230px)
- padding: 0 9rem (90px) on desktop

### Col-left
- flex: 1
- max-width: 52.7rem (527px)
- position: relative

### Sticky media wrapper (inside col-left)
- position: sticky
- top: 0
- height: 100vh
- display: flex
- alignItems: center

### Media (image)
- full width within col-left
- object-fit: cover
- aspect ratio: roughly 4:5 (portrait)
- border-radius: 1.2rem (12px)

### Col-right
- flex: 1
- max-width: 37rem (370px)

### Heading (first child of col-right, scrolls out)
- height: 100vh (one viewport)
- display: flex, flex-wrap, alignItems: center
- h2: Zagma, 6rem desktop / 4rem mobile, line-height 0.9, letter-spacing -0.03em
- p: NeueHaas, 1.4rem, weight 500, color #191818

### Tabs panel (sticky, second child of col-right)
- position: sticky
- top: 0
- height: 100vh
- display: flex
- flex-direction: column
- alignItems: flex-start
- justifyContent: center
- gap: 2rem
- margin-top: -50svh (shifts up to align with viewport center)
- pointer-events: none (clickable children inside)

### Feature row
- display: flex, flex-direction: column
- gap: 0.8rem
- label: Zagma 4rem desktop / 2.4rem mobile, line-height 1.1, letter-spacing -0.02em
- description: NeueHaas, 1.4rem, color #191818, line-height 1.4
- Inactive rows: opacity 0.4
- Active row: opacity 1, full description visible

## States & Behaviors

### Scroll-driven active state
- 3 features stacked vertically, each takes ~50vh of scroll progress.
- As user scrolls:
  - 0% → 33%: Safe is active (opacity 1, description visible)
  - 33% → 66%: Scalable is active
  - 66% → 100%: Practical is active
- Implementation: IntersectionObserver on each feature row, or compute scroll progress and set active index.

### Sticky behavior
- Heading scrolls out (it's not sticky, just one viewport tall).
- Tabs panel sticks at top: 0 once it reaches the viewport top.

## Text Content (verbatim)
- Heading: "Unlocking scale in the real world."
- Subhead: "We deliver a product that's faster, safer, more scalable, and efficient—unlocking the true potential of autonomous transportation."
- Features:
  - "Safe" — "The combination of advanced AI and neural simulation sets a new standard for the entire industry."
  - "Scalable" — "Built to scale across geographies, vehicle types, and operating domains without reengineering."
  - "Practical" — "Designed for real-world deployment with cost-effective hardware and minimal infrastructure requirements."

## Assets
- Image: `public/images/feature-safe.png` (the dark right-side image)

## Responsive Behavior
- **Desktop (1440px):** 2-column layout (50/50 split with max-widths).
- **Mobile (390px):** stacks vertically; tabs section hidden (uses `md:hidden` block separately); image shown in a different layout.

## Implementation Notes
- This is a client component.
- Use IntersectionObserver to determine active feature. Each feature row is observed; when its top crosses the viewport center, it becomes active.
- Apply opacity transitions on label and description.
