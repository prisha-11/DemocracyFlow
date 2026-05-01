import { describe, it, expect } from 'vitest';
import { calculateElectionTimeline } from '../src/utils/timeline';

describe('Election Timeline Calculation', () => {
  it('should calculate the correct number of days remaining', () => {
    const today = new Date('2026-04-29T00:00:00Z');
    const electionDay = new Date('2026-11-03T00:00:00Z');
    
    const daysRemaining = calculateElectionTimeline(today, electionDay);
    expect(daysRemaining).toBe(188);
  });

  it('should return 0 if the election has already passed', () => {
    const today = new Date('2026-11-04T00:00:00Z');
    const electionDay = new Date('2026-11-03T00:00:00Z');
    
    const daysRemaining = calculateElectionTimeline(today, electionDay);
    expect(daysRemaining).toBe(0);
  });

  it('should return 0 if today is election day', () => {
    const today = new Date('2026-11-03T12:00:00Z');
    const electionDay = new Date('2026-11-03T00:00:00Z');
    
    const daysRemaining = calculateElectionTimeline(today, electionDay);
    expect(daysRemaining).toBe(0);
  });
});
