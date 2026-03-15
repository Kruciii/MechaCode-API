import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './TaskList.js';
import TaskEditor from './TaskEditor.js';

function App() {
  return (
    <Router>
      <div style={{ 
        background: '#121212', // Ciemne tło dla całej apki
        minHeight: '100vh', 
        width: '100vw',
        margin: 0,
        padding: 0
      }}>
        <Routes>
          {/* Strona główna: Lista wszystkich zadań (Strona 3) */}
          <Route path="/" element={<TaskList />} />

          {/* Strona zadania: Edytor z instrukcją (Strona 4) */}
          {/* Parametr :id pozwala TaskEditorowi wiedzieć, które zadanie pobrać z bazy */}
          <Route path="/task/:id" element={<TaskEditor />} />
          
          {/* Opcjonalnie: Obsługa nieistniejących stron */}
          <Route path="*" element={
            <div style={{ color: 'white', padding: '20px' }}>
              <h2>404 - System MechaCode nie odnalazł tej lokalizacji.</h2>
              <button onClick={() => window.location.href = '/'}>Wróć do bazy</button>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;