import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 1. IMPORTUJEMY TO
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* 2. OWIJAMY TYM CAŁE <App /> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);