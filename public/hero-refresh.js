(() => {
  const copy = {
    en: {
      title: 'Dota 2 Fantasy Calculator & Optimizer',
      subtitle: 'Build your TI 2026 Fantasy roster using historical match data, player-specific performance and simulation-based projections.',
      cards: [
        ['BUILT FOR TI 2026', 'Fantasy banners, roster optimization and group stage predictions.'],
        ['PLAYER-SPECIFIC ANALYSIS', 'Stats are evaluated by role, player history, emblems, traits and titles.'],
        ['FREE COMMUNITY TOOL', 'No account required. Built for the Dota 2 community.']
      ],
      model: 'MODEL DATA', matches: 'matches analyzed', simulations: 'simulations', events: 'competitive events',
      foot: 'Historical match data · player-level statistics · tournament simulations'
    },
    ru: {
      title: 'Dota 2 Fantasy Калькулятор & Оптимизатор',
      subtitle: 'Соберите Fantasy-состав для TI 2026 на основе исторических матчей, статистики игроков и симуляций турнира.',
      cards: [
        ['ДЛЯ TI 2026', 'Fantasy-знамёна, оптимизация состава и прогнозы групповой стадии.'],
        ['АНАЛИЗ ИГРОКОВ', 'Статистика учитывает роль, историю игрока, эмблемы, свойства и титулы.'],
        ['БЕСПЛАТНЫЙ ИНСТРУМЕНТ', 'Без регистрации. Сделано для сообщества Dota 2.']
      ],
      model: 'ДАННЫЕ МОДЕЛИ', matches: 'матчей проанализировано', simulations: 'симуляций', events: 'соревновательных ивентов',
      foot: 'История матчей · статистика игроков · симуляции турнира'
    },
    es: {
      title: 'Calculadora y Optimizador de Dota 2 Fantasy',
      subtitle: 'Construye tu plantilla Fantasy de TI 2026 con datos históricos, rendimiento individual y proyecciones basadas en simulaciones.',
      cards: [
        ['HECHO PARA TI 2026', 'Banners Fantasy, optimización de plantilla y predicciones de la fase de grupos.'],
        ['ANÁLISIS POR JUGADOR', 'Las estadísticas consideran rol, historial, emblemas, rasgos y títulos.'],
        ['HERRAMIENTA GRATUITA', 'Sin cuenta. Creada para la comunidad de Dota 2.']
      ],
      model: 'DATOS DEL MODELO', matches: 'partidas analizadas', simulations: 'simulaciones', events: 'eventos competitivos',
      foot: 'Historial de partidas · estadísticas por jugador · simulaciones del torneo'
    },
    zh: {
      title: 'Dota 2 Fantasy 计算器与优化器',
      subtitle: '基于历史比赛、选手个人表现和模拟预测，构建你的 TI 2026 Fantasy 阵容。',
      cards: [
        ['专为 TI 2026 打造', 'Fantasy 旗帜、阵容优化与小组赛预测。'],
        ['选手级分析', '按位置、选手历史、徽章、特性和称号评估数据。'],
        ['免费社区工具', '无需账号。为 Dota 2 社区打造。']
      ],
      model: '模型数据', matches: '场比赛已分析', simulations: '次模拟', events: '项赛事',
      foot: '历史比赛数据 · 选手级统计 · 赛事模拟'
    }
  };

  const style = document.createElement('style');
  style.textContent = `
    .hero .hero-actions{display:none!important}
    .hero-info-strip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:30px;max-width:850px}
    .hero-info-item{border-top:1px solid rgba(226,174,35,.45);padding:15px 12px 0 0}
    .hero-info-item b{display:block;color:#e4b52e;font-size:12px;letter-spacing:.13em;margin-bottom:7px}
    .hero-info-item span{display:block;color:rgba(244,231,199,.72);font-size:13px;line-height:1.45}
    .dataset-card.model-data-card{min-width:300px;padding:28px!important}
    .model-data-card>span{display:block;color:#e4b52e!important;font-size:12px!important;font-weight:700;letter-spacing:.15em;margin-bottom:22px}
    .model-primary strong{display:block;font-size:54px!important;line-height:1!important;margin:0 0 6px!important}
    .model-primary small,.model-stat small{display:block;color:rgba(244,231,199,.68);font-size:12px;line-height:1.35}
    .model-secondary{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:24px;padding-top:20px;border-top:1px solid rgba(226,174,35,.3)}
    .model-stat strong{display:block;font-size:27px!important;line-height:1.05!important;margin:0 0 5px!important}
    .model-foot{display:block!important;margin-top:20px;padding-top:16px;border-top:1px solid rgba(226,174,35,.18);font-size:10px!important;line-height:1.45!important;color:rgba(244,231,199,.5)!important}
    @media(max-width:900px){.hero-info-strip{grid-template-columns:1fr}.hero-info-item{padding-top:10px}.dataset-card.model-data-card{min-width:0}.hero{gap:28px}}
    @media(max-width:640px){.hero-info-strip{margin-top:22px;gap:9px}.hero-info-item span{font-size:12px}.model-primary strong{font-size:44px!important}.model-secondary{gap:12px}}
  `;
  document.head.appendChild(style);

  function getLang(){
    const active = document.querySelector('.language-switch button.active, [data-language].active, .site-language button.active');
    const raw = (active?.textContent || document.documentElement.lang || 'en').trim().toLowerCase();
    if(raw.startsWith('ru')) return 'ru';
    if(raw.startsWith('es')) return 'es';
    if(raw.includes('中') || raw.startsWith('zh')) return 'zh';
    return 'en';
  }

  function render(){
    const hero = document.querySelector('.hero');
    if(!hero) return;
    const lang = getLang();
    const t = copy[lang];
    const heroCopy = hero.querySelector('.hero-copy');
    const title = heroCopy?.querySelector('h1');
    const subtitle = heroCopy?.querySelector(':scope > p');
    if(title && title.textContent !== t.title) title.textContent = t.title;
    if(subtitle && subtitle.textContent !== t.subtitle) subtitle.textContent = t.subtitle;

    let strip = heroCopy?.querySelector('.hero-info-strip');
    if(heroCopy && !strip){
      strip = document.createElement('div');
      strip.className = 'hero-info-strip';
      heroCopy.appendChild(strip);
    }
    if(strip){
      const html = t.cards.map(([head,body]) => `<div class="hero-info-item"><b>${head}</b><span>${body}</span></div>`).join('');
      if(strip.innerHTML !== html) strip.innerHTML = html;
    }

    const card = hero.querySelector('.dataset-card');
    if(card){
      card.classList.add('model-data-card');
      const html = `<span>${t.model}</span><div class="model-primary"><strong>8,000+</strong><small>${t.matches}</small></div><div class="model-secondary"><div class="model-stat"><strong>15,000</strong><small>${t.simulations}</small></div><div class="model-stat"><strong>80+</strong><small>${t.events}</small></div></div><small class="model-foot">${t.foot}</small>`;
      if(card.innerHTML !== html) card.innerHTML = html;
    }
  }

  render();
  document.addEventListener('click', (event) => {
    if(event.target.closest('.language-switch, [data-language], .site-language')) setTimeout(render, 30);
  });
  const observer = new MutationObserver(() => requestAnimationFrame(render));
  observer.observe(document.body, {subtree:true, childList:true, attributes:true, attributeFilter:['class','lang']});
})();
