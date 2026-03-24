import React, { useState, useEffect } from 'react';
import TaskRow from '../features/tasks/TaskRow.tsx';
import type { ITask } from '../features/tasks/task.tsx';
import './DashboardPage.css'; // <--- IMPORTUJEMY CSS TUTAJ

const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // Symulacja opóźnienia sieci (np. czekanie na serwer w Dockerze)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
    const mockData: ITask[] = [
      { 
        id: 1, 
        title: "ZADANIE 1", 
        description: "Stwórz klasę KontoBankowe, która będzie posiadać pola prywatne: saldo oraz numer konta.", 
        status: "failed", 
        lang: "C++", 
        level: "Noob", 
        category: "Class" 
      },
      { 
        id: 2, 
        title: "ZADANIE 2", 
        description: "Zaimplementuj dziedziczenie dla klas Samochód i Pojazd wraz z metodami wirtualnymi.", 
        status: "todo", 
        lang: "Python", 
        level: "Easy", 
        category: "Inheritance" 
      },
      { 
        id: 3, 
        title: "ZADANIE 3", 
        description: "Obsługa wyjątków (try-catch) w systemie rezerwacji miejsc w kinie.", 
        status: "done", 
        lang: "Java", 
        level: "Mid", 
        category: "Exceptions" 
      },
      { 
        id: 4, 
        title: "ZADANIE 4", 
        description: "Wykorzystaj wzorzec projektowy Singleton do stworzenia managera ustawień aplikacji.", 
        status: "todo", 
        lang: "C#", 
        level: "Hard", 
        category: "Design Patterns" 
      },
      { 
        id: 5, 
        title: "ZADANIE 5", 
        description: "Przeciążanie operatorów dla klasy Macierz (dodawanie i mnożenie macierzy).", 
        status: "todo", 
        lang: "C++", 
        level: "Mid", 
        category: "Operators" 
      }
    ];
        
        setTasks(mockData);
      } catch (error) {
        console.error("Błąd ładowania zadań:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

return (
    <div className="dashboard-container">
      
      {/* NAGŁÓWEK */}
      <div className="header-section">
        <span className="system-tag">// System operacyjny v1.0</span>
        <h1 className="main-title">
          PROGRAMOWANIE<br />
          <span className="title-accent">OBIEKTOWE</span>
        </h1>
      </div>
      
      {/* PANEL GŁÓWNY */}
      <div className="tasks-panel">
        {loading ? (
          <div className="loading-spinner">ŁADOWANIE...</div>
        ) : (
          tasks.map((t) => <TaskRow key={t.id} task={t} />)
        )}
      </div>

    </div>
  );
};

export default DashboardPage;