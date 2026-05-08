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
        useCase: "",
    });

    const [result, setResult] = useState(null);
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    // Load saved data
    useEffect(() => {
        const saved = localStorage.getItem("auditInput");

        if (saved) {
            setAuditInput(JSON.parse(saved));
        }
    }, []);

    // Save data
    useEffect(() => {
        localStorage.setItem(
            "auditInput",
            JSON.stringify(auditInput)
        );
    }, [auditInput]);

    function handleChange(e) {

        const { name, value } = e.target;

        if (name === "tool") {

            setAuditInput({
                ...auditInput,
                tool: value,
                plan: "",
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

    function handleReset() {

        setAuditInput({
            tool: "",
            plan: "",
            monthlySpend: "",
            users: "",
            useCase: "",
        });

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
                        className="flex flex-col gap-6"
                    >

                        {/* Tool */}
                        <div className="flex flex-col gap-2">

                            <label className="text-sm font-medium text-gray-300">
                                AI Tool
                            </label>

                            <select
                                name="tool"
                                value={auditInput.tool}
                                onChange={handleChange}
                                className="bg-black/40 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
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
                        <div className="flex flex-col gap-2">

                            <label className="text-sm font-medium text-gray-300">
                                Plan
                            </label>

                            <select
                                name="plan"
                                value={auditInput.plan}
                                onChange={handleChange}
                                className="bg-black/40 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all duration-300"
                            >

                                <option value="">Select a plan</option>

                                {auditInput.tool &&
                                    TOOL_PLANS[auditInput.tool]?.map((planOption) => (
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

                            <label className="text-sm font-medium text-gray-300">
                                Monthly Spend ($)
                            </label>

                            <input
                                type="number"
                                name="monthlySpend"
                                value={auditInput.monthlySpend}
                                onChange={handleChange}
                                placeholder="e.g. 200"
                                className="bg-black/40 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-gray-600 transition-all duration-300"
                            />

                        </div>

                        {/* Users */}
                        <div className="flex flex-col gap-2">

                            <label className="text-sm font-medium text-gray-300">
                                Number of Users
                            </label>

                            <input
                                type="number"
                                name="users"
                                value={auditInput.users}
                                onChange={handleChange}
                                placeholder="e.g. 5"
                                className="bg-black/40 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-emerald-500/40 placeholder-gray-600 transition-all duration-300"
                            />

                        </div>

                        {/* Use Case */}
                        <div className="flex flex-col gap-2">

                            <label className="text-sm font-medium text-gray-300">
                                Primary Use Case
                            </label>

                            <select
                                name="useCase"
                                value={auditInput.useCase}
                                onChange={handleChange}
                                className="bg-black/40 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
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
                            className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-emerald-500/20 mt-2"
                        >
                            Analyze My Spend
                        </button>

                    </form>

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

                                <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm">
                                    Analysis Complete
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






