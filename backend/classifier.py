import os
import pandas as pd
from nlp_utils import analyze_sentiment, analyze_toxicity
from fact_checker import fact_check_claim

# Paths to raw data categories
import os
import pandas as pd

CATEGORIES = ["hate", "sarcasm", "emoji", "sentiment", "misinformation", "toxicity"]

RAW_DATA_PATH = os.path.join("backend", "meta_classifier_proj", "data", "raw_data")

# Load raw data function
def load_data():
    """Loads datasets from different categories (hate, sarcasm, emoji, etc.)."""
    data_frames = []
    for category in CATEGORIES:
        category_path = os.path.join(RAW_DATA_PATH, category)
        if os.path.exists(category_path):
            for file in os.listdir(category_path):
                if file.endswith(".csv") or file.endswith(".json"):
                    file_path = os.path.join(category_path, file)
                    try:
                        if file.endswith(".csv"):
                            df = pd.read_csv(file_path)
                        else:
                            df = pd.read_json(file_path)

                        df["category"] = category  # Tag each row with the category
                        data_frames.append(df)

                    except Exception as e:
                        print(f"⚠️ Error loading {file}: {e}")

    if data_frames:
        return pd.concat(data_frames, ignore_index=True)
    else:
        print("❌ No data loaded — check your folder structure!")
        return pd.DataFrame()


# Meta classifier scoring logic
def calculate_meta_score(sentiment, toxicity, verdict):
    """Fusion scoring logic to determine how harmful the content is."""
    if toxicity > 0.7 or verdict == "False":
        return "high"
    if toxicity > 0.3 or verdict == "Mixed":
        return "medium"
    return "low"


# Analyze a piece of content using sentiment, toxicity, and fact-checking
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


# Load data at startup for pre-processing (optional)
if __name__ == "__main__":
    all_data = load_data()
    if not all_data.empty:
        print("✅ Data Loaded Successfully:")
        print(all_data.head())
