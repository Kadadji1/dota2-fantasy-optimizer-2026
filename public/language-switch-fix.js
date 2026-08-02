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

  function currentLanguage() {
    const lang = document.documentElement.lang;
    if (lang === 'zh-CN') return 'zh';
    if (lang === 'es') return 'es';
    return getButtons()?.ru?.classList.contains('active') ? 'ru' : 'en';
  }

  function isExtraLanguageActive() {
    const language = currentLanguage();
    return language === 'es' || language === 'zh';
  }

  function restoreEnglishReact(done) {
    const buttons = getButtons();
    if (!buttons?.en || !buttons?.ru) {
      switching = false;
      return;
    }

    // React may already think EN is active while the DOM was translated by the
    // extra-language layer. Switching to RU first guarantees a real rerender,
    // then switching back to EN restores the original English text tree.
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
    const destination = targetExtra || (targetBuiltIn === 'RU' ? 'ru' : targetBuiltIn === 'EN' ? 'en' : null);
    const current = currentLanguage();

    // Clicking the already active language must be a no-op for all four buttons.
    // Stop the event here so the underlying extra-language handler cannot reset
    // ES or ZH back to English on a repeated click.
    if (destination && destination === current) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    if (targetExtra && isExtraLanguageActive()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      switching = true;

      restoreEnglishReact(() => {
        const buttons = getButtons();
        const next = targetExtra === 'es' ? buttons?.es : buttons?.zh;
        next?.click();
        window.setTimeout(() => { switching = false; }, 100);
      });
      return;
    }

    if ((targetBuiltIn === 'EN' || targetBuiltIn === 'RU') && isExtraLanguageActive()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      switching = true;

      restoreEnglishReact(() => {
        if (targetBuiltIn === 'RU') getButtons()?.ru?.click();
        window.setTimeout(() => { switching = false; }, 100);
      });
    }
  }, true);
})();
