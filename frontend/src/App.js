import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");

  // Update HTML root when theme changes
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Handle asking a question
  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await axios.post(
        "https://your-backend.onrender.com/api/ask", // ⬅️ replace with your backend URL
        { question }
      );
      setAnswer(response.data.answer || "No answer received.");
    } catch (error) {
      console.error(error);
      setAnswer("⚠️ Network error. Please check backend URL.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <header className="w-full max-w-2xl flex justify-between items-center px-4 py-3">
        <h1 className="text-2xl font-bold">🤖 AI FAQ Assistant</h1>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="px-3 py-1 rounded-lg border bg-gray-200 dark:bg-gray-800"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>

      {/* Main Input */}
      <main className="w-full max-w-2xl px-4 py-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask me anything about AI..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={askQuestion}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>

        {/* Answer Section */}
        <div className="mt-6 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
          {answer ? (
            <ReactMarkdown>{answer}</ReactMarkdown>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              🤔 Ask a question to see the answer here.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;