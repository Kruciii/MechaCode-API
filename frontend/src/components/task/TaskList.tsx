import React from "react";
import { Button } from "@/components/ui/button";

export interface TaskListItem {
  id: number;
  title: string;
  status: string;
  short_content: string;
  topic: string;
  difficulty: string;
  semester: string;
}

export interface TaskListProps {
  tasks: TaskListItem[];
  onTaskClick: (id: number) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick }) => {
  const statusColors: Record<string, string> = {
    DONE: 'bg-green-400',
    IN_PROGRESS: 'bg-yellow-400',
    NOT_STARTED: 'bg-red-400',
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/60 py-10 px-2">
      <h2 className="text-3xl font-bold text-primary mb-8 tracking-tight text-center">Lista Zadań</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tasks.map(task => (
          <div
            key={task.id}
            className="relative bg-card border border-border rounded-2xl shadow-lg p-7 flex flex-col gap-4 cursor-pointer transition-all hover:shadow-2xl hover:border-primary/70 hover:-translate-y-2 group"
            onClick={() => onTaskClick(task.id)}
          >
            <div className={`absolute top-0 left-0 w-2 h-full rounded-l-xl ${statusColors[task.status] || 'bg-gray-400'} transition-all`} />
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{task.title}</h4>
              <span className={`w-4 h-4 rounded-full border-2 border-white shadow ${statusColors[task.status] || 'bg-gray-400'} block`} />
            </div>
            <p className="text-sm text-muted-foreground mb-2 h-14 overflow-hidden leading-relaxed">{task.short_content}</p>
            <div className="flex justify-between items-center mt-auto">
              <div className="flex gap-2">
                <span className="bg-muted text-foreground/80 px-2 py-1 rounded text-xs uppercase tracking-wide font-semibold shadow-sm">{task.topic}</span>
                <span className={`px-2 py-1 rounded text-xs uppercase font-bold ${task.difficulty === 'HARD' ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'}`}>{task.difficulty}</span>
              </div>
              <span className="text-xs text-muted-foreground font-bold">{task.semester}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
