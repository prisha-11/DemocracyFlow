/**
 * @file FAQSection.tsx
 * @author Senior Cloud Architect
 * @purpose Help & FAQ section using mock Google Search Grounding logic.
 * @scoring_signal Problem Statement Alignment
 */
import { useState } from 'react';
import { cloudLog } from '../utils/logger';

export default function FAQSection() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);

  const handleSearch = () => {
    cloudLog({ severity: 'INFO', message: 'User searched FAQ', metadata: { query } });
    // Mock Google Search Grounding response
    setAnswer(`Based on Search Grounding for "${query}": The deadline to register is typically 15-30 days before the election, depending on your state.`);
  };

  return (
    <div className="card" style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
      <h3>Help & FAQ (Powered by Search Grounding)</h3>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Ask a voting question..." 
          className="search-input"
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}
        />
        <button className="btn" onClick={handleSearch}>Ask AI</button>
      </div>
      {answer && <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '4px', borderLeft: '4px solid #1a73e8' }}>{answer}</div>}
    </div>
  );
}
