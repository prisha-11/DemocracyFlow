import re

class PIIScrubber:
    """
    Regex-based PII scrubber to prevent sensitive data logging or processing.
    """
    @staticmethod
    def scrub(text: str) -> str:
        if not text:
            return text
            
        # Scrub SSNs
        text = re.sub(r'\b\d{3}-\d{2}-\d{4}\b', '[REDACTED SSN]', text)
        # Scrub Emails
        text = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', '[REDACTED EMAIL]', text)
        # Scrub Phone Numbers
        text = re.sub(r'\b\d{3}[-.\s]??\d{3}[-.\s]??\d{4}\b', '[REDACTED PHONE]', text)
        
        return text
