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
    ]
  };

  function isRussian() {
    const ruButton = document.querySelector('.language-switch button.active');
    return ruButton?.textContent?.trim() === 'RU';
  }

  function chooseSuffix(select, label) {
    const option = Array.from(select.options).find(item => item.textContent.trim().startsWith(label));
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

    const language = isRussian() ? 'ru' : 'en';
    const heading = language === 'ru' ? 'Рекомендации по суффиксам' : 'Suffix recommendations';
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
        if (selectedOption.startsWith(item)) button.classList.add('active');
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
