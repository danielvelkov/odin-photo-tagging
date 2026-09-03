import { formatDurationBetweenDates } from '../../helpers.js';
import { thoughts } from '../data.js';
export let MOCK_scores = [];

const addFakeScore = (score) => {
  const mockScore = {
    id: score?.id ? score.id : Math.max(...MOCK_scores.map((s) => s.id)) + 1,
    ...score,
  };
  MOCK_scores.push(mockScore);
  return mockScore;
};

export async function startGameSession(name) {
  return new Promise((resolve) => {
    const mockScore = addFakeScore({
      name,
      startTime: new Date().toString(),
    });
    resolve(mockScore);
  });
}

export async function endGameSession(id) {
  return new Promise((resolve, reject) => {
    const mockScore = MOCK_scores.find((s) => s.id === id);
    if (mockScore) {
      const updatedScore = { ...mockScore, endTime: new Date().toString() };
      MOCK_scores = [
        ...MOCK_scores.filter((s) => s.id !== mockScore.id),
        updatedScore,
      ];
      resolve(updatedScore);
    } else reject('Missing score');
  });
}

export async function getLeaderboard() {
  return new Promise((resolve) =>
    resolve(
      MOCK_scores.map((score) => ({
        name: score.name,
        time: formatDurationBetweenDates(score.startTime, score.endTime),
      })),
    ),
  );
}

export async function getThoughts() {
  return new Promise((resolve) => resolve(thoughts));
}
