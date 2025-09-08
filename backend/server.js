const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(
  cors({
    origin: "*", // replace with frontend URL later for security
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// FAQ AI route
app.post("/api/ask", (req, res) => {
  const { question } = req.body;

  if (!question || question.trim() === "") {
    return res.status(400).json({ answer: "Please provide a question." });
  }

  let answer = "";

  if (question.toLowerCase().includes("hello")) {
    answer = "Hi there! 👋 How can I help you today?";
  } else if (question.toLowerCase().includes("who are you")) {
    answer = "I’m your AI FAQ Assistant 🤖, built by Muktar Ibrahim.";
  } else {
    answer = `You asked: "${question}". (This is a placeholder answer — AI integration coming soon!)`;
  }

  res.json({ answer });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});