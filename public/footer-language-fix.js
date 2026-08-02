(() => {
  const copy = {
    en: {
      made: "Made by Kadadji",
      description: "Community-built Dota 2 fantasy tool. Not affiliated with Valve Corporation.",
      support: "Support the Project"
    },
    ru: {
      made: "Сделано Kadadji",
      description: "Фэнтези-инструмент для Dota 2, созданный сообществом. Не связан с Valve Corporation.",
      support: "Поддержать проект"
    },
    es: {
      made: "Hecho por Kadadji",
      description: "Herramienta comunitaria de Fantasy para Dota 2. No afiliada con Valve Corporation.",
      support: "Apoyar el proyecto"
    },
    zh: {
      made: "Kadadji 制作",
      description: "社区制作的 Dota 2 梦幻工具，与 Valve Corporation 无关联。",
      support: "支持项目"
    }
  };

  let requestedLanguage = null;
  let scheduled = false;
  let applying = false;

  function languageFromLabel(label) {
    if (label === "RU") return "ru";
    if (label === "ES") return "es";
    if (label === "中文") return "zh";
    return "en";
  }

  function activeLanguage() {
    if (requestedLanguage) return requestedLanguage;
    const active = document.querySelector(".language-switch button.active");
    return languageFromLabel(active?.textContent?.trim());
  }

  function applyFooterLanguage() {
    if (applying) return;
    const footer = document.querySelector(".site-social-footer");
    if (!footer) return;

    applying = true;
    const current = copy[activeLanguage()] || copy.en;
    const title = footer.querySelector(".footer-signature strong");
    const description = footer.querySelector(".footer-signature span");
    const links = footer.querySelectorAll(".social-link span");

    if (title && title.textContent !== current.made) title.textContent = current.made;
    if (description && description.textContent !== current.description) description.textContent = current.description;
    if (links[2] && links[2].textContent !== current.support) links[2].textContent = current.support;
    applying = false;
  }

  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyFooterLanguage();
    });
  }

  function applySeveralTimes() {
    scheduleApply();
    [40, 120, 300, 700].forEach((delay) => window.setTimeout(scheduleApply, delay));
  }

  window.addEventListener("DOMContentLoaded", () => {
    applySeveralTimes();

    document.addEventListener("click", (event) => {
      const button = event.target.closest?.(".language-switch button");
      if (!button) return;
      requestedLanguage = languageFromLabel(button.textContent?.trim());
      applySeveralTimes();
      window.setTimeout(() => {
        requestedLanguage = null;
        scheduleApply();
      }, 900);
    }, true);

    const switcher = document.querySelector(".language-switch");
    if (switcher) {
      new MutationObserver(scheduleApply).observe(switcher, {
        subtree: true,
        attributes: true,
        attributeFilter: ["class"]
      });
    }

    const footer = document.querySelector(".site-social-footer");
    if (footer) {
      new MutationObserver(() => {
        if (!applying) scheduleApply();
      }).observe(footer, { subtree: true, childList: true, characterData: true });
    }
  });
})();
