import React, { useState } from "react";
import axios from "axios";

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

    // Add user message
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
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 text-lg font-bold shadow">
        💬 Business FAQ Assistant
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl max-w-[70%] whitespace-pre-line shadow ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-white text-gray-800 mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-xl px-3 py-2 focus:outline-none"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded-xl shadow"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;