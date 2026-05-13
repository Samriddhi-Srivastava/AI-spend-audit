import { describe, it, expect } from "vitest";
import { calculateAudit } from "../lib/auditEngine.js";

describe("auditEngine — wrong-tool-for-use-case detection", () => {
    it("suggests an alternative when GitHub Copilot is used for writing", () => {
        const result = calculateAudit([
            { tool: "copilot", plan: "pro", monthlySpend: "10", users: "1", useCase: "writing" }
        ]);

        const copilot = result.toolResults[0];
        expect(copilot.action).toBe("switch");
        expect(copilot.recommendation.toLowerCase()).toContain("switch");
        expect(copilot.issues.length).toBeGreaterThan(0);
    });

    it("does NOT flag Cursor used for coding", () => {
        const result = calculateAudit([
            { tool: "cursor", plan: "pro", monthlySpend: "20", users: "1", useCase: "coding" }
        ]);

        const cursor = result.toolResults[0];
        expect(cursor.action).not.toBe("switch");
        expect(cursor.strengths.length).toBeGreaterThan(0);
    });

    it("does NOT flag Claude used for research", () => {
        const result = calculateAudit([
            { tool: "claude", plan: "pro", monthlySpend: "20", users: "1", useCase: "research" }
        ]);

        const claude = result.toolResults[0];
        expect(claude.action).not.toBe("switch");
    });
});