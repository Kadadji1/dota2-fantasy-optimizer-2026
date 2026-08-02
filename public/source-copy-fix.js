(() => {
  const sourceByLanguage = {
    en: "Professional match statistics · 13 Tier 1 tournaments",
    ru: "Статистика профессиональных матчей · 13 турниров Tier 1",
    es: "Estadísticas de partidos profesionales · 13 torneos Tier 1",
    zh: "职业比赛统计 · 13 项 Tier 1 赛事"
  };

  const teamsByLanguage = {
    en: "Teams represented by players in the current professional match dataset.",
    ru: "Команды, игроки которых представлены в текущей статистике профессиональных матчей.",
    es: "Equipos representados por jugadores del conjunto actual de estadísticas de partidos profesionales.",
    zh: "当前职业比赛统计中包含的参赛战队。"
  };

  const sourceVariants = new Set([
    "Reddit dataset · 13 Tier 1 tournaments",
    "Данные Reddit · 13 турниров Tier 1",
    "Datos de Reddit · 13 torneos Tier 1",
    "Reddit 数据 · 13 项 Tier 1 赛事",
    ...Object.values(sourceByLanguage)
  ]);

  const teamVariants = new Set([
    "Teams represented by players in the current Reddit dataset.",
    "Команды, игроки которых представлены в текущем датасете Reddit.",
    "Equipos representados por jugadores del conjunto de datos actual de Reddit.",
    "当前 Reddit 数据集中包含的参赛战队。",
    ...Object.values(teamsByLanguage)
  ]);

  let applying = false;
  let scheduled = false;

  function getActiveLanguage() {
    const active = document.querySelector(".language-switch button.active");
    const label = active?.textContent?.trim();
    if (label === "RU") return "ru";
    if (label === "ES") return "es";
    if (label === "中文") return "zh";
    return "en";
  }

  function replaceText() {
    scheduled = false;
    if (applying || !document.body) return;
    applying = true;

    const language = getActiveLanguage();
    const sourceTarget = sourceByLanguage[language];
    const teamsTarget = teamsByLanguage[language];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];

    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style")) return;

      const value = node.nodeValue || "";
      const trimmed = value.trim();
      let target = null;

      if (sourceVariants.has(trimmed)) target = sourceTarget;
      else if (teamVariants.has(trimmed)) target = teamsTarget;

      if (target && trimmed !== target) {
        node.nodeValue = value.replace(trimmed, target);
      }
    });

    applying = false;
  }

  function scheduleReplace() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(replaceText);
  }

  const observer = new MutationObserver(scheduleReplace);

  window.addEventListener("DOMContentLoaded", () => {
    replaceText();
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["class"]
    });

    document.querySelector(".language-switch")?.addEventListener("click", () => {
      window.setTimeout(scheduleReplace, 100);
    });
  });
})();
