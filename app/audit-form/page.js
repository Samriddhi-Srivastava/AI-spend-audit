"use client";

import { useState, useEffect } from "react";

export default function AuditForm() {

    const [auditInput, setAuditInput] = useState({
        tool: "",
        plan: "",
        monthlySpend: "",
        users: "",
        teamSize: "",
        useCase: "",
    });

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
        setAuditInput({
            ...auditInput,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!auditInput.tool || !auditInput.plan || !auditInput.monthlySpend) {
            alert("Please fill all required fields");
            return;
        }

        console.log("Form submitted:", auditInput);
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
                            <option value="copilot">GitHub Copilot</option>
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
                            <option value="plus">Plus</option>
                            <option value="team">Team</option>
                            <option value="enterprise">Enterprise</option>
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
            </div>

        </main>
    );
}
