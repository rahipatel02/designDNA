export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">DesignDNA</h1>

        <button className="px-4 py-2 bg-white text-black rounded-lg">
          Login
        </button>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-6">
        <h1 className="text-7xl font-bold max-w-5xl">
          AI That Understands Why Designs Work
        </h1>

        <p className="text-gray-400 mt-6 text-xl max-w-2xl">
          Upload posters, logos and social media creatives.
          Get intelligent design analysis and AI suggestions.
        </p>

        <button className="mt-8 px-6 py-3 bg-white text-black rounded-xl font-semibold">
          Upload Design
        </button>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-10 pb-20">

        <div className="border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-3">
            🎨 Design Analysis
          </h2>

          <p className="text-gray-400">
            Analyze color harmony, contrast, balance and layout quality.
          </p>
        </div>

        <div className="border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-3">
            🤖 AI Feedback
          </h2>

          <p className="text-gray-400">
            Get professional suggestions powered by AI.
          </p>
        </div>

        <div className="border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-3">
            📊 Design Score
          </h2>

          <p className="text-gray-400">
            Receive a score based on design quality metrics.
          </p>
        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 text-center py-6 text-gray-500">
        DesignDNA © 2026
      </footer>

    </main>
  );
}