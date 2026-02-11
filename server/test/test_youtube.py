from utils.youtube_service import extract_video_id,test_youtube_connection,get_youtube_service



# Test 1: Connection
print("Testing Youtube Api connection...")
test_youtube_connection()

print("\n" + "=" * 50 + "\n")

# Test 2: Extract video Id
print("Testing Video Id extraction...")
test_urls = [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://youtu.be/dQw4w9WgXcQ",
    "https://m.youtube.com/watch?v=dQw4w9WgXcQ",
    "dQw4w9WgXcQ",
]

for url in test_urls:
    video_id = extract_video_id(url)
    print(f"URL: {url}")
    print(f"Extracted ID: {video_id}\n")

print("=" * 50 + "\n")

# Test 3 Fetching vdeo Details
print("Testing Api is fetching details or not")
youtube = get_youtube_service()
if youtube:
    try:
        request = youtube.videos().list(part="snippet,statistics", id="dQw4w9WgXcQ")
        response = request.execute()

        if response.get("items"):
            video = response["items"][0]
            print(f"Title: {video['snippet']['title']}")
            print(f"Channel: {video['snippet']['channelTitle']}")
            print(f"Views: {video['statistics']['viewCount']}")
            print(f"Comments: {video['statistics'].get('commentCount', 'N/A')}")
        else:
            print("No video found")
    except Exception as e:
        print(f"Error: {e}")
