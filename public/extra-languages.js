(() => {
  const translations = {
    es: {
      "Dota 2 Fantasy Optimizer": "Optimizador Fantasy de Dota 2",
      "Build all three banners, compare roster combinations and understand exactly where every projected point comes from.": "Configura los tres estandartes, compara combinaciones y descubre de dónde sale cada punto proyectado.",
      "Banner builder": "Constructor de estandartes",
      "Best roster": "Mejor alineación",
      "Teams": "Equipos",
      "Teams represented by players in the current Reddit dataset.": "Equipos representados por jugadores del conjunto de datos actual de Reddit.",
      "Traits": "Propiedades",
      "Reroll guide": "Guía de rerolls",
      "Rules": "Reglas",
      "Methodology": "Metodología",
      "Core": "Core",
      "Mid": "Mid",
      "Support": "Support",
      "same-team pair": "pareja del mismo equipo",
      "one player": "un jugador",
      "Emblem": "Emblema",
      "Tier": "Nivel",
      "Trait": "Propiedad",
      "Optimize roster": "Optimizar alineación",
      "Reset banners": "Restablecer estandartes",
      "Projected roster score": "Puntuación proyectada",
      "Projected score": "Puntuación proyectada",
      "Top alternatives": "Mejores alternativas",
      "Reddit dataset · 13 Tier 1 tournaments": "Datos de Reddit · 13 torneos Tier 1",
      "Coach title support is next. Current calculations include emblem tiers and traits only.": "Los títulos de entrenador llegarán después. Ahora el cálculo incluye niveles y propiedades de los emblemas.",
      "Sample strength": "Calidad de la muestra",
      "Strong": "Alta",
      "Medium": "Media",
      "Limited": "Limitada",
      "matches in the source dataset": "partidas en el conjunto de datos",
      "Roles represented": "Roles representados",
      "Available-role total": "Total de roles disponibles",
      "red": "rojo",
      "blue": "azul",
      "green": "verde",
      "GPM": "GPM",
      "Deaths": "Muertes",
      "Creeps": "Creeps",
      "Madstones": "Madstones",
      "Kills": "Asesinatos",
      "Towers": "Torres",
      "Teamfight": "Peleas de equipo",
      "Stuns": "Aturdimientos",
      "Tormentor kills": "Muertes de Tormentor",
      "Roshan kills": "Muertes de Roshan",
      "First Blood": "Primera sangre",
      "Courier kills": "Muertes de couriers",
      "Wards placed": "Wards colocados",
      "Camps stacked": "Campamentos stackeados",
      "Lotuses": "Lotos",
      "Watchers": "Watchers capturados",
      "Runes": "Runas",
      "Smoke uses": "Usos de Smoke of Deceit",
      "No trait": "Sin propiedad",
      "Fractal": "Fractal",
      "Benevolent": "Benévola",
      "Vampiric": "Vampírica",
      "Unique": "Única",
      "Friendly": "Amistosa",
      "+60% to this emblem if all three emblem tiers are different": "+60% a este emblema si los tres niveles del estandarte son diferentes",
      "+20% to adjacent emblems": "+20% a los emblemas adyacentes",
      "+50% to this emblem and −10% to adjacent emblems": "+50% a este emblema y −10% a los emblemas adyacentes",
      "+30% to this emblem if there are no other Unique emblems on the banner": "+30% a este emblema si no hay otros emblemas Únicos en el estandarte",
      "+50% to this emblem if the banner has at least three Friendly emblems": "+50% a este emblema si el estandarte tiene al menos tres emblemas Amistosos",
      "Each game is scored separately.": "Cada partida se puntúa por separado.",
      "A match result is the sum of the two highest-scoring games in that series.": "El resultado del match es la suma de las dos partidas con mayor puntuación de la serie.",
      "A player or pair value is the average match score over the selected source tournaments.": "El valor de un jugador o pareja es el promedio por match en los torneos seleccionados.",
      "Death score is not clamped at zero and can become negative.": "La puntuación por muertes no se limita a cero y puede ser negativa.",
      "Lotus data is approximate because OpenDota does not expose the exact pickup event.": "Los datos de lotos son aproximados porque OpenDota no ofrece el evento exacto de recogida.",
      "Two suffixes cannot be modeled reliably with OpenDota: pre-horn first blood and fountain kills.": "Dos sufijos no pueden modelarse de forma fiable con OpenDota: primera sangre antes del cuerno y muertes en la fuente.",
      "Trait effects are applied multiplicatively to the tier-adjusted emblem contribution.": "Los efectos de las propiedades se aplican de forma multiplicativa después del ajuste por nivel.",
      "Made by Kadadji": "Hecho por Kadadji",
      "Community-built Dota 2 fantasy tool. Not affiliated with Valve Corporation.": "Herramienta comunitaria de Fantasy para Dota 2. No afiliada con Valve Corporation.",
      "Buy me a coffee": "Apoyar el proyecto"
    },
    zh: {
      "Dota 2 Fantasy Optimizer": "Dota 2 梦幻阵容优化器",
      "Build all three banners, compare roster combinations and understand exactly where every projected point comes from.": "配置三面旗帜，对比阵容组合，并查看每一项预测积分的来源。",
      "Banner builder": "旗帜配置",
      "Best roster": "最佳阵容",
      "Teams": "战队",
      "Teams represented by players in the current Reddit dataset.": "当前 Reddit 数据集中包含的参赛战队。",
      "Traits": "属性",
      "Reroll guide": "重铸指南",
      "Rules": "规则",
      "Methodology": "计算方法",
      "Core": "核心",
      "Mid": "中单",
      "Support": "辅助",
      "same-team pair": "同队双人组合",
      "one player": "单名选手",
      "Emblem": "徽记",
      "Tier": "等级",
      "Trait": "属性",
      "Optimize roster": "计算最佳阵容",
      "Reset banners": "重置旗帜",
      "Projected roster score": "阵容预测积分",
      "Projected score": "预测积分",
      "Top alternatives": "备选排名",
      "Reddit dataset · 13 Tier 1 tournaments": "Reddit 数据 · 13 项 Tier 1 赛事",
      "Coach title support is next. Current calculations include emblem tiers and traits only.": "教练称号将在后续加入。目前计算仅包含徽记等级与属性。",
      "Sample strength": "样本强度",
      "Strong": "高",
      "Medium": "中",
      "Limited": "有限",
      "matches in the source dataset": "场比赛样本",
      "Roles represented": "已覆盖位置",
      "Available-role total": "可用位置总分",
      "red": "红色",
      "blue": "蓝色",
      "green": "绿色",
      "GPM": "GPM",
      "Deaths": "死亡",
      "Creeps": "正补",
      "Madstones": "疯狂之石",
      "Kills": "击杀",
      "Towers": "防御塔",
      "Teamfight": "团战参与",
      "Stuns": "眩晕",
      "Tormentor kills": "苦难者击杀",
      "Roshan kills": "Roshan 击杀",
      "First Blood": "一血",
      "Courier kills": "信使击杀",
      "Wards placed": "插眼",
      "Camps stacked": "拉野",
      "Lotuses": "莲花",
      "Watchers": "占领观察者",
      "Runes": "神符",
      "Smoke uses": "诡计之雾使用次数",
      "No trait": "无属性",
      "Fractal": "分形",
      "Benevolent": "慈善",
      "Vampiric": "吸血",
      "Unique": "独特",
      "Friendly": "友善",
      "+60% to this emblem if all three emblem tiers are different": "若三枚徽记等级各不相同，则此徽记 +60%",
      "+20% to adjacent emblems": "相邻徽记 +20%",
      "+50% to this emblem and −10% to adjacent emblems": "此徽记 +50%，相邻徽记 −10%",
      "+30% to this emblem if there are no other Unique emblems on the banner": "若旗帜上没有其他独特徽记，则此徽记 +30%",
      "+50% to this emblem if the banner has at least three Friendly emblems": "若旗帜上至少有三枚友善徽记，则此徽记 +50%",
      "Each game is scored separately.": "每局比赛单独计分。",
      "A match result is the sum of the two highest-scoring games in that series.": "一场系列赛的结果取其中得分最高的两局之和。",
      "A player or pair value is the average match score over the selected source tournaments.": "选手或组合数值为所选赛事中的系列赛平均得分。",
      "Death score is not clamped at zero and can become negative.": "死亡项得分不设零分下限，可能为负数。",
      "Lotus data is approximate because OpenDota does not expose the exact pickup event.": "由于 OpenDota 不提供精确拾取事件，莲花数据为近似值。",
      "Two suffixes cannot be modeled reliably with OpenDota: pre-horn first blood and fountain kills.": "OpenDota 无法可靠计算两个后缀：号角前一血和泉水击杀。",
      "Trait effects are applied multiplicatively to the tier-adjusted emblem contribution.": "属性效果在等级加成后的徽记贡献上以乘法方式计算。",
      "Made by Kadadji": "Kadadji 制作",
      "Community-built Dota 2 fantasy tool. Not affiliated with Valve Corporation.": "社区制作的 Dota 2 梦幻工具，与 Valve Corporation 无关联。",
      "Buy me a coffee": "支持项目"
    }
  };

  let activeExtraLanguage = null;
  let applying = false;

  function translateText(value, language) {
    const trimmed = value.trim();
    const map = translations[language];
    if (!trimmed || !map) return value;
    let translated = map[trimmed];
    if (!translated) {
      const emblemMatch = trimmed.match(/^Emblem\s+(\d+)$/);
      if (emblemMatch) translated = language === "es" ? `Emblema ${emblemMatch[1]}` : `徽记 ${emblemMatch[1]}`;
      const sampleMatch = trimmed.match(/^Sample strength:\s*(Strong|Medium|Limited)$/);
      if (sampleMatch) {
        const label = language === "es" ? "Calidad de la muestra" : "样本强度";
        translated = `${label}: ${map[sampleMatch[1]]}`;
      }
    }
    if (!translated) return value;
    return value.replace(trimmed, translated);
  }

  function applyLanguage(language) {
    if (!translations[language] || applying) return;
    applying = true;
    activeExtraLanguage = language;
    document.documentElement.lang = language === "zh" ? "zh-CN" : "es";
    document.title = language === "es" ? "Optimizador Fantasy de Dota 2 2026" : "Dota 2 2026 梦幻阵容优化器";

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style")) return;
      node.nodeValue = translateText(node.nodeValue || "", language);
    });

    document.querySelectorAll(".language-switch button").forEach((button) => button.classList.remove("active"));
    document.querySelector(`.language-switch button[data-extra-language="${language}"]`)?.classList.add("active");
    applying = false;
  }

  function restoreBuiltIn(language) {
    activeExtraLanguage = null;
    document.documentElement.lang = language;
    document.title = "Dota 2 Fantasy Optimizer 2026";
  }

  function mountButtons() {
    const switcher = document.querySelector(".language-switch");
    if (!switcher || switcher.querySelector("[data-extra-language]")) return;

    const es = document.createElement("button");
    es.type = "button";
    es.textContent = "ES";
    es.dataset.extraLanguage = "es";
    es.setAttribute("aria-label", "Español");

    const zh = document.createElement("button");
    zh.type = "button";
    zh.textContent = "中文";
    zh.dataset.extraLanguage = "zh";
    zh.setAttribute("aria-label", "简体中文");

    switcher.append(es, zh);

    [es, zh].forEach((button) => button.addEventListener("click", () => {
      const language = button.dataset.extraLanguage;
      const english = Array.from(switcher.querySelectorAll("button")).find((item) => item.textContent?.trim() === "EN");
      if (english && !english.classList.contains("active")) english.click();
      window.setTimeout(() => applyLanguage(language), 30);
    }));

    Array.from(switcher.querySelectorAll("button")).forEach((button) => {
      if (button.dataset.extraLanguage) return;
      button.addEventListener("click", () => restoreBuiltIn(button.textContent?.trim() === "RU" ? "ru" : "en"));
    });
  }

  function refresh() {
    mountButtons();
    if (activeExtraLanguage) applyLanguage(activeExtraLanguage);
  }

  let queued = false;
  const schedule = () => {
    if (queued || applying) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      refresh();
    });
  };

  new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", refresh);
  else refresh();
})();