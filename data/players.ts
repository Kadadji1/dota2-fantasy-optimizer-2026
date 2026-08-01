export type Role = "core" | "mid" | "support";
export type StatKey = "gpm" | "deaths" | "creeps" | "kills" | "towers" | "teamfight" | "stuns" | "wards" | "runes" | "lotuses";

export type Player = {
  id: string;
  name: string;
  team: string;
  role: Role;
  stats: Partial<Record<StatKey, number>>;
};

// MVP seed data. Replace with the full dataset extracted from screenshots/API.
export const players: Player[] = [
  { id: "yatoro", name: "Yatoro", team: "Team Spirit", role: "core", stats: { gpm: 86, deaths: 93, creeps: 95, kills: 82, towers: 66, teamfight: 76 } },
  { id: "satanic", name: "Satanic", team: "PARIVISION", role: "core", stats: { gpm: 90, deaths: 88, creeps: 92, kills: 87, towers: 70, teamfight: 78 } },
  { id: "watson", name: "watson", team: "Gaimin Gladiators", role: "core", stats: { gpm: 92, deaths: 84, creeps: 94, kills: 81, towers: 73, teamfight: 75 } },
  { id: "nisha", name: "Nisha", team: "Team Liquid", role: "mid", stats: { gpm: 88, deaths: 87, creeps: 90, kills: 91, teamfight: 92, runes: 89, lotuses: 44 } },
  { id: "gpk", name: "gpk", team: "BetBoom Team", role: "mid", stats: { gpm: 91, deaths: 82, creeps: 89, kills: 93, teamfight: 88, runes: 86, lotuses: 42 } },
  { id: "lorenof", name: "Lorenof", team: "Aurora", role: "mid", stats: { gpm: 84, deaths: 90, creeps: 86, kills: 85, teamfight: 94, runes: 80, lotuses: 48 } },
  { id: "miposhka", name: "Miposhka", team: "Team Spirit", role: "support", stats: { deaths: 91, teamfight: 94, stuns: 88, wards: 96, runes: 72 } },
  { id: "xinq", name: "XinQ", team: "Xtreme Gaming", role: "support", stats: { deaths: 84, teamfight: 96, stuns: 92, wards: 81, runes: 78 } },
  { id: "saksa", name: "Saksa", team: "Tundra", role: "support", stats: { deaths: 88, teamfight: 92, stuns: 94, wards: 86, runes: 75 } }
];

export const roleStats: Record<Role, StatKey[]> = {
  core: ["creeps", "deaths", "gpm", "kills", "towers", "teamfight"],
  mid: ["gpm", "deaths", "creeps", "kills", "teamfight", "runes", "lotuses"],
  support: ["teamfight", "wards", "stuns", "deaths", "runes"]
};
