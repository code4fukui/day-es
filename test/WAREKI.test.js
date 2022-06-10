import * as t from "https://deno.land/std/testing/asserts.ts";
import { wareki2year, year2wareki } from "../WAREKI.js";

Deno.test("simple", () => {
  t.assertEquals(year2wareki(2022), "令和4年");
  t.assertEquals(wareki2year("令和4年"), 2022);
  t.assertEquals(year2wareki(1978), "昭和53年");
  t.assertEquals(wareki2year("昭和53年"), 1978);
});