import { Player, Role, StatKey } from "../data/players";

export type EmblemInput = { stat: StatKey; multiplier: number };

export function calculatePlayerScore(player: Player, emblems: EmblemInput[]): number {
  return emblems.reduce((total, emblem) => {
    const value = player.stats[emblem.stat] ?? 0;
    return total + value * emblem.multiplier;
  }, 0);
}

export function rankPlayers(players: Player[], role: Role, emblems: EmblemInput[]) {
  return players
    .filter((player) => player.role === role)
    .map((player) => ({ player, score: calculatePlayerScore(player, emblems) }))
    .sort((a, b) => b.score - a.score);
}
