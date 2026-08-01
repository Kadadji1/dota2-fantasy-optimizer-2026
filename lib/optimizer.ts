import { Player, Role, StatKey } from "../data/players";
import { Tier, Trait, tierBonuses } from "../data/rules";

export type EmblemInput = {
  stat: StatKey;
  tier: Tier;
  trait: Trait;
};

export type ScoreContribution = {
  stat: StatKey;
  tier: Tier;
  trait: Trait;
  baseValue: number;
  tierBonus: number;
  traitFactor: number;
  factor: number;
  weightedValue: number;
};

function isAdjacent(a: number, b: number): boolean {
  return Math.abs(a - b) === 1;
}

export function getTraitFactors(emblems: EmblemInput[]): number[] {
  const factors = emblems.map(() => 1);
  const allTiersDifferent = new Set(emblems.map((item) => item.tier)).size === emblems.length;
  const uniqueCount = emblems.filter((item) => item.trait === "unique").length;
  const friendlyCount = emblems.filter((item) => item.trait === "friendly").length;

  emblems.forEach((emblem, index) => {
    if (emblem.trait === "fractal" && allTiersDifferent) factors[index] *= 1.6;
    if (emblem.trait === "unique" && uniqueCount === 1) factors[index] *= 1.3;
    if (emblem.trait === "friendly" && friendlyCount >= 3) factors[index] *= 1.5;

    if (emblem.trait === "benevolent") {
      emblems.forEach((_, targetIndex) => {
        if (isAdjacent(index, targetIndex)) factors[targetIndex] *= 1.2;
      });
    }

    if (emblem.trait === "vampiric") {
      factors[index] *= 1.5;
      emblems.forEach((_, targetIndex) => {
        if (isAdjacent(index, targetIndex)) factors[targetIndex] *= 0.9;
      });
    }
  });

  return factors;
}

export function getScoreContributions(player: Player, emblems: EmblemInput[]): ScoreContribution[] {
  const traitFactors = getTraitFactors(emblems);

  return emblems.map((emblem, index) => {
    const baseValue = player.stats[emblem.stat] ?? 0;
    const tierBonus = tierBonuses[emblem.tier];
    const tierFactor = 1 + tierBonus / 100;
    const traitFactor = traitFactors[index];
    const factor = tierFactor * traitFactor;

    return {
      stat: emblem.stat,
      tier: emblem.tier,
      trait: emblem.trait,
      baseValue,
      tierBonus,
      traitFactor,
      factor,
      weightedValue: baseValue * factor
    };
  });
}

export function calculatePlayerScore(player: Player, emblems: EmblemInput[]): number {
  return getScoreContributions(player, emblems).reduce((sum, item) => sum + item.weightedValue, 0);
}

export function rankPlayers(players: Player[], role: Role, emblems: EmblemInput[]) {
  return players
    .filter((player) => player.role === role)
    .map((player) => ({
      player,
      score: calculatePlayerScore(player, emblems),
      contributions: getScoreContributions(player, emblems)
    }))
    .sort((a, b) => b.score - a.score);
}
