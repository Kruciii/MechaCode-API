import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Editor} from '@monaco-editor/react';
import './EditorPage.css';

// 1. DEFINIUJEMY TYP ZADANIA (To naprawia podkreślenia!)
interface Task {
  id: string;
  title: string;
  description: string;
  defaultCode: string;
}

// 2. DANE ZADAŃ (Upewnij się, że ID pasują do tych z Dashboardu)
const tasksData: Task[] = [
  { 
    id: '001', 
    title: 'Konto Bankowe', 
    description: 'Zaimplementuj system zarządzania funduszami. Skonstruuj klasę z prywatnym saldem, metodami bezpiecznych wpłat oraz walidacją wypłat.',
    defaultCode: '#include <iostream>\n\nusing namespace std;\n\nclass Konto {\nprivate:\n    double saldo = 0;\npublic:\n    void wplac(double kwota) { /* ... */ }\n};\n\nint main() {\n    cout << "System bankowy gotowy." << endl;\n    return 0;\n}'
  },
  { 
    id: '002', 
    title: 'System Rezerwacji', 
    description: 'Zbuduj moduł rezerwacji miejsc w kinie. Wykorzystaj kontenery Vector do mapowania sali i zaimplementuj zapis stanu do plików.',
    defaultCode: '#include <iostream>\n#include <vector>\n\nint main() {\n    // Rezerwacja miejsc\n    return 0;\n}'
  },
  { 
    id: '003', 
    title: 'Silnik Fizyczny', 
    description: 'Stwórz jądro obliczeniowe dla symulacji kolizji. Oblicz wektory odbicia przy użyciu zaawansowanych przeciążeń operatorów.',
    defaultCode: '#include <iostream>\n\nint main() {\n    // Fizyka kolizji\n    return 0;\n}'
  }
];

const EditorPage: React.FC = () => {
  // Wyciągamy taskId z URL i mówimy TS, że to string
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['> MechaOS v2.0.4 initialized...', '> System ready for compilation.']);

  // Szukamy zadania
  const currentTask = tasksData.find(t => t.id === taskId);

  const handleRunCode = () => {
    setTerminalOutput(prev => [
      ...prev, 
      `> Compiling project ${currentTask?.id}...`, 
      '> Linking libraries...', 
      '> Success! Execution finished with exit code 0.'
    ]);
  };

  // Jeśli nie znajdziemy zadania w tablicy
  if (!currentTask) {
    return (
      <div className="error-screen">
        <h2>404: Zadanie nie odnalezione</h2>
        <button onClick={() => navigate('/')}>Wróć do bazy</button>
      </div>
    );
  }

  return (
    <div className="editor-wrapper">
      <header className="editor-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/')}>← DASHBOARD</button>
          <div className="v-line"></div>
          <span className="task-name-nav">MODULE: {currentTask.title}</span>
        </div>
        <button className="run-btn" onClick={handleRunCode}>RUN COMPILER</button>
      </header>

      <div className="editor-main">
        {/* LEWY PANEL: TREŚĆ */}
        <aside className="editor-sidebar">
          <div className="sidebar-label">DOKUMENTACJA</div>
          <div className="sidebar-scroll">
            <h1 className="sidebar-title">{currentTask.title}</h1>
            <p className="sidebar-desc">{currentTask.description}</p>
            <div className="requirements-box">
              <h3>LOG:</h3>
              <p>Standard: C++20</p>
              <p>Tryb: Debug</p>
            </div>
          </div>
        </aside>

        {/* PRAWY PANEL: MONACO + TERMINAL */}
        <div className="code-section">
          <div className="monaco-container">
            <Editor
              height="100%"
              defaultLanguage="cpp"
              theme="vs-dark"
              defaultValue={currentTask.defaultCode}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                padding: { top: 20 },
                fontFamily: 'JetBrains Mono, monospace',
                smoothScrolling: true,
                cursorBlinking: "expand"
              }}
            />
          </div>

          <div className="terminal-area">
            <div className="terminal-header">CONSOLE OUTPUT</div>
            <div className="terminal-content">
              {terminalOutput.map((line, i) => (
                <div key={i} className="terminal-line">{line}</div>
              ))}
              <div className="terminal-cursor"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;