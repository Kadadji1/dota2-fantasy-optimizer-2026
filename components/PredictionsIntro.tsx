"use client";

import { useEffect, useState } from "react";

type SiteLanguage = "en" | "ru" | "es" | "zh";

const copy: Record<SiteLanguage, { kicker: string; text: string; lock: string; date: string; inWord: string; days: string }> = {
  en: {
    kicker: "Main Event status",
    text: "The Group Stage prediction board is now closed. This page tracks the Main Event Fantasy transition: five emblems per banner, a new pool of 30 rerolls, and the upcoming eight-team player pool.",
    lock: "Roster locks",
    date: "August 19",
    inWord: "in",
    days: "d."
  },
  ru: {
    kicker: "Статус Main Event",
    text: "Доска прогнозов группового этапа закрыта. Здесь отражён переход в Main Event: пять эмблем на знамя, новый запас из 30 рероллов и предстоящий пул из восьми команд.",
    lock: "Состав фиксируется",
    date: "19 августа",
    inWord: "через",
    days: "дн."
  },
  es: {
    kicker: "Estado del Evento Principal",
    text: "El panel de predicciones de la fase de grupos está cerrado. Esta página sigue la transición a cinco emblemas por estandarte, 30 rerolls nuevos y un grupo de ocho equipos.",
    lock: "La plantilla se bloquea",
    date: "19 de agosto",
    inWord: "en",
    days: "d."
  },
  zh: {
    kicker: "主赛事状态",
    text: "小组赛预测面板现已关闭。本页面跟踪主赛事切换：每面旗帜五枚徽章、30 次新的重掷，以及即将确定的八支晋级队伍。",
    lock: "阵容锁定",
    date: "8月19日",
    inWord: "还有",
    days: "天"
  }
};

function daysUntilLock() {
  const now = new Date();
  const lock = new Date("2026-08-19T00:00:00-04:00");
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
