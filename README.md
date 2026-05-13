# AI Spend Auditor

A tool that audits your team's AI subscription stack (ChatGPT, Claude, Cursor, Copilot, Gemini, Windsurf, OpenAI API, Anthropic API), spots overpayment and wrong-plan-for-use-case mistakes, and gives you a per-tool breakdown with a shareable URL. Built for the founder, ops lead, or eng manager who suspects their team is overpaying for AI but doesn't want to manually compare 8 pricing pages.

**Live demo:** https://ai-spend-analyser.vercel.app

## Screenshots

- Form input: https://ai-spend-analyser.vercel.app (top of page)
- Per-tool breakdown card with savings, recommendation, reason, issues
- Shareable audit URL after lead capture

I'm including these as links to the live site rather than committing PNGs to the repo so anyone reviewing can also click through the actual flow.

## Quick start

```bash
git clone <repo>
cd ai-spend-auditor
npm install
cp .env.local.example .env.local   # fill in keys (see below)
npm run dev
```

Open http://localhost:3000

### Required env vars

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
ANTHROPIC_API_KEY=          # optional, falls back to template summary
RESEND_API_KEY=             # optional, lead capture still works without it
NEXT_PUBLIC_APP_URL=        # used in transactional email links
```

### Deploy

Push to GitHub, import to Vercel, add the env vars in the Vercel dashboard. Supabase needs an `audits` table with columns: `id (uuid)`, `tools (jsonb)`, `result (jsonb)`, `summary (text)`, `email (text)`, `company_name (text)`, `role (text)`, `created_at (timestamptz)`. RLS enabled, anon insert allowed, public select on `id` only.

## Decisions and trade-offs

**1. Rule-based audit engine instead of LLM-driven recommendations.** I considered sending the whole stack to an LLM and asking "what should they downgrade?" Rejected because (a) the answer needs to be deterministic for the same input, (b) latency and cost on every audit, (c) hallucinated savings numbers are worse than no savings numbers. The LLM only writes the summary paragraph; every dollar figure comes from a hardcoded pricing table in `auditEngine.js`. Downside: pricing data goes stale and I need to maintain it.

**2. Single Next.js App Router app, no separate backend.** Supabase via the anon key handles persistence; API routes handle the few server-side calls (Anthropic, Resend, Supabase writes). Faster to ship and one deploy target. Trade-off: anon key is in the bundle, so RLS policy correctness matters more than usual. If this became real product, I'd move writes to a service-role server function.

**3. No login or auth.** Audits are public-by-URL using UUID v4 (collision-resistant enough for this scale). The trade-off: anyone with the URL sees the audit. For a lead-gen tool this is the right default — friction kills conversion — but it does mean I can't show "your past audits" without adding email-based auth.

**4. Dropped the PDF download feature mid-build.** Spent several hours on `html2pdf.js`. Got the capture pipeline working end-to-end but the rendered output was blank, likely an html2canvas + table interaction. Decided the shareable URL covers the "save and share" use case and removed the feature rather than ship something broken. Trade-off: no offline artifact for users who want one. Would solve with a server-side `@react-pdf/renderer` route if I built it back.

**5. Anthropic summary as nice-to-have, not required.** API key isn't funded yet, so production currently uses `generateFallbackSummary` — a template that branches on savings thresholds. The whole audit works without the LLM call. Trade-off: the summary feels generic until the API is funded. Better than a hard dependency that breaks the page when credits run out.