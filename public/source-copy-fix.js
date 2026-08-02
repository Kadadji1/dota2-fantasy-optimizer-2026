(() => {
  const replacements = new Map([
    ["Reddit dataset · 13 Tier 1 tournaments", "Professional match statistics · 13 Tier 1 tournaments"],
    ["Данные Reddit · 13 турниров Tier 1", "Статистика профессиональных матчей · 13 турниров Tier 1"],
    ["Datos de Reddit · 13 torneos Tier 1", "Estadísticas de partidos profesionales · 13 torneos Tier 1"],
    ["Reddit 数据 · 13 项 Tier 1 赛事", "职业比赛统计 · 13 项 Tier 1 赛事"],
    ["Teams represented by players in the current Reddit dataset.", "Teams represented by players in the current professional match dataset."],
    ["Команды, игроки которых представлены в текущем датасете Reddit.", "Команды, игроки которых представлены в текущей статистике профессиональных матчей."],
    ["Equipos representados por jugadores del conjunto de datos actual de Reddit.", "Equipos representados por jugadores del conjunto actual de estadísticas de partidos profesionales."],
    ["当前 Reddit 数据集中包含的参赛战队。", "当前职业比赛统计中包含的参赛战队。"]
  ]);

  let applying = false;

  function replaceText() {
    if (applying || !document.body) return;
    applying = true;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style")) return;
      const value = node.nodeValue || "";
      const trimmed = value.trim();
      const replacement = replacements.get(trimmed);
      if (replacement) node.nodeValue = value.replace(trimmed, replacement);
    });
    applying = false;
  }

  const observer = new MutationObserver(replaceText);
  window.addEventListener("DOMContentLoaded", () => {
    replaceText();
    observer.observe(document.body, { subtree: true, childList: true, characterData: true });
  });
})();
