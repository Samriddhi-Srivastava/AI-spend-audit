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

export function calculateAudit(tools) {
    let totalSpend = 0;
    let totalSavings = 0;
    let score = 100;

    let issues = [];
    let strengths = [];

    let recommendation = "Your AI stack looks reasonably optimized";
    let reason = "No major inefficiencies detected";

    let suggestedTool = null;


    tools.forEach((toolData) => {

        const {
            tool,
            plan,
            monthlySpend,
            users,
            useCase
        } = toolData;

        const currentPlan =
            TOOL_PRICING[tool]?.[plan];

        if (!currentPlan) return;

        const spendNum = Number(monthlySpend);
        const usersNum = Number(users) || 1;

        totalSpend += spendNum;

        const expectedCost =
            currentPlan.price * usersNum;

        // Overpayment Detection
        if (spendNum > expectedCost) {

            const extraCost =
                spendNum - expectedCost;

            totalSavings += extraCost;

            issues.push(
                `${tool} may be over budget by $${extraCost}`
            );

            recommendation =
                "Reduce unnecessary AI spending";

            reason =
                "Some subscriptions appear more expensive than expected.";

            score -= 15;
        }

        // Team Plan Inefficiency
        if (
            currentPlan.type === "team" &&
            usersNum < currentPlan.idealUsers
        ) {

            issues.push(
                `${tool} team plan may be unnecessary for small teams`
            );

            score -= 10;
        }

        // Coding Suggestions
        if (
            useCase === "coding" &&
            tool === "chatgpt"
        ) {

            suggestedTool = "cursor";

            issues.push(
                "Cursor may be more efficient for coding workflows"
            );

            score -= 5;
        }

        // Writing Suggestions
        if (
            useCase === "writing" &&
            tool === "copilot"
        ) {

            suggestedTool = "chatgpt";

            issues.push(
                "Copilot is not ideal for writing tasks"
            );

            score -= 5;
        }

        // Positive Signal
        if (
            currentPlan.bestFor.includes(useCase)
        ) {

            strengths.push(
                `${tool} is well suited for ${useCase}`
            );
        }

    });

    const useCases = tools.map(
        (tool) => tool.useCase
    );

    const duplicateUseCases =
        useCases.filter(
            (item, index) =>
                useCases.indexOf(item) !== index
        );

    if (duplicateUseCases.length > 0) {

        issues.push(
            "Multiple AI tools are being used for similar workflows"
        );

        recommendation =
            "Consider consolidating overlapping AI subscriptions";

        reason =
            "Some tools may provide duplicate value.";

        score -= 10;
    }

    if (score < 0) {
        score = 0;
    }

    const savingsPercentage =
        totalSpend > 0
            ? ((totalSavings / totalSpend) * 100).toFixed(1)
            : 0;

    return {

        recommendation,
        savings: totalSavings,
        savingsPercentage,
        reason,
        score,

        issues,
        strengths,

        totalSpend,
        toolsAnalyzed: tools.length,

        suggestedTool

    };
}

export function generateSummary(result, tools) {

    const toolNames = tools.map(
        (tool) => tool.tool
    );

    const uniqueTools = [...new Set(toolNames)];

    if (result.savings > 100) {

        return `Your AI stack appears significantly over-budget. Multiple subscriptions may be overlapping in functionality, and optimizing your current setup could reduce unnecessary monthly costs while maintaining productivity.`;
    }

    if (result.savings > 0) {

        return `Your AI stack has moderate optimization opportunities. Some tools or plans may not align efficiently with your workflows, team size, or actual usage patterns.`;
    }

    if (result.score >= 85) {

        return `Your current AI subscription stack appears highly optimized. The selected tools align well with your workflows and overall spending efficiency.`;
    }

    if (uniqueTools.length >= 3) {

        return `Your workflow relies on multiple AI platforms, which provides flexibility but may also introduce overlapping capabilities and additional costs.`;
    }

    return `Your AI setup appears reasonably balanced, with no major inefficiencies detected across your selected subscriptions.`;
}