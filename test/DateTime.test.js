import * as t from "https://deno.land/std/testing/asserts.ts";
import { DateTime, Day, Time, TimeZone } from "../DateTime.js";

const waitExactTime = async () => {
  for (;;) {
    const t = new DateTime().getTime() % 1000;
    //console.log("tt", t);
    if (t < 100) {
      break;
    }
  }
};

Deno.test("constructor", async () => {
  await waitExactTime();
  t.assertEquals(new DateTime(new Day("2021-08-22"), new Time("07:00")).toString(), "2021-08-22T07:00+09:00");
  t.assertEquals(new DateTime(new Day("2021-08-22"), new Time("07:00"), new TimeZone(0)).toString(), "2021-08-22T07:00+00:00");
  t.assertEquals(new DateTime(new DateTime("2021-08-22T07:00:00+09:00").getTime()).toString(), "2021-08-22T07:00:00+09:00");
  t.assertEquals(new DateTime(new DateTime("2021-08-22").getTime()).toString(), "2021-08-22T00:00:00+09:00");
});
Deno.test("parse", async () => {
  await waitExactTime();
  t.assertEquals(new DateTime("2021-08-22T07:00+09:00").toString(), "2021-08-22T07:00+09:00");
  t.assertEquals(new DateTime("2021-08-22T07:00+00:00").toString(), "2021-08-22T07:00+00:00");
  t.assertEquals(new DateTime("2021-08-22T07:00Z").toString(), "2021-08-22T07:00+00:00");
  t.assertEquals(new DateTime("2021-08-22 07:00+09:00").toString(), "2021-08-22T07:00+09:00");
  t.assertEquals(new DateTime("2021-08-22 07:00").toString(), "2021-08-22T07:00+09:00");
  t.assertEquals(new DateTime("2021-08-22T07:00").toString(), "2021-08-22T07:00+09:00");
});
Deno.test("now", async () => {
  await waitExactTime();
  // console.log(new DateTime().toString()); // 2021-08-22T18:13:13.937+09:00
  t.assertEquals(new DateTime().toString(), new Day().toString() + "T" + new Time().toString() + new TimeZone().toString()); // err sometimes
});
Deno.test("getTime", async () => {
  await waitExactTime();
  t.assertEquals(new DateTime("2021-08-22T18:15:48+09:00").getUnixTime(), 1629623748);
  t.assertEquals(new DateTime().getUnixTime(), Math.floor(new Date().getTime() / 1000)); // err sometimes
  t.assertEquals(new DateTime().getTime(), new Date().getTime()); // err sometimes
});
Deno.test("isDateTime", async () => {
  await waitExactTime();
  t.assertEquals(DateTime.isDateTime("2021-08-22"), true);
  t.assertEquals(DateTime.isDateTime("2021"), false);
  t.assertEquals(DateTime.isDateTime("2021-08-22T09:00"), true);
  t.assertEquals(DateTime.isDateTime("2021/08/22"), true);
  t.assertEquals(DateTime.isDateTime("2021年8月22日"), true);
});
Deno.test("toString", async () => {
  t.assertEquals(new DateTime("2021-08-22T06:05:04.03+09:00").toString(), "2021-08-22T06:05:04.030+09:00");
});
Deno.test("toStringMin", async () => {
  t.assertEquals(new DateTime("2021-08-22T06:05:04.03+09:00").toStringMin(), "2021-08-22 06:05");
});
Deno.test("toStringRFC2822", () => {
  t.assertEquals(new DateTime("2021-09-22T06:05:04.03+09:00").toStringRFC2822(), "Wed, 22 Sep 2021 06:05:04.030 +0900");
});
Deno.test("toStringMinLog", () => {
  t.assertEquals(new DateTime("2021-09-22T06:05:04.03+09:00").toStringMinLog(), "202109220605");
});
Deno.test("toStringLocal", () => {
  t.assertEquals(new DateTime("2021-09-22T06:05:04.03+09:00").toStringLocal(), "2021-09-22T06:05:04.030");
});
Deno.test("from Date", async () => {
  const d = Date.parse('04 Dec 1995 00:12:00 GMT');
  t.assertEquals(new DateTime(d).toString(), "1995-12-04T09:12:00+09:00");
});
