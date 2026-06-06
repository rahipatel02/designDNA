export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      
      <nav className="flex justify-between items-center p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">DesignDNA</h1>

        <button className="px-4 py-2 bg-white text-black rounded-lg">
          Login
        </button>
      </nav>

      <section className="flex flex-col items-center justify-center text-center py-32 px-6">
        <h1 className="text-7xl font-bold max-w-5xl">
          AI That Understands Why Designs Work
        </h1>

        <p className="text-gray-400 mt-6 text-xl max-w-2xl">
          Upload posters, banners, logos and social media creatives.
          Get AI-powered design intelligence and improvement suggestions.
        </p>

        <div className="flex gap-4 mt-10">
          <button className="px-6 py-3 bg-white text-black rounded-xl font-semibold">
            Upload Design
          </button>

          <button className="px-6 py-3 border border-white rounded-xl">
            Learn More
          </button>
        </div>
      </section>

    </main>
  );
}