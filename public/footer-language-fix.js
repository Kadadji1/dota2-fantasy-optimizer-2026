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

  function activeLanguage() {
    const active = document.querySelector(".language-switch button.active");
    const label = active?.textContent?.trim();
    if (label === "RU") return "ru";
    if (label === "ES") return "es";
    if (label === "中文") return "zh";
    return "en";
  }

  function applyFooterLanguage() {
    const footer = document.querySelector(".site-social-footer");
    if (!footer) return;

    const language = activeLanguage();
    const current = copy[language];
    const title = footer.querySelector(".footer-signature strong");
    const description = footer.querySelector(".footer-signature span");
    const links = footer.querySelectorAll(".social-link span");

    if (title && title.textContent !== current.made) title.textContent = current.made;
    if (description && description.textContent !== current.description) description.textContent = current.description;
    if (links[2] && links[2].textContent !== current.support) links[2].textContent = current.support;
  }

  window.addEventListener("DOMContentLoaded", () => {
    applyFooterLanguage();
    document.querySelector(".language-switch")?.addEventListener("click", () => {
      window.setTimeout(applyFooterLanguage, 120);
    });

    const switcher = document.querySelector(".language-switch");
    if (switcher) {
      new MutationObserver(() => requestAnimationFrame(applyFooterLanguage)).observe(switcher, {
        subtree: true,
        attributes: true,
        attributeFilter: ["class"]
      });
    }
  });
})();
