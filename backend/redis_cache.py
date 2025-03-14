import redis
from config import REDIS_URL

# Connect to Redis
cache = redis.Redis.from_url(REDIS_URL, decode_responses=True)

def cache_get(key):
    """Fetch result from cache by key."""
    return cache.get(key)

def cache_set(key, value, ttl=300):
    """Store result in cache with TTL."""
    cache.setex(key, ttl, value)
