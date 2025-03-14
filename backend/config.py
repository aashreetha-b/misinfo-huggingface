import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Keys and Configurations
PERSPECTIVE_API_KEY = os.getenv("PERSPECTIVE_API_KEY")
GOOGLE_SEARCH_API_KEY = os.getenv("GOOGLE_SEARCH_API_KEY")
GOOGLE_CSE_ID = os.getenv("GOOGLE_CSE_ID")

# Redis Cache Config
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
CACHE_TTL = int(os.getenv("CACHE_TTL", 300))

# Hugging Face model config
HF_MODEL = os.getenv("HF_MODEL", "deepset/roberta-base-squad2")

# Fallback values
DEFAULT_VERDICT = "Unknown"
