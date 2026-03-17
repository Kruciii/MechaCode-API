import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";

import { TaskList, TaskListItem } from "./components/task/TaskList";
import { TaskEditor } from "./components/task/TaskEditor";

import { Button } from "@/components/ui/button";
import { Terminal, Cpu, Loader2 } from "lucide-react";

// ==========================================
// 1. STRONA GŁÓWNA (Zintegrowana z Bazą Danych)
// ==========================================
const HomePage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskListItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Pobieranie zadań z FastAPI przy starcie aplikacji
  useEffect(() => {
    fetch("http://localhost:8000/api/tasks")
      .then(res => res.json())
      .then(data => {
        // Backend zwraca obiekt { progress: {...}, tasks: [...] }
        setTasks(data.tasks); 
        setLoading(false);
      })
      .catch(err => {
        console.error("[SYSTEM] Błąd połączenia z bazą:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-5 border-b border-border bg-card flex items-center justify-center shadow-sm z-10">
        <h1 className="text-2xl font-black text-primary flex items-center gap-3 tracking-widest uppercase">
          <Cpu size={28} />
          MECHA_CODE_OS
        </h1>
      </header>
      
      <main className="flex-1 flex flex-col p-6">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-primary gap-4">
            <Loader2 className="animate-spin" size={48} />
            <span className="text-xl font-bold uppercase tracking-widest">Inicjalizacja Sieci Neuronowej...</span>
          </div>
        ) : (
          <TaskList 
            tasks={tasks} 
            onTaskClick={(id) => navigate(`/task/${id}`)} 
          />
        )}
      </main>
    </div>
  );
};

// ==========================================
// 2. STRONA EDYTORA (Zoptymalizowana)
// ==========================================
const EditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // UWAGA: Usunęliśmy stąd useState dla kodu, loadingu i outputu.
  // Nowy TaskEditor sam łączy się z API i sam tym zarządza!

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-6 py-4 border-b border-border bg-card flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3 text-primary">
          <Terminal size={24} />
          <span className="font-bold tracking-wider uppercase">ZADANIE #{id}</span>
        </div>
        <Button variant="outline" onClick={() => navigate('/')} className="border-primary/50 hover:bg-primary/10 transition-colors">
          PRZERWIJ MISJĘ (Powrót)
        </Button>
      </header>

      <main className="flex-1">
        {/* Odpalamy niezależny komponent edytora */}
        <TaskEditor />
      </main>
    </div>
  );
};

// ==========================================
// 3. GŁÓWNY KOMPONENT BAZOWY
// ==========================================
export default function App() {
  return (
    <Router>
      <div className="dark min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/30">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task/:id" element={<EditorPage />} />
        </Routes>
      </div>
    </Router>
  );
}