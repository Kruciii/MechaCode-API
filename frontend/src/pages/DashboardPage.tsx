import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const tasks = [
    { 
      id: '001', 
      title: 'Konto Bankowe', 
      diff: 'Medium', 
      tags: ['C++', 'OOP', 'Logic'],
      description: 'Zaimplementuj system zarządzania funduszami. Skonstruuj klasę z prywatnym saldem, metodami bezpiecznych wpłat oraz walidacją wypłat.'
    },
    { 
      id: '002', 
      title: 'System Rezerwacji', 
      diff: 'Hard', 
      tags: ['C++', 'Vectors', 'Files'],
      description: 'Zbuduj moduł rezerwacji miejsc w kinie. Wykorzystaj kontenery Vector do mapowania sali i zaimplementuj zapis stanu do plików.'
    },
    { 
      id: '003', 
      title: 'Silnik Fizyczny', 
      diff: 'Expert', 
      tags: ['C++', 'Math', 'Physics'],
      description: 'Stwórz jądro obliczeniowe dla symulacji kolizji. Oblicz wektory odbicia przy użyciu zaawansowanych przeciążeń operatorów.'
    },
    { 
      id: '004', 
      title: 'Analizator Tekstu', 
      diff: 'Easy', 
      tags: ['C++', 'Strings'],
      description: 'Zaprojektuj parser logów systemowych. Program musi identyfikować błędy i generować raport statystyczny w konsoli.'
    },
    { 
      id: '005', 
      title: 'Stacja Pogodowa', 
      diff: 'Medium', 
      tags: ['C++', 'Inheritance'],
      description: 'Wykorzystaj dziedziczenie do stworzenia hierarchii sensorów. Moduł musi agregować dane i wyliczać średnią kroczącą.'
    },
    { 
      id: '006', 
      title: 'Szyfrator AES-Lite', 
      diff: 'Hard', 
      tags: ['C++', 'Security', 'Bits'],
      description: 'Zaimplementuj algorytm szyfrowania XOR z rotacją bitową. Zabezpiecz komunikację między modułami MechaCode.'
    }
  ];

  return (
    <div className="dashboard-wrapper">
      <header className="dash-header">
        <div className="header-container">
          <div className="logo-section">
            <h1 className="logo-mini">Mecha<span>Code</span></h1>
            <div className="divider-v"></div>
            <h2 className="course-title">Programowanie Obiektowe</h2>
          </div>
          <div className="header-actions">
            <div className="status-badge">
              <span className="dot-online"></span>
              SYSTEM ONLINE
            </div>
            <button className="btn-logout" onClick={() => navigate('/login')}>WYLOGUJ</button>
          </div>
        </div>
      </header>

      <main className="dash-container">
        <div className="tasks-grid">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className="task-card"
              onClick={() => navigate(`/editor/${task.id}`)}
            >
              <div className="card-header">
                <span className="task-id">ID: {task.id}</span>
                <div className={`diff-dot ${task.diff.toLowerCase()}`}></div>
              </div>
              
              <h3 className="task-title">{task.title}</h3>
              
              <div className="tags-container">
                {task.tags.map(tag => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>

              {/* TO JEST TA NOWA SEKCJA ROZWIJANA */}
              <div className="task-expand-wrapper">
                <div className="task-description-content">
                  {task.description}
                </div>
              </div>

              <div className="card-footer">
                <div className="diff-info">
                  <span className="diff-text">{task.diff}</span>
                </div>
                <span className="arrow-icon">→</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;