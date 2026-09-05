import { describe, expect, it } from "vitest";
import type { Player } from "../../data/players";
import type { EmblemInput } from "../../lib/optimizer";
import { calculatePlayerScore, getScoreContributions, getTraitFactors, rankPlayers } from "../../lib/optimizer";

const player: Player = {
  id: "test-player",
  name: "Test Player",
  team: "Test Team",
  role: "mid",
  stats: { kills: 100, gpm: 200, creeps: 300, towers: 400, madstones: 500 }
};

const baseEmblems: EmblemInput[] = [
  { stat: "kills", tier: "I", trait: "none" },
  { stat: "gpm", tier: "II", trait: "none" },
  { stat: "creeps", tier: "III", trait: "none" },
  { stat: "towers", tier: "IV", trait: "none" },
  { stat: "madstones", tier: "V", trait: "none" }
];

describe("Fantasy score calculation", () => {
  it("applies the tier multiplier to every emblem contribution", () => {
    const contributions = getScoreContributions(player, baseEmblems);

    expect(contributions.map((item) => item.weightedValue)).toEqual([
      expect.closeTo(110),
      expect.closeTo(260),
      expect.closeTo(480),
      expect.closeTo(800),
      expect.closeTo(1250)
    ]);
    expect(calculatePlayerScore(player, baseEmblems)).toBe(2900);
  });

  it("applies Fractal only when all five emblem tiers differ", () => {
    const fractalEmblems = baseEmblems.map((emblem, index) =>
      index === 0 ? { ...emblem, trait: "fractal" as const } : emblem
    );

    expect(getTraitFactors(fractalEmblems)[0]).toBeCloseTo(1.6);
    expect(getScoreContributions(player, fractalEmblems)[0].weightedValue).toBeCloseTo(176);
  });

  it("combines adjacent Benevolent and Vampiric effects predictably", () => {
    const emblems = [
      { stat: "kills", tier: "I", trait: "none" },
      { stat: "gpm", tier: "I", trait: "vampiric" },
      { stat: "creeps", tier: "I", trait: "none" },
      { stat: "towers", tier: "I", trait: "benevolent" },
      { stat: "madstones", tier: "I", trait: "none" }
    ] as EmblemInput[];

    expect(getTraitFactors(emblems)).toEqual([0.9, 1.5, 1.08, 1, 1.2]);
  });

  it("uses zero instead of an invalid score when source data is missing", () => {
    const score = calculatePlayerScore(
      { ...player, stats: {} },
      [{ stat: "kills", tier: "III", trait: "none" }]
    );

    expect(score).toBe(0);
  });

  it("ranks only the requested role from highest score to lowest", () => {
    const higherScore: Player = { ...player, id: "higher", name: "Higher", stats: { kills: 200 } };
    const lowerScore: Player = { ...player, id: "lower", name: "Lower", stats: { kills: 50 } };
    const wrongRole: Player = { ...player, id: "core", role: "core", stats: { kills: 1000 } };
    const emblems: EmblemInput[] = [{ stat: "kills", tier: "I", trait: "none" }];

    expect(rankPlayers([lowerScore, wrongRole, higherScore], "mid", emblems).map((entry) => entry.player.id)).toEqual([
      "higher",
      "lower"
    ]);
  });
});
