import { Time } from "./Time.js";

class TimeZone {
  constructor(time, min) {
    if (time == undefined) {
      const offset = -(new Date().getTimezoneOffset());
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
  getOffset() {
    return this.time.toSeconds() / 60;
  }
}

export { TimeZone };
