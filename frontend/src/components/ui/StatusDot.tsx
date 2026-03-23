import React from 'react';
import type { TaskStatus } from '../../features/tasks/task.tsx';

interface StatusDotProps {
  status: TaskStatus;
}

const StatusDot: React.FC<StatusDotProps> = ({ status }) => {
  // Mapowanie statusu na konkretne klasy kolorów z Twojego projektu
  const statusConfig = {
    done: 'bg-[#4ade80] shadow-[0_0_10px_#4ade80]',   // Zielony + delikatny neon
    failed: 'bg-[#f87171] shadow-[0_0_10px_#f87171]', // Czerwony + delikatny neon
    todo: 'bg-[#a3a3a3] shadow-none',                 // Szary (wyłączony)
  };

  return (
    <div 
      className={`w-6 h-6 rounded-full flex-shrink-0 transition-all duration-300 ${statusConfig[status]}`}
      title={`Status: ${status}`}
    />
  );
};

export default StatusDot;