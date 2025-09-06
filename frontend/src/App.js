// frontend/src/App.js
import React, { useState } from "react";
import ReactMarkdown from "react-markdown"; // ✅ new import

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        setError(data.error);
      } else {
        setAnswer(data.answer);
      }
    } catch {
      setError("❌ Network error, please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          🤖 AI FAQ Assistant
        </h1>

        <textarea
          rows="4"
          className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
        )}

        {answer && (
          <div className="mt-6 p-5 bg-gray-100 rounded-xl prose prose-blue max-w-none">
            <h3 className="font-semibold text-lg mb-2">Answer:</h3>
            {/* ✅ Render Markdown */}
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;