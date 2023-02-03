import * as t from "https://deno.land/std/testing/asserts.ts";
import { getHoliday, isHoliday, searchHoliday, getNextHoliday, getLastHoliday } from "../Holiday.js";
import { Day } from "../Day.js";

Deno.test("test", () => {
  t.assert(isHoliday("2021-01-01"));
  t.assert(!isHoliday("2021-01-05"));
  t.assert(isHoliday("2021-07-22"));
  t.assertEquals(getHoliday("2021-07-22"), "海の日");
  t.assertEquals(getHoliday("2021-07-23"), "スポーツの日");
  t.assertEquals(getHoliday("2021-07-24"), undefined);
});
Deno.test("search", () => {
  const chk = [
    "2020-07-24",
    "2021-07-23",
    "2022-10-10",
    "2023-10-09",
    "2024-10-14",
  ];
  t.assertEquals(searchHoliday("スポーツの日"), chk);
});
Deno.test("use Day.js", () => {
  t.assert(isHoliday("令和2年7月23日"));
});
Deno.test("getNextHoliday", () => {
  t.assertEquals(getNextHoliday("2022-12-31"), { date: "2023-01-01", title: "元日" });
  t.assertEquals(getNextHoliday("2023-01-01"), { date: "2023-01-02", title: "休日" });
  t.assertEquals(getNextHoliday(), getNextHoliday(new Day()));
});
Deno.test("getLastHoliday", () => {
  t.assertEquals(getLastHoliday(), { date: "2024-11-23", title: "勤労感謝の日" });
});
