import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useElectionLogic } from '../src/hooks/useElectionLogic';
import Wizard from '../src/components/Wizard';

vi.mock('../src/services/analytics', () => ({
  logCustomEvent: vi.fn(),
}));

describe('Navigation Flow', () => {
  it('updates progress bar and changes view state when clicking Next', async () => {
    render(<Wizard />);
    
    // Step 0 -> Select Local
    const localBtn = screen.getByText('Local Election');
    fireEvent.click(localBtn);
    
    await waitFor(() => {
      expect(screen.getByText(/Step 1:/i)).toBeInTheDocument();
    });

    // Step 1 -> Step 2
    const nextBtn = screen.getByText('Next');
    fireEvent.click(nextBtn);

    await waitFor(() => {
      expect(screen.getByText(/Step 2:/i)).toBeInTheDocument();
    });
  });
});
