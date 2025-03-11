
import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from google.cloud import language_v1
from googleapiclient import discovery
from dotenv import load_dotenv
import joblib

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow frontend & browser extension requests

# Initialize Google Cloud NLP client
try:
    nlp_client = language_v1.LanguageServiceClient()
    logger.info("Google Cloud NLP client initialized.")
except Exception as e:
    logger.error("Error initializing Google Cloud NLP client: %s", e)
    raise

# Get Perspective API key from environment variables
PERSPECTIVE_API_KEY = os.getenv("PERSPECTIVE_API_KEY")
if not PERSPECTIVE_API_KEY:
    logger.warning("PERSPECTIVE_API_KEY is not set. Toxicity analysis will be disabled.")
    perspective_client = None  # Disable Perspective API usage
else:
    try:
        perspective_client = discovery.build(
            "commentanalyzer", "v1alpha1", developerKey=PERSPECTIVE_API_KEY,
            discoveryServiceUrl="https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1"
        )
        logger.info("Perspective API client initialized.")
    except Exception as e:
        logger.error("Error initializing Perspective API client: %s", e)
        perspective_client = None  # Disable if initialization fails


# Load meta-classifier (Machine Learning Model)
meta_classifier_path = os.getenv("META_CLASSIFIER_PATH", "model/meta_classifier.pkl")
meta_classifier = None
if os.path.exists(meta_classifier_path):
    try:
        meta_classifier = joblib.load(meta_classifier_path)
        logger.info("Meta-classifier loaded from %s", meta_classifier_path)
    except Exception as e:
        logger.error("Error loading meta-classifier: %s", e)
else:
    logger.warning("Meta-classifier not found. Using basic model fusion instead.")

def analyze_sentiment(text):
    """Analyzes sentiment using Google Cloud NLP and returns a sentiment score."""
    try:
        document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)
        response = nlp_client.analyze_sentiment(document=document)
        return response.document_sentiment.score  # Score ranges from -1 to 1
    except Exception as e:
        logger.error("Error analyzing sentiment: %s", e)
        return 0  # Neutral sentiment as fallback

import requests

PERSPECTIVE_API_URL = "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze"

def get_toxicity(text):
    """Uses Perspective API to obtain a toxicity score for the text."""
    headers = {"Content-Type": "application/json"}
    data = {
        "comment": {"text": text},
        "languages": ["en"],
        "requestedAttributes": {"TOXICITY": {}}
    }
    
    response = requests.post(
        f"{PERSPECTIVE_API_URL}?key={PERSPECTIVE_API_KEY}", 
        json=data, 
        headers=headers
    )
    
    if response.status_code == 200:
        result = response.json()
        return result["attributeScores"]["TOXICITY"]["summaryScore"]["value"]
    else:
        print(f"Perspective API error: {response.text}")
        return None  # Handle error gracefully

def fused_score(text):
    """Combines predictions from sentiment analysis and toxicity scoring using a simple weighted approach."""
    try:
        sentiment = analyze_sentiment(text)
        toxicity = get_toxicity(text)

        logger.info("Sentiment Score: %s, Toxicity Score: %s", sentiment, toxicity)

        if sentiment is None or toxicity is None:
            return None  # Handle case where API fails

        # Updated Formula: Reduce impact of sentiment
        weight_sentiment = 0.3  # Reduced from 0.4
        weight_toxicity = 0.7   # Increased from 0.6

        score = (weight_sentiment * (1 - sentiment)) + (weight_toxicity * toxicity)
        return score

    except Exception as e:
        logger.error("Error during individual model analysis: %s", e)
        return None




@app.route('/analyze', methods=['POST'], strict_slashes=False)
 # Handles trailing slash case

def analyze():
    """Endpoint to analyze text for misinformation/hate speech."""
    try:
        data = request.get_json()
        text = data.get("text", "")
        if not text:
            return jsonify({"error": "No text provided"}), 400

        score = fused_score(text)
        if score is None:
            return jsonify({"error": "Analysis failed"}), 500

        threshold = 0.5
        label = "Hate/Misinformation Detected" if score > threshold else "Content is Clean"

        response = {
            "analysis": label,
            "score": score,
            "sentiment": analyze_sentiment(text),
            "toxicity": get_toxicity(text)
        }

        logger.info("Analysis completed. Response: %s", response)
        return jsonify(response)

    except Exception as e:
        logger.error("Error in /analyze endpoint: %s", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
