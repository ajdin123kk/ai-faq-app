import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./styles.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    "How can I increase my online sales?",
    "What’s the best way to handle customer complaints?",
    "How do I improve my website SEO?",
    "Should I run Facebook or Google ads?",
    "What’s the best way to follow up with clients?",
  ];

  const handleAsk = async (q) => {
    const userQuestion = q || question;
    if (!userQuestion.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await axios.post(
        "https://ai-faq-app.onrender.com/ask",
        { question: userQuestion },
        { headers: { "Content-Type": "application/json" } }
      );

      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("❌ Error fetching response. Please try again.");
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>💼 Business FAQ Assistant</h1>
        <p>Ask me common business questions, or pick from the suggestions below.</p>
      </header>

      <div className="faq-suggestions">
        {suggestedQuestions.map((q, index) => (
          <button
            key={index}
            className="suggestion-btn"
            onClick={() => handleAsk(q)}
          >
            {q}
          </button>
        ))}
      </div>

      <div className="chat-box">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
        />
        <button onClick={() => handleAsk()} disabled={loading}>
          {loading ? "⏳ Thinking..." : "Ask"}
        </button>
      </div>

      <div className="answer-box">
        {answer && (
          <div className="answer-card">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>
          📩 Contact us:{" "}
          <a href="mailto:muktaribro13@gmail.com">muktaribro13@gmail.com</a>
        </p>
      </footer>
    </div>
  );
}

export default App;