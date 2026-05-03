import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../src/App';
import { GoogleOAuthProvider } from '@react-oauth/google';

vi.mock('../src/services/analytics', () => ({
  logCustomEvent: vi.fn(),
  analytics: null
}));

describe('Accessibility', () => {
  it('verifies that ARIA labels are present on all buttons', () => {
    render(<App />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      // Check if button has aria-label OR text content that acts as label
      const hasAria = button.hasAttribute('aria-label');
      const hasText = button.textContent !== '';
      expect(hasAria || hasText).toBe(true);
    });
  });
});
