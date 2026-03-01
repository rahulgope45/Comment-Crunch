from typing import Dict, List
import logging
from services.text_processor import TextProcessor
from services.sentiment_analyzer import SentimentAnalyzer

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class CommentProcessor:
    """
    Service for processing comments through the complete pipeline:
    1. Text cleaning/validation
    2. Sentiment analysis
    """

    @staticmethod
    def process_comment(comment_text: str) -> Dict[str, any]:
        """
        Process a single comment through the pipeline

        Args:
            comment_text: Raw comment text

        Returns:
            Dict with processing results:
            {
                "is_valid": bool,
                "cleaned_text": str,
                "sentiment": str or None,
                "sentiment_confidence": float or None,
                "rejection_reason": str or None
            }

        """
        # Cleaning the text
        validation_result = TextProcessor.validate_comment(comment_text)

        if not validation_result["is_valid"]:
            return {
                "is_valid": False,
                "cleaned_text": validation_result["cleaned_text"],
                "sentiment": None,
                "sentiment_confidence": None,
                "rejection_reason": validation_result["reason"],
            }

        # Preparing for sentiment analysis

        cleaned_text = validation_result["cleaned_text"]
        processed_text = TextProcessor.preprocess_for_sentiment(cleaned_text)

        # analyze sentiment
        sentiment_result = SentimentAnalyzer.analyze(processed_text)

        return {
            "is_valid": True,
            "cleaned_text": cleaned_text,
            "sentiment": sentiment_result["sentiment"],
            "sentiment_confidence": sentiment_result["confidence"],
            "rejection_reason": None,
        }

    @staticmethod
    def process_batch(comments: List[Dict]) -> Dict[str, any]:
        """
            Process multiple comments in batch

        Args:
            comments: List of comment dicts with 'text_original' field

        Returns:
            Dict with batch results:
            {
                "processed": List of processed comments,
                "stats": {
                    "total": int,
                    "valid": int,
                    "rejected": int,
                    "positive": int,
                    "neutral": int,
                    "negative": int
                }
            }
        """

        processed_comments = []
        stats = {
            "total": len(comments),
            "valid": 0,
            "rejected": 0,
            "positive": 0,
            "neutral": 0,
            "negative": 0,
            "rejection_reasons": {},
        }

        for comment in comments:
            text = comment.get("text_orignal", "")
            result = CommentProcessor.process_comment(text)

        # processing results to comment
        comment["is_valid"] = result["is_valid"]
        comment["cleaned_text"] = result["cleaned_text"]
        comment["sentiment"] = result["sentiment"]
        comment["sentiment_confidence"] = result["sentiment_confidence"]

        if result["is_valid"]:
            stats["valid"] = +1

            if result["sentiment"] == "positive":
                stats["positive"] = +1

            elif result["sentiment"] == "negative":
                stats["negative"] = +1

            else:
                stats["neutral"] = +1

        else:
            stats["rejected"] = +1

            # Rejection reson
            reason = result["rejection_reason"]
            stats["rejection_reasons"][reason] = (
                stats["rejection_reasons"].get(reason, 0) + 1
            )

        processed_comments.append(comment)

        logger.info(
            f"Processed {stats['total']} comments: {stats['valid']} valid, {stats['rejected']} rejected"
        )

        return {
            "processed": processed_comments,
            "stats": stats
            }
