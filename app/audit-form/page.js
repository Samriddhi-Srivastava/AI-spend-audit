"use client";

import { useState, useEffect } from "react";
import { calculateAudit, generateFallbackSummary } from "../../lib/auditEngine";

export default function AuditForm() {

    const TOOL_PLANS = {
        chatgpt: ["free", "plus", "pro", "business"],
        claude: ["pro", "max", "team"],
        copilot: ["pro", "business"],
        gemini: ["pro", "ultra"],
        cursor: ["pro", "proPlus"]
    };

    const TOOL_DETAILS = {
        chatgpt: {
            name: "ChatGPT",
            color: "from-green-400 to-emerald-600",
            short: "CG"
        },

        claude: {
            name: "Claude",
            color: "from-orange-400 to-amber-600",
            short: "CL"
        },

        copilot: {
            name: "Copilot",
            color: "from-blue-400 to-cyan-600",
            short: "CP"
        },

        gemini: {
            name: "Gemini",
            color: "from-purple-400 to-pink-600",
            short: "GM"
        },

        cursor: {
            name: "Cursor",
            color: "from-gray-300 to-gray-500",
            short: "CS"
        }
    };

    const [tools, setTools] = useState([
        {
            tool: "",
            plan: "",
            monthlySpend: "",
            users: "",
            useCase: "",
        }
    ]);

    const [result, setResult] = useState(null);
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [auditId, setAuditId] = useState(null);
    const [leadSubmitted, setLeadSubmitted] = useState(false);
    const [leadData, setLeadData] = useState({
        email: "",
        companyName: "",
        role: "",
    });

    useEffect(() => {

        const saved =
            localStorage.getItem("tools");

        if (saved) {

            const parsedData =
                JSON.parse(saved);

            if (Array.isArray(parsedData)) {

                setTools(parsedData);

            } else {

                localStorage.removeItem("tools");

            }
        }

    }, []);

    useEffect(() => {

        localStorage.setItem(
            "tools",
            JSON.stringify(tools)
        );

    }, [tools]);


    function handleChange(index, e) {

        const { name, value } = e.target;

        const updatedTools = [...tools];

        if (name === "tool") {

            updatedTools[index] = {
                ...updatedTools[index],
                tool: value,
                plan: "",
            };

        } else {

            updatedTools[index] = {
                ...updatedTools[index],
                [name]: value,
            };

        }

        setTools(updatedTools);
    }

    function addTool() {

        setTools([
            ...tools,
            {
                tool: "",
                plan: "",
                monthlySpend: "",
                users: "",
                useCase: "",
            }
        ]);
    }

    function removeTool(index) {

        const updatedTools = tools.filter(
            (_, i) => i !== index
        );

        setTools(updatedTools);
    }

    async function handleSubmit(e) {

        e.preventDefault();

        const hasEmptyFields = tools.some(
            (tool) =>
                !tool.tool ||
                !tool.plan ||
                !tool.monthlySpend
        );

        if (hasEmptyFields) {
            alert("Please fill all required fields");
            return;
        }

        setLoading(true);

        // Step 1: Run the audit engine (instant, no API needed)
        const auditResult = calculateAudit(tools);
        setResult(auditResult);

        // Step 2: Try Anthropic API for AI summary
        // Falls back to template if API fails
        try {

            const response = await fetch("/api/summary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    auditResult,
                    tools,
                }),
            });

            const data = await response.json();

            if (data.summary) {
                setSummary(data.summary);
            } else {
                setSummary(generateFallbackSummary(auditResult, tools));
            }

        } catch (error) {

            // API failed — use the fallback template summary
            console.error("Summary API failed:", error);
            setSummary(generateFallbackSummary(auditResult, tools));

        } finally {

            setLoading(false);

        }
    }
    function handleReset() {
        setTools([{
            tool: "",
            plan: "",
            monthlySpend: "",
            users: "",
            useCase: "",
        }]);
        setResult(null);
        setSummary("");
        setAuditId(null);
        setLeadSubmitted(false);
        setLeadData({ email: "", companyName: "", role: "" });
    }

    async function handleLeadSubmit(e) {

        e.preventDefault();

        if (!leadData.email) {
            alert("Please enter your email");
            return;
        }

        try {

            const response = await fetch("/api/save-audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tools,
                    result,
                    summary,
                    email: leadData.email,
                    companyName: leadData.companyName,
                    role: leadData.role,
                }),
            });

            const data = await response.json();

            if (data.id) {
                setAuditId(data.id);
                setLeadSubmitted(true);
            }

        } catch (error) {
            console.error("Lead submit error:", error);
            alert("Something went wrong. Please try again.");
        }
    }


    return (

        <main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white overflow-hidden relative">

            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-400/20 blur-3xl rounded-full" />

            <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">

                {/* Heading */}
                <div className="text-center mb-14">

                    <div className="inline-block px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 text-sm mb-6 animate-pulse">
                        AI Spend Optimization
                    </div>

                    <h1 className="text-5xl font-black mb-6">
                        Audit Your
                        <span className="text-emerald-400"> AI Spending</span>
                    </h1>

                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Analyze subscriptions, detect unnecessary costs,
                        and receive personalized AI recommendations.
                    </p>

                </div>

                {/* Form Card */}
                <div className="max-w-2xl mx-auto bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">

                    <h2 className="text-2xl font-bold text-white mb-2">
                        Audit your AI spend
                    </h2>

                    <p className="text-gray-400 text-sm mb-8">
                        Fill in the details below to get your free audit.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-8"
                    >

                        {tools.map((toolData, index) => (

                            <div
                                key={index}
                                className="border border-gray-800 rounded-2xl p-6 bg-black/20"
                            >

                                <div className="flex items-center justify-between mb-6">

                                    <h3 className="text-lg font-semibold text-emerald-400">
                                        Tool #{index + 1}
                                    </h3>

                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeTool(index)}
                                            className="text-red-400 text-sm hover:text-red-300"
                                        >
                                            Remove
                                        </button>
                                    )}

                                </div>

                                <div className="grid md:grid-cols-2 gap-5">

                                    {/* Tool */}
                                    <div className="flex flex-col gap-2">

                                        <label className="text-sm text-gray-300">
                                            AI Tool
                                        </label>

                                        <select
                                            name="tool"
                                            value={toolData.tool}
                                            onChange={(e) => handleChange(index, e)}
                                            className="bg-black/40 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        >

                                            <option value="">Select a tool</option>
                                            <option value="chatgpt">ChatGPT</option>
                                            <option value="claude">Claude</option>
                                            <option value="copilot">Copilot</option>
                                            <option value="gemini">Gemini</option>
                                            <option value="cursor">Cursor</option>

                                        </select>

                                    </div>


                                    {/* Tool Preview Card */}
                                    {toolData.tool && (
                                        <div className="bg-black/30 border border-gray-800 rounded-2xl p-4 flex items-center gap-4 animate-in fade-in duration-300">

                                            <div
                                                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${TOOL_DETAILS[toolData.tool].color} flex items-center justify-center text-black font-bold text-lg shadow-lg`}
                                            >
                                                {TOOL_DETAILS[toolData.tool].short}
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    {TOOL_DETAILS[toolData.tool].name}
                                                </h3>

                                                <p className="text-gray-400 text-sm">
                                                    AI platform selected for audit
                                                </p>
                                            </div>

                                        </div>
                                    )}

                                    {/* Plan */}
                                    <div className="flex flex-col gap-2">

                                        <label className="text-sm text-gray-300">
                                            Plan
                                        </label>

                                        <select
                                            name="plan"
                                            value={toolData.plan}
                                            onChange={(e) => handleChange(index, e)}
                                            className="bg-black/40 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        >

                                            <option value="">Select a plan</option>

                                            {toolData.tool &&
                                                TOOL_PLANS[toolData.tool]?.map((planOption) => (
                                                    <option
                                                        key={planOption}
                                                        value={planOption}
                                                    >
                                                        {planOption.replace(/([A-Z])/g, " $1")}
                                                    </option>
                                                ))}

                                        </select>

                                    </div>

                                    {/* Monthly Spend */}
                                    <div className="flex flex-col gap-2">

                                        <label className="text-sm text-gray-300">
                                            Monthly Spend ($)
                                        </label>

                                        <input
                                            type="number"
                                            name="monthlySpend"
                                            value={toolData.monthlySpend}
                                            onChange={(e) => handleChange(index, e)}
                                            placeholder="e.g. 20"
                                            className="bg-black/40 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />

                                    </div>

                                    {/* Users */}
                                    <div className="flex flex-col gap-2">

                                        <label className="text-sm text-gray-300">
                                            Number of Users
                                        </label>

                                        <input
                                            type="number"
                                            name="users"
                                            value={toolData.users}
                                            onChange={(e) => handleChange(index, e)}
                                            placeholder="e.g. 5"
                                            className="bg-black/40 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />

                                    </div>

                                    {/* Use Case */}
                                    <div className="flex flex-col gap-2">

                                        <label className="text-sm text-gray-300">
                                            Primary Use Case
                                        </label>

                                        <select
                                            name="useCase"
                                            value={toolData.useCase}
                                            onChange={(e) => handleChange(index, e)}
                                            className="bg-black/40 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        >

                                            <option value="">Select use case</option>
                                            <option value="coding">Coding</option>
                                            <option value="writing">Writing</option>
                                            <option value="research">Research</option>

                                        </select>

                                    </div>

                                </div>

                            </div>

                        ))}

                        <button
                            type="button"
                            onClick={addTool}
                            className="border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 py-3 rounded-2xl transition-all duration-300"
                        >
                            + Add Another Tool
                        </button>

                        <button
                            type="submit"
                            className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                        >
                            Analyze Complete AI Stack
                        </button>

                    </form>

                    {!result && !loading && (

                        <div className="mt-8 border border-dashed border-gray-700 rounded-3xl p-10 text-center bg-black/20">

                            <h3 className="text-xl font-semibold text-gray-300 mb-2">
                                Your audit results will appear here
                                <div className="mt-4 flex justify-center gap-2 flex-wrap">

                                    <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                                        Cost Analysis
                                    </span>

                                    <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                                        Optimization Insights
                                    </span>

                                    <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                                        AI Recommendations
                                    </span>

                                </div>
                            </h3>

                            <p className="text-gray-500 text-sm">
                                Add your AI tools and analyze your spending to get optimization insights
                            </p>

                        </div>

                    )}

                    {/* Loading */}
                    {loading && (

                        <div className="mt-8 bg-gray-900/70 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 text-center animate-in fade-in duration-500">

                            <div className="flex flex-col items-center gap-4">

                                <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin"></div>

                                <div>

                                    <p className="text-emerald-400 text-lg font-semibold">
                                        Analyzing your AI spending...
                                    </p>

                                    <p className="text-gray-400 text-sm mt-2">
                                        Evaluating pricing, usage patterns,
                                        and optimization opportunities
                                    </p>

                                </div>

                            </div>

                        </div>

                    )}

                    {/* Hero Stats */}
                    {result && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-6">

                            <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-5">
                                <p className="text-gray-400 text-sm mb-2">Total Spend</p>
                                <h3 className="text-3xl font-black text-white">
                                    ${result.totalSpend}
                                    <span className="text-gray-500 text-sm font-normal">/mo</span>
                                </h3>
                            </div>

                            <div className="bg-gray-900/70 border border-emerald-500/20 rounded-2xl p-5">
                                <p className="text-gray-400 text-sm mb-2">Monthly Savings</p>
                                <h3 className="text-3xl font-black text-emerald-400">
                                    ${result.totalSavings}
                                    <span className="text-emerald-600 text-sm font-normal">/mo</span>
                                </h3>
                                <p className="text-emerald-600 text-xs mt-1">
                                    ${result.annualSavings}/yr
                                </p>
                            </div>

                            <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-5">
                                <p className="text-gray-400 text-sm mb-2">Tools Analyzed</p>
                                <h3 className="text-3xl font-black text-white">
                                    {result.toolsAnalyzed}
                                </h3>
                            </div>

                            <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-5">
                                <p className="text-gray-400 text-sm mb-2">Optimization Score</p>
                                <h3 className={`text-3xl font-black ${result.score >= 80 ? "text-emerald-400"
                                    : result.score >= 50 ? "text-yellow-400"
                                        : "text-red-400"
                                    }`}>
                                    {result.score}/100
                                </h3>
                            </div>

                        </div>
                    )}

                    {/* Credex CTA — only shows if savings > $500/mo */}
                    {result && result.totalSavings > 500 && (
                        <div className="mt-4 mb-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div>
                                    <h4 className="text-emerald-400 font-bold text-lg mb-1">
                                        You could save ${result.annualSavings}/yr
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        Credex offers discounted AI credits for tools like the ones you use —
                                        sourced from companies that overforecast. Real discounts, same tools.
                                    </p>
                                </div>
                                <a
                                    href="https://credex.rocks"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm whitespace-nowrap"
                                >
                                    Book a Credex Consultation →
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Per-tool Breakdown */}
                    {result && (
                        <div className="mt-2 space-y-4">

                            <h3 className="text-xl font-bold text-white">
                                Per-tool Breakdown
                            </h3>

                            {result.toolResults.map((toolResult, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-900/70 border border-gray-800 rounded-2xl p-5"
                                >

                                    {/* Tool header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="text-lg font-bold text-white">
                                                {toolResult.toolName}
                                                <span className="text-gray-500 text-sm font-normal ml-2 capitalize">
                                                    {toolResult.plan} plan
                                                </span>
                                            </h4>
                                            <p className="text-gray-500 text-xs mt-0.5">
                                                Current spend: ${toolResult.currentSpend}/mo
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${toolResult.saving > 0
                                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                            }`}>
                                            {toolResult.saving > 0
                                                ? `Save $${toolResult.saving}/mo`
                                                : "✓ Optimised"}
                                        </span>
                                    </div>

                                    {/* Recommendation */}
                                    <div className="mb-3">
                                        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                                            Recommendation
                                        </p>
                                        <p className="text-white font-semibold">
                                            {toolResult.recommendation}
                                        </p>
                                    </div>

                                    {/* Reason */}
                                    <div className="mb-3">
                                        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                                            Reason
                                        </p>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {toolResult.reason}
                                        </p>
                                    </div>

                                    {/* Issues */}
                                    {toolResult.issues.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {toolResult.issues.map((issue, i) => (
                                                <div
                                                    key={i}
                                                    className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2 text-sm text-red-300"
                                                >
                                                    ⚠ {issue}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Strengths */}
                                    {toolResult.strengths.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {toolResult.strengths.map((strength, i) => (
                                                <div
                                                    key={i}
                                                    className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2 text-sm text-emerald-300"
                                                >
                                                    ✓ {strength}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                </div>
                            ))}

                            {/* Overlap warning */}
                            {result.overlapWarning && (
                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl px-5 py-4 text-yellow-300 text-sm">
                                    ⚠ {result.overlapWarning}
                                </div>
                            )}

                        </div>
                    )}

                    {/* AI Summary */}
                    {summary && (
                        <div className="mt-6 bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 text-white animate-in fade-in duration-500">
                            <h3 className="text-xl font-semibold mb-3 text-emerald-400">
                                AI Summary
                            </h3>
                            <div className="bg-black/20 border border-gray-800 rounded-2xl p-5">
                                <p className="text-gray-300 leading-relaxed">
                                    {summary}
                                </p>
                            </div>
                        </div>
                    )}

                    {result && !leadSubmitted && (
                        <div className="mt-6 bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 text-white">

                            <h3 className="text-xl font-semibold mb-1 text-white">
                                Get your full report
                            </h3>
                            <p className="text-gray-400 text-sm mb-6">
                                Enter your email to save this audit and get a shareable link.
                                {result.totalSavings > 500 && " We'll also have a Credex advisor reach out about your savings opportunity."}
                            </p>

                            <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-400">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={leadData.email}
                                        onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                                        placeholder="you@company.com"
                                        className="bg-black/40 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-600"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm text-gray-400">Company (optional)</label>
                                        <input
                                            type="text"
                                            value={leadData.companyName}
                                            onChange={(e) => setLeadData({ ...leadData, companyName: e.target.value })}
                                            placeholder="Acme Inc."
                                            className="bg-black/40 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-600"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm text-gray-400">Role (optional)</label>
                                        <input
                                            type="text"
                                            value={leadData.role}
                                            onChange={(e) => setLeadData({ ...leadData, role: e.target.value })}
                                            placeholder="CTO, Founder..."
                                            className="bg-black/40 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-600"
                                        />
                                    </div>

                                </div>

                                <button
                                    type="submit"
                                    className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-3 rounded-xl transition-all duration-200"
                                >
                                    Save & Get Shareable Link →
                                </button>

                                <p className="text-gray-600 text-xs text-center">
                                    No spam. Your data is never sold.
                                </p>

                            </form>

                        </div>
                    )}

                    {/* Shareable link — shown after email is submitted */}
                    {result && leadSubmitted && auditId && (
                        <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-6 text-white">

                            <h3 className="text-xl font-semibold mb-1 text-emerald-400">
                                ✓ Your audit is saved
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">
                                Share this link with your team or bookmark it for later.
                            </p>

                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    readOnly
                                    value={`${window.location.origin}/audit/${auditId}`}
                                    className="flex-1 bg-black/40 text-gray-300 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none"
                                />
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            `${window.location.origin}/audit/${auditId}`
                                        );
                                        alert("Link copied!");
                                    }}
                                    className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm whitespace-nowrap"
                                >
                                    Copy Link
                                </button>
                            </div>

                        </div>
                    )}

                    {/* Reset */}
                    {result && (
                        <button
                            onClick={handleReset}
                            className="mt-6 w-full border border-gray-700 text-gray-300 hover:bg-gray-800 transition-all duration-300 py-4 rounded-2xl"
                        >
                            Start New Audit
                        </button>
                    )}

                </div>

            </section>

        </main >
    );
}
