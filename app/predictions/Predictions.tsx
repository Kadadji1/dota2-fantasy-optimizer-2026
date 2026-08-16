"use client";

import { useEffect, useMemo, useState } from "react";

type Lang = "en" | "ru" | "es" | "zh";
type ModelKey = "historical" | "tiOnly";
type Team = "TEAM VISION" | "Nigma Galaxy" | "Team Liquid" | "Team Falcons" | "Team Yandex" | "Team Spirit" | "BoomBoys" | "Iron Wing";
type Pick = { id: string; stage: "upper1" | "upper2" | "upper3" | "lower1" | "lower2" | "lower3" | "final"; label: string; date: string; a: Team; b: Team; aChance: number; bChance: number; winner: Team };
type PlacementOdds = Record<"1" | "2" | "3" | "4" | "5-6" | "7-8", number>;
type Model = { title: string; summary: string; odds: Record<Team, number>; placements: Record<Team, PlacementOdds>; maps: Record<Team, number>; picks: Pick[] };

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
    title: "Balanced model", summary: "Balances season strength with this TI's Group Stage results.",
    odds: { "TEAM VISION": 43, "Team Liquid": 12, "Iron Wing": 10, "Team Falcons": 9.3, "Team Yandex": 8, "Nigma Galaxy": 6.2, "Team Spirit": 6, "BoomBoys": 5.3 },
    placements: {
      "TEAM VISION": { "1": 43, "2": 16, "3": 11, "4": 8.6, "5-6": 13, "7-8": 8.7 }, "Team Liquid": { "1": 12, "2": 16, "3": 15, "4": 12, "5-6": 24, "7-8": 20 },
      "Iron Wing": { "1": 10, "2": 13, "3": 13, "4": 15, "5-6": 27, "7-8": 22 }, "Team Falcons": { "1": 9.3, "2": 14, "3": 14, "4": 12, "5-6": 26, "7-8": 24 },
      "Team Yandex": { "1": 8, "2": 12, "3": 13, "4": 12, "5-6": 27, "7-8": 28 }, "Nigma Galaxy": { "1": 6.2, "2": 11, "3": 13, "4": 13, "5-6": 28, "7-8": 28 },
      "Team Spirit": { "1": 6, "2": 9.1, "3": 11, "4": 13, "5-6": 29, "7-8": 31 }, "BoomBoys": { "1": 5.3, "2": 8, "3": 9.2, "4": 14, "5-6": 26, "7-8": 38 }
    },
    maps: { "TEAM VISION": 11.1, "Team Liquid": 9.5, "Iron Wing": 9.2, "Team Falcons": 9.1, "Team Yandex": 8.8, "Nigma Galaxy": 8.6, "Team Spirit": 8.4, "BoomBoys": 8 },
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
    title: "TI 2026 only", summary: "Uses only series and maps already played at this TI.",
    odds: { "TEAM VISION": 50, "Team Liquid": 12, "Iron Wing": 10, "Team Yandex": 7.5, "Nigma Galaxy": 6.7, "Team Falcons": 6.3, "Team Spirit": 3.8, "BoomBoys": 3.6 },
    placements: {
      "TEAM VISION": { "1": 50, "2": 15, "3": 10, "4": 7.5, "5-6": 11, "7-8": 6.3 }, "Team Liquid": { "1": 12, "2": 18, "3": 15, "4": 12, "5-6": 23, "7-8": 19 },
      "Iron Wing": { "1": 10, "2": 14, "3": 14, "4": 15, "5-6": 27, "7-8": 19 }, "Team Yandex": { "1": 7.5, "2": 13, "3": 13, "4": 12, "5-6": 27, "7-8": 27 },
      "Nigma Galaxy": { "1": 6.7, "2": 13, "3": 14, "4": 13, "5-6": 27, "7-8": 26 }, "Team Falcons": { "1": 6.3, "2": 13, "3": 14, "4": 13, "5-6": 27, "7-8": 28 },
      "Team Spirit": { "1": 3.8, "2": 7.7, "3": 11, "4": 14, "5-6": 31, "7-8": 33 }, "BoomBoys": { "1": 3.6, "2": 6.7, "3": 8.3, "4": 14, "5-6": 27, "7-8": 41 }
    },
    maps: { "TEAM VISION": 11.3, "Team Liquid": 9.6, "Iron Wing": 9.4, "Team Yandex": 8.8, "Nigma Galaxy": 8.8, "Team Falcons": 8.7, "Team Spirit": 8.1, "BoomBoys": 7.7 },
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
  en: { eyebrow: "THE INTERNATIONAL 2026", title: "Main Event Predictions", historical: "Balanced", tiOnly: "TI 2026 only", upper: "Upper bracket", lower: "Lower bracket", method: "Model basis", instruction: "Start with either model, then click any team to build your own bracket. Match odds and expected points update instantly.", balancedBasis: "Season strength + this TI", tiBasis: "Matches from this TI only", yourBracket: "Your prediction bracket", useModel: "Use model picks", clear: "Clear picks", roundNav: "Bracket round", expected: "EXPECTED RESULT", expectedPoints: "points on average for your bracket", correct: "Correct picks", picked: "Matches picked", allHit: "If all hit", poolNote: "Official pool: 1 correct pick = 120, 14 = 12,000.", schedule: "Main Event schedule", scheduleIntro: "All times are shown in New York time (EDT). Opening matchups are confirmed; later opponents depend on bracket results.", opening: "Opening matches", later: "Later rounds", simulation: "BRACKET SIMULATION", teamOdds: "Team finish odds", oddsIntro: "Probability of each finishing position under the selected model.", team: "Team", mapsAhead: "Maps ahead", titlePlace: "Title", place: "Place", mapsShort: "maps", rounding: "Figures are rounded, so a row may differ slightly from 100%.", methodNote: "Percentages are model estimates based on relative team strength, not bookmaker odds." },
  ru: { eyebrow: "THE INTERNATIONAL 2026", title: "Прогнозы Main Event", historical: "Сбалансированно", tiOnly: "Только TI 2026", upper: "Верхняя сетка", lower: "Нижняя сетка", method: "Основа модели", instruction: "Выберите одну из моделей, а затем нажимайте на команды, чтобы собрать собственную сетку. Шансы и ожидаемые очки пересчитываются сразу.", balancedBasis: "Сезонная сила + этот TI", tiBasis: "Только матчи этого TI", yourBracket: "Ваша прогнозная сетка", useModel: "Взять прогноз модели", clear: "Очистить", roundNav: "Раунд сетки", expected: "ОЖИДАЕМЫЙ РЕЗУЛЬТАТ", expectedPoints: "очков в среднем по выбранной сетке", correct: "Верных прогнозов", picked: "Выбрано матчей", allHit: "Если всё зайдёт", poolNote: "Официальная шкала: 1 совпадение — 120, 14 — 12 000.", schedule: "Расписание Main Event", scheduleIntro: "Все время указано по Нью-Йорку (EDT). Первые пары подтверждены, следующие соперники определятся по ходу сетки.", opening: "Первые матчи", later: "Следующие раунды", simulation: "СИМУЛЯЦИЯ СЕТКИ", teamOdds: "Шансы команд", oddsIntro: "Вероятность каждого итогового места по выбранной модели.", team: "Команда", mapsAhead: "Карт впереди", titlePlace: "Титул", place: "Место", mapsShort: "карт", rounding: "Значения округлены, поэтому сумма в строке может немного отличаться от 100%.", methodNote: "Проценты — оценка модели по относительной силе команд, а не букмекерские коэффициенты." },
  es: { eyebrow: "THE INTERNATIONAL 2026", title: "Predicciones del evento principal", historical: "Modelo equilibrado", tiOnly: "Solo TI 2026", upper: "Cuadro superior", lower: "Cuadro inferior", method: "Base del modelo", instruction: "Empieza con uno de los modelos y después elige equipos para crear tu propio cuadro. Las probabilidades y los puntos esperados se actualizan al instante.", balancedBasis: "Temporada + este TI", tiBasis: "Solo partidos de este TI", yourBracket: "Tu cuadro de predicciones", useModel: "Usar pronóstico del modelo", clear: "Borrar", roundNav: "Ronda del cuadro", expected: "RESULTADO ESPERADO", expectedPoints: "puntos de media para tu cuadro", correct: "Aciertos esperados", picked: "Partidos elegidos", allHit: "Si aciertas todos", poolNote: "Escala oficial: 1 acierto = 120; 14 = 12.000.", schedule: "Calendario del evento principal", scheduleIntro: "Todos los horarios se muestran en la hora de Nueva York (EDT). Los primeros cruces están confirmados; los siguientes dependen de los resultados.", opening: "Partidos iniciales", later: "Rondas posteriores", simulation: "SIMULACIÓN DEL CUADRO", teamOdds: "Probabilidades de posición", oddsIntro: "Probabilidad de cada posición final según el modelo seleccionado.", team: "Equipo", mapsAhead: "Mapas restantes", titlePlace: "Título", place: "Puesto", mapsShort: "mapas", rounding: "Las cifras están redondeadas, por lo que una fila puede diferir ligeramente del 100 %.", methodNote: "Los porcentajes son estimaciones del modelo según la fuerza relativa, no cuotas de apuestas." },
  zh: { eyebrow: "THE INTERNATIONAL 2026", title: "主赛事预测", historical: "综合模型", tiOnly: "仅 TI 2026", upper: "胜者组", lower: "败者组", method: "模型依据", instruction: "先选择一个模型，再点击队伍创建自己的对阵预测。胜率和预期积分会立即更新。", balancedBasis: "赛季实力 + 本届 TI", tiBasis: "仅使用本届 TI 比赛", yourBracket: "你的预测对阵", useModel: "使用模型预测", clear: "清空", roundNav: "对阵轮次", expected: "预期结果", expectedPoints: "该对阵预测的平均积分", correct: "预计正确数", picked: "已选择比赛", allHit: "全部命中", poolNote: "官方积分：预测正确 1 场得 120 分，14 场得 12,000 分。", schedule: "主赛事赛程", scheduleIntro: "所有时间均为纽约时间（EDT）。首轮对阵已确认，后续对手将由比赛结果决定。", opening: "首轮比赛", later: "后续轮次", simulation: "对阵模拟", teamOdds: "最终名次概率", oddsIntro: "所选模型下各队最终名次的概率。", team: "队伍", mapsAhead: "预计剩余地图", titlePlace: "冠军", place: "名次", mapsShort: "张地图", rounding: "数据经过四舍五入，因此每行合计可能与 100% 略有差异。", methodNote: "百分比是根据队伍相对实力得出的模型估算，并非博彩赔率。" }
};

function getLanguage(): Lang { if (typeof window === "undefined") return "en"; const saved = window.localStorage.getItem("site-language") as Lang | null; return saved && copy[saved] ? saved : "en"; }
function Logo({ team }: { team: Team }) { return <span className="team-logo team-logo-sm" title={team} role="img" aria-label={team} />; }
function BracketCard({ pick }: { pick: Pick }) { return <article className="prediction-bracket-card"><header><small>{pick.label}</small><time>{pick.date}</time></header><div className={pick.winner === pick.a ? "predicted-winner" : ""}><span><Logo team={pick.a} />{pick.a}</span><b>{pick.aChance}</b></div><div className={pick.winner === pick.b ? "predicted-winner" : ""}><span><Logo team={pick.b} />{pick.b}</span><b>{pick.bChance}</b></div></article>; }

type MatchId = "m1" | "m2" | "m3" | "m4" | "m5" | "m6" | "m7" | "m8" | "m9" | "m10" | "m11" | "m12" | "m13" | "m14";
type InteractiveMatch = { id: MatchId; stage: "upper1" | "upper2" | "upper3" | "lower1" | "lower2" | "lower3" | "final"; label: string; date: string; teams: [Team | null, Team | null] };
type MobileStage = InteractiveMatch["stage"];

const matchMeta: Record<MatchId, Omit<InteractiveMatch, "teams">> = {
  m1: { id: "m1", stage: "upper1", label: "M1 · Upper quarterfinal", date: schedules.qf1 },
  m2: { id: "m2", stage: "upper1", label: "M2 · Upper quarterfinal", date: schedules.qf2 },
  m3: { id: "m3", stage: "upper1", label: "M3 · Upper quarterfinal", date: schedules.qf3 },
  m4: { id: "m4", stage: "upper1", label: "M4 · Upper quarterfinal", date: schedules.qf4 },
  m5: { id: "m5", stage: "upper2", label: "M5 · Upper semifinal", date: schedules.upper },
  m6: { id: "m6", stage: "upper2", label: "M6 · Upper semifinal", date: schedules.upper },
  m7: { id: "m7", stage: "upper3", label: "M7 · Upper final", date: schedules.upper },
  m8: { id: "m8", stage: "lower1", label: "M8 · Lower round 1", date: schedules.lower },
  m9: { id: "m9", stage: "lower1", label: "M9 · Lower round 1", date: schedules.lower },
  m10: { id: "m10", stage: "lower2", label: "M10 · Lower round 2", date: schedules.lower },
  m11: { id: "m11", stage: "lower2", label: "M11 · Lower round 2", date: schedules.lower },
  m12: { id: "m12", stage: "lower3", label: "M12 · Lower semifinal", date: schedules.lower },
  m13: { id: "m13", stage: "lower3", label: "M13 · Lower final", date: schedules.lower },
  m14: { id: "m14", stage: "final", label: "M14 · Grand Final", date: schedules.final }
};
const matchTimes: Record<MatchId, number> = {
  m1: 1787191200, m2: 1787202000, m3: 1787212800, m4: 1787223600,
  m8: 1787277600, m9: 1787288400, m5: 1787299200, m6: 1787310000,
  m10: 1787364000, m11: 1787374800, m7: 1787385600, m12: 1787396400,
  m13: 1787450400, m14: 1787461200
};
const matchNames: Record<Lang, Record<MatchId, string>> = {
  en: { m1: "Upper Quarterfinal", m2: "Upper Quarterfinal", m3: "Upper Quarterfinal", m4: "Upper Quarterfinal", m5: "Upper Semifinal", m6: "Upper Semifinal", m7: "Upper Final", m8: "Lower Round 1", m9: "Lower Round 1", m10: "Lower Round 2", m11: "Lower Round 2", m12: "Lower Semifinal", m13: "Lower Final", m14: "Grand Final" },
  ru: { m1: "Четвертьфинал верхней", m2: "Четвертьфинал верхней", m3: "Четвертьфинал верхней", m4: "Четвертьфинал верхней", m5: "Полуфинал верхней", m6: "Полуфинал верхней", m7: "Финал верхней", m8: "Нижняя сетка · раунд 1", m9: "Нижняя сетка · раунд 1", m10: "Нижняя сетка · раунд 2", m11: "Нижняя сетка · раунд 2", m12: "Полуфинал нижней", m13: "Финал нижней", m14: "Гранд-финал" },
  es: { m1: "Cuartos del cuadro superior", m2: "Cuartos del cuadro superior", m3: "Cuartos del cuadro superior", m4: "Cuartos del cuadro superior", m5: "Semifinal superior", m6: "Semifinal superior", m7: "Final superior", m8: "Cuadro inferior · ronda 1", m9: "Cuadro inferior · ronda 1", m10: "Cuadro inferior · ronda 2", m11: "Cuadro inferior · ronda 2", m12: "Semifinal inferior", m13: "Final inferior", m14: "Gran Final" },
  zh: { m1: "胜者组四分之一决赛", m2: "胜者组四分之一决赛", m3: "胜者组四分之一决赛", m4: "胜者组四分之一决赛", m5: "胜者组半决赛", m6: "胜者组半决赛", m7: "胜者组决赛", m8: "败者组第一轮", m9: "败者组第一轮", m10: "败者组第二轮", m11: "败者组第二轮", m12: "败者组半决赛", m13: "败者组决赛", m14: "总决赛" }
};
const localeByLanguage: Record<Lang, string> = { en: "en-US", ru: "ru-RU", es: "es-ES", zh: "zh-CN" };
const mobileStageNames: Record<Lang, Record<MobileStage, string>> = {
  en: { upper1: "Upper · R1", upper2: "Upper · R2", upper3: "Upper Final", lower1: "Lower · R1", lower2: "Lower · R2", lower3: "Lower Finals", final: "Grand Final" },
  ru: { upper1: "Верхняя · 1", upper2: "Верхняя · 2", upper3: "Финал верхней", lower1: "Нижняя · 1", lower2: "Нижняя · 2", lower3: "Финалы нижней", final: "Гранд-финал" },
  es: { upper1: "Superior · R1", upper2: "Superior · R2", upper3: "Final superior", lower1: "Inferior · R1", lower2: "Inferior · R2", lower3: "Finales inferiores", final: "Gran Final" },
  zh: { upper1: "胜者组 · 第一轮", upper2: "胜者组 · 第二轮", upper3: "胜者组决赛", lower1: "败者组 · 第一轮", lower2: "败者组 · 第二轮", lower3: "败者组决赛", final: "总决赛" }
};
function formatMatchTime(id: MatchId, language: Lang) {
  const time = new Intl.DateTimeFormat(localeByLanguage[language], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/New_York", timeZoneName: "short" }).format(new Date(matchTimes[id] * 1000));
  return `${time} · ${id === "m14" ? "Bo5" : "Bo3"}`;
}
// Official Main Event Compendium payout: points depend on the total number of
// correct bracket predictions, not on which individual match was correct.
// Index = correct predictions (0–14).
const scorePool = [0, 120, 360, 720, 1200, 1800, 2520, 3360, 4320, 5400, 6600, 7920, 9360, 10920, 12000];

function matchWinChance(model: Model, team: Team, opponent: Team): number { const teamStrength = Math.sqrt(model.odds[team]); const opponentStrength = Math.sqrt(model.odds[opponent]); return teamStrength / (teamStrength + opponentStrength); }

function defaultSelections(key: ModelKey): Partial<Record<MatchId, Team>> {
  const selections: Partial<Record<MatchId, Team>> = {}; const model = models[key];
  (Object.keys(matchMeta) as MatchId[]).forEach((id) => { const match = buildInteractiveBracket(selections).find((item) => item.id === id); const [a, b] = match?.teams ?? [null, null]; if (a && b) selections[id] = matchWinChance(model, a, b) >= .5 ? a : b; });
  return selections;
}

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

function seededRandom(seedText: string) { let seed = Array.from(seedText).reduce((value, char) => (value * 31 + char.charCodeAt(0)) >>> 0, 2166136261); return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }; }

function simulatePool(model: Model, selections: Partial<Record<MatchId, Team>>, validIds: MatchId[]) {
  const random = seededRandom(`${model.title}:${JSON.stringify(selections)}`); const simulations = 20000; let totalPoints = 0; let totalCorrect = 0;
  for (let run = 0; run < simulations; run += 1) { const outcomes: Partial<Record<MatchId, Team>> = {};
    (Object.keys(matchMeta) as MatchId[]).forEach((id) => { const match = buildInteractiveBracket(outcomes).find((item) => item.id === id); const [a, b] = match?.teams ?? [null, null]; if (a && b) outcomes[id] = random() < matchWinChance(model, a, b) ? a : b; });
    const correct = validIds.reduce((count, id) => count + (outcomes[id] === selections[id] ? 1 : 0), 0); totalCorrect += correct; totalPoints += scorePool[correct];
  }
  return { points: totalPoints / simulations, correct: totalCorrect / simulations };
}

function InteractiveMatchCard({ match, model, language, selected, onPick }: { match: InteractiveMatch; model: Model; language: Lang; selected?: Team; onPick: (id: MatchId, team: Team) => void }) {
  const waiting = { en: "Winner of previous match", ru: "Победитель предыдущего матча", es: "Ganador del partido anterior", zh: "上一场比赛的胜者" }[language];
  return <article className="prediction-bracket-card interactive-match-card"><header><small>{match.id.toUpperCase()} · {matchNames[language][match.id]}</small><time>{formatMatchTime(match.id, language)}</time></header>{match.teams.map((team, index) => { const opponent = match.teams[index === 0 ? 1 : 0]; const chance = team && opponent ? Math.round(matchWinChance(model, team, opponent) * 100) : null; return <button key={team ?? `open-${match.id}-${index}`} type="button" disabled={!team} className={selected === team ? "picked-team" : ""} onClick={() => team && onPick(match.id, team)}>{team ? <><span><Logo team={team} />{team}</span><em>{chance}%</em>{selected === team && <b>✓</b>}</> : <span>{waiting}</span>}</button>; })}</article>;
}

function InteractivePredictionBoard({ language }: { language: Lang }) {
  const [active, setActive] = useState<ModelKey>("historical");
  const [selections, setSelections] = useState<Partial<Record<MatchId, Team>>>(() => defaultSelections("historical"));
  const [mobileStage, setMobileStage] = useState<MobileStage>("upper1");
  const t = copy[language]; const model = models[active];
  const activateModel = (key: ModelKey) => { setActive(key); setSelections(defaultSelections(key)); };
  const bracket = useMemo(() => buildInteractiveBracket(selections), [selections]);
  const validPicks = bracket.filter((match) => selections[match.id] && match.teams.includes(selections[match.id] as Team));
  const validIds = validPicks.map((match) => match.id); const simulation = useMemo(() => simulatePool(model, selections, validIds), [model, selections, validIds.join(",")]);
  const expected = simulation.points; const correct = simulation.correct; const maxPoints = scorePool[validPicks.length];
  const byStage = (stage: InteractiveMatch["stage"]) => bracket.filter((match) => match.stage === stage);
  const score = Math.round(expected).toLocaleString(localeByLanguage[language]);
  const rankedTeams = [...teams].sort((left, right) => model.odds[right.team] - model.odds[left.team]);
  const placeHeaders: Array<keyof PlacementOdds> = ["1", "2", "3", "4", "5-6", "7-8"];
  const formatPercent = (value: number) => `${value.toLocaleString(localeByLanguage[language], { maximumFractionDigits: 1 })}%`;
  const stageMatches: Record<MobileStage, MatchId[]> = { upper1: ["m1", "m2", "m3", "m4"], upper2: ["m5", "m6"], upper3: ["m7"], lower1: ["m8", "m9"], lower2: ["m10", "m11"], lower3: ["m12", "m13"], final: ["m14"] };
  const stageOrder: MobileStage[] = ["upper1", "upper2", "upper3", "lower1", "lower2", "lower3", "final"];
  const mobileStages = stageOrder.map((stage) => ({ stage, label: mobileStageNames[language][stage] }));
  const handlePick = (id: MatchId, team: Team) => setSelections((current) => {
    const next = { ...current, [id]: team }; const ids = stageMatches[mobileStage];
    if (ids.every((matchId) => next[matchId])) { const nextStage = stageOrder[stageOrder.indexOf(mobileStage) + 1]; if (nextStage) setMobileStage(nextStage); }
    return next;
  });
  const openingIds: MatchId[] = ["m1", "m2", "m3", "m4"];
  const laterIds: MatchId[] = ["m8", "m9", "m5", "m6", "m10", "m11", "m7", "m12", "m13", "m14"];
  const tbd = { en: "TBD", ru: "Определится по сетке", es: "Por definir", zh: "待定" }[language];
  return <main className="site-shell predictions-page bracket-predictions-page">
    <section className="main-event-hero prediction-hero"><span className="eyebrow">{t.eyebrow}</span><h1>{t.title}</h1><p>{t.instruction}</p><div className="prediction-model-toggle" role="group" aria-label={t.method}><button type="button" aria-pressed={active === "historical"} className={active === "historical" ? "active" : ""} onClick={() => activateModel("historical")}><strong>{t.historical}</strong><span>{t.balancedBasis}</span></button><button type="button" aria-pressed={active === "tiOnly"} className={active === "tiOnly" ? "active" : ""} onClick={() => activateModel("tiOnly")}><strong>{t.tiOnly}</strong><span>{t.tiBasis}</span></button></div><small className="prediction-method-note">{t.methodNote}</small></section>
    <section className="main-event-schedule"><div className="section-title"><div><span className="eyebrow">{t.opening}</span><h2>{t.schedule}</h2></div><p>{t.scheduleIntro}</p></div><div className="opening-match-grid">{openingIds.map((id) => { const match = bracket.find((item) => item.id === id)!; return <article key={id}><header><span>{id.toUpperCase()} · {matchNames[language][id]}</span><time>{formatMatchTime(id, language)}</time></header><div>{match.teams.map((team) => team && <span key={team}><Logo team={team} />{team}</span>)}</div></article>; })}</div><details className="later-rounds"><summary>{t.later}<span>{laterIds.length}</span></summary><div>{laterIds.map((id) => <article key={id}><span>{id.toUpperCase()} · {matchNames[language][id]}</span><time>{formatMatchTime(id, language)}</time><small>{tbd}</small></article>)}</div></details></section>
    <section className="prediction-bracket-section"><div className="section-title"><div><span className="eyebrow">{active === "historical" ? t.historical : t.tiOnly}</span><h2>{t.yourBracket}</h2></div><div className="prediction-actions"><button type="button" onClick={() => setSelections(defaultSelections(active))}>{t.useModel}</button><button type="button" onClick={() => setSelections({})}>{t.clear}</button></div></div><div className="prediction-interactive-layout"><div className="bracket-model-board"><nav className="mobile-bracket-nav" aria-label={t.roundNav}>{mobileStages.map(({ stage, label }) => <button key={stage} type="button" className={mobileStage === stage ? "active" : ""} aria-pressed={mobileStage === stage} onClick={() => setMobileStage(stage)}>{label}</button>)}</nav><div className={`bracket-model-upper ${mobileStage.startsWith("upper") || mobileStage === "final" ? "mobile-section-active" : ""}`}><h3>{t.upper}</h3><div className="bracket-model-grid bracket-model-upper-grid">{(["upper1", "upper2", "upper3", "final"] as MobileStage[]).map((stage) => <div key={stage} className={`mobile-stage-column ${mobileStage === stage ? "mobile-active" : ""}`}>{byStage(stage).map((match) => <InteractiveMatchCard key={match.id} match={match} model={model} language={language} selected={selections[match.id]} onPick={handlePick} />)}</div>)}</div></div><div className={`bracket-model-lower ${mobileStage.startsWith("lower") ? "mobile-section-active" : ""}`}><h3>{t.lower}</h3><div className="bracket-model-grid">{(["lower1", "lower2", "lower3"] as MobileStage[]).map((stage) => <div key={stage} className={`mobile-stage-column ${mobileStage === stage ? "mobile-active" : ""}`}>{byStage(stage).map((match) => <InteractiveMatchCard key={match.id} match={match} model={model} language={language} selected={selections[match.id]} onPick={handlePick} />)}</div>)}</div></div></div><aside className="prediction-score-panel"><span>{t.expected}</span><strong>{score}</strong><p>{t.expectedPoints}</p><div><article><small>{t.correct}</small><b>{correct.toFixed(1)} / 14</b></article><article><small>{t.picked}</small><b>{validPicks.length} / 14</b></article><article><small>{t.allHit}</small><b>{maxPoints.toLocaleString(localeByLanguage[language])}</b></article></div><p className="score-model-note">{t.poolNote} {active === "historical" ? t.balancedBasis : t.tiBasis}.</p></aside></div></section>
    <section className="placement-odds-section"><div className="section-title"><div><span className="eyebrow">{t.simulation}</span><h2>{t.teamOdds}</h2></div><p>{t.oddsIntro}</p></div><div className="placement-odds-table"><div className="placement-odds-head"><span>{t.team}</span>{placeHeaders.map((place) => <span key={place}>{place}</span>)}<span>{t.mapsAhead}</span></div>{rankedTeams.map(({ team, record }) => <article key={team}><header><Logo team={team} /><div><strong>{team}</strong><small>{`TI: ${record}`}</small></div></header>{placeHeaders.map((place) => <span key={place} className={place === "1" ? "title-odds" : ""}>{formatPercent(model.placements[team][place])}</span>)}<b>{model.maps[team].toLocaleString(localeByLanguage[language], { maximumFractionDigits: 1 })}</b></article>)}</div><div className="placement-odds-mobile">{rankedTeams.map(({ team, record }, index) => <details key={`${active}-${team}`} open={index === 0}><summary><Logo team={team} /><span><strong>{team}</strong><small>{`TI: ${record}`}</small></span><b>{formatPercent(model.odds[team])}</b><em>{model.maps[team].toLocaleString(localeByLanguage[language], { maximumFractionDigits: 1 })} {t.mapsShort}</em></summary><div>{placeHeaders.map((place) => <span key={place}><small>{place === "1" ? t.titlePlace : `${t.place} ${place}`}</small><b>{formatPercent(model.placements[team][place])}</b></span>)}</div></details>)}</div><p className="placement-odds-note">{t.rounding}</p></section>
  </main>;
}

export default function Predictions() {
  const [language, setLanguage] = useState<Lang>("en");
  useEffect(() => { setLanguage(getLanguage()); const onChange = (event: Event) => { const lang = (event as CustomEvent<{ language?: Lang }>).detail?.language; setLanguage(lang && copy[lang] ? lang : getLanguage()); }; window.addEventListener("site-language-change", onChange); return () => window.removeEventListener("site-language-change", onChange); }, []);
  return <InteractivePredictionBoard language={language} />;
}
