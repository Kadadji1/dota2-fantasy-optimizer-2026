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
type BannerState = Record<Role, EmblemInput[]>;

const roles: Role[] = ["core", "mid", "support"];

const text = {
  en: {
    kicker: "THE INTERNATIONAL 2026",
    title: "Dota 2 Fantasy Optimizer",
    subtitle: "Build all three banners, compare roster combinations and understand exactly where every projected point comes from.",
    builder: "Banner builder",
    results: "Best roster",
    traits: "Traits",
    rerolls: "Reroll guide",
    rules: "Rules",
    core: "Core",
    mid: "Mid",
    support: "Support",
    pair: "same-team pair",
    single: "one player",
    emblem: "Emblem",
    tier: "Tier",
    trait: "Trait",
    optimize: "Optimize roster",
    reset: "Reset banners",
    total: "Projected roster score",
    score: "Projected score",
    alternatives: "Top alternatives",
    why: "Why this ranks here",
    base: "Base",
    contribution: "Contribution",
    source: "Community dataset · TI 2026 methodology",
    titleSoon: "Coach title support is next. Current calculations include emblem tiers and traits only.",
    noTrait: "No trait",
    confidence: "Sample strength",
    strong: "Strong",
    medium: "Medium",
    limited: "Limited",
    scroll: "Jump to results"
  },
  ru: {
    kicker: "THE INTERNATIONAL 2026",
    title: "Dota 2 Fantasy Optimizer",
    subtitle: "Соберите сразу три знамени, сравните связки и увидьте, откуда берётся каждое прогнозное очко.",
    builder: "Калькулятор знамён",
    results: "Лучший состав",
    traits: "Свойства",
    rerolls: "Что роллить",
    rules: "Правила",
    core: "Основа",
    mid: "Центр",
    support: "Поддержка",
    pair: "пара из одной команды",
    single: "1 игрок",
    emblem: "Эмблема",
    tier: "Разряд",
    trait: "Свойство",
    optimize: "Подобрать состав",
    reset: "Сбросить настройки",
    total: "Прогноз состава",
    score: "Прогнозный счёт",
    alternatives: "Лучшие альтернативы",
    why: "Почему этот вариант выше",
    base: "База",
    contribution: "Вклад",
    source: "Данные сообщества · методика TI 2026",
    titleSoon: "Тренерские титулы добавим следующим этапом. Сейчас расчёт учитывает разряды и свойства эмблем.",
    noTrait: "Без свойства",
    confidence: "Сила выборки",
    strong: "Высокая",
    medium: "Средняя",
    limited: "Ограниченная",
    scroll: "К результатам"
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

const defaults: BannerState = {
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

function sampleStrength(index: number, language: Language) {
  const t = text[language];
  if (index < 3) return t.strong;
  if (index < 6) return t.medium;
  return t.limited;
}

export default function Optimizer() {
  const [language, setLanguage] = useState<Language>("en");
  const [banners, setBanners] = useState<BannerState>(defaults);
  const t = text[language];

  const rankings = useMemo(() => ({
    core: rankPlayers(players, "core", banners.core),
    mid: rankPlayers(players, "mid", banners.mid),
    support: rankPlayers(players, "support", banners.support)
  }), [banners]);

  const totalScore = roles.reduce((sum, role) => sum + (rankings[role][0]?.score ?? 0), 0);

  function updateEmblem(role: Role, index: number, patch: Partial<EmblemInput>) {
    setBanners((current) => ({
      ...current,
      [role]: current[role].map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item)
    }));
  }

  function resetBanners() {
    setBanners({
      core: defaults.core.map((item) => ({ ...item })),
      mid: defaults.mid.map((item) => ({ ...item })),
      support: defaults.support.map((item) => ({ ...item }))
    });
  }

  function scrollToResults() {
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top"><span className="brand-mark">II</span><span>DOTA FANTASY 2026</span></a>
        <nav className="anchor-nav" aria-label="Page navigation">
          <a href="#builder">{t.builder}</a><a href="#results">{t.results}</a><a href="#traits">{t.traits}</a><a href="#rerolls">{t.rerolls}</a><a href="#rules">{t.rules}</a>
        </nav>
        <div className="language-switch"><button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button><button className={language === "ru" ? "active" : ""} onClick={() => setLanguage("ru")}>RU</button></div>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow" />
        <div className="hero-copy">
          <div className="eyebrow">{t.kicker}</div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
          <div className="hero-actions"><button className="primary-button" onClick={scrollToResults}>{t.optimize}</button><button className="ghost-button" onClick={resetBanners}>{t.reset}</button></div>
        </div>
        <aside className="dataset-card"><span>{t.source}</span><strong>1,408</strong><small>matches in current source methodology</small></aside>
      </section>

      <section className="section" id="builder">
        <div className="section-title"><div><div className="eyebrow">01 · {t.builder}</div><h2>{t.builder}</h2></div><button className="text-button" onClick={resetBanners}>{t.reset}</button></div>
        <div className="banner-board">
          {roles.map((role) => (
            <article className={`banner-column role-${role}`} key={role}>
              <div className="banner-heading"><div><span>{t[role]}</span><small>{role === "mid" ? t.single : t.pair}</small></div><b>{bannerSlotColors[role].map((color) => color[0].toUpperCase()).join(" · ")}</b></div>
              <div className="banner-slots">
                {banners[role].map((emblem, index) => {
                  const slotColor = bannerSlotColors[role][index];
                  const availableStats = roleStats[role].filter((stat) => statColors[stat] === slotColor);
                  return (
                    <div className={`slot-card color-${slotColor}`} key={`${role}-${index}`}>
                      <div className="slot-topline"><span>{t.emblem} {index + 1}</span><i>{slotColor}</i></div>
                      <select value={emblem.stat} onChange={(event) => updateEmblem(role, index, { stat: event.target.value as StatKey })}>
                        {availableStats.map((stat) => <option key={stat} value={stat}>{labels[stat][language]}</option>)}
                      </select>
                      <div className="dual-control">
                        <label>{t.tier}<select value={emblem.tier} onChange={(event) => updateEmblem(role, index, { tier: event.target.value as Tier })}>{(Object.keys(tierBonuses) as Tier[]).map((tier) => <option key={tier} value={tier}>{tier} (+{tierBonuses[tier]}%)</option>)}</select></label>
                        <label>{t.trait}<select value={emblem.trait} onChange={(event) => updateEmblem(role, index, { trait: event.target.value as Trait })}>{(Object.keys(traitLabels) as Trait[]).map((trait) => <option key={trait} value={trait}>{traitLabels[trait][language]}</option>)}</select></label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
        <div className="builder-footer"><p>{t.titleSoon}</p><button className="primary-button" onClick={scrollToResults}>{t.optimize}</button></div>
      </section>

      <section className="section results-section" id="results">
        <div className="results-hero"><div><div className="eyebrow">02 · {t.results}</div><h2>{t.results}</h2><p>{t.source}</p></div><div className="total-score"><span>{t.total}</span><strong>{Math.round(totalScore).toLocaleString(language === "ru" ? "ru-RU" : "en-US")}</strong></div></div>
        <div className="winner-grid">
          {roles.map((role) => {
            const winner = rankings[role][0];
            if (!winner) return null;
            return (
              <article className="winner-card" key={role}>
                <div className="winner-role"><span>{t[role]}</span><small>{role === "mid" ? t.single : t.pair}</small></div>
                <div className="winner-name">{winner.player.name}</div>
                {winner.player.team && <div className="winner-team">{winner.player.team}</div>}
                <div className="winner-score"><span>{t.score}</span><strong>{Math.round(winner.score).toLocaleString(language === "ru" ? "ru-RU" : "en-US")}</strong></div>
                <div className="winner-breakdown">
                  {winner.contributions.map((item) => <div key={item.stat}><span>{labels[item.stat][language]}</span><b>{Math.round(item.weightedValue).toLocaleString()}</b></div>)}
                </div>
              </article>
            );
          })}
        </div>

        <div className="alternatives-grid">
          {roles.map((role) => (
            <article className="alternatives-card" key={role}>
              <div className="alternatives-heading"><h3>{t[role]}</h3><span>{t.alternatives}</span></div>
              {rankings[role].slice(0, 8).map((entry, index) => <div className="alternative-row" key={entry.player.id}><span className="rank-number">{index + 1}</span><div><strong>{entry.player.name}</strong><small>{t.confidence}: {sampleStrength(index, language)}</small></div><b>{Math.round(entry.score).toLocaleString(language === "ru" ? "ru-RU" : "en-US")}</b></div>)}
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="traits">
        <div><div className="eyebrow">03 · {t.traits}</div><h2>{t.traits}</h2></div>
        <div className="trait-grid">{(Object.keys(traitDescriptions) as Trait[]).filter((trait) => trait !== "none").map((trait) => <article className="info-tile" key={trait}><span>{traitLabels[trait][language]}</span><p>{traitDescriptions[trait][language]}</p></article>)}</div>
      </section>

      <section className="section" id="rerolls">
        <div className="section-title"><div><div className="eyebrow">04 · {t.rerolls}</div><h2>{t.rerolls}</h2></div></div>
        <div className="reroll-grid">{roles.map((role) => {
          const values = averageEmblemValues[role];
          const ranking = roleStats[role].filter((stat) => values[stat] !== undefined).map((stat) => ({ stat, value: values[stat] ?? 0 })).sort((a, b) => b.value - a.value);
          return <article className="reroll-card" key={role}><h3>{t[role]}</h3>{ranking.map((item, index) => <div key={item.stat}><span><i>{index + 1}</i>{labels[item.stat][language]} <small>{statColors[item.stat]}</small></span><b>{item.value.toLocaleString()}</b></div>)}</article>;
        })}</div>
      </section>

      <section className="section" id="rules">
        <div className="section-title"><div><div className="eyebrow">05 · {t.rules}</div><h2>{t.rules}</h2></div></div>
        <div className="rules-grid">{Object.entries(scoringRules).map(([stat, formula]) => <article className="rule-tile" key={stat}><span>{labels[stat as StatKey][language]}</span><b>{formula}</b></article>)}</div>
        <div className="methodology"><h3>Methodology</h3><ul>{methodologyNotes.map((note) => <li key={note}>{note}</li>)}</ul></div>
      </section>
    </main>
  );
}
