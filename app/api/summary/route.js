import Anthropic from "@anthropic-ai/sdk";

const client = process.env.ANTHROPIC_API_KEY
    ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    : null;

export async function POST(request) {

    try {

        const { auditResult, tools } = await request.json();

        // If no API key, return empty — frontend will use fallback
        if (!client) {
            console.log("⚠️  No Anthropic API key — using fallback summary");
            return Response.json({ summary: null });
        }

        const toolSummary = auditResult.toolResults
            .map(t =>
                `${t.toolName} (${t.plan}): $${t.currentSpend}/mo — ${t.recommendation}. ${t.reason}`
            )
            .join("\n");

        const prompt = `You are an AI spend analyst. A user has audited their AI tool subscriptions. Write a concise, personalized 100-word summary of their audit results. Be specific, practical, and direct. Do not use bullet points.

Here is their audit data:
- Total monthly spend: $${auditResult.totalSpend}
- Potential monthly savings: $${auditResult.totalSavings}
- Potential annual savings: $${auditResult.annualSavings}
- Optimization score: ${auditResult.score}/100
- Tools analyzed: ${auditResult.toolsAnalyzed}

Per-tool breakdown:
${toolSummary}

Write the summary now:`;

        const message = await client.messages.create({
            model: "claude-sonnet-4-20250514",
            max_tokens: 200,
            messages: [
                {
                    role: "user",
                    content: prompt,
                }
            ],
        });

        const summary = message.content[0].text;
        return Response.json({ summary });

    } catch (error) {

        console.error("❌ Anthropic API error:", error.message);
        // Return null so frontend uses fallback — don't fail the whole request
        return Response.json({ summary: null });

    }
}