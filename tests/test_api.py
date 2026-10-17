import unittest
from fastapi.testclient import TestClient
from local_api.app import app
class APITests(unittest.TestCase):
    def setUp(self): self.client=TestClient(app)
    def test_health(self): self.assertEqual(self.client.get('/health').status_code,200)
    def test_retired_preloaded_data(self): self.assertEqual(self.client.get('/api/report').status_code,410)
    def test_validate_actual_import(self):
        result=self.client.post('/api/validate',json={'rows':[{'month':'2026-01','account':'4','category':'revenue','scenario':'actual','amount':'1.20'}]})
        self.assertEqual(result.status_code,200);self.assertEqual(result.json()['valid_rows'],1)
