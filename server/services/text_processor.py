import re
from typing import Dict, Optional


class TextProcessor:
    """Service for cleaning and preprocessing comment text"""

    @staticmethod
    def clean_text(text: str) -> str:
        """
        Basic text cleaning operations

        Args:
            text: Raw comment text

        Returns:
            Cleaned text
        """
        if not text:
            return ""

        # Remove URLs
        text = re.sub(r"http\S+|www\.\S+", "", text)

        # Remove email addresses
        text = re.sub(r"\S+@\S+", "", text)

        # Remove extra whitespace
        text = " ".join(text.split())

        # Remove leading/trailing whitespace
        text = text.strip()

        return text

    @staticmethod
    def validate_comment(text: str) -> Dict[str, any]:
        """
        Validate if comment is suitable for processing

        Args:
            text: Comment text to validate

        Returns:
            Dict with validation result:
            {
                "is_valid": bool,
                "reason": str or None,
                "cleaned_text": str
            }
        """
        if not text:
            return {"is_valid": False, "reason": "too_short", "cleaned_text": ""}

        if re.search(r"http\S+|www\.\S+", text):
            return {
                "is_valid": False,
                "reason": "contains_link",
                "cleaned_text": TextProcessor.clean_text(text),
            }
        # Clean first
        cleaned = TextProcessor.clean_text(text)

        # Check 1: Minimum length
        if len(cleaned) < 3:
            return {"is_valid": False, "reason": "too_short", "cleaned_text": cleaned}

        # Check 2: Maximum length
        if len(cleaned) > 5000:
            return {"is_valid": False, "reason": "too_long", "cleaned_text": cleaned}

        # Check 3: Must have some alphabetic characters
        if not any(c.isalpha() for c in cleaned):
            return {
                "is_valid": False,
                "reason": "no_text_content",
                "cleaned_text": cleaned,
            }

        # Check 4: Alphabetic character ratio (avoid pure symbol spam)
        alpha_count = sum(c.isalpha() or c.isspace() for c in cleaned)
        alpha_ratio = alpha_count / len(cleaned) if len(cleaned) > 0 else 0

        if alpha_ratio < 0.3:
            return {
                "is_valid": False,
                "reason": "too_many_special_chars",
                "cleaned_text": cleaned,
            }

        # Check 5: Excessive capitalization (SPAM!!!)
        if len(cleaned) > 10:  # Only check for longer comments
            upper_count = sum(c.isupper() for c in cleaned)
            upper_ratio = upper_count / len(cleaned)

            if upper_ratio > 0.7:
                return {
                    "is_valid": False,
                    "reason": "excessive_caps",
                    "cleaned_text": cleaned,
                }

        # Check 6: Detect repeated characters (spammmmmm)
        if re.search(r"(.)\1{5,}", cleaned):  # Same char repeated 6+ times
            return {
                "is_valid": False,
                "reason": "repeated_characters",
                "cleaned_text": cleaned,
            }

        # All checks passed
        return {"is_valid": True, "reason": None, "cleaned_text": cleaned}

    @staticmethod
    def preprocess_for_sentiment(text: str) -> str:
        """
        Prepare text specifically for sentiment analysis
        Truncate to model's max length

        Args:
            text: Cleaned comment text

        Returns:
            Text ready for sentiment model (max 512 chars for safety)
        """
        # Most transformer models have 512 token limit
        # Rough approximation: 512 tokens ≈ 400-500 characters
        max_length = 500

        if len(text) > max_length:
            text = text[:max_length]

        return text
