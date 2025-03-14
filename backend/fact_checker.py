import requests
from config import GOOGLE_SEARCH_API_KEY, GOOGLE_CSE_ID, DEFAULT_VERDICT

def fact_check_claim(text):
    """Perform fact-checking using Google Custom Search API or Wikipedia."""
    search_url = (
        f"https://www.googleapis.com/customsearch/v1?q={text}&key={GOOGLE_SEARCH_API_KEY}&cx={GOOGLE_CSE_ID}"
    )

    try:
        response = requests.get(search_url)
        data = response.json()

        if "items" in data and len(data["items"]) > 0:
            return {
                "claim": text,
                "source": data["items"][0]["title"],
                "verdict": "True" if "fact check" in data["items"][0]["title"].lower() else "Mixed",
            }

        return {"claim": text, "source": "No verified source", "verdict": DEFAULT_VERDICT}

    except Exception as e:
        print(f"Fact-checking failed: {e}")
        return {"claim": text, "source": "Error", "verdict": DEFAULT_VERDICT}
