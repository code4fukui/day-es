import * as t from "https://deno.land/std/testing/asserts.ts";
import { getHoliday, isHoliday, searchHoliday } from "../Holiday.js";

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
  ];
  t.assertEquals(searchHoliday("スポーツの日"), chk);
});
