const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// AI FAQ route
app.post("/api/ask", (req, res) => {
  const { question } = req.body;

  if (!question || question.trim() === "") {
    return res.status(400).json({ answer: "Please provide a question." });
  }

  let answer = "";

  // Simple demo responses
  if (question.toLowerCase().includes("hello")) {
    answer = "Hi there! 👋 How can I help you today?";
  } else if (question.toLowerCase().includes("who are you")) {
    answer = "I’m your AI FAQ Assistant 🤖, built by Muktar Ibrahim.";
  } else if (question.toLowerCase().includes("nigeria")) {
    answer = "Nigeria is a country in West Africa, known for its rich culture, music, and Nollywood 🎶🎬.";
  } else {
    answer = `You asked: "${question}". (More smart answers coming soon!)`;
  }

  res.json({ answer });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});