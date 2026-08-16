"use client";

import { useEffect, useState } from "react";

type SiteLanguage = "en" | "ru" | "es" | "zh";

const copy: Record<SiteLanguage, { kicker: string; text: string; lock: string; date: string; inWord: string; days: string }> = {
  en: {
    kicker: "Main Event status",
    text: "The Group Stage board is closed. Predictions now follow the complete eight-team Main Event bracket and the title chances after the Group Stage.",
    lock: "Main Event begins",
    date: "August 20",
    inWord: "in",
    days: "d."
  },
  ru: {
    kicker: "Статус Main Event",
    text: "Доска группового этапа закрыта. Теперь здесь — полная сетка Main Event на восемь команд и шансы на титул после группового этапа.",
    lock: "Старт Main Event",
    date: "20 августа",
    inWord: "через",
    days: "дн."
  },
  es: {
    kicker: "Estado del Evento Principal",
    text: "El panel de la fase de grupos está cerrado. Ahora esta página muestra el cuadro completo de ocho equipos y las probabilidades tras la fase de grupos.",
    lock: "Comienza el Evento Principal",
    date: "20 de agosto",
    inWord: "en",
    days: "d."
  },
  zh: {
    kicker: "主赛事状态",
    text: "小组赛预测面板已关闭。本页面现展示完整的八队主赛事对阵表与小组赛后的夺冠概率。",
    lock: "主赛事开始",
    date: "8月20日",
    inWord: "还有",
    days: "天"
  }
};

function daysUntilLock() {
  const now = new Date();
  const lock = new Date("2026-08-20T00:00:00-04:00");
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
