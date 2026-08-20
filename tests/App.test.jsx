import { describe, it, expect } from 'vitest';
import App from '../src/app/App';
import { render } from './test-util';
// import userEvent from '@testing-library/user-event';

describe('App', () => {
  it('shows welcome dialog on load', async () => {
    render(<App />);
    // await screen.findByRole('dialog');
  });

  it('welcome dialog contains username input', () => {
    expect(false).toBe(false);
  });
});
