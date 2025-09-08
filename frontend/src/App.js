import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // default dark mode

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await axios.post("https://ai-faq-app.onrender.com/api/ask", {
        question,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("⚠️ Network error. Please check backend URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <header className="header">
        <h1>🤖 AI FAQ Assistant</h1>
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>

      <main className="main">
        <div className="input-section">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything..."
          />
          <button onClick={handleAsk} disabled={loading}>
            {loading ? "⏳ Thinking..." : "💡 Ask"}
          </button>
        </div>

        <div className="answer-section">
          {answer && (
            <>
              <h2>📝 Answer:</h2>
              <ReactMarkdown>{answer}</ReactMarkdown>
            </>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>Built by Muktar Ibrahim ✨</p>
      </footer>
    </div>
  );
}

export default App;