import { Day } from "./Day.js";
import { Time } from "./Time.js";
import { TimeZone } from "./TimeZone.js";

const orgday = new Day("1970-01-01").getDayOfGregorian();
class DateTime {
  constructor(day, time, timezone) {
    if (typeof day == "string" && time == undefined && timezone == undefined) {
      const n = day.match(/(.+)[T\s]([\d:]+)([Z\+\-])?(.*)/);
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
  toStringMin() {
    return this.day.toString() + " " + this.time.toStringMin();
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
