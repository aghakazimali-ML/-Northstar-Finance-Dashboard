import unittest
from python.engine import review
class ReviewTests(unittest.TestCase):
    def row(self, **changes):
        return dict(month='2026-01', account='4000', category='revenue', scenario='actual', amount='0.10', currency='USD', **changes)
    def test_exact_decimal_totals(self):
        result=review([self.row(),self.row()]);self.assertEqual(result['observed_totals'][0]['amount'],'0.20')
    def test_missing_amount_is_invalid(self):
        row=self.row();row['amount']='';self.assertEqual(review([row])['invalid_rows'],1)
    def test_currency(self):
        row=self.row();row['currency']='GBP';self.assertEqual(review([row])['invalid_rows'],1)
    def test_duplicate_plan(self):
        row=self.row();row['scenario']='budget';self.assertEqual(review([row,row])['invalid_rows'],1)
    def test_bad_numbers(self):
        for amount in ['NaN','Infinity','1.234']:
            row=self.row();row['amount']=amount;self.assertEqual(review([row])['invalid_rows'],1)
    def test_missing_scenario_warns(self):
        result=review([self.row()]);self.assertEqual(len(result['issues']),2)
