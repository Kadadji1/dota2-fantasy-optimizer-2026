"use client";

import { useMemo, useState } from "react";
import { players, roleStats, Role, StatKey } from "../data/players";
import {
  averageEmblemValues,
  bannerSlotColors,
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
type TeamEntry = { team: string; roles: Partial<Record<Role, { name: string; score: number }>>; total: number };

const roles: Role[] = ["core", "mid", "support"];

const text = {
  en: {
    kicker: "THE INTERNATIONAL 2026", title: "Dota 2 Fantasy Optimizer",
    subtitle: "Build all three banners, compare roster combinations and understand exactly where every projected point comes from.",
    builder: "Banner builder", results: "Best roster", teams: "Teams",
    teamsSubtitle: "Teams represented by players in the current Reddit dataset.",
    traits: "Traits", rerolls: "Reroll guide", rules: "Rules", methodology: "Methodology",
    core: "Core", mid: "Mid", support: "Support", pair: "same-team pair", single: "one player",
    emblem: "Emblem", tier: "Tier", trait: "Trait", optimize: "Optimize roster", reset: "Reset banners",
    total: "Projected roster score", score: "Projected score", alternatives: "Top alternatives",
    source: "Reddit dataset · 13 Tier 1 tournaments",
    titleSoon: "Coach title support is next. Current calculations include emblem tiers and traits only.",
    confidence: "Sample strength", strong: "Strong", medium: "Medium", limited: "Limited",
    matches: "matches in the source dataset", representedRoles: "Roles represented",
    availableTotal: "Available-role total", red: "red", blue: "blue", green: "green"
  },
  ru: {
    kicker: "THE INTERNATIONAL 2026", title: "Оптимизатор Dota 2 Fantasy",
    subtitle: "Соберите сразу три знамени, сравните связки и увидьте, откуда берётся каждое прогнозное очко.",
    builder: "Калькулятор знамён", results: "Лучший состав", teams: "Команды",
    teamsSubtitle: "Команды, игроки которых представлены в текущем датасете Reddit.",
    traits: "Свойства", rerolls: "Что роллить", rules: "Правила", methodology: "Методика расчёта",
    core: "Основа", mid: "Центр", support: "Поддержка", pair: "пара из одной команды", single: "1 игрок",
    emblem: "Эмблема", tier: "Разряд", trait: "Свойство", optimize: "Подобрать состав", reset: "Сбросить настройки",
    total: "Прогноз состава", score: "Прогнозный счёт", alternatives: "Лучшие альтернативы",
    source: "Данные Reddit · 13 турниров Tier 1",
    titleSoon: "Тренерские титулы добавим следующим этапом. Сейчас расчёт учитывает разряды и свойства эмблем.",
    confidence: "Сила выборки", strong: "Высокая", medium: "Средняя", limited: "Ограниченная",
    matches: "матчей в исходном датасете", representedRoles: "Представленные роли",
    availableTotal: "Сумма доступных ролей", red: "красный", blue: "синий", green: "зелёный"
  }
} as const;

const labels: Record<StatKey, { en: string; ru: string }> = {
  gpm:{en:"GPM",ru:"З/М"}, deaths:{en:"Deaths",ru:"Смерти"}, creeps:{en:"Creeps",ru:"Крипы"},
  madstones:{en:"Madstones",ru:"Подбор безумрудов"}, kills:{en:"Kills",ru:"Убийства"}, towers:{en:"Towers",ru:"Башни"},
  teamfight:{en:"Teamfight",ru:"Командные сражения"}, stuns:{en:"Stuns",ru:"Оглушения"}, tormentor:{en:"Tormentor kills",ru:"Убийства Терзателей"},
  roshan:{en:"Roshan kills",ru:"Убийства Рошана"}, firstBlood:{en:"First Blood",ru:"Первая кровь"}, courier:{en:"Courier kills",ru:"Убийства курьеров"},
  wards:{en:"Wards placed",ru:"Установка вардов"}, stacks:{en:"Camps stacked",ru:"Стак лагерей"}, lotuses:{en:"Lotuses",ru:"Сбор лотосов ≈"},
  watchers:{en:"Watchers",ru:"Захват смотрителей"}, runes:{en:"Runes",ru:"Руны"}, smokes:{en:"Smoke uses",ru:"Применения Smoke of Deceit"}
};

const formulas: Record<StatKey, { en: string; ru: string }> = {
  kills:{en:"107 × kills",ru:"107 × убийства"}, deaths:{en:"1950 − 195 × deaths",ru:"1950 − 195 × смерти"},
  creeps:{en:"3 × creeps",ru:"3 × крипы"}, gpm:{en:"2 × GPM",ru:"2 × З/М"},
  madstones:{en:"13 × madstones",ru:"13 × подобранные безумруды"}, towers:{en:"352 × towers",ru:"352 × башни"},
  wards:{en:"117 × wards placed",ru:"117 × установленные варды"}, stacks:{en:"234 × camps stacked",ru:"234 × стаки лагерей"},
  runes:{en:"141 × runes",ru:"141 × руны"}, watchers:{en:"147 × watchers captured",ru:"147 × захваченные смотрители"},
  lotuses:{en:"176 × lotuses (approx.)",ru:"176 × собранные лотосы (приблизительно)"},
  smokes:{en:"293 × Smoke of Deceit uses",ru:"293 × применения Smoke of Deceit"},
  teamfight:{en:"2124 × teamfight participation",ru:"2124 × участие в командных сражениях"},
  stuns:{en:"10 × stun duration",ru:"10 × длительность оглушений"}, firstBlood:{en:"1934 × first blood",ru:"1934 × первая кровь"},
  tormentor:{en:"879 × Tormentor kills",ru:"879 × убийства Терзателей"}, roshan:{en:"1172 × Roshan kills",ru:"1172 × убийства Рошана"},
  courier:{en:"703 × courier kills",ru:"703 × убийства курьеров"}
};

const methodology = {
  en:["Each game is scored separately.","A match result is the sum of the two highest-scoring games in that series.","A player or pair value is the average match score over the selected source tournaments.","Death score is not clamped at zero and can become negative.","Lotus data is approximate because OpenDota does not expose the exact pickup event.","Two suffixes cannot be modeled reliably with OpenDota: pre-horn first blood and fountain kills.","Trait effects are applied multiplicatively to the tier-adjusted emblem contribution."],
  ru:["Каждая игра оценивается отдельно.","Результат матча — сумма двух игр серии с наибольшим фэнтези-счётом.","Значение игрока или пары — средний счёт за матч на выбранных турнирах-источниках.","Очки за смерти не ограничиваются нулём и могут стать отрицательными.","Данные по лотосам приблизительные: OpenDota не отдаёт точное событие подбора.","Два суффикса нельзя надёжно посчитать через OpenDota: первая кровь до горна и убийства у фонтана.","Эффекты свойств применяются мультипликативно к вкладу эмблемы после учёта разряда."]
};

const traitLabels: Record<Trait,{en:string;ru:string}> = {
  none:{en:"No trait",ru:"Без свойства"}, fractal:{en:"Fractal",ru:"Фрактальная"},
  benevolent:{en:"Benevolent",ru:"Благотворная"}, vampiric:{en:"Vampiric",ru:"Вампирическая"},
  unique:{en:"Unique",ru:"Уникальная"}, friendly:{en:"Friendly",ru:"Дружелюбная"}
};

const teamByPlayerId: Record<string,string> = {
  "natsumi-raven":"OG","ssnovv-corrupted":"HULIGANI","yuma-wisper":"LGD Gaming","satanic-noticed":"Team Vision",
  "watson-dm":"Team Yandex","pure-33":"Iron Wing","skiter-atf":"Team Falcons","ame-xxs":"Xtreme Gaming",
  "yatoro-collapse":"Team Spirit","nisha":"Team Liquid","mikoto":"Aurora Gaming","marl1ne":"Team Falcons",
  "yopaj":"OG","mirage":"HULIGANI","larl":"Team Spirit","lorenof":"Nigma Galaxy","bzm":"Iron Wing","xm":"Xtreme Gaming",
  "tims-skem":"OG","thiolicor-kj":"LGD Gaming","fy-xnova":"Xtreme Gaming","saksa-malady":"Team Yandex",
  "rue-notme":"Team Spirit","ari-whitemon":"Iron Wing","cr1t-sneyking":"Team Falcons","boxi-tofu":"Team Liquid"
};

const defaults: BannerState = {
  core:[{stat:"creeps",tier:"III",trait:"none"},{stat:"teamfight",tier:"III",trait:"none"},{stat:"gpm",tier:"III",trait:"none"}],
  mid:[{stat:"kills",tier:"III",trait:"none"},{stat:"runes",tier:"III",trait:"none"},{stat:"teamfight",tier:"III",trait:"none"}],
  support:[{stat:"wards",tier:"III",trait:"none"},{stat:"teamfight",tier:"III",trait:"none"},{stat:"stacks",tier:"III",trait:"none"}]
};

function playerTeam(id:string, stored:string){ return stored || teamByPlayerId[id] || ""; }
function sampleStrength(index:number, language:Language){ const t=text[language]; return index<3?t.strong:index<6?t.medium:t.limited; }

function TeamLogo({team,size="md"}:{team:string;size?:"sm"|"md"|"lg"}){
  return <span className={`team-logo team-logo-${size}`} title={team} role="img" aria-label={team} />;
}

export default function Optimizer(){
  const [language,setLanguage]=useState<Language>("en");
  const [banners,setBanners]=useState<BannerState>(defaults);
  const t=text[language];
  const locale=language==="ru"?"ru-RU":"en-US";
  const rankings=useMemo(()=>({core:rankPlayers(players,"core",banners.core),mid:rankPlayers(players,"mid",banners.mid),support:rankPlayers(players,"support",banners.support)}),[banners]);
  const totalScore=roles.reduce((sum,role)=>sum+(rankings[role][0]?.score??0),0);
  const teamOverview=useMemo<TeamEntry[]>(()=>{
    const teams=new Map<string,TeamEntry>();
    roles.forEach(role=>rankings[role].forEach(entry=>{
      const team=playerTeam(entry.player.id,entry.player.team); if(!team)return;
      const current=teams.get(team)??{team,roles:{},total:0};
      if(!current.roles[role]||entry.score>current.roles[role]!.score){
        current.roles[role]={name:entry.player.name,score:entry.score};
      }
      teams.set(team,current);
    }));
    return Array.from(teams.values())
      .map(entry=>({...entry,total:roles.reduce((sum,role)=>sum+(entry.roles[role]?.score??0),0)}))
      .sort((a,b)=>b.total-a.total);
  },[rankings]);

  const updateEmblem=(role:Role,index:number,patch:Partial<EmblemInput>)=>setBanners(c=>({...c,[role]:c[role].map((x,i)=>i===index?{...x,...patch}:x)}));
  const resetBanners=()=>setBanners({core:defaults.core.map(x=>({...x})),mid:defaults.mid.map(x=>({...x})),support:defaults.support.map(x=>({...x}))});
  const scrollToResults=()=>document.getElementById("results")?.scrollIntoView({behavior:"smooth",block:"start"});

  return <main className="site-shell">
    <header className="topbar">
      <a className="brand" href="#top"><span className="brand-mark">II</span><span>DOTA FANTASY 2026</span></a>
      <nav className="anchor-nav"><a href="#builder">{t.builder}</a><a href="#results">{t.results}</a><a href="#teams">{t.teams}</a><a href="#traits">{t.traits}</a><a href="#rerolls">{t.rerolls}</a><a href="#rules">{t.rules}</a></nav>
      <div className="language-switch"><button className={language==="en"?"active":""} onClick={()=>setLanguage("en")}>EN</button><button className={language==="ru"?"active":""} onClick={()=>setLanguage("ru")}>RU</button></div>
    </header>

    <section className="hero" id="top"><div className="hero-glow"/><div className="hero-copy"><div className="eyebrow">{t.kicker}</div><h1>{t.title}</h1><p>{t.subtitle}</p><div className="hero-actions"><button className="primary-button" onClick={scrollToResults}>{t.optimize}</button><button className="ghost-button" onClick={resetBanners}>{t.reset}</button></div></div><aside className="dataset-card"><span>{t.source}</span><strong>1,601</strong><small>{t.matches}</small></aside></section>

    <section className="section" id="builder"><div className="section-title"><div><div className="eyebrow">01 · {t.builder}</div><h2>{t.builder}</h2></div><button className="text-button" onClick={resetBanners}>{t.reset}</button></div><div className="banner-board">
      {roles.map(role=><article className={`banner-column role-${role}`} key={role}><div className="banner-heading"><div><span>{t[role]}</span><small>{role==="mid"?t.single:t.pair}</small></div><b>{bannerSlotColors[role].map(c=>t[c]).join(" · ")}</b></div><div className="banner-slots">
        {banners[role].map((emblem,index)=>{const color=bannerSlotColors[role][index];const stats=roleStats[role].filter(s=>statColors[s]===color);return <div className={`slot-card color-${color}`} key={`${role}-${index}`}><div className="slot-topline"><span>{t.emblem} {index+1}</span><i>{t[color]}</i></div><select value={emblem.stat} onChange={e=>updateEmblem(role,index,{stat:e.target.value as StatKey})}>{stats.map(s=><option key={s} value={s}>{labels[s][language]}</option>)}</select><div className="dual-control"><label>{t.tier}<select value={emblem.tier} onChange={e=>updateEmblem(role,index,{tier:e.target.value as Tier})}>{(Object.keys(tierBonuses) as Tier[]).map(x=><option key={x}>{x} (+{tierBonuses[x]}%)</option>)}</select></label><label>{t.trait}<select value={emblem.trait} onChange={e=>updateEmblem(role,index,{trait:e.target.value as Trait})}>{(Object.keys(traitLabels) as Trait[]).map(x=><option key={x} value={x}>{traitLabels[x][language]}</option>)}</select></label></div></div>})}
      </div></article>)}
    </div><div className="builder-footer"><p>{t.titleSoon}</p><button className="primary-button" onClick={scrollToResults}>{t.optimize}</button></div></section>

    <section className="section results-section" id="results"><div className="results-hero"><div><div className="eyebrow">02 · {t.results}</div><h2>{t.results}</h2><p>{t.source}</p></div><div className="total-score"><span>{t.total}</span><strong>{Math.round(totalScore).toLocaleString(locale)}</strong></div></div><div className="winner-grid">
      {roles.map(role=>{const winner=rankings[role][0];if(!winner)return null;const team=playerTeam(winner.player.id,winner.player.team);return <article className="winner-card" key={role}><div className="winner-role"><span>{t[role]}</span><small>{role==="mid"?t.single:t.pair}</small></div><div className="winner-identity">{team&&<TeamLogo team={team} size="lg"/>}<div><div className="winner-name">{winner.player.name}</div>{team&&<div className="winner-team">{team}</div>}</div></div><div className="winner-score"><span>{t.score}</span><strong>{Math.round(winner.score).toLocaleString(locale)}</strong></div><div className="winner-breakdown">{winner.contributions.map(x=><div key={x.stat}><span>{labels[x.stat][language]}</span><b>{Math.round(x.weightedValue).toLocaleString(locale)}</b></div>)}</div></article>})}
    </div><div className="alternatives-grid">{roles.map(role=><article className="alternatives-card" key={role}><div className="alternatives-heading"><h3>{t[role]}</h3><span>{t.alternatives}</span></div>{rankings[role].slice(0,8).map((entry,index)=>{const team=playerTeam(entry.player.id,entry.player.team);return <div className="alternative-row" key={entry.player.id}><span className="rank-number">{index+1}</span>{team&&<TeamLogo team={team} size="sm"/>}<div><strong>{entry.player.name}</strong>{team&&<small className="team-label">{team}</small>}<small>{t.confidence}: {sampleStrength(index,language)}</small></div><b>{Math.round(entry.score).toLocaleString(locale)}</b></div>})}</article>)}</div></section>

    <section className="section" id="teams"><div className="section-title"><div><div className="eyebrow">03 · {t.teams}</div><h2>{t.teams}</h2><p>{t.teamsSubtitle}</p></div></div><div className="team-grid">{teamOverview.map(entry=><article className="team-card" key={entry.team}><div className="team-card-header"><div className="team-card-title"><TeamLogo team={entry.team} size="lg"/><h3>{entry.team}</h3></div><strong>{Math.round(entry.total).toLocaleString(locale)}</strong></div><small>{t.availableTotal}</small><div className="team-role-list">{roles.map(role=>entry.roles[role]?<div key={role}><span>{t[role]}</span><b>{entry.roles[role]!.name}</b><em>{Math.round(entry.roles[role]!.score).toLocaleString(locale)}</em></div>:null)}</div><footer>{t.representedRoles}: {roles.filter(role=>entry.roles[role]).length}/3</footer></article>)}</div></section>

    <section className="section split-section" id="traits"><div><div className="eyebrow">04 · {t.traits}</div><h2>{t.traits}</h2></div><div className="trait-grid">{(Object.keys(traitDescriptions) as Trait[]).filter(x=>x!=="none").map(x=><article className="info-tile" key={x}><span>{traitLabels[x][language]}</span><p>{traitDescriptions[x][language]}</p></article>)}</div></section>

    <section className="section" id="rerolls"><div className="section-title"><div><div className="eyebrow">05 · {t.rerolls}</div><h2>{t.rerolls}</h2></div></div><div className="reroll-grid">{roles.map(role=>{const values=averageEmblemValues[role];const ranking=roleStats[role].filter(s=>values[s]!==undefined).map(s=>({stat:s,value:values[s]??0})).sort((a,b)=>b.value-a.value);return <article className="reroll-card" key={role}><h3>{t[role]}</h3>{ranking.map((x,i)=><div key={x.stat}><span><i>{i+1}</i>{labels[x.stat][language]} <small>{t[statColors[x.stat]]}</small></span><b>{x.value.toLocaleString(locale)}</b></div>)}</article>})}</div></section>

    <section className="section" id="rules"><div className="section-title"><div><div className="eyebrow">06 · {t.rules}</div><h2>{t.rules}</h2></div></div><div className="rules-grid">{Object.keys(scoringRules).map(stat=><article className="rule-tile" key={stat}><span>{labels[stat as StatKey][language]}</span><b>{formulas[stat as StatKey][language]}</b></article>)}</div><div className="methodology"><h3>{t.methodology}</h3><ul>{methodology[language].map(note=><li key={note}>{note}</li>)}</ul></div></section>
  </main>;
}
