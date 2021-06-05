# day-es
 
西暦1年から9999年までの日付を扱う、ブラウザとDeno用、JavaScript ESモジュールです

## usage

```js
import { Day } from "https://code4fukui.github.io/day-es/Day.js";

const day = new Day(2021, 6, 5); // 2021/6/5
console.log(day); // Day { year: 2021, month: 6, day: 5 }
console.log(day.dayAfter(2)); // Day { year: 2021, month: 6, day: 7 }
```

## 祝日判定
```js
import { isHoliday } from "https://code4fukui.github.io/dey-es/Holiday.js";

console.log(isHoliday(new Day("2021-07-22"))); // true
```

## 応用例

- [カレンダー](https://code4fukui.github.io/day-es/examples/calendar.html) 
- [カウントダウン](https://code4fukui.github.io/day-es/examples/countdown.html) 
- [国民の祝日リスト](https://code4fukui.github.io/day-es/examples/syukujitsu-list.html)
