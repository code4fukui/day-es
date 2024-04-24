import * as t from "https://deno.land/std/testing/asserts.ts";
import { TimeZone } from "../TimeZone.js";
import { Time } from "../Time.js";

Deno.test("timezone", () => {
  t.assertEquals(new TimeZone("07:00").toString(), "+07:00");
  t.assertEquals(new TimeZone().toString(), "+09:00"); // if in Japan
  t.assertEquals(new TimeZone(9).toString(), "+09:00");
  t.assertEquals(new TimeZone(9, 30).toString(), "+09:30");
  t.assertEquals(new TimeZone(-9, 30).toString(), "-09:30");
  t.assertEquals(new TimeZone(new TimeZone(9, 30)).toString(), "+09:30");
  t.assertEquals(new TimeZone(new Time(9, 30)).toString(), "+09:30");
});
Deno.test("timezone offset", () => {
  t.assertEquals(new TimeZone("07:00").getOffset(), 7 * 60);
  t.assertEquals(new TimeZone().getOffset(), 9 * 60); // if in Japan
});
Deno.test("toJSON", () => {
  t.assertEquals(new TimeZone("07:00").toJSON(), "+07:00");
});
Deno.test("preset", () => {
  t.assertEquals(new TimeZone("+09:00"), TimeZone.JST);
  t.assertEquals(new TimeZone("+00:00"), TimeZone.UTC);
});
Deno.test("toStringHM", () => {
  t.assertEquals(new TimeZone("07:00").toStringHM(), "+0700");
  t.assertEquals(new TimeZone("-07:00").toStringHM(), "-0700");
});
