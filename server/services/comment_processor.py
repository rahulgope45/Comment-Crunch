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
        """Process a single comment through text validation"""
        # Cleaning the text
        validation_result = TextProcessor.validate_comment(comment_text)

        if not validation_result["is_valid"]:
            return {
                "is_valid": False,
                "cleaned_text": validation_result["cleaned_text"],
                "processed_text": None,
                "sentiment": None,
                "sentiment_confidence": None,
                "rejection_reason": validation_result["reason"],
            }

        # Preparing for sentiment analysis
        cleaned_text = validation_result["cleaned_text"]
        processed_text = TextProcessor.preprocess_for_sentiment(cleaned_text)

        return {
            "is_valid": True,
            "cleaned_text": cleaned_text,
            "processed_text": processed_text,
            "sentiment": None,  # Will be filled by batch processing
            "sentiment_confidence": None,
            "rejection_reason": None,
        }

    @staticmethod
    def process_batch(comments: List[Dict]) -> Dict[str, any]:
        """
        Process multiple comments in batch
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
        
        # Step 1: Clean and validate all comments
        logger.info(f"Validating {len(comments)} comments...")
        valid_comments = []

        for comment in comments:
            text = comment.get("text_original", "")
            result = CommentProcessor.process_comment(text)

            # Add processing results to comment
            comment["is_valid"] = result["is_valid"]
            comment["cleaned_text"] = result["cleaned_text"]
            comment["sentiment"] = result["sentiment"]
            comment["sentiment_confidence"] = result["sentiment_confidence"]

            if result["is_valid"]:
                comment["processed_text"] = result["processed_text"]
                valid_comments.append(comment)
                stats["valid"] += 1
                
                # REMOVED: Don't count sentiment here - it's still None!
                # Sentiment will be counted after analysis below

            else:
                stats["rejected"] += 1
                # Track rejection reason
                reason = result["rejection_reason"]
                stats["rejection_reasons"][reason] = (
                    stats["rejection_reasons"].get(reason, 0) + 1
                )

            processed_comments.append(comment)
        
        # Step 2: Analyze sentiment for valid comments in batches
        if valid_comments:
            logger.info(f"Analyzing sentiment for {len(valid_comments)} valid comments...")
            
            # Process in chunks of 10
            BATCH_SIZE = 10
            for i in range(0, len(valid_comments), BATCH_SIZE):
                batch = valid_comments[i:i + BATCH_SIZE]
                
                # Analyze each comment in batch
                for comment in batch:
                    sentiment_result = SentimentAnalyzer.analyze(
                        comment['processed_text'],
                        max_retries=1  # Reduced to 1 for speed
                    )
                    
                    comment["sentiment"] = sentiment_result["sentiment"]
                    comment["sentiment_confidence"] = sentiment_result["confidence"]
                    
                    # Count sentiment ONLY here, after analysis
                    if sentiment_result["sentiment"] == "positive":
                        stats["positive"] += 1
                    elif sentiment_result["sentiment"] == "negative":
                        stats["negative"] += 1
                    else:
                        stats["neutral"] += 1
        
        logger.info(
            f"Processed {stats['total']} comments: {stats['valid']} valid, {stats['rejected']} rejected"
        )
        logger.info(
            f"Sentiment: {stats['positive']} positive, {stats['neutral']} neutral, {stats['negative']} negative"
        )

        return {
            "processed": processed_comments,
            "stats": stats
        }