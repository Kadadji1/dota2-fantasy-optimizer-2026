"use client";

import { useEffect, useState } from "react";

type SiteLanguage = "en" | "ru" | "es" | "zh";

const copy: Record<SiteLanguage, { kicker: string; text: string; lock: string; date: string; inWord: string; days: string }> = {
  en: {
    kicker: "Group stage predictions",
    text: "We model how the Swiss stage ends: team ratings over a year of matches, recent form, results on patch 7.41, market odds and predictions from well-known analysts. The model fills the bracket for you — edit it freely and watch the expected points move.",
    lock: "Draft locks",
    date: "August 13",
    inWord: "in",
    days: "d."
  },
  ru: {
    kicker: "Прогнозы группового этапа",
    text: "Мы моделируем итог швейцарской стадии, учитывая рейтинги команд за год матчей, недавнюю форму, результаты на патче 7.41, рыночные коэффициенты и прогнозы известных аналитиков. Модель заполняет сетку за вас — меняйте команды и сразу смотрите, как меняются ожидаемые очки.",
    lock: "Сетка фиксируется",
    date: "13 августа",
    inWord: "через",
    days: "дн."
  },
  es: {
    kicker: "Predicciones de la fase de grupos",
    text: "Modelamos cómo termina la fase suiza usando ratings de los equipos durante un año de partidas, forma reciente, resultados en el parche 7.41, cuotas de mercado y predicciones de analistas conocidos. El modelo completa el cuadro por ti: edítalo libremente y observa cómo cambian los puntos esperados.",
    lock: "El cuadro se bloquea",
    date: "13 de agosto",
    inWord: "en",
    days: "d."
  },
  zh: {
    kicker: "小组赛预测",
    text: "我们通过过去一年比赛的战队评分、近期状态、7.41 版本表现、市场赔率以及知名分析师的预测来模拟瑞士轮最终结果。模型会自动填充预测表，你可以自由调整战队，并实时查看预期积分的变化。",
    lock: "预测锁定",
    date: "8月13日",
    inWord: "还有",
    days: "天"
  }
};

function daysUntilLock() {
  const now = new Date();
  const lock = new Date("2026-08-13T00:00:00-04:00");
  return Math.max(0, Math.ceil((lock.getTime() - now.getTime()) / 86400000));
}

export default function PredictionsIntro() {
  const [language, setLanguage] = useState<SiteLanguage>("en");
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("site-language") as SiteLanguage | null;
    if (saved && copy[saved]) setLanguage(saved);
    setDaysLeft(daysUntilLock());

    const onLanguageChange = (event: Event) => {
      const custom = event as CustomEvent<{ language?: SiteLanguage }>;
      if (custom.detail?.language && copy[custom.detail.language]) setLanguage(custom.detail.language);
    };

    window.addEventListener("site-language-change", onLanguageChange);
    return () => window.removeEventListener("site-language-change", onLanguageChange);
  }, []);

  const t = copy[language];

  return (
    <section className="predictions-model-note">
      <div className="predictions-model-note-copy">
        <span className="eyebrow">{t.kicker}</span>
        <p>{t.text}</p>
      </div>
      <div className="predictions-lock-card">
        <span>{t.lock}</span>
        <strong>{t.date}</strong>
        {daysLeft !== null && <small>{t.inWord} {daysLeft} {t.days}</small>}
      </div>
    </section>
  );
}
