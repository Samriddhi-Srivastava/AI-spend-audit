export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">

      <div className="text-center max-w-xxl">

        <h1 className="text-5xl font-bold text-white mb-5">
          Audit your AI Spend Instantly
        </h1>

        <p className="text-lg text-gray-400 mb-8">
          Find out if you're overpaying for AI tools like Cursor, ChatGPT, and Claude instantly.
          Get a free, quick breakdown of your spendings and check where you can save
        </p>

        <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-lg px-8 py-3 rounded-xl transition-colors duration-200">
          Start Audit
        </button>

      </div>

    </main>
  );
}
