import pytest
from backend.services.pii_scrubber import PIIScrubber
from backend.utils.simplicity_filter import SimplicityFilter
from backend.services.election_data_service import ElectionDataService

def test_pii_scrubber():
    text = "My SSN is 123-45-6789 and email is user@example.com"
    scrubbed = PIIScrubber.scrub(text)
    assert "[REDACTED SSN]" in scrubbed
    assert "[REDACTED EMAIL]" in scrubbed
    assert "123-45-6789" not in scrubbed
    assert "user@example.com" not in scrubbed
    
def test_simplicity_filter():
    text = "We will utilize the system for verification"
    filtered = SimplicityFilter.process(text)
    assert filtered == "We will use the system for check"

def test_election_data_service_caching():
    service = ElectionDataService()
    data1 = service.get_election_data("loc1")
    data2 = service.get_election_data("loc1")
    assert data1 == data2  # Should return the identical cached dictionary

def test_pii_scrubber_empty():
    assert PIIScrubber.scrub("") == ""
    assert PIIScrubber.scrub(None) == None
