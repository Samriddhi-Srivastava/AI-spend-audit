# Unit economics

If a partner like Credex deployed this tool tomorrow, here's the rough math on whether it makes money. Numbers are estimates and I'll show where each came from. Treat them as a model, not a forecast.

## What's a converted lead worth

A "converted lead" = someone who completes the audit, gives an email, books a Credex consultation, and ends up purchasing AI credits through Credex. Credex's revenue model (per its public positioning) is sourcing discounted AI credits from companies that overforecast and reselling them. Assume Credex margin is around 15–25% on the credit value — they buy credits at a discount and sell them at a smaller discount to the customer.

If the average converted customer purchases $5,000 of AI credits over their first year through Credex (a 25-person company spending $200/mo on a Claude-Cursor stack would be in this range), Credex's gross profit is roughly 20% × $5,000 = **$1,000 per converted customer**. Lifetime value is higher if they renew — probably $2,000–$3,000 LTV over 18–24 months, but I'll use $1,000 for Year 1 conservatism.

## CAC by channel

Channels from GTM.md, with rough cost-per-converted-customer estimates:

**X public posts and Indie Hackers writeups:** Direct cost = $0. Time cost = ~4 hours per post, post lifetime ~30 days of trickle traffic. If a post produces 30 visitors, 12 audits, 4 emails, and 1 converts to credit purchase, blended CAC (assuming my hourly rate at $50) is $200 in time per converted customer. Channel scales poorly — I can't write 100 viral posts a month.

**Targeted DMs on X:** Direct cost = $0. Time cost = ~3 minutes per DM. 50 DMs → 10 audits → 4 emails → 1 conversion. CAC = 50 × 3min × $50/hr = $125. Limited by my ability to find relevant founders.

**Comparison blog posts (SEO):** Direct cost = $0 once published. Time cost = ~6 hours per post amortized over the next 12 months. After 3 months of indexing, a good post brings 50–200 organic visitors/month. CAC over 12 months drops to ~$30 per converted customer. **Best long-term channel.**

**Reddit and Slack community replies:** $0 direct, ~1 hour per high-quality reply, maybe 1 conversion per 3 replies. CAC ~$150. Doesn't scale but builds reputation.

**Credex newsletter cross-promotion:** $0 marginal cost. If Credex has a 2,000-person list with 25% open rate and 5% of openers run the audit (25 audits), 30% capture email (8 emails), 25% convert (2 conversions). CAC = $0 plus whatever Credex internally values the email slot at. By far the lowest CAC channel.

Blended CAC across the mix probably lands at **$80–$120 per converted customer** in steady state. Above $200 means the model is broken; below $50 means SEO is doing more work than expected.

## Conversion rates that make this work

The funnel is roughly:

```
Audit completed → Email captured → Consultation booked → Credit purchased
```

For the tool to be profitable for Credex at $1,000 gross profit per conversion, blended CAC needs to stay under $1,000 with room for Credex's own costs (consultation time, account management, fulfillment). Reasonable target: blended customer acquisition cost ≤ $400.

For that to hold:
- Email capture rate from completed audits: ~30% (industry standard for tools that show value before asking)
- Consultation booked from emails captured: ~10% — emails are warm but Credex still has to follow up
- Credit purchased from consultation booked: ~25% — typical for B2B mid-funnel close rates

Multiplying: every 100 completed audits → 30 emails → 3 consultations → 0.75 customers. So one converted customer per 130 completed audits. At $1,000 gross profit per customer, the tool produces about $7.70 of GP per completed audit. As long as the all-in cost per completed audit (compute, my time, Credex's time) stays under that, it works.

## What would have to be true for $1M ARR in 18 months

$1M ARR = ~1,000 paying credit customers (using the $1,000 GP figure as a proxy — the actual revenue would be ~$5M at 20% margin, but ARR usually means gross revenue, so I'll model 1,000 customers as the unit).

Working backwards:
- 1,000 customers in 18 months = ~55/month average
- At 0.75 customers per 100 completed audits, that's ~7,300 completed audits/month, ~244/day
- At 50% audit completion rate (people who land vs. people who finish), that's ~500 landings/day, ~15k/month
- At a 5% click-through from any given distribution touchpoint, that's 300k impressions/month across all channels combined

300k impressions/month is the bar. Roughly: 100k from organic SEO, 100k from Credex's owned channels (newsletter, blog, customer base), 100k from earned distribution (X, Reddit, comparison-tool listicles, podcast mentions).

**What would have to be true:**

1. The pricing data stays correct as vendors change plans. One stale month and the audits look amateurish.
2. Credex's distribution actually fires. Without the warm Credex audience the CAC math breaks.
3. The conversion rates above hold. The riskiest one is consultation-booked → credit-purchased at 25%. If it's actually 10%, the model needs ~3x the audits to hit the same ARR.
4. The product gets at least 2 high-signal upgrades during the 18 months — additional tools added to the audit, year-over-year pricing trend reports, multi-tool overlap detection refined. Without those, returning users drop and the funnel stays one-shot.

**Single biggest risk:** AI pricing keeps changing fast enough that the audit looks wrong to people who know the current pricing better than I do. That kills credibility instantly. The mitigation is automating the pricing-update check rather than doing it by hand.
