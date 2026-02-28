import requests
import os
from dotenv import load_dotenv
 
load_dotenv()

token = os.getenv("HUGGINGFACE_API_TOKEN") 

print(f"Token found: {token[:10]}..." if token else "❌ No token found")
print("\nTesting token with Hugging Face API...\n")

# Test 1: Check if token is valid
headers = {"Authorization": f"Bearer {token}"}
response = requests.get("https://huggingface.co/api/whoami", headers=headers)

print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")

if response.status_code == 200:
    print("\n✅ Token is valid!")
else:
    print("\n❌ Token issue detected")

# Test 2: Try new API endpoint format
print("\n" + "="*70)
print("Testing new Serverless Inference API...\n")

api_url = "https://router.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english"
payload = {"inputs": "I love this!"}

response = requests.post(api_url, headers=headers, json=payload)
print(f"Status: {response.status_code}")
print(f"Response: {response.text[:200]}")