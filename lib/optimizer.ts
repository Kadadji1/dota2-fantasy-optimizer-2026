import { Player, Role, StatKey } from "../data/players";

export type EmblemInput = { stat: StatKey; percentage: number };

export type ScoreContribution = {
  stat: StatKey;
  baseValue: number;
  percentage: number;
  factor: number;
  weightedValue: number;
};

export function percentageToFactor(percentage: number): number {
  return 1 + Math.max(0, percentage) / 100;
}

export function calculatePlayerScore(player: Player, emblems: EmblemInput[]): number {
  return emblems.reduce((total, emblem) => {
    const value = player.stats[emblem.stat] ?? 0;
    return total + value * percentageToFactor(emblem.percentage);
  }, 0);
}

export function getScoreContributions(player: Player, emblems: EmblemInput[]): ScoreContribution[] {
  return emblems.map((emblem) => {
    const baseValue = player.stats[emblem.stat] ?? 0;
    const factor = percentageToFactor(emblem.percentage);
    return {
      stat: emblem.stat,
      baseValue,
      percentage: emblem.percentage,
      factor,
      weightedValue: baseValue * factor
    };
  });
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
