from flask import Flask, request, jsonify
import os
import google.generativeai as genai

app = Flask(__name__)

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@app.route("/")
def home():
    return {"message": "Backend is running!"}

# ✅ List all available models
@app.route("/models", methods=["GET"])
def list_models():
    try:
        models = genai.list_models()
        model_names = [m.name for m in models]
        return jsonify({"available_models": model_names})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/faq", methods=["POST"])
def faq():
    data = request.get_json()
    question = data.get("question", "")

    if not question:
        return jsonify({"error": "No question provided"}), 400

    try:
        # ✅ Use correct model name
        model = genai.GenerativeModel("models/gemini-pro")
        response = model.generate_content(question)
        return jsonify({"answer": response.text})
    except Exception as e:
        return