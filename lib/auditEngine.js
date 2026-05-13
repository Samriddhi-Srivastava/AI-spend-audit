const TOOL_PRICING = {

    chatgpt: {
        name: "ChatGPT",
        plans: {
            free: { price: 0, perUser: false, bestFor: ["casual", "writing", "research"] },
            plus: { price: 20, perUser: true, bestFor: ["writing", "research", "productivity"] },
            pro: { price: 200, perUser: true, bestFor: ["heavy research", "power users"] },
            business: { price: 30, perUser: true, bestFor: ["team", "coding", "collaboration"] },
        }
    },

    claude: {
        name: "Claude",
        plans: {
            pro: { price: 20, perUser: true, bestFor: ["writing", "research", "coding", "data"] },
            max: { price: 100, perUser: true, bestFor: ["heavy research", "coding", "advanced workflows"] },
            team: { price: 30, perUser: true, bestFor: ["team", "writing", "research", "coding"] },
        }
    },

    copilot: {
        name: "GitHub Copilot",
        plans: {
            pro: { price: 10, perUser: true, bestFor: ["coding", "development"] },
            business: { price: 19, perUser: true, bestFor: ["coding", "team", "development"] },
        }
    },

    gemini: {
        name: "Gemini",
        plans: {
            pro: { price: 20, perUser: true, bestFor: ["research", "productivity", "writing", "data"] },
            ultra: { price: 20, perUser: true, bestFor: ["research", "productivity", "writing"] },
        }
    },

    cursor: {
        name: "Cursor",
        plans: {
            pro: { price: 20, perUser: true, bestFor: ["coding", "development"] },
            proPlus: { price: 60, perUser: true, bestFor: ["heavy coding", "development"] },
        }
    },

    windsurf: {
        name: "Windsurf",
        plans: {
            pro: { price: 20, perUser: true, bestFor: ["coding", "development"] },
            proPlus: { price: 60, perUser: true, bestFor: ["heavy coding", "development"] },
        }
    },

    openaiapi: {
        name: "OpenAI API",
        plans: {
            payAsYouGo: { price: 0, perUser: false, bestFor: ["coding", "writing", "research", "data", "mixed"] },
        }
    },

    anthropicapi: {
        name: "Anthropic API",
        plans: {
            payAsYouGo: { price: 0, perUser: false, bestFor: ["coding", "writing", "research", "data", "mixed"] },
        }
    }

};

// ============================================================
// ALTERNATIVE TOOL SUGGESTIONS
// Logic: if your use case doesn't match your tool well,
// suggest a better fit with a reason and estimated saving
// ============================================================

const ALTERNATIVES = {

    // Coding use case
    coding: {
        chatgpt: { suggest: "Cursor", reason: "Cursor is purpose-built for AI-assisted coding with IDE integration. ChatGPT lacks direct editor support." },
        gemini: { suggest: "GitHub Copilot", reason: "GitHub Copilot integrates directly into VS Code and JetBrains. Gemini is not optimised for in-editor coding workflows." },
        claude: null,
        copilot: null,
        cursor: null,
        windsurf: null,
        openaiapi: null,
        anthropicapi: null,
    },

    // Writing use case
    writing: {
        copilot: { suggest: "Claude or ChatGPT", reason: "GitHub Copilot is built for code, not prose. Claude and ChatGPT consistently outperform it on long-form writing tasks." },
        cursor: { suggest: "Claude", reason: "Cursor is a coding IDE. Claude Pro ($20/mo) is far better suited for writing workflows." },
        windsurf: { suggest: "Claude", reason: "Windsurf is a coding IDE. Claude Pro ($20/mo) is far better suited for writing workflows." },
        chatgpt: null,
        claude: null,
        gemini: null,
        openaiapi: null,
        anthropicapi: null,
    },

    // Research use case
    research: {
        copilot: { suggest: "Claude or ChatGPT", reason: "GitHub Copilot has no web browsing or research capabilities. Claude and ChatGPT are significantly better for research tasks." },
        cursor: { suggest: "Claude", reason: "Cursor is a coding tool. Claude Pro ($20/mo) is better suited for research and analysis." },
        windsurf: { suggest: "Claude", reason: "Windsurf is a coding tool. Claude Pro ($20/mo) is better suited for research and analysis." },
        chatgpt: null,
        claude: null,
        gemini: null,
        openaiapi: null,
        anthropicapi: null,
    },

    // Data use case
    data: {
        copilot: { suggest: "Claude or ChatGPT", reason: "GitHub Copilot is not optimised for data analysis. Claude and ChatGPT provide better reasoning for data work." },
        cursor: { suggest: "Claude", reason: "Cursor is a coding IDE. Claude Pro ($20/mo) is better suited for data analysis and insight generation." },
        windsurf: { suggest: "Claude", reason: "Windsurf is a coding IDE. Claude Pro ($20/mo) is better suited for data analysis and insight generation." },
        chatgpt: null,
        claude: null,
        gemini: null,
        openaiapi: null,
        anthropicapi: null,
    }
};

// ============================================================
// PLAN DOWNGRADE SUGGESTIONS
// Logic: if you're on a power plan with few users and
// a light use case, a cheaper plan does the same job
// ============================================================

const DOWNGRADES = {

    chatgpt: {
        pro: {
            condition: (users, useCase) =>
                users <= 2 && ["writing", "research"].includes(useCase),
            suggest: "ChatGPT Plus",
            suggestPrice: 20,
            reason: "ChatGPT Pro ($200/mo) is for power users needing maximum compute. For writing or research with 1–2 users, ChatGPT Plus ($20/mo) provides the same core value at 90% less cost."
        }
    },

    claude: {
        max: {
            condition: (users, useCase) =>
                users <= 2 && useCase !== "coding",
            suggest: "Claude Pro",
            suggestPrice: 20,
            reason: "Claude Max ($100/mo) is designed for heavy Claude Code usage and extended context needs. For most writing and research workflows, Claude Pro ($20/mo) is sufficient."
        },
        team: {
            condition: (users) => users <= 2,
            suggest: "Claude Pro",
            suggestPrice: 20,
            reason: "Claude Team ($30/user/mo) is designed for 5+ person teams with admin controls. For 1–2 users, Claude Pro ($20/user/mo) gives the same model access at lower cost."
        }
    },

    gemini: {
        ultra: {
            condition: (users, useCase) => users <= 2,
            suggest: "Gemini Pro",
            suggestPrice: 20,
            reason: "Gemini Ultra and Pro are currently the same price ($20/mo). Ensure you are actually using Ultra-tier features — if not, Pro gives identical value."
        }
    },

    cursor: {
        proPlus: {
            condition: (users) => users <= 3,
            suggest: "Cursor Pro",
            suggestPrice: 20,
            reason: "Cursor Pro+ ($60/mo) is designed for teams doing very heavy AI-assisted coding with high request limits. For 1–3 users, Cursor Pro ($20/mo) covers standard coding workflows at one third of the cost."
        }
    },

    windsurf: {
        proPlus: {
            condition: (users) => users <= 3,
            suggest: "Windsurf Pro",
            suggestPrice: 20,
            reason: "Windsurf Pro+ ($60/mo) is designed for teams doing very heavy AI-assisted coding with high request limits. For 1–3 users, Windsurf Pro ($20/mo) covers standard coding workflows at one third of the cost."
        }
    }
};

// ============================================================
// PER-TOOL AUDIT
// Returns a breakdown object for each tool the user entered
// ============================================================

function auditSingleTool(toolData) {

    const { tool, plan, monthlySpend, users, useCase } = toolData;

    const toolInfo = TOOL_PRICING[tool];
    const planInfo = toolInfo?.plans?.[plan];

    if (!toolInfo || !planInfo) return null;

    const spend = Number(monthlySpend) || 0;
    const numUsers = Number(users) || 1;

    // Expected cost based on official pricing
    const expectedCost = planInfo.perUser
        ? planInfo.price * numUsers
        : planInfo.price;

    const issues = [];
    const strengths = [];
    let saving = 0;
    let action = "keep";   // "keep" | "downgrade" | "switch"
    let recommendation = "";
    let reason = "";
    let isOptimized = false;  // flag for "spending well" state

    // ── 1. Overpayment vs official price ──────────────────────
    if (spend > expectedCost) {
        const overpay = spend - expectedCost;
        saving += overpay;
        issues.push(
            `You are paying $${spend}/mo but the ${toolInfo.name} ${plan} plan costs $${expectedCost}/mo for ${numUsers} user(s). You are overpaying by $${overpay}/mo — check your seat count or billing plan.`
        );
    }

    // ── 2. Plan downgrade opportunity ─────────────────────────
    const downgrade = DOWNGRADES[tool]?.[plan];
    if (downgrade && downgrade.condition(numUsers, useCase)) {
        const downgradeSaving = (planInfo.price - downgrade.suggestPrice) * numUsers;
        if (downgradeSaving > 0) {
            saving += downgradeSaving;
            action = "downgrade";
            recommendation = `Downgrade to ${downgrade.suggest}`;
            reason = downgrade.reason;
            issues.push(reason);
        }
    }

    // ── 3. Wrong tool for use case ────────────────────────────
    const alt = ALTERNATIVES[useCase]?.[tool];
    if (alt) {
        action = "switch";
        recommendation = `Switch to ${alt.suggest}`;
        reason = alt.reason;
        issues.push(reason);
    }

    // ── 4. Team plan overkill ─────────────────────────────────
    if (plan === "business" || plan === "team") {
        if (numUsers < 3) {
            issues.push(
                `${toolInfo.name} ${plan} plan is designed for larger teams. With only ${numUsers} user(s), you are paying for team features you likely don't need.`
            );
        }
    }

    // ── 5. Positive signals ───────────────────────────────────
    if (planInfo.bestFor.includes(useCase)) {
        strengths.push(`${toolInfo.name} is a strong fit for ${useCase} workflows.`);
    }

    // ── 6. Determine if optimized ─────────────────────────────
    if (issues.length === 0 && strengths.length > 0) {
        recommendation = "Well optimised";
        reason = `${toolInfo.name} ${plan} is a good match for your use case and team size.`;
        isOptimized = true;
    }

    if (issues.length === 0 && strengths.length === 0) {
        recommendation = "No major issues found";
        reason = `${toolInfo.name} ${plan} appears appropriately priced for ${numUsers} user(s).`;
        isOptimized = true;
    }

    return {
        tool,
        toolName: toolInfo.name,
        plan,
        currentSpend: spend,
        expectedCost,
        saving: Math.max(0, saving),
        action,
        recommendation,
        reason,
        issues,
        strengths,
        isOptimized,  // NEW: flag for "spending well" state
    };
}

// ============================================================
// MAIN EXPORT — calculateAudit
// Runs auditSingleTool for each tool and returns full summary
// ============================================================

export function calculateAudit(tools) {

    // Run per-tool audit
    const toolResults = tools
        .map(auditSingleTool)
        .filter(Boolean);  // remove any null results

    const totalSpend = toolResults.reduce((sum, t) => sum + t.currentSpend, 0);
    const totalSavings = toolResults.reduce((sum, t) => sum + t.saving, 0);
    const annualSavings = totalSavings * 12;

    // Score: start at 100, deduct for each tool with issues
    let score = 100;
    toolResults.forEach(t => {
        score -= t.issues.length * 8;
    });
    score = Math.max(0, Math.min(100, score));

    const savingsPercentage = totalSpend > 0
        ? ((totalSavings / totalSpend) * 100).toFixed(1)
        : 0;

    // Check for duplicate use cases across tools (overlap warning)
    const useCases = tools.map(t => t.useCase).filter(Boolean);
    const duplicates = useCases.filter(
        (item, index) => useCases.indexOf(item) !== index
    );
    const overlapWarning = duplicates.length > 0
        ? `You have multiple tools selected for the same use case (${[...new Set(duplicates)].join(", ")}). Consider consolidating to avoid paying for overlapping capabilities.`
        : null;

    // NEW: Determine if user is "spending well"
    const isSpendingWell = totalSavings < 100;

    return {
        toolResults,       // array — one object per tool
        totalSpend,
        totalSavings,
        annualSavings,
        savingsPercentage,
        score,
        overlapWarning,
        toolsAnalyzed: toolResults.length,
        isSpendingWell,    // NEW: true if savings < $100/mo
    };
}

// ============================================================
// FALLBACK SUMMARY — used if Anthropic API call fails
// ============================================================

export function generateFallbackSummary(result, tools) {

    const { totalSpend, totalSavings, annualSavings, score, toolResults, isSpendingWell } = result;

    if (totalSavings > 500) {
        return `Your team is spending $${totalSpend}/mo across ${tools.length} AI tool(s) and has significant optimisation potential. Our audit identified $${totalSavings}/mo ($${annualSavings}/yr) in possible savings through plan downgrades and better tool-to-workflow matching. We recommend reviewing your highest-spend tools first.`;
    }

    if (totalSavings > 100) {
        return `Your AI stack costs $${totalSpend}/mo and has moderate optimisation opportunities. By adjusting plans or switching tools better suited to your workflows, you could save approximately $${totalSavings}/mo ($${annualSavings}/yr) without losing capability.`;
    }

    if (isSpendingWell && score >= 85) {
        return `Your AI stack ($${totalSpend}/mo across ${tools.length} tool(s)) is well optimised. The tools you have selected align with your use cases and team size. You're spending efficiently — no major changes are recommended at this time.`;
    }

    if (isSpendingWell) {
        return `Your AI setup costs $${totalSpend}/mo and is well-balanced. No significant optimisation opportunities detected. You're spending wisely on your current stack.`;
    }

    return `Your AI setup costs $${totalSpend}/mo and is reasonably balanced. Minor optimisations are possible — review the per-tool breakdown above for specific recommendations.`;
}