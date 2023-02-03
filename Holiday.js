import { Day } from "./Day.js";
//import { HOLIDAY_JP } from "./HOLIDAY_JP.js";
const url = "https://code4fukui.github.io/day-es/holiday_jp.json";
const HOLIDAY_JP = await (await fetch(url)).json();

const toDay = (day) => {
  if (!day) {
    return null;
  }
  if (day instanceof Day) {
    return day;
  }
  return new Day(day);
};
const getHoliday = (day) => {
  day = toDay(day);
  const s = day.toString();
  return HOLIDAY_JP.find((h) => h.date == s)?.title;
};
const isHoliday = (day) => {
  day = toDay(day);
  return getHoliday(day) != null;
};
const getHolidays = () => {
  return HOLIDAY_JP;
};
const searchHoliday = (title) => {
  return HOLIDAY_JP.filter((h) => h.title == title).map((h) => h.date);
};
const getNextHoliday = (startday) => {
  if (!startday) {
    startday = new Day();
  } else {
    startday = toDay(startday);
  }
  return HOLIDAY_JP.find((h) => {
    const h1 = new Day(h.date);
    return h1.isAfter(startday);
  });
};
const getLastHoliday = () => {
  return HOLIDAY_JP[HOLIDAY_JP.length - 1];
};

export { getHoliday, getHolidays, isHoliday, searchHoliday, getNextHoliday, getLastHoliday };
