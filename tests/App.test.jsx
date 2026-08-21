import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../src/app/App';
import { fireEvent, render, screen, waitFor } from './test-util';
import userEvent from '@testing-library/user-event';

vi.mock('../src/services/store/db.js');

describe('App', () => {
  it('shows start menu dialog at first with loader', async () => {
    render(<App />);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('loading-message')).toBeInTheDocument();
  });

  describe('On loader disappear', () => {
    beforeEach(async () => {
      render(<App></App>);
      await waitFor(() =>
        expect(screen.queryByTestId('loading-message')).not.toBeInTheDocument(),
      );
      expect(screen.getByText(/start/i)).toBeInTheDocument();
    });

    it('game start menu dialog contains username input', async () => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('shows input error when name is empty and game is started', async () => {
      const usernameInput = screen.getByRole('textbox', {
        name: /name/i,
      });

      fireEvent.change(usernameInput, { target: { value: '' } });
      fireEvent.blur(usernameInput);

      expect(usernameInput).toHaveValue('');

      const startButton = screen.getByRole('button', { name: /start/i });
      fireEvent.click(startButton);
      expect(usernameInput).toBeInvalid();
    });

    it('does not allow names longer than 25 characters', async () => {
      const longName =
        'Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu';
      const usernameInput = screen.getByRole('textbox', {
        name: /name/i,
      });

      const user = userEvent.setup();

      await user.clear(usernameInput);
      await user.type(usernameInput, longName);

      expect(usernameInput).toHaveValue(longName.substring(0, 25));
      expect(usernameInput).not.toBeInvalid();
    });
  });
});
