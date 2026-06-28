import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import Dashboard from './pages/DashboardPage.tsx';
import EditorPage from './pages/EditorPage.tsx';

const App: React.FC = () => {
  return (
    <Routes>
      {/* 1. Startujemy od logowania */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* 2. Główny panel z kafelkami */}
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* 3. Edytor z dynamicznym ID zadania */}
      <Route path="/editor/:taskId" element={<EditorPage />} />
      
      {/* 4. Automatyczne przekierowanie, jeśli ktoś wejdzie na pusty adres */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;