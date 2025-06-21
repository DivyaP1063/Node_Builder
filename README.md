# React + Vite Frontend with Python Backend (API: /pipelines/parse)

This project is a simple full-stack setup using:

- ⚛️ **Frontend**: React + Vite (runs on `http://localhost:8080`)
- 🐍 **Backend**: Python (Flask or FastAPI, runs on `http://localhost:8000`)
- 🔗 **API Used**: `POST http://localhost:8000/pipelines/parse`

---

## 📁 Project Structure

```
project-root/
├── backend/                # Python backend
│   ├── main.py
│   └── requirements.txt
├── public/
├── src/                    # React source
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🧠 Backend Setup

### 1. Navigate to backend folder

```bash
cd backend
```

### 2. Start the backend server

For **FastAPI**:

```bash
uvicorn main:app --reload --port 8000
```

> Backend will be available at: `http://localhost:8000`

---

## 🌐 Frontend Setup

### 1. Go to project root

```bash
cd ..
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run Vite dev server on port 8080

```bash
npm run dev -- --port 8080
```

> Frontend will run on: `http://localhost:8080`

---


