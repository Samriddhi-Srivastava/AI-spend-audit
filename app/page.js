
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-400/10 blur-3xl rounded-full" />

      {/* Navbar */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

        <h1 className="text-2xl font-bold tracking-wide">
          AI <span className="text-emerald-400">Spend Auditor</span>
        </h1>

        <Link
          href="/audit-form"
          className="border border-emerald-500/30 hover:bg-emerald-500/10 transition-all duration-300 px-5 py-2 rounded-full text-sm"
        >
          Launch App
        </Link>

      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-28 text-center">

        <div className="inline-block px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-300 text-sm mb-8 animate-pulse">
          AI-powered subscription optimization
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight max-w-5xl mx-auto">
          Stop Overpaying
          <br />
          For <span className="text-emerald-400">AI Tools</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
          Analyze your AI subscriptions, detect unnecessary spending,
          and receive intelligent recommendations tailored to your
          workflow, team size, and productivity needs
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">

          <Link
            href="/audit-form"
            className="bg-emerald-500 hover:bg-emerald-400 transition-all duration-300 hover:scale-105 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-emerald-500/20"
          >
            Start Free Audit
          </Link>

          <a
            href="#features"
            className="border border-gray-700 hover:border-emerald-500/40 hover:bg-gray-900 transition-all duration-300 px-8 py-4 rounded-2xl text-gray-300"
          >
            View Features
          </a>

        </div>

      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 text-center hover:border-emerald-500/30 hover:scale-105 transition-all duration-300">
            <h3 className="text-3xl font-bold text-emerald-400">5+</h3>
            <p className="text-gray-400 mt-2 text-sm">AI Platforms</p>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 text-center hover:border-emerald-500/30 hover:scale-105 transition-all duration-300">
            <h3 className="text-3xl font-bold text-emerald-400">$200+</h3>
            <p className="text-gray-400 mt-2 text-sm">Potential Savings</p>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 text-center hover:border-emerald-500/30 hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-emerald-400">Personalized</h3>
            <p className="text-gray-400 mt-3 text-sm">AI Recommendations</p>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 text-center hover:border-emerald-500/30 hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-emerald-400">Usage-Based</h3>
            <p className="text-gray-400 mt-3 text-sm">Cost Analysis</p>
          </div>

        </div>

      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-28 scroll-mt-32">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Why Use AI Spend Auditor?
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Built to help individuals and teams optimize AI tool usage
            intelligently instead of relying on guesswork
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="group bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 hover:border-emerald-500/30 hover:-translate-y-2 transition-all duration-500 shadow-xl">

            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              💸
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-emerald-400">
              Cost Optimization
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Detect overpaying subscriptions, identify unnecessary plans,
              and optimize pricing based on your actual usage
            </p>

          </div>

          <div className="group bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 hover:border-emerald-500/30 hover:-translate-y-2 transition-all duration-500 shadow-xl">

            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              🤖
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-emerald-400">
              AI-Powered Insights
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Receive intelligent recommendations tailored to coding,
              writing, research, and productivity workflows
            </p>

          </div>

          <div className="group bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 hover:border-emerald-500/30 hover:-translate-y-2 transition-all duration-500 shadow-xl">

            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              ⚡
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-emerald-400">
              Multi-Platform Support
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Compare plans across ChatGPT, Claude, Gemini, Copilot,
              and Cursor from one centralized dashboard
            </p>

          </div>

        </div>

      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-28">

        <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-3xl p-12 text-center backdrop-blur-xl">

          <h2 className="text-4xl font-bold mb-6">
            Ready to optimize your AI spending?
          </h2>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Start analyzing your subscriptions and discover smarter,
            more cost-efficient AI workflows today
          </p>

          <Link
            href="/audit-form"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 transition-all duration-300 hover:scale-105 px-10 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-emerald-500/20"
          >
            Launch Audit Tool
          </Link>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        Built with Next.js, React and Tailwind CSS
      </footer>

    </main>
  );
}
