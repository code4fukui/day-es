# day-es

- 西暦1年から9999年までの日付と時間とタイムゾーンを扱う、ブラウザとDeno用、JavaScript ESモジュールです
- [Day.js](Day.js), [Time.js](Time.js), [TimeZone.js](TimeZone.js), [DateTime.js](DateTime.js)
- [ISO 8601](https://ja.wikipedia.org/wiki/ISO_8601)、ベースレジストリ、[行政基本情報データ連携モデル 日付及び時刻](https://github.com/code4fukui/BaseRegistry/blob/main/%E8%A1%8C%E6%94%BF%E5%9F%BA%E6%9C%AC%E6%83%85%E5%A0%B1%E3%83%87%E3%83%BC%E3%82%BF%E9%80%A3%E6%90%BA%E3%83%A2%E3%83%87%E3%83%AB-%E6%97%A5%E4%BB%98%E5%8F%8A%E3%81%B3%E6%99%82%E5%88%BB.md)に準拠しています

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

## 曜日

[行政基本情報データ連携モデル 日付及び時刻](https://github.com/code4fukui/BaseRegistry/blob/main/%E8%A1%8C%E6%94%BF%E5%9F%BA%E6%9C%AC%E6%83%85%E5%A0%B1%E3%83%87%E3%83%BC%E3%82%BF%E9%80%A3%E6%90%BA%E3%83%A2%E3%83%87%E3%83%AB-%E6%97%A5%E4%BB%98%E5%8F%8A%E3%81%B3%E6%99%82%E5%88%BB.md)に準拠し、日曜日は0ではなく7

```js
Deno.test("getWeek", () => {
  t.assertEquals(new Day(2021, 6, 5).getWeek(), 6); // Satarday == 6
  t.assertEquals(new Day(2021, 6, 6).getWeek(), 7); // Sunday == 7 (not 0)
  t.assertEquals(new Day(2021, 6, 21).getWeek(), 1); // Monday == 1
});
```

（% 7 で使用すると従来同様となる）

## 時間

```js
import { Time } from "https://code4fukui.github.io/dey-es/Time.js";

console.log(new Time("12:34:56").add(60).toString()); // 12:35:56
```
toString, getSeconds, minAfter, minBefore, add, sub, mul, div, mod, equals, contains

## タイムゾーン

```js
import { TimeZone } from "https://code4fukui.github.io/dey-es/TimeZone.js";

console.log(new TimeZone("09:00").toString()); // +09:00
```
toString, getOffset

## 日時

```js
import { DateTime, Day, Time, TimeZone } from "https://code4fukui.github.io/day-es/DateTime.js";

const dt = new DateTime("2021-08-22T18:00+09:00");
console.log(dt.day.toString()); // 2021-08-22
console.log(dt.time.toString()); // 18:00
console.log(dt.timezone.toString()); // +09:00
console.log(dt.getTime()); // 1629622800000
console.log(dt.getUnixTime()); // 1629622800
```
toString, getOffset

## テスト

```js
$ deno test
```
* 秒の変わり目など、タイミングによってエラーが出ます

## 応用例

- [カレンダー](https://code4fukui.github.io/day-es/examples/calendar.html)
- [カウントダウン](https://code4fukui.github.io/day-es/examples/countdown.html)
- [国民の祝日リスト](https://code4fukui.github.io/day-es/examples/syukujitsu-list.html)
