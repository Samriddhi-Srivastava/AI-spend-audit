# Prompts

The only LLM call in the product is in `app/api/summary/route.js`. Below is the exact prompt, why it's written this way, and the things I tried that didn't work.

## The current prompt

```
You are an AI spend analyst. A user has audited their AI tool subscriptions.
Write a concise, personalized 100-word summary of their audit results.
Be specific, practical, and direct. Do not use bullet points.

Here is their audit data:
- Total monthly spend: $<totalSpend>
- Potential monthly savings: $<totalSavings>
- Potential annual savings: $<annualSavings>
- Optimization score: <score>/100
- Tools analyzed: <toolsAnalyzed>

Per-tool breakdown:
<toolSummary>

Write the summary now:
```

`<toolSummary>` is built by joining each tool's name, plan, current spend, and recommendation/reason into one line per tool. Example:

```
Cursor (proPlus): $60/mo — Downgrade to Cursor Pro. Cursor Pro+ ($60/mo) is designed for teams doing very heavy AI-assisted coding...
```

## Why it's written this way

**"You are an AI spend analyst."** I tried no system framing and got summaries that sounded like a friendly chatbot ("Great audit! Looks like you have some opportunities..."). The framing turned the tone professional without me having to specify rules about tone explicitly.

**"100-word summary."** Tried 200 first. The output was padded with filler sentences about "the AI landscape" and "evolving needs." 100 forces it to lead with the number. Tried 50 — too terse to feel personalized; users couldn't tell if the tool had actually looked at their inputs.

**"Be specific, practical, and direct."** This is doing real work. Without it, the summary often hedges ("you might consider potentially looking into") which makes the recommendation feel unconfident. With it, sentences come out in the imperative ("Switch your Copilot subscription to ChatGPT Plus").

**"Do not use bullet points."** The frontend renders the summary as a single `<p>` block. Markdown bullets render as plain text with asterisks and look broken. The instruction is more reliable than post-processing.

**Structured data above the per-tool breakdown.** I include `totalSpend`, `totalSavings`, etc. as a quick header so the model can ground the summary in the overall numbers without re-deriving them from the per-tool list. This dropped a class of hallucinations where the model would sum tool spends incorrectly.

**Per-tool breakdown as a flat string.** I tried passing it as JSON. The model occasionally tried to "preserve" the JSON structure in its output. Flat lines work better.

## Things I tried that didn't work

**System prompt with explicit format rules.** I started with a long system prompt listing 8 rules ("start with the savings figure," "address the user as 'your team,'" etc). The summaries became formulaic — every output had the same shape. Cutting the system prompt down and letting the model pick its own opening produced better variety and felt less robotic.

**Asking for a "headline" plus paragraph.** Tried "Write a one-line headline followed by a 100-word paragraph." The headlines were either generic ("Big Savings Available!") or duplicated the first sentence. Dropped.

**Few-shot examples.** I tried adding two example audits with example summaries. The output started mimicking the examples almost verbatim, especially the sentence structure. Removed because it hurt variety more than it helped quality.

**Streaming.** Considered streaming the summary to the frontend for perceived speed. The summary is short enough (~100 words = ~1 second) that the wait isn't bad, and streaming added complexity (the fallback path doesn't stream, so the frontend would need two render modes). Skipped.

**Asking the model to recommend tools directly, not just summarize.** I considered cutting the deterministic engine and letting the LLM make the recommendations. Rejected for reasons explained in README/Decisions — non-determinism, hallucinated numbers, and latency. The engine produces the recommendation; the LLM only narrates.

## What I'd try next

- A version that adapts tone to the savings tier (urgent for high savings, congratulatory for well-optimized stacks). Currently the same prompt runs regardless.
- A second pass that critiques the summary and rewrites if it's generic. Would add latency and probably isn't worth it at 100 words.
- Caching by `(savings bucket, tools signature)` so identical-shaped audits share a summary. Discussed in ARCHITECTURE.md as a scaling move.