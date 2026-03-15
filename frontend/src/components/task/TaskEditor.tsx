import React from "react";
import { Button } from "@/components/ui/button";

export interface TaskEditorProps {
  // Define props as needed, e.g.:
  onSubmit?: () => void;
  code: string;
  onCodeChange: (code: string) => void;
  loading?: boolean;
  output?: string;
}

export const TaskEditor: React.FC<TaskEditorProps> = ({
  onSubmit,
  code,
  onCodeChange,
  loading = false,
  output = "",
}) => {
  return (
    <div className="flex flex-col gap-4 bg-[#1a1a1a] text-white min-h-screen p-5 font-sans">
      <div className="flex-1 flex flex-col gap-2">
        <textarea
          className="w-full h-64 p-3 rounded bg-[#2c3e50] text-base text-white border border-[#333] focus:outline-none focus:ring-2 focus:ring-primary"
          value={code}
          onChange={e => onCodeChange(e.target.value)}
          placeholder="Wpisz swój kod tutaj..."
        />
        <Button onClick={onSubmit} disabled={loading} className="w-full mt-2">
          {loading ? "Kompilacja w toku..." : "URUCHOM PROTOKÓŁ"}
        </Button>
        <div className="bg-black p-4 rounded border border-[#333] mt-2 min-h-[60px]">
          <h4 className="text-gray-400 mb-2">Terminal Odbiorczy:</h4>
          <pre className="text-green-400 font-mono whitespace-pre-wrap m-0">{output}</pre>
        </div>
      </div>
    </div>
  );
};
