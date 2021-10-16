import { fix0 } from "https://js.sabae.cc/fix0.js";

class Time {
  constructor(time, min, sec) {
    if (time == undefined) {
      const d = new Date();
      this.hour = d.getHours();
      this.min = d.getMinutes();
      this.sec = d.getSeconds();
      this.msec = d.getMilliseconds();
    } else if (typeof time == "number" && typeof min == "number" && typeof sec == "number") { // hour, min, sec
      this.minus = time < 0;
      time = Math.abs(time);
      this.hour = time;
      this.min = min;
      this.sec = Math.floor(sec);
      this.msec = Math.floor(sec) == sec ? undefined : Math.floor(sec % 1 * 1000);
    } else if (typeof time == "number" && typeof min == "number") { // hour, min
      this.minus = time < 0;
      time = Math.abs(time);
      this.hour = time;
      this.min = min;
    } else if (typeof time == "string") {
      //const n = time.match(/(\d+):(\d+)(:(\d+).(\d))/);
      //const n = time.match(/(\d+):(\d+)(:(\d+))?/);
      const n = time.match(/(-)?(\d+):(\d+)(:(\d+)(.(\d+))?)?/);
      //console.log(n);
      if (n) {
        this.minus = n[1] == "-";
        this.hour = parseInt(n[2], 10);
        this.min = parseInt(n[3], 10);
        if (n[5] != undefined) {
          this.sec = parseInt(n[5], 10);
        }
        if (n[7] != undefined) {
          const ms0 = n[7] + "000";
          const ms1 = ms0.substring(0, 3);
          this.msec = parseInt(ms1, 10);
        }
      } else {
        throw new Error("can't parse: " + time);
      }
    } else if (typeof time == "number") {
      this.minus = time < 0;
      time = Math.abs(time);
      this.hour = Math.floor(time / (60 * 60));
      this.min = Math.floor(time / 60) % 60;
      this.sec = Math.floor(time) % 60;
      this.msec = Math.floor(time) % 60 == time % 60 ? undefined : Math.floor(time % 1 * 1000);
    }
  }
  static isTime(s) {
    if (s) {
      try {
        new Time(s);
        return true;
      } catch (e) {
      }
    }
    return false;
  }
  toSeconds() {
    const res = (this.hour || 0) * 60 * 60 + (this.min || 0) * 60 + (this.sec || 0) + (this.msec || 0) / 1000;
    return this.minus ? -res : res;
  }
  getSeconds() { // alias
    return this.toSeconds();
  }
  toString() {
    return (this.minus ? "-" : "") + (this.hour >= 100 ? this.hour : fix0(this.hour || 0, 2)) + ":" + fix0(this.min || 0, 2) + (this.sec == undefined && this.msec == undefined ? "" : ":" + fix0(this.sec, 2)) + (this.msec == undefined ? "" : "." + fix0(this.msec, 3));
  }
  toStringMin() {
    return (this.minus ? "-" : "") + (this.hour >= 100 ? this.hour : fix0(this.hour || 0, 2)) + ":" + fix0(this.min || 0, 2);
  }
  toStringHM() {
    return (this.minus ? "-" : "") + (this.hour >= 100 ? this.hour : fix0(this.hour || 0, 2)) + fix0(this.min || 0, 2);
  }
  toJSON() {
    return this.toString();
  }
  minAfter(min) {
    return new Time(this.toSeconds() + min * 60);
  }
  minBefore(min) {
    return new Time(this.toSeconds() - min * 60);
  }
  toTime(time) {
    return time instanceof Time ? time : new Time(time);
  }
  add(time) {
    time = this.toTime(time);
    return new Time(this.toSeconds() + time.toSeconds());
  }
  sub(time) {
    time = this.toTime(time);
    return new Time(this.toSeconds() - time.toSeconds());
  }
  mul(time) {
    time = this.toTime(time);
    return new Time(this.toSeconds() * time.toSeconds());
  }
  div(time) {
    time = this.toTime(time);
    return new Time(this.toSeconds() / time.toSeconds());
  }
  mod(time) {
    time = this.toTime(time);
    return new Time(this.toSeconds() % time.toSeconds());
  }
  equals(time) {
    time = this.toTime(time);
    return this.toSeconds() == time.toSeconds();
  }
  contains(starttime, endtime) {
    starttime = this.toTime(starttime);
    endtime = this.toTime(endtime);
    const t = this.toSeconds();
    return t >= starttime.toSeconds() && t <= endtime.toSeconds();
  }
  isAfter(time) {
    time = this.toTime(time);
    return this.toSeconds() > time.toSeconds();
  }
  isBefore(time) {
    time = this.toTime(time);
    return this.toSeconds() < time.toSeconds();
  }
}

export { Time };
