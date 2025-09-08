import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    // Add user question to messages
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);

    try {
      const response = await axios.post("https://ai-faq-app.onrender.com/ask", {
        question,
      });

      const answer =
        response.data.answer || "Sorry, I couldn’t find an answer for that.";

      setMessages((prev) => [...prev, { role: "bot", text: answer }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Error fetching response. Please try again." },
      ]);
    }

    setLoading(false);
    setQuestion("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-indigo-50 via-white to-cyan-50 text-gray-800 p-6">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-indigo-700 mb-6"
      >
        🤖 AI FAQ Assistant
      </motion.h1>

      {/* Chat Window */}
      <div className="flex-1 w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 flex flex-col overflow-y-auto border border-gray-200">
        <div className="flex flex-col gap-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-xl max-w-xs ${
                msg.role === "user"
                  ? "ml-auto bg-indigo-500 text-white"
                  : "mr-auto bg-gray-100 text-gray-800"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
          {loading && (
            <div className="text-gray-500 text-sm">AI is thinking...</div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="w-full max-w-2xl mt-4 flex items-center gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me something..."
          className="flex-1 border px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-500"
        />
        <button
          onClick={handleAsk}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </div>

      {/* Contact Us */}
      <div className="mt-6 text-center">
        <a
          href="mailto:youremail@example.com"
          className="bg-cyan-500 text-white px-4 py-2 rounded-lg shadow hover:bg-cyan-600 transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}

export default App;