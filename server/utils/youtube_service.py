from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import os
from dotenv import load_dotenv

load_dotenv()

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")


def get_youtube_service() :
    """
    Docstring for extract_video_id

    :param url: Description
    :type url: str
    :return: Description
    :rtype: str
    """
    try:
        youtube = build("youtube", "v3", developerKey=YOUTUBE_API_KEY)
        return youtube
    except Exception as e:
        print(f"Error initializing Youtube service: {e}")
        return None


def extract_video_id(url: str) -> str:
    """
    Docstring for extract_video_id

    :param url: Description
    :type url: str
    :return: Description
    :rtype: str
    """
    import re

    patterns = [
        r"(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})",
        r"(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})",
        r"(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})",
        r"(?:https?:\/\/)?(?:m\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})",
    ]
    
    for pattern in patterns:
        match = re.search(pattern,url)
        if match:
            return match.group(1)
        
        #If no pattern check for Video Id
        if re.match(r'^[a-zA-Z0-9_-]{11}$', url):
            return url
        
        #at last if nothing matches 
        return None

def test_youtube_connection():
    """
    Docstring for test_youtube_connection
    Test YouTube API connection
    Returns True if successful, False otherwise
    """
    try:
        youtube = get_youtube_service()
        if not youtube:
            return False
        
        #Simple request to verify API key is working or not
        request = youtube.videos().list(
            part='snippet',
            id='dQw4w9WgXcQ',
            maxResults=1
        )
        responce = request.execute()
        
        if responce.get('items'):
            print("Youtube API connection successfull")
            return True
        else:
            print("Youtube API returned no results")
            return False
        
    except HttpError as e:
        print(f"Youtube API Error: {e}")
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False
    
        
        