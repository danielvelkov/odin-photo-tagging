import { describe, it, expect, beforeEach } from 'vitest';
import App from '../src/app/App';
import { fireEvent, render, screen, within } from './test-util';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('shows game start menu dialog on load', async () => {
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('game start menu dialog contains username input', async () => {
    const dialog = await screen.findByRole('dialog');
    expect(
      within(dialog).getByRole('textbox', { name: /name/i }),
    ).toBeInTheDocument();
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
