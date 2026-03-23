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
    <div className="min-h-screen w-full p-12 flex flex-col items-start gap-12 overflow-x-hidden">
      
      {/* NAGŁÓWEK I PROGRESS BAR */}
      <div className="w-full flex flex-col items-center text-center mb-16">
        <span className="text-indigo-400 font-mono tracking-[0.3em] uppercase text-xs mb-4 opacity-60">
          // System operacyjny v1.0
        </span>
        
        <h1 className="text-8xl font-black tracking-tighter leading-[0.85] text-white uppercase drop-shadow-2xl">
          PROGRAMOWANIE<br />
          <span className="text-indigo-500">OBIEKTOWE</span>
        </h1>

        {/* Pasek postępu - szklany efekt */}
        <div className="w-1/3 bg-white/5 h-14 rounded-full relative border border-white/10 backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)]">
           <div 
             className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-1000 ease-out" 
             style={{ width: '45%' }}
           />
           <span className="absolute right-10 top-1/2 -translate-y-1/2 font-mono font-bold text-xl">S2</span>
           <span className="absolute left-1/2 top-1/2 -translate-y-1/2 font-bold text-xl shadow-sm">45%</span>
        </div>
      </div>
      
      {/* PANEL GŁÓWNY */}
      <div className="w-full bg-black/20 backdrop-blur-xl rounded-[40px] p-8 flex flex-col gap-4 border border-white/5 shadow-2xl">
        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-mono text-indigo-400 animate-pulse">ŁADOWANIE MODUŁÓW...</p>
          </div>
        ) : (
          tasks.map((t) => <TaskRow key={t.id} task={t} />)
        )}
      </div>

    </div>
  );
};

export default DashboardPage;