import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to our Business FAQ Assistant!\n\nYou can ask me things like:\n• What services do you offer?\n• How much does it cost?\n• How do I get started?\n• Do you offer support?\n• Do you work internationally?",
    },
  ]);

  const handleSend = async () => {
    if (!question.trim()) return;

    const userMsg = { sender: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await axios.post("https://ai-faq-app.onrender.com/ask", {
        question,
      });

      const botMsg = { sender: "bot", text: response.data.answer };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const botMsg = {
        sender: "bot",
        text: "❌ Error fetching response. Please try again.",
      };
      setMessages((prev) => [...prev, botMsg]);
    }

    setQuestion("");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-2xl flex flex-col h-[90vh] rounded-2xl shadow-2xl backdrop-blur-lg bg-white/20 border border-white/30 overflow-hidden">
        
        {/* Header */}
        <div className="bg-white/30 text-white text-lg font-bold p-4 text-center shadow-md">
          💬 Business FAQ Assistant
        </div>

        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-2xl max-w-[75%] whitespace-pre-line shadow-md ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-white/90 text-gray-900 mr-auto"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        {/* Input + Contact */}
        <div className="bg-white/30 backdrop-blur-md p-3 flex gap-2 items-center">
          <input
            type="text"
            className="flex-1 px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
          >
            Send
          </button>
          <a
            href="mailto:muktaribro13@gmail.com"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;