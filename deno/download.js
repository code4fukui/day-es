import { CSV } from "https://js.sabae.cc/CSV.js";
import { Day } from "../Day.js";
import { deepEqual } from "https://js.sabae.cc/deepEqual.js";

const url = "https://www8.cao.go.jp/chosei/shukujitsu/syukujitsu.csv";
const list = await CSV.fetch(url);
//console.log(list);

const header = list[0];
if (
  header.length != 2 || header[0] != "国民の祝日・休日月日" || header[1] != "国民の祝日・休日名称"
) {
  throw new Error("format changed!");
}
header[0] = "date";
header[1] = "title";
const data = CSV.toJSON(list);
data.forEach((d) => {
  const n = d.date.match(/(\d+)\/(\d+)\/(\d+)/);
  if (!n) {
    throw new Error("date format changed");
  }
  d.date = new Day(parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10))
    .toString();
});

//console.log(data);
try {
  const bk = JSON.parse(await Deno.readTextFile("../holiday_jp.json"));
  if (deepEqual(bk, data)) {
    console.log("not change");
    Deno.exit(0);
  }
} catch (e) {
}

await Deno.writeTextFile("../holiday_jp.csv", CSV.stringify(data));
await Deno.writeTextFile("../holiday_jp.json", JSON.stringify(data, null, 2));
await Deno.writeTextFile(
  "../HOLIDAY_JP.js",
  `export const HOLIDAY_JP = ${JSON.stringify(data, null, 2)};\n`,
);
console.log("updated!");
