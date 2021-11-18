import { Day } from "./Day.js";
import { Time } from "./Time.js";
import { TimeZone } from "./TimeZone.js";

const orgday = new Day("1970-01-01").getDayOfGregorian();
class DateTime {
  constructor(day, time, timezone) {
    if (day instanceof Date) {
      const d = day;
      this.day = new Day(d.getFullYear(), d.getMonth(), d.getDate());
      this.time = new Time(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
      const tmin = -d.getTimezoneOffset();
      this.timezone = new TimeZone(Math.floor(tmin / 60), tmin % 60);
    } else if (typeof day == "string" && time == undefined && timezone == undefined) {
      const n = day.match(/(.+)[T\s]([\d:.]+)([Z\+\-])?(.*)/);
      if (!n) {
        //throw new Error("unsupported param: " + day);
        this.day = new Day(day);
        this.time = new Time(0);
        this.timezone = new TimeZone();
      } else {
        this.day = new Day(n[1]);
        this.time = new Time(n[2]);
        if (n[3] != undefined) {
          this.timezone = new TimeZone(n[3] + n[4]);
        } else {
          this.timezone = new TimeZone();
        }
      }
    } else if (typeof day == "number" && time == undefined && timezone == undefined) {
      this.timezone = timezone || new TimeZone();
      const t = day / 1000 + this.timezone.getOffset() * 60;
      const nday = Math.floor(t / (24 * 60 * 60));
      const sec = t % (24 * 60 * 60);
      this.day = new Day(nday + orgday);
      this.time = new Time(sec);
    } else {
      this.day = day || new Day();
      this.time = time || new Time();
      this.timezone = timezone || new TimeZone();
    }
  }
  static isDateTime(s) {
    if (s) {
      try {
        new DateTime(s);
        return true;
      } catch (e) {
      }
    }
    return false;
  }
  toString() {
    return this.day.toString() + "T" + this.time.toString() + this.timezone.toString();
  }
  toStringLocal() {
    return this.day.toString() + "T" + this.time.toString();
  }
  toStringMin() {
    return this.day.toString() + " " + this.time.toStringMin();
  }
  toStringMinLog() {
    return this.day.toStringYMD() + this.time.toStringHM();
  }
  toStringRFC2822() { // Sat, 7 Jan 2012 00:00:00 +0900
    const w = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const d = this.day;
    const t = this.time;
    const tz = this.timezone.toString().replace(":", "");
    return w[d.getWeek() - 1] + ", " + d.day + " " + m[d.month - 1] + " " + d.year + " " + t + " " + tz;
  }
  toJSON() {
    return this.toString();
  }
  getUnixTime() { // sec from 1970 // 形式的な経過秒数 うるう秒考慮しない
    const d = this.day.getDayOfGregorian() - orgday;
    const s = Math.floor(this.time.toSeconds());
    const off = this.timezone.getOffset();
    return d * (24 * 60 * 60) + s - off * 60;
  }
  getTime() { // msec from 1970 // 形式的な経過ミリ秒数 うるう秒考慮しない
    const d = this.day.getDayOfGregorian() - orgday;
    const s = this.time.toSeconds();
    const off = this.timezone.getOffset();
    return 1000 * (d * (24 * 60 * 60) + s - off * 60);
  }
}

export { DateTime, Day, Time, TimeZone };
