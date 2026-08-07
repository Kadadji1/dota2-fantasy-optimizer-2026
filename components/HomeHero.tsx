"use client";

import { useEffect, useState } from "react";

type SiteLanguage = "en" | "ru" | "es" | "zh";

const copy: Record<SiteLanguage, {
  kicker: string;
  title: string;
  subtitle: string;
  groupStage: string;
  mainEvent: string;
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
    subtitle: "Build your TI 2026 Fantasy roster using historical match data, player-specific performance and simulation-based projections.",
    groupStage: "Group stage",
    mainEvent: "Main event",
    cards: [
      ["BUILT FOR TI 2026", "Fantasy banners, roster optimization and group stage predictions."],
      ["PLAYER-SPECIFIC ANALYSIS", "Stats are evaluated by role, player history, emblems, traits and titles."],
      ["FREE COMMUNITY TOOL", "No account required. Built for the Dota 2 community."]
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
    subtitle: "Соберите Fantasy-состав для TI 2026 на основе исторических матчей, статистики игроков и симуляций турнира.",
    groupStage: "Групповой этап",
    mainEvent: "Основной этап",
    cards: [
      ["ДЛЯ TI 2026", "Fantasy-знамёна, оптимизация состава и прогнозы групповой стадии."],
      ["АНАЛИЗ ИГРОКОВ", "Статистика учитывает роль, историю игрока, эмблемы, свойства и титулы."],
      ["БЕСПЛАТНЫЙ ИНСТРУМЕНТ", "Без регистрации. Сделано для сообщества Dota 2."]
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
    subtitle: "Construye tu plantilla Fantasy de TI 2026 con datos históricos, rendimiento individual y proyecciones basadas en simulaciones.",
    groupStage: "Fase de grupos",
    mainEvent: "Evento principal",
    cards: [
      ["HECHO PARA TI 2026", "Banners Fantasy, optimización de plantilla y predicciones de la fase de grupos."],
      ["ANÁLISIS POR JUGADOR", "Las estadísticas consideran rol, historial, emblemas, rasgos y títulos."],
      ["HERRAMIENTA GRATUITA", "Sin cuenta. Creada para la comunidad de Dota 2."]
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
    subtitle: "基于历史比赛、选手个人表现和模拟预测，构建你的 TI 2026 Fantasy 阵容。",
    groupStage: "小组赛",
    mainEvent: "主赛事",
    cards: [
      ["专为 TI 2026 打造", "Fantasy 旗帜、阵容优化与小组赛预测。"],
      ["选手级分析", "按位置、选手历史、徽章、特性和称号评估数据。"],
      ["免费社区工具", "无需账号。为 Dota 2 社区打造。"]
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
            <div><span>{t.groupStage}</span><strong>August 13 – 16</strong></div>
            <div><span>{t.mainEvent}</span><strong>August 20 – 23</strong></div>
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
              <strong>15,000</strong>
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