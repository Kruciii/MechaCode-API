import React, { useState } from  'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Editor} from '@monaco-editor/react';
import { Button } from '../components/ui/button.tsx';
import './EditorPage.css';

const EditorPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [code, setCode] = useState<string>('#include <iostream>\n\nint main() {\n    std::cout << "System Ready" << std::endl;\n    return 0;\n}');
  const [output, setOutput] = useState<string>('Terminal: Oczekiwanie na uruchomienie...');

  return (
    <div className="editor-page-wrapper">
      
      {/* SIDEBAR Z TREŚCIĄ ZADANIA */}
      <aside className="task-info-sidebar">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="back-btn-styled"
        >
          ← WRÓĆ DO DASHBOARDU
        </Button>

        <div className="task-pill-header">
          <span className="task-instance-id">TASK INSTANCE #{taskId}</span>
          <h1>KONTO BANKOWE</h1>
          <div className="task-meta-tags">
            <span className="tag-mini">C++</span>
            <span className="tag-mini">OOP</span>
            <span className="tag-mini">Medium</span>
          </div>
        </div>

        <div className="task-scroll-area">
          <p className="task-desc">
            Stwórz klasę <strong>KontoBankowe</strong> z polami prywatnymi <code>saldo</code> i <code>wlasciciel</code>.
          </p>
          <ul className="task-bullets">
            <li>• Napisz konstruktor inicjalizujący dane.</li>
            <li>• Dodaj metodę <code>depozyt(amount)</code>.</li>
            <li>• Zabezpiecz system przed ujemnymi kwotami.</li>
          </ul>
        </div>
      </aside>

      {/* GŁÓWNY OBSZAR ROBOCZY */}
      <main className="editor-main-section">
        
        {/* TOOLBAR */}
        <div className="editor-toolbar">
          <div className="file-status">
            <div className="pulse-dot"></div>
            <span>main.cpp</span>
          </div>
          <Button className="run-btn-neon" onClick={() => setOutput("🚀 Kompilacja...\nSukces!\nOutput: System Ready")}>
            URUCHOM (RUN)
          </Button>
        </div>

        {/* MONACO EDITOR */}
        <div className="monaco-frame">
          <Editor
            height="100%"
            defaultLanguage="cpp"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              fontSize: 14,
              fontFamily: 'JetBrains Mono',
              minimap: { enabled: false },
              padding: { top: 20 },
              cursorSmoothCaretAnimation: "on",
              smoothScrolling: true,
            }}
          />
        </div>

        {/* DOLNY TERMINAL */}
        <footer className="terminal-footer">
          <div className="terminal-label">
            <span>Terminal Output</span>
            <span className="text-indigo-500">v1.0.4</span>
          </div>
          <pre className="terminal-text">{output}</pre>
        </footer>

      </main>
    </div>
  );
};

export default EditorPage;