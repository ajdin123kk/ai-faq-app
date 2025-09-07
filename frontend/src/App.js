import React, { useState } from "react";
import axios from "axios";
import { useTypewriter } from "react-simple-typewriter";

// Backend URL (Render)
const BACKEND_URL = "https://ai-faq-app.onrender.com/ask";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [text] = useTypewriter({
    words: ["AI FAQ Assistant", "Ask me anything!", "Powered by AI"],
    loop: true,
    delaySpeed: 2000,
  });

  const handleAsk = async () => {
    if (!question.trim()) return;
    setAnswer("");
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post(BACKEND_URL, { question });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error("Network error:", err);
      setError(
        "⚠️ Unable to reach backend. Please check server or try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "10px", color: "#38bdf8" }}>
        {text}
      </h1>
      <div style={{ maxWidth: "500px", width: "100%", textAlign: "center" }}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me a question..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #38bdf8",
            marginBottom: "10px",
            color: "black",
          }}
        />
        <button
          onClick={handleAsk}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#38bdf8",
            border: "none",
            cursor: "pointer",
            color: "black",
            fontWeight: "bold",
          }}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
      <div style={{ marginTop: "20px", maxWidth: "600px", textAlign: "center" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {answer && (
          <p
            style={{
              backgroundColor: "#1e293b",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            }}
          >
            {answer}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;