import time
from typing import Dict, Any, Optional

class ElectionDataService:
    """
    Service with a 24h caching mechanism to optimize efficiency.
    """
    def __init__(self):
        self._cache: Dict[str, Dict[str, Any]] = {}
        self._cache_expiry = 24 * 60 * 60  # 24 hours in seconds

    def get_election_data(self, location_id: str) -> Optional[Dict[str, Any]]:
        current_time = time.time()
        
        if location_id in self._cache:
            cache_entry = self._cache[location_id]
            if current_time - cache_entry['timestamp'] < self._cache_expiry:
                return cache_entry['data']
                
        # Simulate an external API call to fetch election data
        data = {
            "location": location_id, 
            "next_election": "2026-11-03",
            "status": "active"
        }
        
        self._cache[location_id] = {
            "timestamp": current_time,
            "data": data
        }
        
        return data
