# Power BI company export

Download the Power BI data package after importing a reviewed company. It contains financials.csv, summary.json, review.json and starter measures. No demo datasets are included.

Import month as its first day, account as text, amount as Fixed Decimal Number. Add a proper calendar table. Select exactly one budget and one forecast version. Scope categories explicitly; summing revenue and costs together is not profit.

Reconcile against summary.json. Raw SUM measures do not reproduce expected-observation coverage or approved missing-data policies. Add coverage logic before presenting sparse periods as complete. A PBIX requires Power BI Desktop authoring and independent reconciliation.
