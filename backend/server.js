import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const faqs = {
  "What services do you offer?": "We provide AI-powered FAQ assistants, chatbot development, and business automation tools.",
  "How much does it cost?": "Pricing depends on your needs. We offer flexible plans starting from $99/month.",
  "How do I get started?": "Simply contact us and we’ll help you set up your AI assistant within a few days.",
  "Do you offer support?": "Yes! We provide full customer support via email and chat.",
  "Do you work internationally?": "Absolutely, we work with businesses around the world 🌍."
};

app.post("/ask", (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ answer: "❌ Please provide a question." });
  }

  const normalizedQ = question.trim().toLowerCase();

  // Try to match
  const matchedKey = Object.keys(faqs).find(
    (q) => q.toLowerCase() === normalizedQ
  );

  if (matchedKey) {
    return res.json({ answer: faqs[matchedKey] });
  }

  // Friendly fallback
  return res.json({
    answer: `🤔 I don’t have a direct answer for: **"${question}"**.  
Here are some questions you can ask me instead:  
- What services do you offer?  
- How much does it cost?  
- How do I get started?  
- Do you offer support?  
- Do you work internationally?`
  });
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});