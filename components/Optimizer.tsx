"use client";

import { useMemo, useState } from "react";
import { players, roleStats, Role, StatKey } from "../data/players";
import { rankPlayers } from "../lib/optimizer";

type Language = "en" | "ru";

type Copy = {
  subtitle: string;
  core: string;
  mid: string;
  support: string;
  emblem: string;
  multiplier: string;
  ranking: string;
  score: string;
  breakdown: string;
  base: string;
  weighted: string;
  warning: string;
  note: string;
  dataLabel: string;
};

const text: Record<Language, Copy> = {
  en: {
    subtitle: "Rank TI 2026 fantasy banners using your actual emblem multipliers",
    core: "Core",
    mid: "Mid",
    support: "Support",
    emblem: "Emblem",
    multiplier: "Multiplier",
    ranking: "Best banner choices",
    score: "Projected weighted value",
    breakdown: "Why this choice ranks here",
    base: "Base",
    weighted: "Weighted",
    warning: "Duplicate emblems are selected. Check whether this combination is allowed in the game.",
    note: "Current values are transcribed from the supplied 2026 community fantasy tables. Schedule, title and trait adjustments are not included yet.",
    dataLabel: "2026 COMMUNITY DATA"
  },
  ru: {
    subtitle: "Рейтинг баннеров TI 2026 с учетом реальных множителей твоих эмблем",
    core: "Керри и оффлейн",
    mid: "Мидер",
    support: "Поддержка",
    emblem: "Эмблема",
    multiplier: "Множитель",
    ranking: "Лучшие варианты баннера",
    score: "Взвешенный прогноз",
    breakdown: "Почему вариант находится на этом месте",
    base: "База",
    weighted: "С учетом множителя",
    warning: "Выбраны одинаковые эмблемы. Проверь, разрешена ли такая комбинация в игре.",
    note: "Текущие значения перенесены из присланных таблиц Fantasy 2026. Расписание, титул и свойства эмблем пока не учитываются.",
    dataLabel: "ДАННЫЕ СООБЩЕСТВА 2026"
  }
};

const labels: Record<StatKey, { en: string; ru: string }> = {
  gpm: { en: "GPM", ru: "GPM" },
  deaths: { en: "Deaths", ru: "Смерти" },
  creeps: { en: "Creeps", ru: "Крипы" },
  madstones: { en: "Madstones", ru: "Мэдстоуны" },
  kills: { en: "Kills", ru: "Убийства" },
  towers: { en: "Towers", ru: "Башни" },
  teamfight: { en: "Teamfight", ru: "Командные драки" },
  stuns: { en: "Stuns", ru: "Оглушения" },
  tormentor: { en: "Tormentor", ru: "Терзатель" },
  roshan: { en: "Roshan", ru: "Рошан" },
  firstBlood: { en: "First Blood", ru: "Первая кровь" },
  courier: { en: "Courier", ru: "Курьеры" },
  wards: { en: "Wards", ru: "Варды" },
  stacks: { en: "Camps stacked", ru: "Стаки лагерей" },
  lotuses: { en: "Lotuses", ru: "Лотосы" },
  watchers: { en: "Watchers", ru: "Наблюдатели" },
  runes: { en: "Runes", ru: "Руны" },
  smokes: { en: "Smokes", ru: "Смоки" }
};

const defaults: Record<Role, { stat: StatKey; multiplier: number }[]> = {
  core: [
    { stat: "creeps", multiplier: 2.5 },
    { stat: "deaths", multiplier: 2.5 },
    { stat: "teamfight", multiplier: 1.9 }
  ],
  mid: [
    { stat: "creeps", multiplier: 2.0 },
    { stat: "teamfight", multiplier: 1.7 },
    { stat: "runes", multiplier: 2.5 }
  ],
  support: [
    { stat: "wards", multiplier: 2.5 },
    { stat: "teamfight", multiplier: 1.9 },
    { stat: "smokes", multiplier: 2.0 }
  ]
};

export default function Optimizer() {
  const [language, setLanguage] = useState<Language>("en");
  const [role, setRole] = useState<Role>("core");
  const [emblems, setEmblems] = useState(defaults.core);

  const t = text[language];
  const ranking = useMemo(() => rankPlayers(players, role, emblems), [role, emblems]);
  const duplicateEmblems = new Set(emblems.map((item) => item.stat)).size !== emblems.length;

  function changeRole(nextRole: Role) {
    setRole(nextRole);
    setEmblems(defaults[nextRole]);
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
              <input type="number" min="0" max="5" step="0.1" value={emblem.multiplier} onChange={(event) => {
                const next = [...emblems];
                next[index] = { ...next[index], multiplier: Math.max(0, Number(event.target.value)) };
                setEmblems(next);
              }} />
            </article>
          ))}
        </div>
        {duplicateEmblems && <p className="warning">{t.warning}</p>}
      </section>

      <section className="ranking-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{t.dataLabel}</div>
            <h2>{t.ranking}</h2>
          </div>
          <span>{role.toUpperCase()}</span>
        </div>

        <div className="ranking-list">
          {ranking.map(({ player, score, contributions }, index) => (
            <article className="player-row expanded" key={player.id}>
              <div className="player-summary">
                <div className="place">{index + 1}</div>
                <div className="player-info">
                  <strong>{player.name}</strong>
                  {player.team && <span>{player.team}</span>}
                </div>
                <div className="score">
                  <span>{t.score}</span>
                  <strong>{Math.round(score).toLocaleString(language === "ru" ? "ru-RU" : "en-US")}</strong>
                </div>
              </div>

              {index < 5 && (
                <div className="contribution-panel">
                  <span className="contribution-title">{t.breakdown}</span>
                  <div className="contribution-grid">
                    {contributions.map((item) => (
                      <div className="contribution-item" key={item.stat}>
                        <strong>{labels[item.stat][language]}</strong>
                        <span>{t.base}: {item.baseValue.toLocaleString()}</span>
                        <span>× {item.multiplier.toFixed(1)}</span>
                        <span>{t.weighted}: {Math.round(item.weightedValue).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
        <p className="note">{t.note}</p>
      </section>
    </main>
  );
}
