import { Day } from "../Day.js";

class DayCountup extends HTMLElement {
  constructor() {
    super();
    const target = new Day(this.getAttribute("target"));
    const nday = new Day().subDay(target) + 1;
    this.textContent = nday;
  }
}

customElements.define("day-countdown", DayCountup);
