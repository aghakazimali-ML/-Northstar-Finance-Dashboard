"""Offline review of normalized company CSVs; never generates company records.
Usage: python python/engine.py company.csv --currency USD > review.json
The browser's tested TypeScript model remains the management-report calculation engine.
"""
import argparse, csv, json, re
from collections import defaultdict
from decimal import Decimal, InvalidOperation

CATEGORIES = {'revenue', 'direct_cost', 'opex', 'depreciation', 'interest', 'tax'}
REQUIRED = {'month', 'account', 'category', 'scenario', 'amount'}

def review(records, currency='USD'):
    issues, accepted, source_ids, plans, account_categories = [], [], set(), set(), {}
    totals = defaultdict(Decimal)
    if not re.fullmatch(r'[A-Z]{3}', currency):
        raise ValueError('Use a three-letter reporting currency.')
    for index, row in enumerate(records, 2):
        errors = []
        missing = REQUIRED - row.keys()
        if missing:
            errors.append('Missing columns: ' + ', '.join(sorted(missing)))
        month, account = str(row.get('month', '')).strip(), str(row.get('account', '')).strip()
        category, scenario = str(row.get('category', '')).strip(), str(row.get('scenario', '')).strip()
        if not re.fullmatch(r'20\d{2}-(0[1-9]|1[0-2])|2100-(0[1-9]|1[0-2])', month):
            errors.append('Month must be YYYY-MM.')
        if not account: errors.append('Account is required.')
        if category not in CATEGORIES: errors.append('Unsupported category.')
        if scenario not in {'actual', 'budget', 'forecast'}: errors.append('Unsupported scenario.')
        if (row.get('currency') or currency) != currency: errors.append('Mixed currencies require separate company imports.')
        try:
            amount = Decimal(str(row.get('amount', '')).strip())
            if not amount.is_finite() or abs(amount) > Decimal('1e12') or amount != amount.quantize(Decimal('.01')):
                raise ValueError()
        except (InvalidOperation, ValueError):
            amount = None
            errors.append('Amount must be a finite number with at most two decimal places.')
        source_id = str(row.get('source_id', '')).strip()
        plan_key = tuple(row.get(k, '') for k in ('month', 'account', 'department', 'service', 'scenario', 'version'))
        if source_id and source_id in source_ids: errors.append('Duplicate source ID.')
        if scenario in {'budget', 'forecast'} and plan_key in plans: errors.append('Duplicate plan grain.')
        if account in account_categories and account_categories[account] != category: errors.append('Conflicting account category.')
        if errors:
            issues.append({'row': index, 'severity': 'error', 'messages': errors})
            continue
        if source_id: source_ids.add(source_id)
        if scenario != 'actual': plans.add(plan_key)
        account_categories[account] = category
        accepted.append(row)
        totals[(month, scenario, category)] += amount
    scenarios = {r['scenario'] for r in accepted}
    for scenario in ('actual', 'budget', 'forecast'):
        if scenario not in scenarios:
            issues.append({'severity': 'warning', 'messages': [f'No {scenario} records. Missing values must not be replaced with zero without explicit review.']})
    return {'currency': currency, 'valid_rows': len(accepted), 'invalid_rows': sum(i['severity'] == 'error' for i in issues), 'issues': issues,
            'observed_totals': [{'month': k[0], 'scenario': k[1], 'category': k[2], 'amount': str(v)} for k,v in sorted(totals.items())],
            'basis': 'Observed balances only. Not a complete P&L, budget comparison, audit opinion or substitute for source-ledger reconciliation.'}

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('file'); parser.add_argument('--currency', default='USD')
    args = parser.parse_args()
    with open(args.file, encoding='utf-8-sig', newline='') as handle:
        result = review(list(csv.DictReader(handle)), args.currency)
    print(json.dumps(result, indent=2))
    raise SystemExit(1 if result['invalid_rows'] else 0)
