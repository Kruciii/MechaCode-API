import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

function App() {
  const [code, setCode] = useState('// Napisz swój kod tutaj\nconsole.log("Hello MechaCode!");');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/test-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      
      // Wyświetlamy wynik z Judge0
      setOutput(data.stdout || data.message || "Brak wyjścia (Output)");
    } catch (err) {
      setOutput("Błąd połączenia z API");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', background: '#1e1e1e', color: '#fff', minHeight: '100vh' }}>
      <h1>🤖 MechaCode Editor</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1, border: '1px solid #444' }}>
          <Editor
            height="60vh"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
          />
          <button 
            onClick={runCode} 
            disabled={loading}
            style={{ width: '100%', padding: '15px', background: '#007acc', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            {loading ? 'Uruchamianie...' : '🚀 URUCHOM KOD'}
          </button>
        </div>
        <div style={{ flex: 1, background: '#000', padding: '20px', borderRadius: '5px' }}>
          <h3>Output:</h3>
          <pre style={{ color: '#00ff00' }}>{output}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;