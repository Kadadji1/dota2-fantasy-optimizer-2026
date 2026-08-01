import { Role, StatKey } from "./players";

export type EmblemColor = "red" | "blue" | "green";
export type Tier = "I" | "II" | "III" | "IV" | "V";
export type Trait = "none" | "fractal" | "benevolent" | "vampiric" | "unique" | "friendly";

export const tierBonuses: Record<Tier, number> = {
  I: 10,
  II: 30,
  III: 60,
  IV: 100,
  V: 150
};

export const bannerSlotColors: Record<Role, EmblemColor[]> = {
  core: ["red", "green", "red"],
  mid: ["red", "blue", "green"],
  support: ["blue", "green", "blue"]
};

export const traitDescriptions: Record<Trait, { en: string; ru: string }> = {
  none: { en: "No trait", ru: "Без свойства" },
  fractal: {
    en: "+60% to this emblem if all three emblem tiers are different",
    ru: "+60% к этой эмблеме, если все три разряда на знамени разные"
  },
  benevolent: {
    en: "+20% to adjacent emblems",
    ru: "+20% к соседним эмблемам"
  },
  vampiric: {
    en: "+50% to this emblem and −10% to adjacent emblems",
    ru: "+50% к этой эмблеме и −10% к соседним"
  },
  unique: {
    en: "+30% to this emblem if there are no other Unique emblems on the banner",
    ru: "+30% к этой эмблеме, если на знамени нет других уникальных эмблем"
  },
  friendly: {
    en: "+50% to this emblem if the banner has at least three Friendly emblems",
    ru: "+50% к этой эмблеме, если на знамени есть минимум три дружелюбные эмблемы"
  }
};

export const statColors: Record<StatKey, EmblemColor> = {
  gpm: "red",
  deaths: "red",
  creeps: "red",
  madstones: "red",
  kills: "red",
  towers: "red",
  wards: "blue",
  stacks: "blue",
  lotuses: "blue",
  watchers: "blue",
  runes: "blue",
  smokes: "blue",
  teamfight: "green",
  stuns: "green",
  tormentor: "green",
  roshan: "green",
  firstBlood: "green",
  courier: "green"
};

export const scoringRules: Partial<Record<StatKey, string>> = {
  kills: "107 × kills",
  deaths: "1950 − 195 × deaths",
  creeps: "3 × creeps",
  gpm: "2 × GPM",
  madstones: "13 × madstones",
  towers: "352 × towers",
  wards: "117 × wards placed",
  stacks: "234 × camps stacked",
  runes: "141 × runes",
  watchers: "147 × watchers captured",
  lotuses: "176 × lotuses (approx.)",
  smokes: "293 × Smoke of Deceit uses",
  teamfight: "2124 × teamfight participation",
  stuns: "10 × stun duration",
  firstBlood: "1934 × first blood",
  tormentor: "879 × Tormentor kills",
  roshan: "1172 × Roshan kills",
  courier: "703 × courier kills"
};

export const averageEmblemValues: Record<Role, Partial<Record<StatKey, number>>> = {
  core: {
    gpm: 1297, creeps: 1293, deaths: 1213, kills: 715, towers: 691, madstones: 223,
    teamfight: 1316, roshan: 519, tormentor: 339, stuns: 295, firstBlood: 200, courier: 174
  },
  mid: {
    deaths: 1230, gpm: 1218, creeps: 1170, kills: 786, towers: 389, madstones: 153,
    runes: 1432, stacks: 462, watchers: 348, wards: 176, lotuses: 140, smokes: 14,
    teamfight: 1483, stuns: 338, roshan: 289, courier: 209, tormentor: 127, firstBlood: 113
  },
  support: {
    watchers: 1214, wards: 1036, smokes: 934, stacks: 895, runes: 414, lotuses: 380,
    teamfight: 1409, stuns: 404, courier: 296, firstBlood: 222, roshan: 53, tormentor: 49
  }
};

export const methodologyNotes = [
  "Each game is scored separately.",
  "A match result is the sum of the two highest-scoring games in that series.",
  "A player or pair value is the average match score over the selected source tournaments.",
  "Death score is not clamped at zero and can become negative.",
  "Lotus data is approximate because OpenDota does not expose the exact pickup event.",
  "Two suffixes cannot be modeled reliably with OpenDota: pre-horn first blood and fountain kills.",
  "Trait effects are applied multiplicatively to the tier-adjusted emblem contribution, following the official glossary wording."
];
