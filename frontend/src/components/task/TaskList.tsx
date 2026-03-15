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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {tasks.map(task => (
        <div
          key={task.id}
          className="bg-[#1e272e] border border-[#34495e] p-6 rounded-lg cursor-pointer transition-all hover:shadow-lg hover:border-blue-500 hover:-translate-y-2 relative overflow-hidden"
          onClick={() => onTaskClick(task.id)}
        >
          <div className="absolute top-0 left-0 w-1 h-full rounded-l bg-green-400" />
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-lg font-semibold text-white">{task.title}</h4>
            <span className="w-3 h-3 rounded-full bg-green-400 block" />
          </div>
          <p className="text-sm text-gray-400 mb-4 h-12 overflow-hidden">{task.short_content}</p>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <span className="bg-[#34495e] text-gray-200 px-2 py-1 rounded text-xs uppercase">{task.topic}</span>
              <span className={`px-2 py-1 rounded text-xs uppercase ${task.difficulty === 'HARD' ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'}`}>{task.difficulty}</span>
            </div>
            <span className="text-xs text-gray-500 font-bold">{task.semester}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
