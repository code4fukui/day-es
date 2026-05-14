# day-es

ブラウザおよびDeno向けに、日付、時刻、タイムゾーン、日本の祝日、カレンダーを扱うためのJavaScript ESモジュール。

## デモ

- [**カレンダー**](https://code4fukui.github.io/day-es/examples/calendar.html): 祝日をハイライト表示するインタラクティブな月間カレンダー。
- [**次の祝日カウントダウン**](https://code4fukui.github.io/day-es/examples/nextholiday.html): 次の日本の国民の祝日を表示し、その日までの日数をカウントダウンします。
- [**日付カウントダウン/カウントアップ**](https://code4fukui.github.io/day-es/examples/countdown.html): 特定の日付までの日数、または特定の日付からの日数を計算します。
- [**日本の祝日一覧**](https://code4fukui.github.io/day-es/examples/syukujitsu-list.html): 内閣府のデータに基づく国民の祝日の完全なリストを表示します。
- [**和暦 ⇔ 西暦変換**](https://code4fukui.github.io/day-es/examples/wareki2seireki.html): 日本の元号（和暦）とグレゴリオ暦（西暦）を相互に変換します。

## 特徴

- **モジュール設計**: `Day`、`Time`、`TimeZone`、`DateTime` 用の独立したイミュータブルなESモジュールを提供します。
- **広範な日付範囲**: 1年から9999年までの日付を処理できます。
- **日本の祝日サポート**: 日本の国民の祝日に関する包括的な機能を含みます。
- **自動データ更新**: 祝日データは内閣府から自動的に取得され、[GitHub Action](.github/workflows/scheduled-fetch.yml) を通じて毎月更新されます。
- **和暦**: グレゴリオ暦（西暦）と日本の元号（和暦）を変換するユーティリティ。
- **季節情報**: 指定された日付の季節（春、夏、秋、冬）を判定します。
- **ゼロ依存**: 軽量で自己完結しています。
- **クロスプラットフォーム**: モダンブラウザおよびDenoで動作します。

## 使い方

### Day.js

日付の作成、操作、比較を行います。

```js
import { Day } from "https://code4fukui.github.io/day-es/Day.js";

const day = new Day(2021, 6, 5); // 2021-06-05
console.log(day.toString()); // 2021-06-05
console.log(day.dayAfter(2)); // Day { year: 2021, month: 6, day: 7 }
```

### DateTime.js

`Day`、`Time`、`TimeZone` を組み合わせ、完全な日時処理を提供します。

```js
import { DateTime } from "https://code4fukui.github.io/day-es/DateTime.js";

const dt = new DateTime("2021-08-22T18:00+09:00");
console.log(dt.day.toString()); // 2021-08-22
console.log(dt.time.toString()); // 18:00
console.log(dt.getUnixTime()); // 1629622800
```

### Holiday.js

日本の国民の祝日を判定します。

```js
import { Day } from "https://code4fukui.github.io/day-es/Day.js";
import { isHoliday, getHoliday } from "https://code4fukui.github.io/day-es/Holiday.js";

const d = new Day("2021-07-22");
console.log(isHoliday(d)); // true
console.log(getHoliday(d)); // 海の日
```

### WAREKI.js（和暦）

グレゴリオ暦（西暦）と日本の元号（和暦）の変換を行います。

```js
import { year2wareki, wareki2year } from "https://code4fukui.github.io/day-es/WAREKI.js";

console.log(year2wareki(2022)); // 令和4年
console.log(wareki2year("令和4年")); // 2022
```

### Seasons.js

指定された日付の季節を判定します。

```js
import { getSeason } from "https://code4fukui.github.io/day-es/Seasons.js";

const springDay = new Date("2025-03-01");
console.log(getSeason(springDay)); // "spring"
console.log(getSeason(springDay, "ja")); // "春"
```

## データソース

日本の祝日データは[「国民の祝日について - 内閣府」](https://www8.cao.go.jp/chosei/shukujitsu/gaiyou.html)から取得しています。

## ライセンス

MIT
