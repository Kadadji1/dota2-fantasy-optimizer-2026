(() => {
  const dictionaries = {
    ru: {
      "Fantasy Calculator":"Фэнтези-калькулятор","Predictions":"Прогнозы","Guide":"Гайд",
      "Group Stage Predictions":"Прогнозы группового этапа","Swap any team and the bracket stays complete automatically.":"Меняйте любую команду — сетка автоматически останется полной.",
      "GROUP STAGE · SWISS ROUND 1":"ГРУППОВОЙ ЭТАП · ШВЕЙЦАРСКИЙ РАУНД 1","Round one":"Первый раунд","All times are shown in New York, Eastern Time.":"Все времена указаны по восточному времени Нью-Йорка.","Wed, Aug 12":"Ср, 12 авг.","Thu, Aug 13":"Чт, 13 авг.","Stream A":"Трансляция A","Stream B":"Трансляция B","Stream C":"Трансляция C","Stream D":"Трансляция D","Valve lists start times as approximate: each later match on a stream begins after the previous series finishes. Win chances are calculated from this site’s current team ratings.":"Valve указывает время начала ориентировочно: каждый следующий матч в потоке начинается после завершения предыдущей серии. Шансы на победу рассчитаны по текущим рейтингам команд на сайте.",
      "Undefeated":"Без поражений","One loss":"Одно поражение","ADVANCING":"ПРОХОДЯТ ДАЛЬШЕ","Five out of the elimination round":"Пять команд вне раунда на вылет","ELIMINATED":"ВЫБЫВАЮТ","Five losers of the round":"Пять проигравших раунда","One win":"Одна победа","Winless":"Без побед",
      "Use recommended":"Использовать рекомендацию","This is the model bracket with the highest confidence.":"Это сетка модели с наивысшей уверенностью.",
      "EXPECTED POINTS":"ОЖИДАЕМЫЕ ОЧКИ","average over 20,000 simulations · maximum possible 12,000":"среднее по 20 000 симуляциям · максимум 12 000","adjusted from the selected slot probabilities":"скорректировано по вероятностям выбранных слотов","estimated from the selected slot probabilities":"оценка по вероятностям выбранных слотов",
      "Expected correct":"Ожидаемо верных","Model fit":"Соответствие модели","Vs model":"Против модели","Risk / reward":"Риск / потенциал","Safe":"Низкий риск","Balanced":"Сбалансировано","Aggressive":"Агрессивно","SAFE":"БЕЗОПАСНО","UPSIDE":"ПОТЕНЦИАЛ","Most likely outcome":"Наиболее вероятный результат",
      "Correct slots":"Верных слотов","Typically":"Обычно","On a good run":"При удачном раскладе","What you can reach":"Чего можно достичь","8 correct":"8 верных","10 correct":"10 верных","12 correct":"12 верных","16 correct":"16 верных","never":"никогда","Outcome distribution":"Распределение результатов",
      "TEAM ODDS":"ШАНСЫ КОМАНД","Probability of every slot":"Вероятность каждого результата","The highlighted cell is the category currently selected for that team in your bracket.":"Подсвеченная ячейка — результат, выбранный для этой команды в вашей сетке.","chance to reach the playoffs":"шанс выйти в плей-офф","COMPACT VIEW":"КОМПАКТНЫЙ ВИД","Team odds table":"Таблица вероятностей","Team":"Команда","Playoffs":"Плей-офф",
      "Fantasy basics":"Основы Fantasy","Emblems and scoring":"Эмблемы и подсчёт очков","Tiers":"Уровни","Traits":"Свойства","Reroll priorities":"Приоритеты рероллов","Trainer titles":"Тренерские титулы","When to lock":"Когда фиксировать состав","Group stage predictions":"Прогнозы группового этапа","Known limitations":"Известные ограничения","FAQ":"FAQ","Fantasy Guide":"Гайд по Fantasy",
      "Everything needed to understand banners, titles, rerolls and the prediction model without digging through the calculator itself.":"Всё необходимое, чтобы понять знамёна, титулы, рероллы и модель прогнозов без изучения самого калькулятора.",
      "Your roster contains a Core pair, one Mid player and a Support pair. Every banner has three emblems, and every emblem combines a stat, a tier and a trait.":"Ваш состав включает пару Core, одного Mid и пару Support. На каждом знамени три эмблемы, и каждая сочетает характеристику, уровень и свойство.",
      "Strong emblems depend on the role and the player. Core usually benefits from farming and teamfight stats, Mid from runes, kills and teamfight, and Support from wards, stacks, smokes and teamfight.":"Сильные эмблемы зависят от роли и конкретного игрока. Core обычно выгодны фарм и командные бои, Mid — руны, убийства и командные бои, Support — варды, стаки, смоки и командные бои.",
      "Higher tiers increase the emblem contribution, but a high tier on a weak stat is not automatically better than a lower tier on a strong player-specific stat.":"Более высокий уровень увеличивает вклад эмблемы, но высокий уровень слабой характеристики не всегда лучше более низкого уровня сильной характеристики конкретного игрока.",
      "Traits can strengthen one emblem, affect adjacent slots or require a specific banner structure. The calculator applies these effects automatically when ranking players and pairs.":"Свойства могут усиливать одну эмблему, влиять на соседние слоты или требовать определённой структуры знамени. Калькулятор автоматически учитывает эти эффекты при ранжировании игроков и пар.",
      "Avoid rerolling a banner only because one displayed percentage looks low. Compare the stat, player history, tier, trait activation and the risk of losing two already strong emblems.":"Не рерольте знамя только потому, что один процент выглядит низким. Сравнивайте характеристику, историю игрока, уровень, активацию свойства и риск потерять две уже сильные эмблемы.",
      "Prefixes are estimated from each player’s historical hero pool. Suffixes depend on future match events, so the calculator shows them as conditional scenarios and groups them into Stable, Gamble and Avoid.":"Префиксы оцениваются по историческому пулу героев каждого игрока. Суффиксы зависят от будущих событий матча, поэтому калькулятор показывает их как условные сценарии и делит на Stable, Gamble и Avoid.",
      "For the most accurate values, finalize the roster close to roster lock. Valve may still adjust scoring, and additional tournament results can improve the dataset.":"Для наиболее точных значений фиксируйте состав ближе к дедлайну. Valve всё ещё может корректировать подсчёт очков, а новые результаты турниров могут улучшить датасет.",
      "The Predictions page shows the balanced-model probability for every team and every possible finish. You can swap teams between slots while keeping the bracket complete.":"Страница прогнозов показывает вероятность сбалансированной модели для каждой команды и каждого возможного исхода. Команды можно менять местами, сохраняя сетку полной.",
      "Some events are not exposed reliably by public match data. Lotus values and several suffix conditions should therefore be treated as approximate or conditional.":"Некоторые события ненадёжно доступны в публичных данных матчей. Поэтому значения по лотосам и нескольким условиям суффиксов следует считать приблизительными или условными.",
      "High percentages are not always better, Prefix recommendations change with the roster, and Suffix values are not guaranteed points. The tool is free and community-built.":"Высокий процент не всегда означает лучший выбор, рекомендации префиксов меняются вместе с составом, а значения суффиксов не гарантируют очки. Инструмент бесплатный и создан сообществом.",
      "Made by Kadadji":"Сделано Kadadji","Community-built Dota 2 fantasy tool. Not affiliated with Valve Corporation.":"Фэнтези-инструмент Dota 2, созданный сообществом. Не связан с Valve Corporation.","Buy me a coffee":"Поддержать проект"
    },
    es: {
      "Fantasy Calculator":"Calculadora Fantasy","Predictions":"Predicciones","Guide":"Guía",
      "Group Stage Predictions":"Predicciones de la fase de grupos","Swap any team and the bracket stays complete automatically.":"Cambia cualquier equipo y el cuadro se mantiene completo automáticamente.",
      "GROUP STAGE · SWISS ROUND 1":"FASE DE GRUPOS · RONDA SUIZA 1","Round one":"Primera ronda","All times are shown in New York, Eastern Time.":"Todos los horarios se muestran en la hora del Este de Nueva York.","Wed, Aug 12":"Mié., 12 de ago.","Thu, Aug 13":"Jue., 13 de ago.","Stream A":"Transmisión A","Stream B":"Transmisión B","Stream C":"Transmisión C","Stream D":"Transmisión D","Valve lists start times as approximate: each later match on a stream begins after the previous series finishes. Win chances are calculated from this site’s current team ratings.":"Valve indica las horas de inicio como aproximadas: cada partido posterior de una transmisión comienza cuando termina la serie anterior. Las probabilidades de victoria se calculan con las valoraciones actuales de los equipos en este sitio.",
      "Undefeated":"Invicto","One loss":"Una derrota","ADVANCING":"AVANZAN","Five out of the elimination round":"Cinco fuera de la ronda de eliminación","ELIMINATED":"ELIMINADOS","Five losers of the round":"Cinco perdedores de la ronda","One win":"Una victoria","Winless":"Sin victorias",
      "Use recommended":"Usar recomendación","This is the model bracket with the highest confidence.":"Este es el cuadro del modelo con mayor confianza.",
      "EXPECTED POINTS":"PUNTOS ESPERADOS","average over 20,000 simulations · maximum possible 12,000":"promedio de 20.000 simulaciones · máximo posible 12.000","adjusted from the selected slot probabilities":"ajustado según las probabilidades seleccionadas","estimated from the selected slot probabilities":"estimado a partir de las probabilidades seleccionadas",
      "Expected correct":"Aciertos esperados","Model fit":"Ajuste al modelo","Vs model":"Vs modelo","Risk / reward":"Riesgo / potencial","Safe":"Seguro","Balanced":"Equilibrado","Aggressive":"Agresivo","SAFE":"SEGURO","UPSIDE":"POTENCIAL","Most likely outcome":"Resultado más probable",
      "Correct slots":"Puestos correctos","Typically":"Normalmente","On a good run":"En una buena racha","What you can reach":"Lo que puedes alcanzar","8 correct":"8 correctos","10 correct":"10 correctos","12 correct":"12 correctos","16 correct":"16 correctos","never":"nunca","Outcome distribution":"Distribución de resultados",
      "TEAM ODDS":"PROBABILIDADES","Probability of every slot":"Probabilidad de cada puesto","The highlighted cell is the category currently selected for that team in your bracket.":"La celda resaltada es la categoría seleccionada actualmente para ese equipo en tu cuadro.","chance to reach the playoffs":"probabilidad de llegar a playoffs","COMPACT VIEW":"VISTA COMPACTA","Team odds table":"Tabla de probabilidades","Team":"Equipo","Playoffs":"Playoffs",
      "Fantasy basics":"Conceptos básicos de Fantasy","Emblems and scoring":"Emblemas y puntuación","Tiers":"Niveles","Traits":"Propiedades","Reroll priorities":"Prioridades de reroll","Trainer titles":"Títulos de entrenador","When to lock":"Cuándo fijar el equipo","Group stage predictions":"Predicciones de la fase de grupos","Known limitations":"Limitaciones conocidas","FAQ":"FAQ","Fantasy Guide":"Guía de Fantasy",
      "Everything needed to understand banners, titles, rerolls and the prediction model without digging through the calculator itself.":"Todo lo necesario para entender estandartes, títulos, rerolls y el modelo de predicción sin tener que explorar el propio calculador.",
      "Your roster contains a Core pair, one Mid player and a Support pair. Every banner has three emblems, and every emblem combines a stat, a tier and a trait.":"Tu alineación contiene una pareja de Core, un jugador Mid y una pareja de Support. Cada estandarte tiene tres emblemas y cada emblema combina una estadística, un nivel y una propiedad.",
      "Strong emblems depend on the role and the player. Core usually benefits from farming and teamfight stats, Mid from runes, kills and teamfight, and Support from wards, stacks, smokes and teamfight.":"Los emblemas fuertes dependen del rol y del jugador. Core suele beneficiarse del farmeo y las peleas de equipo, Mid de runas, asesinatos y peleas, y Support de wards, stacks, smokes y peleas de equipo.",
      "Higher tiers increase the emblem contribution, but a high tier on a weak stat is not automatically better than a lower tier on a strong player-specific stat.":"Los niveles más altos aumentan la contribución del emblema, pero un nivel alto en una estadística débil no es automáticamente mejor que un nivel inferior en una estadística fuerte para ese jugador.",
      "Traits can strengthen one emblem, affect adjacent slots or require a specific banner structure. The calculator applies these effects automatically when ranking players and pairs.":"Las propiedades pueden reforzar un emblema, afectar a los espacios adyacentes o requerir una estructura específica. El calculador aplica estos efectos automáticamente al clasificar jugadores y parejas.",
      "Avoid rerolling a banner only because one displayed percentage looks low. Compare the stat, player history, tier, trait activation and the risk of losing two already strong emblems.":"Evita hacer reroll solo porque un porcentaje parezca bajo. Compara la estadística, el historial del jugador, el nivel, la activación de la propiedad y el riesgo de perder dos emblemas ya fuertes.",
      "Prefixes are estimated from each player’s historical hero pool. Suffixes depend on future match events, so the calculator shows them as conditional scenarios and groups them into Stable, Gamble and Avoid.":"Los prefijos se estiman a partir del pool histórico de héroes de cada jugador. Los sufijos dependen de eventos futuros, por lo que el calculador los muestra como escenarios condicionales y los agrupa en Stable, Gamble y Avoid.",
      "For the most accurate values, finalize the roster close to roster lock. Valve may still adjust scoring, and additional tournament results can improve the dataset.":"Para obtener los valores más precisos, finaliza la alineación cerca del cierre. Valve aún puede ajustar la puntuación y nuevos resultados de torneos pueden mejorar el conjunto de datos.",
      "The Predictions page shows the balanced-model probability for every team and every possible finish. You can swap teams between slots while keeping the bracket complete.":"La página de predicciones muestra la probabilidad del modelo equilibrado para cada equipo y cada resultado posible. Puedes intercambiar equipos entre puestos manteniendo el cuadro completo.",
      "Some events are not exposed reliably by public match data. Lotus values and several suffix conditions should therefore be treated as approximate or conditional.":"Algunos eventos no aparecen de forma fiable en los datos públicos. Por ello, los valores de lotos y varias condiciones de sufijos deben tratarse como aproximados o condicionales.",
      "High percentages are not always better, Prefix recommendations change with the roster, and Suffix values are not guaranteed points. The tool is free and community-built.":"Los porcentajes altos no siempre son mejores, las recomendaciones de prefijos cambian con la alineación y los valores de sufijos no garantizan puntos. La herramienta es gratuita y comunitaria.",
      "Made by Kadadji":"Hecho por Kadadji","Community-built Dota 2 fantasy tool. Not affiliated with Valve Corporation.":"Herramienta comunitaria de Fantasy para Dota 2. No afiliada con Valve Corporation.","Buy me a coffee":"Apoyar el proyecto"
    },
    zh: {
      "Fantasy Calculator":"梦幻计算器","Predictions":"预测","Guide":"指南",
      "Group Stage Predictions":"小组赛预测","Swap any team and the bracket stays complete automatically.":"可自由更换任意战队，预测表会自动保持完整。",
      "GROUP STAGE · SWISS ROUND 1":"小组赛 · 瑞士轮第 1 轮","Round one":"第一轮","All times are shown in New York, Eastern Time.":"所有时间均为纽约东部时间。","Wed, Aug 12":"8月12日，周三","Thu, Aug 13":"8月13日，周四","Stream A":"A 流","Stream B":"B 流","Stream C":"C 流","Stream D":"D 流","Valve lists start times as approximate: each later match on a stream begins after the previous series finishes. Win chances are calculated from this site’s current team ratings.":"Valve 标注的开赛时间为预计时间：同一直播流的后续比赛会在前一场系列赛结束后开始。胜率根据本站当前的战队评分计算。",
      "Undefeated":"全胜","One loss":"一负","ADVANCING":"晋级","Five out of the elimination round":"五支避开淘汰轮的战队","ELIMINATED":"淘汰","Five losers of the round":"淘汰轮五支失利战队","One win":"一胜","Winless":"全败",
      "Use recommended":"使用模型推荐","This is the model bracket with the highest confidence.":"这是模型置信度最高的预测表。",
      "EXPECTED POINTS":"预期积分","average over 20,000 simulations · maximum possible 12,000":"基于 20,000 次模拟的平均值 · 理论最高 12,000","adjusted from the selected slot probabilities":"根据当前所选位置概率动态调整","estimated from the selected slot probabilities":"根据当前所选位置概率估算",
      "Expected correct":"预期命中","Model fit":"模型匹配度","Vs model":"与模型差值","Risk / reward":"风险 / 收益","Safe":"稳健","Balanced":"均衡","Aggressive":"激进","SAFE":"稳健","UPSIDE":"高收益","Most likely outcome":"最可能结果",
      "Correct slots":"正确位置","Typically":"通常","On a good run":"表现较好时","What you can reach":"可达到的结果","8 correct":"8 项命中","10 correct":"10 项命中","12 correct":"12 项命中","16 correct":"16 项命中","never":"未出现","Outcome distribution":"结果分布",
      "TEAM ODDS":"战队概率","Probability of every slot":"各结果概率","The highlighted cell is the category currently selected for that team in your bracket.":"高亮单元格表示你当前为该战队选择的结果。","chance to reach the playoffs":"晋级淘汰赛概率","COMPACT VIEW":"紧凑视图","Team odds table":"战队概率表","Team":"战队","Playoffs":"淘汰赛",
      "Fantasy basics":"Fantasy 基础","Emblems and scoring":"徽章与计分","Tiers":"等级","Traits":"属性","Reroll priorities":"重掷优先级","Trainer titles":"教练称号","When to lock":"何时锁定阵容","Group stage predictions":"小组赛预测","Known limitations":"已知限制","FAQ":"常见问题","Fantasy Guide":"Fantasy 指南",
      "Everything needed to understand banners, titles, rerolls and the prediction model without digging through the calculator itself.":"无需深入研究计算器，即可了解旗帜、称号、重掷和预测模型所需的一切。",
      "Your roster contains a Core pair, one Mid player and a Support pair. Every banner has three emblems, and every emblem combines a stat, a tier and a trait.":"你的阵容包含一对核心位、一名中单和一对辅助。每面旗帜有三个徽章，每个徽章由一项数据、一个等级和一个属性组成。",
      "Strong emblems depend on the role and the player. Core usually benefits from farming and teamfight stats, Mid from runes, kills and teamfight, and Support from wards, stacks, smokes and teamfight.":"强力徽章取决于位置和选手。核心位通常受益于发育和团战数据，中单受益于神符、击杀和团战，辅助则受益于插眼、拉野、诡计之雾和团战。",
      "Higher tiers increase the emblem contribution, but a high tier on a weak stat is not automatically better than a lower tier on a strong player-specific stat.":"更高等级会提高徽章贡献，但弱项上的高等级并不一定优于适合该选手强项的较低等级。",
      "Traits can strengthen one emblem, affect adjacent slots or require a specific banner structure. The calculator applies these effects automatically when ranking players and pairs.":"属性可以强化某个徽章、影响相邻位置，或要求特定的旗帜结构。计算器会在选手和组合排名时自动应用这些效果。",
      "Avoid rerolling a banner only because one displayed percentage looks low. Compare the stat, player history, tier, trait activation and the risk of losing two already strong emblems.":"不要仅因为某个百分比较低就重掷旗帜。应综合比较数据、选手历史、等级、属性触发，以及失去另外两个强力徽章的风险。",
      "Prefixes are estimated from each player’s historical hero pool. Suffixes depend on future match events, so the calculator shows them as conditional scenarios and groups them into Stable, Gamble and Avoid.":"前缀根据每位选手的历史英雄池估算。后缀取决于未来比赛事件，因此计算器将其作为条件情景展示，并分为稳定、博弈和不推荐三类。",
      "For the most accurate values, finalize the roster close to roster lock. Valve may still adjust scoring, and additional tournament results can improve the dataset.":"为了获得更准确的数值，请在阵容锁定前再最终确认。Valve 仍可能调整计分规则，更多赛事结果也会改善数据集。",
      "The Predictions page shows the balanced-model probability for every team and every possible finish. You can swap teams between slots while keeping the bracket complete.":"预测页面展示平衡模型对每支战队和每种最终结果的概率。你可以在不同位置之间交换战队，同时保持预测表完整。",
      "Some events are not exposed reliably by public match data. Lotus values and several suffix conditions should therefore be treated as approximate or conditional.":"部分事件无法从公开比赛数据中可靠获取，因此莲花数据和若干后缀条件应视为近似或条件性结果。",
      "High percentages are not always better, Prefix recommendations change with the roster, and Suffix values are not guaranteed points. The tool is free and community-built.":"高百分比并不总是更好，前缀推荐会随阵容变化，后缀数值也不代表保证得分。本工具免费并由社区制作。",
      "Made by Kadadji":"Kadadji 制作","Community-built Dota 2 fantasy tool. Not affiliated with Valve Corporation.":"社区制作的 Dota 2 Fantasy 工具，与 Valve Corporation 无关联。","Buy me a coffee":"支持项目"
    }
  };

  let currentLanguage = localStorage.getItem("site-language") || "en";
  const originalText = new WeakMap();
  const englishKeys = new Set(Object.keys(dictionaries.ru));
  let observer = null;
  let queued = false;

  function canonicalText(current) {
    if (englishKeys.has(current)) return current;
    for (const language of ["ru", "es", "zh"]) {
      for (const [english, translated] of Object.entries(dictionaries[language])) if (translated === current) return english;
    }
    return null;
  }

  function translateElement(el) {
    if (!(el instanceof HTMLElement) || el.closest(".site-master-header") || el.children.length !== 0) return;
    const current = el.textContent?.trim();
    if (!current) return;
    let source = originalText.get(el) || canonicalText(current);
    if (!source) return;
    originalText.set(el, source);
    const translated = currentLanguage === "en" ? source : (dictionaries[currentLanguage]?.[source] || source);
    if (el.textContent !== translated) el.textContent = translated;
  }

  function translateDynamic() {
    document.querySelectorAll(".team-probability-card header p").forEach((el) => {
      const match = el.textContent?.match(/(?:rating|рейтинг|valoración|评分)\s+(\d+)\s±\s(\d+)/i);
      if (!match) return;
      const prefix = currentLanguage === "ru" ? "рейтинг" : currentLanguage === "es" ? "valoración" : currentLanguage === "zh" ? "评分" : "rating";
      el.textContent = `${prefix} ${match[1]} ± ${match[2]}`;
    });

    document.querySelectorAll(".prediction-board-actions span").forEach((el) => {
      const match = el.textContent?.match(/^([\d.]+)\s+(?:confidence points below the model\.|пунктов уверенности ниже модели\.|puntos de confianza por debajo del modelo\.|个置信度点低于模型推荐。)$/);
      if (!match) return;
      const suffix = currentLanguage === "ru" ? "пунктов уверенности ниже модели." : currentLanguage === "es" ? "puntos de confianza por debajo del modelo." : currentLanguage === "zh" ? "个置信度点低于模型推荐。" : "confidence points below the model.";
      el.textContent = `${match[1]} ${suffix}`;
    });

    document.querySelectorAll(".prediction-risk-toggle").forEach((el) => {
      const text = el.textContent || "";
      const nums = text.match(/(\d+).*?(\d+)\/16/);
      if (!nums) return;
      const risky = Number(nums[1]); const agree = nums[2];
      if (currentLanguage === "zh") el.textContent = `${risky} 个高风险选择 · ${agree}/16 项与模型一致`;
      else if (currentLanguage === "ru") el.textContent = `${risky} рискованных выборов · ${agree}/16 совпадают с моделью`;
      else if (currentLanguage === "es") el.textContent = `${risky} picks arriesgados · ${agree}/16 coinciden con el modelo`;
      else el.textContent = `${risky} risky ${risky === 1 ? "pick" : "picks"} · ${agree}/16 match the model`;
    });

    document.querySelectorAll(".prediction-outcome-heading strong").forEach((el) => {
      const match = el.textContent?.match(/^(\d+–\d+)\s+(?:correct|верных|aciertos|项命中)$/);
      if (!match) return;
      const suffix = currentLanguage === "ru" ? "верных" : currentLanguage === "es" ? "aciertos" : currentLanguage === "zh" ? "项命中" : "correct";
      el.textContent = `${match[1]} ${suffix}`;
    });

    document.querySelectorAll(".round-one-card footer strong").forEach((el) => {
      const match = el.textContent?.match(/^(.*?) · (\d+)% (?:model win chance|шанс модели на победу|probabilidad de victoria según el modelo|模型胜率)$/);
      if (!match) return;
      const suffix = currentLanguage === "ru" ? "шанс модели на победу" : currentLanguage === "es" ? "probabilidad de victoria según el modelo" : currentLanguage === "zh" ? "模型胜率" : "model win chance";
      el.textContent = `${match[1]} · ${match[2]}% ${suffix}`;
    });

    document.querySelectorAll(".round-one-card footer span").forEach((el) => {
      const match = el.textContent?.match(/^(?:Rating edge:|Разница рейтинга:|Ventaja de rating:|评分优势：) \+(\d+) · (?:best of 3|до двух побед|al mejor de 3|三局两胜)$/);
      if (!match) return;
      const text = currentLanguage === "ru" ? "Разница рейтинга" : currentLanguage === "es" ? "Ventaja de rating" : currentLanguage === "zh" ? "评分优势" : "Rating edge";
      const format = currentLanguage === "ru" ? "до двух побед" : currentLanguage === "es" ? "al mejor de 3" : currentLanguage === "zh" ? "三局两胜" : "best of 3";
      el.textContent = `${text}: +${match[1]} · ${format}`;
    });
  }

  function translatePage() {
    if (observer) observer.disconnect();
    if (location.pathname.startsWith("/predictions")) {
      document.querySelectorAll("h1,h2,h3,p,span,strong,button,th,td,a").forEach(translateElement);
      translateDynamic();
    }
    document.querySelectorAll(".site-social-footer strong,.site-social-footer span,.site-social-footer a span").forEach(translateElement);
    if (observer) observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; translatePage(); });
  }

  function applyLanguage(language) {
    currentLanguage = language || "en";
    schedule();
  }

  observer = new MutationObserver(schedule);
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  window.addEventListener("site-language-change", (event) => applyLanguage(event.detail?.language));
  window.addEventListener("pageshow", () => applyLanguage(localStorage.getItem("site-language") || "en"));
  applyLanguage(currentLanguage);
})();
