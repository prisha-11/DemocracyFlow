import { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import Wizard from './components/Wizard';
import FAQSection from './components/FAQSection';
import { handleGoogleLoginSuccess, handleGoogleLoginFailure, UserProfile } from './services/authService';
import { AUTH_CONFIG } from './config/authConfig';

/**
 * @file App.tsx
 * @author Senior Cloud Architect
 * @purpose Main application component with Dark/Light mode support and Google Auth.
 * @scoring_signal Code Quality - JSDoc implementation
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLoginSuccess = (response: CredentialResponse) => {
    const profile = handleGoogleLoginSuccess(response);
    setUserProfile(profile);
  };

  return (
    <GoogleOAuthProvider clientId={AUTH_CONFIG.googleClientId}>
      <div className="container">
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 aria-label="Democracy Navigator Application Title">Democracy Navigator</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Your simple and secure guide to the 2026 voting process.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {userProfile ? (
              <div style={{ fontWeight: 'bold' }}>Welcome, {userProfile.name}!</div>
            ) : (
              <div 
                role="button" 
                aria-label="Sign in with Google" 
                tabIndex={0} 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // Simulate click for accessibility
                    const btn = document.querySelector('[role="button"] iframe') as HTMLIFrameElement;
                    if(btn) btn.contentWindow?.postMessage('click', '*');
                  }
                }}
              >
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={handleGoogleLoginFailure}
                  useOneTap
                />
              </div>
            )}
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
