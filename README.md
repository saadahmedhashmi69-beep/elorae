# ELORAÉ™ — DuoSmooth

A premium single-product e-commerce funnel for **ELORAÉ™ DuoSmooth**, a
double-head electric body shaver for women, built for UAE Meta/Instagram
ad traffic on a limited testing budget. Next.js (App Router) + TypeScript +
Tailwind CSS, no database, deploys straight to Vercel.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** — brand palette + fonts defined in `app/globals.css`
- **Zustand** — cart state, persisted to `localStorage`
- No database, no payment processor, no custom server — see "Order handling" below.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in what you have (all optional)
npm run dev
```

Open http://localhost:3000.

## Configuration

Every business-editable value — pricing, WhatsApp number, COD availability,
delivery estimates, return policy, analytics IDs — lives in
[`lib/config.ts`](./lib/config.ts) and is sourced from environment variables.
See [`.env.example`](./.env.example) for the full list, what each variable
does, and where to get it. Nothing is hard-coded across components.

Bundle pricing (1 / 2 / 3 devices) is computed from the single-unit price
plus a configurable discount percentage — not invented numbers. Set
`NEXT_PUBLIC_BUNDLES_ENABLED=false` to sell one unit only.

Product claims (rechargeable, waterproof, compact/travel-friendly, easy to
clean) are gated behind `NEXT_PUBLIC_ATTR_*` flags, all `false` by default.
Flip them to `true` only once verified against the real product spec sheet —
the site never guesses.

## Order handling (no database)

This is a single-product COD-first store on a tight initial budget, so there
is intentionally **no database**. When a customer places an order:

1. The order is validated and POSTed to `app/api/orders/route.ts`, which logs
   it to the server console (visible in Vercel's function logs) and returns
   an order reference.
2. The customer lands on `/order-confirmed` and is invited to confirm the
   order over WhatsApp — the message is pre-filled with the full order
   summary, so your WhatsApp number is the live order inbox from day one.

This keeps the project deployable with zero infrastructure. When order
volume justifies it, swap the console log in `app/api/orders/route.ts` for a
real integration (Google Sheets via Apps Script webhook, Airtable, a proper
database, etc.) — the validated `OrderPayload` shape in `lib/types.ts` is
ready to hand to any of those.

## Product imagery

There is no licensed product photography yet, so every "photo" slot on the
site renders original vector artwork via
[`components/ui/DeviceIllustration.tsx`](./components/ui/DeviceIllustration.tsx)
(`<ProductPlaceholder slot="..." />`). This is not abstract placeholder
line-art — it's a detailed, shaded, full-color illustration of the actual
product design (ribbed cylindrical wand, foil-disc head at one end,
precision trimmer cap at the other, rose-gold collars, oval button),
grounded in real reference photography of the physical unit. It supports
scene compositions (`scene="shelf"` for lifestyle, `scene="bag"` for travel,
`scene="duo" | "trio"` for multi-unit bundles) so the whole site stays
visually consistent without using any imagery the business doesn't hold
rights to.

To swap in real photography once it's available:

1. Add images to `public/images/product/` (e.g. `hero.jpg`, `double-head.jpg`,
   `lifestyle.jpg`, `bundle-3pc.jpg`).
2. Replace the relevant `<ProductPlaceholder slot="..." />` usage with
   `next/image`, e.g.:
   ```tsx
   import Image from "next/image";
   <Image src="/images/product/hero.jpg" alt="ELORAÉ DuoSmooth" fill className="object-cover rounded-[2rem]" />
   ```

## Replacing demo reviews

`components/sections/Reviews.tsx` ships with clearly labeled **sample**
review cards so the layout can be evaluated before real reviews exist. Do
not remove the "Sample" labeling until you replace the content with genuine,
verified customer reviews — see the comment at the top of that file.

## Analytics & Meta Pixel

`lib/analytics.ts` provides a small event abstraction
(`trackViewContent`, `trackAddToCart`, `trackInitiateCheckout`,
`trackPurchase`, `trackLead`, `trackWhatsAppClick`) used throughout the app.
Every function is a safe no-op until you set `NEXT_PUBLIC_META_PIXEL_ID`
and/or `NEXT_PUBLIC_GA_MEASUREMENT_ID` — the site builds and runs fully
without them. `Purchase` only fires after an order is successfully submitted,
never speculatively. UTM parameters and `fbclid` are captured on landing and
carried through to the order payload for attribution.

## Deploying to Vercel

1. Push this repository to GitHub (already done if you're reading this from
   the repo).
2. In Vercel: **New Project → Import** this GitHub repository.
3. Add the environment variables you want from `.env.example` (all optional —
   the build succeeds with none set).
4. Deploy. You'll get a `*.vercel.app` URL immediately; a custom domain can
   be attached later in Vercel project settings.

No custom server, Docker, or database setup is required.

## Internal dev tools

`/dev/roas-calculator` is a small internal ROAS/profitability calculator
(returns 404 in production, excluded from `robots.txt`). It's a planning
aid only — it does not represent guaranteed results.
