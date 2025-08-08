export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700 px-4">
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-10 text-center max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to Generative AI Hub
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Explore our AI-powered tools and experience the future of productivity.
        </p>
        <button className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
}
