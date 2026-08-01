import { Player, Role, StatKey } from "../data/players";

export type EmblemInput = { stat: StatKey; multiplier: number };

export type ScoreContribution = {
  stat: StatKey;
  baseValue: number;
  multiplier: number;
  weightedValue: number;
};

export function calculatePlayerScore(player: Player, emblems: EmblemInput[]): number {
  return emblems.reduce((total, emblem) => {
    const value = player.stats[emblem.stat] ?? 0;
    return total + value * emblem.multiplier;
  }, 0);
}

export function getScoreContributions(player: Player, emblems: EmblemInput[]): ScoreContribution[] {
  return emblems.map((emblem) => {
    const baseValue = player.stats[emblem.stat] ?? 0;
    return {
      stat: emblem.stat,
      baseValue,
      multiplier: emblem.multiplier,
      weightedValue: baseValue * emblem.multiplier
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
