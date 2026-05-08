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

    // Load saved data
    useEffect(() => {
        const saved = localStorage.getItem("tools");

        if (saved) {
            setTools(JSON.parse(saved));
        }
    }, []);

    // Save data
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

    function handleSubmit(e) {

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

        setTimeout(() => {

            const auditResult = calculateAudit(tools);

            setResult(auditResult);

            const generatedSummary = generateSummary(
                auditResult,
                tools
            );

            setSummary(generatedSummary);

            setLoading(false);

        }, 1500);
    }

    function handleReset() {

        setTools([
            {
                tool: "",
                plan: "",
                monthlySpend: "",
                users: "",
                useCase: "",
            }
        ]);

        setResult(null);
        setSummary("");
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

                    {/* Result */}
                    {result && (

                        <div className="mt-8 bg-gray-900/70 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-6 text-white shadow-xl animate-in fade-in duration-500">

                            <div className="flex items-center justify-between mb-6">

                                <h3 className="text-2xl font-bold text-emerald-400">
                                    Audit Result
                                </h3>

                                <span className={`px-3 py-1 rounded-full text-sm ${result.savings > 0
                                        ? "bg-red-500/10 text-red-400"
                                        : "bg-emerald-500/10 text-emerald-400"
                                    }`}>
                                    {result.savings > 0
                                        ? "Optimization Found"
                                        : "Well Optimized"}
                                </span>

                            </div>

                            <div className="space-y-6">

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

                                    <p className="text-4xl font-black text-emerald-400">
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

                    {/* Summary */}
                    {summary && (

                        <div className="mt-6 bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 text-white animate-in fade-in duration-500">

                            <h3 className="text-xl font-semibold mb-3 text-emerald-400">
                                AI Summary
                            </h3>

                            <p className="text-gray-300 leading-relaxed">
                                {summary}
                            </p>

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

        </main>
    );
}
