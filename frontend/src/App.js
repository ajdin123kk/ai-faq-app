// frontend/src/App.js
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Typewriter } from "react-simple-typewriter";

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]); // chat history
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const askQuestion = async () => {
    if (!question.trim()) {
      setError("⚠️ Please enter a question.");
      return;
    }
    setError("");
    setLoading(true);

    const newMessage = { role: "user", text: question };
    setMessages((prev) => [...prev, newMessage]);
    setQuestion("");

    try {
      const res = await fetch("https://ai-faq-app.onrender.com/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (data.error) {
        setError(
          data.error.includes("quota")
            ? "🚦 Free quota reached. Try again later."
            : data.error
        );
      } else {
        setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
      }
    } catch {
      setError("❌ Network error, please try again.");
    }
    setLoading(false);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-black flex flex-col items-center justify-center p-6 transition-all duration-500">
        
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-5 right-5 px-4 py-2 rounded-full shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-md text-sm font-medium hover:scale-105 transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Chat Container */}
        <div className="max-w-2xl w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-gray-200 dark:border-gray-700 flex flex-col transition-all">
          <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text animate-fadeIn">
            🤖 AI FAQ Assistant
          </h1>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto max-h-[60vh] space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl max-w-[80%] shadow-md animate-fadeIn ${
                  msg.role === "user"
                    ? "ml-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none"
                    : "mr-auto bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                }`}
              >
                {msg.role === "bot" ? (
                  <ReactMarkdown className="prose dark:prose-invert max-w-none">
                    <Typewriter
                      words={[msg.text]}
                      typeSpeed={20}
                      cursor={false}
                    />
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="mr-auto flex items-center gap-2 p-4 rounded-2xl bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-md">
                <span className="w-2 h-2 bg-gray-700 dark:bg-gray-200 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-700 dark:bg-gray-200 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-700 dark:bg-gray-200 rounded-full animate-bounce delay-300"></span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-2xl p-3 shadow-inner mt-6">
            <textarea
              rows="2"
              className="flex-1 p-3 bg-transparent rounded-xl focus:outline-none text-gray-800 dark:text-gray-100 resize-none"
              placeholder="Type your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              onClick={askQuestion}
              disabled={loading}
              className={`px-5 py-3 rounded-2xl font-semibold text-white transition-all duration-300 shadow-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105"
              }`}
            >
              Ask
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 dark:text-red-400 mt-4 text-center font-medium animate-pulse">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;