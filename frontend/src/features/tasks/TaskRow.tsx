import React from 'react';
import type { ITask } from './task.tsx';
import StatusDot from '../../components/ui/StatusDot.tsx';
import { Button } from '@/components/ui/button.tsx'; // Twoja ścieżka do przycisku

interface TaskRowProps {
  task: ITask;
}

const TaskRow: React.FC<TaskRowProps> = ({ task }) => {
  return (
    <div className="flex items-center gap-6 w-full group p-2 hover:bg-white/5 rounded-[40px] transition-all duration-300">
      
      {/* 1. KROPKA STATUSU */}
      <div className="shrink-0">
        <StatusDot status={task.status} />
      </div>

      {/* 2. NUMER ZADANIA (Pastylka Główna) */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-8 py-3 rounded-full text-lg min-w-[180px] text-center shadow-xl">
        {task.title}
      </div>

      {/* 3. OPIS ZADANIA (Pastylka Elastyczna) */}
      <div className="bg-white/5 border border-white/10 text-white/80 px-8 py-3 rounded-full text-base flex-grow shadow-sm italic overflow-hidden text-ellipsis whitespace-nowrap">
        {task.description}
      </div>

      {/* 4. TAGI (C++, Noob, itp.) */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {[task.lang, task.level].map((info, idx) => (
          <div 
            key={idx} 
            className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-5 py-2 rounded-full text-xs font-mono font-semibold uppercase tracking-wider"
          >
            {info}
          </div>
        ))}
      </div>

      {/* 5. TWÓJ KOMPONENT BUTTON */}
      <Button 
        variant="default" // lub Twój odpowiedni wariant
        className="rounded-full px-8 py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-transform active:scale-95 shadow-[0_0_15px_rgba(79,70,229,0.4)]"
      >
        START
      </Button>

    </div>
  );
};

export default TaskRow;