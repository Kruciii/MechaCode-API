from fastapi import FastAPI
import httpx
import os

app = FastAPI()

# Pobieramy adres Judge0 z zmiennych środowiskowych z docker-compose
JUDGE0_URL = os.getenv("JUDGE0_URL", "http://judge0-server:2358")

@app.get("/")
def read_root():
    return {"message": "MechaCode API is running"}

@app.get("/check-judge")
async def check_judge():
    # Prosty test, czy nasze API widzi sędziego Judge0 w sieci Dockera
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{JUDGE0_URL}/about")
            return {"judge0_status": "connected", "details": response.json()}
        except Exception as e:
            return {"judge0_status": "error", "message": str(e)}
        

@app.post("/test-run")
async def test_run():
    payload = {
        "source_code": "print(1 + 1)",
        "language_id": 71, # ID dla Pythona 3
        "stdin": ""
    }
    async with httpx.AsyncClient() as client:
        # Wysyłamy kod do Judge0
        response = await client.post(f"{JUDGE0_URL}/submissions?wait=true", json=payload)
        result = response.json()
        return {
            "stdout": result.get("stdout"),
            "status": result.get("status", {}).get("description")
        }