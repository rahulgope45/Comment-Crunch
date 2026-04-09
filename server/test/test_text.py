import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from services.text_processor import TextProcessor

# Test cases
test_comments = [
    "Great video! Really helped me understand the concept.",
    "CHECK OUT MY CHANNEL!!!!! SUBSCRIBE NOW!!!!",
    "🔥🔥🔥🔥🔥",
    "This is terrible content",
    "a",  # Too short
    "Visit http://spam.com for more info!!!",
    "spammmmmmmmmmmmmm",
    "Normal comment with a link http://example.com that should be removed",
]

print("Testing Text Processor\n" + "="*50)

for i, comment in enumerate(test_comments, 1):
    print(f"\n{i}. Original: {comment[:50]}...")
    
    result = TextProcessor.validate_comment(comment)
    
    print(f"   Valid: {result['is_valid']}")
    print(f"   Reason: {result['reason']}")
    print(f"   Cleaned: {result['cleaned_text'][:50]}")
    
    if result['is_valid']:
        processed = TextProcessor.preprocess_for_sentiment(result['cleaned_text'])
        print(f"   For Sentiment: {processed[:50]}...")