"use client";

import { useEffect, useState } from "react";

type SiteLanguage = "en" | "ru" | "es" | "zh";

const copy: Record<SiteLanguage, {
  kicker: string;
  title: string;
  subtitle: string;
  groupStage: string;
  groupStageDate: string;
  mainEvent: string;
  mainEventDate: string;
  cards: Array<[string, string]>;
  model: string;
  matches: string;
  simulations: string;
  events: string;
  foot: string;
}> = {
  en: {
    kicker: "THE INTERNATIONAL 2026",
    title: "Dota 2 Fantasy Calculator & Optimizer",
    subtitle: "Main Event Fantasy is open. Complete the two new emblems on every banner, then compare your five-emblem roster with player-specific projections.",
    groupStage: "Group stage",
    groupStageDate: "Locked",
    mainEvent: "Main Event roster lock",
    mainEventDate: "Before the first match · New York time",
    cards: [
      ["MAIN EVENT READY", "Five-emblem banners, roster optimization and Main Event preparation."],
      ["PLAYER-SPECIFIC ANALYSIS", "Stats are evaluated by role, player history, emblems, traits and titles."],
      ["30 NEW REROLLS", "The first three emblems carry over; two new slots unlock on every banner."]
    ],
    model: "MODEL DATA",
    matches: "matches analyzed",
    simulations: "simulations",
    events: "competitive events",
    foot: "Historical match data · player-level statistics · tournament simulations"
  },
  ru: {
    kicker: "THE INTERNATIONAL 2026",
    title: "Dota 2 Fantasy Калькулятор & Оптимизатор",
    subtitle: "Fantasy основного этапа открыт. Заполните две новые эмблемы на каждом знамени и сравните состав из пяти эмблем по статистике игроков.",
    groupStage: "Групповой этап",
    groupStageDate: "Закреплён",
    mainEvent: "Фиксация состава Main Event",
    mainEventDate: "До первого матча · время Нью-Йорка",
    cards: [
      ["ГОТОВО К MAIN EVENT", "Знамёна с пятью эмблемами, оптимизация состава и подготовка к основному этапу."],
      ["АНАЛИЗ ИГРОКОВ", "Статистика учитывает роль, историю игрока, эмблемы, свойства и титулы."],
      ["30 НОВЫХ РЕРОЛЛОВ", "Первые три эмблемы сохраняются, на каждом знамени открываются ещё две."]
    ],
    model: "ДАННЫЕ МОДЕЛИ",
    matches: "матчей проанализировано",
    simulations: "симуляций",
    events: "соревновательных ивентов",
    foot: "История матчей · статистика игроков · симуляции турнира"
  },
  es: {
    kicker: "THE INTERNATIONAL 2026",
    title: "Calculadora y Optimizador de Dota 2 Fantasy",
    subtitle: "Fantasy del Evento Principal está abierto. Completa los dos emblemas nuevos de cada estandarte y compara una plantilla de cinco emblemas.",
    groupStage: "Fase de grupos",
    groupStageDate: "Bloqueada",
    mainEvent: "Cierre de plantilla del Evento Principal",
    mainEventDate: "Antes del primer partido · hora de Nueva York",
    cards: [
      ["LISTO PARA EL EVENTO PRINCIPAL", "Estandartes de cinco emblemas y preparación para el Evento Principal."],
      ["ANÁLISIS POR JUGADOR", "Las estadísticas consideran rol, historial, emblemas, rasgos y títulos."],
      ["30 REROLLS NUEVOS", "Los tres primeros emblemas se conservan y se desbloquean dos más por estandarte."]
    ],
    model: "DATOS DEL MODELO",
    matches: "partidas analizadas",
    simulations: "simulaciones",
    events: "eventos competitivos",
    foot: "Historial de partidas · estadísticas por jugador · simulaciones del torneo"
  },
  zh: {
    kicker: "THE INTERNATIONAL 2026",
    title: "Dota 2 Fantasy 计算器与优化器",
    subtitle: "主赛事 Fantasy 已开放。完成每面旗帜新增的两枚徽章，并用选手数据比较五徽章阵容。",
    groupStage: "小组赛",
    groupStageDate: "已锁定",
    mainEvent: "主赛事阵容锁定",
    mainEventDate: "首场比赛前 · 纽约时间",
    cards: [
      ["主赛事已就绪", "五徽章旗帜、阵容优化与主赛事准备。"],
      ["选手级分析", "按位置、选手历史、徽章、特性和称号评估数据。"],
      ["30 次新重掷", "前三枚徽章会保留；每面旗帜新增两格。"]
    ],
    model: "模型数据",
    matches: "场比赛已分析",
    simulations: "次模拟",
    events: "项赛事",
    foot: "历史比赛数据 · 选手级统计 · 赛事模拟"
  }
};

export default function HomeHero() {
  const [language, setLanguage] = useState<SiteLanguage>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("site-language") as SiteLanguage | null;
    if (saved && copy[saved]) setLanguage(saved);

    const onLanguageChange = (event: Event) => {
      const custom = event as CustomEvent<{ language?: SiteLanguage }>;
      if (custom.detail?.language && copy[custom.detail.language]) setLanguage(custom.detail.language);
    };

    window.addEventListener("site-language-change", onLanguageChange);
    return () => window.removeEventListener("site-language-change", onLanguageChange);
  }, []);

  const t = copy[language];

  return (
    <div className="home-hero-shell">
      <section className="home-native-hero" id="top">
        <div className="home-hero-glow" />
        <div className="home-hero-copy">
          <div className="home-hero-eyebrow">{t.kicker}</div>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
          <div className="home-event-dates" aria-label="The International 2026 dates">
            <div><span>{t.groupStage}</span><strong>{t.groupStageDate}</strong></div>
            <div><span>{t.mainEvent}</span><strong>{t.mainEventDate}</strong></div>
          </div>
          <div className="home-hero-info-strip">
            {t.cards.map(([heading, body]) => (
              <div className="home-hero-info-item" key={heading}>
                <b>{heading}</b>
                <span>{body}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="home-model-card">
          <span className="home-model-label">{t.model}</span>
          <div className="home-model-primary">
            <strong>8,000+</strong>
            <small>{t.matches}</small>
          </div>
          <div className="home-model-secondary">
            <div>
              <strong>20,000</strong>
              <small>{t.simulations}</small>
            </div>
            <div>
              <strong>80+</strong>
              <small>{t.events}</small>
            </div>
          </div>
          <small className="home-model-foot">{t.foot}</small>
        </aside>
      </section>
    </div>
  );
}
