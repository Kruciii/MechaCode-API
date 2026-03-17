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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted/60 py-10 px-2">
      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-xl p-8 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-primary mb-2 tracking-tight">Edytor Zadania</h2>
        <textarea
          className="w-full h-64 p-4 rounded-xl bg-muted text-base text-foreground border border-input focus:outline-none focus:ring-2 focus:ring-primary/60 transition-all shadow-inner resize-y font-mono"
          value={code}
          onChange={e => onCodeChange(e.target.value)}
          placeholder="Wpisz swój kod tutaj..."
        />
        <Button onClick={onSubmit} disabled={loading} className="w-full mt-2 text-base py-3" variant={loading ? 'secondary' : 'default'}>
          {loading ? (
            <span className="flex items-center gap-2"><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" /> Kompilacja w toku...</span>
          ) : (
            <span>URUCHOM PROTOKÓŁ</span>
          )}
        </Button>
        <div className="bg-black/90 p-5 rounded-xl border border-border mt-2 min-h-[60px] shadow-inner">
          <h4 className="text-gray-400 mb-2 text-sm font-semibold">Terminal Odbiorczy:</h4>
          <pre className="text-green-400 font-mono whitespace-pre-wrap m-0 text-sm">{output}</pre>
        </div>
      </div>
    </div>
  );
};
