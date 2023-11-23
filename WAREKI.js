// https://github.com/code4fukui/BaseRegistry/blob/main/%E5%85%83%E5%8F%B7%E8%A5%BF%E6%9A%A6%E5%AF%BE%E5%BF%9C%E8%A1%A8.csv
const WAREKI_ID = "MTSHR";
const WAREKI_ID_JA = ["明治", "大正", "昭和", "平成", "令和"];
const WAREKI_FIRST_YEAR = [1868, 1912, 1926, 1989, 2019];

const WAREKI = {
  MEIJI: 1868,
  TAISHO: 1912,
  SHOWA: 1926,
  HEISEI: 1989,
  REIWA: 2019,
};

const WAREKI_JA = {
  "明治": 1868,
  "大正": 1912,
  "昭和": 1926,
  "平成": 1989,
  "令和": 2019,
  "明": 1868,
  "大": 1912,
  "昭": 1926,
  "平": 1989,
  "令": 2019,
};


const wareki2year = (wa) => { // 令和3年
  const n = WAREKI_ID_JA.indexOf(wa.substring(0, 2));
  if (n < 0) {
    throw "unsupported wareki format";
  }
  const year = WAREKI_FIRST_YEAR[n] + parseInt(wa.substring(2), 10) - 1;
  return year;
};
const year2wareki = (year) => {
  for (let i = WAREKI_FIRST_YEAR.length - 1; i >= 0; i--) {
    if (year >= WAREKI_FIRST_YEAR[i]) {
      return WAREKI_ID_JA[i] + (year - WAREKI_FIRST_YEAR[i] + 1) + "年";
    }
  }
  throw "unsupported wareki year";
};

export { WAREKI_ID, WAREKI_ID_JA, WAREKI_FIRST_YEAR, WAREKI, WAREKI_JA, wareki2year, year2wareki };
