export type PrefixKey = "crimson" | "cerulean" | "emerald" | "royal" | "golden" | "elemental" | "otherworldly" | "heroic";
export type SuffixKey = "tormented" | "flayedTwins" | "patient" | "underdog" | "decisive" | "clutch" | "lucky" | "cruel";
export type SuffixCategory = "stable" | "gamble" | "avoid";

type Localized = { en: string; ru: string };
type PrefixDefinition = { label: Localized; bonus: number; condition: Localized };
type SuffixDefinition = { label: Localized; bonus: number; condition: Localized; category: SuffixCategory };
type PlayerPrefixStats = { name: string; values: Partial<Record<PrefixKey, number>> };

export const prefixes: Record<PrefixKey, PrefixDefinition> = {
  crimson: { label: { en: "Crimson", ru: "Багровый" }, bonus: 6, condition: { en: "when playing a red hero", ru: "при игре за красного героя" } },
  cerulean: { label: { en: "Cerulean", ru: "Лазурный" }, bonus: 11, condition: { en: "when playing a blue hero", ru: "при игре за синего героя" } },
  emerald: { label: { en: "Emerald", ru: "Изумрудный" }, bonus: 6, condition: { en: "when playing a green hero", ru: "при игре за зелёного героя" } },
  royal: { label: { en: "Royal", ru: "Королевский" }, bonus: 10, condition: { en: "when playing a purple hero", ru: "при игре за фиолетового героя" } },
  golden: { label: { en: "Golden", ru: "Золотой" }, bonus: 8, condition: { en: "when playing a yellow or brown hero", ru: "при игре за жёлтого или коричневого героя" } },
  elemental: { label: { en: "Elemental", ru: "Элементальный" }, bonus: 8, condition: { en: "when playing a water, fire or ice hero", ru: "при игре за водного, огненного или ледяного героя" } },
  otherworldly: { label: { en: "Otherworldly", ru: "Потусторонний" }, bonus: 7, condition: { en: "when playing an undead, demon or spirit hero", ru: "при игре за нежить, демона или духа" } },
  heroic: { label: { en: "Heroic", ru: "Героический" }, bonus: 9, condition: { en: "when playing a masked or cloaked hero", ru: "при игре за героя в маске или плаще" } }
};

export const suffixes: Record<SuffixKey, SuffixDefinition> = {
  tormented: { label: { en: "the Tormented", ru: "Мученик" }, bonus: 23, condition: { en: "if any roster player dies to a Tormentor", ru: "если кто-либо из игроков умрёт от Терзателя" }, category: "avoid" },
  flayedTwins: { label: { en: "the Flayed Twins Acolyte", ru: "Жрец Бескожих близнецов" }, bonus: 9, condition: { en: "if first blood happens before the starting horn", ru: "если первая кровь прольётся до стартового горна" }, category: "avoid" },
  patient: { label: { en: "the Patient", ru: "Выжидатель" }, bonus: 23, condition: { en: "if first blood does not happen before 10:00", ru: "если первой крови не будет до 10:00" }, category: "avoid" },
  underdog: { label: { en: "the Underdog", ru: "Аутсайдер" }, bonus: 6, condition: { en: "if that player's team loses", ru: "если команда этого игрока проиграет" }, category: "stable" },
  decisive: { label: { en: "the Decisive", ru: "Удалец" }, bonus: 24, condition: { en: "if the game ends before 25:00", ru: "если игра закончится быстрее 25 минут" }, category: "avoid" },
  clutch: { label: { en: "the Clutch", ru: "Творец победы" }, bonus: 16, condition: { en: "in the last possible game of a match", ru: "в последней возможной игре матча" }, category: "stable" },
  lucky: { label: { en: "the Lucky", ru: "Везунчик" }, bonus: 21, condition: { en: "if the game duration ends in the digit 8", ru: "если длительность игры заканчивается на цифру 8" }, category: "gamble" },
  cruel: { label: { en: "the Cruel", ru: "Мучитель" }, bonus: 13, condition: { en: "if a player is killed at their own fountain", ru: "если хотя бы одного игрока убьют у его же фонтана" }, category: "gamble" }
};

const v = (crimson=0, cerulean=0, emerald=0, royal=0, golden=0, elemental=0, otherworldly=0, heroic=0): Partial<Record<PrefixKey, number>> => ({ crimson, cerulean, emerald, royal, golden, elemental, otherworldly, heroic });

export const prefixStatsByPlayerId: Record<string, PlayerPrefixStats[]> = {
  "ysr-niu": [{name:"YSR-04E",values:v(0,15,23,8,23,0,31,23)},{name:"niu",values:v(31,0,31,23,38,38,23,23)}],
  "satanic-noticed": [{name:"Satanic",values:v(12,14,19,16,15,10,24,24)},{name:"Noticed",values:v(37,3,23,22,25,39,15,4)}],
  "yuma-wisper": [{name:"Yuma",values:v(11,12,22,23,25,11,26,22)},{name:"Wisper",values:v(44,4,21,23,30,31,15,14)}],
  "watson-dm": [{name:"watson",values:v(17,12,13,28,14,12,21,17)},{name:"DM",values:v(37,8,14,15,43,33,20,5)}],
  "kiritych-miero": [{name:"Kiritych",values:v(6,16,23,21,20,10,24,35)},{name:"MieRo",values:v(31,6,30,14,34,26,14,7)}],
  "skiter-atf": [{name:"skiter",values:v(14,7,13,13,35,14,21,25)},{name:"ATF",values:v(34,9,24,16,17,25,20,2)}],
  "ame-xxs": [{name:"Ame",values:v(15,10,12,24,21,17,24,19)},{name:"Xxs",values:v(44,3,13,21,33,35,10,5)}],
  "nightfall-ws": [{name:"Nightfall",values:v(14,11,24,25,19,8,14,36)},{name:"Ws",values:v(41,1,24,18,37,24,10,0)}],
  "pure-33": [{name:"Pure",values:v(19,18,22,18,13,16,33,36)},{name:"33",values:v(40,1,30,15,36,43,18,9)}],
  "yatoro-collapse": [{name:"Yatoro",values:v(15,11,14,24,21,17,21,24)},{name:"Collapse",values:v(50,1,24,12,35,32,15,9)}],
  "shiro-bach": [{name:"shiro",values:v(11,7,28,20,23,9,24,40)},{name:"Bach",values:v(49,4,17,16,33,21,17,7)}],
  "ghost-fayde": [{name:"Ghost",values:v(18,18,31,18,23,18,42,28)},{name:"Fayde",values:v(24,17,22,24,29,27,18,2)}],
  "micke-ace": [{name:"miCKe",values:v(18,13,29,8,20,12,22,38)},{name:"Ace",values:v(37,5,27,8,34,34,19,8)}],
  "ssnovv-corrupted": [{name:"ssnovv1",values:v(9,21,20,21,11,5,31,31)},{name:"Corrupted",values:v(29,3,36,13,31,35,21,5)}],
  "natsumi-raven": [{name:"Natsumi",values:v(13,16,18,18,22,19,30,28)},{name:"Raven",values:v(50,0,30,10,20,20,30,0)}],
  "sumail-davai": [{name:"SumaiL",values:v(25,17,12,20,19,27,56,12)},{name:"Davai",values:v(32,0,37,14,24,32,22,2)}],
  "nisha": [{name:"Nisha",values:v(28,31,6,16,6,29,53,9)}],
  "marl1ne": [{name:"Malr1ne",values:v(50,9,10,7,34,20,21,12)}],
  "gpk": [{name:"gpk",values:v(34,27,7,16,2,32,45,6)}],
  "lorenof": [{name:"lorenof",values:v(36,34,19,2,1,29,55,5)}],
  "echozz": [{name:"Echozz",values:v(38,15,0,15,15,23,31,0)}],
  "mikoto": [{name:"Mikoto",values:v(25,40,11,9,0,17,52,12)}],
  "bzm": [{name:"bzm",values:v(32,15,4,12,19,29,38,19)}],
  "noone": [{name:"No[o]ne",values:v(37,21,8,10,8,27,37,14)}],
  "xm": [{name:"Xm",values:v(28,34,12,6,9,20,44,6)}],
  "tailung": [{name:"Tailung",values:v(26,25,19,7,18,16,25,5)}],
  "larl": [{name:"Larl",values:v(27,28,6,9,13,21,36,14)}],
  "chira": [{name:"CHIRA_JUNIOR",values:v(16,20,12,23,6,40,33,21)}],
  "rcy": [{name:"RCY",values:v(24,25,12,5,7,21,51,10)}],
  "nts": [{name:"NothingToSay",values:v(31,31,4,4,28,11,33,10)}],
  "mirage": [{name:"Mirage`",values:v(37,20,8,12,8,40,53,7)}],
  "yopaj": [{name:"Yopaj",values:v(29,28,10,13,13,15,39,6)}],
  "thiolicor-kj": [{name:"Thiolicor",values:v(18,14,35,5,26,24,15,41)},{name:"KJ",values:v(30,17,24,17,26,21,8,34)}],
  "saksa-malady": [{name:"Saksa",values:v(17,5,30,3,44,12,16,48)},{name:"Malady",values:v(44,31,16,9,26,43,9,21)}],
  "tims-skem": [{name:"Tims",values:v(23,9,25,15,25,13,15,43)},{name:"skem",values:v(25,16,13,14,32,23,4,16)}],
  "cr1t-sneyking": [{name:"Cr1t-",values:v(28,7,39,12,33,5,29,59)},{name:"Sneyking",values:v(33,25,16,9,42,42,16,18)}],
  "fy-xnova": [{name:"fy",values:v(15,6,40,11,39,17,16,41)},{name:"xNova",values:v(45,22,15,10,37,43,10,16)}],
  "ari-whitemon": [{name:"Ari",values:v(8,1,29,10,49,11,9,48)},{name:"Whitemon",values:v(44,21,11,13,41,52,12,15)}],
  "mira-kaori": [{name:"Mira",values:v(12,1,40,29,23,7,24,43)},{name:"kaori",values:v(76,27,13,4,29,53,9,33)}],
  "omar-gh": [{name:"OmaR",values:v(14,4,42,3,38,13,1,42)},{name:"GH",values:v(25,27,6,23,37,37,3,7)}],
  "boxi-tofu": [{name:"Boxi",values:v(18,5,29,5,29,26,17,32)},{name:"tofu",values:v(38,20,22,12,29,27,11,35)}],
  "rue-notme": [{name:"rue",values:v(13,8,34,14,36,20,19,35)},{name:"not me",values:v(24,5,43,9,37,23,11,50)}],
  "xinq-y": [{name:"XinQ",values:v(13,16,48,5,37,8,11,52)},{name:"y`",values:v(34,34,27,10,22,45,17,15)}],
  "9class-dukalis": [{name:"9Class",values:v(7,10,36,10,45,8,13,37)},{name:"Dukalis",values:v(35,24,14,10,30,37,11,17)}],
  "planet-zzq": [{name:"planet",values:v(9,9,47,22,38,9,16,31)},{name:"zzq",values:v(23,46,8,23,23,54,0,8)}],
  "save-kataomi": [{name:"Save-",values:v(15,6,42,12,42,6,20,51)},{name:"Kataomi",values:v(32,38,10,17,11,50,9,17)}],
  "bignum-speeed": [{name:"Bignum",values:v(20,6,40,20,31,21,15,35)},{name:"Speeed",values:v(49,15,21,5,38,42,9,33)}],
  "sayuw-respect": [{name:"sayuw",values:v(16,4,62,10,34,12,14,40)},{name:"RESPECT",values:v(32,8,34,11,46,32,12,20)}]
};

export function getPrefixEntries(playerId: string, prefix: PrefixKey) {
  return (prefixStatsByPlayerId[playerId] ?? []).map(entry => ({ name: entry.name, frequency: entry.values[prefix] ?? 0 }));
}

export function getAveragePrefixFrequency(playerId: string, prefix: PrefixKey): number {
  const entries = getPrefixEntries(playerId, prefix);
  if (!entries.length) return 0;
  return entries.reduce((sum, entry) => sum + entry.frequency, 0) / entries.length;
}
