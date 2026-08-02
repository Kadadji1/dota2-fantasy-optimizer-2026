"use client";

import { useEffect } from "react";
import { Analytics, track } from "@vercel/analytics/react";

function normalizeText(value: string | null | undefined) {
  return (value ?? "").trim().toLowerCase();
}

export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const clickable = target?.closest("a, button") as HTMLAnchorElement | HTMLButtonElement | null;
      if (!clickable) return;

      if (clickable instanceof HTMLAnchorElement) {
        const href = clickable.href;
        if (href.includes("github.com/Kadadji1")) track("outbound_click", { destination: "github" });
        else if (href.includes("steamcommunity.com/id/Kadadji1")) track("outbound_click", { destination: "steam" });
        else if (href.includes("buymeacoffee.com/kadadji")) track("outbound_click", { destination: "buy_me_a_coffee" });
        return;
      }

      const text = normalizeText(clickable.textContent);
      if (
        text.includes("optimize roster") ||
        text.includes("подобрать состав") ||
        text.includes("optimizar alineación") ||
        text.includes("优化阵容")
      ) {
        track("optimize_roster");
        return;
      }

      if (["en", "ru", "es", "中文"].includes(text)) {
        track("language_change", { language: text === "中文" ? "zh" : text });
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return <Analytics />;
}
