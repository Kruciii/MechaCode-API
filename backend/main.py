from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import httpx
import base64
from sqlalchemy.orm import Session
from database import engine, get_db
import models
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

# To polecenie automatycznie stworzy puste tabele w bazie przy starcie, jeśli ich nie ma!
models.Base.metadata.create_all(bind=engine)
# Konfiguracja CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # W produkcji podaj konkretny adres, np. ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"], # To pozwoli na OPTIONS, POST, GET itd.
    allow_headers=["*"],
)
# Model danych wejściowych z Reacta
class CodeSubmission(BaseModel):
    code: str

JUDGE0_URL = "http://judge0-server:2358"

@app.post("/api/tasks/{task_id}/submit")
async def submit_code(task_id: int, submission: CodeSubmission):
    # 1. Kod z Monaco zamieniamy na Base64
    encoded_code = base64.b64encode(submission.code.encode("utf-8")).decode("utf-8")
    
    # 2. Przygotowujemy paczkę dla Judge0 (ID 54 = C++)
    payload = {
        "source_code": encoded_code,
        "language_id": 54,  # C++ 
        "stdin": ""
    }
    
    async with httpx.AsyncClient() as client:
        try:
            # Wysyłamy do sędziego (wait=true, żeby od razu dostać wynik)
            response = await client.post(
                f"{JUDGE0_URL}/submissions?wait=true&base64_encoded=true",
                json=payload,
                timeout=30.0
            )
            
            result = response.json()
            
            # Dekodujemy wynik ze sędziego
            return {
                "stdout": base64.b64decode(result.get("stdout") or "").decode("utf-8") if result.get("stdout") else "",
                "stderr": base64.b64decode(result.get("stderr") or "").decode("utf-8") if result.get("stderr") else "",
                "compile_output": base64.b64decode(result.get("compile_output") or "").decode("utf-8") if result.get("compile_output") else "",
                "status": result.get("status", {}).get("description", "Unknown Error")
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/tasks")
def get_tasks(db: Session = Depends(get_db)):
    # Pobieramy wszystkie zadania prosto z bazy PostgreSQL
    tasks = db.query(models.Task).all()
    
    return {
        "progress": {
            "percentage": 33, # Tym zajmiemy się później, gdy dodamy tabelę UserProgress
            "subject_name": "Podstawy Programowania (C++)"
        },
        "tasks": tasks
    }

@app.get("/api/tasks/{task_id}")
def get_task_details(task_id: int, db: Session = Depends(get_db)):
    # Zapytanie: SELECT * FROM tasks WHERE id = task_id
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    
    if not task:
        raise HTTPException(status_code=404, detail="Zadanie nie istnieje w bazie.")
    return task

@app.post("/api/seed")
def seed_database(db: Session = Depends(get_db)):
    # Sprawdzamy, czy tabela tasks jest pusta
    if db.query(models.Task).count() == 0:
        task1 = models.Task(
            title="Protokół Alfa",
            short_content="Napisz program wypisujący 'Hello Mecha'.",
            content="Witaj inżynierze. Twoim pierwszym zadaniem jest inicjalizacja rdzenia komunikacyjnego.\n\nNapisz program w języku C++, który wypisze na standardowe wyjście dokładnie ten tekst:\n\nHello Mecha\n\nPamiętaj o zwróceniu 0 na końcu funkcji main!",
            initial_code="#include <iostream>\n\nint main() {\n    // Pisz kod tutaj\n    \n    return 0;\n}",
            status="NOT_STARTED",
            semester="Semestr 1",
            language="cpp",
            language_id=54, # ID 54 to C++ w systemie Judge0
            difficulty="EASY",
            topic="Podstawy"
        )
        
        task2 = models.Task(
            title="Kalkulator Spalania",
            short_content="Oblicz zużycie paliwa reaktora.",
            content="Reaktor plazmowy traci stabilność. Musisz napisać algorytm, który obliczy optymalne zużycie paliwa.\n\nZadanie: Napisz program, który przyjmuje ilość cykli i oblicza całkowite zapotrzebowanie energetyczne.",
            initial_code="#include <iostream>\n\nint main() {\n    // Moduł kalkulacji paliwa\n    \n    return 0;\n}",
            status="NOT_STARTED",
            semester="Semestr 1",
            language="cpp",
            language_id=54,
            difficulty="MEDIUM",
            topic="Algorytmy"
        )
        
        # Wrzucamy dane do bazy i zapisujemy (commit)
        db.add(task1)
        db.add(task2)
        db.commit()
        
        return {"message": "Baza została zasilona danymi testowymi! 🚀"}
        
    return {"message": "Baza ma już dane, nie dodaję duplikatów."}