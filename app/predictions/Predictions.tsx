"use client";

import { useEffect, useState } from "react";

type SiteLanguage = "en" | "ru" | "es" | "zh";
type Match = { a: string; score?: string; b: string; date: string; time: string };
type Copy = { eyebrow: string; title: string; body: string; schedule: string; results: string; roundOne: string; roundTwo: string; upcoming: string; note: string; stages: Array<{ date: string; title: string; body: string }> };

const roundOne: Match[] = [
  { a: "Team Falcons", score: "2–1", b: "LGD Gaming", date: "Aug 12", time: "10:00 PM EDT" }, { a: "Iron Wing", score: "2–0", b: "Nigma Galaxy", date: "Aug 12", time: "10:00 PM EDT" },
  { a: "BoomBoys", score: "2–0", b: "OG", date: "Aug 12", time: "10:00 PM EDT" }, { a: "TEAM VISION", score: "2–1", b: "Team Resilience", date: "Aug 12", time: "10:00 PM EDT" },
  { a: "Team Yandex", score: "2–0", b: "HULIGANI", date: "Aug 13", time: "1:00 AM EDT" }, { a: "Team Spirit", score: "2–0", b: "Xtreme Gaming", date: "Aug 13", time: "1:00 AM EDT" },
  { a: "Team Liquid", score: "2–0", b: "Vici Gaming", date: "Aug 13", time: "1:00 AM EDT" }, { a: "Aurora Gaming", score: "2–0", b: "GamerLegion", date: "Aug 13", time: "1:00 AM EDT" }
];
const roundTwo: Match[] = [
  { a: "TEAM VISION", score: "2–1", b: "Team Falcons", date: "Aug 13", time: "4:00 AM EDT" }, { a: "BoomBoys", score: "2–1", b: "Iron Wing", date: "Aug 13", time: "4:00 AM EDT" },
  { a: "LGD Gaming", score: "2–1", b: "Team Resilience", date: "Aug 13", time: "4:00 AM EDT" }, { a: "Nigma Galaxy", score: "2–0", b: "OG", date: "Aug 13", time: "4:00 AM EDT" }
];
const nextMatches: Match[] = [
  { a: "TEAM VISION", b: "BoomBoys", date: "Aug 13", time: "10:00 PM EDT" }, { a: "Team Yandex", b: "Team Liquid", date: "Aug 13", time: "10:00 PM EDT" },
  { a: "Team Spirit", b: "Aurora Gaming", date: "Aug 13", time: "10:00 PM EDT" }, { a: "Team Falcons", b: "Iron Wing", date: "Aug 13", time: "10:00 PM EDT" },
  { a: "LGD Gaming", b: "Nigma Galaxy", date: "Aug 14", time: "1:00 AM EDT" }, { a: "Xtreme Gaming", b: "GamerLegion", date: "Aug 14", time: "1:00 AM EDT" },
  { a: "HULIGANI", b: "Vici Gaming", date: "Aug 14", time: "1:00 AM EDT" }, { a: "Team Resilience", b: "OG", date: "Aug 14", time: "1:00 AM EDT" }
];

const copy: Record<SiteLanguage, Copy> = {
  en: { eyebrow: "THE INTERNATIONAL 2026", title: "Group Stage schedule & results", body: "The Group Stage Fantasy roster is locked. Until the eight-team Main Event bracket is confirmed, this page tracks the tournament schedule and completed series.", schedule: "Tournament schedule", results: "Results so far", roundOne: "Swiss round 1", roundTwo: "Swiss round 2", upcoming: "Next: Swiss rounds 3–5 and the elimination round. The Main Event bracket will replace this page once the eight qualified teams are confirmed.", note: "All listed series are best of three. Main Event runs August 20–23; every series is Bo3 except the Bo5 Grand Final.", stages: [{ date: "AUG 13", title: "Swiss rounds 1–2", body: "Completed · results below" }, { date: "AUG 14–16", title: "Swiss rounds 3–5", body: "Pairings and start times follow each round" }, { date: "AUG 16", title: "Elimination round", body: "Five series decide the final Main Event places" }, { date: "AUG 20–23", title: "Main Event", body: "Double-elimination playoffs in Shanghai" }] },
  ru: { eyebrow: "THE INTERNATIONAL 2026", title: "Расписание и итоги группового этапа", body: "Fantasy‑состав группового этапа закреплён. Пока не будет подтверждена сетка Main Event из восьми команд, здесь отображаются расписание турнира и сыгранные серии.", schedule: "Расписание турнира", results: "Итоги на сейчас", roundOne: "Швейцарский раунд 1", roundTwo: "Швейцарский раунд 2", upcoming: "Далее: швейцарские раунды 3–5 и раунд на вылет. Когда подтвердятся восемь прошедших команд, эту страницу заменит сетка Main Event.", note: "Все указанные серии — BO3. Main Event пройдёт 20–23 августа: все серии BO3, кроме гранд‑финала BO5.", stages: [{ date: "13 АВГ", title: "Швейцарские раунды 1–2", body: "Завершены · результаты ниже" }, { date: "14–16 АВГ", title: "Швейцарские раунды 3–5", body: "Пары и время появляются после каждого раунда" }, { date: "16 АВГ", title: "Раунд на вылет", body: "Пять серий определят последние места в Main Event" }, { date: "20–23 АВГ", title: "Main Event", body: "Плей‑офф с двойным выбыванием в Шанхае" }] },
  es: { eyebrow: "THE INTERNATIONAL 2026", title: "Calendario y resultados de la fase de grupos", body: "La plantilla Fantasy de la fase de grupos está bloqueada. Hasta que se confirme el cuadro del Evento Principal de ocho equipos, esta página muestra el calendario y las series completadas.", schedule: "Calendario del torneo", results: "Resultados hasta ahora", roundOne: "Ronda suiza 1", roundTwo: "Ronda suiza 2", upcoming: "Siguiente: rondas suizas 3–5 y ronda de eliminación. Esta página se convertirá en el cuadro del Evento Principal cuando se confirmen los ocho clasificados.", note: "Todas las series mostradas son al mejor de tres. El Evento Principal se juega del 20 al 23 de agosto; la Gran Final es la única al mejor de cinco.", stages: [{ date: "13 AGO", title: "Rondas suizas 1–2", body: "Completadas · resultados abajo" }, { date: "14–16 AGO", title: "Rondas suizas 3–5", body: "Emparejamientos y horarios tras cada ronda" }, { date: "16 AGO", title: "Ronda de eliminación", body: "Cinco series deciden las últimas plazas" }, { date: "20–23 AGO", title: "Evento Principal", body: "Playoffs de doble eliminación en Shanghái" }] },
  zh: { eyebrow: "THE INTERNATIONAL 2026", title: "小组赛赛程与赛果", body: "小组赛 Fantasy 阵容已锁定。在八支主赛事晋级队伍和对阵表确认前，本页面会展示赛事日程和已结束的系列赛。", schedule: "赛事日程", results: "当前赛果", roundOne: "瑞士轮第 1 轮", roundTwo: "瑞士轮第 2 轮", upcoming: "接下来：瑞士轮第 3–5 轮和淘汰轮。八支晋级队伍确认后，本页面将替换为主赛事对阵表。", note: "列出的系列赛均为三局两胜。主赛事为 8 月 20–23 日；除五局三胜总决赛外均为 BO3。", stages: [{ date: "8月13日", title: "瑞士轮第 1–2 轮", body: "已完成 · 赛果见下方" }, { date: "8月14–16日", title: "瑞士轮第 3–5 轮", body: "每轮结束后公布对阵和开赛时间" }, { date: "8月16日", title: "淘汰轮", body: "五场系列赛决定最后的主赛事名额" }, { date: "8月20–23日", title: "主赛事", body: "上海双败淘汰赛" }] }
};

function readLanguage(): SiteLanguage { if (typeof window === "undefined") return "en"; const stored = window.localStorage.getItem("site-language") as SiteLanguage | null; return stored && copy[stored] ? stored : "en"; }

function TeamLogo({ team }: { team: string }) { return <span className="team-logo team-logo-sm" title={team} role="img" aria-label={team} />; }
function MatchGrid({ matches }: { matches: Match[] }) { return <div className="match-results-grid">{matches.map((match) => <article key={`${match.a}-${match.b}`}><time>{match.date} · {match.time}</time><div><span><TeamLogo team={match.a} />{match.a}</span><strong>{match.score ?? "VS"}</strong><span>{match.b}<TeamLogo team={match.b} /></span></div></article>)}</div>; }

export default function Predictions() {
  const [language, setLanguage] = useState<SiteLanguage>("en");
  useEffect(() => { setLanguage(readLanguage()); const onLanguage = (event: Event) => { const custom = event as CustomEvent<{ language?: SiteLanguage }>; setLanguage(custom.detail?.language && copy[custom.detail.language] ? custom.detail.language : readLanguage()); }; window.addEventListener("site-language-change", onLanguage); return () => window.removeEventListener("site-language-change", onLanguage); }, []);
  const t = copy[language];
  return <main className="site-shell predictions-page schedule-results-page">
    <section className="main-event-hero"><span className="eyebrow">{t.eyebrow}</span><h1>{t.title}</h1><p>{t.body}</p></section>
    <section className="schedule-section"><div className="section-title"><div><span className="eyebrow">{t.schedule}</span><h2>{t.schedule}</h2></div></div><div className="stage-timeline">{t.stages.map((stage) => <article key={stage.date}><strong>{stage.date}</strong><h3>{stage.title}</h3><p>{stage.body}</p></article>)}</div></section>
    <section className="results-section schedule-results"><div className="results-round upcoming-matches"><h3>Next matches · New York time</h3><MatchGrid matches={nextMatches} /></div><div className="section-title"><div><span className="eyebrow">{t.results}</span><h2>{t.results}</h2></div></div><div className="results-round"><h3>{t.roundOne}</h3><MatchGrid matches={roundOne} /></div><div className="results-round"><h3>{t.roundTwo}</h3><MatchGrid matches={roundTwo} /></div><p className="main-event-note">{t.upcoming}<br /><br />{t.note}</p></section>
  </main>;
}
