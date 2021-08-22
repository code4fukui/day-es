import { Day } from "./Day.js";
import { Time } from "./Time.js";
import { TimeZone } from "./TimeZone.js";

const orgday = new Day("1970-01-01").getDayOfGregorian();

class DateTime {
  constructor(day, time, timezone) {
    if (typeof day == "string" && time == undefined && timezone == undefined) {
      const n = day.match(/(.+)T(.+)(Z|\+|\-)(.*)/);
      if (!n) {
        throw new Error("unsupported param: " + day);
      }
      this.day = new Day(n[1]);
      this.time = new Time(n[2]);
      this.timezone = new TimeZone(n[3] + n[4]);
    } else {
      this.day = day || new Day();
      this.time = time || new Time();
      this.timezone = timezone || new TimeZone();
    }
  }
  toString() {
    return this.day.toString() + "T" + this.time.toString() + this.timezone.toString();
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
