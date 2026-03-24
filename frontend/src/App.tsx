import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage.tsx';
import EditorPage from './pages/EditorPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/editor/:taskId" element={<EditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;