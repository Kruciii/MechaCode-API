import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';

function TaskEditor() {
  const { id } = useParams<{ id: string }>(); // Wyciągamy ID z adresu URL (np. /task/1)
  const navigate = useNavigate();
  
  // Stany aplikacji
  const [task, setTask] = useState<any>(null); // Tu trzymamy pobrane szczegóły zadania
  const [code, setCode] = useState<string>(''); // Kod w edytorze
  const [output, setOutput] = useState<string>(''); // Wynik z terminala
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false); // Ładowanie przy wysyłaniu
  const [fetchingTask, setFetchingTask] = useState<boolean>(true); // Ładowanie przy pobraniu z API

  // --- 1. POBIERANIE ZADANIA Z API ---
  useEffect(() => {
    fetch(`http://localhost:8000/api/tasks/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Nie znaleziono zadania!");
        return res.json();
      })
      .then(data => {
        setTask(data);
        setCode(data.initial_code); // Wrzucamy kod startowy z bazy do Monaco
        setFetchingTask(false);
      })
      .catch(err => {
        console.error(err);
        setFetchingTask(false);
      });
  }, [id]);

  // --- 2. WYSYŁANIE KODU DO SĘDZIEGO ---
  const handleSubmit = async () => {
    setLoadingSubmit(true);
    setOutput('Trwa nawiązywanie połączenia z sędzią...');
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code }),
      });
      
      const data = await response.json();
      
      if (data.status === "Accepted") {
        setOutput(`✅ SUKCES:\n${data.stdout}`);
      } else {
        setOutput(`❌ BŁĄD (${data.status}):\n${data.compile_output || data.stderr || "Błąd wykonania"}`);
      }
    } catch (err) {
      setOutput("Błąd połączenia z serwerem.");
    }
    setLoadingSubmit(false);
  };

  // Zabezpieczenia podczas ładowania
  if (fetchingTask) return <h2 style={{ color: 'white', padding: '20px' }}>Pobieranie misji...</h2>;
  if (!task) return <h2 style={{ color: '#e74c3c', padding: '20px' }}>Błąd: Taka misja nie istnieje!</h2>;

  return (
    <div style={{ padding: '20px', background: '#1a1a1a', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Przycisk powrotu */}
      <button 
        onClick={() => navigate('/')} 
        style={{ marginBottom: '20px', padding: '10px 20px', background: '#34495e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        ← Powrót do Listy Zadań
      </button>
      
      <div style={{ display: 'flex', gap: '20px', height: '80vh' }}>
        
        {/* --- LEWA STRONA: INSTRUKCJA ZADANIA --- */}
        <div style={{ flex: 1, background: '#2c3e50', padding: '20px', borderRadius: '8px', overflowY: 'auto' }}>
          <h2 style={{ borderBottom: '2px solid #34495e', paddingBottom: '10px', marginTop: 0 }}>
            Misja #{task.id}: {task.title}
          </h2>
          {/* Używamy pre-wrap, żeby React szanował entery w tekście z backendu */}
          <div style={{ whiteSpace: 'pre-wrap', color: '#ecf0f1', lineHeight: '1.6', fontSize: '16px' }}>
            {task.content}
          </div>
        </div>

        {/* --- PRAWA STRONA: EDYTOR I TERMINAL --- */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* Edytor Monaco */}
          <div style={{ flex: 2, borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
            <Editor
              height="100%"
              defaultLanguage={task.language || "cpp"}
              theme="vs-dark"
              value={code}
              onChange={(value: string | undefined) => setCode(value || "")}
            />
          </div>
          
          {/* Przycisk Wysyłania */}
          <button 
            onClick={handleSubmit} 
            disabled={loadingSubmit}
            style={{ 
              width: '100%', padding: '15px',
              backgroundColor: loadingSubmit ? '#7f8c8d' : '#2ecc71', color: 'white',
              border: 'none', borderRadius: '5px', cursor: loadingSubmit ? 'wait' : 'pointer', 
              fontWeight: 'bold', fontSize: '16px', transition: 'background 0.3s'
            }}
          >
            {loadingSubmit ? 'Kompilacja w toku...' : 'URUCHOM PROTOKÓŁ'}
          </button>
          
          {/* Terminal */}
          <div style={{ flex: 1, background: '#000', padding: '15px', borderRadius: '5px', border: '1px solid #333', overflowY: 'auto' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#7f8c8d' }}>Terminal Odbiorczy:</h4>
            <pre style={{ whiteSpace: 'pre-wrap', color: '#00ff00', fontFamily: 'monospace', margin: 0 }}>
              {output}
            </pre>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TaskEditor;