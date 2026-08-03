import { Role, StatKey, roleStats } from "../data/players";
import { Tier, Trait, bannerSlotColors, statColors, tierBonuses, traitDescriptions } from "../data/rules";
import { EmblemInput } from "./optimizer";

export type BannerState = Record<Role, EmblemInput[]>;

/** Bump the version suffix whenever the stored shape changes so stale entries are ignored. */
export const BANNER_STORAGE_KEY = "dota2-fantasy-2026.banners.v1";

const roles: Role[] = ["core", "mid", "support"];

export const defaultBanners: BannerState = {
  core:[{stat:"creeps",tier:"III",trait:"none"},{stat:"teamfight",tier:"III",trait:"none"},{stat:"gpm",tier:"III",trait:"none"}],
  mid:[{stat:"kills",tier:"III",trait:"none"},{stat:"runes",tier:"III",trait:"none"},{stat:"teamfight",tier:"III",trait:"none"}],
  support:[{stat:"wards",tier:"III",trait:"none"},{stat:"teamfight",tier:"III",trait:"none"},{stat:"stacks",tier:"III",trait:"none"}]
};

export function cloneBanners(state: BannerState): BannerState {
  return roles.reduce((acc, role) => {
    acc[role] = state[role].map((emblem) => ({ ...emblem }));
    return acc;
  }, {} as BannerState);
}

/** Stats a given banner slot may hold: the role's stats restricted to that slot's colour. */
export function slotStats(role: Role, index: number): StatKey[] {
  const color = bannerSlotColors[role][index];
  return roleStats[role].filter((stat) => statColors[stat] === color);
}

function normalizeStat(role: Role, index: number, value: unknown): StatKey | null {
  if (typeof value !== "string") return null;
  return slotStats(role, index).includes(value as StatKey) ? (value as StatKey) : null;
}

function normalizeTier(value: unknown): Tier | null {
  if (typeof value !== "string") return null;
  const key = value.trim().split(/\s+/)[0] as Tier;
  return Object.prototype.hasOwnProperty.call(tierBonuses, key) ? key : null;
}

function normalizeTrait(value: unknown): Trait | null {
  if (typeof value !== "string") return null;
  return Object.prototype.hasOwnProperty.call(traitDescriptions, value) ? (value as Trait) : null;
}

function normalizeEmblem(role: Role, index: number, value: unknown): EmblemInput {
  const fallback = defaultBanners[role][index];
  if (!value || typeof value !== "object") return { ...fallback };
  const raw = value as Partial<EmblemInput>;
  return {
    stat: normalizeStat(role, index, raw.stat) ?? fallback.stat,
    tier: normalizeTier(raw.tier) ?? fallback.tier,
    trait: normalizeTrait(raw.trait) ?? fallback.trait
  };
}

/**
 * Rebuilds a full banner state from untrusted input. Anything missing or no longer
 * valid (renamed stat, stat that does not fit the slot colour, unknown tier/trait)
 * falls back to that slot's default instead of discarding the whole saved banner.
 */
export function normalizeBanners(value: unknown): BannerState {
  const raw = (value && typeof value === "object" ? value : {}) as Partial<Record<Role, unknown>>;
  return roles.reduce((acc, role) => {
    const stored = Array.isArray(raw[role]) ? (raw[role] as unknown[]) : [];
    acc[role] = defaultBanners[role].map((_, index) => normalizeEmblem(role, index, stored[index]));
    return acc;
  }, {} as BannerState);
}

export function loadBanners(): BannerState {
  if (typeof window === "undefined") return cloneBanners(defaultBanners);
  try {
    const stored = window.localStorage.getItem(BANNER_STORAGE_KEY);
    if (!stored) return cloneBanners(defaultBanners);
    return normalizeBanners(JSON.parse(stored));
  } catch {
    return cloneBanners(defaultBanners);
  }
}

export function saveBanners(state: BannerState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(BANNER_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage can be unavailable (private mode, quota, blocked cookies) — persistence is best effort.
  }
}
