from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

from classifier import analyze_content
from redis_cache import cache_get, cache_set
from config import CACHE_TTL
import logging
import requests

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Load environment variables
load_dotenv()

# Flask setup
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

FACT_CHECK_API_URL = "https://factchecktools.googleapis.com/v1alpha1/claims:search"
FACT_CHECK_API_KEY = os.getenv("FACT_CHECK_API_KEY")

def fact_check_query(query):
    """Query the Fact Check Tools API."""
    params = {
        'query': query,
        'key': FACT_CHECK_API_KEY,
    }
    response = requests.get(FACT_CHECK_API_URL, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        app.logger.error(f"Fact Check API error: {response.status_code}")
        return None

@app.route('/fact_check', methods=['POST'])
def fact_check():
    """Endpoint to handle fact-checking requests."""
    try:
        data = request.get_json()
        question = data.get("question", "").strip()

        if not question:
            return jsonify({"error": "No question provided"}), 400

        # Perform fact-checking
        fact_check_result = fact_check_query(question)

        if not fact_check_result or 'claims' not in fact_check_result:
            return jsonify({"verdict": "No relevant fact checks found."})

        # Extract relevant information from the fact-checking result
        claims = fact_check_result['claims']
        claim = claims[0]  # Taking the first claim as the most relevant
        claim_text = claim.get('text', 'No claim text available.')
        claim_review = claim.get('claimReview', [])
        if claim_review:
            reviewer = claim_review[0].get('publisher', {}).get('name', 'Unknown')
            title = claim_review[0].get('title', 'No title available.')
            url = claim_review[0].get('url', '#')
            review_date = claim_review[0].get('reviewDate', 'No review date available.')
            verdict = claim_review[0].get('textualRating', 'No verdict available.')
        else:
            reviewer = title = url = review_date = verdict = 'No review available.'

        result = {
            "claim": claim_text,
            "reviewer": reviewer,
            "title": title,
            "url": url,
            "review_date": review_date,
            "verdict": verdict,
        }

        return jsonify(result)

    except Exception as e:
        app.logger.error(f"Error: {e}", exc_info=True)
        return jsonify({"error": "Internal server error"}), 500



@app.route('/analyze', methods=['POST'])
def analyze():
    """Analyze text for misinformation, sentiment, and toxicity."""
    try:
        data = request.get_json()
        text = data.get("text", "").strip()

        if not text:
            return jsonify({"error": "No text provided"}), 400

        # Check cache first
        cached_result = cache_get(text)
        if cached_result:
            return jsonify(eval(cached_result))

        # Perform analysis
        result = analyze_content(text)

        # Cache the result with TTL
        cache_set(text, str(result), ttl=CACHE_TTL)
        return jsonify(result)

    except Exception as e:
        app.logger.error(f"Error: {e}", exc_info=True)
        return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, host=host, port=port)
