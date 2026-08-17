(() => {
  const common = {
    es: {
      "Dota 2 Fantasy Optimizer":"Optimizador Fantasy de Dota 2","Main Event is open: complete all five emblems on each banner, compare roster combinations and see every projected point.":"El Evento Principal está abierto: completa los cinco emblemas de cada estandarte, compara combinaciones y consulta cada punto proyectado.",
      "Banner builder":"Constructor de estandartes","Title":"Título","Best roster":"Mejor alineación","Teams":"Equipos","The eight active Main Event teams represented in the Fantasy player sample.":"Los ocho equipos activos del Evento Principal incluidos en la muestra Fantasy.","Teams represented by players in the current Reddit dataset.":"Equipos representados por jugadores del conjunto de datos actual.","Traits":"Propiedades","Reroll guide":"Guía de rerolls","Rules":"Reglas","Methodology":"Metodología",
      "Core":"Core","Mid":"Mid","Support":"Support","same-team pair":"pareja del mismo equipo","one player":"un jugador","Emblem":"Emblema","Tier":"Nivel","Trait":"Propiedad","Optimize roster":"Optimizar alineación","Reset banners":"Restablecer estandartes","Projected roster score":"Puntuación proyectada","Projected score":"Puntuación proyectada","Top alternatives":"Mejores alternativas",
      "Fantasy player sample · 1,601 matches across 13 Tier 1 tournaments":"Muestra Fantasy · 1.601 partidos en 13 torneos Tier 1","Per-match projection; team map potential is shown separately.":"Proyección por partido; el potencial de mapas del equipo se muestra por separado.","What is being picked at TI":"Qué se elige en TI","A Prefix triggers when a player drafts a hero from its group. Group Stage draft data (109 maps) shows how often each group is available and how well it performs.":"Un Prefijo se activa cuando el jugador elige un héroe de su grupo. Los drafts de la fase de grupos (109 mapas) muestran su disponibilidad y rendimiento.","per map":"por mapa","bans":"vetos","wins":"victorias","Many bans with fewer picks means the group is respected, but its Prefix may trigger less often. The personalized recommendation above still uses each player's historical trigger rate.":"Muchos vetos y pocas elecciones indican respeto, pero el Prefijo puede activarse menos. La recomendación personalizada sigue usando la frecuencia histórica del jugador.","Main Event match potential":"Potencial de partidos del Evento Principal","Only the eight active teams are included. These thresholds come from the balanced bracket model; expected maps are context and do not change the per-match player ranking.":"Solo se incluyen los ocho equipos activos. Los umbrales vienen del modelo equilibrado; los mapas esperados son contexto y no cambian la clasificación por partido.","matches":"partidos","title":"título","maps ahead":"mapas restantes","Model estimate · season strength + this TI":"Estimación · temporada + este TI","Coach title support is next. Current calculations include emblem tiers and traits only.":"Los títulos de entrenador están disponibles en la sección de títulos.",
      "Sample strength":"Calidad de la muestra","Strong":"Alta","Medium":"Media","Limited":"Limitada","matches in the source dataset":"partidas en el conjunto de datos","Roles represented":"Roles representados","Available-role total":"Total de roles disponibles",
      "red":"rojo","blue":"azul","green":"verde","GPM":"GPM","Deaths":"Muertes","Creeps":"Creeps","Madstones":"Madstones","Kills":"Asesinatos","Towers":"Torres","Teamfight":"Peleas de equipo","Stuns":"Aturdimientos","Tormentor kills":"Muertes de Tormentor","Roshan kills":"Muertes de Roshan","First Blood":"Primera sangre","Courier kills":"Muertes de couriers","Wards placed":"Wards colocados","Camps stacked":"Campamentos stackeados","Lotuses":"Lotos","Watchers":"Watchers capturados","Runes":"Runas","Smoke uses":"Usos de Smoke of Deceit",
      "No trait":"Sin propiedad","Fractal":"Fractal","Benevolent":"Benévola","Vampiric":"Vampírica","Unique":"Única","Friendly":"Amistosa",
      "+60% to this emblem if all five emblem tiers are different":"+60% a este emblema si los cinco niveles son diferentes","+20% to adjacent emblems":"+20% a los emblemas adyacentes","+50% to this emblem and −10% to adjacent emblems":"+50% a este emblema y −10% a los adyacentes","+30% to this emblem if there are no other Unique emblems on the banner":"+30% si no hay otros emblemas Únicos","+50% to this emblem if the banner has at least three Friendly emblems":"+50% si el estandarte tiene al menos tres emblemas Amistosos",
      "Choose one Prefix + Suffix for the entire Fantasy roster. Both bonuses apply independently to each player’s game score when their conditions are met. Changing the title does not use roll tokens.":"Elige un Prefijo + Sufijo para toda la alineación Fantasy. Ambos bonos se aplican de forma independiente a cada jugador cuando se cumplen sus condiciones. Cambiar el título no consume fichas de reroll.",
      "Prefix":"Prefijo","Suffix":"Sufijo","Expected Prefix bonus":"Bono esperado del prefijo","Historical match rate":"Frecuencia histórica","Recommended Prefix":"Prefijo recomendado","Use recommended":"Usar recomendado","Best Prefixes for this roster":"Mejores prefijos para esta alineación","Score if Suffix triggers":"Puntuación si se activa el sufijo","Conditional bonus":"Bono condicional","Stable":"Estable","Gamble":"Arriesgado","Avoid":"Evitar","pair average":"promedio de la pareja","Expected Prefix":"Prefijo esperado",
      "Suffix events cannot be projected reliably before the games. The value below adds the Suffix bonus to the base roster score independently from the expected Prefix bonus.":"Los eventos de sufijo no pueden proyectarse con fiabilidad antes de las partidas. El valor inferior añade el bono del sufijo al resultado base de forma independiente del prefijo esperado.",
      "Prefix projections use each player's historical trigger rate. Pair entries use the simple average of both players because the source score is stored as a pair.":"Las proyecciones de prefijo usan la frecuencia histórica de activación de cada jugador. Para parejas se utiliza el promedio simple de ambos jugadores.",
      "Crimson":"Carmesí","Cerulean":"Cerúleo","Emerald":"Esmeralda","Royal":"Real","Golden":"Dorado","Elemental":"Elemental","Otherworldly":"Ultraterreno","Heroic":"Heroico",
      "when playing a red hero":"al jugar con un héroe rojo","when playing a blue hero":"al jugar con un héroe azul","when playing a green hero":"al jugar con un héroe verde","when playing a purple hero":"al jugar con un héroe morado","when playing a yellow or brown hero":"al jugar con un héroe amarillo o marrón","when playing a water, fire or ice hero":"al jugar con un héroe de agua, fuego o hielo","when playing an undead, demon or spirit hero":"al jugar con un no-muerto, demonio o espíritu","when playing a masked or cloaked hero":"al jugar con un héroe enmascarado o con capa",
      "the Tormented":"el Atormentado","the Flayed Twins Acolyte":"el Acólito de los Gemelos Desollados","the Patient":"el Paciente","the Underdog":"el Desvalido","the Decisive":"el Decisivo","the Clutch":"el Clutch","the Lucky":"el Afortunado","the Cruel":"el Cruel",
      "if any roster player dies to a Tormentor":"si algún jugador del roster muere ante un Tormentor","if first blood happens before the starting horn":"si la primera sangre ocurre antes del cuerno inicial","if first blood does not happen before 10:00":"si no hay primera sangre antes de 10:00","if that player's team loses":"si pierde el equipo de ese jugador","if the game ends before 25:00":"si la partida termina antes de 25:00","in the last possible game of a match":"en la última partida posible de una serie","if the game duration ends in the digit 8":"si la duración de la partida termina en 8","if a player is killed at their own fountain":"si un jugador muere en su propia fuente",
      "Each game is scored separately.":"Cada partida se puntúa por separado.","A match result is the sum of the two highest-scoring games in that series.":"El resultado del match es la suma de las dos partidas con mayor puntuación de la serie.","A player or pair value is the average match score over the selected source tournaments.":"El valor de un jugador o pareja es el promedio por match en los torneos seleccionados.","Death score is not clamped at zero and can become negative.":"La puntuación por muertes puede ser negativa.","Lotus data is approximate because OpenDota does not expose the exact pickup event.":"Los datos de lotos son aproximados porque OpenDota no ofrece el evento exacto de recogida.","Prefix expected value equals projected player score × historical trigger rate × Prefix bonus.":"El valor esperado del prefijo = puntuación proyectada × frecuencia histórica × bono del prefijo.","Suffixes are displayed as conditional scenarios. Their bonus is calculated independently from the base score and does not multiply the expected Prefix bonus.":"Los sufijos se muestran como escenarios condicionales. Su bono se calcula de forma independiente y no multiplica el bono esperado del prefijo.","Two suffixes cannot be modeled reliably with OpenDota: pre-horn first blood and fountain kills.":"Dos sufijos no pueden modelarse con fiabilidad: primera sangre antes del cuerno y muertes en la fuente.","Trait effects are applied multiplicatively to the tier-adjusted emblem contribution.":"Los efectos de propiedades se aplican de forma multiplicativa.",
      "107 × kills":"107 × asesinatos","1950 − 195 × deaths":"1950 − 195 × muertes","3 × creeps":"3 × creeps","2 × GPM":"2 × GPM","13 × madstones":"13 × madstones","352 × towers":"352 × torres","117 × wards placed":"117 × wards colocados","234 × camps stacked":"234 × campamentos stackeados","141 × runes":"141 × runas","147 × watchers captured":"147 × watchers capturados","176 × lotuses (approx.)":"176 × lotos (aprox.)","293 × Smoke of Deceit uses":"293 × usos de Smoke of Deceit","2124 × teamfight participation":"2124 × participación en peleas de equipo","10 × stun duration":"10 × duración de aturdimientos","1934 × first blood":"1934 × primera sangre","879 × Tormentor kills":"879 × muertes de Tormentor","1172 × Roshan kills":"1172 × muertes de Roshan","703 × courier kills":"703 × muertes de couriers",
      "Made by Kadadji":"Hecho por Kadadji","Community-built Dota 2 fantasy tool. Not affiliated with Valve Corporation.":"Herramienta comunitaria de Fantasy para Dota 2. No afiliada con Valve Corporation.","Buy me a coffee":"Apoyar el proyecto"
    },
    zh: {
      "Dota 2 Fantasy Optimizer":"Dota 2 Fantasy 阵容优化器","Main Event is open: complete all five emblems on each banner, compare roster combinations and see every projected point.":"主赛事已开放：完成每面旗帜的五枚徽章，对比阵容组合，并查看每一项预测积分。",
      "Banner builder":"旗帜配置","Title":"称号","Best roster":"最佳阵容","Teams":"战队","The eight active Main Event teams represented in the Fantasy player sample.":"Fantasy 选手样本中的八支主赛事在赛战队。","Teams represented by players in the current Reddit dataset.":"当前数据集中包含选手的参赛战队。","Traits":"属性","Reroll guide":"重掷指南","Rules":"规则","Methodology":"计算方法",
      "Core":"核心位","Mid":"中单","Support":"辅助","same-team pair":"同队双人组合","one player":"单名选手","Emblem":"徽章","Tier":"等级","Trait":"属性","Optimize roster":"计算最佳阵容","Reset banners":"重置旗帜","Projected roster score":"阵容预测积分","Projected score":"预测积分","Top alternatives":"备选阵容",
      "Fantasy player sample · 1,601 matches across 13 Tier 1 tournaments":"Fantasy 选手样本 · 13 项 Tier 1 赛事共 1,601 场","Per-match projection; team map potential is shown separately.":"按场预测；战队剩余地图潜力单独显示。","What is being picked at TI":"TI 当前选用情况","A Prefix triggers when a player drafts a hero from its group. Group Stage draft data (109 maps) shows how often each group is available and how well it performs.":"选手选择对应组别英雄时会触发前缀。小组赛 109 张地图的 BP 数据显示各组别的可用率和表现。","per map":"每张地图","bans":"禁用","wins":"胜率","Many bans with fewer picks means the group is respected, but its Prefix may trigger less often. The personalized recommendation above still uses each player's historical trigger rate.":"禁用多而选用少说明该组别受重视，但前缀可能较少触发。个性化推荐仍使用选手历史触发频率。","Main Event match potential":"主赛事比赛潜力","Only the eight active teams are included. These thresholds come from the balanced bracket model; expected maps are context and do not change the per-match player ranking.":"仅包含八支在赛战队。阈值来自综合对阵模型；预计地图数仅作参考，不改变按场选手排名。","matches":"场比赛","title":"冠军","maps ahead":"张剩余地图","Model estimate · season strength + this TI":"模型估算 · 赛季实力 + 本届 TI","Coach title support is next. Current calculations include emblem tiers and traits only.":"教练称号已可在称号板块中使用。",
      "Sample strength":"样本强度","Strong":"高","Medium":"中","Limited":"有限","matches in the source dataset":"场比赛样本","Roles represented":"已覆盖位置","Available-role total":"可用位置总分",
      "red":"红色","blue":"蓝色","green":"绿色","GPM":"每分钟金钱","Deaths":"死亡","Creeps":"正补","Madstones":"疯狂之石","Kills":"击杀","Towers":"防御塔","Teamfight":"团战参与","Stuns":"眩晕","Tormentor kills":"苦难者击杀","Roshan kills":"Roshan 击杀","First Blood":"一血","Courier kills":"信使击杀","Wards placed":"插眼","Camps stacked":"拉野","Lotuses":"莲花","Watchers":"占领观察者","Runes":"神符","Smoke uses":"诡计之雾使用次数",
      "No trait":"无属性","Fractal":"分形","Benevolent":"仁慈","Vampiric":"吸血","Unique":"独特","Friendly":"友善",
      "+60% to this emblem if all five emblem tiers are different":"若五枚徽章等级各不相同，则此徽章 +60%","+20% to adjacent emblems":"相邻徽章 +20%","+50% to this emblem and −10% to adjacent emblems":"此徽章 +50%，相邻徽章 −10%","+30% to this emblem if there are no other Unique emblems on the banner":"若旗帜上没有其他独特徽章，则此徽章 +30%","+50% to this emblem if the banner has at least three Friendly emblems":"若旗帜上至少有三枚友善徽章，则此徽章 +50%",
      "Choose one Prefix + Suffix for the entire Fantasy roster. Both bonuses apply independently to each player’s game score when their conditions are met. Changing the title does not use roll tokens.":"为整个 Fantasy 阵容选择一个前缀和一个后缀。当各自条件满足时，两种加成会独立应用于每位选手的单局得分。更换称号不会消耗重掷代币。",
      "Prefix":"前缀","Suffix":"后缀","Expected Prefix bonus":"前缀预期加成","Historical match rate":"历史触发率","Recommended Prefix":"推荐前缀","Use recommended":"使用推荐","Best Prefixes for this roster":"当前阵容最佳前缀","Score if Suffix triggers":"后缀触发时得分","Conditional bonus":"条件加成","Stable":"稳定","Gamble":"博弈","Avoid":"不推荐","pair average":"组合平均值","Expected Prefix":"预期前缀加成",
      "Suffix events cannot be projected reliably before the games. The value below adds the Suffix bonus to the base roster score independently from the expected Prefix bonus.":"比赛开始前无法可靠预测后缀事件。下方数值会将后缀加成独立加入基础阵容得分，不会与前缀预期加成相乘。",
      "Prefix projections use each player's historical trigger rate. Pair entries use the simple average of both players because the source score is stored as a pair.":"前缀预测使用每位选手的历史触发率。双人组合采用两名选手触发率的简单平均值，因为源数据以组合形式存储得分。",
      "Crimson":"绯红","Cerulean":"蔚蓝","Emerald":"翡翠","Royal":"皇家","Golden":"黄金","Elemental":"元素","Otherworldly":"异界","Heroic":"英勇",
      "when playing a red hero":"使用红色英雄时","when playing a blue hero":"使用蓝色英雄时","when playing a green hero":"使用绿色英雄时","when playing a purple hero":"使用紫色英雄时","when playing a yellow or brown hero":"使用黄色或棕色英雄时","when playing a water, fire or ice hero":"使用水、火或冰系英雄时","when playing an undead, demon or spirit hero":"使用亡灵、恶魔或灵体英雄时","when playing a masked or cloaked hero":"使用戴面具或披风的英雄时",
      "the Tormented":"受折磨者","the Flayed Twins Acolyte":"剥皮双子侍从","the Patient":"耐心者","the Underdog":"逆袭者","the Decisive":"果断者","the Clutch":"关键先生","the Lucky":"幸运者","the Cruel":"残酷者",
      "if any roster player dies to a Tormentor":"若阵容中任一选手死于苦难者","if first blood happens before the starting horn":"若一血发生在开局号角前","if first blood does not happen before 10:00":"若 10:00 前没有发生一血","if that player's team loses":"若该选手所在战队输掉比赛","if the game ends before 25:00":"若比赛在 25:00 前结束","in the last possible game of a match":"在系列赛可能进行的最后一局中","if the game duration ends in the digit 8":"若比赛时长最后一位数字为 8","if a player is killed at their own fountain":"若选手在己方泉水处被击杀",
      "Each game is scored separately.":"每局比赛单独计分。","A match result is the sum of the two highest-scoring games in that series.":"一场系列赛取其中 Fantasy 得分最高的两局之和。","A player or pair value is the average match score over the selected source tournaments.":"选手或组合数值为所选赛事中的系列赛平均得分。","Death score is not clamped at zero and can become negative.":"死亡项得分不设零分下限，可能为负数。","Lotus data is approximate because OpenDota does not expose the exact pickup event.":"由于 OpenDota 不提供精确拾取事件，莲花数据为近似值。","Prefix expected value equals projected player score × historical trigger rate × Prefix bonus.":"前缀预期值 = 选手预测得分 × 历史触发率 × 前缀加成。","Suffixes are displayed as conditional scenarios. Their bonus is calculated independently from the base score and does not multiply the expected Prefix bonus.":"后缀以条件情景显示，其加成基于基础得分独立计算，不会与前缀预期加成相乘。","Two suffixes cannot be modeled reliably with OpenDota: pre-horn first blood and fountain kills.":"OpenDota 无法可靠计算两个后缀条件：号角前一血和泉水击杀。","Trait effects are applied multiplicatively to the tier-adjusted emblem contribution.":"属性效果在等级调整后的徽章贡献上以乘法方式计算。",
      "107 × kills":"107 × 击杀","1950 − 195 × deaths":"1950 − 195 × 死亡","3 × creeps":"3 × 正补","2 × GPM":"2 × 每分钟金钱","13 × madstones":"13 × 疯狂之石","352 × towers":"352 × 防御塔","117 × wards placed":"117 × 插眼","234 × camps stacked":"234 × 拉野","141 × runes":"141 × 神符","147 × watchers captured":"147 × 占领观察者","176 × lotuses (approx.)":"176 × 莲花（近似）","293 × Smoke of Deceit uses":"293 × 诡计之雾使用次数","2124 × teamfight participation":"2124 × 团战参与率","10 × stun duration":"10 × 眩晕时长","1934 × first blood":"1934 × 一血","879 × Tormentor kills":"879 × 苦难者击杀","1172 × Roshan kills":"1172 × Roshan 击杀","703 × courier kills":"703 × 信使击杀",
      "Made by Kadadji":"Kadadji 制作","Community-built Dota 2 fantasy tool. Not affiliated with Valve Corporation.":"社区制作的 Dota 2 Fantasy 工具，与 Valve Corporation 无关联。","Buy me a coffee":"支持项目"
    }
  };

  let activeExtraLanguage = null;
  let applying = false;
  let syncing = false;

  function lookupTranslation(trimmed, language) {
    const map = common[language];
    if (!map) return null;
    if (map[trimmed]) return map[trimmed];
    const lower = trimmed.toLowerCase();
    const key = Object.keys(map).find((item) => item.toLowerCase() === lower);
    return key ? map[key] : null;
  }

  function translateText(value, language) {
    const trimmed = value.trim();
    const map = common[language];
    if (!trimmed || !map) return value;

    let translated = lookupTranslation(trimmed, language);
    if (!translated) {
      const emblemMatch = trimmed.match(/^Emblem\s+(\d+)$/i);
      if (emblemMatch) translated = language === "es" ? `Emblema ${emblemMatch[1]}` : `徽章 ${emblemMatch[1]}`;

      const tierMatch = trimmed.match(/^Tier\s+([IV]+)$/i);
      if (tierMatch) translated = language === "es" ? `Nivel ${tierMatch[1]}` : `等级 ${tierMatch[1]}`;

      const sampleMatch = trimmed.match(/^Sample strength:\s*(Strong|Medium|Limited)$/i);
      if (sampleMatch) translated = `${language === "es" ? "Calidad de la muestra" : "样本强度"}: ${lookupTranslation(sampleMatch[1], language) || sampleMatch[1]}`;

      const sectionMatch = trimmed.match(/^(\d{2})\s*·\s*(.+)$/);
      if (sectionMatch) {
        const sectionTranslation = lookupTranslation(sectionMatch[2], language);
        if (sectionTranslation) translated = `${sectionMatch[1]} · ${sectionTranslation}`;
      }

      if (!translated && /\b(red|blue|green)\b/i.test(trimmed)) {
        translated = trimmed
          .replace(/\bred\b/gi, map.red)
          .replace(/\bblue\b/gi, map.blue)
          .replace(/\bgreen\b/gi, map.green);
      }
    }
    return translated ? value.replace(trimmed, translated) : value;
  }

  function applyLanguage(language) {
    if (!common[language] || applying) return;
    applying = true;
    activeExtraLanguage = language;
    document.documentElement.lang = language === "zh" ? "zh-CN" : "es";

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style, .site-master-header, .home-native-hero, .fantasy-subnav")) return;
      node.nodeValue = translateText(node.nodeValue || "", language);
    });

    document.querySelectorAll(".language-switch button").forEach((button) => button.classList.remove("active"));
    document.querySelector(`.language-switch button[data-extra-language="${language}"]`)?.classList.add("active");
    applying = false;
  }

  function restoreBuiltIn(language) {
    activeExtraLanguage = null;
    document.documentElement.lang = language;
  }

  function getSwitcher() {
    return document.querySelector(".calculator-page-body .language-switch") || document.querySelector(".language-switch");
  }

  function clickBuiltIn(language) {
    const switcher = getSwitcher();
    if (!switcher) return false;
    const label = language === "ru" ? "RU" : "EN";
    const button = Array.from(switcher.querySelectorAll("button")).find((item) => !item.dataset.extraLanguage && item.textContent?.trim() === label);
    if (!button) return false;
    if (!button.classList.contains("active")) button.click();
    return true;
  }

  function syncToSiteLanguage(language) {
    if (syncing) return;
    syncing = true;
    mountButtons();

    if (language === "es" || language === "zh") {
      clickBuiltIn("en");
      window.setTimeout(() => {
        applyLanguage(language);
        syncing = false;
      }, 60);
      return;
    }

    activeExtraLanguage = null;
    clickBuiltIn(language === "ru" ? "ru" : "en");
    document.documentElement.lang = language === "ru" ? "ru" : "en";
    syncing = false;
  }

  function mountButtons() {
    const switcher = getSwitcher();
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
      if (!language) return;
      localStorage.setItem("site-language", language);
      clickBuiltIn("en");
      window.setTimeout(() => applyLanguage(language), 60);
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

  window.addEventListener("site-language-change", (event) => {
    const language = event.detail?.language;
    if (["en", "ru", "es", "zh"].includes(language)) syncToSiteLanguage(language);
  });

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

  const start = () => {
    refresh();
    const saved = localStorage.getItem("site-language") || "en";
    window.setTimeout(() => syncToSiteLanguage(saved), 80);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
