// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Business-friendly FAQ answers (keyed by simple lower-case terms)
const faqAnswers = {
  "what services do you offer": "We provide AI-powered FAQ assistants, chatbot development, website design, and business automation tools. We can adapt the assistant to your brand and content.",
  "how much does it cost": "Pricing depends on the scope. Starter setups typically begin at $99. For a custom quote, contact us with details about your requirements.",
  "how do i get started": "Great! Simply contact us via email with a short description of your business. We'll schedule a quick chat and set up your assistant (1–3 business days typical).",
  "do you offer support": "Yes — we provide ongoing support and updates to keep your assistant working smoothly. Support options can be included in your plan.",
  "do you work internationally": "Absolutely — we work with businesses worldwide 🌍."
};

// root / health check
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// ask endpoint
app.post("/ask", (req, res) => {
  const raw = (req.body.question || "").toString();
  const userQuestion = raw.trim().toLowerCase();

  if (!userQuestion) {
    return res.status(400).json({ answer: "⚠️ Please provide a question." });
  }

  // match by contains — so questions like "What services do you offer?" or "tell me about services" will match
  for (const key in faqAnswers) {
    if (userQuestion.includes(key)) {
      return res.json({ answer: faqAnswers[key] });
    }
  }

  // fallback helpful message with clickable suggestions shown to user
  const fallback = [
    `🤔 I don’t have a direct answer for: "${raw}".`,
    `Here are some useful questions you can try:`,
    `- What services do you offer`,
    `- How much does it cost`,
    `- How do I get started`,
    `- Do you offer support`,
    `- Do you work internationally`
  ].join("\n");

  return res.json({ answer: fallback });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});