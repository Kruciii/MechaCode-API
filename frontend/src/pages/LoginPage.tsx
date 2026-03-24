import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [isUsos, setIsUsos] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLoginSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Po kliknięciu "Zaloguj się" idziemy do listy zadań
  navigate('/dashboard'); 
};

  return (
    <div className="login-page-wrapper">
      {/* TŁO: KOLOROWE GRADIENTY (BLOBS) */}
      <div className="blob blob-purple"></div>
      <div className="blob blob-green"></div>
      <div className="blob blob-blue"></div>

      <div className="login-container">
        {!isUsos ? (
          /* KARTA MECHACODE */
          <div className="glass-card mecha-card">
            <h1 className="logo-main">Mecha<span>Code</span></h1>
            <div className="status-row">
              <div className="pulse-dot"></div>
              <span className="status-text">SYSTEM READY</span>
            </div>
            <p className="login-subtitle">Zaloguj się, aby kontynuować projektowanie.</p>
            <button className="btn-auth" onClick={() => setIsUsos(true)}>
              AUTORYZUJ PRZEZ USOS
            </button>
          </div>
        ) : (
          /* KARTA USOS */
          <div className="glass-card usos-card">
            <h1 className="logo-usos">USOS</h1>
            <form className="usos-form" onSubmit={handleLoginSubmit}>
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="IDENTYFIKATOR" 
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  required 
                />
              </div>
              <div className="input-group">
                <input 
                  type="password" 
                  placeholder="HASŁO" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="btn-usos">ZALOGUJ SIĘ</button>
            </form>
            <button className="back-link" onClick={() => setIsUsos(false)}>
              ← POWRÓT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;