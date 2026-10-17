export type Metric = { actual: number; budget: number; variance: number; variance_pct: number | null; favorable: number; status: string; material: boolean };
export type Totals = { revenue: number; direct_cost: number; gross_profit: number; opex: number; ebitda: number; gross_margin: number | null; ebitda_margin: number | null };
export type Line = Metric & { account: string; name: string; category: string };
export type Report = {
 metrics: Record<'revenue'|'gross_profit'|'opex'|'ebitda', Metric> & { gross_margin: {actual:number|null;budget:number|null;variance_pp:number|null}; ebitda_margin:{actual:number|null;budget:number|null;variance_pp:number|null} };
 lines: Line[];
 trend: {month:string;label:string;actual:number|null;budget:number;forecast:number|null;actual_ebitda:number|null;budget_ebitda:number;actual_gross_profit:number|null;actual_opex:number|null}[];
 departments: {name:string;actual:Totals;budget:Totals;favorable:number;variance:number}[];
 drivers: {month:string;service:string;actual_units:number;budget_units:number;actual_rate:number;budget_rate:number;volume_effect:number;rate_effect:number;variance:number}[];
 forecast: (Totals & {month:string;label:string})[];
 full_year: {budget:Totals;actual_closed:Totals;forecast_remaining:Totals};
 scope:{month:number;mode:string;department:string;service:string};
 postings: {month:string;department:string;service:string;account:string;account_name:string;category:string;scenario:string;version:string;amount:number}[];
 has_data:boolean;
};
export type Payload = {metadata:{release_id:string;closed_through:string;budget_version:string;forecast_version:string;currency:string;company:string;disclosure:string;source_postings:number;source_sha256:string}; quality:{name:string;difference:number;status:string}[];report:Report};
