# day-es

JavaScript ES modules for handling dates, times, time zones, and Japanese holidays and calendar for browsers and Deno.

## Features

- Handles dates and times from year 1 to 9999
- Supports Day.js, Time.js, TimeZone.js, DateTime.js
- Provides Japanese holiday information using "National Holidays in Japan - Cabinet Office" (updated monthly)
- Supports Japanese calendar (Wareki)
- Provides Japanese seasonal information

## Requirements

- Deno 1.x or compatible JavaScript environment

## Usage

### Day.js

```js
import { Day } from "https://code4fukui.github.io/day-es/Day.js";

const day = new Day(2021, 6, 5); // 2021/6/5
console.log(day); // Day { year: 2021, month: 6, day: 5 }
console.log(day.dayAfter(2)); // Day { year: 2021, month: 6, day: 7 }
```

### Holiday.js

Supports holidays based on "National Holidays in Japan - Cabinet Office" (updated monthly).

```js
import { isHoliday } from "https://code4fukui.github.io/day-es/Holiday.js";

console.log(isHoliday(new Day("2021-07-22"))); // true
```

### DateTime.js

```js
import { DateTime, Day, Time, TimeZone } from "https://code4fukui.github.io/day-es/DateTime.js";

const dt = new DateTime("2021-08-22T18:00+09:00");
console.log(dt.day.toString()); // 2021-08-22
console.log(dt.time.toString()); // 18:00
console.log(dt.timezone.toString()); // +09:00
console.log(dt.getTime()); // 1629622800000
console.log(dt.getUnixTime()); // 1629622800
```

## License

MIT