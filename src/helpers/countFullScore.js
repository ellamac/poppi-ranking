export const countFullScore = (rankings, score) => {
  console.log('------counting-------');
  console.log('counting', rankings, score);

  if (!rankings) return 0;
  const allPositions = rankings.map((r) => parseInt(r.position) || 10);
  const positionsToPoints = allPositions.map((p) => positionToPoints(p));
  const sumPosition = positionsToPoints.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  console.log('counting allPositions', allPositions);
  console.log('counting positionsToPoints', positionsToPoints);
  console.log('counting sumScore', score);
  console.log('counting sumPosition', sumPosition);
  console.log('counting sum', score + sumPosition);
  return parseInt(score) + sumPosition || 0;
};

export const positionToPoints = (position) => {
  console.log('----- position -------');
  console.log('position', position);
  const pos = parseInt(position);
  console.log('position', pos);
  const points = pos <= 5 ? 6 - pos : 0;
  console.log('position', points);

  return points;
};
