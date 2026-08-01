"use client";

import { useState } from "react";

type Language = "en" | "ru";
type Team = {
  name: string;
  former: string | null;
  region: string;
  qualification: "direct" | "qualifier";
  players: string[];
};

const teams: Team[] = [
  { name: "Aurora Gaming", former: null, region: "EU", qualification: "direct", players: ["Nightfall", "Mikoto", "Ws", "Mira", "kaori"] },
  { name: "BoomBoys", former: "ex-BetBoom Team", region: "EU", qualification: "direct", players: ["Kiritych~", "gpk~", "MieRo", "Save-", "Kataomi"] },
  { name: "Iron Wing", former: "ex-Tundra Esports / 1w Team", region: "EU", qualification: "direct", players: ["Pure", "bzm", "33", "Ari", "Whitemon"] },
  { name: "Team Falcons", former: null, region: "EU", qualification: "direct", players: ["skiter", "Malr1ne", "ATF", "Cr1t-", "Sneyking"] },
  { name: "Team Liquid", former: null, region: "EU", qualification: "direct", players: ["m1CKe", "Nisha", "Ace", "Boxi", "tOfu"] },
  { name: "Team Yandex", former: null, region: "EU", qualification: "direct", players: ["watson", "CHIRA_JUNIOR", "DM", "Saksa", "Malady"] },
  { name: "Xtreme Gaming", former: null, region: "CN", qualification: "direct", players: ["Ame", "NothingToSay", "Xxs", "fy", "xNova"] },
  { name: "GamerLegion", former: null, region: "NA", qualification: "qualifier", players: ["Ghost", "RCY", "Fayde", "Bignum", "Speeed"] },
  { name: "HULIGANI", former: "ex-L1GA TEAM", region: "EU", qualification: "qualifier", players: ["ssnovv1", "Mirage`", "Corrupted", "sayuw", "RESPECT"] },
  { name: "LGD Gaming", former: null, region: "SA", qualification: "qualifier", players: ["Yuma", "TaiLung", "Wisper", "Thiolicor", "KJ"] },
  { name: "Nigma Galaxy", former: null, region: "EU", qualification: "qualifier", players: ["SumaiL", "lorenof", "Davai", "OmaR", "GH"] },
  { name: "OG", former: null, region: "SEA", qualification: "qualifier", players: ["Natsumi", "Yopaj-", "Raven", "TIMS", "skem"] },
  { name: "TEAM VISION", former: null, region: "EU", qualification: "qualifier", players: ["Satanic", "No[o]ne-", "Noticed", "9Class", "Dukalis"] },
  { name: "Team Resilience", former: null, region: "CN", qualification: "qualifier", players: ["YSR-04E", "Echozz", "niu", "planet", "zzq"] },
  { name: "Team Spirit", former: null, region: "EU", qualification: "qualifier", players: ["Yatoro", "Larl", "Collapse", "not me", "rue"] },
  { name: "Vici Gaming", former: null, region: "CN", qualification: "qualifier", players: ["shiro", "Xm", "Bach", "XinQ", "y`"] },
];

const copy = {
  en: {
    eyebrow: "07 · TOURNAMENT ROSTERS",
    title: "TI 2026 team rosters",
    subtitle: "All 16 announced teams and their positions. This section is informational and does not add missing players to the Reddit-based fantasy calculations.",
    direct: "Direct invite",
    qualifier: "Qualified",
    former: "Formerly",
    position: "Position",
    player: "Player",
    coverage: "16 teams · 80 players"
  },
  ru: {
    eyebrow: "07 · СОСТАВЫ ТУРНИРА",
    title: "Составы команд TI 2026",
    subtitle: "Все 16 заявленных команд и позиции игроков. Этот раздел справочный и не добавляет отсутствующих игроков в расчёты по датасету Reddit.",
    direct: "Прямое приглашение",
    qualifier: "Через квалификацию",
    former: "Ранее",
    position: "Позиция",
    player: "Игрок",
    coverage: "16 команд · 80 игроков"
  }
} as const;

export default function Rosters() {
  const [language, setLanguage] = useState<Language>("en");
  const t = copy[language];

  return (
    <section className="rosters-section" id="rosters">
      <div className="rosters-heading">
        <div>
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>
        <div className="rosters-tools">
          <strong>{t.coverage}</strong>
          <div className="language-switch">
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
            <button className={language === "ru" ? "active" : ""} onClick={() => setLanguage("ru")}>RU</button>
          </div>
        </div>
      </div>

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
    </section>
  );
}
