"use client";

import { useEffect, useState } from "react";

type SiteLanguage = "en" | "ru" | "es" | "zh";
type Team = {
  name: string;
  former: string | null;
  region: string;
  qualification: "direct" | "qualifier";
  players: string[];
};

const teams: Team[] = [
  { name: "BoomBoys", former: "ex-BetBoom Team", region: "EU", qualification: "direct", players: ["Kiritych~", "gpk~", "MieRo", "Save-", "Kataomi"] },
  { name: "Iron Wing", former: "ex-Tundra Esports / 1w Team", region: "EU", qualification: "direct", players: ["Pure", "bzm", "33", "Ari", "Whitemon"] },
  { name: "Team Falcons", former: null, region: "EU", qualification: "direct", players: ["skiter", "Malr1ne", "ATF", "Cr1t-", "Sneyking"] },
  { name: "Team Liquid", former: null, region: "EU", qualification: "direct", players: ["m1CKe", "Nisha", "Ace", "Boxi", "tOfu"] },
  { name: "Team Yandex", former: null, region: "EU", qualification: "direct", players: ["watson", "CHIRA_JUNIOR", "DM", "Saksa", "Malady"] },
  { name: "Nigma Galaxy", former: null, region: "EU", qualification: "qualifier", players: ["SumaiL", "lorenof", "Davai", "OmaR", "GH"] },
  { name: "TEAM VISION", former: null, region: "EU", qualification: "qualifier", players: ["Satanic", "No[o]ne-", "Noticed", "9Class", "Dukalis"] },
  { name: "Team Spirit", former: null, region: "EU", qualification: "qualifier", players: ["Yatoro", "Larl", "Collapse", "not me", "rue"] },
];

const copy: Record<SiteLanguage, {
  eyebrow: string; title: string; subtitle: string; direct: string; qualifier: string;
  former: string; position: string; player: string; coverage: string; showAll: string; compact: string;
}> = {
  en: {
    eyebrow: "07 · TOURNAMENT ROSTERS",
    title: "TI 2026 Main Event rosters",
    subtitle: "Only the eight teams still competing. Eliminated teams are excluded from every Fantasy calculation and ranking.",
    direct: "Direct invite", qualifier: "Qualified", former: "Formerly", position: "Position", player: "Player", coverage: "8 teams · 40 players", showAll: "Show Main Event rosters", compact: "Only active tournament teams"
  },
  ru: {
    eyebrow: "07 · СОСТАВЫ ТУРНИРА",
    title: "Составы Main Event TI 2026",
    subtitle: "Только восемь команд, которые продолжают турнир. Вылетевшие команды исключены из всех расчётов и рейтингов Fantasy.",
    direct: "Прямое приглашение", qualifier: "Через квалификацию", former: "Ранее", position: "Позиция", player: "Игрок", coverage: "8 команд · 40 игроков", showAll: "Показать составы Main Event", compact: "Только команды, оставшиеся в турнире"
  },
  es: {
    eyebrow: "07 · PLANTILLAS DEL TORNEO",
    title: "Plantillas del Evento Principal de TI 2026",
    subtitle: "Solo los ocho equipos que siguen en el torneo. Los equipos eliminados no aparecen en los cálculos ni en las clasificaciones Fantasy.",
    direct: "Invitación directa", qualifier: "Clasificado", former: "Anteriormente", position: "Posición", player: "Jugador", coverage: "8 equipos · 40 jugadores", showAll: "Mostrar plantillas del Evento Principal", compact: "Solo equipos activos"
  },
  zh: {
    eyebrow: "07 · 赛事阵容",
    title: "TI 2026 主赛事战队阵容",
    subtitle: "仅显示仍在参赛的八支战队。已淘汰战队不会出现在 Fantasy 计算或排名中。",
    direct: "直邀", qualifier: "预选赛晋级", former: "原战队", position: "位置", player: "选手", coverage: "8 支战队 · 40 名选手", showAll: "查看主赛事阵容", compact: "仅显示在赛战队"
  }
};

function readLanguage(): SiteLanguage {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem("site-language") as SiteLanguage | null;
  return saved && ["en", "ru", "es", "zh"].includes(saved) ? saved : "en";
}

export default function Rosters() {
  const [language, setLanguage] = useState<SiteLanguage>("en");

  useEffect(() => {
    setLanguage(readLanguage());
    const onLanguage = (event: Event) => {
      const custom = event as CustomEvent<{ language?: SiteLanguage }>;
      if (custom.detail?.language && copy[custom.detail.language]) setLanguage(custom.detail.language);
      else setLanguage(readLanguage());
    };
    window.addEventListener("site-language-change", onLanguage);
    window.addEventListener("storage", onLanguage);
    return () => {
      window.removeEventListener("site-language-change", onLanguage);
      window.removeEventListener("storage", onLanguage);
    };
  }, []);

  const t = copy[language];

  return (
    <section className="rosters-section" id="rosters">
      <div className="rosters-heading">
        <div>
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>
        <div className="rosters-tools"><strong>{t.coverage}</strong></div>
      </div>

      <details className="rosters-details">
        <summary><span>{t.showAll}</span><small>{t.compact}</small></summary>
        <div className="rosters-grid">
        {teams.map((team) => (
          <article className="roster-card" key={team.name}>
            <header>
              <span className="team-logo team-logo-lg" title={team.name} role="img" aria-label={team.name} />
              <div>
                <h3>{team.name}</h3>
                {team.former && <small>{t.former}: {team.former}</small>}
              </div>
              <div className="roster-meta">
                <b>{team.region}</b>
                <span className={`qualification qualification-${team.qualification}`}>
                  {team.qualification === "direct" ? t.direct : t.qualifier}
                </span>
              </div>
            </header>

            <div className="roster-table" role="table" aria-label={`${team.name} roster`}>
              <div className="roster-table-head" role="row">
                <span role="columnheader">{t.position}</span>
                <span role="columnheader">{t.player}</span>
              </div>
              {team.players.map((player, index) => (
                <div className="roster-player" role="row" key={`${team.name}-${player}`}>
                  <span className="position-number" role="cell">{index + 1}</span>
                  <strong role="cell">{player}</strong>
                </div>
              ))}
            </div>
          </article>
        ))}
        </div>
      </details>
    </section>
  );
}
