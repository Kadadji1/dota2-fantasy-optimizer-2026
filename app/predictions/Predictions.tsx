"use client";

import { useEffect, useState } from "react";

type SiteLanguage = "en" | "ru" | "es" | "zh";

const copy: Record<SiteLanguage, { eyebrow: string; title: string; body: string; lock: string; lockDate: string; event: string; eventDate: string; cards: Array<{ value: string; title: string; body: string }>; note: string }> = {
  en: { eyebrow: "THE INTERNATIONAL 2026 · MAIN EVENT", title: "Main Event Fantasy is open", body: "The Group Stage roster is locked. Your existing three emblems stay on every banner, and the Main Event adds two new slots to each one.", lock: "Main Event roster lock", lockDate: "August 19", event: "Main Event", eventDate: "August 20–23", cards: [{ value: "5", title: "Emblems per banner", body: "Core: red–green–red–green–red · Mid: red–blue–green–red–green · Support: blue–green–blue–green–blue." }, { value: "30", title: "New rerolls", body: "A separate Main Event pool. Use them before roster lock; player changes are free and do not alter your emblems." }, { value: "BO3", title: "Main Event format", body: "All playoff series are best of three, except the Grand Final, which is best of five." }], note: "The calculator has switched to five-emblem scoring. The Main Event player pool will be narrowed to the eight qualified teams as soon as the final bracket is confirmed." },
  ru: { eyebrow: "THE INTERNATIONAL 2026 · ОСНОВНОЙ ЭТАП", title: "Fantasy основного этапа открыт", body: "Состав группового этапа уже закреплён. Первые три эмблемы на каждом знамени сохраняются, а для основного этапа открываются ещё два слота.", lock: "Фиксация состава Main Event", lockDate: "19 августа", event: "Основной этап", eventDate: "20–23 августа", cards: [{ value: "5", title: "Эмблем на знамени", body: "Основа: красная–зелёная–красная–зелёная–красная · Центр: красная–синяя–зелёная–красная–зелёная · Поддержка: синяя–зелёная–синяя–зелёная–синяя." }, { value: "30", title: "Новых рероллов", body: "Отдельный запас для Main Event. Используйте их до фиксации; смена игроков бесплатна и не меняет эмблемы." }, { value: "BO3", title: "Формат Main Event", body: "Все серии плей-офф — до двух побед, кроме гранд-финала до трёх побед." }], note: "Калькулятор уже считает пять эмблем. Как только окончательно подтвердится сетка, пул игроков Main Event будет ограничен восемью прошедшими командами." },
  es: { eyebrow: "THE INTERNATIONAL 2026 · EVENTO PRINCIPAL", title: "Fantasy del Evento Principal está abierto", body: "La plantilla de la fase de grupos está bloqueada. Los tres emblemas existentes se conservan y el Evento Principal añade dos espacios nuevos a cada estandarte.", lock: "Cierre de plantilla del Evento Principal", lockDate: "19 de agosto", event: "Evento Principal", eventDate: "20–23 de agosto", cards: [{ value: "5", title: "Emblemas por estandarte", body: "Core: rojo–verde–rojo–verde–rojo · Mid: rojo–azul–verde–rojo–verde · Support: azul–verde–azul–verde–azul." }, { value: "30", title: "Rerolls nuevos", body: "Un fondo separado para el Evento Principal. Úsalos antes del cierre; cambiar jugadores es gratis y no altera emblemas." }, { value: "BO3", title: "Formato del Evento Principal", body: "Todas las series de playoffs son al mejor de tres, salvo la Gran Final al mejor de cinco." }], note: "La calculadora ya usa puntuación de cinco emblemas. El grupo de jugadores se limitará a los ocho equipos clasificados cuando se confirme el cuadro final." },
  zh: { eyebrow: "THE INTERNATIONAL 2026 · 主赛事", title: "主赛事 Fantasy 已开放", body: "小组赛阵容已锁定。每面旗帜原有的三枚徽章会保留，主赛事为每面旗帜新增两个槽位。", lock: "主赛事阵容锁定", lockDate: "8月19日", event: "主赛事", eventDate: "8月20日–23日", cards: [{ value: "5", title: "每面旗帜的徽章", body: "核心位：红–绿–红–绿–红 · 中单：红–蓝–绿–红–绿 · 辅助：蓝–绿–蓝–绿–蓝。" }, { value: "30", title: "新的重掷次数", body: "主赛事有独立的重掷池。锁定前请用完；更换选手免费且不会改变徽章。" }, { value: "BO3", title: "主赛事赛制", body: "除五局三胜的总决赛外，所有淘汰赛系列赛均为三局两胜。" }], note: "计算器现已按五枚徽章计分。最终对阵表确认后，主赛事选手池将限定为晋级的八支队伍。" }
};

function readLanguage(): SiteLanguage {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem("site-language") as SiteLanguage | null;
  return stored && copy[stored] ? stored : "en";
}

export default function Predictions() {
  const [language, setLanguage] = useState<SiteLanguage>("en");
  useEffect(() => {
    setLanguage(readLanguage());
    const onLanguage = (event: Event) => {
      const custom = event as CustomEvent<{ language?: SiteLanguage }>;
      setLanguage(custom.detail?.language && copy[custom.detail.language] ? custom.detail.language : readLanguage());
    };
    window.addEventListener("site-language-change", onLanguage);
    return () => window.removeEventListener("site-language-change", onLanguage);
  }, []);
  const t = copy[language];
  return <main className="site-shell predictions-page main-event-page">
    <section className="main-event-hero"><span className="eyebrow">{t.eyebrow}</span><h1>{t.title}</h1><p>{t.body}</p><div className="main-event-dates"><div><span>{t.lock}</span><strong>{t.lockDate}</strong></div><div><span>{t.event}</span><strong>{t.eventDate}</strong></div></div></section>
    <section className="main-event-grid" aria-label="Main Event fantasy changes">{t.cards.map((card) => <article key={card.title}><strong>{card.value}</strong><h2>{card.title}</h2><p>{card.body}</p></article>)}</section>
    <p className="main-event-note">{t.note}</p>
  </main>;
}
