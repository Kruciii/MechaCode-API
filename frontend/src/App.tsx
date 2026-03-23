import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage.js';
// Załóżmy, że masz już stworzony plik LabPage lub CompilerPage
// import LabPage from './pages/LabPage'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Główny widok - Twój Dashboard */}
        <Route path="/" element={<DashboardPage />} />

        {/* Dynamiczna ścieżka do konkretnego zadania w Labie */}
        {/* :taskId pozwoli Ci wiedzieć, które zadanie otworzyć w kompilatorze */}
        <Route path="/lab/:taskId" element={<div>Tu będzie Kompilator dla zadania</div>} />

        {/* Ścieżka awaryjna (404) */}
        <Route path="*" element={<div className="p-10 font-mono">404: System Error - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;