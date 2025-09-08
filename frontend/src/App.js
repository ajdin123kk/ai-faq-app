import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Search } from "lucide-react";
import FAQCard from "./components/FAQCard";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("https://ai-faq-app.onrender.com/api/ask", {
        question: query,
      });
      setResponse(res.data.answer || "No answer found.");
    } catch (err) {
      setResponse("Error fetching response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🤖 AI FAQ Assistant</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch} disabled={loading}>
          <Search size={18} /> {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      {response && (
        <FAQCard>
          <ReactMarkdown>{response}</ReactMarkdown>
        </FAQCard>
      )}
    </div>
  );
}

export default App;