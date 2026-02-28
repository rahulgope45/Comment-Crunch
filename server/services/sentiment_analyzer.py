import requests
import os
from typing import Dict
import logging
from dotenv import load_dotenv
import time 

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class SentimentAnalyzer:
    """Service for analyzing sentiment using Hugging Face API"""
    
    # NEW API endpoint (changed from api-inference to router)
    MODELS = [
        "distilbert-base-uncased-finetuned-sst-2-english",
        "cardiffnlp/twitter-roberta-base-sentiment-latest",
        "finiteautomata/bertweet-base-sentiment-analysis",
    ]
    
    API_TOKEN = os.getenv("HUGGINGFACE_API_TOKEN")
    _working_model = None
    
    @classmethod
    def get_api_url(cls, model_name: str) -> str:
        """Generate API URL for model - UPDATED ENDPOINT"""
        return f"https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment-latest"
    
    @classmethod
    def test_model(cls, model_name: str) -> bool:
        """Test if a model is available and working"""
        try:
            headers = {"Authorization": f"Bearer {cls.API_TOKEN}"}
            payload = {"inputs": "test"}
            
            response = requests.post(
                cls.get_api_url(model_name),
                headers=headers,
                json=payload,
                timeout=10
            )
            
            # 503 = model loading (OK)
            # 200 = working
            if response.status_code in [200, 503]:
                logger.info(f"✅ Model {model_name} is available")
                return True
            else:
                logger.warning(f"⚠️ Model {model_name} status: {response.status_code}")
                return False
                
        except Exception as e:
            logger.warning(f"⚠️ Model {model_name} test failed: {e}")
            return False
    
    @classmethod
    def find_working_model(cls):
        """Find first working model from the list"""
        if cls._working_model:
            return cls._working_model
        
        logger.info("Finding working sentiment model...")
        
        for model_name in cls.MODELS:
            logger.info(f"Testing {model_name}...")
            if cls.test_model(model_name):
                cls._working_model = model_name
                logger.info(f"✅ Using model: {model_name}")
                return model_name
        
        logger.error("❌ No working models found!")
        return None
    
    @classmethod
    def analyze(cls, text: str, max_retries: int = 2) -> Dict[str, any]:
        """Analyze sentiment of text using Hugging Face API"""
        if not text or len(text.strip()) == 0:
            return {
                "sentiment": "neutral",
                "confidence": 0.0,
                "label": "neutral"
            }
        
        if not cls.API_TOKEN:
            logger.error("❌ HUGGINGFACE_API_TOKEN not found")
            return {
                "sentiment": "neutral",
                "confidence": 0.0,
                "label": "error"
            }
        
        # Find working model
        model_name = cls.find_working_model()
        if not model_name:
            logger.error("No working sentiment model available")
            return {
                "sentiment": "neutral",
                "confidence": 0.0,
                "label": "error"
            }
        
        # Prepare request
        headers = {"Authorization": f"Bearer {cls.API_TOKEN}"}
        payload = {"inputs": text[:512]}
        api_url = cls.get_api_url(model_name)
        
        # Try with retries
        for attempt in range(max_retries):
            try:
                response = requests.post(api_url, headers=headers, json=payload, timeout=30)
                
                # Handle model loading
                if response.status_code == 503:
                    if attempt < max_retries - 1:
                        wait_time = 10 * (attempt + 1)
                        logger.warning(f"Model loading, waiting {wait_time}s...")
                        time.sleep(wait_time)
                        continue
                    else:
                        return {
                            "sentiment": "neutral",
                            "confidence": 0.0,
                            "label": "loading"
                        }
                
                response.raise_for_status()
                result = response.json()
                
                # Parse response
                if isinstance(result, list) and len(result) > 0:
                    top_result = result[0][0] if isinstance(result[0], list) else result[0]
                    
                    label = top_result['label'].lower()
                    score = top_result['score']
                    
                    # Normalize sentiment
                    if 'positive' in label or label == 'pos':
                        sentiment = 'positive'
                    elif 'negative' in label or label == 'neg':
                        sentiment = 'negative'
                    else:
                        sentiment = 'neutral'
                    
                    return {
                        "sentiment": sentiment,
                        "confidence": round(score, 4),
                        "label": top_result['label']
                    }
                else:
                    logger.error(f"Unexpected response: {result}")
                    return {
                        "sentiment": "neutral",
                        "confidence": 0.0,
                        "label": "error"
                    }
                    
            except requests.exceptions.RequestException as e:
                logger.error(f"API request failed (attempt {attempt + 1}): {e}")
                if attempt < max_retries - 1:
                    time.sleep(2)
                else:
                    return {
                        "sentiment": "neutral",
                        "confidence": 0.0,
                        "label": "error"
                    }
            except Exception as e:
                logger.error(f"Error: {e}")
                return {
                    "sentiment": "neutral",
                    "confidence": 0.0,
                    "label": "error"
                }
        
        return {
            "sentiment": "neutral",
            "confidence": 0.0,
            "label": "error"
        }