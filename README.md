# Dota 2 Fantasy Optimizer 2026

Bilingual EN/RU web app for optimizing The International 2026 Fantasy picks around a user's actual banner multipliers.

## Current MVP

- English/Russian language switch
- Core, Mid and Support role modes
- Three configurable emblems per role
- Editable multipliers
- Live player ranking
- Transparent weighted scoring formula
- Responsive mobile interface

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scoring

The MVP currently uses:

```text
score = stat_1 × multiplier_1 + stat_2 × multiplier_2 + stat_3 × multiplier_3
```

Player statistics currently use normalized seed values. The next milestone is importing the complete 2026 dataset from the research tables and validating it against public match data.

## Planned

- Full 2026 player dataset
- Banner traits and titles
- Reroll recommendations
- Player comparison
- Group Stage / The International stage presets
- Historical variance and ceiling metrics
- Swiss-stage simulation
- Screenshot import

## Disclaimer

This is an independent community project and is not affiliated with Valve Corporation or The International.
