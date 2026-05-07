const PRICING = {
    chatgpt: { plus: 20, pro: 150, team: 25 },
    claude: { pro: 20, max: 150, team: 28 },
    copilot: { pro: 15, business: 30 },
    gemini: { pro: 20, ultra: 250 },
    cursor: { pro: 20, proPlus: 60 }
};

export function calculateAudit(input) {
    const { tool, plan, monthlySpend, users, useCase } = input;

    const usersNum = Number(users);
    const spendNum = Number(monthlySpend);

    let recommendation = "Your current plan looks reasonable";
    let savings = 0;
    let reason = "No major optimization found";

    const toolPricing = PRICING[tool];

    if (!toolPricing) {
        return { recommendation, savings, reason };
    }

    const planCost = toolPricing[plan];

    // Rule 1: Overpaying
    if (planCost && usersNum) {
        const expectedCost = planCost * usersNum;

        if (spendNum > expectedCost) {
            savings = spendNum - expectedCost;
            recommendation = `You may be overpaying on ${plan}`;
            reason = `Expected cost for ${usersNum} users is around $${expectedCost}`;
        }
    }

    // Rule 2: Plan mismatch
    if (plan === "team" && usersNum < 3) {
        recommendation = "Switch to individual plan";
        reason = "Team plans are inefficient for small teams";
    }

    if ((plan === "plus" || plan === "pro") && usersNum > 5) {
        recommendation = "Consider upgrading to a team plan";
        reason = "Individual plans don’t scale well";
    }

    // Rule 3: Use-case mismatch
    if (useCase === "coding" && tool === "chatgpt") {
        recommendation = "Consider Cursor or Copilot";
        reason = "Better suited for coding workflows";
    }

    if (useCase === "writing" && tool === "copilot") {
        recommendation = "Switch to ChatGPT or Claude";
        reason = "Copilot is not optimized for writing";
    }

    if (useCase === "research" && tool === "copilot") {
        recommendation = "Consider ChatGPT or Gemini";
        reason = "Better for research tasks";
    }

    return { recommendation, savings, reason };
}

export function generateSummary(result, input) {
    const { tool, useCase, users } = input;

    if (result.savings > 0) {
        return `Your current ${tool} setup may be costing more than necessary. Based on your team size and usage pattern, you could potentially save around $${result.savings} per month by switching to a more suitable plan.`;
    }

    if (useCase === "coding") {
        return `Your workflow is development-focused, so you may benefit from tools optimized specifically for coding productivity and engineering workflows.`;
    }

    if (useCase === "writing") {
        return `Your current setup appears suitable for writing and content-related workflows, although there may still be opportunities for cost optimization depending on usage intensity.`;
    }

    return `Your current AI subscription setup appears reasonably aligned with your usage and team structure.`;
}