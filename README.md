<div align="center">

# 🛡️ TI2026 Fantasy Optimizer

## Dota 2 TI2026 Fantasy Calculator & Optimizer

Build and compare Fantasy banners, optimize your roster and explore TI2026 Group Stage predictions using historical professional match data and simulation-based projections.

[![Open Fantasy Calculator & Optimizer](https://img.shields.io/badge/Open%20Fantasy%20Calculator%20%26%20Optimizer-d6a93d?style=for-the-badge)](https://www.ti2026calculator.com/)
[![GitHub Stars](https://img.shields.io/github/stars/Kadadji1/dota2-fantasy-optimizer-2026?style=for-the-badge)](https://github.com/Kadadji1/dota2-fantasy-optimizer-2026/stargazers)

**English · Русский · Español · 简体中文 · Desktop / Mobile**

</div>

<p align="center">
  <img
    src="./docs/775155BD-7682-4F14-BC16-84EF29BDEDDB.png"
    alt="Dota 2 TI2026 Fantasy Calculator and Optimizer interface preview"
    width="100%"
  />
</p>

---

## Live website

**https://www.ti2026calculator.com/**

The project now includes three main sections:

- **Fantasy Calculator** — build Core, Mid and Support banners, compare players and optimize the projected roster.
- **Predictions** — edit the TI2026 Swiss-stage bracket and compare team outcome probabilities and expected points.
- **Guide** — a compact reference for emblems, scoring, tiers, traits, rerolls, trainer titles and model limitations.

---

## Current model data

The website currently uses a broader professional Dota 2 dataset covering:

- **8,000+ matches analyzed**
- **80+ competitive events**
- **15,000 tournament simulations**
- player-level historical performance
- recent form and patch-specific results where available
- team ratings and external prediction signals for the Group Stage model

The project is designed for **The International 2026** and will continue to be updated as the tournament progresses.

---

## Fantasy Calculator

The calculator helps Dota 2 players compare banner configurations and identify stronger projected Fantasy lineups.

### Features

- **Banner Builder** — configure all three emblems for Core, Mid and Support.
- **Best Roster** — compare projected player and role-pair combinations.
- **Player-specific scoring** — recommendations adapt to the selected player, role, historical performance and hero pool.
- **Traits and tiers** — account for emblem tier values and trait activation.
- **Trainer titles** — prefix and suffix scenarios are included where the available data supports them.
- **Team Overview** — compare represented TI2026 teams and players.
- **Reroll Guide** — compare emblem value and reroll priorities.
- **Scoring Reference** — review the Fantasy rules used by the calculator.

### TI2026 schedule

- **Group Stage:** August 13–16
- **Main Event:** August 20–23

---

## Group Stage Predictions

The Predictions page models how the TI2026 Swiss stage can end.

The model combines team ratings built from roughly a year of professional matches with recent form, patch 7.41 results, market odds and predictions from well-known analysts.

The recommended bracket is filled automatically, but every team can be moved freely. The bracket always remains complete, and the expected result metrics update with the current selection.

### Prediction features

- interactive Swiss-stage bracket
- probability for every team in every possible finishing slot
- playoff qualification probabilities
- expected-point estimate for the selected bracket
- expected correct slots
- model-fit comparison
- risk / reward profile
- dynamic outcome distribution
- compact and detailed Team Odds views

**Draft lock:** August 13

---

## Fantasy Guide

The Guide explains the parts of the Fantasy system that are easy to misread when looking only at raw percentages.

It covers:

- Fantasy roster basics
- emblems and scoring
- tiers
- traits
- reroll priorities
- trainer titles
- when to lock the roster
- Group Stage predictions
- known data limitations

---

## Data and methodology

The project uses publicly available professional match statistics and additional community research.

Fantasy projections are based on historical player performance, role-specific statistics, team context, emblem configuration and supported title effects.

The Group Stage prediction model combines longer-term team ratings with more recent and tournament-specific signals. Predictions are probabilistic rather than guarantees, and the values can change as new results become available.

Some Fantasy events are not exposed reliably in public match data. In particular, Lotus-related values and several conditional suffix scenarios should be treated as approximate or conditional where noted on the website.

---

## Localization and platform support

The interface supports:

- English
- Russian
- Spanish
- Simplified Chinese

The website is responsive and designed to work on desktop, tablet and mobile.

---

## Support the project

- **[⭐ Star this repository](https://github.com/Kadadji1/dota2-fantasy-optimizer-2026)**
- **[❤️ Support the Project](https://buymeacoffee.com/kadadji?status=1)**
- **[🎮 Steam Profile](https://steamcommunity.com/id/Kadadji1/)**

---

## Roadmap

- [x] TI2026 Fantasy Calculator & Optimizer
- [x] Banner tiers and traits
- [x] Best roster and player alternatives
- [x] Team logos and team overview
- [x] Trainer title support and title guidance
- [x] Group Stage Predictions
- [x] Interactive Team Odds and bracket editing
- [x] Dedicated Fantasy Guide
- [x] English, Russian, Spanish and Simplified Chinese localization
- [x] Mobile support
- [ ] Refresh Fantasy and prediction data after the Group Stage
- [ ] Main Event updates
- [ ] Additional TI2026 improvements based on tournament results and community feedback
- [ ] TI2027 update

---

## Technology

- Next.js
- React
- TypeScript
- Vercel

---

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

---

## Disclaimer

This is an independent fan-made community project and is not affiliated with Valve Corporation.

Dota 2, The International and all related trademarks and assets belong to their respective owners.
