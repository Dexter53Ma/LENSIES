# ParallaxGrid Specification

## Overview
- **Target file:** `src/components/sections/ParallaxGrid.tsx`
- **Screenshot:** `docs/design-references/waabi-desktop-full.png` (mid-page area)
- **Interaction model:** scroll-driven (parallax + sticky text)

## DOM Structure
```
<section class="h-[150vh] bg-background relative overflow-clip">
  <!-- vertical line on left edge -->
  <div class="absolute top-0 left-0 w-30 h-[150vh] bg-..." />

  <!-- Image grid (4 vertical columns of 4 cells) -->
  <div class="absolute inset-0 origin-top">
    {columns.map((col, i) => (
      <div class="absolute flex flex-col justify-between h-[150vh] will-change-transform" style={{ left/right positions, translateY }}>
        {col.cells.map(cell => (
          <div class="rounded-[X] bg-cream relative h-133 w-133 overflow-clip">
            {cell.image ? <img src={cell.image} alt="Image parallax" class="size-full object-cover" /> : null}
          </div>
        ))}
      </div>
    ))}
  </div>

  <!-- Centered text overlay -->
  <div class="flex-center absolute inset-0 flex-col gap-X">
    <div class="text-panel">
      <h2>We built our own road.</h2>
      <p>Our revolutionary Physical AI Platform enables...</p>
    </div>
    <div class="preview-image">
      <img src={previewImage} />
    </div>
  </div>
</section>
```

## Computed Styles

### Section
- position: relative
- width: 100%
- height: 150vh
- overflow: clip
- background: white
- color: dark (text is dark on white)

### Vertical left line
- position: absolute
- top: 0, left: 0
- width: 3rem
- height: 150vh
- (subtle border or background)

### Image grid container
- position: absolute, inset: 0
- origin: top
- Contains 4 column wrappers

### Column wrappers (4 total)
- position: absolute
- display: flex, flex-direction: column
- justifyContent: space-between
- height: 150vh
- transform: translateY(varies per column)
- Column positions (desktop):
  - Col 1: left: 2.4rem
  - Col 2: left: calc(16.667%) (= 1/6)
  - Col 3: right: calc(16.667%)
  - Col 4: right: 2.4rem

### Cell (16 total = 4 cols × 4 rows)
- position: relative
- width: 133px × height: 133px (scales to `calc(133/1440 * 100vw)` on md+)
- border-radius: ~ 12-16px (uses CSS var `rounded-calc` = 1.2rem)
- background: #e8e6e3 (cream) for empty cells
- overflow: clip

### Image inside cell
- size: 100% × 100%
- object-fit: cover

### Text overlay container
- position: absolute, inset: 0
- display: flex, flex-direction: column
- justifyContent: center
- alignItems: center
- gap: (4rem-ish)
- pointer-events: none

### Text panel
- max-width: ~55rem (550px)
- text-align: center
- h2: large serif (Zagma), 4rem, weight 400
- p: sans (NeueHaas), 1.4rem, weight 500, color #191818

### Preview image (below text)
- 133px × 133px rounded
- background: cream
- overflow: clip
- image: object-cover

## Image content per column (alternating pattern)
- Col 1 (left, 4 cells): [img, empty, img, img]
- Col 2 (1/6 left, 4 cells): [img, empty, img, img-faded]
- Col 3 (1/6 right, 4 cells): [img, img, empty, img]
- Col 4 (right, 4 cells): [img, empty, img, img]

## States & Behaviors
- **Static on load:** columns at their initial Y positions (some translated +600px, others at 0).
- **Scroll-driven parallax:** as user scrolls through this section, the columns translate at different rates. The `will-change-transform` class hints at GPU compositing.
- **Text panel:** static; remains centered as the grid parallax moves.

## Text Content (verbatim)
- Heading: "We built our own road."
- Body: "Our revolutionary Physical AI Platform enables — for the first time ever — true scale, generalizing to different form factors, geographies, and environments. This breakthrough is powered by the same AI model acting as a shared brain for both autonomous trucks and robotaxis."

## Assets
- 13 parallax images in `public/images/parallax-*.{jpg,png}`
- Preview image: `public/images/parallax-1.jpg` (top of col 1) or similar

## Responsive Behavior
- **Desktop (1440px):** 4 columns visible, cells are 133px scaled to viewport.
- **Mobile (390px):** cells smaller, columns repositioned; the `md:` prefix gates most desktop styles.

## Implementation Notes
- This is a client component (scroll-driven translation).
- The "parallax" effect can be implemented by binding `transform: translateY(...)` to a scroll progress 0–1.
- For the clone, a simpler approach: just use the static positions; the visual structure is the most important part.
