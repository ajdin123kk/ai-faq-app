const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Business-friendly FAQs
const faqs = {
  "hi": "Hello 👋 Welcome! How can I help you today?",
  "hello": "Hi there! 😊 Feel free to ask me about our services.",
  "what services do you offer": "We provide professional AI-powered FAQ systems, websites, and business automation tools.",
  "how much does it cost": "Pricing depends on the project, but most small business setups start at $99. Custom solutions may cost more.",
  "how do i get started": "Getting started is easy! Just tell us about your business and we’ll set up your FAQ assistant within 1–3 days.",
  "do you offer support": "Yes! We provide ongoing support and updates so your FAQ system always works smoothly.",
  "can you customize it": "Absolutely ✅. We can customize the assistant with your business name, services, and branding.",
  "how long does it take": "Setup usually takes 1–3 business days depending on the complexity.",
  "do you work internationally": "Yes 🌍, we work with businesses worldwide.",
  "can this help me get more customers": "Definitely! 🚀 An FAQ assistant saves time, answers customer questions instantly, and makes your business look professional.",
  "can i see a demo": "Sure! This chat you’re using right now is an example demo.",
};

// API endpoint
app.post("/ask", (req, res) => {
  const question = req.body.question?.toLowerCase().trim();

  if (!question) {
    return res.status(400).json({ answer: "⚠️ Please type a question to continue." });
  }

  const answer = faqs[question];

  if (answer) {
    return res.json({ answer });
  } else {
    return res.json({
      answer: `🤔 I’m not sure about "${req.body.question}".  
Here are some things you can ask me:  
- What services do you offer?  
- How much does it cost?  
- How do I get started?  
- Do you offer support?  
- Do you work internationally?`,
    });
  }
});

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});