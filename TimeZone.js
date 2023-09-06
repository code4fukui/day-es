import { Time } from "./Time.js";

class TimeZone {
  constructor(time, min) {
    if (time == undefined) {
      const offset = TimeZone.getOffsetLocal();
      const hour = Math.floor(offset / 60);
      const min = Math.abs(offset) % 60;
      time = new Time(hour, min);
    } else if (typeof time == "string") {
      if (time == "Z") {
        time = new Time(0, 0);
      } else {
        time = new Time(time);
      }
    } else if (typeof time == "number" && typeof min == "number") {
      time = new Time(time, min);
    } else if (typeof time == "number") {
      time = new Time(time, 0);
    } else if (time instanceof TimeZone) {
      time = time.time;
    } else if (!(time instanceof Time)) {
      throw new Error("unsupported param");
    }
    this.time = time;
  }
  toString() {
    return (this.time.toSeconds() >= 0 ? "+" : "") + this.time.toString();
  }
  toJSON() {
    return this.toString();
  }
  getOffset() { // min
    return this.time.toSeconds() / 60;
  }
  static getOffsetLocal() { // min
    return -new Date().getTimezoneOffset();
  }
  static JST = new TimeZone(9, 0);
  static UTC = new TimeZone(0, 0);
}

export { TimeZone };
