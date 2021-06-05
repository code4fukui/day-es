import { Day } from "../Day.js";

class Countdown extends HTMLElement {
  constructor() {
    super();
		const target = new Day(this.getAttribute("target"));
		const nday = target.subDay(new Day());
		this.textContent = nday;
	}
}

customElements.define("day-countdown", Countdown);
