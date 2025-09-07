import React, { useState } from "react";
import { Moon, Sun, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

const BACKEND_URL = "https://ai-faq-app.onrender.com"; // your backend

function App() {
  const [darkMode, setDarkMode] = useState(true); // default dark mode
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      if (!res.ok) throw new Error("Network error");
      const data = await res.json();

      const botMessage = {
        sender: "bot",
        text: data.answer || "⚠️ No response from server",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Network error. Please check backend URL." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500 flex flex-col">
        
        {/* Header */}
        <header className="p-4 shadow-md flex justify-between items-center bg-white dark:bg-gray-800 transition-colors duration-500">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            AI FAQ Assistant
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-500"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {/* Chat Area */}
        <main className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-lg p-3 rounded-2xl shadow-md transition duration-300 text-sm md:text-base ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && (
            <p className="text-gray-500 dark:text-gray-400 animate-pulse">
              AI is typing...
            </p>
          )}
        </main>

        {/* Input Box */}
        <footer className="p-4 bg-white dark:bg-gray-800 flex items-center space-x-2 shadow-inner">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          />
          <button
            onClick={handleSend}
            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition duration-300"
          >
            <Send size={18} />
          </button>
        </footer>
      </div>
    </div>
  );
}

export default App;