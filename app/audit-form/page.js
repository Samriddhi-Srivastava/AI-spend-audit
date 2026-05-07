"use client";

import { useState, useEffect } from "react";
import { calculateAudit, generateSummary } from "../../lib/auditEngine";

export default function AuditForm() {

    const TOOL_PLANS = {
        chatgpt: ["plus", "pro", "team"],
        claude: ["pro", "max", "team"],
        copilot: ["pro", "business"],
        gemini: ["pro", "ultra"],
        cursor: ["pro", "proPlus"]
    };

    const [auditInput, setAuditInput] = useState({
        tool: "",
        plan: "",
        monthlySpend: "",
        users: "",
        teamSize: "",
        useCase: "",
    });

    const [result, setResult] = useState(null);
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    // Load saved data on page load
    useEffect(() => {
        const saved = localStorage.getItem("auditInput");
        if (saved) {
            setAuditInput(JSON.parse(saved));
        }
    }, []);

    // Save data whenever input changes
    useEffect(() => {
        localStorage.setItem("auditInput", JSON.stringify(auditInput));
    }, [auditInput]);

    function handleChange(e) {
        const { name, value } = e.target;

        if (name === "tool") {
            setAuditInput({
                ...auditInput,
                tool: value,
                plan: "" // reset plan when tool changes
            });
        } else {
            setAuditInput({
                ...auditInput,
                [name]: value,
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (
            !auditInput.tool ||
            !auditInput.plan ||
            !auditInput.monthlySpend
        ) {
            alert("Please fill all required fields");
            return;
        }

        setLoading(true);

        setTimeout(() => {

            const auditResult = calculateAudit(auditInput);

            setResult(auditResult);

            const generatedSummary = generateSummary(
                auditResult,
                auditInput
            );

            setSummary(generatedSummary);

            setLoading(false);

        }, 1500);
    }




    return (
        <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold text-white mb-2">Audit your AI spend</h2>
                <p className="text-gray-400 text-sm mb-6">Fill in the details below to get your free audit.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Tool */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">AI Tool</label>
                        <select
                            name="tool"
                            value={auditInput.tool}
                            onChange={handleChange}
                            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="">Select a tool</option>
                            <option value="chatgpt">ChatGPT</option>
                            <option value="claude">Claude</option>
                            <option value="copilot">Copilot</option>
                            <option value="gemini">Gemini</option>
                            <option value="cursor">Cursor</option>
                        </select>
                    </div>

                    {/* Plan */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">Plan</label>
                        <select
                            name="plan"
                            value={auditInput.plan}
                            onChange={handleChange}
                            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="">Select a plan</option>

                            {auditInput.tool &&
                                TOOL_PLANS[auditInput.tool]?.map((planOption) => (
                                    <option key={planOption} value={planOption}>
                                        {planOption.replace(/([A-Z])/g, " $1")}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Monthly Spend */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">Monthly spend ($)</label>
                        <input
                            type="number"
                            name="monthlySpend"
                            value={auditInput.monthlySpend}
                            onChange={handleChange}
                            placeholder="e.g. 200"
                            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-600"
                        />
                    </div>

                    {/* Number of Users */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">Number of users</label>
                        <input
                            type="number"
                            name="users"
                            value={auditInput.users}
                            onChange={handleChange}
                            placeholder="e.g. 5"
                            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-600"
                        />
                    </div>

                    {/* Team Size */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">Team size</label>
                        <input
                            type="number"
                            name="teamSize"
                            value={auditInput.teamSize}
                            onChange={handleChange}
                            placeholder="e.g. 10"
                            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-600"
                        />
                    </div>

                    {/* Use Case */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">Primary use case</label>
                        <select
                            name="useCase"
                            value={auditInput.useCase}
                            onChange={handleChange}
                            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="">Select a use case</option>
                            <option value="coding">Coding</option>
                            <option value="writing">Writing</option>
                            <option value="research">Research</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-3 rounded-xl transition-colors duration-200 mt-2"
                    >
                        Analyze My Spend
                    </button>

                </form>
                {loading && (
                    <div className="mt-6 bg-gray-900 border border-emerald-500/20 rounded-2xl p-6 text-center">

                        <div className="animate-pulse">
                            <p className="text-emerald-400 text-lg font-semibold">
                                Analyzing your AI spending...
                            </p>

                            <p className="text-gray-400 text-sm mt-2">
                                Evaluating pricing, usage patterns, and optimization opportunities
                            </p>
                        </div>

                    </div>
                )}
                {result && (
                    <div className="mt-8 bg-gray-900 border border-emerald-500/20 rounded-2xl p-6 text-white shadow-xl">

                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-emerald-400">
                                Audit Result
                            </h3>

                            <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm">
                                Analysis Complete
                            </span>
                        </div>

                        <div className="space-y-5">

                            <div>
                                <p className="text-gray-400 text-sm mb-1">
                                    Recommendation
                                </p>

                                <p className="text-lg font-semibold">
                                    {result.recommendation}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-400 text-sm mb-1">
                                    Estimated Savings
                                </p>

                                <p className="text-3xl font-bold text-emerald-400">
                                    ${result.savings}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-400 text-sm mb-1">
                                    Reason
                                </p>

                                <p className="text-gray-200 leading-relaxed">
                                    {result.reason}
                                </p>
                            </div>

                        </div>
                    </div>
                )}
                {summary && (
                    <div className="mt-6 bg-gray-900 border border-gray-800 rounded-2xl p-6 text-white">

                        <h3 className="text-xl font-semibold mb-3 text-emerald-400">
                            AI Summary
                        </h3>

                        <p className="text-gray-300 leading-relaxed">
                            {summary}
                        </p>

                    </div>
                )}
            </div>

        </main>
    );
}
