"use client";

import { useMemo, useState } from "react";
import { players, roleStats, Role, StatKey } from "../data/players";
import { averageEmblemValues, methodologyNotes, scoringRules, statColors, tierBonuses } from "../data/rules";
import { rankPlayers } from "../lib/optimizer";

type Language = "en" | "ru";

type Copy = {
  subtitle: string;
  core: string;
  mid: string;
  support: string;
  emblem: string;
  percentage: string;
  ranking: string;
  score: string;
  breakdown: string;
  base: string;
  weighted: string;
  warning: string;
  note: string;
  dataLabel: string;
  rollGuide: string;
  rules: string;
  tierGuide: string;
  methodology: string;
};

const text: Record<Language, Copy> = {
  en: {
    subtitle: "Set three emblems and their in-game percentages to rank TI 2026 fantasy choices",
    core: "Core pair",
    mid: "Mid",
    support: "Support pair",
    emblem: "Emblem",
    percentage: "Bonus shown in game, %",
    ranking: "Best roster choices",
    score: "Average projected score",
    breakdown: "Score contribution",
    base: "Base",
    weighted: "With bonus",
    warning: "Duplicate emblems are selected. Each banner slot has a fixed color pattern in game.",
    note: "Community-derived season averages. The calculator now treats the entered value as a percentage bonus: 60% = ×1.60. Titles and traits are not yet applied automatically.",
    dataLabel: "TI 2026 COMMUNITY DATA",
    rollGuide: "What to reroll",
    rules: "Official scoring rules",
    tierGuide: "Tier bonuses",
    methodology: "Methodology and limitations"
  },
  ru: {
    subtitle: "Задайте три эмблемы и проценты из игры — калькулятор ранжирует связки TI 2026",
    core: "Основа — пара",
    mid: "Центр",
    support: "Поддержка — пара",
    emblem: "Эмблема",
    percentage: "Бонус на эмблеме, %",
    ranking: "Лучшие связки",
    score: "Средний прогнозный счёт",
    breakdown: "Вклад показателей",
    base: "База",
    weighted: "С бонусом",
    warning: "Выбраны одинаковые показатели. В игре слоты знамени имеют фиксированные цвета.",
    note: "Используются средние значения из таблиц сообщества. Введённое число теперь считается именно процентом: 60% = ×1,60. Титулы и свойства пока не применяются автоматически.",
    dataLabel: "ДАННЫЕ СООБЩЕСТВА TI 2026",
    rollGuide: "Что роллить",
    rules: "Правила начисления очков",
    tierGuide: "Бонусы разрядов",
    methodology: "Методика и ограничения"
  }
};

const labels: Record<StatKey, { en: string; ru: string }> = {
  gpm: { en: "GPM", ru: "З/М" }, deaths: { en: "Deaths", ru: "Смерти" }, creeps: { en: "Creeps", ru: "Крипы" },
  madstones: { en: "Madstones", ru: "Подбор безумрудов" }, kills: { en: "Kills", ru: "Убийства" }, towers: { en: "Towers", ru: "Башни" },
  teamfight: { en: "Teamfight", ru: "Командные сражения" }, stuns: { en: "Stuns", ru: "Оглушения" }, tormentor: { en: "Tormentor", ru: "Убийства Терзателей" },
  roshan: { en: "Roshan", ru: "Убийства Рошана" }, firstBlood: { en: "First Blood", ru: "Первая кровь" }, courier: { en: "Courier kills", ru: "Убийства курьеров" },
  wards: { en: "Wards placed", ru: "Установка вардов" }, stacks: { en: "Camps stacked", ru: "Стак лагерей" }, lotuses: { en: "Lotuses", ru: "Сбор лотосов ≈" },
  watchers: { en: "Watchers", ru: "Захват смотрителей" }, runes: { en: "Runes", ru: "Руны" }, smokes: { en: "Smokes", ru: "Применения Smoke of Deceit" }
};

const defaults: Record<Role, { stat: StatKey; percentage: number }[]> = {
  core: [{ stat: "creeps", percentage: 60 }, { stat: "teamfight", percentage: 60 }, { stat: "gpm", percentage: 60 }],
  mid: [{ stat: "kills", percentage: 60 }, { stat: "runes", percentage: 60 }, { stat: "teamfight", percentage: 60 }],
  support: [{ stat: "wards", percentage: 60 }, { stat: "teamfight", percentage: 60 }, { stat: "stacks", percentage: 60 }]
};

export default function Optimizer() {
  const [language, setLanguage] = useState<Language>("en");
  const [role, setRole] = useState<Role>("core");
  const [emblems, setEmblems] = useState(defaults.core);
  const t = text[language];
  const ranking = useMemo(() => rankPlayers(players, role, emblems), [role, emblems]);
  const duplicateEmblems = new Set(emblems.map((item) => item.stat)).size !== emblems.length;
  const rollRanking = useMemo(() => {
    const values = averageEmblemValues[role];
    return roleStats[role]
      .filter((stat) => values[stat] !== undefined)
      .map((stat) => ({ stat, value: values[stat] ?? 0 }))
      .sort((a, b) => b.value - a.value);
  }, [role]);

  function changeRole(nextRole: Role) {
    setRole(nextRole);
    setEmblems(defaults[nextRole]);
  }

  return (
    <main className="shell">
      <header className="header">
        <div><div className="eyebrow">THE INTERNATIONAL 2026</div><h1>Dota 2 Fantasy Optimizer 2026</h1><p>{t.subtitle}</p></div>
        <div className="language-switch" aria-label="Language selector">
          <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
          <button className={language === "ru" ? "active" : ""} onClick={() => setLanguage("ru")}>RU</button>
        </div>
      </header>

      <section className="panel">
        <div className="role-tabs">
          {(["core", "mid", "support"] as Role[]).map((item) => <button key={item} className={role === item ? "active" : ""} onClick={() => changeRole(item)}>{t[item]}</button>)}
        </div>
        <div className="emblem-grid">
          {emblems.map((emblem, index) => (
            <article className="emblem-card" key={index}>
              <span>{t.emblem} {index + 1} · {statColors[emblem.stat]}</span>
              <select value={emblem.stat} onChange={(event) => {
                const next = [...emblems];
                next[index] = { ...next[index], stat: event.target.value as StatKey };
                setEmblems(next);
              }}>
                {roleStats[role].map((stat) => <option key={stat} value={stat}>{labels[stat][language]}</option>)}
              </select>
              <label>{t.percentage}</label>
              <input type="number" min="0" max="400" step="1" value={emblem.percentage} onChange={(event) => {
                const next = [...emblems];
                next[index] = { ...next[index], percentage: Math.max(0, Number(event.target.value)) };
                setEmblems(next);
              }} />
            </article>
          ))}
        </div>
        {duplicateEmblems && <p className="warning">{t.warning}</p>}
      </section>

      <section className="ranking-section">
        <div className="section-heading"><div><div className="eyebrow">{t.dataLabel}</div><h2>{t.ranking}</h2></div><span>{role.toUpperCase()}</span></div>
        <div className="ranking-list">
          {ranking.slice(0, 8).map(({ player, score, contributions }, index) => (
            <article className="player-row expanded" key={player.id}>
              <div className="player-summary">
                <div className="place">{index + 1}</div><div className="player-info"><strong>{player.name}</strong>{player.team && <span>{player.team}</span>}</div>
                <div className="score"><span>{t.score}</span><strong>{Math.round(score).toLocaleString(language === "ru" ? "ru-RU" : "en-US")}</strong></div>
              </div>
              {index < 3 && <div className="contribution-panel"><span className="contribution-title">{t.breakdown}</span><div className="contribution-grid">
                {contributions.map((item) => <div className="contribution-item" key={item.stat}><strong>{labels[item.stat][language]}</strong><span>{t.base}: {item.baseValue.toLocaleString()}</span><span>+{item.percentage}% · ×{item.factor.toFixed(2)}</span><span>{t.weighted}: {Math.round(item.weightedValue).toLocaleString()}</span></div>)}
              </div></div>}
            </article>
          ))}
        </div>
        <p className="note">{t.note}</p>
      </section>

      <section className="info-grid">
        <article className="panel info-card"><div className="eyebrow">{t.rollGuide}</div><h2>{t.rollGuide}</h2><ol className="value-list">
          {rollRanking.slice(0, 8).map(({ stat, value }) => <li key={stat}><span>{labels[stat][language]} · {statColors[stat]}</span><strong>{value.toLocaleString()}</strong></li>)}
        </ol></article>
        <article className="panel info-card"><div className="eyebrow">{t.tierGuide}</div><h2>{t.tierGuide}</h2><div className="tier-grid">
          {Object.entries(tierBonuses).map(([tier, value]) => <div key={tier}><strong>{tier}</strong><span>+{value}%</span></div>)}
        </div></article>
      </section>

      <section className="panel rules-section"><div className="eyebrow">{t.rules}</div><h2>{t.rules}</h2><div className="rules-grid">
        {roleStats[role].filter((stat) => scoringRules[stat]).map((stat) => <div className="rule-item" key={stat}><strong>{labels[stat][language]}</strong><span>{scoringRules[stat]}</span></div>)}
      </div><h3>{t.methodology}</h3><ul className="methodology-list">{methodologyNotes.map((note) => <li key={note}>{note}</li>)}</ul></section>
    </main>
  );
}
