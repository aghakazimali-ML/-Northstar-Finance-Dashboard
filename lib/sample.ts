import { suggestMapping, validateTables, toCompany, type ImportOptions, type Table } from './importer';
import type { Company } from './company';

/**
 * Deterministic demo company used by the "Try sample data" button.
 * It is generated through the real import pipeline, so it follows exactly the same
 * validation rules as a customer's own files. All figures are fictional.
 */
const headers = ['month', 'account', 'account_name', 'category', 'scenario', 'amount', 'department', 'service', 'version', 'currency', 'source_id'];

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Line = { bias: number; account: string; name: string; category: 'revenue' | 'direct_cost' | 'opex'; department: string; service: string; base: number; growth: number; seasonal?: number };

const lines: Line[] = [
  { bias: 0.045, account: '4100', name: 'Subscription revenue', category: 'revenue', department: 'Sales', service: 'Subscriptions', base: 118000, growth: 0.018, seasonal: 0.03 },
  { bias: -0.07, account: '4200', name: 'Consulting revenue', category: 'revenue', department: 'Sales', service: 'Consulting', base: 64000, growth: 0.007, seasonal: 0.07 },
  { bias: 0.02, account: '4300', name: 'Support plans', category: 'revenue', department: 'Operations', service: 'Support', base: 27000, growth: 0.012 },
  { bias: 0.05, account: '5100', name: 'Hosting & infrastructure', category: 'direct_cost', department: 'Engineering', service: 'Subscriptions', base: 26500, growth: 0.015 },
  { bias: -0.03, account: '5200', name: 'Delivery team', category: 'direct_cost', department: 'Operations', service: 'Consulting', base: 38000, growth: 0.006 },
  { bias: 0.01, account: '5300', name: 'Support staff', category: 'direct_cost', department: 'Operations', service: 'Support', base: 12500, growth: 0.01 },
  { bias: 0.02, account: '6100', name: 'Salaries & benefits', category: 'opex', department: 'Engineering', service: 'General', base: 52000, growth: 0.009 },
  { bias: -0.09, account: '6200', name: 'Marketing programmes', category: 'opex', department: 'Marketing', service: 'General', base: 21000, growth: 0.012, seasonal: 0.1 },
  { bias: 0.06, account: '6300', name: 'Software & tools', category: 'opex', department: 'Engineering', service: 'General', base: 7200, growth: 0.008 },
  { bias: 0.0, account: '6400', name: 'Rent & utilities', category: 'opex', department: 'Admin', service: 'General', base: 9800, growth: 0.001 },
  { bias: -0.11, account: '6500', name: 'Travel & events', category: 'opex', department: 'Sales', service: 'General', base: 6400, growth: 0.004, seasonal: 0.15 },
  { bias: 0.09, account: '6600', name: 'Professional fees', category: 'opex', department: 'Admin', service: 'General', base: 5200, growth: 0.002 },
];

function monthsBetween(from: string, to: string) {
  const out: string[] = [];
  let [y, m] = from.split('-').map(Number);
  const [ty, tm] = to.split('-').map(Number);
  while (y < ty || (y === ty && m <= tm)) {
    out.push(`${y}-${String(m).padStart(2, '0')}`);
    m++;
    if (m > 12) { m = 1; y++; }
  }
  return out;
}

export const SAMPLE_CLOSED_THROUGH = '2026-09';

export const SAMPLE_HEADERS = headers;

/** Raw import rows (same columns as the CSV/XLSX files in /examples). */
export function buildSampleRecords(): (string | number)[][] {
  const rand = rng(20261016);
  const records: (string | number)[][] = [];
  const start = '2025-01';
  const all = monthsBetween(start, '2027-09');
  const idx = (m: string) => all.indexOf(m);

  for (const month of all) {
    const i = idx(month);
    const mm = Number(month.slice(5));
    const closed = month <= SAMPLE_CLOSED_THROUGH;
    for (const l of lines) {
      const season = l.seasonal ? l.seasonal * Math.sin(((mm - 1) / 12) * Math.PI * 2) : 0;
      // Budget is the plan; actuals and forecast deviate from it by a per-account bias that builds up over the year.
      const budget = Math.round(l.base * Math.pow(1 + l.growth * 0.9, i) * (1 + season * 0.6));
      const ramp = Math.min(1, (i + 3) / 14);
      const actual = Math.round(budget * (1 + l.bias * ramp + (rand() - 0.5) * 0.05));
      const forecast = Math.round(budget * (1 + l.bias * 1.05 + (rand() - 0.5) * 0.015));
      const push = (scenario: string, amount: number, version: string) => {
        records.push([month, l.account, l.name, l.category, scenario, amount, l.department, l.service, version, 'USD', `${month}-${scenario}-${l.account}`]);
      };
      if (month <= '2026-12') push('budget', budget, 'FY26 Budget');
      if (closed) push('actual', actual, 'Actual');
      else push('forecast', forecast, 'Q3 Forecast');
    }
  }

  return records;
}

export function buildSampleCompany(): Company {
  const records = buildSampleRecords();
  const table: Table = { id: 'sample / Demo', source: 'sample-data.csv', sheet: 'Demo', headers, records, formulaCells: 0 };
  const options: ImportOptions = {
    name: 'Aurora Studio (demo)',
    currency: 'USD',
    fiscalStart: 1,
    closedThrough: SAMPLE_CLOSED_THROUGH,
    sign: 'positive',
    decimal: '.',
    defaultScenario: 'actual',
    policies: { missingBudget: 'unavailable', missingActual: 'unavailable', completePL: false },
  };
  const review = validateTables([table], { [table.id]: suggestMapping(table.headers) }, options, []);
  return { ...toCompany(review, options, false, true), id: 'sample-demo' };
}
