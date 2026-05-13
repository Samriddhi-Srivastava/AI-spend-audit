import { describe, it, expect } from "vitest";
import { calculateAudit } from "../lib/auditEngine.js";

describe("auditEngine — aggregate totals", () => {
    it("sums totalSpend across all tools", () => {
        const result = calculateAudit([
            { tool: "claude", plan: "pro", monthlySpend: "20", users: "1", useCase: "writing" },
            { tool: "cursor", plan: "pro", monthlySpend: "20", users: "1", useCase: "coding" }
        ]);

        expect(result.totalSpend).toBe(40);
    });

    it("computes annualSavings as totalSavings * 12", () => {
        const result = calculateAudit([
            { tool: "cursor", plan: "pro", monthlySpend: "40", users: "1", useCase: "coding" }
        ]);

        expect(result.annualSavings).toBe(result.totalSavings * 12);
    });

    it("reports toolsAnalyzed equal to valid tools count", () => {
        const result = calculateAudit([
            { tool: "claude", plan: "pro", monthlySpend: "20", users: "1", useCase: "writing" },
            { tool: "cursor", plan: "pro", monthlySpend: "20", users: "1", useCase: "coding" },
            { tool: "copilot", plan: "pro", monthlySpend: "10", users: "1", useCase: "coding" }
        ]);

        expect(result.toolsAnalyzed).toBe(3);
    });

    it("score is between 0 and 100 inclusive even with many issues", () => {
        const result = calculateAudit([
            { tool: "copilot", plan: "business", monthlySpend: "200", users: "1", useCase: "writing" }
        ]);

        expect(result.score).toBeGreaterThanOrEqual(0);
        expect(result.score).toBeLessThanOrEqual(100);
    });
});
