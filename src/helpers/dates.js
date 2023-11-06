export const dateToYYYYMMDD = (date) => {
  var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  var localISOTime = new Date(new Date(date) - tzoffset)
    .toISOString()
    .split('T')[0];

  return localISOTime;
};

export const lastWeek = (dateString) => {
  const thisWeeksDate = new Date(dateString);
  thisWeeksDate.setDate(thisWeeksDate.getDate() - 7);
  return dateToYYYYMMDD(thisWeeksDate);
};

export const lastFriday = () => {
  const today = new Date();
  const lastWeeksFriday = new Date();
  const weekdayNow = today.getDay();
  lastWeeksFriday.setDate(
    lastWeeksFriday.getDate() - 2 - weekdayNow + (weekdayNow > 5 ? 7 : 0)
  );

  return dateToYYYYMMDD(lastWeeksFriday);
};
