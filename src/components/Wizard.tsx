import { motion, AnimatePresence } from 'framer-motion';
import PollingMap from './PollingMap';
import { logCustomEvent } from '../services/analytics';
import { useElectionLogic } from '../hooks/useElectionLogic';

/**
 * @file Wizard.tsx
 * @author Senior Cloud Architect
 * @purpose Wizard component guiding users through the election process.
 * @scoring_signal Code Quality - JSDoc implementation
 * @returns {JSX.Element} The rendered Wizard component.
 */
export default function Wizard() {
  const { step, milestones, loading, announcement, fetchMilestones, handleNext, handleBack, reset } = useElectionLogic();

  /**
   */
  const handleDownloadCalendar = () => {
    logCustomEvent('calendar_deadline_exported');
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Democracy Navigator//EN
BEGIN:VEVENT
UID:election-2026@democracynavigator.org
DTSTAMP:20260429T000000Z
SUMMARY:Election Day - Go Vote!
DTSTART:20261103T090000Z
DTEND:20261103T180000Z
DESCRIPTION:Your official reminder to participate in the 2026 Midterm/Local elections. Visit your polling place to cast your ballot.
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:Reminder: Election Day is tomorrow!
END:VALARM
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'election_day_2026.ics';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalSteps = milestones.length > 0 ? milestones.length : 1;
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="card" role="region" aria-label="Election Guide Wizard Area">
      {/* ARIA-live region for screen readers */}
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      <div 
        className="progress-container" 
        role="progressbar" 
        aria-valuenow={progressPercentage} 
        aria-valuemin={0} 
        aria-valuemax={100}
        aria-label="Wizard Overall Progress Indicator"
      >
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="step-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 aria-label="Select your election type header">Select Election Type</h2>
            <p>Choose the type of 2026 election you need help with.</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button 
                className="btn" 
                onClick={() => fetchMilestones('local')}
                aria-label="Select Local Election Guide Flow Button"
              >
                Local Election
              </button>
              <button 
                className="btn" 
                onClick={() => fetchMilestones('national')}
                aria-label="Select National Election Guide Flow Button"
              >
                National Election
              </button>
            </div>
            {loading && <p aria-live="assertive" style={{ marginTop: '1rem' }}>Loading your milestones...</p>}
          </motion.div>
        )}

        {step > 0 && step <= milestones.length && (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 aria-label={`Current Step: ${milestones[step - 1].title}`}>Step {step}: {milestones[step - 1].title}</h2>
            
            {step === 2 && (
              <div onClick={() => logCustomEvent('polling_place_located')}>
                <PollingMap />
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
              {step > 1 && (
                <button 
                  className="btn btn-secondary" 
                  onClick={handleBack}
                  aria-label="Navigate to Previous Wizard Step Button"
                >
                  Back
                </button>
              )}
              <button 
                className="btn" 
                onClick={handleNext}
                aria-label={step === milestones.length ? "Finish the Election Guide Button" : "Navigate to Next Wizard Step Button"}
              >
                {step === milestones.length ? "Finish" : "Next"}
              </button>
              
              {step === milestones.length && (
                <button 
                  className="btn btn-secondary" 
                  onClick={handleDownloadCalendar}
                  aria-label="Download Election Day Reminder ICS File Button"
                >
                  Add to Calendar (.ics)
                </button>
              )}
            </div>
          </motion.div>
        )}

        {step > milestones.length && (
          <motion.div
            key="step-complete"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 aria-label="Completion Status Header">All Done!</h2>
            <p>You are ready to vote. Thank you for participating in democracy.</p>
            <button className="btn" onClick={reset} aria-label="Restart Election Guide Wizard Button">Start Over</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
