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
                "Some subscriptions appear more expensive than expected";

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
                "Cursor may provide a better AI-assisted coding workflow"
            );

            recommendation =
                "Consider switching to Cursor for development workflows";

            reason =
                "Cursor is optimized specifically for engineering productivity and AI coding assistance";

            score -= 5;
        }

        // Coding + Research
        if (
            useCase === "coding" &&
            tool === "gemini"
        ) {

            suggestedTool = "copilot";

            issues.push(
                "Gemini may not be ideal for dedicated coding workflows"
            );

            recommendation =
                "Consider GitHub Copilot for coding assistance";

            reason =
                "Copilot integrates directly into developer environments and improves coding productivity";

            score -= 5;
        }

        // Writing Suggestions
        if (
            useCase === "writing" &&
            tool === "copilot"
        ) {

            suggestedTool = "chatgpt";

            issues.push(
                "Copilot is not optimized for writing workflows"
            );

            recommendation =
                "Switch to ChatGPT or Claude for writing tasks";

            reason =
                "ChatGPT and Claude provide stronger long-form content and writing assistance";

            score -= 5;
        }

        // Research Suggestions
        if (
            useCase === "research" &&
            tool === "copilot"
        ) {

            suggestedTool = "claude";

            issues.push(
                "Copilot is limited for deep research workflows"
            );

            recommendation =
                "Consider Claude or ChatGPT for research tasks";

            reason =
                "Research-focused AI tools provide better reasoning and information synthesis";

            score -= 5;
        }

        // Heavy Research on Basic Plans
        if (
            useCase === "research" &&
            plan === "free"
        ) {

            issues.push(
                "Free plans may limit advanced research capabilities"
            );

            recommendation =
                "Upgrade to a premium AI plan";

            reason =
                "Advanced research workflows benefit from larger context windows and premium model access";

            score -= 5;
        }

        // Business / Team Workflow Suggestions
        if (
            usersNum >= 5 &&
            currentPlan.type !== "team"
        ) {

            issues.push(
                "Current plan may not scale efficiently for larger teams"
            );

            recommendation =
                "Consider upgrading to a team-oriented plan";

            reason =
                "Team plans provide better collaboration and scalability for multi-user workflows";

            score -= 10;
        }

        // Underutilized Premium Plans
        if (
            plan === "pro" &&
            useCase === "writing" &&
            usersNum <= 1
        ) {

            suggestedPlan = "plus";

            issues.push(
                "Premium plan may be underutilized"
            );

            recommendation =
                "Downgrading to a lower plan could reduce costs";

            reason =
                "Current usage patterns may not require a high-tier subscription";

            score -= 10;
        }

        // Too Many AI Tools
        if (tools.length >= 4) {

            issues.push(
                "Large number of AI subscriptions detected"
            );

            recommendation =
                "Consider consolidating overlapping AI tools";

            reason =
                "Multiple subscriptions may create redundant spending and workflow overlaps";

            score -= 10;
        }

        // High Operational Spend
        if (totalSpend > 300) {

            issues.push(
                "High monthly AI operational spending detected"
            );

            recommendation =
                "Your AI spending is quite high, consider optimizing your subscriptions";

            reason =
                "Some tools or plans may overlap in functionality, increasing overall costs";

            score -= 10;
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