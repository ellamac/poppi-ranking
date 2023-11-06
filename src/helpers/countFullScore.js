export const countFullScore = (rankings, score) => {
  if (!rankings) return 0;
  const allPositions = rankings.map((r) => parseInt(r.position) || 10);
  const positionsToPoints = allPositions.map((p) => positionToPoints(p));
  const sumPosition = positionsToPoints.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return parseInt(score) + sumPosition || 0;
};

export const positionToPoints = (position) => {
  const pos = parseInt(position);
  const points = pos <= 5 ? 6 - pos : 0;

  return points;
};
