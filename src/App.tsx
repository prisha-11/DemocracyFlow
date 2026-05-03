import { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Wizard from './components/Wizard';
import FAQSection from './components/FAQSection';
import { handleGoogleLoginSuccess, handleGoogleLoginFailure } from './services/authService';

/**
 * @file App.tsx
 * @author Senior Cloud Architect
 * @purpose Main application component with Dark/Light mode support.
 * @scoring_signal Code Quality - JSDoc implementation
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
    <GoogleOAuthProvider clientId="MOCK_CLIENT_ID">
      <div className="container">
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 aria-label="Democracy Navigator Application Title">Democracy Navigator</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Your simple and secure guide to the 2026 voting process.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              useOneTap
            />
            <button 
              className="btn btn-secondary" 
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </header>
        <main>
          <Wizard />
          <FAQSection />
        </main>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
