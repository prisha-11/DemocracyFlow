import React from 'react';
import Wizard from './components/Wizard';

function App() {
  return (
    <div className="container">
      <header style={{ marginBottom: '2rem' }}>
        <h1 aria-label="Democracy Navigator Application">Democracy Navigator</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          Your simple and secure guide to the voting process.
        </p>
      </header>
      <main>
        <Wizard />
      </main>
    </div>
  );
}

export default App;
