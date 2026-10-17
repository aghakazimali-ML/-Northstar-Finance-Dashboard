# Selling this on Upwork — listing kit

Copy, adapt and delete what does not fit you. Prices are starting points only — check comparable listings on Upwork before you set yours.

## Title ideas

- Premium Finance Dashboard + SaaS Landing Page (React) — Budget vs Actual, Forecast, PDF/Excel Export
- White-Label Finance Dashboard Template, Customised to Your Brand
- Custom Budget-vs-Actual Web App with Animated Marketing Site

## Short pitch (paste into the project description)

> I will deliver a modern, animated finance web app branded for your company: a conversion-focused landing page plus a private Budget-vs-Actual dashboard that imports CSV/Excel, flags data-quality problems, analyses variances by account, department and service, forecasts the next 12 months and exports PDF, Excel, CSV and Power BI reports.
>
> Your financial files never leave the browser — there is no upload server to secure or maintain.

## What the client receives

- Landing page: hero with animated product preview, feature cards, how-it-works, product tabs, pricing toggle, testimonials, FAQ, call-to-action, footer
- Dashboard: overview, variance analysis, departments, rolling forecast, actions, import with mapping and review, data-quality centre
- Polished green theme in light and dark mode, re-colourable to the client's brand with two colour tokens
- Exports: PDF management report, Excel workbook, CSV, Power BI package
- Fully responsive layout; accessible focus states; reduced-motion support
- Source code, build, 26 automated finance-logic tests, customization guide and handover notes

## Suggested packages

| Package | Scope | Starting-point price* |
|---|---|---|
| **Basic — White-label install** | Rebrand (name, logo, colours), swap copy and contact details, deploy build | $150 – $300 |
| **Standard — Branded launch** | Basic + rewritten copy and pricing, client screenshots/sample data, domain + SEO tags, analytics, 1 revision round | $350 – $700 |
| **Premium — Custom build** | Standard + extra pages or features (auth, Stripe checkout, CRM/email capture, extra report types, API/database), 2 revision rounds | $800 – $1,500+ |

\*Illustrative only; adjust to your market, experience and the client's scope.

## Questions to ask before you quote

1. Brand name, logo files, brand colours and fonts?
2. Is the site a **product demo**, a **client-facing tool** or both?
3. Do you need user accounts, saved data across devices or billing? *(Not included in the base template — quote separately.)*
4. Default currency and fiscal year start? Any account/category naming that must match their ledger?
5. Domain, hosting platform and who manages DNS?
6. Which pricing plans / testimonials / FAQ will you supply?

## Be upfront about scope

State these in your proposal to avoid disputes:

- The dashboard processes files **in the browser**. Saved data lives only in that browser (IndexedDB) when the user opts in. There is **no multi-user sync, login or server-side storage** in the base template.
- The pricing section is **presentational** — plan buttons are links. Real checkout needs a payment provider (a Premium task).
- Testimonials and prices ship as **placeholders**; the client must supply real ones before launch.
- The sample company is **fictional** and clearly labelled.

## Delivery checklist

- [ ] Name, logo, favicon and copy replaced (`lib/site-config.ts`, `components/brand-mark.tsx`)
- [ ] Placeholder pricing/testimonials replaced; `showSampleNotice` set to `false`
- [ ] `demoMode` set to `false` in `lib/site-config.ts` so the client's dashboard opens empty (keep `true` only for a showcase site)
- [ ] Contact email, social links and domain set; metadata reviewed
- [ ] Screenshots in `public/screens/` regenerated with the client's look
- [ ] Brand colours set in `app/theme.css` (`--brand-1` / `--brand-2`, light and dark)
- [ ] `tsc`, `npm run lint`, `node scripts/test-company.cjs` and `npm run build` all pass
- [ ] Tested light/dark, desktop and phone, and a real CSV + XLSX import
- [ ] `LICENSE` reviewed (see below), source delivered, 5-minute screen recording of the handover

## Handover message (template)

> Hi {name}, your {brand} site and dashboard are ready. Live link: {url}. The repo includes a step-by-step guide (`docs/CUSTOMIZATION.md`) for changing text, prices, colours and the logo yourself. All checks pass: type-check, lint, 26 finance-logic tests and a production build. Your uploaded files are processed in the browser only. Please replace the sample pricing/testimonials with your own before announcing the launch. I'm happy to make {n} revision(s) within {days} days.

## Portfolio tips

- Lead with the animated hero GIF or a 30-second screen recording; add light and dark mode screenshots.
- Link the live demo with `?demo=1` so clients land on a populated dashboard.
- Mention measurable details: 26 automated finance tests, no server upload, four export formats.

## Licence

The bundled `LICENSE` is MIT, which lets any recipient use and resell the code. If you want to sell client-exclusive rights or restrict redistribution, replace it with your own client licence before delivery. Fonts are open-source (SIL OFL) and self-hosted.
