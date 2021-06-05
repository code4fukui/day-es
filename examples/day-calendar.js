import { Day } from "../Day.js";
import { isHoliday } from "../Holiday.js";

class Cal extends HTMLElement {
  constructor() {
    super();
		const cr = (tag) => document.createElement(tag);
		this.style.display = "inline-block";
		const monthmode = true;
		this.monthmode = monthmode;
		const ndays = monthmode ? 7 * 7 : 366 + 5;
		this.day = new Day();
		const h2 = cr("h2");
		this.appendChild(h2);
		const div = cr("div");
		for (let i = 0; i < ndays; i++) {
			const d = cr('div');
			let s = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ][i % 7];
			if (monthmode && i < 7)
				s += " week";
			d.className = 'calcell ' + s;
			div.appendChild(d);
		}
		this.appendChild(div);
		this.redraw();
	}
	redraw() {
		if (this.onbeforedraw != null) {
			this.onbeforedraw();
		}
		this.querySelector("h2").textContent = this.day.year + "/" + this.day.month;
		const caloff = this.day.getFirstDayOfMonth().getWeek();
		const div = this.querySelector("div");
		const len = div.childNodes.length;
		if (this.monthmode) {
			for (let i = 0; i < 7; i++) {
				const d = div.childNodes[i];
				const s = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ][i];
				d.innerHTML = s;
			}
			const lastday = this.day.getLastDayOfMonth().day;
			for (let i = 7; i < len; i++) {
				const d = div.childNodes[i];
				let s = "";
				const day = i - 6 - caloff;
				if (day > 0 && day <= lastday) {
					const holiday = isHoliday(new Day(this.day.year, this.day.month, day));
					//console.log(holiday, year, this.month, day);
					const cls = holiday ? "cellday holiday" : "cellday";
					s = "<div class='" + cls + "'>" + day + "</div>";
					if (this.ondraw != null) {
						const sc = this.ondraw(d, year, this.month, day);
						if (sc != null) {
							s = s + sc;
						}
					}
				}
				d.innerHTML = s;
			}
		} else {
			for (let i = 0; i < len; i++) {
				const d = div.childNodes[i];
				let s = "";
				const day = i + 1 - caloff;
				const month = this.calcMonth(year, day);
				const day2 = this.calcMonthDay(year, day);
				d.style.background = month % 2 == 0 ? '#eee' : '#ddd';
				if (month > 0)
					s = "<div class='cellday'>" + month + "/" + day2 + "</div>";
				
				if (this.ondraw != null) {
					const sc = this.ondraw(year, day);
					if (sc != null)
						s = s + sc;
				}
				d.innerHTML = s;
			}
		}
		if (this.onchange != null) {
			this.onchange();
		}
	};
	setDay(day) {
		this.day = day;
		this.redraw();
	}
	prevMonth() {
		this.day = this.day.prevMonth();
		this.redraw();
	}
	nextMonth() {
		this.day = this.day.nextMonth();
		this.redraw();
	}
	thisMonth() {
		this.day = new Day();
		this.redraw();
	}
}

customElements.define("day-calendar", Cal);

export { Cal };
