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

export default function Predictions() {
  const [language, setLanguage] = useState<Lang>("en");
  const [active, setActive] = useState<ModelKey>("historical");
  useEffect(() => { setLanguage(getLanguage()); const onChange = (event: Event) => { const lang = (event as CustomEvent<{ language?: Lang }>).detail?.language; setLanguage(lang && copy[lang] ? lang : getLanguage()); }; window.addEventListener("site-language-change", onChange); return () => window.removeEventListener("site-language-change", onChange); }, []);
  const t = copy[language]; const model = models[active];
  const picks = useMemo(() => (stage: Pick["stage"]) => model.picks.filter((pick) => pick.stage === stage), [model]);
  const sortedOdds = useMemo(() => [...teams].sort((a, b) => model.odds[b.team] - model.odds[a.team]), [model]);
  return <main className="site-shell predictions-page bracket-predictions-page">
    <section className="main-event-hero prediction-hero"><span className="eyebrow">{t.eyebrow}</span><h1>{t.title}</h1><p>{t.body}</p><div className="prediction-model-toggle" role="group" aria-label={t.method}><button className={active === "historical" ? "active" : ""} onClick={() => setActive("historical")}><strong>{t.historical}</strong><span>{models.historical.summary}</span></button><button className={active === "tiOnly" ? "active" : ""} onClick={() => setActive("tiOnly")}><strong>{t.tiOnly}</strong><span>{models.tiOnly.summary}</span></button></div>
    </section>
    <section className="prediction-bracket-section"><div className="section-title"><div><span className="eyebrow">{model.title}</span><h2>{t.bracket}</h2></div><p>{model.summary}</p></div><div className="bracket-model-board"><div className="bracket-model-upper"><h3>{t.upper}</h3><div className="bracket-model-grid"><div>{picks("upper1").map((pick) => <BracketCard key={pick.id} pick={pick} />)}</div><div>{picks("upper2").map((pick) => <BracketCard key={pick.id} pick={pick} />)}</div><div>{picks("upper3").map((pick) => <BracketCard key={pick.id} pick={pick} />)}</div></div></div><div className="bracket-model-lower"><h3>{t.lower}</h3><div className="bracket-model-grid"><div>{picks("lower1").map((pick) => <BracketCard key={pick.id} pick={pick} />)}</div><div>{picks("lower2").map((pick) => <BracketCard key={pick.id} pick={pick} />)}</div><div>{picks("lower3").map((pick) => <BracketCard key={pick.id} pick={pick} />)}</div></div></div><div className="bracket-model-final"><h3>{t.final}</h3>{picks("final").map((pick) => <BracketCard key={pick.id} pick={pick} />)}</div></div></section>
    <section className="prediction-odds-section"><div className="section-title"><div><span className="eyebrow">{t.odds}</span><h2>{t.odds}</h2></div></div><div className="prediction-odds-table"><div className="prediction-odds-head"><span>Team</span><span>{t.record}</span><span>{t.titleChance}</span><span>{t.delta}</span><span>{t.maps}</span></div>{sortedOdds.map((item) => { const old = models.historical.odds[item.team]; const diff = model.odds[item.team] - old; return <article key={item.team}><div><Logo team={item.team} /><strong>{item.team}</strong></div><span>{item.record} · {item.games}</span><b>{model.odds[item.team]}%</b><em className={diff >= 0 ? "up" : "down"}>{diff === 0 ? "—" : `${diff > 0 ? "+" : ""}${diff} pp`}</em><strong>{model.maps[item.team].toFixed(1)}</strong></article>; })}</div></section>
    <details className="group-stage-history"><summary><span>{t.finished}</span><small>{t.archive}</small></summary><div className="qualified-records">{teams.map((item) => <article key={item.team}><Logo team={item.team} /><span>{item.team}</span><b>{item.record}</b><small>{item.games} maps</small></article>)}</div></details>
  </main>;
}
