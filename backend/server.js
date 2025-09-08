import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// AI FAQ route
app.post("/ask", (req, res) => {
  const { question } = req.body;

  if (!question || question.trim() === "") {
    return res.status(400).json({ answer: "❌ Please provide a question." });
  }

  // --- Replace this with AI logic later ---
  let answer;
  if (question.toLowerCase().includes("ai")) {
    answer = "AI stands for Artificial Intelligence. It enables machines to mimic human intelligence.";
  } else if (question.toLowerCase().includes("faq")) {
    answer = "FAQ means Frequently Asked Questions — common questions with quick answers.";
  } else {
    answer = `You asked: "${question}". (Smarter answers coming soon!)`;
  }

  res.json({ answer });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});