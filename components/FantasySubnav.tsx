"use client";

import { useEffect, useState } from "react";

type SiteLanguage = "en" | "ru" | "es" | "zh";

const labels: Record<SiteLanguage, string[]> = {
  en: ["Banner builder", "Title", "Best roster", "Match potential", "Teams", "Traits", "Reroll guide", "Rules"],
  ru: ["Калькулятор знамён", "Титул", "Лучший состав", "Потенциал матчей", "Команды", "Свойства", "Что роллить", "Правила"],
  es: ["Constructor", "Título", "Mejor plantilla", "Potencial", "Equipos", "Rasgos", "Guía de reroll", "Reglas"],
  zh: ["旗帜构建", "称号", "最佳阵容", "比赛潜力", "战队", "特性", "重掷指南", "规则"]
};

const anchors = ["builder", "titles", "results", "playoff-outlook", "teams", "traits", "rerolls", "rules"];

function readLanguage(): SiteLanguage {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem("site-language") as SiteLanguage | null;
  return saved && ["en", "ru", "es", "zh"].includes(saved) ? saved : "en";
}

export default function FantasySubnav() {
  const [language, setLanguage] = useState<SiteLanguage>("en");

  useEffect(() => {
    setLanguage(readLanguage());
    const onLanguage = (event: Event) => {
      const custom = event as CustomEvent<{ language?: SiteLanguage }>;
      if (custom.detail?.language) setLanguage(custom.detail.language);
      else setLanguage(readLanguage());
    };
    window.addEventListener("site-language-change", onLanguage);
    window.addEventListener("storage", onLanguage);
    return () => {
      window.removeEventListener("site-language-change", onLanguage);
      window.removeEventListener("storage", onLanguage);
    };
  }, []);

  return (
    <nav className="fantasy-subnav" aria-label="Fantasy calculator sections">
      <div className="fantasy-subnav-inner">
        {anchors.map((anchor, index) => <a key={anchor} href={`#${anchor}`}>{labels[language][index]}</a>)}
      </div>
    </nav>
  );
}
