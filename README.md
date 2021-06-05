# day-es
 
1年から999年までの日付を扱う、ブラウザとDeno用、JavaScript ESモジュールです

## usage

```js
import { Day } from "https://code4fukui.github.io/dey-es/Day.js";

const day = new Day(2021, 6, 5); // 2021/6/5
console.log(day); // 2021-06-06
console.log(day.afterDay(2)); // 2021-06-08
```

祝日判定
```js
import { isHoliday } from "https://code4fukui.github.io/dey-es/Holiday.js";

console.log(isHoliday(new Day("2021-07-22"))); // true
```
