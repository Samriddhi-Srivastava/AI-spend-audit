# Metrics

## North Star: completed audits with email captured per week

For a lead-gen tool that someone uses once a quarter (maybe twice in a year if they re-audit after restructuring), DAU is meaningless. WAU is a vanity metric that conflates re-visits and new visits. The thing that actually matters is: **how many qualified leads did the tool produce this week.** A completed audit with a captured email is exactly that. It means the user filled in real numbers (otherwise the audit is junk), saw their savings, and was confident enough to give us a contact channel. Anything before that step is curiosity; anything after is funnel mechanics.

Why not "savings dollars surfaced"? Because the audit engine can produce a $5,000 saving for someone who never finishes the form and never gives us their email — that's not a metric, that's wishful thinking. The act of email capture is the hard threshold.

Why not "consultation booked" or "credit purchase"? Those are downstream of distribution partners and not fully under the tool's control. Audits-with-emails is the leading indicator the tool itself owns end-to-end.

## Three input metrics

**1. Audit start rate.** Sessions where the user picks at least one tool from the dropdown, divided by total sessions on the landing page. This catches the bounce-from-headline problem early. If start rate is below 25%, the headline or above-the-fold copy is failing.

**2. Audit completion rate.** Audits where all required fields are filled and "Analyze" is clicked, divided by audit starts. If this is below 60% the form is too long, the fields are confusing, or the value isn't obvious before the user has to invest effort. Right now the form is single-page so I expect this to be high.

**3. Email capture rate after results.** Completed audits where the user submits the lead form, divided by completed audits. The current copy frames it as "get a shareable link" rather than "give us your email" — leading with the asset the user wants. If this is below 30% the copy isn't earning the email; if it's above 60% I'm probably under-asking and could collect more (company size, ARR, etc).

The product is **start rate × completion rate × email capture rate**, and that product is what gets multiplied by traffic to produce North Star. Each input is independently fixable.

## What I'd instrument first

PostHog or Plausible for funnel events: `landing_view`, `tool_added`, `audit_completed`, `result_viewed`, `lead_form_seen`, `lead_submitted`, `share_link_copied`, `email_opened`, `email_link_clicked`. Each event tagged with anonymous session id so I can reconstruct funnels. No PII in event payloads — email lives in Supabase, not in analytics.

Resend webhooks for email opened / clicked, so I can measure the captured-to-engaged drop-off separately from captured-to-clicked. If 80% of captured emails never open, the subject line is broken or the email is going to spam.

Supabase row count over time as a sanity check. If PostHog says 50 audits completed today but Supabase has 12 new rows, something is silently failing on the save step. Two data sources catch bugs that one doesn't.

## Pivot trigger

If after 8 weeks of distribution effort (described in GTM.md), weekly captured emails are below 30/week with non-trivial savings shown, the product isn't pulling enough on its own and I'd consider whether the underlying audit is too narrow (only 8 tools), the savings are real but the audience doesn't care, or the lead-gen-for-Credex angle is the wrong wedge. 30/week is roughly the threshold where the tool starts being self-sustaining for word-of-mouth — below that and every new user came from active outbound, which doesn't compound.