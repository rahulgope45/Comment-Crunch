import requests

BASE_URL = "http://127.0.0.1:8000/api"

session = requests.Session()

# Login
login_response = session.post(
    f"{BASE_URL}/auth/login",
    json={"email": "rahulgope@gmail.com", "password": "123456"},
)

print("Login:", login_response.status_code)
print("Login response:", login_response.text)

# Protected route
protected_response = session.post(
    f"{BASE_URL}/comments/fetch",
    json={"video_url": "https://youtube.com/watch?v=dQw4w9WgXcQ"},
)

print("Fetch comments:", protected_response.status_code)
print("Response:", protected_response.text)