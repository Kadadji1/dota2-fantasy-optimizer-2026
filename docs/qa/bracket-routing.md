# Production QA case: lower-bracket routing

**Type:** retrospective production-defect case, supported by the public source diff and project records. This is not an original bug ticket or a newly executed test report.

## Reported problem

Community feedback identified incorrect lower-bracket relationships in the Main Event prediction bracket. Advancing teams through the interactive bracket could assign the wrong upper-bracket losers to lower-bracket matches.

## Source evidence

[Fix Main Event lower bracket routing — commit 43d43fd](https://github.com/Kadadji1/dota2-fantasy-optimizer-2026/commit/43d43fd4c08402111dcc3f7fe5934bb0b981620e), dated August 17, 2026, changed `app/predictions/Predictions.tsx`.

| Match | Before | After |
| --- | --- | --- |
| M10 | loser(M5), winner(M8) | winner(M8), loser(M6) |
| M11 | loser(M6), winner(M9) | winner(M9), loser(M5) |

The same commit updated dependent model bracket picks. This was a state/dependency correction, not only a copy change.

## Expected behavior

The lower-bracket participant flow should match the intended Main Event bracket. Selecting or changing upstream winners should rebuild downstream participants consistently.

## Evidence limits

The original exact reproduction steps, browser/build identifiers, original user message, and recorded post-fix execution results are not available in this public case. They have not been reconstructed as historical facts.

## Suggested regression checks — not executed in this documentation update

- Select upstream winners and verify M10 uses winner(M8) and loser(M6).
- Verify M11 uses winner(M9) and loser(M5).
- Change an upstream winner and inspect dependent lower-bracket participants.
- Check M12, M13, and M14 after dependency changes.
- Repeat the flow across both prediction-model views.
- Record browser, commit, inputs, expected/actual output, and evidence when executing these checks.
