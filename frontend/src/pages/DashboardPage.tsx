import React, { useState, useEffect } from 'react';
import TaskRow from '../features/tasks/TaskRow.tsx';
import type { ITask } from '../features/tasks/task.tsx';

const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // Symulacja API
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        const mockData: ITask[] = [
          { id: 1, title: "ZADANIE 1", description: "Stwórz klasę KontoBankowe, która będzie posiadać:", lang: "C++", level: "Noob", category: "Class", status: "failed" },
          { id: 2, title: "ZADANIE 2", description: "Stwórz klasę Termostat, która będzie posiadać:", lang: "C++", level: "Pro", category: "Class", status: "done" },
          { id: 3, title: "ZADANIE 3", description: "Stwórz klasę DziennikFit, która będzie posiadać:", lang: "C++", level: "Fit", category: "Class", status: "failed" },
        ];
        
        setTasks(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-white p-10 font-sans">
      {/* Tutaj Twój StatsHeader - pamiętaj o zmianie na TSX! */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold tracking-tight">PROGRAMOWANIE OBIEKTOWE</h1>
        <div className="w-1/3 bg-[#e0e0e0] h-12 rounded-full relative shadow-inner overflow-hidden">
           <div className="absolute left-0 top-0 h-full bg-[#8c8c8c] w-[45%]" />
           <span className="absolute right-10 top-1/2 -translate-y-1/2 font-bold text-xl">S2</span>
           <span className="absolute left-1/2 top-1/2 -translate-y-1/2 font-bold text-xl text-white">45%</span>
        </div>
      </div>
      
      {/* PANEL GŁÓWNY Z TWOJEGO PROJEKTU */}
      <div className="bg-[#e0e0e0] rounded-[50px] p-12 flex flex-col gap-8 shadow-2xl">
        {loading ? (
          <div className="text-center text-[#8c8c8c] font-bold text-2xl animate-pulse">
            INICJALIZACJA SYSTEMU...
          </div>
        ) : (
          tasks.map((t) => <TaskRow key={t.id} task={t} />)
        )}
      </div>
    </div>
  );
};

export default DashboardPage;