import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="flex flex-col items-center justify-center text-center py-32 px-6">

        <h1 className="text-7xl font-bold max-w-5xl">
          AI That Understands Why Designs Work
        </h1>

        <p className="text-gray-400 mt-6 text-xl max-w-2xl">
          Upload posters, logos and social media creatives.
          Get intelligent design analysis and AI suggestions.
        </p>

        <Link
          href="/upload"
          className="mt-8 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Upload Design
        </Link>

      </section>

      <section className="grid md:grid-cols-4 gap-6 px-10 pb-20">

        <div className="border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-3">
            🎨 Design Analysis
          </h2>

          <p className="text-gray-400">
            Analyze brightness, contrast and composition.
          </p>
        </div>

        <div className="border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-3">
            📸 Sharpness Check
          </h2>

          <p className="text-gray-400">
            Detect blurry or low quality images.
          </p>
        </div>

        <div className="border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-3">
            🤖 AI Feedback
          </h2>

          <p className="text-gray-400">
            Receive actionable suggestions automatically.
          </p>
        </div>

        <div className="border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-3">
            📊 Design Score
          </h2>

          <p className="text-gray-400">
            Get a quality score and rating instantly.
          </p>
        </div>

      </section>

      <footer className="border-t border-gray-800 text-center py-6 text-gray-500">
        DesignDNA © 2026
      </footer>

    </main>
  );
}