/**
 * @file useElectionLogic.ts
 * @purpose Separates election milestone fetching logic from the UI.
 */
import { useState } from 'react';
import { LOCAL_ELECTION_MILESTONES, NATIONAL_ELECTION_MILESTONES, ElectionMilestone } from '../config/electionConfig';
import { logCustomEvent } from '../services/analytics';

export function useElectionLogic() {
  const [step, setStep] = useState(0);
  const [milestones, setMilestones] = useState<ElectionMilestone[]>([]);
  const [loading, setLoading] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const fetchMilestones = async (type: 'local' | 'national') => {
    setLoading(true);
    logCustomEvent('election_type_selected', { type });
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 600));
      const selectedMilestones = type === 'local' ? LOCAL_ELECTION_MILESTONES : NATIONAL_ELECTION_MILESTONES;
      if (!selectedMilestones || selectedMilestones.length === 0) {
        throw new Error("Null or empty election data");
      }
      setMilestones(selectedMilestones);
      setLoading(false);
      setStep(1);
      setAnnouncement(`Step 1 of 3: ${selectedMilestones[0].title}`);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setAnnouncement("Error fetching election data. Please try again.");
    }
  };

  const handleNext = () => {
    const nextStep = step + 1;
    setStep(nextStep);
    if (nextStep <= milestones.length) {
      setAnnouncement(`Step ${nextStep} of 3: ${milestones[nextStep - 1].title}`);
    } else {
      setAnnouncement("All steps completed.");
    }
  };

  const handleBack = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    setAnnouncement(`Step ${prevStep} of 3: ${milestones[prevStep - 1].title}`);
  };

  const reset = () => {
    setStep(0);
    setAnnouncement("Restarted guide.");
  };

  return {
    step,
    milestones,
    loading,
    announcement,
    fetchMilestones,
    handleNext,
    handleBack,
    reset
  };
}
