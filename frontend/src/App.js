import React, { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = "https://ai-faq-app.onrender.com/ask";

  const faqSuggestions = [
    "How can I increase my online sales?",
    "What’s the best way to handle customer complaints?",
    "How do I improve my website SEO?",
    "Should I run Facebook or Google ads?",
    "What’s the best way to follow up with clients?",
  ];

  const askQuestion = async (q) => {
    if (!q) return;
    setLoading(true);
    setAnswer("");

    try {
      const response = await axios.post(backendUrl, { question: q });
      setAnswer(response.data.answer || "No answer received.");
    } catch (error) {
      console.error(error);
      setAnswer("❌ Error fetching response. Please try again.");
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    askQuestion(question);
    setQuestion("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-primary mb-4">
        💬 AI Business FAQ Assistant
      </h1>
      <p className="text-gray-700 mb-6 text-center max-w-xl">
        Ask me common business questions, or pick from the suggestions below.
      </p>

      {/* FAQ Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 w-full max-w-2xl">
        {faqSuggestions.map((faq, idx) => (
          <button
            key={idx}
            onClick={() => askQuestion(faq)}
            className="bg-white border border-gray-300 text-gray-900 p-3 rounded-xl shadow hover:bg-gray-50 transition text-left"
          >
            {faq}
          </button>
        ))}
      </div>

      {/* Chat Box */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6 flex flex-col space-y-4">
        {/* Question Form */}
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </form>

        {/* Chat Display */}
        {answer && (
          <div className="flex flex-col space-y-2">
            <div className="self-end bg-primary text-white px-4 py-2 rounded-xl max-w-xs shadow">
              You asked: {question || "Selected from FAQ"}
            </div>
            <div className="self-start bg-gray-200 text-gray-900 px-4 py-2 rounded-xl max-w-xs shadow">
              {answer}
            </div>
          </div>
        )}
      </div>

      {/* Contact Us */}
      <div className="mt-6 text-center">
        <a
          href="mailto:muktaribro13@gmail.com"
          className="bg-secondary text-white px-6 py-3 rounded-xl shadow-lg hover:bg-rose-600 transition"
        >
          📩 Contact Us
        </a>
      </div>
    </div>
  );
}

export default App;