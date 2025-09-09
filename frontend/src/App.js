import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./index.css";

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

  async function ask(q) {
    const userQuestion = (q || question || "").toString();
    if (!userQuestion.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await axios.post(
        "https://ai-faq-app.onrender.com/ask",
        { question: userQuestion },
        { headers: { "Content-Type": "application/json" } }
      );

      setAnswer(res.data.answer || "No answer returned.");
    } catch (err) {
      console.error(err);
      setAnswer("❌ Error fetching response. Please try again.");
    } finally {
      setLoading(false);
      setQuestion("");
    }
  }

  // Render answer - if lines begin with "-" we show them as clickable fallback buttons
  const renderAnswer = () => {
    if (!answer) return null;

    const lines = answer.split("\n").map(line => line.trim()).filter(Boolean);

    return lines.map((line, i) => {
      if (line.startsWith("- ")) {
        const text = line.replace(/^-+\s*/, "");
        return (
          <button
            key={i}
            onClick={() => ask(text)}
            className="block text-left w-full px-3 py-2 rounded-lg hover:bg-blue-50 transition"
            style={{ background: "transparent", border: "none", color: "#1f2937" }}
          >
            {text}
          </button>
        );
      } else {
        // Use ReactMarkdown for nicer formatting (keeps plain text safe)
        return (
          <div key={i} className="prose prose-sm text-gray-800 mb-2">
            <ReactMarkdown>{line}</ReactMarkdown>
          </div>
        );
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">🤖 Business FAQ Assistant</h1>
          <p className="text-gray-600 mt-2">
            Ask business questions or pick one of the suggestions below.
          </p>
        </header>

        <section className="flex flex-wrap gap-2 mb-6 justify-center">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => ask(s)}
              className="suggestion-btn"
            >
              {s}
            </button>
          ))}
        </section>

        <main className="bg-white rounded-xl shadow p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(question);
            }}
            className="flex gap-2 mb-4"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
          </form>

          {/* Answer area */}
          <div>
            {answer ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                {renderAnswer()}
              </div>
            ) : (
              <div className="text-gray-500">Answers will appear here.</div>
            )}
          </div>
        </main>

        <footer className="mt-6 text-center">
          <a
            href="mailto:muktaribro13@gmail.com"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
          >
            📩 Contact Us
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;