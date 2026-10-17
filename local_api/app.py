"""Optional local validation API. Company data is not deployed in the hosted app."""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from python.engine import review
app = FastAPI(title='Northstar import validation', version='2.0.0')
class ImportRequest(BaseModel):
    rows: list[dict] = Field(max_length=20000)
    currency: str = 'USD'
@app.get('/health')
def health(): return {'status':'ok'}
@app.post('/api/validate')
def validate(request: ImportRequest):
    try: return review(request.rows, request.currency)
    except ValueError as exc: raise HTTPException(400, str(exc)) from exc
@app.get('/api/report')
def retired_report(): raise HTTPException(410, 'Import company records in the browser. Preloaded reports have been removed.')
@app.post('/api/scenario')
def retired_scenario(): raise HTTPException(410, 'Use the imported forecast in the browser.')
