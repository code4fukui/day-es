import { DateTime } from "../DateTime.js";

class DateTimeNow extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const show = () => {
      this.dt = new DateTime(Math.floor(new DateTime().getTime() / 1000) * 1000);
      console.log(this.dt)
      this.textContent = this.dt.toString().replace("T", " ");
    };
    show();
    this.t = setInterval(show, 1000);
  }
  disconnectedCallback() {
    clearInterval(this.t);
  }
  get value() {
    return this.dt;
  }
}

customElements.define("datetime-now", DateTimeNow);
