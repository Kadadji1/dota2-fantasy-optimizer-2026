(() => {
  let switching = false;

  function getButtons() {
    const switcher = document.querySelector('.language-switch');
    if (!switcher) return null;
    const buttons = Array.from(switcher.querySelectorAll('button'));
    return {
      switcher,
      en: buttons.find((button) => button.textContent?.trim() === 'EN'),
      ru: buttons.find((button) => button.textContent?.trim() === 'RU'),
      es: buttons.find((button) => button.dataset.extraLanguage === 'es'),
      zh: buttons.find((button) => button.dataset.extraLanguage === 'zh')
    };
  }

  function setOnlyActive(language) {
    const buttons = getButtons();
    if (!buttons) return;

    buttons.switcher.querySelectorAll('button').forEach((button) => {
      button.classList.remove('active');
      button.setAttribute('aria-pressed', 'false');
    });

    const activeButton = buttons[language];
    if (activeButton) {
      activeButton.classList.add('active');
      activeButton.setAttribute('aria-pressed', 'true');
    }
  }

  function isExtraLanguageActive() {
    return document.documentElement.lang === 'es' || document.documentElement.lang === 'zh-CN';
  }

  function createVisualFreeze() {
    const overlay = document.createElement('div');
    const clone = document.body.cloneNode(true);

    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.cssText = [
      'position:fixed',
      'inset:0',
      'z-index:2147483647',
      'overflow:hidden',
      'pointer-events:none',
      'background:#090806'
    ].join(';');

    clone.style.position = 'absolute';
    clone.style.left = '0';
    clone.style.top = `${-window.scrollY}px`;
    clone.style.width = '100%';
    clone.style.margin = '0';
    overlay.appendChild(clone);
    document.documentElement.appendChild(overlay);

    return () => {
      requestAnimationFrame(() => requestAnimationFrame(() => overlay.remove()));
    };
  }

  function restoreEnglishReact(done) {
    const buttons = getButtons();
    if (!buttons?.en || !buttons?.ru) {
      switching = false;
      return;
    }

    buttons.ru.click();
    window.setTimeout(() => {
      buttons.en.click();
      window.setTimeout(done, 50);
    }, 50);
  }

  document.addEventListener('click', (event) => {
    if (switching) return;

    const target = event.target instanceof Element
      ? event.target.closest('.language-switch button')
      : null;
    if (!(target instanceof HTMLButtonElement)) return;

    const targetExtra = target.dataset.extraLanguage;
    const targetBuiltIn = target.textContent?.trim();

    if (targetExtra && isExtraLanguageActive()) {
      const current = document.documentElement.lang === 'zh-CN' ? 'zh' : 'es';

      if (targetExtra === current) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setOnlyActive(current);
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      switching = true;
      const releaseVisualFreeze = createVisualFreeze();

      restoreEnglishReact(() => {
        const buttons = getButtons();
        const destination = targetExtra === 'es' ? buttons?.es : buttons?.zh;
        destination?.click();
        window.setTimeout(() => {
          setOnlyActive(targetExtra);
          switching = false;
          releaseVisualFreeze();
        }, 120);
      });
      return;
    }

    if ((targetBuiltIn === 'EN' || targetBuiltIn === 'RU') && isExtraLanguageActive()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      switching = true;
      const releaseVisualFreeze = createVisualFreeze();
      const destination = targetBuiltIn === 'RU' ? 'ru' : 'en';

      restoreEnglishReact(() => {
        if (destination === 'ru') getButtons()?.ru?.click();
        window.setTimeout(() => {
          setOnlyActive(destination);
          switching = false;
          releaseVisualFreeze();
        }, 120);
      });
    }
  }, true);
})();
