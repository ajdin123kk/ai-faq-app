// frontend/src/App.js
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Typewriter } from "react-simple-typewriter";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) {
      setError("⚠️ Please enter a question.");
      return;
    }
    setError("");
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("https://ai-faq-app.onrender.com/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (data.error) {
        if (data.error.includes("quota")) {
          setError("🚦 We've hit today's free quota. Please try again later.");
        } else {
          setError(data.error);
        }
      } else {
        setAnswer(data.answer);
      }
    } catch {
      setError("❌ Network error, please try again.");
    }
    setLoading(false);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-black flex flex-col items-center justify-center p-6 transition-all duration-500">
        
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-5 right-5 px-4 py-2 rounded-full shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-md text-sm font-medium hover:scale-105 transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Card Container */}
        <div className="max-w-2xl w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-gray-200 dark:border-gray-700 transition-all">
          
          <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
            🤖 AI FAQ Assistant
          </h1>

          {/* Input Area */}
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-2xl p-3 shadow-inner">
            <textarea
              rows="2"
              className="flex-1 p-3 bg-transparent rounded-xl focus:outline-none focus:ring-0 text-gray-800 dark:text-gray-100 resize-none"
              placeholder="Type your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              onClick={askQuestion}
              disabled={loading}
              className={`px-5 py-3 rounded-2xl font-semibold text-white transition-all duration-300 shadow-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105"
              }`}
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 dark:text-red-400 mt-4 text-center font-medium animate-pulse">
              {error}
            </p>
          )}

          {/* Answer Section */}
          {answer && (
            <div className="mt-6 p-5 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg prose prose-blue dark:prose-invert max-w-none animate-fadeIn">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                Answer:
              </h3>
              <ReactMarkdown>
                <Typewriter words={[answer]} typeSpeed={20} cursor={false} />
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;