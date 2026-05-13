import { describe, it, expect } from "vitest";
import { calculateAudit } from "../lib/auditEngine.js";

describe("auditEngine — plan downgrade rules", () => {
    it("suggests Claude Pro when 1 user is on Claude Max for non-coding", () => {
        const result = calculateAudit([
            { tool: "claude", plan: "max", monthlySpend: "100", users: "1", useCase: "writing" }
        ]);

        const claude = result.toolResults[0];
        expect(claude.action).toBe("downgrade");
        expect(claude.recommendation.toLowerCase()).toContain("pro");
        expect(claude.saving).toBeGreaterThan(0);
    });

    it("does NOT suggest downgrade when team is large enough", () => {
        const result = calculateAudit([
            { tool: "claude", plan: "max", monthlySpend: "500", users: "5", useCase: "writing" }
        ]);

        const claude = result.toolResults[0];
        expect(claude.action).not.toBe("downgrade");
    });

    it("does NOT downgrade Claude Max when use case is coding", () => {
        const result = calculateAudit([
            { tool: "claude", plan: "max", monthlySpend: "100", users: "1", useCase: "coding" }
        ]);

        const claude = result.toolResults[0];
        expect(claude.action).not.toBe("downgrade");
    });
});
