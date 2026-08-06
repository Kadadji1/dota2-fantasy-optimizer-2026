"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const categories = ["4-0", "4-1", "advancing", "eliminated", "1-4", "0-4"] as const;
type Category = (typeof categories)[number];
type Bracket = Record<Category, string[]>;

type TeamOdds = {
  team: string;
  odds: Record<Category, number>;
  playoffs: number;
};

const labels: Record<Category, string> = {
  "4-0": "Undefeated · 4–0",
  "4-1": "One loss · 4–1",
  advancing: "Advancing",
  eliminated: "Eliminated",
  "1-4": "One win · 1–4",
  "0-4": "Winless · 0–4"
};

const capacities: Record<Category, number> = {
  "4-0": 1,
  "4-1": 2,
  advancing: 5,
  eliminated: 5,
  "1-4": 2,
  "0-4": 1
};

const teams: TeamOdds[] = [
  { team: "TEAM VISION", odds: { "4-0": 26, "4-1": 30, advancing: 30, eliminated: 12, "1-4": 1.4, "0-4": 0.4 }, playoffs: 86 },
  { team: "Team Yandex", odds: { "4-0": 14, "4-1": 31, advancing: 34, eliminated: 17, "1-4": 2.7, "0-4": 0.7 }, playoffs: 79 },
  { team: "Team Falcons", odds: { "4-0": 11, "4-1": 20, advancing: 44, eliminated: 21, "1-4": 3.7, "0-4": 1.2 }, playoffs: 75 },
  { team: "BoomBoys", odds: { "4-0": 10, "4-1": 24, advancing: 39, eliminated: 21, "1-4": 4.1, "0-4": 1.1 }, playoffs: 73 },
  { team: "Team Spirit", odds: { "4-0": 8.0, "4-1": 15, advancing: 46, eliminated: 25, "1-4": 5.4, "0-4": 1.5 }, playoffs: 69 },
  { team: "Aurora Gaming", odds: { "4-0": 6.5, "4-1": 15, advancing: 43, eliminated: 29, "1-4": 5.3, "0-4": 1.5 }, playoffs: 65 },
  { team: "Team Liquid", odds: { "4-0": 5.3, "4-1": 12, advancing: 45, eliminated: 29, "1-4": 6.4, "0-4": 2.0 }, playoffs: 62 },
  { team: "Iron Wing", odds: { "4-0": 4.8, "4-1": 11, advancing: 42, eliminated: 33, "1-4": 6.8, "0-4": 2.2 }, playoffs: 58 },
  { team: "Xtreme Gaming", odds: { "4-0": 3.4, "4-1": 9.2, advancing: 33, eliminated: 42, "1-4": 9.4, "0-4": 3.3 }, playoffs: 46 },
  { team: "Vici Gaming", odds: { "4-0": 3.2, "4-1": 11, advancing: 37, eliminated: 35, "1-4": 10, "0-4": 3.7 }, playoffs: 51 },
  { team: "LGD Gaming", odds: { "4-0": 2.5, "4-1": 6.8, advancing: 27, eliminated: 43, "1-4": 15, "0-4": 4.7 }, playoffs: 36 },
  { team: "Team Resilience", odds: { "4-0": 2.1, "4-1": 5.2, advancing: 22, eliminated: 39, "1-4": 19, "0-4": 14 }, playoffs: 29 },
  { team: "Nigma Galaxy", odds: { "4-0": 1.4, "4-1": 4.4, advancing: 21, eliminated: 43, "1-4": 22, "0-4": 7.4 }, playoffs: 27 },
  { team: "GamerLegion", odds: { "4-0": 0.9, "4-1": 2.6, advancing: 17, eliminated: 36, "1-4": 31, "0-4": 12 }, playoffs: 21 },
  { team: "OG", odds: { "4-0": 0.5, "4-1": 2.0, advancing: 13, eliminated: 45, "1-4": 26, "0-4": 14 }, playoffs: 15.5 },
  { team: "HULIGANI", odds: { "4-0": 0.2, "4-1": 0.7, advancing: 7.5, eliminated: 30, "1-4": 31, "0-4": 31 }, playoffs: 8.4 }
];

const recommended: Bracket = {
  "4-0": ["TEAM VISION"],
  "4-1": ["Team Yandex", "BoomBoys"],
  advancing: ["Team Falcons", "Team Spirit", "Team Liquid", "Aurora Gaming", "Iron Wing"],
  eliminated: ["Xtreme Gaming", "Vici Gaming", "LGD Gaming", "Team Resilience", "Nigma Galaxy"],
  "1-4": ["GamerLegion", "OG"],
  "0-4": ["HULIGANI"]
};

const byName = new Map(teams.map((team) => [team.team, team]));

function cloneBracket(bracket: Bracket): Bracket {
  return Object.fromEntries(categories.map((category) => [category, [...bracket[category]]])) as Bracket;
}

function formatPercent(value: number) {
  return `${value.toFixed(value < 10 && value % 1 !== 0 ? 1 : 0)}%`;
}

export default function Predictions() {
  const [bracket, setBracket] = useState<Bracket>(() => cloneBracket(recommended));

  const selectionScore = useMemo(
    () => categories.reduce((sum, category) => sum + bracket[category].reduce((slotSum, team) => slotSum + (byName.get(team)?.odds[category] ?? 0), 0), 0),
    [bracket]
  );

  const recommendedScore = useMemo(
    () => categories.reduce((sum, category) => sum + recommended[category].reduce((slotSum, team) => slotSum + (byName.get(team)?.odds[category] ?? 0), 0), 0),
    []
  );

  function moveTeam(targetCategory: Category, targetIndex: number, selectedTeam: string) {
    setBracket((current) => {
      const next = cloneBracket(current);
      const currentTeam = next[targetCategory][targetIndex];
      let sourceCategory: Category | null = null;
      let sourceIndex = -1;

      for (const category of categories) {
        const index = next[category].indexOf(selectedTeam);
        if (index !== -1) {
          sourceCategory = category;
          sourceIndex = index;
          break;
        }
      }

      if (!sourceCategory || selectedTeam === currentTeam) return current;
      next[targetCategory][targetIndex] = selectedTeam;
      next[sourceCategory][sourceIndex] = currentTeam;
      return next;
    });
  }

  return (
    <main className="site-shell predictions-page">
      <header className="topbar predictions-topbar">
        <Link href="/" className="brand"><span className="brand-mark">TI</span><span>TI2026 CALCULATOR</span></Link>
        <nav className="page-tabs" aria-label="Primary navigation">
          <Link href="/">Fantasy Calculator</Link>
          <Link href="/predictions" className="active">Predictions</Link>
          <a href="/#rules">Guide</a>
        </nav>
      </header>

      <section className="predictions-hero">
        <div>
          <span className="eyebrow">THE INTERNATIONAL 2026</span>
          <h1>Group Stage Predictions</h1>
          <p>Use the recommended bracket or swap teams between slots. Every card shows the model probability for that exact finish.</p>
        </div>
        <div className="prediction-summary-card">
          <span>Selection confidence</span>
          <strong>{selectionScore.toFixed(1)}</strong>
          <small>{selectionScore >= recommendedScore ? "Matches the recommended bracket" : `${(recommendedScore - selectionScore).toFixed(1)} points below recommended confidence`}</small>
        </div>
      </section>

      <section className="section prediction-controls">
        <div className="section-title">
          <div><span className="eyebrow">INTERACTIVE BRACKET</span><h2>Your predictions</h2></div>
          <button className="ghost-button" onClick={() => setBracket(cloneBracket(recommended))}>Use recommended</button>
        </div>
        <p className="prediction-note">The team you pick swaps places with the one currently in that slot, so the bracket always stays complete.</p>

        <div className="prediction-grid">
          {categories.map((category) => (
            <article className="prediction-column" key={category}>
              <div className="prediction-column-header">
                <h3>{labels[category]}</h3>
                <span>{capacities[category]} {capacities[category] === 1 ? "slot" : "slots"}</span>
              </div>
              <div className="prediction-slot-list">
                {bracket[category].map((teamName, index) => {
                  const team = byName.get(teamName)!;
                  return (
                    <label className="prediction-slot" key={`${category}-${index}`}>
                      <span className="prediction-slot-meta"><b>{formatPercent(team.odds[category])}</b><small>in this slot</small></span>
                      <select value={teamName} onChange={(event) => moveTeam(category, index, event.target.value)}>
                        {teams
                          .slice()
                          .sort((a, b) => b.odds[category] - a.odds[category])
                          .map((option) => <option key={option.team} value={option.team}>{option.team} · {formatPercent(option.odds[category])}</option>)}
                      </select>
                    </label>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <div><span className="eyebrow">PROBABILITY OF EVERY SLOT</span><h2>Team odds</h2></div>
          <p>Each row is the model distribution for one team. Playoffs equals 4–0, 4–1 and Advancing combined.</p>
        </div>
        <div className="odds-table-wrap">
          <table className="odds-table">
            <thead><tr><th>Team</th>{categories.map((category) => <th key={category}>{category === "advancing" ? "Advancing" : category === "eliminated" ? "Eliminated" : category}</th>)}<th>Playoffs</th></tr></thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.team}>
                  <th>{team.team}</th>
                  {categories.map((category) => <td key={category}>{formatPercent(team.odds[category])}</td>)}
                  <td className="playoffs-cell">{formatPercent(team.playoffs)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section prediction-methodology">
        <div className="section-title"><div><span className="eyebrow">METHODOLOGY</span><h2>How to read this page</h2></div></div>
        <div className="methodology">
          <ul>
            <li>The percentages are the current balanced-model probabilities for each exact group-stage finish.</li>
            <li>Changing a slot does not change the underlying team probabilities; it only lets you compare your bracket with the model recommendation.</li>
            <li>The confidence number is a transparent comparison of the selected slot probabilities, not guaranteed Compendium points.</li>
            <li>The page will be updated as the model receives newer tournament and TI data.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
