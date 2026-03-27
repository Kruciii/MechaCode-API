import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Dodaj import
import type { ITask } from './task.tsx';
import StatusDot from '../../components/ui/StatusDot.tsx';
import { Button } from '@/components/ui/button.tsx';
import './TaskRow.css'; // <--- IMPORTUJEMY NOWY CSS

interface TaskRowProps {
  task: ITask;
}

const TaskRow: React.FC<TaskRowProps> = ({ task }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/editor/${task.id}`); // Przenosi nas do edytora z ID zadania
  };
  return (
    <div className="task-row-container">

      {/* NOWOŚĆ: Ukryty Dymek (Tooltip) */}
      <div className="task-tooltip-dymek">
        <span className="tooltip-title">// {task.title}</span>
        <p className="tooltip-description">{task.description}</p>
      </div>
      
      {/* 1. STATUS */}
      <div style={{ flexShrink: 0 }}>
        <StatusDot status={task.status} />
      </div>

      {/* 2. TYTUŁ */}
      <div className="task-badge-main">
        {task.title}
      </div>

      {/* 3. OPIS */}
      <div className="task-description-pill">
        {task.description}
      </div>

      {/* 4. TAGI */}
      <div className="task-tags-container">
        {[task.lang, task.level].map((info, idx) => (
          <div key={idx} className="task-tag">
            {info}
          </div>
        ))}
      </div>

      {/* 5. PRZYCISK */}
    <Button className="task-start-button" onClick={handleStart}>
      START
    </Button>

    </div>
  );
};

export default TaskRow;