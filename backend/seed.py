from database import SessionLocal, engine
import models

# Nasze dane startowe zgodne z modelem Task
SEED_TASKS = [
    {
        "id": 1,
        "title": "Witaj w MechaCode",
        "short_content": "Napisz program w C++, który wypisze logi startowe mecha.",
        "content": "### Misja 01: System Check\nTwoim zadaniem jest uruchomienie terminala mecha. Napisz program w **C++**, który za pomocą `std::cout` wypisze na ekranie powitanie: `Witaj w MechaCode C++!`.\n\nPamiętaj o załączeniu `<iostream>`.",
        "initial_code": "#include <iostream>\n\nint main() {\n    // Twój kod tutaj...\n    \n    return 0;\n}",
        "status": "NOT_STARTED",
        "semester": "S1",
        "language": "cpp",
        "language_id": 54,
        "difficulty": "EASY",
        "topic": "Podstawy"
    },
    {
        "id": 2,
        "title": "Kalkulator Spalania",
        "short_content": "Oblicz średnie spalanie reaktora na podstawie dystansu i paliwa.",
        "content": "### Misja 02: Logistyka Paliwowa\nMech zużył 5 jednostek plazmy na dystansie 100 parseków. Napisz program, który obliczy średnie spalanie (plazma/dystans) i wypisze wynik.",
        "initial_code": "#include <iostream>\n\nint main() {\n    double dystans = 100.0;\n    double plazma = 5.0;\n    // Oblicz spalanie...\n    \n    return 0;\n}",
        "status": "NOT_STARTED",
        "semester": "S1",
        "language": "cpp",
        "language_id": 54,
        "difficulty": "MEDIUM",
        "topic": "Operatory"
    },
    {
        "id": 3,
        "title": "Sortowanie Zbrojowni",
        "short_content": "Posortuj numery seryjne broni od największego do najmniejszego.",
        "content": "### Misja 03: Porządkowanie\nSystemy celownicze wymagają posortowanych danych. Użyj `std::sort` lub własnego algorytmu, aby posortować tablicę ID broni malejąco.",
        "initial_code": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> bronie = {45, 12, 89, 33, 7};\n    // Sortuj...\n    \n    return 0;\n}",
        "status": "NOT_STARTED",
        "semester": "S1",
        "language": "cpp",
        "language_id": 54,
        "difficulty": "HARD",
        "topic": "Algorytmy"
    }
]

def seed_db():
    db = SessionLocal()
    try:
        print("🚀 Rozpoczynam wstrzykiwanie danych do MechaCode...")
        for task_data in SEED_TASKS:
            # Sprawdź czy zadanie już istnieje
            existing_task = db.query(models.Task).filter(models.Task.id == task_data["id"]).first()
            if not existing_task:
                new_task = models.Task(**task_data)
                db.add(new_task)
                print(f"✅ Dodano zadanie: {task_data['title']}")
            else:
                print(f"ℹ️ Zadanie '{task_data['title']}' już istnieje w bazie.")
        
        db.commit()
        print("🏁 Proces zakończony sukcesem!")
    except Exception as e:
        print(f"❌ Błąd podczas seedowania: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()