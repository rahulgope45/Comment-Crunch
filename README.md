# 🌀 Comment Crunch
### **AI-Powered Community Sentiment Mapping**

**Comment Crunch** is a high-performance analytical tool designed for creators and agencies to "Know Their Community Better." By leveraging Natural Language Processing, it fetches YouTube comment streams and synthesizes them into actionable emotional insights using a modern, editorial interface.

---

## Features
* **Real-time Fetching:** Seamless integration with the YouTube Data v3 API.
* **Neural Sentiment Analysis:** Powered by HuggingFace models (RoBERTa) to detect nuanced emotional tones.
* **Data Synthesis:** Visualizes community feedback through interactive charts and summary metrics.
* **Spam Filtering:** Automatically identifies and filters rejected comment patterns.
* **Modern UX:** Minimalist editorial design with fluid Framer Motion transitions and responsive layouts.

---

## 🛠 Tech Stack

### Frontend
* **Framework:** React + TypeScript (Vite)
* **State Management:** Zustand
* **Styling:** TailwindCSS
* **Animations:** Framer Motion

### Backend
* **Language:** Python
* **Framework:** FastAPI
* **Database:** PostgreSQL (via Supabase)
* **ORM:** SQLAlchemy
* **AI Engine:** HuggingFace Inference API (Sentiment Analysis)

---

## Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/comment-crunch.git
cd comment-crunch
2. Setup Backend
cd server

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
# source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
3. Setup Frontend
cd frontend
npm install

# Ensure you have your .env variables set
npm run dev
Environment Variables
Backend (server/.env)
Key	Description
DATABASE_URL	Your PostgreSQL/Supabase connection string
SECRET_KEY	Random string for JWT/Security
YOUTUBE_API_KEY	Google Cloud Console API Key
HUGGINGFACE_API_TOKEN	HuggingFace Inference API Token
FRONTEND_URL	e.g., http://localhost:5173

ENVIRONMENT	development or production
Frontend (frontend/.env)
Key	Description
VITE_API_URL	http://localhost:8000
🤝 Connect With Me

Connect With Me
Portfolio: portfolio-2-two-ebon.vercel.app
LinkedIn: Rahul Gope