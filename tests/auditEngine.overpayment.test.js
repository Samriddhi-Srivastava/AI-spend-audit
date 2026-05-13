import { describe, it, expect } from "vitest";
import { calculateAudit } from "../lib/auditEngine.js";

describe("auditEngine — overpayment detection", () => {
    it("flags overpayment when actual spend exceeds plan price for the user count", () => {
        const result = calculateAudit([
            { tool: "cursor", plan: "pro", monthlySpend: "40", users: "1", useCase: "coding" }
        ]);

        const cursor = result.toolResults[0];
        expect(cursor.currentSpend).toBe(40);
        expect(cursor.expectedCost).toBe(20);
        expect(cursor.saving).toBeGreaterThanOrEqual(20);
        expect(cursor.issues.some(i => i.toLowerCase().includes("overpay"))).toBe(true);
    });

    it("does not flag overpayment when actual matches expected", () => {
        const result = calculateAudit([
            { tool: "cursor", plan: "pro", monthlySpend: "20", users: "1", useCase: "coding" }
        ]);

        const cursor = result.toolResults[0];
        const overpayIssues = cursor.issues.filter(i => i.toLowerCase().includes("overpay"));
        expect(overpayIssues.length).toBe(0);
    });
});