import type { Metadata } from "next";
import SiteHeader from "../../components/SiteHeader";

export const metadata: Metadata = {
  title: "TI2026 Fantasy Guide",
  description: "Complete TI2026 Fantasy guide covering banners, emblems, traits, titles, rerolls and predictions.",
  alternates: { canonical: "/guide" }
};

const sections = [
  { id: "basics", title: "Fantasy basics", body: "Your roster contains a Core pair, one Mid player and a Support pair. Every banner has three emblems, and every emblem combines a stat, a tier and a trait." },
  { id: "emblems", title: "Emblems and scoring", body: "Strong emblems depend on the role and the player. Core usually benefits from farming and teamfight stats, Mid from runes, kills and teamfight, and Support from wards, stacks, smokes and teamfight." },
  { id: "tiers", title: "Tiers", body: "Higher tiers increase the emblem contribution, but a high tier on a weak stat is not automatically better than a lower tier on a strong player-specific stat." },
  { id: "traits", title: "Traits", body: "Traits can strengthen one emblem, affect adjacent slots or require a specific banner structure. The calculator applies these effects automatically when ranking players and pairs." },
  { id: "rerolls", title: "Reroll priorities", body: "Avoid rerolling a banner only because one displayed percentage looks low. Compare the stat, player history, tier, trait activation and the risk of losing two already strong emblems." },
  { id: "titles", title: "Trainer titles", body: "Prefixes are estimated from each player’s historical hero pool. Suffixes depend on future match events, so the calculator shows them as conditional scenarios and groups them into Stable, Gamble and Avoid." },
  { id: "timing", title: "When to lock", body: "For the most accurate values, finalize the roster close to roster lock. Valve may still adjust scoring, and additional tournament results can improve the dataset." },
  { id: "predictions", title: "Group stage predictions", body: "The Predictions page shows the balanced-model probability for every team and every possible finish. You can swap teams between slots while keeping the bracket complete." },
  { id: "limits", title: "Known limitations", body: "Some events are not exposed reliably by public match data. Lotus values and several suffix conditions should therefore be treated as approximate or conditional." },
  { id: "faq", title: "FAQ", body: "High percentages are not always better, Prefix recommendations change with the roster, and Suffix values are not guaranteed points. The tool is free and community-built." }
];

export default function GuidePage() {
  return (
    <>
      <SiteHeader active="guide" />
      <main className="site-shell guide-page">
        <div className="section-nav-wrap">
          <nav className="section-nav" aria-label="Guide navigation">
            {sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
          </nav>
        </div>

        <section className="guide-hero">
          <span className="eyebrow">THE INTERNATIONAL 2026</span>
          <h1>Fantasy Guide</h1>
          <p>Everything needed to understand banners, titles, rerolls and the prediction model without digging through the calculator itself.</p>
        </section>

        <section className="guide-grid">
          {sections.map((section, index) => (
            <article className="guide-card" id={section.id} key={section.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
