from services.sentiment_analyzer import SentimentAnalyzer

# Test comments with different sentiments
test_comments = [
    "This video is absolutely amazing! Best tutorial ever!", 
    "Meh, it's okay I guess. Nothing special.",
    "This is terrible. Waste of my time. Horrible content.",
    "Great explanation, really helped me understand!",
    "I don't like this approach, but I see what you mean.",
    "Garbage video, complete trash",
    "Thanks for sharing this information",
]

print("Testing Sentiment Analyzer")
print("="*70)
print("\nLoading model (this may take 10-30 seconds first time)...\n")
sentiment_totals = {"POSITIVE": 0, "NEGATIVE": 0, "NEUTRAL": 0}

for comment in test_comments:
    result = SentimentAnalyzer.analyze(comment)
    sentiment = result['sentiment'].upper()
    
    if sentiment in sentiment_totals:
        sentiment_totals[sentiment] += 1

for comment in test_comments:
    result = SentimentAnalyzer.analyze(comment)
    
    print(f"Comment: {comment[:60]}...")
    print(f"Sentiment: {result['sentiment'].upper()}")
    print(f"Confidence: {result['confidence']*100:.1f}%")
    print("-"*70)
    
for sentiment, count in sentiment_totals.items():
    print(f"{sentiment}: {count}")