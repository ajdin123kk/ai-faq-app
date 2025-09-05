// frontend/src/App.js
import React, { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askQuestion = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
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
      setError("Network error, try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-12 font-sans p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">AI FAQ Assistant</h1>
      <textarea
        rows="4"
        className="w-full p-3 rounded border"
        placeholder="Ask me anything..."
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      <button
        onClick={askQuestion}
        className="mt-3 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {answer && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;