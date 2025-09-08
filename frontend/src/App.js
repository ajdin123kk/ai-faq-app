import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) {
      setError("⚠️ Please type a question.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ai-faq-app.onrender.com/api/ask", 
        { question }
      );
      setAnswer(res.data.answer);
    } catch (err) {
      setError("❌ Error fetching response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-white to-purple-200 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          🤖 AI FAQ Assistant
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-grow border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {answer && (
          <div className="mt-4 bg-gray-50 border rounded-xl p-4 shadow-inner">
            <h2 className="font-semibold text-gray-700 mb-2">Answer:</h2>
            <ReactMarkdown className="prose prose-indigo">{answer}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;