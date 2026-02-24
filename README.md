
---

# 🎨 TeamSync Hub

## Real-Time Collaborative Whiteboard

> A fast, secure, and self-hosted whiteboard that allows multiple users to draw and brainstorm together in real time.



---

## 🚀 Why This Project?

Many online whiteboards suffer from:

* ⏳ delay while drawing
* 🔒 privacy & data security concerns
* 🧩 too many complex features

Even small delays can interrupt idea flow during technical discussions.

---

## ✨ Our Solution

**TeamSync Hub** is designed to provide **fast, secure, and distraction-free collaboration**.

### ✔ Real-Time Drawing

Users see strokes instantly using WebSockets.

### ✔ High Performance

Handles up to **270.4 requests per second** per session.

### ✔ Privacy & Security

Runs on your own system — no third-party cloud storage.

### ✔ Simple Workflow

Minimal interface with essential tools only.

---

## 🛠 Tech Stack

### 🎨 Frontend

* React.js
* HTML5 Canvas API
* Tailwind CSS
* SockJS + STOMP (WebSocket communication)

### ⚙ Backend

* Spring Boot (Java)
* WebSocket Broker (STOMP protocol)
* Spring Security + JWT authentication
* Spring Data JPA

### 🗄 Infrastructure

* MySQL 8.0
* Docker & Docker Compose
* Containerized deployment

---

## ⚙ How It Works (Simple)

1️⃣ User opens the whiteboard
2️⃣ When a user draws, the data is sent to the server
3️⃣ Server broadcasts updates to all users
4️⃣ Everyone sees drawings instantly

---

## 🚀 Features

✅ Real-time multi-user drawing
✅ Secure login & authentication
✅ Save board as image
✅ Jumbo erase tool
✅ Smooth & responsive canvas
✅ Docker-based deployment

---

## 🧪 Testing & Performance

The system was tested using professional tools:

| Tool               | Purpose               | Result          |
| ------------------ | --------------------- | --------------- |
| PowerShell Scripts | Load testing          | **270.4 RPS**   |
| wscat              | WebSocket testing     | ~323 ms latency |
| Postman            | API & JWT testing     | ✅ Verified      |
| Docker             | Deployment testing    | ✅ Verified      |
| Chrome DevTools    | Frame rate monitoring | **60 FPS**      |

---

## 📂 Project Structure

```
TeamSync-Hub/
├── backend/        → Spring Boot server & WebSocket broker
├── frontend/       → React whiteboard interface
├── docker-compose.yml → run entire system
├── load_test.ps1   → performance testing
└── perf_test.js    → benchmarking
```

---

## 📦 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Sowmya14aa/TeamSync-Hub.git
cd TeamSync-Hub
```

### 2️⃣ Run with Docker

```bash
docker-compose up --build
```

### 3️⃣ Open in Browser

Frontend → [http://localhost:5173](http://localhost:5173)
Backend → [http://localhost:8080](http://localhost:8080)

---

## 🔐 Security Highlights

* JWT-based authentication
* Stateless session handling
* Secure WebSocket communication
* Fully self-hosted deployment

---

## 🌍 Use Cases

✔ Technical brainstorming
✔ Software architecture design
✔ Classroom collaboration
✔ Remote team discussions
✔ Agile sprint planning

---

## 👩‍💻 Authors

**Sowmya Indurthi**
**Gopichand Darla**
M.Tech CSE — VIT-AP University

---

## ⭐ Project Value

This project demonstrates:

✔ Full-stack development
✔ Real-time system design
✔ WebSocket communication
✔ Security implementation
✔ Docker deployment & scalability
✔ Performance testing & optimization

---

## 📌 Future Improvements

* Multi-board support
* Live user cursors
* Role-based permissions
* Redis for horizontal scaling
* Version history & playback

---

