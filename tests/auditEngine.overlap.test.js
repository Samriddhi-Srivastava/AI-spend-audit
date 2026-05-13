import { describe, it, expect } from "vitest";
import { calculateAudit } from "../lib/auditEngine.js";

describe("auditEngine — overlap warning", () => {
    it("warns when two tools share the same use case", () => {
        const result = calculateAudit([
            { tool: "cursor", plan: "pro", monthlySpend: "20", users: "1", useCase: "coding" },
            { tool: "copilot", plan: "pro", monthlySpend: "10", users: "1", useCase: "coding" }
        ]);

        expect(result.overlapWarning).not.toBeNull();
        expect(result.overlapWarning.toLowerCase()).toContain("coding");
    });

    it("does not warn when use cases are all distinct", () => {
        const result = calculateAudit([
            { tool: "claude", plan: "pro", monthlySpend: "20", users: "1", useCase: "writing" },
            { tool: "cursor", plan: "pro", monthlySpend: "20", users: "1", useCase: "coding" },
            { tool: "gemini", plan: "pro", monthlySpend: "20", users: "1", useCase: "research" }
        ]);

        expect(result.overlapWarning).toBeNull();
    });
});