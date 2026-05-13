# Pricing data sources

Every dollar number in `lib/auditEngine.js` is grounded in the URLs below. All prices verified 2026-05-13. Where my engine and the vendor pricing page disagree, I've flagged it under "Known gaps" at the bottom rather than silently fix it — fixing pricing in the engine without re-running the calculation is a separate piece of work I haven't done yet.

## ChatGPT
- Free: $0 — https://openai.com/chatgpt/pricing/ — verified 2026-05-13
- Plus: $20/user/month — https://openai.com/chatgpt/pricing/ — verified 2026-05-13
- Pro: $200/user/month — https://openai.com/chatgpt/pricing/ — verified 2026-05-13
- Business: $30/user/month (Team plan) — https://openai.com/chatgpt/pricing/ — verified 2026-05-13

## Claude
- Pro: $20/user/month — https://claude.com/pricing — verified 2026-05-13
- Max 5x: $100/user/month — https://claude.com/pricing — verified 2026-05-13
- Max 20x: $200/user/month (not in my engine yet, see gaps below) — https://claude.com/pricing — verified 2026-05-13
- Team Standard: $25/seat/month monthly, $20/seat/month annual — https://claude.com/pricing — verified 2026-05-13
- Team Premium: $125/seat/month monthly, $100/seat/month annual — https://claude.com/pricing — verified 2026-05-13

## GitHub Copilot
- Pro: $10/user/month — https://github.com/features/copilot/plans — verified 2026-05-13
- Business: $19/user/month — https://github.com/features/copilot/plans — verified 2026-05-13

## Gemini
- Gemini Pro / AI Pro: $19.99/month (rounded to $20 in engine) — https://gemini.google/subscriptions/ — verified 2026-05-13
- Gemini Ultra / AI Ultra: $249.99/month — https://gemini.google/subscriptions/ — verified 2026-05-13

## Cursor
- Pro: $20/month — https://cursor.com/pricing — verified 2026-05-13
- Pro+: $60/month — https://cursor.com/pricing — verified 2026-05-13
- Ultra: $200/month (not in my engine yet) — https://cursor.com/pricing — verified 2026-05-13
- Teams: $40/user/month (not in my engine yet) — https://cursor.com/pricing — verified 2026-05-13

## Windsurf
- Pro: $15/month (engine has $20, see gaps) — https://windsurf.com/pricing — verified 2026-05-13
- Teams: $30/user/month — https://windsurf.com/pricing — verified 2026-05-13

## OpenAI API
- Pay-as-you-go, per-token. Engine treats it as variable cost, not fixed plan — https://openai.com/api/pricing/ — verified 2026-05-13

## Anthropic API
- Pay-as-you-go, per-token. Sonnet 4.6: $3/M input, $15/M output. Opus 4.6: $5/M input, $25/M output — https://www.anthropic.com/pricing#api — verified 2026-05-13

## Known gaps and discrepancies

These are real differences between my audit engine and the verified pricing. Calling them out rather than pretending they don't exist.

**1. Claude Team is $25/seat/month, not $30.** Engine has `team: { price: 30 }`. Source confirms $25 monthly / $20 annual on Team Standard. My downgrade rule for Claude Team correctly suggests Pro for ≤2 users, but the savings amount is calculated against the wrong base. Fix is a one-line change.

**2. Cursor Teams and Ultra are missing entirely.** Engine only supports Cursor `pro` and `proPlus`. If a user picks Cursor on Teams ($40/user) or Ultra ($200/user), the form has no option for them. Fix is adding two plans to `TOOL_PLANS` and `TOOL_PRICING`.

**3. Claude Max 20x ($200/mo) is missing.** Engine has `max: { price: 100 }` which is Max 5x. Max 20x users would have to pick "max" and get the wrong expected cost. Fix is splitting `max` into `max5x` and `max20x`.

**4. Windsurf Pro is $15, not $20.** Engine has `pro: { price: 20 }`. Same family of bug as #1 — downgrade calculation will be off by $5/user.

**5. Gemini Ultra is $249.99, not $20.** Engine has both Pro and Ultra at $20. This is a real bug — would tell users on Ultra ($249.99) that they're paying expected cost when they're paying 12x more. Should be `ultra: { price: 250 }`.

**6. ChatGPT Team is $30, ChatGPT Business is a separate enterprise tier.** Engine labels Plus/Pro/Business but the "Business" label points to what OpenAI now calls "Team." Cosmetic but worth fixing the label.

Why I haven't fixed all of these yet: each price change requires re-checking the downgrade conditions and alternative suggestions in the engine, and I didn't want to ship partial corrections that look correct but reference outdated logic. Tracking these as known issues in DEVLOG.md and the next-day plan.