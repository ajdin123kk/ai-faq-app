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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center p-6">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <div className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 dark:text-blue-300">
            🤖 AI FAQ Assistant
          </h1>

          <textarea
            rows="4"
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
            placeholder="Ask me anything..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button
            onClick={askQuestion}
            className="mt-4 py-3 px-6 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition w-full"
            disabled={loading}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>

          {error && (
            <p className="text-red-600 dark:text-red-400 mt-4 text-center font-medium">
              {error}
            </p>
          )}

          {answer && (
            <div className="mt-6 p-5 bg-gray-100 dark:bg-gray-700 rounded-xl prose prose-blue dark:prose-invert max-w-none">
              <h3 className="font-semibold text-lg mb-2">Answer:</h3>
              {/* Animated typing with Markdown support */}
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