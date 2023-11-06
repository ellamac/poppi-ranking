import { lastFriday, lastWeek } from '../helpers/dates';

/**
 * returns a list of tracks that:
 * were released on the starting friday
 * OR
 * have less than 3 previous rankings AND
 * were in the top three the previous week
 * (top three after removing the tracks with >= 3 previous rankings)
 */
export const weeklyTracks = (initialTracks, startingFriday) => {
  /* tracks released on the starting friday */
  const newTracks = initialTracks.filter(
    (track) => track.date === startingFriday
  );

  /* tracks ranked the previous week */
  const prevWeek = initialTracks.filter(
    (track) =>
      track.rankings?.filter((ranking) => {
        console.log(
          'prevweek',
          ranking.date,
          lastWeek(startingFriday),
          ranking.date === lastWeek(startingFriday)
        );
        return ranking.date === lastWeek(startingFriday);
      }).length > 0
  );
  /* tracks with less than 3 previous rankings */
  const lessThan3 = prevWeek.filter((track) => track.rankings.length < 3);
  /* top three tracks after filterings */
  const top3 = lessThan3
    .sort(
      (a, b) =>
        parseInt(
          a.rankings.find((r) => r.date === lastWeek(startingFriday)).position
        ) -
        parseInt(
          b.rankings.find((r) => r.date === lastWeek(startingFriday)).position
        )
    )
    .slice(0, 3);

  /* all tracks that qualify */
  const all = [newTracks, top3].flat();
  console.log('filter all', initialTracks, startingFriday, all);
  return all;
};

export const wasRanked = (initialTracks, date) => {
  const tracksThatWereRankedOnDate = initialTracks.filter((track) =>
    track.rankings?.find((r) => r.date === date)
  );
  return tracksThatWereRankedOnDate.length > 0 ? true : false;
};
