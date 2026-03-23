import React from 'react';
import DashboardPage from './pages/DashboardPage.tsx';

const App: React.FC = () => {
  return (
    // Używamy standardowych kolorów: slate-900 do violet-950
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white">
      <DashboardPage />
    </div>
  );
};

export default App;