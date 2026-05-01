import React, { useState } from 'react';

type Milestone = {
  id: number;
  title: string;
  status: string;
};

export default function Wizard() {
  const [step, setStep] = useState(0);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMilestones = async (type: string) => {
    setLoading(true);
    try {
      // Mock API call to FastAPI backend
      // In production: await fetch('http://localhost:8000/api/plan', ...)
      setTimeout(() => {
        setMilestones([
          { id: 1, title: `Check ${type === 'local' ? 'Local' : 'Federal'} Registration`, status: 'pending' },
          { id: 2, title: `Find Polling Place`, status: 'pending' },
          { id: 3, title: `Vote`, status: 'pending' }
        ]);
        setLoading(false);
        setStep(1);
      }, 600);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Election Day - Go Vote!\nDTSTART:20261103T090000Z\nDTEND:20261103T180000Z\nDESCRIPTION:Your reminder to participate in democracy.\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'election_day.ics';
    a.click();
  };

  const totalSteps = milestones.length > 0 ? milestones.length : 1;
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="card" role="region" aria-label="Election Guide Wizard">
      {/* Mandatory Progress Bar */}
      <div 
        className="progress-container" 
        role="progressbar" 
        aria-valuenow={progressPercentage} 
        aria-valuemin={0} 
        aria-valuemax={100}
        aria-label="Wizard progress indicator"
      >
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      {step === 0 && (
        <div aria-live="polite">
          <h2>Select Election Type</h2>
          <p>Choose the type of election you need help with.</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button 
              className="btn" 
              onClick={() => fetchMilestones('local')}
              aria-label="Start local election guide"
            >
              Local Election
            </button>
            <button 
              className="btn" 
              onClick={() => fetchMilestones('national')}
              aria-label="Start national election guide"
            >
              National Election
            </button>
          </div>
          {loading && <p aria-live="assertive" style={{ marginTop: '1rem' }}>Loading your milestones...</p>}
        </div>
      )}

      {step > 0 && step <= milestones.length && (
        <div aria-live="polite">
          <h2>Step {step}: {milestones[step - 1].title}</h2>
          
          {step === 2 && (
            <div className="map-placeholder" aria-label="Google Maps Integration Placeholder">
              <span>Map View Placeholder (Architectural readiness for Google Maps API)</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
            {step > 1 && (
              <button 
                className="btn btn-secondary" 
                onClick={() => setStep(step - 1)}
                aria-label="Go to previous step"
              >
                Back
              </button>
            )}
            <button 
              className="btn" 
              onClick={() => setStep(step + 1)}
              aria-label={step === milestones.length ? "Finish guide" : "Go to next step"}
            >
              {step === milestones.length ? "Finish" : "Next"}
            </button>
            
            {step === milestones.length && (
              <button 
                className="btn btn-secondary" 
                onClick={generateICS}
                aria-label="Add Election Day to Google Calendar"
              >
                Add to Calendar (.ics)
              </button>
            )}
          </div>
        </div>
      )}

      {step > milestones.length && (
        <div aria-live="polite">
          <h2>All Done!</h2>
          <p>You are ready to vote. Thank you for participating in democracy.</p>
          <button className="btn" onClick={() => setStep(0)} aria-label="Start over">Start Over</button>
        </div>
      )}
    </div>
  );
}
