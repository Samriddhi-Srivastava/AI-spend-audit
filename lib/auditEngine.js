const TOOL_PRICING = {

    chatgpt: {

        free: {
            price: 0,
            idealUsers: 1,
            bestFor: ["basic", "casual"],
            type: "free"
        },

        plus: {
            price: 20,
            idealUsers: 1,
            bestFor: ["writing", "research", "productivity"],
            type: "individual"
        },

        pro: {
            price: 200,
            idealUsers: 1,
            bestFor: ["coding", "heavy research", "power users"],
            type: "power"
        },

        business: {
            price: 30,
            idealUsers: 5,
            bestFor: ["team", "business", "collaboration"],
            type: "team"
        }
    },

    claude: {

        pro: {
            price: 20,
            idealUsers: 1,
            bestFor: ["writing", "research"],
            type: "individual"
        },

        max: {
            price: 100,
            idealUsers: 1,
            bestFor: ["heavy research", "claude code", "advanced workflows"],
            type: "power"
        },

        team: {
            price: 200,
            idealUsers: 5,
            bestFor: ["team", "business"],
            type: "team"
        }
    },

    gemini: {

        pro: {
            price: 20,
            idealUsers: 1,
            bestFor: ["research", "workspace", "productivity"],
            type: "individual"
        },

        ultra: {
            price: 250,
            idealUsers: 1,
            bestFor: ["advanced ai", "heavy workflows"],
            type: "power"
        }
    },

    copilot: {

        pro: {
            price: 10,
            idealUsers: 1,
            bestFor: ["coding", "development"],
            type: "developer"
        },

        business: {
            price: 30,
            idealUsers: 5,
            bestFor: ["team", "business", "enterprise development"],
            type: "team"
        }
    },

    cursor: {

        pro: {
            price: 20,
            idealUsers: 1,
            bestFor: ["coding", "development", "ai coding"],
            type: "developer"
        },

        proPlus: {
            price: 60,
            idealUsers: 1,
            bestFor: ["heavy coding", "advanced ai coding"],
            type: "power"
        }
    }

};

export function calculateAudit(input) {
    const { tool, plan, monthlySpend, users, useCase } = input;

    const usersNum = Number(users);
    const spendNum = Number(monthlySpend);

    let recommendation = "Your current plan looks reasonable";
    let savings = 0;
    let reason = "No major optimization found";
    let score = 100;
    let issues = [];
    let strengths = [];
    let suggestedPlan = plan;
    let suggestedTool = tool;

    const currentPlan = TOOL_PRICING[tool][plan];

    if (!currentPlan) {
        return {
            recommendation,
            savings,
            reason
        };
    }

    const planCost = currentPlan.price;

    // Rule 1: Overpaying
    if (planCost && usersNum) {
        const expectedCost = currentPlan.price * usersNum;

        if (spendNum > expectedCost) {

            savings = spendNum - expectedCost;

            recommendation =
                `You may be overpaying on ${plan}`;

            reason =
                `Expected cost for ${usersNum} users is around $${expectedCost}`;

            issues.push(
                `Potential overpayment detected on ${tool}`
            );

            score -= 20;
        }
    }

    // Rule 2: Plan mismatch
    if (
        currentPlan.type === "team" &&
        usersNum < currentPlan.idealUsers
    ) {
        recommendation = "Switch to individual plan";
        reason = "Team plans are inefficient for small teams";
    }

    if ((plan === "plus" || plan === "pro") && usersNum > 5) {
        recommendation = "Consider upgrading to a team plan";
        reason = "Individual plans don’t scale well";
    }

    // Rule 3: Use-case mismatch
    if (useCase === "coding" && tool === "chatgpt") {

        recommendation =
            "Switch to Cursor or Copilot";

        reason =
            "These tools are optimized for AI coding workflows";

        suggestedTool = "cursor";

        issues.push(
            "Current tool is not optimized for coding"
        );

        score -= 15;
    }

    if (useCase === "writing" && tool === "copilot") {

        recommendation =
            "Switch to ChatGPT or Claude";

        reason =
            "Copilot is primarily designed for developers";

        suggestedTool = "claude";

        issues.push(
            "Tool mismatch for writing workflows"
        );

        score -= 15;
    }

    if (useCase === "research" && tool === "copilot") {

        recommendation =
            "Consider ChatGPT or Gemini";

        reason =
            "Research workflows need stronger conversational AI models";

        suggestedTool = "gemini";

        issues.push(
            "Current tool lacks strong research capabilities"
        );

        score -= 15;
    }

    // Strength Detection

    if (
        useCase === "coding" &&
        (tool === "cursor" || tool === "copilot")
    ) {

        strengths.push(
            "Current tool is well optimized for development workflows"
        );
    }

    if (
        useCase === "writing" &&
        (tool === "chatgpt" || tool === "claude")
    ) {

        strengths.push(
            "Current setup fits writing and content workflows well"
        );
    }

    if (
        useCase === "research" &&
        (tool === "chatgpt" || tool === "gemini")
    ) {

        strengths.push(
            "Current setup supports research-oriented workflows effectively"
        );
    }

    if (score < 0) {
        score = 0;
    }

    return {
        recommendation,
        savings,
        reason,
        score,
        issues,
        strengths,
        suggestedPlan,
        suggestedTool
    };
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