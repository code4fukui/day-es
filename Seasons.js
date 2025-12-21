export const SEASONS = ["spring", "summer", "autumn", "winter"];
export const SEASONS_JA = { spring: "春", summer: "夏", autumn: "秋", winter: "冬" };
export const SEASONS_LANGS = { ja: SEASONS_JA };

const trans = (s, lang) => {
  const langs = SEASONS_LANGS[lang];
  if (!langs) return s;
  return langs[s];
};

export const getSeason = (date = null, lang = "en") => {
  if (!date) date = new Date();
  const m = date.getMonth() + 1;
  //console.log(m, date)
  if (m == 12 || m <= 2) return trans("winter", lang);
  if (m <= 5) return trans("spring", lang);
  if (m <= 8) return trans("summer", lang);
  return trans("autumn", lang);
};
