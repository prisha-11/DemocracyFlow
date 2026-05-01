/**
 * Calculates the election timeline (days remaining).
 * @param {Date} currentDate - The current date.
 * @param {Date} electionDate - The target election date.
 * @returns {number} The number of days remaining until the election.
 */
export function calculateElectionTimeline(currentDate: Date, electionDate: Date): number {
  const diffTime = electionDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}
