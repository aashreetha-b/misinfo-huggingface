from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

from classifier import analyze_content
from redis_cache import cache_get, cache_set
from config import CACHE_TTL
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Load environment variables
load_dotenv()

# Flask setup
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


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
