# Architecture — v2 company imports

The reviewed company snapshot is the unit of calculation, persistence and export. No preloaded financial data is served.

| Layer | Implementation | Responsibility |
| --- | --- | --- |
| UI | React, Inter, Recharts | Company switching, filters, charts, drilldowns, import review |
| Ingestion | lib/importer.ts, ExcelJS, fflate | Parse, map, normalize signs, validate and report issues |
| Model | lib/company.ts | Availability, cent totals, fiscal periods, variance, margins, forecast |
| Export | lib/exports.ts | PDF, Excel, CSV, Power BI from the same snapshot |
| Local saving | lib/storage.ts, IndexedDB | Explicit per-browser persistence; otherwise session-only |
| Analyst preflight | Python Decimal, FastAPI | Optional offline normalized CSV validation and observed totals |
| Hosting | Vinext / Sites | Assets and rendering; no company record database |

Normalized rows carry month, account, name, category, scenario, department, service, version, amount, currency, file/sheet and source row. Source IDs enable duplicate control. A company has one reporting currency, fiscal start, close month and reviewed missing-data policies.

A batch is staged separately. Structural errors block application. Invalid rows need correction or explicit exclusion and acceptance. Existing companies support append or reviewed replacement. Requested persistence must succeed before switching the active snapshot.

Null means unavailable. Zero is observed or explicitly approved. Expected account/month/dimension observations come from accounts present in the selected period/version. Accounts absent from every source cannot be detected. Source completeness needs external ledger reconciliation.

No ERP connection, team roles, cloud company database, approval ledger, FX engine or completed PBIX is implemented. Browser origin isolation is not company-level authorization. Workbooks contain static report-time values. Sensitivity previews are unapproved.
