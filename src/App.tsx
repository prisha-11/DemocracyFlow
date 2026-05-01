import React, { useState, useEffect } from 'react';
import Wizard from './components/Wizard';

/**
 * Main application component with Dark/Light mode support.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="container">
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 aria-label="Democracy Navigator Application Title">Democracy Navigator</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Your simple and secure guide to the 2026 voting process.
          </p>
        </div>
        <button 
          className="btn btn-secondary" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          style={{ padding: '8px 16px', fontSize: '0.9rem' }}
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>
      <main>
        <Wizard />
      </main>
    </div>
  );
}

export default App;
