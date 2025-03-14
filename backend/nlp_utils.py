import requests
from transformers import pipeline
from config import PERSPECTIVE_API_KEY, HF_MODEL
import os

# Load environment variables
MODEL_NAME = os.getenv("HF_MODEL", "deepset/roberta-base-squad2")

# Load Hugging Face models
qa_pipeline = pipeline("question-answering", model=MODEL_NAME)
sentiment_pipeline = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment")

def analyze_sentiment(text):
    """Analyze sentiment using Hugging Face RoBERTa sentiment model."""
    try:
        result = sentiment_pipeline(text)[0]
        return result["score"] if result["label"] == "positive" else -result["score"]
    except Exception as e:
        print(f"⚠️ Sentiment analysis failed: {e}")
        return 0

def analyze_toxicity(text):
    """Analyze toxicity using Google Perspective API."""
    url = f"https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key={PERSPECTIVE_API_KEY}"
    payload = {
        "comment": {"text": text},
        "languages": ["en"],
        "requestedAttributes": {"TOXICITY": {}},
    }

    try:
        response = requests.post(url, json=payload)
        data = response.json()
        return data["attributeScores"]["TOXICITY"]["summaryScore"]["value"]
    except Exception as e:
        print(f"⚠️ Toxicity analysis failed: {e}")
        return 0  

def answer_question(context, question):
    """Answer questions based on the provided context using Hugging Face's RoBERTa QA model."""
    try:
        result = qa_pipeline(question=question, context=context)
        return result.get("answer", "No answer found.")
    except Exception as e:
        print(f"⚠️ Question-answering failed: {e}")
        return "Error in QA model."
