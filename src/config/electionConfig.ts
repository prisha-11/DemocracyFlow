/**
 * Milestone data representing the upcoming 2026 election cycles.
 */
export interface ElectionMilestone {
  id: number;
  title: string;
  status: string;
}

export const LOCAL_ELECTION_MILESTONES: ElectionMilestone[] = [
  { id: 1, title: 'Check 2026 Local Registration Status', status: 'pending' },
  { id: 2, title: 'Find Local Town Hall Polling Place', status: 'pending' },
  { id: 3, title: 'Vote for Municipal Leaders', status: 'pending' }
];

export const NATIONAL_ELECTION_MILESTONES: ElectionMilestone[] = [
  { id: 1, title: 'Verify 2026 Federal Registration', status: 'pending' },
  { id: 2, title: 'Review Congressional Candidates', status: 'pending' },
  { id: 3, title: 'Vote in Midterm Elections', status: 'pending' }
];
