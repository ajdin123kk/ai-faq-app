const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Predefined FAQ answers
const faqAnswers = {
  "what services do you offer": "We provide AI-powered FAQ bots, web apps, and automation solutions for businesses.",
  "how much does it cost": "Our pricing is flexible. We offer affordable starter plans and custom quotes based on your needs.",
  "how do i get started": "You can get started by contacting us via email. We’ll guide you through setup in a few easy steps.",
  "do you offer support": "Yes, we provide ongoing support to make sure everything runs smoothly for your business.",
  "do you work internationally": "Yes! We work with businesses worldwide 🌍."
};

// Root check
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// Ask route
app.post("/ask", (req, res) => {
  const userQuestion = (req.body.question || "").toLowerCase();

  if (!userQuestion) {
    return res.status(400).json({ answer: "Please provide a question." });
  }

  // Try to match FAQs
  for (const key in faqAnswers) {
    if (userQuestion.includes(key)) {
      return res.json({ answer: faqAnswers[key] });
    }
  }

  // Fallback response with clickable suggestions
  res.json({
    answer:
      `🤔 I’m not sure about "${req.body.question}". Here are some things you can ask me:\n\n` +
      `- What services do you offer?\n` +
      `- How much does it cost?\n` +
      `- How do I get started?\n` +
      `- Do you offer support?\n` +
      `- Do you work internationally?`
  });
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));