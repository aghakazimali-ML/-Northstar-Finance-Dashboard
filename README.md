# Northstar — Finance Intelligence Workspace

A premium, white-label **Budget vs Actual** web app: a conversion-focused marketing site plus a private, browser-based finance dashboard. React / TypeScript / Vite (vinext) — no backend and no database required.

| | |
|---|---|
| **`/`** | Animated landing page: hero with live product mock-up, capability marquee, count-up stats, feature cards, how-it-works, product tabs, pricing toggle, testimonials, FAQ, CTA, footer |
| **`/dashboard`** | The finance workspace: overview, variance analysis, departments, rolling forecast, actions, data-quality review, import and export |
| **`/dashboard?demo=1`** | Opens the dashboard pre-loaded with a clearly labelled fictional company. Demo mode is on by default, so `/dashboard` is pre-filled too; set `demoMode: false` in `lib/site-config.ts` for a client's live site |

**Highlights**

- One polished green brand in light and dark mode; change two CSS variables for a fully custom palette.
- One config file (`lib/site-config.ts`) controls brand name, copy, pricing, testimonials, FAQ, links and default colours.
- Scroll-reveal, count-up numbers, floating UI chips, spotlight cards, animated charts and gradient text — all dependency-free and disabled automatically for visitors who prefer reduced motion.
- Fully responsive (desktop, tablet, phone) with accessible controls and focus states.
- Private by design: files are parsed in the browser; there is no financial-file upload endpoint.

## Quick start

Node 22.13+ is required. No API key is needed.

```bash
node scripts/install-ci.mjs     # installs dependencies (or: pnpm install)
npm run dev                     # http://localhost:5173
npm run build                   # production build into dist/
npm start                       # preview the production build locally
```

## Deploy to Vercel (2 minutes)

`vercel.json` is included and the production build (`next build`) is verified. Either push the folder to GitHub and import it at vercel.com/new, or run `npx vercel --prod` inside the folder and follow the login prompt. No environment variables are needed. Test files for the import flow are in `examples/` (`aurora-studio-sample.csv` / `.xlsx`).

## Make it yours (10 minutes)

1. **Brand & copy** — edit `lib/site-config.ts` (name, tagline, hero text, features, pricing, testimonials, FAQ, contact email, social links).
2. **Colours** — the product ships in one green brand, light and dark. Edit `--brand-1` / `--brand-2` in `app/theme.css` (plus the dark pair in `:root[data-theme='dark']`) to re-colour everything for a client.
3. **Logo** — replace the SVG in `components/brand-mark.tsx` and `public/favicon.svg`.
4. **Screenshots** — replace `public/screens/*.jpg` (1440×900) with shots of your own data.
5. **Placeholders** — pricing and testimonials are sample content. Replace them, then set `showSampleNotice: false`.
6. **Domain & SEO** — set `site.url` and `site.description`; page titles and Open Graph tags are generated from the config.

The full guide is in [docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md). A ready-to-use freelance listing, delivery checklist and client handover message are in [docs/UPWORK-LISTING.md](docs/UPWORK-LISTING.md).

## Project structure

```
app/
  page.tsx            landing page (server component)
  landing.css         landing styles (.lp-*)
  theme.css           design tokens, dark mode, dashboard theme + animations
  globals.css         dashboard layout styles
  dashboard/page.tsx  the finance workspace
components/
  landing/            nav, reveal, spotlight, pricing, showcase, FAQ, hero stage
  count-up.tsx        animated numbers (landing + dashboard KPIs)
  theme-store.ts      light/dark hooks
lib/
  site-config.ts      ★ brand, copy, pricing, FAQ — edit this first
  sample.ts           fictional demo company (opt-in, generated via the real importer)
  company.ts importer.ts exports.ts   finance engine, import validation, PDF/Excel/CSV/Power BI exports
public/screens/       product screenshots used by the landing page
```

## Import

1. Select **Import company data**. Name the company and select currency, fiscal start, number format and source signs.
2. Add CSV, TSV or XLSX files, or paste CSV. Multiple files and sheets can be combined. The downloadable template has blank headers only.
3. Map columns. Required: `month`, `account`, `category`, `amount`. Recommended: `scenario`, `department`, `service`, `account_name`, `version`, `currency`, `source_id`.
4. Review errors, omissions and inferred fields. Fix invalid rows or explicitly exclude them. Accept visible limitations before applying. The previous dashboard stays intact until successful application.
5. Keep missing values unavailable, or explicitly approve zero assumptions. Confirm omitted P&L categories have no activity only after reconciling the full source P&L.

Limits: eight files per selection, 10 MB each, 20,000 combined records, 25 workbook sheets. Save XLS as XLSX first. Put unique column headers on the first populated row. Narrative workbook sheets may be skipped. Excel formulas use saved results; recalculate and save first. Actual records are required. Wide tables with two or more Actual/Budget/Forecast columns are normalized automatically.

Dates use YYYY-MM, ISO dates or English month/year. Ambiguous numeric dates are rejected. Amounts use the selected decimal format with at most two decimals. Blank amounts are invalid. Categories: revenue, direct_cost, opex, depreciation, interest, tax; common aliases such as COGS also map. Revenue and expenses are positive magnitudes by default; debit-positive GL imports invert revenue. Genuine reversals are retained.

## Storage

Files are processed in the browser, without a financial-file upload endpoint. Companies are session-only by default. **Remember on this browser** saves normalized records to IndexedDB on that browser/device. Reapplying without that option removes an older remembered copy of the same company. Browser storage is not a backup, encrypted vault or company-role boundary. There is no team synchronization or multi-user approval workflow. Action notes are session-only.

## Financial controls

Raw variance = actual minus budget. Expense favorability reverses the sign. Percentage variance divides by absolute budget; zero budget produces N/A. Totals aggregate cents; margins divide aggregate profit by aggregate revenue. Missing account/month/dimension observations remain unavailable unless an explicit zero policy is approved and disclosed. Omitted P&L categories prevent profit calculation unless confirmed as having no activity. An account absent from every source file cannot be detected: management must reconcile completeness.

EBITDA is revenue less direct costs and opex, excluding depreciation, interest and tax. Shared costs are not allocated arbitrarily; missing dimensions remain Unassigned. Twelve forecast months follow the company's latest close and use imported records only. Sensitivity sliders are unapproved previews and never alter the baseline. Revenue balances alone cannot establish volume/rate/mix or operational causes. Profit is not cash flow. Single currency only; no FX conversion or consolidation.

## Exports

- PDF: executive KPIs, actual/budget revenue plot, observed variances, account detail, coverage, assumptions and page numbers.
- Excel: styled management summary, account variances, monthly trend, departments, forecast, import issues, assumptions and normalized company source rows. Values are report-time snapshots, not live formulas. Unavailable values remain blank.
- CSV: current account variance scope with period, dimensions, currency, version, status and missing counts. Formula-like strings are escaped.
- Power BI: company CSV, selected summary benchmarks, review issues/policies and starter measures. A completed PBIX is not included. Raw SUM measures alone do not reproduce missing-observation controls.

Summary sheets and PDF use selected filters. Imported data in Excel and financials.csv in Power BI contain the full active company's records. Forecast exports use the imported baseline, not sensitivity sliders.

## Python / Excel / Power BI / React

React/TypeScript powers the app. Excel supports real imports and exports; Power BI receives company-specific data/benchmarks. Python provides optional local validation and exact Decimal observed totals, not an independent management-report engine.

```bash
pip install -r python/requirements.txt
python python/engine.py company.csv --currency USD > review.json
uvicorn api.app:app --host 127.0.0.1 --port 8000
```

The optional API accepts normalized records at POST /api/validate. It is not connected to the hosted dashboard. Former preloaded report/scenario endpoints return 410. The optional Python API ships no demo data. (The web app's opt-in **Try sample data** button builds a clearly labelled fictional company in the browser, session-only, through the same import pipeline.)

## Checks

```bash
python3 -m unittest discover -s tests -v
node scripts/test-company.cjs
node node_modules/typescript/bin/tsc --noEmit
npm run build
```

See docs/CONTROLLER-AUDIT.md, docs/ARCHITECTURE.md and docs/WORKFLOW.md. Test fixtures are QA-only and never loaded by the app.

## Design

Design language inspired by the public Finzo fintech template preview (21st.dev / getastrothemes): airy light canvas, Figtree + Instrument Serif italic accents, pill gradient buttons, floating product chips, marquee rows and a toggle-driven pricing section. All code, copy, icons, charts and components in this repository were written from scratch — no Finzo source files, images or text are included. Fonts (Figtree, Instrument Serif, Inter) are open-source under the SIL OFL and self-hosted via Fontsource, so there are no external font requests.

When you list or deliver this project, describe it by what it is (a finance dashboard template) and avoid using third-party template names or logos in titles and branding.
