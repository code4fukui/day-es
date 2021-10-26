import { fix0 } from "https://js.sabae.cc/fix0.js";
import { WAREKI_ID, WAREKI_FIRST_YEAR, WAREKI_JA } from "./WAREKI.js";

class Day {
  // new Day(year, month, day)
  // new Day(year, dayofyear)
  // new Day() // today in localtime
  // new Day(Date)
  // new Day(dayofGregorian)
  // new Day("2021-06-06"); // Date parser
  constructor(year, month, day) {
    if (year === undefined) {
      year = new Date();
    }
    if (month === undefined) {
      if (typeof year == "number") {
        const ymd = DayUtil.getDayOfGregorian(year);
        year = ymd[0];
        month = ymd[1];
        day = ymd[2];
      } else if (typeof year == "string") {
        const regs = [
          /(\d\d\d\d)-(\d\d)-(\d\d)/,
          /(\d\d\d\d)(\d\d)(\d\d)/,
          /(\d+)\/(\d+)\/(\d+)/,
          /(\d\d\d\d)\s*年\s*(\d+)\s*月\s*(\d+)\s*日/,
        ];
        let flg = false;
        for (const reg of regs) {
          const n = year.match(reg);
          //console.log(year, reg, n)
          if (n) {
            year = parseInt(n[1], 10);
            month = parseInt(n[2], 10);
            day = parseInt(n[3], 10);
            flg = true;
            break;
          }
        }
        if (!flg) {
          // todo: add to half
          const n2 = year.match(/(..)\s*(\d+)\s*年\s*(\d+)\s*月\s*(\d+)\s*日/);
          if (n2) {
            const wa = WAREKI_JA[n2[1]];
            if (!wa) {
              throw new Error("illegal date");
            }
            year = wa + parseInt(n2[2], 10) - 1;
            month = parseInt(n2[3], 10);
            day = parseInt(n2[4], 10);
          } else {
            throw new Error("illegal date");
          }
        }
      } else if (year instanceof Date) {
        const d = year;
        year = d.getFullYear();
        month = d.getMonth() + 1;
        day = d.getDate();
        if (isNaN(year) || isNaN(month) || isNaN(day)) {
          throw new Error("illegal date");
        }
      } else if (year instanceof Day) {
        const d = year;
        year = d.year;
        month = d.month;
        day = d.day;
        if (isNaN(year) || isNaN(month) || isNaN(day)) {
          throw new Error("illegal date");
        }
      } else {
        throw new Error("illegal date");
      }
    }
    if (day === undefined) {
      const md = DayUtil.getMonthDayOfYear(year, month);
      month = md[0];
      day = md[1];
    }
    if (typeof year == "string") {
      const n = WAREKI_ID.indexOf(year[0]);
      if (n >= 0) {
        year = WAREKI_FIRST_YEAR[n] + parseInt(year.substring(1), 10) - 1;
      } else {
        year = parseInt(year, 10);
      }
    }
    if (typeof month == "string") {
      month = parseInt(month, 10);
    }
    if (typeof day == "string") {
      day = parseInt(day, 10);
    }
    if (year < 1 || year > 9999) {
      throw new Error("year limit 1 to 9999");
    }
    if (month < 1 || month > 12) {
      throw new Error("illegal month:" + month);
    }
    const lastday = DayUtil.getLastDayOfMonth(year, month);
    if (day < 1 || day > lastday) {
      throw new Error("illegal day:" + day);
    }
    this.year = year;
    this.month = month;
    this.day = day;
    Object.freeze(this);
  }
  static isDay(s) {
    if (s) {
      try {
        new Day(s);
        return true;
      } catch (e) {
      }
    }
    return false;
  }
  toString() {
    return fix0(this.year, 4) + "-" + fix0(this.month, 2) + "-" +
      fix0(this.day, 2);
  }
  toStringYMD() {
    return fix0(this.year, 4) + fix0(this.month, 2) + fix0(this.day, 2);
  }
  toStringJA() {
    return `${this.year}/${this.month}/${this.day}(${this.getWeekJA()})`;
  }
  toStringJALong() {
    return `${this.year}年${this.month}月${this.day}日(${this.getWeekJA()})`;
  }
  toJSON() {
    return this.toString();
  }
  equals(day) {
    if (!(day instanceof Day)) {
      return false;
    }
    return day.year == this.year && day.month == this.month &&
      day.day == this.day;
  }
  isBefore(day) {
    if (!(day instanceof Day)) {
      return false;
    }
    return this.getDayOfGregorian() < day.getDayOfGregorian();
  }
  isAfter(day) {
    if (!(day instanceof Day)) {
      return false;
    }
    return this.getDayOfGregorian() > day.getDayOfGregorian();
  }
  includes(startday, endday) {
    if (!(startday instanceof Day) || !(endday instanceof Day)) {
      return false;
    }
    const days = this.getDayOfGregorian();
    return days >= startday.getDayOfGregorian() && days <= endday.getDayOfGregorian();
  }
  // Monday == 1, Satarday == 6, Sunday == 7 by ISO 8601 / JIS X 0301
  static WEEK_JA = "月火水木金土日";
  static MONDAY = 1;
  static TUESDAY = 2;
  static WEDNESDAY = 3;
  static THURSDAY = 4;
  static FRIDAY = 5;
  static SATURDAY = 6;
  static SUNDAY = 7;
  getWeek() {
    return DayUtil.getWeek(this.year, this.month, this.day);
  }
  getWeekJA() {
    return Day.WEEK_JA[this.getWeek() - 1];
  }
  getDayOfYear() {
    let res = 0;
    for (let i = 1; i < this.month; i++) {
      res += DayUtil.getLastDayOfMonth(this.year, i);
    }
    return res + this.day;
  }
  getDayOfGregorian() {
    let res = 0;
    for (let i = 1; i < this.year; i++) {
      res += DayUtil.getDaysOfYear(i);
    }
    return res + this.getDayOfYear();
  }
  // functions ret Day
  getFirstDayOfMonth() {
    return new Day(this.year, this.month, 1);
  }
  getLastDayOfMonth() {
    const day = DayUtil.getLastDayOfMonth(this.year, this.month);
    return new Day(this.year, this.month, day);
  }
  nextDay() {
    const nday = this.day + 1;
    const day = DayUtil.getLastDayOfMonth(this.year, this.month);
    if (nday <= day) {
      return new Day(this.year, this.month, nday);
    }
    const nmonth = this.month + 1;
    if (nmonth == 13) {
      return new Day(this.year + 1, 1, 1);
    }
    return new Day(this.year, nmonth, 1);
  }
  prevDay() {
    const nday = this.day - 1;
    if (nday >= 1) {
      return new Day(this.year, this.month, nday);
    }
    const nmonth = this.month - 1;
    if (nmonth == 0) {
      const day = DayUtil.getLastDayOfMonth(this.year - 1, 1);
      return new Day(this.year - 1, 12, day);
    }
    const day = DayUtil.getLastDayOfMonth(this.year, nmonth);
    return new Day(this.year, nmonth, day);
  }
  nextMonth() {
    const nmonth = this.month + 1;
    if (nmonth == 13) {
      const lastday = DayUtil.getLastDayOfMonth(this.year + 1, 1);
      if (this.day > lastday) {
        return new Day(this.year + 1, 1, lastday);
      }
      return new Day(this.year + 1, 1, this.day);
    }
    const lastday = DayUtil.getLastDayOfMonth(this.year, nmonth);
    if (this.day > lastday) {
      return new Day(this.year, nmonth, lastday);
    }
    return new Day(this.year, nmonth, this.day);
  }
  prevMonth() {
    const nmonth = this.month - 1;
    if (nmonth == 0) {
      const lastday = DayUtil.getLastDayOfMonth(this.year - 1, 12);
      if (this.day > lastday) {
        return new Day(this.year - 1, 12, lastday);
      }
      return new Day(this.year - 1, 12, this.day);
    }
    const lastday = DayUtil.getLastDayOfMonth(this.year, nmonth);
    if (this.day > lastday) {
      return new Day(this.year, nmonth, lastday);
    }
    return new Day(this.year, nmonth, this.day);
  }
  dayAfter(n) {
    return new Day(this.getDayOfGregorian() + n);
  }
  dayBefore(n) {
    return new Day(this.getDayOfGregorian() - n);
  }
  subDay(day) {
    return this.getDayOfGregorian() - day.getDayOfGregorian();
  }
  static isLeapYear(year) {
    return DayUtil.isLeapYear(year);
  }
  static getLengthOfYear(year) {
    return DayUtil.isLeapYear(year) ? 366 : 365;
  }
  static intersects(sday1, eday1, sday2, eday2) {
    if (sday1.isAfter(sday2)) {
      [sday1, eday1, sday2, eday2] = [sday2, eday2, sday1, sday2];
    }
    if (sday2.isAfter(eday1)) {
      return false;
    }
    return true;
  }
}

class DayUtil {
  // Monday == 1, Satarday == 6, Sunday == 7 by ISO 8601 / JIS X 0301
  static getWeek(year, month, day) {
    if (month <= 2) {
      year--;
      month += 12;
    }
    const week = (year + Math.floor(year / 4) - Math.floor(year / 100) +
      Math.floor(year / 400) + Math.floor((13 * month + 8) / 5) + day) % 7;
    if (week == 0) {
      return 7;
    }
    return week;
  }
  // month 1 - 12, month 0 : prev year, month 13 : next year
  static getLastDayOfMonth(year, month) {
    if (month == 0) {
      month = 12;
      year--;
    } else if (month == 13) {
      month = 1;
      year++;
    } else if (month == 2) {
      if (DayUtil.isLeapYear(year)) {
        return 29;
      }
      return 28;
    }
    return 30 + (month + Math.floor(month / 8)) % 2;
  }
  static isLeapYear(year) {
    return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
  }
  static getDaysOfYear(year) {
    return DayUtil.isLeapYear(year) ? 366 : 365;
  }
  // day >= 1 (must!), error ret 0
  static getMonthDayOfYear(year, day) {
    if (!day || day < 1) {
      throw new Error("day < 1");
    }
    const daysoy = DayUtil.getDaysOfYear(year);
    if (day > daysoy) {
      throw new Error("day > getDaysOfYear");
    }
    for (let i = 1; i <= 12; i++) {
      const days = DayUtil.getLastDayOfMonth(year, i);
      if (day <= days) {
        return [i, day];
      }
      day -= days;
    }
    throw new Error("can't calc");
  }
  static getDayOfGregorian(day) {
    for (let i = 1; i < 10000; i++) {
      const n = DayUtil.getDaysOfYear(i);
      if (day <= n) {
        const md = DayUtil.getMonthDayOfYear(i, day);
        return [i, ...md];
      }
      day -= n;
    }
    throw new Error("can't calc");
  }
}

export { Day };
