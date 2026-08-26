export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function scaleCoordinate(coord, imageSize, containerSize) {
  return (coord / imageSize) * containerSize;
}

export function formatDurationBetweenDates(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new Error('Invalid dates passed');
  }

  const diff = end.getTime() - start.getTime();
  if (diff < 0) {
    throw new Error('End date must be after start date');
  }

  const minutes = String(Math.floor(diff / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');

  return `${minutes}:${seconds}`;
}
