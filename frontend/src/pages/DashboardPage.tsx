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