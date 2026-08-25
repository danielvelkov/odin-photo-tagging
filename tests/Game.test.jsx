import { describe, it, expect, beforeEach, vi } from 'vitest';
import Game from '../src/components/game/Game';
import { act, fireEvent, render, screen, within } from './test-util';
import { MOCK_thoughts } from '../src/services/store/__mocks__/db';

describe('Game', () => {
  it('starts a 5 minute timer on render', async () => {
    render(<Game thoughts={MOCK_thoughts} />);
    expect(screen.getByTestId('game-timer')).toHaveTextContent(/5:00/);
  });

  it('calls onGameEnd() cb when 5 min timer runs out', async () => {
    vi.useFakeTimers();
    const mockHandler = vi.fn();
    render(<Game thoughts={MOCK_thoughts} onGameComplete={mockHandler} />);
    expect(mockHandler).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(1000 * 60 * 5);
    });
    expect(mockHandler).toHaveBeenCalled();
  });

  it('displays set thoughts', async () => {
    render(<Game thoughts={MOCK_thoughts} />);
    for (const thought of MOCK_thoughts)
      expect(screen.getByText(thought.name)).toBeInTheDocument();
  });

  describe('Context menu', () => {
    beforeEach(async () => {
      render(<Game thoughts={MOCK_thoughts} />);
      const gameArea = screen.getByTestId('search-area');
      expect(screen.queryByTestId('guess-menu')).not.toBeInTheDocument();
      fireEvent.click(gameArea);
    });

    it('opens context menu when clicking within game screen', async () => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
    it('context menu has each thought as option', async () => {
      const menu = screen.getByRole('menu');
      const menuItems = within(menu).getAllByRole('menuitem');
      let i = 0;
      for (const thought of MOCK_thoughts)
        expect(menuItems[i++]).toHaveTextContent(thought.name);
    });
  });
});
