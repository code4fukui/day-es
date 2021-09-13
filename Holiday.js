import { HOLIDAY_JP } from "./HOLIDAY_JP.js";
import { Day } from "./Day.js";

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

export { getHoliday, getHolidays, isHoliday, searchHoliday };
