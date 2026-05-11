import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function generateMetadata({ params }) {
    const { id } = await params;

    const { data } = await supabase
        .from("audits")
        .select("result, summary")
        .eq("id", id)
        .single();

    if (!data) {
        return { title: "Audit Not Found" };
    }

    const savings = data.result?.totalSavings || 0;
    const annual = data.result?.annualSavings || 0;

    return {
        title: `AI Spend Audit — $${savings}/mo savings found`,
        description: `This AI stack audit identified $${savings}/mo ($${annual}/yr) in potential savings. See the full breakdown.`,
        openGraph: {
            title: `AI Spend Audit — $${savings}/mo savings found`,
            description: `This AI stack audit identified $${savings}/mo ($${annual}/yr) in potential savings.`,
            url: `https://ai-spend-analyser.vercel.app/audit/${id}`,
            siteName: "AI Spend Auditor",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `AI Spend Audit — $${savings}/mo savings found`,
            description: `This AI stack audit identified $${savings}/mo ($${annual}/yr) in potential savings.`,
        },
    };
}


export default async function SharedAuditPage({ params }) {
    const { id } = await params;  // await params

    const { data, error } = await supabase
        .from("audits")
        .select("result, summary, tools, created_at")
        .eq("id", id)
        .single();

    if (error || !data) {
        return (
            <main className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Audit Not Found</h1>
                    <p className="text-gray-400 mb-6">
                        This audit link may be invalid or expired.
                    </p>
                    <a
                        href="/audit-form"
                        className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-3 rounded-xl transition-all"
                    >
                        Run Your Own Audit
                    </a>
                </div>
            </main >
        );
    }

    const { result, summary, tools } = data;

    return (
        <main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white px-6 py-16">

            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-block px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 text-sm mb-4">
                        Shared Audit Report
                    </div>
                    <h1 className="text-4xl font-black mb-3">
                        AI Spend Audit
                    </h1>
                    <p className="text-gray-400 text-sm">
                        {tools.length} tool(s) analyzed ·{" "}
                        {new Date(data.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>

                {/* Hero Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                    <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-5">
                        <p className="text-gray-400 text-sm mb-2">Total Spend</p>
                        <h3 className="text-2xl font-black text-white">
                            ${result.totalSpend}
                            <span className="text-gray-500 text-xs font-normal">/mo</span>
                        </h3>
                    </div>

                    <div className="bg-gray-900/70 border border-emerald-500/20 rounded-2xl p-5">
                        <p className="text-gray-400 text-sm mb-2">Monthly Savings</p>
                        <h3 className="text-2xl font-black text-emerald-400">
                            ${result.totalSavings}
                            <span className="text-emerald-600 text-xs font-normal">/mo</span>
                        </h3>
                        <p className="text-emerald-600 text-xs mt-1">
                            ${result.annualSavings}/yr
                        </p>
                    </div>

                    <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-5">
                        <p className="text-gray-400 text-sm mb-2">Tools</p>
                        <h3 className="text-2xl font-black text-white">
                            {result.toolsAnalyzed}
                        </h3>
                    </div>

                    <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-5">
                        <p className="text-gray-400 text-sm mb-2">Score</p>
                        <h3 className={`text-2xl font-black ${result.score >= 80 ? "text-emerald-400"
                            : result.score >= 50 ? "text-yellow-400"
                                : "text-red-400"
                            }`}>
                            {result.score}/100
                        </h3>
                    </div>

                </div>

                {/* Credex CTA */}
                {result.totalSavings > 500 && (
                    <div className="mb-8 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div>
                                <h4 className="text-emerald-400 font-bold text-lg mb-1">
                                    You could save ${result.annualSavings}/yr
                                </h4>
                                <p className="text-gray-400 text-sm">
                                    Credex offers discounted AI credits sourced from companies
                                    that overforecast. Real discounts, same tools.
                                </p>
                            </div>
                            <a
                                href="https://credex.rocks"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm whitespace-nowrap"
                            >
                                Book a Credex Consultation →
                            </a>
                        </div>
                    </div>
                )}

                {/* Per-tool Breakdown */}
                <div className="space-y-4 mb-8">
                    <h3 className="text-xl font-bold text-white">Per-tool Breakdown</h3>

                    {result.toolResults.map((toolResult, index) => (
                        <div
                            key={index}
                            className="bg-gray-900/70 border border-gray-800 rounded-2xl p-5"
                        >
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

                            <div className="mb-3">
                                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Recommendation</p>
                                <p className="text-white font-semibold">{toolResult.recommendation}</p>
                            </div>

                            <div className="mb-3">
                                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Reason</p>
                                <p className="text-gray-300 text-sm leading-relaxed">{toolResult.reason}</p>
                            </div>

                            {toolResult.issues.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {toolResult.issues.map((issue, i) => (
                                        <div key={i} className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2 text-sm text-red-300">
                                            ⚠ {issue}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {toolResult.strengths.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {toolResult.strengths.map((strength, i) => (
                                        <div key={i} className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2 text-sm text-emerald-300">
                                            ✓ {strength}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {result.overlapWarning && (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl px-5 py-4 text-yellow-300 text-sm">
                            ⚠ {result.overlapWarning}
                        </div>
                    )}
                </div>

                {/* AI Summary */}
                {summary && (
                    <div className="mb-8 bg-gray-900/70 border border-gray-800 rounded-3xl p-6">
                        <h3 className="text-xl font-semibold mb-3 text-emerald-400">AI Summary</h3>
                        <p className="text-gray-300 leading-relaxed">{summary}</p>
                    </div>
                )}

                {/* Run your own */}
                <div className="text-center">
                    <a
                        href="/audit-form"
                        className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200 inline-block"
                    >
                        Run Your Own Free Audit →
                    </a>
                    <p className="text-gray-500 text-xs mt-3">
                        Free · No login required · Instant results
                    </p>
                </div>

            </div>
        </main>
    );
}