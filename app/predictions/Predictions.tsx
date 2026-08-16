"use client";

import { useEffect, useMemo, useState } from "react";

type Lang = "en" | "ru" | "es" | "zh";
type ModelKey = "historical" | "tiOnly";
type Team = "TEAM VISION" | "Nigma Galaxy" | "Team Liquid" | "Team Falcons" | "Team Yandex" | "Team Spirit" | "BoomBoys" | "Iron Wing";
type Pick = { id: string; stage: "upper1" | "upper2" | "upper3" | "lower1" | "lower2" | "lower3" | "final"; label: string; date: string; a: Team; b: Team; aChance: number; bChance: number; winner: Team };
type Model = { title: string; summary: string; odds: Record<Team, number>; maps: Record<Team, number>; picks: Pick[] };

const teams: Array<{ team: Team; record: string; games: string }> = [
  { team: "TEAM VISION", record: "4–0", games: "8–2" }, { team: "Nigma Galaxy", record: "4–1", games: "8–2" },
  { team: "Team Liquid", record: "4–1", games: "9–5" }, { team: "Iron Wing", record: "4–2", games: "10–6" },
  { team: "Team Falcons", record: "4–2", games: "10–7" }, { team: "Team Spirit", record: "4–2", games: "8–6" },
  { team: "Team Yandex", record: "3–3", games: "9–8" }, { team: "BoomBoys", record: "3–3", games: "7–7" }
];

const schedules = {
  qf1: "Aug 19 · 10:00 PM EDT · Bo3", qf2: "Aug 20 · 1:00 AM EDT · Bo3", qf3: "Aug 20 · 4:00 AM EDT · Bo3", qf4: "Aug 20 · 7:00 AM EDT · Bo3",
  upper: "Aug 21 · Bo3", lower: "Aug 21–23 · Bo3", final: "Aug 23 · Bo5"
};

const makePick = (id: string, stage: Pick["stage"], label: string, date: string, a: Team, b: Team, aChance: number, winner: Team): Pick => ({ id, stage, label, date, a, b, aChance, bChance: 100 - aChance, winner });
const models: Record<ModelKey, Model> = {
  historical: {
    title: "Pre-TI model", summary: "Ratings, results and team strength before TI. Group Stage is not used to move this model.",
    odds: { "TEAM VISION": 31, "Team Yandex": 20, "Team Falcons": 16, "BoomBoys": 13, "Team Spirit": 9, "Team Liquid": 7, "Iron Wing": 3, "Nigma Galaxy": 1 },
    maps: { "TEAM VISION": 11.2, "Team Yandex": 9.1, "Team Falcons": 9.4, "BoomBoys": 6.3, "Team Spirit": 8.6, "Team Liquid": 7.1, "Iron Wing": 5.2, "Nigma Galaxy": 4.1 },
    picks: [
      makePick("m1", "upper1", "M1 · Upper quarterfinal", schedules.qf1, "Iron Wing", "Team Spirit", 42, "Team Spirit"),
      makePick("m2", "upper1", "M2 · Upper quarterfinal", schedules.qf2, "TEAM VISION", "BoomBoys", 68, "TEAM VISION"),
      makePick("m3", "upper1", "M3 · Upper quarterfinal", schedules.qf3, "Team Liquid", "Team Yandex", 38, "Team Yandex"),
      makePick("m4", "upper1", "M4 · Upper quarterfinal", schedules.qf4, "Nigma Galaxy", "Team Falcons", 31, "Team Falcons"),
      makePick("m5", "upper2", "M5 · Upper semifinal", schedules.upper, "Team Spirit", "TEAM VISION", 25, "TEAM VISION"),
      makePick("m6", "upper2", "M6 · Upper semifinal", schedules.upper, "Team Yandex", "Team Falcons", 45, "Team Falcons"),
      makePick("m7", "upper3", "M7 · Upper final", schedules.upper, "TEAM VISION", "Team Falcons", 67, "TEAM VISION"),
      makePick("m8", "lower1", "M8 · Lower round 1", schedules.lower, "Iron Wing", "BoomBoys", 28, "BoomBoys"),
      makePick("m9", "lower1", "M9 · Lower round 1", schedules.lower, "Team Liquid", "Nigma Galaxy", 79, "Team Liquid"),
      makePick("m10", "lower2", "M10 · Lower round 2", schedules.lower, "BoomBoys", "Team Spirit", 37, "Team Spirit"),
      makePick("m11", "lower2", "M11 · Lower round 2", schedules.lower, "Team Liquid", "Team Yandex", 36, "Team Yandex"),
      makePick("m12", "lower3", "M12 · Lower semifinal", schedules.lower, "Team Spirit", "Team Yandex", 58, "Team Spirit"),
      makePick("m13", "lower3", "M13 · Lower final", schedules.lower, "Team Spirit", "Team Falcons", 39, "Team Falcons"),
      makePick("m14", "final", "M14 · Grand Final", schedules.final, "TEAM VISION", "Team Falcons", 67, "TEAM VISION")
    ]
  },
  tiOnly: {
    title: "TI 2026 only", summary: "Uses only series and map records already played at this TI. No pre-TI ratings are included.",
    odds: { "TEAM VISION": 41, "Nigma Galaxy": 16, "Team Liquid": 11, "Iron Wing": 10, "Team Spirit": 10, "Team Falcons": 6, "Team Yandex": 4, "BoomBoys": 2 },
    maps: { "TEAM VISION": 11.5, "Nigma Galaxy": 9.7, "Team Liquid": 8.6, "Iron Wing": 8.1, "Team Spirit": 7.9, "Team Falcons": 7.3, "Team Yandex": 6.8, "BoomBoys": 5.4 },
    picks: [
      makePick("m1", "upper1", "M1 · Upper quarterfinal", schedules.qf1, "Iron Wing", "Team Spirit", 51, "Iron Wing"),
      makePick("m2", "upper1", "M2 · Upper quarterfinal", schedules.qf2, "TEAM VISION", "BoomBoys", 77, "TEAM VISION"),
      makePick("m3", "upper1", "M3 · Upper quarterfinal", schedules.qf3, "Team Liquid", "Team Yandex", 55, "Team Liquid"),
      makePick("m4", "upper1", "M4 · Upper quarterfinal", schedules.qf4, "Nigma Galaxy", "Team Falcons", 57, "Nigma Galaxy"),
      makePick("m5", "upper2", "M5 · Upper semifinal", schedules.upper, "Iron Wing", "TEAM VISION", 31, "TEAM VISION"),
      makePick("m6", "upper2", "M6 · Upper semifinal", schedules.upper, "Team Liquid", "Nigma Galaxy", 44, "Nigma Galaxy"),
      makePick("m7", "upper3", "M7 · Upper final", schedules.upper, "TEAM VISION", "Nigma Galaxy", 68, "TEAM VISION"),
      makePick("m8", "lower1", "M8 · Lower round 1", schedules.lower, "Team Spirit", "BoomBoys", 63, "Team Spirit"),
      makePick("m9", "lower1", "M9 · Lower round 1", schedules.lower, "Team Yandex", "Team Falcons", 42, "Team Falcons"),
      makePick("m10", "lower2", "M10 · Lower round 2", schedules.lower, "Team Spirit", "Iron Wing", 43, "Iron Wing"),
      makePick("m11", "lower2", "M11 · Lower round 2", schedules.lower, "Team Falcons", "Team Liquid", 45, "Team Liquid"),
      makePick("m12", "lower3", "M12 · Lower semifinal", schedules.lower, "Iron Wing", "Team Liquid", 54, "Iron Wing"),
      makePick("m13", "lower3", "M13 · Lower final", schedules.lower, "Iron Wing", "Nigma Galaxy", 39, "Nigma Galaxy"),
      makePick("m14", "final", "M14 · Grand Final", schedules.final, "TEAM VISION", "Nigma Galaxy", 68, "TEAM VISION")
    ]
  }
};

const copy: Record<Lang, Record<string, string>> = {
  en: { eyebrow: "THE INTERNATIONAL 2026", title: "Main Event Predictions", body: "Two reads of the same eight-team bracket: the old strength model and a clean read from this TI only.", historical: "Pre-TI strength", tiOnly: "TI 2026 only", bracket: "Predicted playoff bracket", upper: "Upper bracket", lower: "Lower bracket", final: "Grand Final", odds: "Team odds", record: "TI record", titleChance: "Title", maps: "Maps ahead", delta: "vs pre-TI", method: "Model basis", finished: "Elimination Round · finished", archive: "Group Stage record", oldModel: "Before TI", tiModel: "This TI only" },
  ru: { eyebrow: "THE INTERNATIONAL 2026", title: "Предикшны Main Event", body: "Два взгляда на одну сетку из восьми команд: старая модель силы и чистая оценка только по этому TI.", historical: "Сила до TI", tiOnly: "Только TI 2026", bracket: "Прогнозная сетка плей-офф", upper: "Верхняя сетка", lower: "Нижняя сетка", final: "Гранд-финал", odds: "Шансы команд", record: "Рекорд на TI", titleChance: "Титул", maps: "Карт впереди", delta: "к модели до TI", method: "Основа модели", finished: "Раунд на вылет · завершён", archive: "Рекорды группового этапа", oldModel: "До TI", tiModel: "Только этот TI" },
  es: { eyebrow: "THE INTERNATIONAL 2026", title: "Predicciones del Evento Principal", body: "Dos lecturas del mismo cuadro de ocho equipos: el modelo histórico y una lectura limpia de este TI solamente.", historical: "Fuerza antes de TI", tiOnly: "Solo TI 2026", bracket: "Cuadro previsto de playoffs", upper: "Cuadro superior", lower: "Cuadro inferior", final: "Gran Final", odds: "Probabilidades de equipos", record: "Registro en TI", titleChance: "Título", maps: "Mapas por delante", delta: "vs. antes de TI", method: "Base del modelo", finished: "Ronda de eliminación · finalizada", archive: "Registros de la fase de grupos", oldModel: "Antes de TI", tiModel: "Solo este TI" },
  zh: { eyebrow: "THE INTERNATIONAL 2026", title: "主赛事预测", body: "同一八队对阵表的两种预测：赛前实力模型与仅基于本届 TI 的独立模型。", historical: "TI 前实力", tiOnly: "仅 TI 2026", bracket: "预测季后赛对阵表", upper: "胜者组", lower: "败者组", final: "总决赛", odds: "队伍概率", record: "TI 战绩", titleChance: "夺冠", maps: "预计地图数", delta: "与赛前相比", method: "模型依据", finished: "淘汰轮 · 已结束", archive: "小组赛战绩", oldModel: "TI 前", tiModel: "仅本届 TI" }
};

function getLanguage(): Lang { if (typeof window === "undefined") return "en"; const saved = window.localStorage.getItem("site-language") as Lang | null; return saved && copy[saved] ? saved : "en"; }
function Logo({ team }: { team: Team }) { return <span className="team-logo team-logo-sm" title={team} role="img" aria-label={team} />; }
function BracketCard({ pick }: { pick: Pick }) { return <article className="prediction-bracket-card"><header><small>{pick.label}</small><time>{pick.date}</time></header><div className={pick.winner === pick.a ? "predicted-winner" : ""}><span><Logo team={pick.a} />{pick.a}</span><b>{pick.aChance}</b></div><div className={pick.winner === pick.b ? "predicted-winner" : ""}><span><Logo team={pick.b} />{pick.b}</span><b>{pick.bChance}</b></div></article>; }

type MatchId = "m1" | "m2" | "m3" | "m4" | "m5" | "m6" | "m7" | "m8" | "m9" | "m10" | "m11" | "m12" | "m13" | "m14";
type InteractiveMatch = { id: MatchId; stage: "upper1" | "upper2" | "upper3" | "lower1" | "lower2" | "lower3" | "final"; label: string; date: string; points: number; teams: [Team | null, Team | null] };

const matchMeta: Record<MatchId, Omit<InteractiveMatch, "teams">> = {
  m1: { id: "m1", stage: "upper1", label: "M1 · Upper quarterfinal", date: schedules.qf1, points: 100 },
  m2: { id: "m2", stage: "upper1", label: "M2 · Upper quarterfinal", date: schedules.qf2, points: 100 },
  m3: { id: "m3", stage: "upper1", label: "M3 · Upper quarterfinal", date: schedules.qf3, points: 100 },
  m4: { id: "m4", stage: "upper1", label: "M4 · Upper quarterfinal", date: schedules.qf4, points: 100 },
  m5: { id: "m5", stage: "upper2", label: "M5 · Upper semifinal", date: schedules.upper, points: 130 },
  m6: { id: "m6", stage: "upper2", label: "M6 · Upper semifinal", date: schedules.upper, points: 130 },
  m7: { id: "m7", stage: "upper3", label: "M7 · Upper final", date: schedules.upper, points: 170 },
  m8: { id: "m8", stage: "lower1", label: "M8 · Lower round 1", date: schedules.lower, points: 110 },
  m9: { id: "m9", stage: "lower1", label: "M9 · Lower round 1", date: schedules.lower, points: 110 },
  m10: { id: "m10", stage: "lower2", label: "M10 · Lower round 2", date: schedules.lower, points: 140 },
  m11: { id: "m11", stage: "lower2", label: "M11 · Lower round 2", date: schedules.lower, points: 140 },
  m12: { id: "m12", stage: "lower3", label: "M12 · Lower semifinal", date: schedules.lower, points: 180 },
  m13: { id: "m13", stage: "lower3", label: "M13 · Lower final", date: schedules.lower, points: 220 },
  m14: { id: "m14", stage: "final", label: "M14 · Grand Final", date: schedules.final, points: 320 }
};

function defaultSelections(key: ModelKey): Partial<Record<MatchId, Team>> { return Object.fromEntries(models[key].picks.map((pick) => [pick.id as MatchId, pick.winner])) as Partial<Record<MatchId, Team>>; }

function buildInteractiveBracket(selections: Partial<Record<MatchId, Team>>): InteractiveMatch[] {
  const matches = new Map<MatchId, InteractiveMatch>();
  const add = (id: MatchId, teams: [Team | null, Team | null]) => matches.set(id, { ...matchMeta[id], teams });
  const winner = (id: MatchId) => { const match = matches.get(id); const choice = selections[id]; return match && choice && match.teams.includes(choice) ? choice : null; };
  const loser = (id: MatchId) => { const match = matches.get(id); const won = winner(id); return match && won ? match.teams.find((team) => team && team !== won) ?? null : null; };
  add("m1", ["Iron Wing", "Team Spirit"]); add("m2", ["TEAM VISION", "BoomBoys"]); add("m3", ["Team Liquid", "Team Yandex"]); add("m4", ["Nigma Galaxy", "Team Falcons"]);
  add("m5", [winner("m1"), winner("m2")]); add("m6", [winner("m3"), winner("m4")]); add("m7", [winner("m5"), winner("m6")]);
  add("m8", [loser("m1"), loser("m2")]); add("m9", [loser("m3"), loser("m4")]); add("m10", [loser("m5"), winner("m8")]); add("m11", [loser("m6"), winner("m9")]); add("m12", [winner("m10"), winner("m11")]); add("m13", [winner("m12"), loser("m7")]); add("m14", [winner("m7"), winner("m13")]);
  return Array.from(matches.values());
}

function InteractiveMatchCard({ match, selected, onPick }: { match: InteractiveMatch; selected?: Team; onPick: (id: MatchId, team: Team) => void }) {
  return <article className="prediction-bracket-card interactive-match-card"><header><small>{match.label}</small><time>{match.date}</time></header>{match.teams.map((team, index) => <button key={team ?? `open-${match.id}-${index}`} type="button" disabled={!team} className={selected === team ? "picked-team" : ""} onClick={() => team && onPick(match.id, team)}>{team ? <><span><Logo team={team} />{team}</span>{selected === team && <b>✓</b>}</> : <span>Winner of previous match</span>}</button>)}</article>;
}

function InteractivePredictionBoard({ language }: { language: Lang }) {
  const [active, setActive] = useState<ModelKey>("historical");
  const [selections, setSelections] = useState<Partial<Record<MatchId, Team>>>(() => defaultSelections("historical"));
  const t = copy[language]; const model = models[active];
  const bracket = useMemo(() => buildInteractiveBracket(selections), [selections]);
  const validPicks = bracket.filter((match) => selections[match.id] && match.teams.includes(selections[match.id] as Team));
  const expected = validPicks.reduce((sum, match) => { const picked = selections[match.id] as Team; const [a, b] = match.teams as [Team, Team]; return sum + match.points * model.odds[picked] / (model.odds[a] + model.odds[b]); }, 0);
  const correct = validPicks.reduce((sum, match) => { const picked = selections[match.id] as Team; const [a, b] = match.teams as [Team, Team]; return sum + model.odds[picked] / (model.odds[a] + model.odds[b]); }, 0);
  const maxPoints = validPicks.reduce((sum, match) => sum + match.points, 0);
  const byStage = (stage: InteractiveMatch["stage"]) => bracket.filter((match) => match.stage === stage);
  const score = Math.round(expected).toLocaleString(language === "ru" ? "ru-RU" : "en-US");
  return <main className="site-shell predictions-page bracket-predictions-page">
    <section className="main-event-hero prediction-hero"><span className="eyebrow">{t.eyebrow}</span><h1>{t.title}</h1><p>{language === "ru" ? "Нажмите на команду в каждом матче — сетка продолжится автоматически, а расчёт справа обновится сразу." : "Click a team in each match. The bracket advances automatically and the score estimate updates immediately."}</p><div className="prediction-model-toggle" role="group" aria-label={t.method}><button type="button" aria-pressed={active === "historical"} className={active === "historical" ? "active" : ""} onClick={() => setActive("historical")}><strong>{t.historical}</strong><span>{models.historical.summary}</span></button><button type="button" aria-pressed={active === "tiOnly"} className={active === "tiOnly" ? "active" : ""} onClick={() => setActive("tiOnly")}><strong>{t.tiOnly}</strong><span>{models.tiOnly.summary}</span></button></div></section>
    <section className="prediction-bracket-section"><div className="section-title"><div><span className="eyebrow">{model.title}</span><h2>{language === "ru" ? "Ваша прогнозная сетка" : "Your prediction bracket"}</h2></div><div className="prediction-actions"><button type="button" onClick={() => setSelections(defaultSelections(active))}>{language === "ru" ? "Взять прогноз модели" : "Use model picks"}</button><button type="button" onClick={() => setSelections({})}>{language === "ru" ? "Очистить" : "Clear picks"}</button></div></div><div className="prediction-interactive-layout"><div className="bracket-model-board"><div className="bracket-model-upper"><h3>{t.upper}</h3><div className="bracket-model-grid">{["upper1", "upper2", "upper3"].map((stage) => <div key={stage}>{byStage(stage as InteractiveMatch["stage"]).map((match) => <InteractiveMatchCard key={match.id} match={match} selected={selections[match.id]} onPick={(id, team) => setSelections((current) => ({ ...current, [id]: team }))} />)}</div>)}</div></div><div className="bracket-model-lower"><h3>{t.lower}</h3><div className="bracket-model-grid">{["lower1", "lower2", "lower3"].map((stage) => <div key={stage}>{byStage(stage as InteractiveMatch["stage"]).map((match) => <InteractiveMatchCard key={match.id} match={match} selected={selections[match.id]} onPick={(id, team) => setSelections((current) => ({ ...current, [id]: team }))} />)}</div>)}</div></div><div className="bracket-model-final"><h3>{t.final}</h3>{byStage("final").map((match) => <InteractiveMatchCard key={match.id} match={match} selected={selections[match.id]} onPick={(id, team) => setSelections((current) => ({ ...current, [id]: team }))} />)}</div></div><aside className="prediction-score-panel"><span>{language === "ru" ? "ОЖИДАЕМЫЙ РЕЗУЛЬТАТ" : "EXPECTED RESULT"}</span><strong>{score}</strong><p>{language === "ru" ? "очков в среднем по выбранной сетке" : "points on average for your bracket"}</p><div><article><small>{language === "ru" ? "Верных прогнозов" : "Correct picks"}</small><b>{correct.toFixed(1)} / 14</b></article><article><small>{language === "ru" ? "Выбрано матчей" : "Matches picked"}</small><b>{validPicks.length} / 14</b></article><article><small>{language === "ru" ? "Если всё зайдёт" : "If all hit"}</small><b>{maxPoints.toLocaleString()}</b></article></div><p className="score-model-note">{language === "ru" ? `Расчёт по модели: ${active === "historical" ? "сила до TI" : "только матчи этого TI"}.` : `Calculated with: ${active === "historical" ? "pre-TI strength" : "TI 2026 only"}.`}</p></aside></div></section>
  </main>;
}

export default function Predictions() {
  const [language, setLanguage] = useState<Lang>("en");
  useEffect(() => { setLanguage(getLanguage()); const onChange = (event: Event) => { const lang = (event as CustomEvent<{ language?: Lang }>).detail?.language; setLanguage(lang && copy[lang] ? lang : getLanguage()); }; window.addEventListener("site-language-change", onChange); return () => window.removeEventListener("site-language-change", onChange); }, []);
  return <InteractivePredictionBoard language={language} />;
}
