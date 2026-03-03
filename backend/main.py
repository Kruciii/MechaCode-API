from fastapi import FastAPI
from pydantic import BaseModel

# Inicjalizacja aplikacji
app = FastAPI(title="Mecha-Judge API", description="API dla platformy sędziującej")

# --- MODELE DANYCH (Twój Kontrakt dla kolegi z Frontendu) ---
class SubmissionRequest(BaseModel):
    task_id: int
    language: str
    source_code: str

# --- ENDPOINTY (Menu restauracji) ---

@app.get("/")
def read_root():
    return {"status": "Online", "message": "Backend działa poprawnie!"}

@app.get("/api/tasks")
def get_tasks():
    # Zwracamy przykładową listę zadań (później podepniemy tu bazę danych)
    return [
        {"id": 1, "title": "Sortowanie odczytów z czujnika", "difficulty": "Easy", "points": 10},
        {"id": 2, "title": "Sterowanie silnikiem krokowym", "difficulty": "Hard", "points": 50}
    ]

@app.post("/api/submissions")
def submit_code(request: SubmissionRequest):
    # W przyszłości: tutaj wyślemy request.source_code do Judge0 w Dockerze
    return {
        "message": "Kod przyjęty do sprawdzenia",
        "task_id": request.task_id,
        "status": "PENDING"
    }