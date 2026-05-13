# Tests

All tests live in `tests/` and are run with Vitest.

```bash
npm test              # run once
npm run test:watch    # watch mode
npm run test:ci       # used by CI, also runs lint
```

The audit engine is pure JS with no side effects, which makes it the natural unit to test. I focused on the engine because it's the part that produces every dollar figure shown to the user — if it returns the wrong number, the whole product is wrong.

## Test files

### `tests/auditEngine.overpayment.test.js`
Covers: a user paying more than the official price for their plan should see the overpayment surfaced as an issue, and the overcharge counted toward `totalSavings`. Specifically tests that a single Cursor Pro user paying $40/mo when the plan is $20/mo produces a $20 saving on that tool and an issue string mentioning the overpayment.

### `tests/auditEngine.downgrade.test.js`
Covers: the plan-downgrade rules trigger when conditions match and stay quiet when they don't. Tests two cases — Claude Max with 1 user on a non-coding use case should suggest downgrading to Claude Pro, and Claude Max with 5 users on coding should NOT trigger the downgrade. Catches a class of bugs where the conditions get inverted.

### `tests/auditEngine.useCaseFit.test.js`
Covers: wrong-tool-for-use-case detection. GitHub Copilot used for `writing` should trigger an alternative suggestion (Claude or ChatGPT); Cursor used for `coding` should not trigger anything. Tests both sides because a false positive ("you're using Cursor for coding, switch to Claude") would tank user trust.

### `tests/auditEngine.totals.test.js`
Covers: aggregate calculations. Given three tools with known savings (e.g. $20, $0, $50), `totalSavings` should be $70, `annualSavings` should be $840, `toolsAnalyzed` should be 3. Also tests that `score` deducts correctly (8 points per issue) and floors at 0 rather than going negative.

### `tests/auditEngine.overlap.test.js`
Covers: the duplicate-use-case warning. Two tools both set to `coding` should produce `overlapWarning` mentioning "coding". Three distinct use cases should produce `overlapWarning: null`. This is the one rule that operates across tools rather than per-tool, so it gets its own test.

## What I didn't test

- The API routes. I'd cover these with Playwright or a Supertest-style integration test if I had another day. The save-audit route in particular has the inline Resend call that should be tested with a mocked SDK.
- The React form. The tools state, addTool/removeTool, localStorage hydration. Manual smoke testing has been sufficient at this stage; would add Testing Library tests if the form grew.
- The shareable page. Static rendering of saved data — low complexity, high obviousness if it breaks.

## How CI runs them

The workflow in `.github/workflows/ci.yml` runs `npm ci`, then `npm run lint`, then `npm test`. Both must pass for the workflow to succeed. Latest commit on main shows green.