# Financial controller and analytics review — Northstar v2

Review date: 16 October 2026. Scope: application logic, import behavior, financial presentation and generated reports. This is a software/controller review, not an independent audit opinion on a company's financial statements. No real company ledger was supplied.

## Overall assessment

The earlier release was a fixed synthetic demonstration. This release is suitable for reviewing imported single-currency management data with explicit limitations. It is not an accounting system, statutory reporting package, company document vault or shared approval platform. Source-ledger reconciliation remains essential.

## Findings and changes

| Priority | Finding | Implemented control | Residual limitation |
| --- | --- | --- | --- |
| High | Fixed fictional data could be mistaken for company performance | Removed preloaded records, legacy generator and demo downloads; empty onboarding now requires reviewed imports | Earlier exported files remain the user's historical copies |
| High | No company import/review path | CSV, TSV and XLSX file picker, drag/drop, paste, field mapping, previews and staged application | Tidy data tables required; complex ERP layouts need preparation |
| High | Missing values could look like zero or a complete profit figure | Null availability, inferred account/month/dimension coverage, explicit zero policies and P&L assertion | Entirely omitted accounts and departments cannot be discovered from files alone |
| High | Bad upload could overwrite usable results | Structural blockers, invalid-row exclusion consent, validation before replacement, persistence before active-snapshot switch | Users must assess whether exclusions invalidate financial completeness |
| High | Mixed currencies and plan versions could corrupt comparisons | One currency per company; reject mismatches; separate budget/forecast version selection; duplicate plan grain controls | No FX, consolidated entities, intercompany elimination or currency translation |
| High | Forecast dates were fixed | Company close determines twelve future months; no invented forecast for absent records | Sensitivity is a local unapproved adjustment, not a driver-built planning model |
| Medium | Variance signs and margins can mislead | Actual minus budget; cost favorability reversed; zero denominator N/A; aggregate margins | Management must check chart-of-account classification and GL source signs |
| Medium | Duplicate IDs/classification conflicts could double-count | Duplicate source ID, plan grain and account category checks; repeated ID-less actuals warned | Identical legitimate actual postings are retained when no unique IDs exist |
| Medium | Reports lacked scope, provenance and quality context | Scoped PDF pack, Excel schedules/source ledger, issue and policy sheets, timestamp, currency, versions and missing counts | Excel values are static; full source sheet spans the active company's records |
| Medium | Financial differences might imply unsupported causes | Variance contribution is shown as accounting impact; narratives request operational evidence | No volume/rate/mix explanation without operational inputs |
| Medium | Browser persistence could be confused with shared company storage | Session-only default, explicit IndexedDB option, clear local-only notices | No user/role isolation between people using the same browser profile, cloud backup or collaboration |
| Low | Generic typography, low visual hierarchy | Bundled Inter sans-serif; blue/mint/violet/amber palette; plot, donut and signed/grouped bars; consistent filters and dialogs | Colors supplement labels; native phone/browser coverage is not exhaustive |

## Calculation basis

Revenue and ordinary expenses are positive magnitudes. Debit-positive GL imports invert revenue. Reversals remain signed. EBITDA = revenue − direct costs − opex; D&A, interest and tax are excluded. Gross and EBITDA margins are ratios of aggregate totals. Missing plan/actual observations remain unavailable unless explicitly approved as zero, with counts and assumptions disclosed. Only one plan version is used at a time. Shared costs receive no arbitrary allocation. Pie/donut composition uses positive observed expense balances and excludes reversals with disclosure.

The inferred expected account grid uses the fiscal-year observations through the reporting month and selected dimensions/version. It is conservative when accounts genuinely start or stop during the year; explicit no-activity confirmation or prepared zero observations may be needed. It cannot prove that source extracts contain every ledger account. Forecast coverage uses the selected imported forecast's account grid. Future months without observations remain unavailable.

## Validation evidence

- 26 automated TypeScript/import/export checks: financial reconciliation, monthly/YTD periods, missing actuals and budgets, explicit-zero disclosure, missing categories, versions, fiscal boundaries, twelve-month forecast gaps, duplicate/conflicting rows, filtered totals, quoted/wide CSV, XLSX saved formulas and CSV injection handling.
- Generated Excel reopened and checked against dashboard values; missing budget-derived profit remained blank. Power BI summary benchmarks reconciled to the same model.
- Three-page PDF generated and visually inspected for executive KPIs, vector plot, account table, metadata, assumptions and footers. No native Excel or Power BI Desktop execution was available.
- Nine optional Python validator/API checks passed using the local environment, including exact Decimal totals, invalid/mixed values, duplicate plan records and retired demo endpoints.
- TypeScript compilation and production build are release checks. Browser QA covers the empty state, paste review, invalid-row blocking/consent, actuals-only handling, a real file import and export interaction. Responsive CSS is implemented; device/browser coverage is limited.

## Controller sign-off checklist for a real company

1. Tie actual balances and record counts to a controlled ledger export; tie budget to the approved version. Check completeness, not just arithmetic.
2. Verify currency, sign convention, fiscal year, close date, account categories and source formulas.
3. Investigate every exclusion, duplicate warning, Unassigned dimension and missing account/month. Record support for zero assumptions outside this app.
4. Reconcile the exported selected scope and full-company source ledger separately. Review forecast gaps before using annual totals.
5. Obtain operational evidence and management review before assigning variance causes or committing corrective actions.
6. Archive exported reports securely. Use a separate authenticated storage/approval system when team access, confidentiality controls and a durable audit trail are required.
