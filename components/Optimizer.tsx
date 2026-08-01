"use client";

import { useMemo, useState } from "react";
import { players, roleStats, Role, StatKey } from "../data/players";
import { rankPlayers } from "../lib/optimizer";

type Language = "en" | "ru";

const text = {
  en: {
    subtitle: "Build a roster around your actual banner multipliers",
    core: "Core",
    mid: "Mid",
    support: "Support",
    emblem: "Emblem",
    multiplier: "Multiplier",
    ranking: "Best players for this banner",
    score: "Projected score",
    note: "MVP uses normalized seed data. Full 2026 dataset will be added next."
  },
  ru: {
    subtitle: "Подбор игроков под реальные множители твоего баннера",
    core: "Керри",
    mid: "Мидер",
    support: "Саппорт",
    emblem: "Эмблема",
    multiplier: "Множитель",
    ranking: "Лучшие игроки под этот баннер",
    score: "Прогнозный результат",
    note: "MVP пока использует нормализованные тестовые данные. Полную базу 2026 добавим следующим шагом."
  }
};

const labels: Record<StatKey, { en: string; ru: string }> = {
  gpm: { en: "GPM", ru: "GPM" },
  deaths: { en: "Deaths", ru: "Смерти" },
  creeps: { en: "Creeps", ru: "Крипы" },
  kills: { en: "Kills", ru: "Убийства" },
  towers: { en: "Towers", ru: "Башни" },
  teamfight: { en: "Teamfight", ru: "Драки" },
  stuns: { en: "Stuns", ru: "Оглушения" },
  wards: { en: "Wards", ru: "Варды" },
  runes: { en: "Runes", ru: "Руны" },
  lotuses: { en: "Lotuses", ru: "Лотосы" }
};

export default function Optimizer() {
  const [language, setLanguage] = useState<Language>("en");
  const [role, setRole] = useState<Role>("core");
  const [emblems, setEmblems] = useState([
    { stat: "creeps" as StatKey, multiplier: 2.5 },
    { stat: "deaths" as StatKey, multiplier: 2.5 },
    { stat: "teamfight" as StatKey, multiplier: 1.9 }
  ]);

  const t = text[language];
  const ranking = useMemo(() => rankPlayers(players, role, emblems), [role, emblems]);

  function changeRole(nextRole: Role) {
    setRole(nextRole);
    const defaults = roleStats[nextRole].slice(0, 3);
    setEmblems(defaults.map((stat, index) => ({ stat, multiplier: index === 0 ? 2.5 : index === 1 ? 2.0 : 1.9 })));
  }

  return (
    <main className="shell">
      <header className="header">
        <div>
          <div className="eyebrow">THE INTERNATIONAL 2026</div>
          <h1>Dota 2 Fantasy Optimizer 2026</h1>
          <p>{t.subtitle}</p>
        </div>
        <div className="language-switch" aria-label="Language selector">
          <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
          <button className={language === "ru" ? "active" : ""} onClick={() => setLanguage("ru")}>RU</button>
        </div>
      </header>

      <section className="panel">
        <div className="role-tabs">
          {(["core", "mid", "support"] as Role[]).map((item) => (
            <button key={item} className={role === item ? "active" : ""} onClick={() => changeRole(item)}>{t[item]}</button>
          ))}
        </div>

        <div className="emblem-grid">
          {emblems.map((emblem, index) => (
            <article className="emblem-card" key={index}>
              <span>{t.emblem} {index + 1}</span>
              <select value={emblem.stat} onChange={(event) => {
                const next = [...emblems];
                next[index] = { ...next[index], stat: event.target.value as StatKey };
                setEmblems(next);
              }}>
                {roleStats[role].map((stat) => <option key={stat} value={stat}>{labels[stat][language]}</option>)}
              </select>
              <label>{t.multiplier}</label>
              <input type="number" min="0" max="3" step="0.1" value={emblem.multiplier} onChange={(event) => {
                const next = [...emblems];
                next[index] = { ...next[index], multiplier: Number(event.target.value) };
                setEmblems(next);
              }} />
            </article>
          ))}
        </div>
      </section>

      <section className="ranking-section">
        <div className="section-heading">
          <h2>{t.ranking}</h2>
          <span>{role.toUpperCase()}</span>
        </div>
        <div className="ranking-list">
          {ranking.map(({ player, score }, index) => (
            <article className="player-row" key={player.id}>
              <div className="place">{index + 1}</div>
              <div className="player-info"><strong>{player.name}</strong><span>{player.team}</span></div>
              <div className="score"><span>{t.score}</span><strong>{score.toFixed(1)}</strong></div>
            </article>
          ))}
        </div>
        <p className="note">{t.note}</p>
      </section>
    </main>
  );
}
