import * as t from "https://deno.land/std/testing/asserts.ts";
import { Time } from "../Time.js";

Deno.test("time", () => {
  t.assertEquals(new Time("07:09").toString(), "07:09");
  t.assertEquals(new Time("07:09:59").toString(), "07:09:59");
  t.assertEquals(new Time("07:09:59.999").toString(), "07:09:59.999");
  t.assertEquals(new Time("-07:09").toString(), "-07:09");
});
Deno.test("toSeconds", () => {
  t.assertEquals(new Time("00:00:10").toSeconds(), 10);
  t.assertEquals(new Time("01:00").toSeconds(), 60 * 60); // 1hour
  t.assertEquals(new Time("01:00:10.123").toSeconds(), 60 * 60 + 10.123);
  t.assertEquals(new Time("-01:00").toSeconds(), -60 * 60);
});
Deno.test("from sec", () => {
  t.assertEquals(new Time(10).toString(), "00:00:10");
  t.assertEquals(new Time(10.9999).toString(), "00:00:10.999");
  t.assertEquals(new Time(60 * 60).toString(), "01:00:00");
  t.assertEquals(new Time(100 * 60 * 60).toString(), "100:00:00");
  t.assertEquals(new Time(-60 * 60).toString(), "-01:00:00");
  t.assertEquals(new Time(-1).toString(), "-00:00:01");
});
Deno.test("minAfter", () => {
  t.assertEquals(new Time("12:00").minAfter(30).toString(), "12:30:00");
  t.assertEquals(new Time("12:00").minAfter(0).toString(), "12:00:00");
  t.assertEquals(new Time("12:00").minAfter(60).toString(), "13:00:00");
  t.assertEquals(new Time("12:00").minAfter(24 * 60).toString(), "36:00:00");
});
Deno.test("minBefore", () => {
  t.assertEquals(new Time("12:00").minBefore(30).toString(), "11:30:00");
  t.assertEquals(new Time("12:00").minBefore(0).toString(), "12:00:00");
  t.assertEquals(new Time("12:00").minBefore(60).toString(), "11:00:00");
  t.assertEquals(new Time("12:00").minBefore(24 * 60).toString(), "-12:00:00");
});
Deno.test("add", () => {
  t.assertEquals(new Time("12:00").add(new Time(30)).toString(), "12:00:30");
  t.assertEquals(new Time("12:00").add(30).toString(), "12:00:30");
  t.assertEquals(new Time("12:00").add("00:00:30").toString(), "12:00:30");
});
Deno.test("sub", () => {
  t.assertEquals(new Time("12:00").sub(new Time(30)).toString(), "11:59:30");
  t.assertEquals(new Time("12:00").sub(30).toString(), "11:59:30");
  t.assertEquals(new Time("12:00").sub("00:00:30").toString(), "11:59:30");
});
Deno.test("mul", () => {
  t.assertEquals(new Time("12:00").mul(2).toString(), "24:00:00");
  t.assertEquals(new Time("00:00:30").mul(30).toString(), "00:15:00");
  t.assertEquals(new Time("00:00:30").mul(0).toString(), "00:00:00");
});
Deno.test("div", () => {
  t.assertEquals(new Time("12:00").div(3).toString(), "04:00:00");
  t.assertEquals(new Time("10:00:00").div(10).toString(), "01:00:00");
  t.assertEquals(new Time("12:00").div("03:00").toSeconds(), 4);
});
Deno.test("mod", () => {
  t.assertEquals(new Time("00:10:00").mod("00:03:00").toString(), "00:01:00");
  t.assertEquals(new Time("00:10:00").mod(17).toString(), "00:00:05");
});
Deno.test("equals", () => {
  t.assertEquals(new Time("01:00").equals(60 * 60), true);
  t.assertEquals(new Time("00:00:30").equals(30), true);
  t.assertEquals(new Time("00:00:30").equals(31), false);
});
Deno.test("contains", () => {
  t.assertEquals(new Time("01:00").contains("01:00", "02:00"), true);
  t.assertEquals(new Time("00:59").contains("01:00", "02:00"), false);
});
Deno.test("toJSON", () => {
  t.assertEquals(JSON.stringify(new Time("01:00")), '"01:00"');
});
Deno.test("another constructors", () => {
  t.assertEquals(new Time(7, 9).toString(), "07:09");
  t.assertEquals(new Time(7, 9, 59).toString(), "07:09:59");
  t.assertEquals(new Time(7, 9, 59.999).toString(), "07:09:59.999");
  t.assertEquals(new Time(-7, 9).toString(), "-07:09");
});
Deno.test("isTime", async () => {
  t.assertEquals(Time.isTime("09:00"), true);
  t.assertEquals(Time.isTime("9:00"), true);
  t.assertEquals(Time.isTime("28:00"), true);
  t.assertEquals(Time.isTime("1000"), false);
  t.assertEquals(Time.isTime("xxx"), false);
});
