import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Backend endpoint (your Render URL)
  const BACKEND = "https://ai-faq-app.onrender.com/ask";

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await axios.post(BACKEND, { question });
      setAnswer(res?.data?.answer || "No answer received from backend.");
    } catch (err) {
      console.error(err);
      setAnswer("⚠️ Error connecting to backend. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🤖 AI FAQ App</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything..."
          className="input"
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      <div className="answer">
        {answer ? <ReactMarkdown>{answer}</ReactMarkdown> : <p>No answer yet.</p>}
      </div>
    </div>
  );
}

export default App;