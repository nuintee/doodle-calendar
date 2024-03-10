import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TemplatesProvider } from './contexts/templates.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TemplatesProvider>
      <App />
    </TemplatesProvider>
  </React.StrictMode>
);
