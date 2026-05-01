from abc import ABC, abstractmethod
from typing import Dict, Any, List

class ElectionStrategy(ABC):
    """
    Strategy Pattern interface for different election types.
    """
    @abstractmethod
    def get_milestones(self) -> List[Dict[str, Any]]:
        pass

class LocalElectionStrategy(ElectionStrategy):
    def get_milestones(self) -> List[Dict[str, Any]]:
        return [
            {"id": 1, "title": "Check Local Registration", "status": "pending"},
            {"id": 2, "title": "Find Town Hall", "status": "pending"},
            {"id": 3, "title": "Vote for Mayor", "status": "pending"}
        ]

class NationalElectionStrategy(ElectionStrategy):
    def get_milestones(self) -> List[Dict[str, Any]]:
        return [
            {"id": 1, "title": "Check Federal Registration", "status": "pending"},
            {"id": 2, "title": "Review Presidential Candidates", "status": "pending"},
            {"id": 3, "title": "Vote Nationally", "status": "pending"}
        ]

class ElectionContext:
    def __init__(self, strategy: ElectionStrategy):
        self._strategy = strategy

    def set_strategy(self, strategy: ElectionStrategy):
        self._strategy = strategy

    def get_election_plan(self) -> List[Dict[str, Any]]:
        return self._strategy.get_milestones()
