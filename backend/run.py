from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # This line enables CORS for all routes and origins

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@app.route("/")
def home():
    return {"message": "Backend is running!"}

@app.route("/models", methods=["GET"])
def list_models():
    try:
        models = [m.name for m in genai.list_models()]
        return jsonify({"available_models": models})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/faq", methods=["POST"])
def faq():
    data = request.get_json()
    question = data.get("question", "")
    model_name = data.get("model", "models/gemini-1.5-pro-latest")

    if not question:
        return jsonify({"error": "No question provided"}), 400

    try:
        model = genai.GenerativeModel(model_name)
        response = model.generate_content(question)
        return jsonify({
            "model": model_name,
            "answer": response.text
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run()