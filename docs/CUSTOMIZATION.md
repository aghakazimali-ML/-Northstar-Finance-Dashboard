# Customization guide

Everything a client normally asks to change lives in a handful of places. Edit, save — `npm run dev` hot-reloads.

## 1. Brand, copy, pricing, FAQ → `lib/site-config.ts`

| Section | Config key |
|---|---|
| Name, tagline, description, contact email, social links | `site` |
| Navigation links | `nav` |
| Hero headline / subtitle / buttons / trust row | `hero` |
| Marquee chips, stat counters | `capabilityChips`, `stats` |
| Feature cards (icon names: `git-compare`, `trending-up`, `shield-check`, `building`, `file-down`, `lock`) | `features` |
| How-it-works steps | `steps` |
| Product tabs (title, bullet points, screenshot path) | `showcase` |
| Plans, monthly/yearly prices, buttons | `pricing` |
| Testimonials | `testimonials` |
| FAQ | `faq` |
| Closing call-to-action, footer columns | `cta`, `footer` |

The hero headline uses a two-part pattern: `titleBefore` renders in the bold sans-serif and `titleAccent` renders in the italic serif gradient. Section headings follow the same pattern in `app/page.tsx` (`<Heading before="…" accent="…" />`).

**Sample content.** Pricing and testimonials ship as placeholders so the page looks complete in a demo. Replace them with real content, then set `showSampleNotice: false` to remove the small disclosure lines beneath those sections.

## 2. Colours and dark mode → `app/theme.css`

All colours are tokens at the top of the file:

```css
:root {
  --brand-1: #0b8a5f;   /* primary  */
  --brand-2: #2bb673;   /* secondary — the two form every gradient */
  --lime:    #c9f26b;   /* highlight card + badges */
  --ink:     #04241b;   /* sidebar / dark surfaces */
}
```

Change `--brand-1` and `--brand-2` and the landing page, dashboard, charts and buttons all re-theme. The dark-mode pair lives in `:root[data-theme='dark']` just below. Keep white text readable on the gradient: aim for a `--brand-1` that has at least 4.5:1 contrast against white.

The shipped look is a single green brand with a deep-green sidebar and a lime highlight card. Favourable/unfavourable variance keeps green/orange on purpose, because those colours carry meaning in the finance views.

Dark mode follows the visitor's toggle and is remembered in `localStorage`.

## 3. Logo and favicon

- `components/brand-mark.tsx` — inline SVG used in the nav, footer and dashboard sidebar. Replace the `<path>` with your logo (keep `fill="currentColor"` so it adapts).
- `public/favicon.svg` — browser tab icon.
- For a full wordmark image, swap the `<span>{site.name}</span>` in `components/landing/site-nav.tsx`, `app/page.tsx` (footer) and `app/dashboard/page.tsx` (`Brand`).

## 4. Typography

Figtree (UI) and Instrument Serif (italic accents) are imported in `app/layout.tsx` from Fontsource packages, so they are self-hosted. To change them: `pnpm add @fontsource-variable/<font>`, update the imports in `app/layout.tsx` and the `--font` / `--font-serif` tokens in `app/theme.css`.

## 5. Product screenshots and hero mock-up

- The tabbed "product" section uses `public/screens/overview.jpg`, `variance.jpg` and `forecast.jpg` (1440×900). Replace them with your own captures — open `/dashboard?demo=1`, size the window to 1440×900 and screenshot each tab.
- The hero mock-up in `app/page.tsx` (`HeroMock`) is hand-built HTML/SVG. Its KPI values and chart paths are plain text/markup — edit them freely.

## 6. Demo data → `lib/sample.ts`

The product ships in **demo mode**: `/dashboard` opens pre-filled with "Aurora Studio (demo)", a fictional company generated through the real importer (36 months of budget, actuals and forecast). The "Try sample data" button and `/dashboard?demo=1` load the same company.

- **Going live for a client:** set `demoMode: false` in `lib/site-config.ts`. The dashboard then opens empty and asks for a real import. The `?demo=1` link and the sample button keep working as an optional preview.
- **Different story:** edit the `lines` array in `lib/sample.ts` (accounts, base amounts, growth, and `bias` = how far actuals drift from budget) or change the company name in `buildSampleCompany`.
- **Test files:** `examples/aurora-studio-sample.csv` and `.xlsx` contain the same data in import format — use them to demonstrate the mapping and review screens. Regenerate them after editing the sample with `node scripts/make-sample-files.cjs`.
- **Remove the feature:** delete the button in `EmptyWorkspace` (`app/dashboard/page.tsx`) and the demo effect beside the theme effect.

## 7. Reorder, add or remove landing sections

`app/page.tsx` is a plain list of `<section>` blocks. Delete a block to remove a section, move it to reorder, and keep the nav links in `lib/site-config.ts` (`nav`, `footer`) in sync with the section `id`s.

## 8. Motion

| Effect | Where |
|---|---|
| Scroll reveal | `components/landing/reveal.tsx` (`delay` prop staggers) |
| Count-up numbers | `components/count-up.tsx` |
| Hero tilt + floating chips | `components/landing/hero-stage.tsx`, `.lp-chip` in `app/landing.css` |
| Spotlight cards | `components/landing/spotlight.tsx` |
| Dashboard entrance + hover | "Entrance animation" block in `app/theme.css` |

All animation is switched off for visitors with *reduce motion* enabled.

## 9. Monetising the pricing section

Plan buttons are plain links (`href` in `pricing.plans`). Point them at a Stripe/Paddle/Lemon Squeezy payment link, a booking page, or `mailto:`. The app itself has no user accounts or billing — see the limits in [UPWORK-LISTING.md](UPWORK-LISTING.md#be-upfront-about-scope).

## 10. Analytics, SEO and deployment

- Add an analytics `<script>` inside `<head>` in `app/layout.tsx`.
- Titles, descriptions and Open Graph tags come from `site` in `lib/site-config.ts`; add an `og:image` in `metadata` in `app/layout.tsx` if you have one.
- **Vercel:** the repo includes `vercel.json` (Next.js preset, `next build`, pinned pnpm install). Push it to GitHub and use *Add New → Project → Import*, or run `npx vercel --prod` in the project folder. Defaults are correct — no environment variables are needed. The two API routes run as serverless functions; everything else is static.
- `npm run build` produces `dist/client` (static assets) and `dist/server` (worker bundle plus `wrangler.json`). The project targets Cloudflare Workers through the vinext/Vite plugin and `npm start` previews that build locally. For other hosts follow the vinext deployment notes for your platform and test the production build before handing over.

## Checks before delivery

```bash
node node_modules/typescript/bin/tsc --noEmit   # types
npm run lint                                    # 0 errors expected
node scripts/test-company.cjs                   # 26 finance-logic tests
npm run build                                   # production build
```
