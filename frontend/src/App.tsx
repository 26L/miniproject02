function App() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-primary mb-4 font-sans">
        News Insight Pro
      </h1>
      <p className="text-text text-lg">
        Frontend Environment Setup Complete.
      </p>
      <div className="mt-8 flex gap-4">
        <button className="px-6 py-2 bg-primary text-white rounded-ui hover:bg-secondary transition-all">
          Primary Action
        </button>
        <button className="px-6 py-2 bg-white border border-gray-200 text-text rounded-ui shadow-card hover:bg-gray-50 transition-all">
          Secondary Action
        </button>
      </div>
    </div>
  )
}

export default App
