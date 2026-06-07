# Lensies

Real estate photography, videography, drone, events, and curated experiences — built for Marrakech briefs.

A Next.js 16 / React 19 / Tailwind v4 site with full English ↔ French localization, an AI booking concierge, and a static-first deployment target.

## Stack

- **Framework:** Next.js 16.2.7 (App Router, Turbopack) + React 19.2.4
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`), `tw-animate-css`
- **Fonts:** Local `Zagma` (display) + `Neue Haas Grotesk` (body) — `next/font/local`
- **i18n:** Cookie-driven `en` / `fr` switcher with full dictionary coverage (`src/i18n/`)
- **Animation:** `framer-motion`, `lenis` smooth scroll, IntersectionObserver-based reveal
- **AI:** `/api/support` route backed by OpenAI (`gpt-4o-mini`) with a deterministic keyword fallback
- **Dates:** `date-fns`, `react-day-picker` (booking modal)
- **Icons:** `lucide-react`, `react-icons`

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (22 static + dynamic pages)
npm run start      # serve production build
npm run typecheck  # tsc --noEmit
```

The locale switcher lives in the header. Set the `lensies-locale` cookie to `fr` to start in French, or use the in-app toggle.

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need. All variables are optional — the site runs end-to-end without them, and the AI concierge uses a built-in keyword fallback.

| Variable           | Default                     | Purpose                                            |
| ------------------ | --------------------------- | -------------------------------------------------- |
| `OPENAI_API_KEY`   | _(unset → fallback)_        | Enables real AI replies for `/api/support`         |
| `OPENAI_BASE_URL`  | `https://api.openai.com/v1` | Override for Azure / OpenAI-compatible providers   |
| `OPENAI_MODEL`     | `gpt-4o-mini`               | Chat model for the concierge                       |

## Deployment — Netlify

This repo ships with a `netlify.toml` configured for the official
[`@netlify/plugin-nextjs`](https://github.com/netlify/next-runtime).

1. Push the repo to GitHub (see below).
2. In Netlify, **Add new site → Import an existing project → GitHub → `Dexter53Ma/LENSIES`**.
3. Netlify auto-detects the `netlify.toml` and sets:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node: 20.18.1
   - Plugin: `@netlify/plugin-nextjs`
4. (Optional) In **Site settings → Environment variables**, add `OPENAI_API_KEY` (and friends) to enable the AI concierge. Leave them blank to use the built-in fallback.
5. **Deploy site.** The first build takes ~2–3 min; subsequent deploys ~1 min.

Continuous deploys are automatic on every push to `master`.

### Manual deploy via Netlify CLI

```bash
npm i -g netlify-cli
netlify login
netlify init        # link the repo to a Netlify site
netlify deploy --prod
```

## Project layout

```
src/
  app/                 # App Router pages + route handlers
    about/  services/  portfolio/  pricing/  contact/  blog/  api/support/
    layout.tsx         # Root layout (Header + Footer + BackToTop + AISupport)
    page.tsx           # Home
    sitemap.ts         # Auto-generated sitemap (uses FR + EN slugs)
    robots.ts          # robots.txt
  components/          # UI primitives + section components
    sections/          # Hero, Platforms, ParallaxGrid, FeatureTabs, …
    BookingModal.tsx   # 6-step booking wizard
    AISupport.tsx      # AI concierge floating panel
    LanguageSwitcher.tsx
    reveal.tsx         # IntersectionObserver reveal primitive
  i18n/                # en.ts, fr.ts, types.ts, provider, server helpers
  lib/                 # generic helpers
public/
  images/  videos/  fonts/  articles/  seo/  robots.txt  sitemap.xml
```

## Deployment — generic Node server

The app is a standard Next.js 16 app — any platform that supports Node 20.18+ will run it.

```bash
npm run build
npm run start        # listens on $PORT (default 3000)
```

Required Node features: ESM, `node:async_hooks`, `node:fs/promises`. No native bindings.

## License

Private project — © 2026 Lensies Studio. All rights reserved.
