/**
 * Regenerates the sample import files in /examples from lib/sample.ts.
 *   node scripts/make-sample-files.cjs
 * The files use the same columns the importer maps automatically, so a client can try
 * "Import files" with realistic data before using their own ledger exports.
 */
const fs = require('node:fs'), path = require('node:path'), os = require('node:os');
const ts = require('typescript');
const ExcelJS = require('exceljs');
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'northstar-sample-'));
fs.writeFileSync(path.join(dir, 'package.json'), '{"type":"commonjs"}');
for (const name of ['sample', 'company', 'importer']) {
  const out = ts.transpileModule(fs.readFileSync(`lib/${name}.ts`, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText;
  fs.writeFileSync(path.join(dir, `${name}.js`), out);
}
const { SAMPLE_HEADERS, buildSampleRecords } = require(path.join(dir, 'sample.js'));
const records = buildSampleRecords();
const esc = (v) => { const s = String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
fs.mkdirSync('examples', { recursive: true });
fs.writeFileSync('examples/aurora-studio-sample.csv', [SAMPLE_HEADERS.join(','), ...records.map((r) => r.map(esc).join(','))].join('\n') + '\n');
(async () => {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Ledger');
  ws.addRow(SAMPLE_HEADERS);
  records.forEach((r) => ws.addRow(r));
  ws.getRow(1).font = { bold: true };
  ws.columns.forEach((c) => { c.width = 18; });
  await wb.xlsx.writeFile('examples/aurora-studio-sample.xlsx');
  console.log(`wrote ${records.length} rows to examples/aurora-studio-sample.csv and .xlsx`);
})();
