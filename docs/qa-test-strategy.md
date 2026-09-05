# QA test strategy

## Purpose

The calculator makes ranking decisions from player statistics, emblem tiers and trait interactions. A small change in this logic can silently change a recommended roster, so this project protects the calculation layer before testing the interface.

## Automated coverage

| Layer | What is checked | Why it matters |
| --- | --- | --- |
| Unit | Tier multipliers, Fractal, adjacent trait interactions, missing source values, role ranking | Protects the scoring and recommendation rules directly. |
| Browser | Calculator load, recommended roster rendering, saved Prefix selection, primary navigation | Confirms a visitor can use the main flow in a real browser. |

## Risk-based scope

The tests focus on the highest-impact paths: a wrong score, a wrong role ranking, or a setting that is not saved could lead a user to make the wrong Fantasy choice. Tournament data and model assumptions remain separately documented in the product; automated tests verify that the app applies the stored rules consistently.

## Running the suite

```bash
npm test
npx playwright install chromium
npm run test:e2e
```

GitHub Actions runs these checks on every push and pull request.
