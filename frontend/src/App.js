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
        body: JSON.stringify({
          question,
          model: "models/gemini-1.5-flash-latest" // default model
        }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setAnswer(data.answer);
      }
    } catch (err) {
      setError("Network error, please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>AI FAQ Assistant</h1>
      <textarea
        rows="4"
        style={{ width: "100%", padding: "10px" }}
        placeholder="Ask me anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        onClick={askQuestion}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          cursor: "pointer",
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {answer && (
        <div style={{ marginTop: "20px", padding: "15px", background: "#f9f9f9", borderRadius: "5px" }}>
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;