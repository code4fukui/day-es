# day-es

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

JavaScript ES modules for handling dates, times, time zones, and Japanese holidays and calendar for browsers and Deno.

## Demos

- [**Calendar**](https://code4fukui.github.io/day-es/examples/calendar.html): An interactive monthly calendar that highlights holidays.
- [**Next Holiday Countdown**](https://code4fukui.github.io/day-es/examples/nextholiday.html): Shows the next upcoming Japanese national holiday and counts down the days.
- [**Date Countdown/Count-up**](https://code4fukui.github.io/day-es/examples/countdown.html): Calculates the number of days to or from a specific date.
- [**Japanese Holiday List**](https://code4fukui.github.io/day-es/examples/syukujitsu-list.html): Displays a complete list of national holidays sourced from the Cabinet Office of Japan.
- [**Wareki ⇔ Seireki Converter**](https://code4fukui.github.io/day-es/examples/wareki2seireki.html): Converts between Japanese imperial eras (Wareki) and the Gregorian calendar (Seireki).

## Features

- **Modular Design**: Provides distinct, immutable ES modules for `Day`, `Time`, `TimeZone`, and `DateTime`.
- **Wide Date Range**: Handles dates from year 1 to 9999.
- **Japanese Holiday Support**: Includes comprehensive functions for Japanese national holidays.
- **Automatic Data Updates**: Holiday data is automatically fetched from the Cabinet Office of Japan and updated monthly via a [GitHub Action](.github/workflows/scheduled-fetch.yml).
- **Japanese Calendar (和暦)**: Utilities for converting between Gregorian years and Japanese eras (Wareki).
- **Seasonal Information**: Detects the season (spring, summer, autumn, winter) for a given date.
- **Zero Dependencies**: Lightweight and self-contained.
- **Cross-Platform**: Runs in modern browsers and Deno.

## Usage

### Day.js

Handles date creation, manipulation, and comparison.

```js
import { Day } from "https://code4fukui.github.io/day-es/Day.js";

const day = new Day(2021, 6, 5); // 2021-06-05
console.log(day.toString()); // 2021-06-05
console.log(day.dayAfter(2)); // Day { year: 2021, month: 6, day: 7 }
```

### DateTime.js

Combines `Day`, `Time`, and `TimeZone` for full date-time handling.

```js
import { DateTime } from "https://code4fukui.github.io/day-es/DateTime.js";

const dt = new DateTime("2021-08-22T18:00+09:00");
console.log(dt.day.toString()); // 2021-08-22
console.log(dt.time.toString()); // 18:00
console.log(dt.getUnixTime()); // 1629622800
```

### Holiday.js

Checks for Japanese national holidays.

```js
import { Day } from "https://code4fukui.github.io/day-es/Day.js";
import { isHoliday, getHoliday } from "https://code4fukui.github.io/day-es/Holiday.js";

const d = new Day("2021-07-22");
console.log(isHoliday(d)); // true
console.log(getHoliday(d)); // 海の日
```

### WAREKI.js (Japanese Era)

Converts between Gregorian years and Japanese eras.

```js
import { year2wareki, wareki2year } from "https://code4fukui.github.io/day-es/WAREKI.js";

console.log(year2wareki(2022)); // 令和4年
console.log(wareki2year("令和4年")); // 2022
```

### Seasons.js

Determines the season for a given date.

```js
import { getSeason } from "https://code4fukui.github.io/day-es/Seasons.js";

const springDay = new Date("2025-03-01");
console.log(getSeason(springDay)); // "spring"
console.log(getSeason(springDay, "ja")); // "春"
```

## Data Source

The Japanese holiday data is sourced from ["National Holidays in Japan - Cabinet Office"](https://www8.cao.go.jp/chosei/shukujitsu/gaiyou.html) (「国民の祝日について - 内閣府」).

## License

MIT