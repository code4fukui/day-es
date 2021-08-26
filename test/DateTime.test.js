import * as t from "https://deno.land/std/testing/asserts.ts";
import { DateTime, Day, Time, TimeZone } from "../DateTime.js";

for (;;) {
  const t = new DateTime().getTime() % 1000;
  //console.log("tt", t);
  if (t < 100) {
    break;
  }
}

Deno.test("constructor", () => {
  t.assertEquals(new DateTime(new Day("2021-08-22"), new Time("07:00")).toString(), "2021-08-22T07:00+09:00");
  t.assertEquals(new DateTime(new Day("2021-08-22"), new Time("07:00"), new TimeZone(0)).toString(), "2021-08-22T07:00+00:00");
  t.assertEquals(new DateTime(new DateTime("2021-08-22T07:00:00+09:00").getTime()).toString(), "2021-08-22T07:00:00+09:00");
});
Deno.test("parse", () => {
  t.assertEquals(new DateTime("2021-08-22T07:00+09:00").toString(), "2021-08-22T07:00+09:00");
  t.assertEquals(new DateTime("2021-08-22T07:00+00:00").toString(), "2021-08-22T07:00+00:00");
  t.assertEquals(new DateTime("2021-08-22T07:00Z").toString(), "2021-08-22T07:00+00:00");
  t.assertEquals(new DateTime("2021-08-22 07:00+09:00").toString(), "2021-08-22T07:00+09:00");
  t.assertEquals(new DateTime("2021-08-22 07:00").toString(), "2021-08-22T07:00+09:00");
  t.assertEquals(new DateTime("2021-08-22T07:00").toString(), "2021-08-22T07:00+09:00");
});
Deno.test("now", () => {
  // console.log(new DateTime().toString()); // 2021-08-22T18:13:13.937+09:00
  t.assertEquals(new DateTime().toString(), new Day().toString() + "T" + new Time().toString() + new TimeZone().toString()); // err sometimes
});
Deno.test("getTime", () => {
  t.assertEquals(new DateTime("2021-08-22T18:15:48+09:00").getUnixTime(), 1629623748);
  t.assertEquals(new DateTime().getUnixTime(), Math.floor(new Date().getTime() / 1000)); // err sometimes
  t.assertEquals(new DateTime().getTime(), new Date().getTime()); // err sometimes
});
/*
import { sleep } from "https://js.sabae.cc/sleep.js";
for (;;) {
  console.log(new DateTime().toUnixTime());
  await sleep(1000);
}
*/
