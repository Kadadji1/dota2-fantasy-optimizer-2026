<div align="center">

# 🛡️ TI2026 Fantasy Calculator & Optimizer

Build five-emblem Fantasy banners, compare active Main Event players, evaluate trainer titles and create a complete TI2026 playoff prediction.

[![Open the live website](https://img.shields.io/badge/Open%20TI2026%20Calculator-d6a93d?style=for-the-badge)](https://www.ti2026calculator.com/)
[![GitHub Stars](https://img.shields.io/github/stars/Kadadji1/dota2-fantasy-optimizer-2026?style=for-the-badge)](https://github.com/Kadadji1/dota2-fantasy-optimizer-2026/stargazers)

**English · Русский · Español · 简体中文 · Desktop / Mobile**

</div>

<p align="center">
  <img src="./docs/775155BD-7682-4F14-BC16-84EF29BDEDDB.png" alt="TI2026 Fantasy Calculator and Optimizer interface" width="100%" />
</p>

## Live website

**https://www.ti2026calculator.com/**

The site currently follows the **TI2026 Main Event**. The Group Stage prediction board is closed and its completed results are used as tournament context.

## Main sections

- **Fantasy Calculator** — enter the five emblems on each banner, select a shared Prefix and Suffix, then compare the strongest Core, Mid and Support choices.
- **Main Event Predictions** — fill the complete 14-match double-elimination bracket, compare two models and see expected Compendium prediction points.
- **Fantasy Guide** — learn how scoring, tiers, traits, trainer titles, team opportunity, rerolls and saving work.

## Current Main Event scope

Only the eight teams still competing are included in Fantasy rankings and team-opportunity cards:

- TEAM VISION
- Nigma Galaxy
- Team Liquid
- Iron Wing
- Team Falcons
- Team Spirit
- Team Yandex
- BoomBoys

Eliminated teams remain only in historical source data and are not selectable or ranked by the current calculator.

## Fantasy Calculator

### Banner and roster support

- five emblem slots for each Main Event banner;
- one Core pair, one Mid player and one Support pair;
- role-compatible red, blue and green stats;
- tiers I–V: **+10%, +30%, +60%, +100%, +150%**;
- Fractal, Benevolent, Vampiric, Unique and Friendly trait interactions;
- player-specific contribution breakdowns and alternatives;
- automatic local saving of emblems, Prefix and Suffix.

Core and Support entries represent a same-team pair. Mid entries represent one player. Player projections are **per match**; team title chance and expected remaining maps are shown separately and do not silently change the player ranking.

### Trainer titles

The calculator supports one shared Prefix and one shared Suffix for the roster.

- Prefix expected value uses the player's historical hero-group trigger rate and the title bonus.
- Pair trigger rates use the simple average of both players.
- The TI draft-context block summarizes **109 Group Stage maps**.
- Suffixes are displayed as conditional scenarios because their triggering events occur on future individual maps.

### Team opportunity

Each active team card shows:

- model title chance;
- expected maps remaining;
- chance to play at least 2, 3 or 4 Main Event series.

These values describe tournament opportunity, not guaranteed Fantasy points.

## Main Event Predictions

The prediction page contains the complete eight-team double-elimination bracket:

- 14 selectable matches from the upper quarterfinals through the Grand Final;
- confirmed opening matchups;
- a compact one-line schedule in New York time;
- **Balanced** and **TI-only** models;
- downstream opponents rebuilt from every selected winner;
- match win probabilities;
- 20,000 deterministic bracket simulations per selection state;
- expected correct picks and expected Compendium points;
- team placement probabilities and expected maps.

The official prediction reward scale depends on the **total number of correct picks**, from 120 points for one correct result to 12,000 points for all 14.

Model probabilities are estimates based on relative team strength. They are not bookmaker odds or guarantees.

## Data and methodology

- dedicated Fantasy player sample: **1,601 matches across 13 Tier 1 tournaments**;
- broader project analysis: **8,000+ professional matches across 80+ events**;
- bracket projection: **20,000 simulations**;
- current TI context: Group Stage records, map results and 109-map draft summary.

Each game is scored separately. A series result uses its two highest-scoring games, and the displayed player or pair value is an average match score over the source tournaments.

Known limitations are stated in the interface and Guide:

- Lotus events are approximate because public match data does not expose the exact pickup event reliably;
- two rare Suffix conditions cannot be modeled reliably from OpenDota events;
- Prefixes use historical trigger frequencies;
- Suffix results are conditional examples;
- team probabilities are model estimates and may change with new information.

## Localization and responsive design

The calculator, predictions, guide, roster section and navigation support:

- English;
- Russian;
- Spanish;
- Simplified Chinese.

Desktop uses full tables and bracket columns. Mobile uses round-by-round bracket navigation, compact team-probability cards, horizontally scrollable utility rows and single-column Guide/roster layouts.

## Current tournament dates

- **Group Stage:** August 13–16, 2026 — completed;
- **Main Event:** August 20–23, 2026, Shanghai.

Main Event Fantasy should be locked before the first match. The website presents match times in New York time where a timezone is needed.

## Technology

- Next.js 14
- React 18
- TypeScript
- Vercel Analytics
- Vercel hosting

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production verification:

```bash
npm run build
```

## Project status

- [x] Five-emblem Main Event Fantasy calculator
- [x] Active-team-only player rankings
- [x] Traits, tiers, Prefixes and Suffix scenarios
- [x] Team title chance, expected maps and series thresholds
- [x] Complete interactive Main Event bracket
- [x] Official 14-pick point scale
- [x] English, Russian, Spanish and Simplified Chinese
- [x] Responsive desktop and mobile layouts
- [x] Persistent browser-local calculator setup
- [x] Main Event Fantasy Guide
- [ ] Update model inputs as Main Event results become available
- [ ] Archive TI2026 and prepare the next tournament edition

## Support the project

- [⭐ Star this repository](https://github.com/Kadadji1/dota2-fantasy-optimizer-2026)
- [❤️ Support the project](https://buymeacoffee.com/kadadji?status=1)
- [🎮 Steam profile](https://steamcommunity.com/id/Kadadji1/)

## Disclaimer

This is an independent fan-made community project and is not affiliated with Valve Corporation.

Dota 2, The International and all related trademarks and assets belong to their respective owners.
