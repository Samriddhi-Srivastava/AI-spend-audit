# Architecture

## System diagram

```mermaid
flowchart TD
    User[User in browser] -->|fills form| Form[AuditForm component<br/>app/audit-form/page.js]
    Form -->|calculateAudit| Engine[Audit engine<br/>lib/auditEngine.js]
    Engine -->|toolResults, totalSavings| Form
    Form -->|POST /api/summary| SummaryAPI[Summary route]
    SummaryAPI -->|Anthropic SDK| Anthropic[(Anthropic API<br/>Claude Sonnet 4)]
    Anthropic -->|summary text| SummaryAPI
    SummaryAPI -->|null on failure| Form
    Form -.fallback.-> Fallback[generateFallbackSummary<br/>template]
    Form -->|user fills email| LeadForm[Lead capture form]
    LeadForm -->|POST /api/save-audit| SaveAPI[Save-audit route]
    SaveAPI -->|insert| Supabase[(Supabase<br/>audits table)]
    SaveAPI -->|resend.emails.send| Resend[(Resend API)]
    Resend -->|HTML email| Inbox[User's inbox]
    Supabase -->|UUID| SaveAPI
    SaveAPI -->|audit id| LeadForm
    LeadForm -->|shareable URL| User
    Visitor[Anyone with URL] -->|GET /audit/:id| AuditPage[Public audit page<br/>app/audit/[id]/page.js]
    AuditPage -->|select by id| Supabase
```

## Data flow

A user lands on `/audit-form`, picks one or more tools from a dropdown (ChatGPT, Claude, Cursor, etc), selects a plan for each, enters monthly spend, number of users, and primary use case. On submit, the audit engine runs **client-side and synchronously** — no network call. The engine has three checks per tool: overpayment vs official pricing, plan downgrade opportunities based on team size, and wrong-tool-for-use-case detection that suggests an alternative. The result includes per-tool breakdowns, total monthly and annual savings, an optimization score (100 minus 8 per issue, floored at 0), and an overlap warning if multiple tools share a use case.

Immediately after the engine runs, the frontend fires `POST /api/summary` with the audit result and tools list. The route calls the Anthropic API to generate a 100-word personalized summary. If the API call fails or the key is missing, the route returns `{ summary: null }` and the frontend falls back to a template summary that branches on savings thresholds.

When the user enters their email and submits the lead form, `POST /api/save-audit` writes the audit to Supabase, gets back a UUID, and (inline, same function) calls Resend to send a transactional email with the audit link. The UUID is returned to the frontend and used to build a shareable URL: `/audit/<uuid>`.

The shareable page is a server-rendered Next.js page that queries Supabase by ID and renders the saved audit. It includes Open Graph and Twitter card metadata so the URL previews cleanly when pasted into Slack, Twitter, or email.

## Stack choices

**Next.js 15 App Router.** Server components for the public audit page (no client JS overhead for a read-only view), client component for the form (needs state, localStorage, fetch). API routes for the three server-side actions. One deploy target.

**Supabase Postgres + RLS.** Free tier covers this scale. Single `audits` table with a UUID primary key. The anon key is exposed in the bundle, so RLS is the security boundary — anon role can `insert` but only `select` by `id`. No row enumeration, no list endpoint.

**Resend for email.** Simple SDK, generous free tier, good deliverability. Sandbox sender (`onboarding@resend.dev`) for development; would verify a domain before production.

**Anthropic API for summaries.** Sonnet 4 because Opus is overkill for a 100-word paragraph. The call is non-blocking — if Anthropic is down or my key is unfunded, the audit still works.

**Tailwind v4.** Default styling for speed. Tailwind v4 uses `oklch()` colors, which caused a real problem with html2canvas during the (now-removed) PDF feature.

**html2pdf.js (removed).** Tried it for client-side PDF generation. Pulled it after extensive debugging because html2canvas couldn't render the report HTML reliably — sometimes blank, sometimes partial. The shareable URL covers the same use case.

## What I'd change for 10k audits/day

10k audits/day is ~7 per minute on average and probably 30–50/min at peak. None of the per-audit work is heavy — the engine is sync JS, Supabase inserts are tiny, the Anthropic call is the only slow piece. Real bottlenecks would be:

**1. The Anthropic call on the critical path.** Currently the user waits for it (with fallback). At scale I'd move summary generation to a background job — return the audit immediately, persist `summary: null`, then a worker picks it up, calls Anthropic, and patches the row. The shareable page already handles `summary` being null gracefully. Saves user-perceived latency and lets me batch requests to Anthropic for cost.

**2. Anthropic cost and rate limits.** At 10k/day with ~500 input tokens and 150 output tokens per call on Sonnet, that's ~$0.10/audit, ~$1k/day on summaries alone. I'd cache by `(toolSummary signature, savings bucket)` — many audits will be structurally similar (one Cursor Pro user with no issues looks like every other one) and could share a summary. Easily cuts cost 5–10x.

**3. Supabase write throughput.** Single-table inserts are fine to several hundred per second on a free tier. Past that I'd add connection pooling via PgBouncer (Supabase has this built in) and split hot/cold data — recent audits in Postgres, older audits archived to S3 with a periodic sweep.

**4. Email throughput.** Resend handles this; not my problem until ~50k emails/day.

**5. Rate limiting and abuse.** Right now the form has no rate limiting — someone could script thousands of audits. I'd add IP-based rate limiting at the edge (Vercel middleware or Upstash) before this got real traffic. The honeypot field catches naive bots but won't stop anyone serious.

**6. Pricing data freshness.** The hardcoded pricing in `auditEngine.js` will go stale. At scale I'd move it to a CMS or a JSON file fetched at build time, with a weekly automated diff against vendor pricing pages. A wrong number in the engine = wrong savings for everyone until I fix it.

**7. Observability.** Console.log is fine for now. At 10k/day I'd want Sentry for errors, Vercel analytics or Posthog for funnel metrics (audit started → completed → lead captured → email opened → link clicked).