import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Editor} from '@monaco-editor/react';
import './EditorPage.css';
import TaskSidebar from '@/features/tasks/TaskSidebar.tsx';
import { tasksData } from '@/features/tasks/TaskData.tsx';

const EditorPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Stan zwijania
  // Wyciągamy taskId z URL i mówimy TS, że to string
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['> MechaOS v2.0.4 initialized...', '> System ready for compilation.']);

  // Szukamy zadania
 const currentTask = tasksData.find(t => t.id === taskId) || tasksData[0];

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
    <div className={`editor-wrapper ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
      <header className="editor-header">
        <div className="header-left">
          {/* TU JEST MIEJSCE NA PRZYCISK */}
          <button 
            className={`sidebar-toggle ${isSidebarOpen ? 'active' : ''}`} 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
          
          <button className="back-btn" onClick={() => navigate('/dashboard')}>←</button>
          <div className="v-line"></div>
          <span className="task-name-nav">MODULE: {currentTask?.title}</span>
        </div>
        <button className="run-btn" onClick={handleRunCode}>RUN COMPILER</button>
      </header>

      <div className="editor-main">
        {/* SIDEBAR - Znika gdy isSidebarOpen jest false */}
      {isSidebarOpen && <TaskSidebar tasks={tasksData} activeId={taskId} />}
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
              key={currentTask.id}
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