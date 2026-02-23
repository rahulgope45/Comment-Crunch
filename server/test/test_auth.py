import requests

BASE_URL = "http://127.0.0.1:8000/api"

# 1. Login first
login_response = requests.post(
    f"{BASE_URL}/auth/login",
    data={
        "username": "zanmaykumar@gmail.com",
        "password": "123456"
    }
)

print("Login:", login_response.status_code)

# 2. Get cookies
cookies = login_response.cookies

# 3. Test protected route
protected_response = requests.post(
    f"{BASE_URL}/comments/fetch",
    json={"video_url": "https://youtube.com/watch?v=dQw4w9WgXcQ"},
    cookies=cookies
)

print("Fetch comments:", protected_response.status_code)
print("Response:", protected_response.json())