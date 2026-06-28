import React from 'react';
import { Link } from 'react-router-dom';
import './TaskSidebar.css';

interface Task {
  id: string;
  title: string;
}

interface TaskSidebarProps {
  tasks: Task[];
  activeId: string | undefined;
}

const TaskSidebar: React.FC<TaskSidebarProps> = ({ tasks, activeId }) => {
  return (
    <nav className="tasks-nav-sidebar">
      <div className="sidebar-label">LISTA ZADAŃ</div>
      <div className="nav-scroll">
        {tasks.map(task => (
          <Link 
            key={task.id} 
            to={`/editor/${task.id}`} 
            className={`nav-item ${task.id === activeId ? 'active' : ''}`}
          >
            {task.id === activeId && <div className="active-indicator" />}
            <span className="nav-id">TASK {task.id}</span>
            <span className="nav-title">{task.title}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default TaskSidebar;