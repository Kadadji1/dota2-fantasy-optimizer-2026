export type Role = "core" | "mid" | "support";

export type StatKey =
  | "gpm"
  | "deaths"
  | "creeps"
  | "madstones"
  | "kills"
  | "towers"
  | "teamfight"
  | "stuns"
  | "tormentor"
  | "roshan"
  | "firstBlood"
  | "courier"
  | "wards"
  | "stacks"
  | "lotuses"
  | "watchers"
  | "runes"
  | "smokes";

export type Player = {
  id: string;
  name: string;
  team: string;
  role: Role;
  stats: Partial<Record<StatKey, number>>;
};

// Community-derived TI 2026 fantasy values transcribed from the supplied tables.
// Core and support banners select a pair of players, so those entries are stored as pairs.
export const players: Player[] = [
  { id: "ysr-niu", name: "YSR-04E & niu", team: "", role: "core", stats: { gpm: 2539, deaths: 2925, creeps: 2334, madstones: 1247, kills: 1585, towers: 1624, teamfight: 2941, stuns: 554, tormentor: 1893, roshan: 1082, firstBlood: 447, courier: 270 } },
  { id: "satanic-noticed", name: "Satanic & Noticed", team: "", role: "core", stats: { gpm: 2723, deaths: 2677, creeps: 2539, madstones: 1293, kills: 1609, towers: 1696, teamfight: 2608, stuns: 607, tormentor: 1222, roshan: 1117, firstBlood: 487, courier: 263 } },
  { id: "yuma-wisper", name: "Yuma & Wisper", team: "", role: "core", stats: { gpm: 2644, deaths: 2359, creeps: 2753, madstones: 1403, kills: 1639, towers: 1017, teamfight: 2728, stuns: 642, tormentor: 1372, roshan: 1261, firstBlood: 427, courier: 481 } },
  { id: "watson-dm", name: "watson & DM", team: "", role: "core", stats: { gpm: 2668, deaths: 2643, creeps: 2563, madstones: 1374, kills: 1478, towers: 1256, teamfight: 2654, stuns: 597, tormentor: 1447, roshan: 1126, firstBlood: 504, courier: 395 } },
  { id: "kiritych-miero", name: "Kiritych & MieRo", team: "", role: "core", stats: { gpm: 2574, deaths: 2501, creeps: 2548, madstones: 1317, kills: 1350, towers: 1555, teamfight: 2627, stuns: 530, tormentor: 1534, roshan: 1281, firstBlood: 432, courier: 236 } },
  { id: "skiter-atf", name: "skiter & ATF", team: "", role: "core", stats: { gpm: 2637, deaths: 2275, creeps: 2638, madstones: 958, kills: 1586, towers: 1488, teamfight: 2544, stuns: 596, tormentor: 1507, roshan: 1114, firstBlood: 312, courier: 572 } },
  { id: "ame-xxs", name: "Ame & Xxs", team: "", role: "core", stats: { gpm: 2550, deaths: 2436, creeps: 2744, madstones: 1371, kills: 1236, towers: 1448, teamfight: 2595, stuns: 597, tormentor: 1482, roshan: 962, firstBlood: 392, courier: 343 } },
  { id: "nightfall-ws", name: "Nightfall & Ws", team: "", role: "core", stats: { gpm: 2586, deaths: 2606, creeps: 2289, madstones: 1197, kills: 1568, towers: 1238, teamfight: 2645, stuns: 655, tormentor: 1363, roshan: 1075, firstBlood: 355, courier: 307 } },
  { id: "pure-33", name: "Pure & 33", team: "", role: "core", stats: { gpm: 2680, deaths: 2227, creeps: 2648, madstones: 1250, kills: 1476, towers: 1241, teamfight: 2620, stuns: 484, tormentor: 1378, roshan: 1004, firstBlood: 323, courier: 464 } },
  { id: "yatoro-collapse", name: "Yatoro & Collapse", team: "", role: "core", stats: { gpm: 2593, deaths: 2216, creeps: 2471, madstones: 1175, kills: 1462, towers: 1387, teamfight: 2596, stuns: 610, tormentor: 1356, roshan: 991, firstBlood: 450, courier: 388 } },
  { id: "shiro-bach", name: "shiro & Bach", team: "", role: "core", stats: { gpm: 2461, deaths: 2407, creeps: 2549, madstones: 1252, kills: 1177, towers: 1309, teamfight: 2599, stuns: 674, tormentor: 1512, roshan: 1101, firstBlood: 354, courier: 171 } },
  { id: "ghost-fayde", name: "Ghost & Fayde", team: "", role: "core", stats: { gpm: 2492, deaths: 2161, creeps: 2438, madstones: 1226, kills: 1343, towers: 1310, teamfight: 2593, stuns: 616, tormentor: 1114, roshan: 897, firstBlood: 542, courier: 296 } },
  { id: "micke-ace", name: "miCKe & Ace", team: "", role: "core", stats: { gpm: 2475, deaths: 2287, creeps: 2423, madstones: 953, kills: 1390, towers: 1319, teamfight: 2606, stuns: 688, tormentor: 1433, roshan: 829, firstBlood: 300, courier: 272 } },
  { id: "ssnovv-corrupted", name: "ssnovv1 & Corrupted", team: "", role: "core", stats: { gpm: 2487, deaths: 2240, creeps: 2337, madstones: 1103, kills: 1093, towers: 1354, teamfight: 2595, stuns: 688, tormentor: 1103, roshan: 729, firstBlood: 232, courier: 285 } },
  { id: "natsumi-raven", name: "Natsumi & Raven", team: "", role: "core", stats: { gpm: 2449, deaths: 2541, creeps: 2471, madstones: 1138, kills: 1128, towers: 1098, teamfight: 2793, stuns: 385, tormentor: 843, roshan: 666, firstBlood: 389, courier: 309 } },
  { id: "sumail-davai", name: "SumaiL & Davai", team: "", role: "core", stats: { gpm: 2329, deaths: 2020, creeps: 2057, madstones: 892, kills: 1407, towers: 708 } },

  { id: "nisha", name: "Nisha", team: "", role: "mid", stats: { gpm: 1267, deaths: 1262, creeps: 1212, madstones: 521, kills: 894, towers: 478, teamfight: 1483, stuns: 316, tormentor: 500, wards: 172.42, stacks: 508.03, watchers: 346.22, runes: 1601.09, smokes: 7.71 } },
  { id: "marl1ne", name: "Malr1ne", team: "", role: "mid", stats: { gpm: 1215, deaths: 1122, creeps: 1161, madstones: 532, kills: 837, towers: 383, teamfight: 1500, stuns: 494, tormentor: 677, wards: 185.53, stacks: 471.34, watchers: 180.60, runes: 1583.23, smokes: 58.60 } },
  { id: "gpk", name: "gpk", team: "", role: "mid", stats: { gpm: 1228, deaths: 1273, creeps: 1213, madstones: 536, kills: 831, towers: 345, teamfight: 1487, stuns: 352, tormentor: 579, wards: 195.48, stacks: 482.27, watchers: 358.54, runes: 1564.76, smokes: 10.72 } },
  { id: "lorenof", name: "lorenof", team: "", role: "mid", stats: { gpm: 1273, deaths: 1378, creeps: 1095, madstones: 405, kills: 849, towers: 525, teamfight: 1450, stuns: 279, tormentor: 324, wards: 210.60, stacks: 533.52, watchers: 94.08, runes: 1353.60, smokes: 11.72 } },
  { id: "echozz", name: "Echozz", team: "", role: "mid", stats: { gpm: 1104, deaths: 1425, creeps: 962, madstones: 616, kills: 520, towers: 217, teamfight: 1549, stuns: 278, tormentor: 541 } },
  { id: "mikoto", name: "Mikoto", team: "", role: "mid", stats: { gpm: 1239, deaths: 1414, creeps: 1170, madstones: 491, kills: 852, towers: 374, teamfight: 1446, stuns: 257, tormentor: 302, wards: 198.39, stacks: 310.30, watchers: 321.16, runes: 1603.11, smokes: 0 } },
  { id: "bzm", name: "bzm", team: "", role: "mid", stats: { gpm: 1265, deaths: 1045, creeps: 1203, madstones: 255, kills: 786, towers: 439, teamfight: 1481, stuns: 451, tormentor: 538, wards: 176.37, stacks: 722.96, watchers: 399.31, runes: 1403.69, smokes: 17.49 } },
  { id: "noone", name: "No[o]ne", team: "", role: "mid", stats: { gpm: 1220, deaths: 1324, creeps: 1079, madstones: 442, kills: 768, towers: 405, teamfight: 1496, stuns: 312, tormentor: 471, wards: 135.78, stacks: 407.33, watchers: 533.56, runes: 1415.22, smokes: 25.32 } },
  { id: "xm", name: "Xm", team: "", role: "mid", stats: { gpm: 1211, deaths: 1184, creeps: 1244, madstones: 570, kills: 728, towers: 258, teamfight: 1519, stuns: 311, tormentor: 482, wards: 176.69, stacks: 267.43, watchers: 411.00, runes: 1294.90, smokes: 0 } },
  { id: "tailung", name: "Tailung", team: "", role: "mid", stats: { gpm: 1230, deaths: 1133, creeps: 1285, madstones: 484, kills: 690, towers: 499, teamfight: 1395, stuns: 292, tormentor: 424, wards: 133.71, stacks: 494.74, watchers: 405.30, runes: 1305.26, smokes: 4.19 } },
  { id: "larl", name: "Larl", team: "", role: "mid", stats: { gpm: 1220, deaths: 1147, creeps: 1182, madstones: 527, kills: 847, towers: 277, teamfight: 1480, stuns: 333, tormentor: 447, wards: 128.22, stacks: 362.22, watchers: 390.66, runes: 1475.67, smokes: 12.04 } },
  { id: "chira", name: "CHIRA_JUNIOR", team: "", role: "mid", stats: { gpm: 1193, deaths: 1227, creeps: 1034, madstones: 369, kills: 763, towers: 429, teamfight: 1429, stuns: 393, tormentor: 474, wards: 198.18, stacks: 382.04, watchers: 282.00, runes: 1211.45, smokes: 0 } },
  { id: "rcy", name: "RCY", team: "", role: "mid", stats: { gpm: 1236, deaths: 1270, creeps: 1170, madstones: 407, kills: 867, towers: 362, teamfight: 1488, stuns: 295, tormentor: 367, wards: 234.00, stacks: 278.27, watchers: 369.49, runes: 1261.38, smokes: 23.76 } },
  { id: "nts", name: "NothingToSay", team: "", role: "mid", stats: { gpm: 1154, deaths: 1178, creeps: 1159, madstones: 462, kills: 673, towers: 176, teamfight: 1539, stuns: 363, tormentor: 473, wards: 184.42, stacks: 475.93, watchers: 368.75, runes: 1484.08, smokes: 4.97 } },
  { id: "mirage", name: "Mirage`", team: "", role: "mid", stats: { gpm: 1159, deaths: 1112, creeps: 1001, madstones: 397, kills: 767, towers: 194, teamfight: 1517, stuns: 344, tormentor: 220 } },
  { id: "yopaj", name: "Yopaj", team: "", role: "mid", stats: { gpm: 1080, deaths: 1224, creeps: 967, madstones: 453, kills: 734, towers: 281, teamfight: 1557, stuns: 324, tormentor: 312, wards: 239.09, stacks: 396.78, watchers: 191.74, runes: 1158.65, smokes: 12.74 } },

  { id: "thiolicor-kj", name: "Thiolicor & KJ", team: "", role: "support", stats: { wards: 2260, stacks: 2349, lotuses: 1755, watchers: 2418, runes: 1403, smokes: 2016, teamfight: 2719, stuns: 852, tormentor: 760, roshan: 149, firstBlood: 334, courier: 1042 } },
  { id: "saksa-malady", name: "Saksa & Malady", team: "", role: "support", stats: { wards: 2012, stacks: 2038, lotuses: 1365, watchers: 1850, runes: 1013, smokes: 1704, teamfight: 2859, stuns: 766, tormentor: 904, roshan: 116, firstBlood: 507, courier: 808 } },
  { id: "tims-skem", name: "Tims & skem", team: "", role: "support", stats: { wards: 1962, stacks: 2334, lotuses: 1468, watchers: 1961, runes: 832, smokes: 1966, teamfight: 2836, stuns: 703, tormentor: 678, roshan: 134, firstBlood: 294, courier: 587 } },
  { id: "cr1t-sneyking", name: "Cr1t- & Sneyking", team: "", role: "support", stats: { wards: 2166, stacks: 1914, lotuses: 1350, watchers: 1779, runes: 957, smokes: 1904, teamfight: 2686, stuns: 749, tormentor: 1066, roshan: 195, firstBlood: 335, courier: 647 } },
  { id: "fy-xnova", name: "fy & xNova", team: "", role: "support", stats: { wards: 2202, stacks: 1896, lotuses: 1212, watchers: 1940, runes: 844, smokes: 2013, teamfight: 2863, stuns: 756, tormentor: 800, roshan: 106, firstBlood: 496, courier: 532 } },
  { id: "ari-whitemon", name: "Ari & Whitemon", team: "", role: "support", stats: { wards: 2133, stacks: 1869, lotuses: 1176, watchers: 1915, runes: 740, smokes: 1728, teamfight: 2818, stuns: 904, tormentor: 868, roshan: 64, firstBlood: 574, courier: 495 } },
  { id: "mira-kaori", name: "Mira & kaori", team: "", role: "support", stats: { wards: 2002, stacks: 1589, lotuses: 1190, watchers: 1706, runes: 793, smokes: 1858, teamfight: 2763, stuns: 951, tormentor: 932, roshan: 104, firstBlood: 484, courier: 655 } },
  { id: "omar-gh", name: "OmaR & GH", team: "", role: "support", stats: { wards: 1989, stacks: 1508, lotuses: 1359, watchers: 1851, runes: 695, smokes: 1896, teamfight: 2754, stuns: 831, tormentor: 971, roshan: 122, firstBlood: 504, courier: 532 } },
  { id: "boxi-tofu", name: "Boxi & tofu", team: "", role: "support", stats: { wards: 2069, stacks: 1766, lotuses: 1163, watchers: 1618, runes: 631, smokes: 1843, teamfight: 2900, stuns: 726, tormentor: 1128, roshan: 96, firstBlood: 458, courier: 591 } },
  { id: "rue-notme", name: "rue & not me", team: "", role: "support", stats: { wards: 2174, stacks: 1895, lotuses: 1515, watchers: 1382, runes: 659, smokes: 1729, teamfight: 2881, stuns: 1018, tormentor: 697, roshan: 70, firstBlood: 400, courier: 458 } },
  { id: "xinq-y", name: "XinQ & y`", team: "", role: "support", stats: { wards: 2134, stacks: 1465, lotuses: 1109, watchers: 2316, runes: 853, smokes: 1813, teamfight: 2922, stuns: 675, tormentor: 693, roshan: 51, firstBlood: 288, courier: 459 } },
  { id: "9class-dukalis", name: "9Class & Dukalis", team: "", role: "support", stats: { wards: 2039, stacks: 1611, lotuses: 1224, watchers: 1228, runes: 768, smokes: 1841, teamfight: 2777, stuns: 637, tormentor: 831, roshan: 91, firstBlood: 396, courier: 537 } },
  { id: "planet-zzq", name: "planet & zzq", team: "", role: "support", stats: { wards: 1881, stacks: 1841, lotuses: 987, watchers: 1293, runes: 690, smokes: 1887, teamfight: 2981, stuns: 547, tormentor: 1010, roshan: 73, firstBlood: 60, courier: 701 } },
  { id: "save-kataomi", name: "Save- & Kataomi", team: "", role: "support", stats: { wards: 2190, stacks: 1240, lotuses: 909, watchers: 1317, runes: 729, smokes: 1965, teamfight: 2840, stuns: 862, tormentor: 863, roshan: 124, firstBlood: 504, courier: 380 } },
  { id: "bignum-speeed", name: "Bignum & Speeed", team: "", role: "support", stats: { wards: 1904, stacks: 1681, lotuses: 870, watchers: 1129, runes: 758, smokes: 2014, teamfight: 2809, stuns: 790, tormentor: 751, roshan: 91, firstBlood: 432, courier: 505 } },
  { id: "sayuw-respect", name: "sayuw & RESPECT", team: "", role: "support", stats: { wards: 1894, stacks: 1449, lotuses: 1034, watchers: 1255, runes: 730, smokes: 1839, teamfight: 2866, stuns: 690, tormentor: 472, roshan: 18, firstBlood: 569, courier: 477 } }
];

export const roleStats: Record<Role, StatKey[]> = {
  core: ["creeps", "gpm", "deaths", "towers", "kills", "madstones", "roshan", "teamfight", "tormentor", "stuns", "courier", "firstBlood"],
  // Mid lotuses remain unavailable because the source explicitly reports no data for that stat.
  mid: ["creeps", "gpm", "deaths", "kills", "madstones", "towers", "wards", "stacks", "watchers", "runes", "smokes", "teamfight", "stuns", "tormentor", "roshan", "firstBlood", "courier"],
  support: ["wards", "smokes", "stacks", "watchers", "lotuses", "runes", "teamfight", "tormentor", "courier", "firstBlood", "roshan", "stuns"]
};