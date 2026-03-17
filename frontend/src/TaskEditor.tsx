import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Terminal, Code2, BookOpen } from "lucide-react";

export const TaskEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Stany aplikacji
  const [task, setTask] = useState<any>(null);
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("Czekam na uruchomienie protokołu...");
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [fetchingTask, setFetchingTask] = useState<boolean>(true);

  // 1. Pobieranie zadania z API
  useEffect(() => {
    fetch(`http://localhost:8000/api/tasks/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Nie znaleziono misji!");
        return res.json();
      })
      .then((data) => {
        setTask(data);
        setCode(data.initial_code || "// Rozpocznij kodowanie...");
        setFetchingTask(false);
      })
      .catch((err) => {
        console.error(err);
        setFetchingTask(false);
      });
  }, [id]);

  // 2. Wysyłanie kodu do sędziego
  const handleSubmit = async () => {
    setLoadingSubmit(true);
    setOutput("[SYSTEM] Nawiązywanie połączenia z sędzią Judge0...");
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code }),
      });

      const data = await response.json();

      if (data.status === "Accepted") {
        setOutput(`[SYSTEM] STATUS: ACCEPTED\n\nWynik operacji:\n${data.stdout}`);
      } else {
        setOutput(`[SYSTEM] STATUS: ERROR (${data.status})\n\nLogi systemowe:\n${data.compile_output || data.stderr || "Błąd krytyczny"}`);
      }
    } catch (err) {
      setOutput("[SYSTEM] BŁĄD: Brak połączenia z rdzeniem sędziego.");
    }
    setLoadingSubmit(false);
  };

  if (fetchingTask) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-primary">
        <div className="animate-pulse tracking-widest uppercase font-black">Inicjalizacja Misji...</div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-destructive">
        <h2 className="text-2xl font-bold">BŁĄD: Misja nie istnieje!</h2>
        <Button onClick={() => navigate("/")} variant="link">Powrót do bazy</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-65px)] bg-background">
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        
        {/* LEWA STRONA: Opis zadania */}
        <div className="w-1/3 flex flex-col bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-muted/30 px-4 py-3 border-b border-border flex items-center gap-2 text-primary font-bold uppercase tracking-tighter">
            <BookOpen size={18} />
            <span>Dokumentacja Misji</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6 prose prose-invert max-w-none">
            <h1 className="text-xl text-foreground mb-4">{task.title}</h1>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {task.content}
            </div>
          </div>
        </div>

        {/* PRAWA STRONA: Edytor i Terminal */}
        <div className="flex-1 flex flex-col gap-4">
          
          {/* Edytor Monaco */}
          <div className="flex-[2] bg-card border border-border rounded-xl overflow-hidden flex flex-col shadow-2xl">
            <div className="bg-muted/30 px-4 py-2 border-b border-border flex justify-between items-center text-xs font-mono">
              <div className="flex items-center gap-2">
                <Code2 size={14} className="text-primary" />
                <span className="text-muted-foreground uppercase">src/solution.cpp</span>
              </div>
              <span className="text-primary/70">{task.language || "C++ 17"}</span>
            </div>
            <div className="flex-1">
              <Editor
                height="100%"
                defaultLanguage={task.language || "cpp"}
                theme="vs-dark"
                value={code}
                onChange={(v) => setCode(v || "")}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  padding: { top: 10 },
                  fontFamily: "var(--font-mono)",
                }}
              />
            </div>
          </div>

          {/* Terminal */}
          <div className="flex-1 bg-black border border-border rounded-xl overflow-hidden flex flex-col shadow-2xl">
            <div className="bg-muted/10 px-4 py-2 border-b border-border flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
              <Terminal size={14} />
              <span>Logi Terminala</span>
            </div>
            <pre className="flex-1 p-4 font-mono text-sm text-green-500 overflow-y-auto whitespace-pre-wrap selection:bg-green-500/20">
              {output}
            </pre>
            <div className="p-3 bg-muted/5 border-t border-border">
              <Button 
                onClick={handleSubmit} 
                disabled={loadingSubmit}
                className="w-full font-black tracking-widest uppercase py-6 text-lg transition-all"
              >
                {loadingSubmit ? "Przetwarzanie..." : "Uruchom Protokół"}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TaskEditor;