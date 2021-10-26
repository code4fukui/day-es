import * as t from "https://deno.land/std/testing/asserts.ts";
import { Day } from "../Day.js";

Deno.test("init", () => {
  new Day(2021, 6, 5);
  new Day(2021, 100);
  new Day();
  new Day(new Date());
  new Day("2021-05-05");
});

Deno.test("chk", () => {
  t.assertEquals(new Day(2021, 6, 5).toString(), "2021-06-05");
  t.assertEquals(new Day(2021, 365).toString(), "2021-12-31");
  t.assertEquals(new Day(2012, 366).toString(), "2012-12-31");
  t.assertEquals(new Day(new Date("2021-06-05")).toString(), "2021-06-05");
  t.assertEquals(new Day(1).toString(), "0001-01-01");
  t.assertEquals(new Day("2021-06-05").toString(), "2021-06-05");
});
Deno.test("illegal", () => {
  t.assertThrows(() => {
    new Day(2021, 366);
  });
  t.assertThrows(() => {
    new Day(null);
  });
  t.assertThrows(() => {
    new Day(2021, 6, 0);
  });
  t.assertThrows(() => {
    new Day(2021, 13, 1);
  });
  t.assertThrows(() => {
    new Day(2021, 0);
  });
  t.assertThrows(() => {
    new Day("2021-12-42");
  });
});

Deno.test("limit", () => {
  t.assertEquals(new Day(1, 1, 1).toString(), "0001-01-01");
  t.assertEquals(new Day(9999, 12, 31).toString(), "9999-12-31");
  t.assertThrows(() => {
    new Day(0, 1, 1);
  });
  t.assertThrows(() => {
    new Day(-1, 1, 1);
  });
  t.assertThrows(() => {
    new Day(10000, 1, 1);
  });
});

Deno.test("nextDay", () => {
  t.assertEquals(new Day(2021, 6, 5).nextDay().toString(), "2021-06-06");
  t.assertEquals(new Day(2021, 6, 30).nextDay().toString(), "2021-07-01");
  t.assertEquals(new Day(2021, 12, 31).nextDay().toString(), "2022-01-01");
});
Deno.test("prevDay", () => {
  t.assertEquals(new Day(2021, 6, 5).prevDay().toString(), "2021-06-04");
  t.assertEquals(new Day(2021, 6, 1).prevDay().toString(), "2021-05-31");
  t.assertEquals(new Day(2021, 1, 1).prevDay().toString(), "2020-12-31");
});
Deno.test("nextMonth", () => {
  t.assertEquals(new Day(2021, 6, 5).nextMonth().toString(), "2021-07-05");
  t.assertEquals(new Day(2021, 5, 31).nextMonth().toString(), "2021-06-30");
  t.assertEquals(new Day(2021, 12, 31).nextMonth().toString(), "2022-01-31");
});
Deno.test("prevMonth", () => {
  t.assertEquals(new Day(2021, 6, 5).prevMonth().toString(), "2021-05-05");
  t.assertEquals(new Day(2021, 6, 1).prevMonth().toString(), "2021-05-01");
  t.assertEquals(new Day(2021, 1, 1).prevMonth().toString(), "2020-12-01");
});
Deno.test("getWeek", () => {
  t.assertEquals(new Day(2021, 6, 5).getWeek(), 6);
  t.assertEquals(new Day(2021, 6, 6).getWeek(), 7);
  t.assertEquals(new Day(2021, 6, 21).getWeek(), 1);
});
Deno.test("getFirstDayOfMonth", () => {
  t.assertEquals(
    new Day(2021, 6, 5).getFirstDayOfMonth().toString(),
    "2021-06-01",
  );
  t.assertEquals(
    new Day(2012, 2, 1).getFirstDayOfMonth().toString(),
    "2012-02-01",
  );
});
Deno.test("getLastDayOfMonth", () => {
  t.assertEquals(
    new Day(2021, 6, 5).getLastDayOfMonth().toString(),
    "2021-06-30",
  );
  t.assertEquals(
    new Day(2012, 2, 1).getLastDayOfMonth().toString(),
    "2012-02-29",
  );
});
Deno.test("getDayOfYear", () => {
  t.assertEquals(new Day(2021, 1, 1).getDayOfYear(), 1);
  t.assertEquals(new Day(2021, 2, 1).getDayOfYear(), 32);
  t.assertEquals(new Day(2021, 12, 31).getDayOfYear(), 365);
  t.assertEquals(new Day(2012, 12, 31).getDayOfYear(), 366);
});
Deno.test("getDayOfGregorian", () => {
  t.assertEquals(new Day(1, 1, 1).getDayOfGregorian(), 1);
  t.assertEquals(new Day(2, 1, 1).getDayOfGregorian(), 366);
  t.assertEquals(new Day(2021, 1, 1).getDayOfGregorian(), 737791);
  t.assertEquals(new Day(2021, 2, 1).getDayOfGregorian(), 737791 + 31);
  t.assertEquals(new Day(2021, 12, 31).getDayOfGregorian(), 737791 + 364);
  t.assertEquals(new Day(2012, 12, 31).getDayOfGregorian(), 734868);
  t.assertEquals(new Day(2021, 6, 5).getDayOfGregorian(), 737946);
  t.assertEquals(new Day(9999, 12, 31).getDayOfGregorian(), 3652059);
});
Deno.test("Gregorian", () => {
  t.assertEquals(new Day(1).toString(), "0001-01-01");
  t.assertThrows(() => {
    new Day(0);
  });
  t.assertEquals(new Day(3652059).toString(), "9999-12-31");
  t.assertThrows(() => {
    new Day(3652059 + 1);
  });
  t.assertEquals(new Day(737946).toString(), "2021-06-05");
});
Deno.test("string", () => {
  t.assertEquals(new Day("0001-12-02").toString(), "0001-12-02");
  t.assertEquals(new Day("2021-06-05").toString(), "2021-06-05");
  t.assertThrows(() => new Day("10-10-10"));
  t.assertThrows(() => new Day("0001-12-00"));
  t.assertThrows(() => new Day("0001-12-42"));
  t.assertThrows(() => new Day("01-12-42"));
});
Deno.test("dayAfter", () => {
  t.assertEquals(new Day("2021-06-05").dayAfter(1).toString(), "2021-06-06");
  t.assertEquals(new Day("2021-06-05").dayAfter(-1).toString(), "2021-06-04");
  t.assertEquals(new Day("2021-06-05").dayAfter(0).toString(), "2021-06-05");
  t.assertEquals(new Day("2021-06-05").dayAfter(10).toString(), "2021-06-15");
  t.assertEquals(new Day("2021-06-05").dayAfter(100).toString(), "2021-09-13");
});
Deno.test("dayBefore", () => {
  t.assertEquals(new Day("2021-06-05").dayBefore(1).toString(), "2021-06-04");
  t.assertEquals(new Day("2021-06-05").dayBefore(-1).toString(), "2021-06-06");
  t.assertEquals(new Day("2021-06-05").dayBefore(0).toString(), "2021-06-05");
  t.assertEquals(new Day("2021-06-05").dayBefore(10).toString(), "2021-05-26");
  t.assertEquals(new Day("2021-06-05").dayBefore(100).toString(), "2021-02-25");
});
Deno.test("subDay", () => {
  t.assertEquals(new Day("2021-06-05").subDay(new Day("2021-06-04")), 1);
  t.assertEquals(new Day("2021-06-05").subDay(new Day("2021-06-06")), -1);
  t.assertEquals(new Day("2021-06-05").subDay(new Day("2020-06-05")), 365);
  t.assertEquals(new Day("2013-01-01").subDay(new Day("2012-01-01")), 366);
  t.assertEquals(new Day("2021-06-05").subDay(new Day("2000-01-01")), 7826);
  t.assertEquals(new Day("2021-11-07").subDay(new Day("2021-06-05")), 155);
  t.assertEquals(new Day("2021-11-07").subDay(new Day("2021-11-06")), 1);
});
Deno.test("immutable", () => {
  t.assertEquals(new Day("2021-12-02").year, 2021);
  t.assertThrows(() => new Day("2021-12-02").year = 2000);
  t.assertThrows(() => new Day("2021-12-02").month = 2);
  t.assertThrows(() => new Day("2021-12-02").day = 1);
});
Deno.test("equals", () => {
  t.assertEquals(new Day("2021-12-02"), new Day("2021-12-02"));
  t.assert(new Day("2021-12-02").equals(new Day("2021-12-02")));
  t.assert(!new Day("2021-12-01").equals(new Day("2021-12-02")));
});
Deno.test("string", () => {
  t.assertEquals(new Day("2021", "12", "02"), new Day(2021, 12, 2));
});
Deno.test("isBefore", () => {
  t.assertEquals(new Day("2021-12-02").isBefore(new Day("2021-12-01")), false);
  t.assertEquals(new Day("2021-12-02").isBefore(new Day("2021-12-02")), false);
  t.assertEquals(new Day("2021-12-02").isBefore(new Day("2021-12-03")), true);
  t.assertEquals(new Day("2021-12-02").isBefore(new Day("2022-12-01")), true);
  t.assertEquals(new Day("2021-12-02").isBefore(new Day("2021-11-03")), false);
});
Deno.test("isAfter", () => {
  t.assertEquals(new Day("2021-12-02").isAfter(new Day("2021-12-01")), true);
  t.assertEquals(new Day("2021-12-02").isAfter(new Day("2021-12-02")), false);
  t.assertEquals(new Day("2021-12-02").isAfter(new Day("2021-12-03")), false);
  t.assertEquals(new Day("2022-12-02").isAfter(new Day("2021-12-03")), true);
});
Deno.test("includes", () => {
  t.assertEquals(new Day("2021-12-02").includes(new Day("2021-12-01"), new Day("2021-12-02")), true);
  t.assertEquals(new Day("2021-11-02").includes(new Day("2021-12-01"), new Day("2021-12-02")), false);
  t.assertEquals(new Day("2022-11-02").includes(new Day("2021-12-01"), new Day("2021-12-02")), false);
  t.assertEquals(new Day("2022-12-02").includes(new Day("2021-12-02"), new Day("2100-12-02")), true);
});
Deno.test("wareki", () => {
  t.assertEquals(new Day("M1", 6, 5).toString(), "1873-06-05");
  t.assertEquals(new Day("T1", 6, 5).toString(), "1912-06-05");
  t.assertEquals(new Day("S53", 365).toString(), "1978-12-31");
  t.assertEquals(new Day("H1", 6, 5).toString(), "1989-06-05");
  t.assertEquals(new Day("R3", 6, 5).toString(), "2021-06-05");
});

Deno.test("chk_str", () => {
  t.assertEquals(new Day("20210605").toString(), "2021-06-05");
  t.assertEquals(new Day("20211201").toString(), "2021-12-01");
  t.assertThrows(() => new Day("2021-1201"));
  t.assertThrows(() => new Day("202112-01"));
  t.assertThrows(() => new Day("202112"));
});
Deno.test("chk_str2", () => {
  t.assertEquals(new Day("2021/06/05").toString(), "2021-06-05");
  t.assertEquals(new Day("2021/6/5").toString(), "2021-06-05");
});
Deno.test("toJSON", () => {
  t.assertEquals(JSON.stringify(new Day("2021/06/05")), '"2021-06-05"');
  t.assertEquals(new Day(JSON.parse('"2021/06/05"')), new Day("2021/06/05"));
  t.assertEquals(new Day(JSON.parse('"2021/06/05"')).toString(), new Day("2021/06/05").toString());
});
Deno.test("isDay", async () => {
  t.assertEquals(Day.isDay("2021-06-05"), true);
  t.assertEquals(Day.isDay("2021/06/05"), true);
  t.assertEquals(Day.isDay("5/5"), false);
  t.assertEquals(Day.isDay("5"), false);
});
Deno.test("string_ja", () => {
  t.assertEquals(new Day("2021年9月11日").toString(), "2021-09-11");
  t.assertEquals(new Day("2021年 9 月 11日").toString(), "2021-09-11");
  t.assertEquals(new Day("昭和53年11月8日").toString(), "1978-11-08");
  t.assertEquals(new Day("昭和 53年 11 月 8日").toString(), "1978-11-08");
  t.assertEquals(new Day(" 令和 3   年 9 月 11 日  ").toString(), "2021-09-11");
});
Deno.test("week", () => {
  t.assertEquals(Day.MONDAY, 1);
  t.assertEquals(Day.TUESDAY, 2);
  t.assertEquals(Day.WEDNESDAY, 3);
  t.assertEquals(Day.THURSDAY, 4);
  t.assertEquals(Day.FRIDAY, 5);
  t.assertEquals(Day.SATURDAY, 6);
  t.assertEquals(Day.SUNDAY, 7);
});
Deno.test("toStringYMD", () => {
  t.assertEquals(new Day("2021-09-14").toStringYMD(), "20210914");
});
Deno.test("new Day(Day)", () => {
  t.assertEquals(new Day(new Day("2021-09-14")).toStringYMD(), "20210914");
});
Deno.test("isLeapYear", () => {
  t.assert(Day.isLeapYear(2012));
  t.assert(!Day.isLeapYear(2021));
  t.assertEquals(Day.getLengthOfYear(2012), 366)
  t.assertEquals(Day.getLengthOfYear(2021), 365)
});
Deno.test("getWeekJA", () => {
  t.assertEquals(new Day(2021, 10, 10).getWeekJA(), "日");
  t.assertEquals(new Day(2021, 10, 11).getWeekJA(), "月");
});
Deno.test("toStringJA", () => {
  t.assertEquals(new Day(2021, 10, 10).toStringJA(), "2021/10/10(日)");
  t.assertEquals(new Day(2021, 10, 11).toStringJA(), "2021/10/11(月)");
});
Deno.test("toStringJALong", () => {
  t.assertEquals(new Day(2021, 10, 10).toStringJALong(), "2021年10月10日(日)");
  t.assertEquals(new Day(2021, 10, 11).toStringJALong(), "2021年10月11日(月)");
});
Deno.test("intersects", () => {
  t.assertEquals(Day.intersects(new Day("2021-01-01"), new Day("2021-12-31"), new Day("2021-03-03"), new Day("2021-03-04")), true);
  t.assertEquals(Day.intersects(new Day("2021-01-01"), new Day("2021-12-31"), new Day("2022-03-03"), new Day("2022-03-04")), false);
  t.assertEquals(Day.intersects(new Day("2021-01-01"), new Day("2021-12-31"), new Day("2000-01-03"), new Day("2022-03-04")), true);
  t.assertEquals(Day.intersects(new Day("2021-01-01"), new Day("2021-12-31"), new Day("2000-01-03"), new Day("2000-03-04")), false);
  t.assertEquals(Day.intersects(new Day("2021-01-01"), new Day("2021-12-31"), new Day("2000-01-03"), new Day("2021-01-01")), true);
});