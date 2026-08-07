"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const categories = ["4-0", "4-1", "advancing", "eliminated", "1-4", "0-4"] as const;
type Category = (typeof categories)[number];
type Bracket = Record<Category, string[]>;
type TeamOdds = {
  team: string;
  rating: number;
  uncertainty: number;
  odds: Record<Category, number>;
  playoffs: number;
};

const labels: Record<Category, { title: string; subtitle: string }> = {
  "4-0": { title: "4–0", subtitle: "Undefeated" },
  "4-1": { title: "4–1", subtitle: "One loss" },
  advancing: { title: "ADVANCING", subtitle: "Five out of the elimination round" },
  eliminated: { title: "ELIMINATED", subtitle: "Five losers of the round" },
  "1-4": { title: "1–4", subtitle: "One win" },
  "0-4": { title: "0–4", subtitle: "Winless" }
};

const teams: TeamOdds[] = [
  { team: "TEAM VISION", rating: 1791, uncertainty: 23, odds: { "4-0": 26, "4-1": 30, advancing: 30, eliminated: 12, "1-4": 1.4, "0-4": 0.4 }, playoffs: 86 },
  { team: "Team Yandex", rating: 1763, uncertainty: 26, odds: { "4-0": 14, "4-1": 31, advancing: 34, eliminated: 17, "1-4": 2.7, "0-4": 0.7 }, playoffs: 79 },
  { team: "Team Falcons", rating: 1752, uncertainty: 23, odds: { "4-0": 11, "4-1": 20, advancing: 44, eliminated: 21, "1-4": 3.7, "0-4": 1.2 }, playoffs: 74 },
  { team: "BoomBoys", rating: 1742, uncertainty: 22, odds: { "4-0": 10, "4-1": 24, advancing: 39, eliminated: 21, "1-4": 4.1, "0-4": 1.1 }, playoffs: 74 },
  { team: "Team Spirit", rating: 1727, uncertainty: 23, odds: { "4-0": 8, "4-1": 15, advancing: 46, eliminated: 25, "1-4": 5.4, "0-4": 1.5 }, playoffs: 68 },
  { team: "Aurora Gaming", rating: 1725, uncertainty: 22, odds: { "4-0": 6.5, "4-1": 15, advancing: 43, eliminated: 29, "1-4": 5.3, "0-4": 1.5 }, playoffs: 64 },
  { team: "Team Liquid", rating: 1712, uncertainty: 21, odds: { "4-0": 5.3, "4-1": 12, advancing: 45, eliminated: 29, "1-4": 6.4, "0-4": 2 }, playoffs: 63 },
  { team: "Iron Wing", rating: 1705, uncertainty: 21, odds: { "4-0": 4.8, "4-1": 11, advancing: 42, eliminated: 33, "1-4": 6.8, "0-4": 2.2 }, playoffs: 58 },
  { team: "Vici Gaming", rating: 1680, uncertainty: 30, odds: { "4-0": 3.2, "4-1": 11, advancing: 37, eliminated: 35, "1-4": 10, "0-4": 3.7 }, playoffs: 51 },
  { team: "Xtreme Gaming", rating: 1688, uncertainty: 23, odds: { "4-0": 3.4, "4-1": 9.2, advancing: 33, eliminated: 42, "1-4": 9.4, "0-4": 3.3 }, playoffs: 45 },
  { team: "LGD Gaming", rating: 1666, uncertainty: 23, odds: { "4-0": 2.5, "4-1": 6.8, advancing: 27, eliminated: 43, "1-4": 15, "0-4": 4.7 }, playoffs: 37 },
  { team: "Team Resilience", rating: 1643, uncertainty: 44, odds: { "4-0": 2.1, "4-1": 5.2, advancing: 22, eliminated: 39, "1-4": 19, "0-4": 14 }, playoffs: 29 },
  { team: "Nigma Galaxy", rating: 1638, uncertainty: 26, odds: { "4-0": 1.4, "4-1": 4.4, advancing: 21, eliminated: 43, "1-4": 22, "0-4": 7.4 }, playoffs: 27 },
  { team: "GamerLegion", rating: 1610, uncertainty: 31, odds: { "4-0": 0.9, "4-1": 2.6, advancing: 17, eliminated: 36, "1-4": 31, "0-4": 12 }, playoffs: 20 },
  { team: "OG", rating: 1595, uncertainty: 27, odds: { "4-0": 0.5, "4-1": 2, advancing: 13, eliminated: 45, "1-4": 26, "0-4": 14 }, playoffs: 16 },
  { team: "HULIGANI", rating: 1551, uncertainty: 31, odds: { "4-0": 0.2, "4-1": 0.7, advancing: 7.5, eliminated: 30, "1-4": 31, "0-4": 31 }, playoffs: 8.4 }
];

const recommended: Bracket = {
  "4-0": ["TEAM VISION"],
  "4-1": ["Team Yandex", "BoomBoys"],
  advancing: ["Team Falcons", "Team Spirit", "Team Liquid", "Aurora Gaming", "Iron Wing"],
  eliminated: ["LGD Gaming", "Xtreme Gaming", "Nigma Galaxy", "Vici Gaming", "Team Resilience"],
  "1-4": ["GamerLegion", "OG"],
  "0-4": ["HULIGANI"]
};

const BASE_EXPECTED_POINTS = 1122;
const BASE_CORRECT_SLOTS = 5.4;
const byName = new Map(teams.map((team) => [team.team, team]));
const cloneBracket = (bracket: Bracket) => Object.fromEntries(categories.map((category) => [category, [...bracket[category]]])) as Bracket;
const formatPercent = (value: number) => `${value.toFixed(value < 10 && value % 1 !== 0 ? 1 : 0)}%`;

function TeamLogo({ team, size = "lg" }: { team: string; size?: "sm" | "lg" }) {
  return <span className={`team-logo team-logo-${size} prediction-team-logo`} title={team} role="img" aria-label={team} />;
}

export default function Predictions() {
  const [bracket, setBracket] = useState<Bracket>(() => cloneBracket(recommended));
  const selectionScore = useMemo(() => categories.reduce((sum, category) => sum + bracket[category].reduce((inner, team) => inner + (byName.get(team)?.odds[category] ?? 0), 0), 0), [bracket]);
  const recommendedScore = useMemo(() => categories.reduce((sum, category) => sum + recommended[category].reduce((inner, team) => inner + (byName.get(team)?.odds[category] ?? 0), 0), []);
  const selectedCategory = useMemo(() => {
    const map = new Map<string, Category>();
    categories.forEach((category) => bracket[category].forEach((team) => map.set(team, category)));
    return map;
  }, [bracket]);

  const isRecommended = Math.abs(selectionScore - recommendedScore) < 0.001;
  const scoreRatio = recommendedScore > 0 ? selectionScore / recommendedScore : 1;
  const expectedPoints = Math.max(0, Math.round(BASE_EXPECTED_POINTS * scoreRatio));
  const expectedCorrectSlots = Math.max(0, Math.min(16, BASE_CORRECT_SLOTS * scoreRatio));

  function moveTeam(targetCategory: Category, targetIndex: number, selectedTeam: string) {
    setBracket((current) => {
      const next = cloneBracket(current);
      const currentTeam = next[targetCategory][targetIndex];
      let sourceCategory: Category | null = null;
      let sourceIndex = -1;
      for (const category of categories) {
        const index = next[category].indexOf(selectedTeam);
        if (index !== -1) { sourceCategory = category; sourceIndex = index; break; }
      }
      if (!sourceCategory || selectedTeam === currentTeam) return current;
      next[targetCategory][targetIndex] = selectedTeam;
      next[sourceCategory][sourceIndex] = currentTeam;
      return next;
    });
  }

  const renderGroup = (category: Category) => (
    <section className={`prediction-group prediction-group-${category.replace("-", "")}`} key={category}>
      <div className="prediction-group-heading"><strong>{labels[category].title}</strong><span>{labels[category].subtitle}</span></div>
      <div className="prediction-card-row">
        {bracket[category].map((teamName, index) => {
          const team = byName.get(teamName)!;
          return (
            <label className={`prediction-team-card ${teamName === "TEAM VISION" ? "featured" : ""}`} key={`${category}-${index}`}>
              <TeamLogo team={teamName} />
              <span className="prediction-team-name">{teamName}</span>
              <strong>{formatPercent(team.odds[category])}</strong>
              <span className="prediction-probability-bar"><i style={{ width: `${Math.max(4, team.odds[category])}%` }} /></span>
              <select aria-label={`Choose team for ${labels[category].title}`} value={teamName} onChange={(event) => moveTeam(category, index, event.target.value)}>
                {teams.slice().sort((a, b) => b.odds[category] - a.odds[category]).map((option) => <option key={option.team} value={option.team}>{option.team} · {formatPercent(option.odds[category])}</option>)}
              </select>
            </label>
          );
        })}
      </div>
    </section>
  );

  return (
    <main className="site-shell predictions-page">
      <header className="topbar predictions-topbar">
        <Link href="/" className="brand"><span className="brand-mark">TI</span><span>TI2026 CALCULATOR</span></Link>
        <nav className="page-tabs primary-page-tabs" aria-label="Primary navigation"><Link href="/">Fantasy Calculator</Link><Link href="/predictions" className="active">Predictions</Link><Link href="/guide">Guide</Link></nav>
      </header>

      <section className="predictions-hero compact-predictions-hero"><div><span className="eyebrow">THE INTERNATIONAL 2026</span><h1>Group Stage Predictions</h1><p>Swap any team and the bracket stays complete automatically.</p></div></section>

      <section className="section prediction-controls compact-prediction-section">
        <div className="predictions-layout">
          <div className="prediction-board">
            <div className="prediction-board-top">{renderGroup("4-0")}{renderGroup("4-1")}{renderGroup("advancing")}</div>
            <div className="prediction-board-bottom">{renderGroup("eliminated")}{renderGroup("1-4")}{renderGroup("0-4")}</div>
            <div className="prediction-board-actions"><button className="ghost-button" onClick={() => setBracket(cloneBracket(recommended))}>Use recommended</button><span>{isRecommended ? "This is the model bracket with the highest confidence." : `${(recommendedScore - selectionScore).toFixed(1)} confidence points below the model.`}</span></div>
          </div>

          <aside className="prediction-score-panel">
            <span className="eyebrow">EXPECTED POINTS</span><strong className="prediction-points">{expectedPoints.toLocaleString("en-US")}</strong><p>{isRecommended ? "average over 20,000 simulations · maximum possible 12,000" : "estimated from the selected slot probabilities"}</p>
            <div className="prediction-stat-grid"><div><span>Correct slots</span><b>{expectedCorrectSlots.toFixed(1)}</b></div><div><span>Typically</span><b>720+</b></div><div><span>On a good run</span><b>2,520</b></div></div>
            <h3>What you can reach</h3>
            {[["8 correct", "14%", "2,520", 14], ["10 correct", "2.4%", "4,320", 2.4], ["12 correct", "0.2%", "6,600", 0.2], ["16 correct", "never", "12,000", 0.1]].map(([label, chance, points, width]) => <div className="reach-row" key={label as string}><div><span>{label}</span><small>{chance}</small><b>{points}</b></div><i><em style={{ width: `${width}%` }} /></i></div>)}
            <h3>Outcome distribution</h3><div className="distribution-bars">{[2,5,14,32,56,78,84,72,48,23,9,3].map((height,index)=><i key={index} style={{height:`${height}%`}}><span>{index}</span></i>)}</div>
          </aside>
        </div>
      </section>

      <section className="section team-probability-cards-section" id="team-probability-cards">
        <div className="section-title"><div><span className="eyebrow">TEAM ODDS</span><h2>Probability of every slot</h2></div><p>The highlighted cell is the category currently selected for that team in your bracket.</p></div>
        <div className="team-probability-card-grid">
          {teams.map((team) => {
            const active = selectedCategory.get(team.team)!;
            return (
              <article className="team-probability-card" key={team.team}>
                <header>
                  <TeamLogo team={team.team} size="sm" />
                  <div><h3>{team.team}</h3><p>rating {team.rating} ± {team.uncertainty}</p></div>
                </header>
                <div className="team-probability-values">
                  {categories.map((category) => (
                    <div className={active === category ? "active" : ""} key={category}>
                      <span>{labels[category].title}</span>
                      <b>{formatPercent(team.odds[category])}</b>
                    </div>
                  ))}
                </div>
                <footer><strong>{formatPercent(team.playoffs)}</strong><span>chance to reach the playoffs</span><i><em style={{width:`${team.playoffs}%`}} /></i></footer>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" id="team-odds">
        <div className="section-title"><div><span className="eyebrow">COMPACT VIEW</span><h2>Team odds table</h2></div></div>
        <div className="odds-table-wrap"><table className="odds-table"><thead><tr><th>Team</th>{categories.map((category)=><th key={category}>{category}</th>)}<th>Playoffs</th></tr></thead><tbody>{teams.map((team)=><tr key={team.team}><th>{team.team}</th>{categories.map((category)=><td key={category}>{formatPercent(team.odds[category])}</td>)}<td className="playoffs-cell">{formatPercent(team.playoffs)}</td></tr>)}</tbody></table></div>
      </section>
    </main>
  );
}
