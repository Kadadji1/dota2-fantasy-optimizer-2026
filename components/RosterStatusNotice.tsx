"use client";

import { useEffect, useState } from "react";

type Language = "en" | "ru" | "es" | "zh";

const copy: Record<Language, { title: string; body: string }> = {
  en: {
    title: "LGD roster update",
    body: "TaiLung has been banned from The International 2026. His Fantasy calculations have been temporarily removed while LGD finalizes its replacement mid laner. LGD-related projections will be updated once the final TI 2026 roster is confirmed."
  },
  ru: {
    title: "Обновление состава LGD",
    body: "TaiLung дисквалифицирован с The International 2026. Его Fantasy-расчёты временно удалены, пока LGD не объявит нового мидера. Прогнозы по LGD будут обновлены после подтверждения финального состава на TI 2026."
  },
  es: {
    title: "Actualización de la plantilla de LGD",
    body: "TaiLung ha sido excluido de The International 2026. Sus cálculos de Fantasy se han retirado temporalmente mientras LGD confirma a su nuevo mid. Las proyecciones de LGD se actualizarán cuando se confirme la plantilla final para TI 2026."
  },
  zh: {
    title: "LGD 阵容更新",
    body: "TaiLung 已被禁止参加 The International 2026。目前已暂时移除他的 Fantasy 计算，等待 LGD 确认新的中单选手。LGD 的相关预测将在 TI 2026 最终阵容确认后更新。"
  }
};

export default function RosterStatusNotice() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("site-language") as Language | null;
    if (saved && copy[saved]) setLanguage(saved);
    const onLanguageChange = (event: Event) => {
      const custom = event as CustomEvent<{ language?: Language }>;
      if (custom.detail?.language && copy[custom.detail.language]) setLanguage(custom.detail.language);
    };
    window.addEventListener("site-language-change", onLanguageChange);
    return () => window.removeEventListener("site-language-change", onLanguageChange);
  }, []);

  const t = copy[language];
  return (
    <section className="section" aria-live="polite">
      <div style={{ border: "1px solid rgba(255,255,255,.14)", borderRadius: 14, padding: "16px 18px", background: "rgba(255,255,255,.045)" }}>
        <strong style={{ display: "block", marginBottom: 6 }}>{t.title}</strong>
        <span style={{ opacity: .82, lineHeight: 1.55 }}>{t.body}</span>
      </div>
    </section>
  );
}
