"use client";

import { useMemo, useState } from "react";
import { players, roleStats, Role, StatKey } from "../data/players";
import {
  averageEmblemValues,
  bannerSlotColors,
  methodologyNotes,
  scoringRules,
  statColors,
  tierBonuses,
  traitDescriptions,
  Tier,
  Trait
} from "../data/rules";
import { rankPlayers, EmblemInput } from "../lib/optimizer";

type Language = "en" | "ru";

const text = {
  en: {
    subtitle: "Set the three emblem stats, tiers and traits from your banner to rank TI 2026 fantasy choices",
    core: "Core pair", mid: "Mid", support: "Support pair", emblem: "Emblem", tier: "Tier", trait: "Trait",
    ranking: "Best roster choices", score: "Average projected score", breakdown: "Score contribution", base: "Base",
    weighted: "With tier and trait", note: "Tier and trait effects use the official in-game glossary. Titles are not applied yet.",
    dataLabel: "TI 2026 COMMUNITY DATA", rollGuide: "What to reroll", rules: "Official scoring rules",
    tierGuide: "Tier bonuses", methodology: "Methodology and limitations", traits: "Trait rules", color: "slot"
  },
  ru: {
    subtitle: "Выберите показатели, разряды и свойства трёх эмблем — калькулятор ранжирует связки TI 2026",
    core: "Основа — пара", mid: "Центр", support: "Поддержка — пара", emblem: "Эмблема", tier: "Разряд", trait: "Свойство",
    ranking: "Лучшие связки", score: "Средний прогнозный счёт", breakdown: "Вклад показателей", base: "База",
    weighted: "С разрядом и свойством", note: "Разряды и свойства рассчитываются по официальному внутриигровому глоссарию. Титулы пока не применяются.",
    dataLabel: "ДАННЫЕ СООБЩЕСТВА TI 2026", rollGuide: "Что роллить", rules: "Правила начисления очков",
    tierGuide: "Бонусы разрядов", methodology: "Методика и ограничения", traits: "Правила свойств", color: "слот"
  }
} as const;

const labels: Record<StatKey, { en: string; ru: string }> = {
  gpm: { en: "GPM", ru: "З/М" }, deaths: { en: "Deaths", ru: "Смерти" }, creeps: { en: "Creeps", ru: "Крипы" },
  madstones: { en: "Madstones", ru: "Подбор безумрудов" }, kills: { en: "Kills", ru: "Убийства" }, towers: { en: "Towers", ru: "Башни" },
  teamfight: { en: "Teamfight", ru: "Командные сражения" }, stuns: { en: "Stuns", ru: "Оглушения" }, tormentor: { en: "Tormentor", ru: "Убийства Терзателей" },
  roshan: { en: "Roshan", ru: "Убийства Рошана" }, firstBlood: { en: "First Blood", ru: "Первая кровь" }, courier: { en: "Courier kills", ru: "Убийства курьеров" },
  wards: { en: "Wards placed", ru: "Установка вардов" }, stacks: { en: "Camps stacked", ru: "Стак лагерей" }, lotuses: { en: "Lotuses", ru: "Сбор лотосов ≈" },
  watchers: { en: "Watchers", ru: "Захват смотрителей" }, runes: { en: "Runes", ru: "Руны" }, smokes: { en: "Smokes", ru: "Применения Smoke of Deceit" }
};

const traitLabels: Record<Trait, { en: string; ru: string }> = {
  none: { en: "No trait", ru: "Без свойства" }, fractal: { en: "Fractal", ru: "Фрактальная" },
  benevolent: { en: "Benevolent", ru: "Благотворная" }, vampiric: { en: "Vampiric", ru: "Вампирическая" },
  unique: { en: "Unique", ru: "Уникальная" }, friendly: { en: "Friendly", ru: "Дружелюбная" }
};

const defaults: Record<Role, EmblemInput[]> = {
  core: [
    { stat: "creeps", tier: "III", trait: "none" },
    { stat: "teamfight", tier: "III", trait: "none" },
    { stat: "gpm", tier: "III", trait: "none" }
  ],
  mid: [
    { stat: "kills", tier: "III", trait: "none" },
    { stat: "runes", tier: "III", trait: "none" },
    { stat: "teamfight", tier: "III", trait: "none" }
  ],
  support: [
    { stat: "wards", tier: "III", trait: "none" },
    { stat: "teamfight", tier: "III", trait: "none" },
    { stat: "stacks", tier: "III", trait: "none" }
  ]
};

export default function Optimizer() {
  const [language, setLanguage] = useState<Language>("en");
  const [role, setRole] = useState<Role>("core");
  const [emblems, setEmblems] = useState<EmblemInput[]>(defaults.core);
  const t = text[language];

  const ranking = useMemo(() => rankPlayers(players, role, emblems), [role, emblems]);
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
          {emblems.map((emblem, index) => {
            const slotColor = bannerSlotColors[role][index];
            const availableStats = roleStats[role].filter((stat) => statColors[stat] === slotColor);
            return (
              <article className={`emblem-card color-${slotColor}`} key={index}>
                <span>{t.emblem} {index + 1} · {slotColor} {t.color}</span>
                <select value={emblem.stat} onChange={(event) => {
                  const next = [...emblems];
                  next[index] = { ...next[index], stat: event.target.value as StatKey };
                  setEmblems(next);
                }}>
                  {availableStats.map((stat) => <option key={stat} value={stat}>{labels[stat][language]}</option>)}
                </select>

                <div className="control-pair">
                  <label>{t.tier}<select value={emblem.tier} onChange={(event) => {
                    const next = [...emblems];
                    next[index] = { ...next[index], tier: event.target.value as Tier };
                    setEmblems(next);
                  }}>
                    {(Object.keys(tierBonuses) as Tier[]).map((tier) => <option key={tier} value={tier}>{tier} (+{tierBonuses[tier]}%)</option>)}
                  </select></label>

                  <label>{t.trait}<select value={emblem.trait} onChange={(event) => {
                    const next = [...emblems];
                    next[index] = { ...next[index], trait: event.target.value as Trait };
                    setEmblems(next);
                  }}>
                    {(Object.keys(traitLabels) as Trait[]).map((trait) => <option key={trait} value={trait}>{traitLabels[trait][language]}</option>)}
                  </select></label>
                </div>
              </article>
            );
          })}
        </div>
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
                {contributions.map((item) => <div className="contribution-item" key={item.stat}>
                  <strong>{labels[item.stat][language]}</strong>
                  <span>{t.base}: {item.baseValue.toLocaleString()}</span>
                  <span>{item.tier} +{item.tierBonus}% · {traitLabels[item.trait][language]}</span>
                  <span>Trait ×{item.traitFactor.toFixed(2)} · total ×{item.factor.toFixed(2)}</span>
                  <span>{t.weighted}: {Math.round(item.weightedValue).toLocaleString()}</span>
                </div>)}
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
          {(Object.entries(tierBonuses) as [Tier, number][]).map(([tier, value]) => <div key={tier}><strong>{tier}</strong><span>+{value}%</span></div>)}
        </div></article>
      </section>

      <section className="panel rules-section"><div className="eyebrow">{t.traits}</div><h2>{t.traits}</h2><div className="rules-grid">
        {(Object.keys(traitDescriptions) as Trait[]).filter((trait) => trait !== "none").map((trait) => <div className="rule-item" key={trait}><strong>{traitLabels[trait][language]}</strong><span>{traitDescriptions[trait][language]}</span></div>)}
      </div></section>

      <section className="panel rules-section"><div className="eyebrow">{t.rules}</div><h2>{t.rules}</h2><div className="rules-grid">
        {roleStats[role].filter((stat) => scoringRules[stat]).map((stat) => <div className="rule-item" key={stat}><strong>{labels[stat][language]}</strong><span>{scoringRules[stat]}</span></div>)}
      </div><h3>{t.methodology}</h3><ul className="methodology-list">{methodologyNotes.map((note) => <li key={note}>{note}</li>)}</ul></section>
    </main>
  );
}
