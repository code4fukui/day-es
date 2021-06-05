import { HOLIDAY_JP } from "./HOLIDAY_JP.js";

const getHoliday = (day) => {
	const s = day.toString();
	return HOLIDAY_JP.find(h => h.date == s)?.title;
};
const isHoliday = (day) => {
	return getHoliday(day) != null;
};
const getHolidays = () => {
	return HOLIDAY_JP;
};
const searchHoliday = (title) => {
	return HOLIDAY_JP.filter(h => h.title == title).map(h => h.date);
};

export { isHoliday, getHoliday, getHolidays, searchHoliday };
