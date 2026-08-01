(() => {
  const links = [
    {
      key: "github",
      label: "GitHub",
      href: "https://github.com/Kadadji1/dota2-fantasy-optimizer-2026",
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .7A11.3 11.3 0 0 0 8.4 22.8c.6.1.8-.2.8-.6v-2.1c-3.4.7-4.1-1.4-4.1-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.6 4 18.6 4.5 18.6 4.5c.7 1.6.3 2.9.2 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6A11.3 11.3 0 0 0 12 .7Z"/></svg>'
    },
    {
      key: "steam",
      label: "Steam",
      href: "https://steamcommunity.com/id/Kadadji1/",
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 1.2A10.8 10.8 0 0 0 1.4 9.7l5.8 2.4a3.1 3.1 0 0 1 1.8-.5l2.6-3.8a4.3 4.3 0 1 1 4 4.4L11.8 15a3.2 3.2 0 0 1-6.1 1L1.8 14.4A10.8 10.8 0 1 0 12 1.2Zm3.9 5.1a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4ZM8.7 13a1.8 1.8 0 0 0-1 .3l2 0.8a2.2 2.2 0 1 1-1.7 4.1 2.2 2.2 0 0 1-1.3-1.1 1.9 1.9 0 1 0 2-4.1Z"/></svg>'
    },
    {
      key: "coffee",
      label: "Buy me a coffee",
      href: "https://buymeacoffee.com/kadadji?status=1",
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 4h11.8v2H19a3 3 0 0 1 0 6h-2.6A6 6 0 0 1 10.5 17H9a6 6 0 0 1-6-6V6a2 2 0 0 1 2-2Zm11.8 4v2H19a1 1 0 0 0 0-2h-2.2ZM5 6v5a4 4 0 0 0 4 4h1.5a4 4 0 0 0 4-4V6H5Zm-1 13h14v2H4v-2Z"/></svg>'
    }
  ];

  const createLink = (item, compact = false) => {
    const a = document.createElement("a");
    a.className = compact ? "social-link social-link-compact" : "social-link";
    a.href = item.href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", item.label);
    a.title = item.label;
    a.innerHTML = `${item.icon}${compact ? "" : `<span>${item.label}</span>`}`;
    return a;
  };

  const install = () => {
    const header = document.querySelector(".topbar");
    const languageSwitch = document.querySelector(".language-switch");
    if (!header || !languageSwitch || header.querySelector(".social-links-header")) return;

    const headerLinks = document.createElement("div");
    headerLinks.className = "social-links-header";
    links.forEach((item) => headerLinks.appendChild(createLink(item, true)));
    header.insertBefore(headerLinks, languageSwitch);

    if (!document.querySelector(".site-social-footer")) {
      const footer = document.createElement("footer");
      footer.className = "site-social-footer";
      footer.innerHTML = '<div class="footer-signature"><strong>Made by Kadadji</strong><span>Dota 2 and The International are trademarks of Valve Corporation. This project is not affiliated with Valve.</span></div>';
      const footerLinks = document.createElement("div");
      footerLinks.className = "social-links-footer";
      links.forEach((item) => footerLinks.appendChild(createLink(item, false)));
      footer.appendChild(footerLinks);
      document.body.appendChild(footer);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();
