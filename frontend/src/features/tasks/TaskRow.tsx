import React from 'react';
import type { ITask } from './task.tsx';

interface TaskRowProps {
  task: ITask;
}

const TaskRow: React.FC<TaskRowProps> = ({ task }) => {
  // Mapowanie statusu na kolory (z Twojego konceptu)
  const statusColors: Record<string, string> = {
    done: 'bg-[#4ade80]',   // Zielony
    failed: 'bg-[#f87171]', // Czerwony
    todo: 'bg-[#a3a3a3]',   // Szary
  };

  return (
    <div className="flex items-center gap-6 p-2 group cursor-pointer transition-transform hover:scale-[1.01]">
      
      {/* 1. KROPKA STATUSU */}
      <div className={`w-6 h-6 rounded-full ${statusColors[task.status]} shadow-md flex-shrink-0`} />

      {/* 2. NUMER ZADANIA */}
      <div className="bg-[#8c8c8c] text-white font-bold px-8 py-3 rounded-full text-lg min-w-[180px] text-center shadow">
        {task.title}
      </div>

      {/* 3. OPIS ZADANIA */}
      <div className="bg-[#8c8c8c] text-white/90 px-6 py-3 rounded-full text-base flex-grow shadow italic overflow-hidden text-ellipsis whitespace-nowrap">
        {task.description}
      </div>

      {/* 4. TAGI */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {[task.lang, task.level, task.category].map((info, idx) => (
          <div key={idx} className="bg-[#8c8c8c] text-white px-5 py-3 rounded-full text-sm font-semibold shadow">
            {info}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskRow;