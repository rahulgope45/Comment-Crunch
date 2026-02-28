import requests

API_URL = "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment-latest"
# headers = {"Authorization": "Bearer "} 

response = requests.post(API_URL, headers=headers, json={"inputs": "I love this!"})
print("Status:", response.status_code)
print(response.text)