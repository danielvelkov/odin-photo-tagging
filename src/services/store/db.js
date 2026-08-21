import { MOCK_thoughts } from './__mocks__/db.js';

export async function getLeaderboard() {}

export async function getThoughts() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(MOCK_thoughts), 1000),
  );
}
