from nlp_utils import analyze_sentiment, analyze_toxicity
from fact_checker import fact_check_claim

def calculate_meta_score(sentiment, toxicity, verdict):
    """Fusion scoring logic to determine how harmful the content is."""
    if toxicity > 0.7 or verdict == "False":
        return "high"
    if toxicity > 0.3 or verdict == "Mixed":
        return "medium"
    return "low"

def analyze_content(text):
    """Perform sentiment, toxicity, and fact-check analysis on given text."""
    sentiment = analyze_sentiment(text)
    toxicity = analyze_toxicity(text)
    fact_check = fact_check_claim(text)

    meta_score = calculate_meta_score(sentiment, toxicity, fact_check["verdict"])

    feedback = (
        "✅ Content appears clear and safe."
        if meta_score == "low"
        else "⚠️ Potentially harmful or misleading content."
    )

    return {
        "sentiment": sentiment,
        "toxicity": toxicity,
        "fact_check": fact_check,
        "meta_score": meta_score,
        "feedback": feedback,
    }
