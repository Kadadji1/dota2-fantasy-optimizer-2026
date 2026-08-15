"use client";

import { useEffect, useState } from "react";

type SiteLanguage = "en" | "ru" | "es" | "zh";
type Match = { a: string; score?: string; b: string; date: string; time: string };
type Copy = { eyebrow: string; title: string; body: string; live: string; updated: string; schedule: string; nextMatches: string; mainEvent: string; mainEventBody: string; bracketStatus: string; results: string; resultsSummary: string; roundOne: string; roundTwo: string; roundThree: string; roundFour: string; roundFive: string; upcoming: string; note: string; stages: Array<{ date: string; title: string; body: string }> };

const updatedAt = "Aug 15, 2026 · 1:15 PM EDT";
const roundOne: Match[] = [
  { a: "Team Falcons", score: "2–1", b: "LGD Gaming", date: "Aug 12", time: "10:49 PM EDT" }, { a: "TEAM VISION", score: "2–1", b: "Team Resilience", date: "Aug 12", time: "11:13 PM EDT" },
  { a: "Iron Wing", score: "2–0", b: "Nigma Galaxy", date: "Aug 12", time: "11:18 PM EDT" }, { a: "BoomBoys", score: "2–0", b: "OG", date: "Aug 12", time: "11:24 PM EDT" },
  { a: "Team Liquid", score: "2–0", b: "Vici Gaming", date: "Aug 13", time: "1:56 AM EDT" }, { a: "Aurora Gaming", score: "2–0", b: "GamerLegion", date: "Aug 13", time: "2:01 AM EDT" },
  { a: "Team Spirit", score: "2–0", b: "Xtreme Gaming", date: "Aug 13", time: "2:48 AM EDT" }, { a: "Team Yandex", score: "2–0", b: "HULIGANI", date: "Aug 13", time: "3:16 AM EDT" }
];
const roundTwo: Match[] = [
  { a: "BoomBoys", score: "2–1", b: "Iron Wing", date: "Aug 13", time: "4:43 AM EDT" }, { a: "LGD Gaming", score: "2–1", b: "Team Resilience", date: "Aug 13", time: "5:13 AM EDT" },
  { a: "Nigma Galaxy", score: "2–0", b: "OG", date: "Aug 13", time: "5:32 AM EDT" }, { a: "TEAM VISION", score: "2–1", b: "Team Falcons", date: "Aug 13", time: "6:06 AM EDT" },
  { a: "HULIGANI", score: "1–2", b: "Vici Gaming", date: "Aug 13", time: "10:00 PM EDT" }, { a: "Xtreme Gaming", score: "0–2", b: "GamerLegion", date: "Aug 13", time: "10:01 PM EDT" },
  { a: "Team Yandex", score: "1–2", b: "Team Liquid", date: "Aug 13", time: "10:02 PM EDT" }, { a: "Team Spirit", score: "2–0", b: "Aurora Gaming", date: "Aug 13", time: "10:02 PM EDT" }
];
const roundThree: Match[] = [
  { a: "LGD Gaming", score: "0–2", b: "Nigma Galaxy", date: "Aug 14", time: "12:11 AM EDT" }, { a: "BoomBoys", score: "0–2", b: "TEAM VISION", date: "Aug 14", time: "12:33 AM EDT" },
  { a: "Iron Wing", score: "2–1", b: "Team Falcons", date: "Aug 14", time: "1:47 AM EDT" }, { a: "Team Resilience", score: "2–0", b: "OG", date: "Aug 14", time: "2:10 AM EDT" },
  { a: "Vici Gaming", score: "2–1", b: "GamerLegion", date: "Aug 14", time: "3:04 AM EDT" }, { a: "Team Liquid", score: "1–2", b: "Team Spirit", date: "Aug 14", time: "3:26 AM EDT" },
  { a: "Xtreme Gaming", score: "2–0", b: "HULIGANI", date: "Aug 14", time: "4:36 AM EDT" }, { a: "Aurora Gaming", score: "2–1", b: "Team Yandex", date: "Aug 14", time: "6:24 AM EDT" }
];
const roundFour: Match[] = [
  { a: "OG", score: "2–1", b: "HULIGANI", date: "Aug 14", time: "10:00 PM EDT" }, { a: "LGD Gaming", score: "2–1", b: "Xtreme Gaming", date: "Aug 14", time: "10:00 PM EDT" },
  { a: "Team Falcons", score: "2–1", b: "GamerLegion", date: "Aug 14", time: "10:00 PM EDT" }, { a: "Team Resilience", score: "1–2", b: "Team Yandex", date: "Aug 14", time: "10:00 PM EDT" },
  { a: "TEAM VISION", score: "2–0", b: "Team Spirit", date: "Aug 15", time: "1:00 AM EDT" }, { a: "Iron Wing", score: "1–2", b: "Team Liquid", date: "Aug 15", time: "1:00 AM EDT" },
  { a: "BoomBoys", score: "0–2", b: "Aurora Gaming", date: "Aug 15", time: "1:00 AM EDT" }, { a: "Nigma Galaxy", score: "2–0", b: "Vici Gaming", date: "Aug 15", time: "1:00 AM EDT" }
];
const roundFive: Match[] = [
  { a: "Team Liquid", score: "2–1", b: "Aurora Gaming", date: "Aug 15", time: "4:00 AM EDT" }, { a: "Nigma Galaxy", score: "2–0", b: "Team Spirit", date: "Aug 15", time: "4:00 AM EDT" },
  { a: "Iron Wing", score: "2–1", b: "Team Yandex", date: "Aug 15", time: "4:00 AM EDT" }, { a: "Team Falcons", score: "2–1", b: "BoomBoys", date: "Aug 15", time: "4:00 AM EDT" },
  { a: "LGD Gaming", score: "2–0", b: "Vici Gaming", date: "Aug 15", time: "7:00 AM EDT" }, { a: "Team Resilience", score: "2–0", b: "Xtreme Gaming", date: "Aug 15", time: "7:00 AM EDT" },
  { a: "GamerLegion", score: "2–0", b: "OG", date: "Aug 15", time: "7:00 AM EDT" }
];
const nextMatches: Match[] = [
  { a: "Team Falcons", b: "Vici Gaming", date: "Aug 15", time: "10:00 PM EDT" }, { a: "Aurora Gaming", b: "BoomBoys", date: "Aug 15", time: "10:00 PM EDT" },
  { a: "Team Spirit", b: "Team Resilience", date: "Aug 16", time: "1:00 AM EDT" }, { a: "Iron Wing", b: "GamerLegion", date: "Aug 16", time: "1:00 AM EDT" },
  { a: "LGD Gaming", b: "Team Yandex", date: "Aug 16", time: "4:00 AM EDT" }
];

const copy: Record<SiteLanguage, Copy> = {
  en: { eyebrow: "THE INTERNATIONAL 2026", title: "TI2026 Tournament Hub", body: "The Swiss Stage is complete. TEAM VISION, Nigma Galaxy, and Team Liquid have secured Main Event places; five elimination series decide the remaining teams.", live: "ELIMINATION ROUND · NEXT", updated: "Last updated", schedule: "Tournament schedule", nextMatches: "Elimination round · New York time", mainEvent: "Main Event hub", mainEventBody: "Three Main Event places are secured. The full eight-team double-elimination bracket appears as soon as the five elimination series conclude.", bracketStatus: "Bracket pending · August 20–23", results: "Group Stage results", resultsSummary: "Show completed Swiss Stage series", roundOne: "Swiss round 1", roundTwo: "Swiss round 2", roundThree: "Swiss round 3", roundFour: "Swiss round 4", roundFive: "Swiss round 5", upcoming: "Swiss Stage complete. Five elimination series determine the final Main Event places.", note: "All listed series are best of three. Main Event runs August 20–23; every series is Bo3 except the Bo5 Grand Final.", stages: [{ date: "AUG 12–15", title: "Swiss rounds 1–5", body: "Completed · results below" }, { date: "AUG 15–16", title: "Elimination round", body: "Five series decide the last Main Event places" }, { date: "AUG 20–23", title: "Main Event", body: "Double-elimination playoffs in Shanghai" }] },
  ru: { eyebrow: "THE INTERNATIONAL 2026", title: "Турнирный центр TI2026", body: "Швейцарский этап завершён. TEAM VISION, Nigma Galaxy и Team Liquid уже вышли в Main Event; ещё пять серий определят остальных участников.", live: "РАУНД НА ВЫЛЕТ · СЛЕДУЮЩИЙ", updated: "Обновлено", schedule: "Расписание турнира", nextMatches: "Раунд на вылет · время Нью-Йорка", mainEvent: "Центр Main Event", mainEventBody: "Три места Main Event уже заняты. Полная сетка double-elimination из восьми команд появится после пяти серий на вылет.", bracketStatus: "Сетка ожидается · 20–23 августа", results: "Итоги группового этапа", resultsSummary: "Показать сыгранные серии швейцарского этапа", roundOne: "Швейцарский раунд 1", roundTwo: "Швейцарский раунд 2", roundThree: "Швейцарский раунд 3", roundFour: "Швейцарский раунд 4", roundFive: "Швейцарский раунд 5", upcoming: "Швейцарский этап завершён. Пять серий на вылет определят последние места Main Event.", note: "Все указанные серии — BO3. Main Event пройдёт 20–23 августа: все серии BO3, кроме гранд-финала BO5.", stages: [{ date: "12–15 АВГ", title: "Швейцарские раунды 1–5", body: "Завершены · результаты ниже" }, { date: "15–16 АВГ", title: "Раунд на вылет", body: "Пять серий определят последние места Main Event" }, { date: "20–23 АВГ", title: "Main Event", body: "Плей-офф с двойным выбыванием в Шанхае" }] },
  es: { eyebrow: "THE INTERNATIONAL 2026", title: "Centro del torneo TI2026", body: "La fase suiza terminó. TEAM VISION, Nigma Galaxy y Team Liquid ya tienen plaza en el Evento Principal; cinco series de eliminación deciden los equipos restantes.", live: "RONDA DE ELIMINACIÓN · PRÓXIMA", updated: "Actualizado", schedule: "Calendario del torneo", nextMatches: "Ronda de eliminación · hora de Nueva York", mainEvent: "Centro del Evento Principal", mainEventBody: "Tres plazas del Evento Principal ya están aseguradas. El cuadro de doble eliminación de ocho equipos aparecerá tras las cinco series de eliminación.", bracketStatus: "Cuadro pendiente · 20–23 de agosto", results: "Resultados de la fase de grupos", resultsSummary: "Mostrar series completadas de la fase suiza", roundOne: "Ronda suiza 1", roundTwo: "Ronda suiza 2", roundThree: "Ronda suiza 3", roundFour: "Ronda suiza 4", roundFive: "Ronda suiza 5", upcoming: "Fase suiza completada. Cinco series de eliminación deciden las últimas plazas del Evento Principal.", note: "Todas las series mostradas son al mejor de tres. El Evento Principal se juega del 20 al 23 de agosto; la Gran Final es la única al mejor de cinco.", stages: [{ date: "12–15 AGO", title: "Rondas suizas 1–5", body: "Completadas · resultados abajo" }, { date: "15–16 AGO", title: "Ronda de eliminación", body: "Cinco series deciden las últimas plazas" }, { date: "20–23 AGO", title: "Evento Principal", body: "Playoffs de doble eliminación en Shanghái" }] },
  zh: { eyebrow: "THE INTERNATIONAL 2026", title: "TI2026 赛事中心", body: "瑞士轮已结束。TEAM VISION、Nigma Galaxy 和 Team Liquid 已锁定主赛事席位；剩余队伍由五场淘汰赛决定。", live: "淘汰轮 · 即将开始", updated: "最后更新", schedule: "赛事日程", nextMatches: "淘汰轮 · 纽约时间", mainEvent: "主赛事中心", mainEventBody: "三个主赛事席位已确定。五场淘汰赛结束后将公布完整的八队双败淘汰赛对阵表。", bracketStatus: "对阵表待定 · 8月20–23日", results: "小组赛赛果", resultsSummary: "查看已结束的瑞士轮系列赛", roundOne: "瑞士轮第 1 轮", roundTwo: "瑞士轮第 2 轮", roundThree: "瑞士轮第 3 轮", roundFour: "瑞士轮第 4 轮", roundFive: "瑞士轮第 5 轮", upcoming: "瑞士轮已结束。五场淘汰赛将决定最后的主赛事席位。", note: "列出的系列赛均为三局两胜。主赛事为 8 月 20–23 日；除五局三胜总决赛外均为 BO3。", stages: [{ date: "8月12–15日", title: "瑞士轮第 1–5 轮", body: "已完成 · 赛果见下方" }, { date: "8月15–16日", title: "淘汰轮", body: "五场系列赛决定最后的主赛事名额" }, { date: "8月20–23日", title: "主赛事", body: "上海双败淘汰赛" }] }
};

function readLanguage(): SiteLanguage { if (typeof window === "undefined") return "en"; const stored = window.localStorage.getItem("site-language") as SiteLanguage | null; return stored && copy[stored] ? stored : "en"; }
function TeamLogo({ team }: { team: string }) { return <span className="team-logo team-logo-sm" title={team} role="img" aria-label={team} />; }
function MatchGrid({ matches }: { matches: Match[] }) { return <div className="match-results-grid">{matches.map((match) => <article key={`${match.a}-${match.b}`}><time>{match.date} · {match.time}</time><div><span><TeamLogo team={match.a} />{match.a}</span><strong>{match.score ?? "VS"}</strong><span>{match.b}<TeamLogo team={match.b} /></span></div></article>)}</div>; }

export default function Predictions() {
  const [language, setLanguage] = useState<SiteLanguage>("en");
  useEffect(() => { setLanguage(readLanguage()); const onLanguage = (event: Event) => { const custom = event as CustomEvent<{ language?: SiteLanguage }>; setLanguage(custom.detail?.language && copy[custom.detail.language] ? custom.detail.language : readLanguage()); }; window.addEventListener("site-language-change", onLanguage); return () => window.removeEventListener("site-language-change", onLanguage); }, []);
  const t = copy[language];
  return <main className="site-shell predictions-page schedule-results-page">
    <section className="main-event-hero hub-hero"><div className="hub-status"><span>{t.live}</span><time>{t.updated} · {updatedAt}</time></div><span className="eyebrow">{t.eyebrow}</span><h1>{t.title}</h1><p>{t.body}</p></section>
    <section className="schedule-section"><div className="section-title"><div><span className="eyebrow">{t.nextMatches}</span><h2>{t.nextMatches}</h2></div></div><div className="results-round upcoming-matches"><MatchGrid matches={nextMatches} /></div></section>
    <section className="main-event-hub-card"><div><span className="eyebrow">{t.mainEvent}</span><h2>{t.mainEvent}</h2><p>{t.mainEventBody}</p></div><strong>{t.bracketStatus}</strong></section>
    <section className="schedule-section"><div className="section-title"><div><span className="eyebrow">{t.schedule}</span><h2>{t.schedule}</h2></div></div><div className="stage-timeline">{t.stages.map((stage) => <article key={stage.date}><strong>{stage.date}</strong><h3>{stage.title}</h3><p>{stage.body}</p></article>)}</div></section>
    <details className="group-stage-history"><summary><span>{t.results}</span><small>{t.resultsSummary}</small></summary><section className="results-section schedule-results"><div className="results-round"><h3>{t.roundOne}</h3><MatchGrid matches={roundOne} /></div><div className="results-round"><h3>{t.roundTwo}</h3><MatchGrid matches={roundTwo} /></div><div className="results-round"><h3>{t.roundThree}</h3><MatchGrid matches={roundThree} /></div><div className="results-round"><h3>{t.roundFour}</h3><MatchGrid matches={roundFour} /></div><div className="results-round"><h3>{t.roundFive}</h3><MatchGrid matches={roundFive} /></div><p className="main-event-note">{t.upcoming}<br /><br />{t.note}</p></section></details>
  </main>;
}
