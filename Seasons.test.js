import * as t from "https://deno.land/std/testing/asserts.ts";
import { getSeason } from "./Seasons.js";

Deno.test("simple", () => {
  t.assertEquals(getSeason(), "winter"); // 2025-12
  t.assertEquals(getSeason(new Date("2025-12-01")), "winter");
  t.assertEquals(getSeason(new Date("2025-03-01")), "spring");
  t.assertEquals(getSeason(new Date("2025-06-01")), "summer");
  t.assertEquals(getSeason(new Date("2025-09-01")), "autumn");
  t.assertEquals(getSeason(new Date("2025-11-30")), "autumn");
});
Deno.test("ja", () => {
  t.assertEquals(getSeason(new Date("2025-12-01"), "ja"), "冬");
  t.assertEquals(getSeason(new Date("2025-03-01"), "ja"), "春");
  t.assertEquals(getSeason(new Date("2025-06-01"), "ja"), "夏");
  t.assertEquals(getSeason(new Date("2025-09-01"), "ja"), "秋");
});
