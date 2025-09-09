import React, { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "What services do you offer?",
    "How much does it cost?",
    "How do I get started?",
    "Do you offer support?",
    "Do you work internationally?"
  ];

  const handleAsk = async (q) => {
    const userQuestion = q || question;
    if (!userQuestion.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "https://ai-faq-app.onrender.com/ask",
        { question: userQuestion },
        { headers: { "Content-Type": "application/json" } }
      );
      setAnswer(res.data.answer);
    } catch (error) {
      console.error("Error fetching response:", error);
      setAnswer("❌ Error fetching response. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          🤖 Business FAQ Assistant
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Ask me common business questions, or pick from the suggestions below.
        </p>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(s)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm shadow-md transition"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          />
          <button
            onClick={() => handleAsk()}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>

        {/* Answer Box */}
        {answer && (
          <div className="bg-gray-100 border-l-4 border-blue-500 p-4 rounded-lg text-gray-800 whitespace-pre-line">
            {answer.split("\n").map((line, idx) =>
              line.startsWith("- ") ? (
                <button
                  key={idx}
                  onClick={() => handleAsk(line.replace("- ", ""))}
                  className="block text-left w-full px-2 py-1 rounded hover:bg-blue-100 transition"
                >
                  {line}
                </button>
              ) : (
                <p key={idx}>{line}</p>
              )
            )}
          </div>
        )}

        {/* Contact Us */}
        <div className="mt-6 text-center">
          <a
            href="mailto:muktaribro13@gmail.com"
            className="text-blue-600 hover:underline font-medium"
          >
            📩 Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;