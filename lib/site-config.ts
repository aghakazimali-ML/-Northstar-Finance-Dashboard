/**
 * ONE FILE TO WHITE-LABEL THE WHOLE SITE
 * ------------------------------------------------------------------------
 * Change the brand name, copy, pricing, testimonials, FAQ and links below and
 * the landing page, metadata and dashboard branding update together.
 * Colours: the whole product is themed from --brand-1 / --brand-2 in app/theme.css (green by default).
 */

export const site = {
  name: 'Northstar',
  tagline: 'Finance intelligence for growing teams',
  description:
    'Import actuals, budgets and forecasts. Review missing data, analyse performance against plan and export management reports — privately, in your browser.',
  url: 'https://your-domain.com',
  contactEmail: 'hello@your-domain.com',
  /**
   * Marketing-demo mode: the dashboard opens pre-loaded with the clearly labelled sample company when
   * nothing is saved in the browser. Set to false for a client's production site so it opens empty.
   */
  demoMode: true,
  /** Shows a small "placeholder content" note under testimonials/pricing. Set false once you replace them. */
  showSampleNotice: true,
  /** Where primary buttons point. The demo link opens the dashboard pre-loaded with sample data. */
  dashboardHref: '/dashboard',
  demoHref: '/dashboard?demo=1',
  social: [
    // { label: 'LinkedIn', href: 'https://linkedin.com/company/your-company' },
    // { label: 'X', href: 'https://x.com/your-company' },
  ] as { label: string; href: string }[],
};

export const nav = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const hero = {
  badge: 'Budget vs Actual, finally clear',
  titleBefore: 'Turn actuals and budgets into',
  titleAccent: 'clear decisions',
  subtitle:
    'Northstar brings your actuals, budget and forecast together in a private, browser-based workspace. Import CSV or Excel, review what is missing, and see exactly where performance differs from plan.',
  primaryCta: 'Try the live demo',
  secondaryCta: 'See how it works',
  trust: ['No sign-up needed', 'Data stays in your browser', 'CSV · TSV · Excel'],
};

export const capabilityChips = [
  'Excel workbooks',
  'CSV & TSV files',
  'Power BI package',
  'PDF management reports',
  'Fiscal-year aware',
  'Debit / credit sign handling',
  'Formula-safe CSV exports',
  'Department & service views',
  'Rolling 12-month forecast',
  'Missing data never becomes zero',
];

export const stats = [
  { value: 100, suffix: '%', label: 'Browser-local processing' },
  { value: 20000, suffix: '', label: 'Records per import' },
  { value: 12, suffix: '-mo', label: 'Rolling forecast horizon' },
  { value: 4, suffix: '', label: 'Export formats' },
];

export const features = [
  {
    icon: 'git-compare',
    title: 'Budget vs actual, by month or YTD',
    text: 'Variance by account, department and service — with favourable and unfavourable direction handled correctly for revenue and costs.',
  },
  {
    icon: 'trending-up',
    title: 'Rolling 12-month forecast',
    text: 'Blend closed actuals with forecast months, then test scenarios with simple presets and sliders before you commit to a number.',
  },
  {
    icon: 'shield-check',
    title: 'Data-quality guardrails',
    text: 'Missing values stay missing. Mixed currencies, duplicate rows and account conflicts are flagged before anything reaches your dashboard.',
  },
  {
    icon: 'building',
    title: 'Department intelligence',
    text: 'See who is over or under plan, then drill into the exact postings behind any figure. No hidden allocations.',
  },
  {
    icon: 'file-down',
    title: 'Management-ready exports',
    text: 'Download a PDF report, Excel workbook, CSV or a Power BI package in one click — formatted for the boardroom.',
  },
  {
    icon: 'lock',
    title: 'Private by design',
    text: 'Files are processed in your browser. There is no financial-file upload endpoint, and saving on your device is strictly opt-in.',
  },
] as const;

export const steps = [
  {
    title: 'Import',
    text: 'Drop in CSV, TSV or Excel files — several at once. Map your columns once and Northstar remembers the shape.',
  },
  {
    title: 'Review',
    text: 'See errors, omissions and inferred fields before anything is applied. Your current dashboard stays intact until you approve.',
  },
  {
    title: 'Decide',
    text: 'Explore variances, test the forecast, assign actions and export a report your leadership team can read in minutes.',
  },
];

export const showcase = [
  {
    id: 'overview',
    tab: 'Overview',
    title: 'Your results, your plan, and where to focus next',
    points: ['Revenue, gross profit, opex and EBITDA at a glance', 'Trend against budget with honest gaps for missing months', 'Largest account differences ranked by impact'],
    image: '/screens/overview.jpg',
  },
  {
    id: 'variance',
    tab: 'Variance',
    title: 'See exactly which accounts moved the needle',
    points: ['Favourable vs unfavourable, never confused', 'Click any account to see the postings behind it', 'Percentages hidden when a budget base is zero'],
    image: '/screens/variance.jpg',
  },
  {
    id: 'forecast',
    tab: 'Forecast',
    title: 'Test scenarios before you commit to a plan',
    points: ['Twelve forward months, always', 'Adjust revenue and cost assumptions with sliders', 'Full-year view: budget vs closed actuals plus forecast'],
    image: '/screens/forecast.jpg',
  },
] as const;

/* PLACEHOLDER pricing — replace with your own plans. Yearly = price per month when billed annually. */
export const pricing = {
  note: 'Prices shown are sample values — edit them in lib/site-config.ts.',
  plans: [
    {
      name: 'Starter',
      blurb: 'For freelancers and solo finance leads.',
      monthly: 0,
      yearly: 0,
      cta: 'Start free',
      href: '/dashboard',
      features: ['1 company workspace', 'CSV / TSV / Excel import', 'Overview & variance analysis', 'CSV export'],
    },
    {
      name: 'Growth',
      blurb: 'For teams that report every month.',
      monthly: 29,
      yearly: 23,
      cta: 'Start free trial',
      href: '/dashboard?demo=1',
      popular: true,
      features: ['Unlimited company workspaces', 'Rolling forecast & scenarios', 'PDF, Excel & Power BI exports', 'Department & service drill-down', 'Priority email support'],
    },
    {
      name: 'Enterprise',
      blurb: 'For finance teams with custom needs.',
      monthly: 99,
      yearly: 79,
      cta: 'Contact sales',
      href: 'mailto:hello@your-domain.com',
      features: ['Everything in Growth', 'Custom branding & domain', 'Onboarding & training session', 'Custom import mappings', 'Dedicated success manager'],
    },
  ],
};

/* PLACEHOLDER testimonials — replace with real customer quotes before launch. */
export const testimonials = [
  { name: 'Maya R.', role: 'Finance Manager', company: 'Harbor & Co', text: 'We replaced three spreadsheets with one view. Month-end review now takes an afternoon, not a week.' },
  { name: 'Daniel K.', role: 'Founder', company: 'Brightline Studio', text: 'The variance view tells me in seconds which cost lines drifted. Exactly what I needed before board meetings.' },
  { name: 'Sofia L.', role: 'Controller', company: 'Meridian Labs', text: 'I trust it because it refuses to guess. Missing data stays missing, and that is how finance should work.' },
  { name: 'Arjun P.', role: 'CFO', company: 'Kite Analytics', text: 'Importing our exports was painless, and the forecast scenarios gave us a calm, factual budget conversation.' },
  { name: 'Elena V.', role: 'FP&A Lead', company: 'Northgate Retail', text: 'Department owners finally see their own numbers. The drill-down to postings ended most of the “why” emails.' },
  { name: 'Tom W.', role: 'Operations Director', company: 'Alder Logistics', text: 'Clean, fast and private. Our auditors liked that nothing leaves the browser unless we export it.' },
];

export const faq = [
  {
    q: 'Is my financial data uploaded anywhere?',
    a: 'No. Files are parsed and analysed entirely in your browser — there is no financial-file upload endpoint. Companies are session-only unless you choose “Remember on this browser”, which stores normalised records in your own browser storage.',
  },
  {
    q: 'Which file formats and sizes are supported?',
    a: 'CSV, TSV and XLSX. Up to eight files per selection, 10 MB each, 20,000 combined records and 25 workbook sheets. Save legacy XLS files as XLSX first.',
  },
  {
    q: 'Which columns do I need?',
    a: 'Four are required: month, account, category and amount. Scenario, department, service, account name, version, currency and source ID are recommended and unlock deeper analysis.',
  },
  {
    q: 'What happens when data is missing?',
    a: 'It stays unavailable. Northstar never turns a missing budget or actual into zero unless you explicitly approve that assumption, so profit figures are never invented.',
  },
  {
    q: 'What can I export?',
    a: 'A formatted PDF management report, an Excel workbook, CSV files (protected against spreadsheet formula injection) and a Power BI package with a ready-made theme.',
  },
  {
    q: 'Can I manage more than one company?',
    a: 'Yes. Add as many company workspaces as you need and switch between them from the sidebar.',
  },
];

export const cta = {
  title: 'Ready to see where your numbers are heading?',
  text: 'Open the live demo with sample data, or import your own files in under a minute.',
  primary: 'Open the live demo',
  secondary: 'Import your data',
};

export const footer = {
  columns: [
    { title: 'Product', links: [{ label: 'Features', href: '#features' }, { label: 'How it works', href: '#how' }, { label: 'Pricing', href: '#pricing' }, { label: 'FAQ', href: '#faq' }] },
    { title: 'App', links: [{ label: 'Open dashboard', href: '/dashboard' }, { label: 'Live demo', href: '/dashboard?demo=1' }] },
  ],
};
