(() => {
  const groups = {
    en: [
      { title: "Stable (recommended)", className: "stable", items: ["the Clutch", "the Underdog"] },
      { title: "Gamble (high risk, high reward)", className: "gamble", items: ["the Lucky", "the Cruel"] },
      { title: "Avoid (low value / very rare)", className: "avoid", items: ["the Tormented", "the Flayed Twins Acolyte", "the Patient", "the Decisive"] }
    ],
    ru: [
      { title: "Стабильные", className: "stable", items: ["Творец победы", "Аутсайдер"] },
      { title: "Азартные", className: "gamble", items: ["Везунчик", "Мучитель"] },
      { title: "Лучше избегать", className: "avoid", items: ["Мученик", "Жрец Бескожих близнецов", "Выжидатель", "Удалец"] }
    ],
    es: [
      { title: "Estables (recomendados)", className: "stable", items: ["el Clutch", "el Desvalido"] },
      { title: "Apuesta (alto riesgo)", className: "gamble", items: ["el Afortunado", "el Cruel"] },
      { title: "Evitar (raros)", className: "avoid", items: ["el Atormentado", "el Acólito de los Gemelos Desollados", "el Paciente", "el Decisivo"] }
    ],
    zh: [
      { title: "稳定（推荐）", className: "stable", items: ["关键先生", "逆袭者"] },
      { title: "高风险", className: "gamble", items: ["幸运者", "残酷者"] },
      { title: "建议避开", className: "avoid", items: ["受折磨者", "剥皮双子侍从", "耐心者", "果断者"] }
    ]
  };

  const suffixValues = {"the Clutch":"clutch","the Underdog":"underdog","the Lucky":"lucky","the Cruel":"cruel","the Tormented":"tormented","the Flayed Twins Acolyte":"flayedTwins","the Patient":"patient","the Decisive":"decisive","Творец победы":"clutch","Аутсайдер":"underdog","Везунчик":"lucky","Мучитель":"cruel","Мученик":"tormented","Жрец Бескожих близнецов":"flayedTwins","Выжидатель":"patient","Удалец":"decisive","el Clutch":"clutch","el Desvalido":"underdog","el Afortunado":"lucky","el Cruel":"cruel","el Atormentado":"tormented","el Acólito de los Gemelos Desollados":"flayedTwins","el Paciente":"patient","el Decisivo":"decisive","关键先生":"clutch","逆袭者":"underdog","幸运者":"lucky","残酷者":"cruel","受折磨者":"tormented","剥皮双子侍从":"flayedTwins","耐心者":"patient","果断者":"decisive"};

  function currentLanguage() { const value = localStorage.getItem('site-language'); return groups[value] ? value : 'en'; }

  function chooseSuffix(select, label) {
    const option = Array.from(select.options).find(item => item.value === suffixValues[label] || item.textContent.trim().startsWith(label));
    if (!option) return;
    select.value = option.value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function applyStructuralFixes() {
    document.querySelector('.builder-footer')?.remove();
    document.querySelector('.title-score-chip')?.remove();
    document.querySelector('.suffix-badge')?.remove();

    const prefixCard = document.querySelector('.prefix-card');
    const prefixLabel = prefixCard?.querySelector('label');
    const prefixStat = prefixCard?.querySelector('.title-stat-line');
    if (prefixCard && prefixLabel && prefixStat && prefixLabel.nextElementSibling !== prefixStat) {
      prefixLabel.insertAdjacentElement('afterend', prefixStat);
    }
  }

  function enhance() {
    applyStructuralFixes();

    const suffixCard = document.querySelector('.suffix-card');
    const suffixSelect = suffixCard?.querySelector('select');
    if (!suffixCard || !suffixSelect) return;

    let guide = suffixCard.querySelector('.suffix-guide');
    if (!guide) {
      guide = document.createElement('aside');
      guide.className = 'suffix-guide';
      suffixCard.appendChild(guide);
    }

    const language = currentLanguage();
    const heading = {en:'Suffix recommendations',ru:'Рекомендации по суффиксам',es:'Recomendaciones de Sufijos',zh:'后缀建议'}[language];
    const signature = `${language}:${suffixSelect.value}`;
    if (guide.dataset.signature === signature) return;
    guide.dataset.signature = signature;
    guide.innerHTML = `<h4>${heading}</h4>`;

    groups[language].forEach(group => {
      const section = document.createElement('section');
      section.className = `suffix-guide-group ${group.className}`;
      const title = document.createElement('strong');
      title.textContent = group.title;
      section.appendChild(title);
      const buttons = document.createElement('div');
      buttons.className = 'suffix-guide-buttons';

      group.items.forEach(item => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = item;
        const selectedOption = suffixSelect.options[suffixSelect.selectedIndex]?.textContent?.trim() ?? '';
        if (suffixSelect.value === suffixValues[item] || selectedOption.startsWith(item)) button.classList.add('active');
        button.addEventListener('click', () => chooseSuffix(suffixSelect, item));
        buttons.appendChild(button);
      });

      section.appendChild(buttons);
      guide.appendChild(section);
    });
  }

  let queued = false;
  const scheduleEnhance = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      enhance();
    });
  };

  const observer = new MutationObserver(scheduleEnhance);
  observer.observe(document.documentElement, { subtree: true, childList: true });
  window.addEventListener('DOMContentLoaded', enhance);
  window.addEventListener('load', enhance);
  document.addEventListener('change', event => {
    if (event.target.closest('.title-panel')) scheduleEnhance();
  });
  document.addEventListener('click', event => {
    if (event.target.closest('.language-switch')) setTimeout(scheduleEnhance, 0);
  });
  enhance();
})();
