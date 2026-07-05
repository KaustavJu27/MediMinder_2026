# 💊 MediMinder – Smart Medicine Management Platform

A modern **full-stack medicine management platform** that helps users securely manage medicines, monitor expiry dates, organize prescriptions, and stay informed through an intuitive dashboard.

🌐 **Live Demo:** https://medi-minder-frontend.kaustav709.workers.dev

---

## 📸 Preview

> *(Add screenshots here after taking them.)*

| Login | Dashboard |
|-------|-----------|
| Add Screenshot | Add Screenshot |

| Medicines | Notifications |
|------------|---------------|
| Add Screenshot | Add Screenshot |

---

# ✨ Features

- 🔐 Secure JWT Authentication
- 👤 User Registration & Login
- 💊 Add, Update & Delete Medicines
- 📅 Track Medicine Expiry Dates
- 📊 Dashboard with Medicine Statistics
- 🔔 Notification Management
- 🔍 Clean and Responsive UI
- ⚡ RESTful API Architecture
- ☁️ Production Deployment

---

# 🏗️ Architecture

```
                Frontend
      (React + TanStack Start)
                │
            Axios API
                │
                ▼
        Express.js REST API
                │
                ▼
          MongoDB Atlas
```

---

# 🛠 Tech Stack

### Frontend

- React
- TanStack Start
- TypeScript
- Tailwind CSS
- Axios
- React Context

### Backend

- Node.js
- Express.js
- JWT Authentication
- REST APIs

### Database

- MongoDB Atlas
- Mongoose

### Deployment

- Cloudflare Workers (Frontend)
- Render (Backend)

---

# 📂 Project Structure

```
MediMinder_2026
│
├── Backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── Frontend
│   ├── src
│   ├── components
│   ├── context
│   ├── services
│   ├── routes
│   ├── vite.config.ts
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/KaustavJu27/MediMinder_2026.git

cd MediMinder_2026
```

---

## Backend Setup

```bash
cd Backend

npm install

npm start
```

Create a `.env`

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY
```

---

## Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

---

# 🌍 Live Deployment

### Frontend

https://medi-minder-frontend.kaustav709.workers.dev

### Backend

https://mediminder-2026.onrender.com

---

# 🔐 Authentication

The application uses **JWT (JSON Web Token)** authentication.

Protected routes require a valid Bearer Token.

Authentication Flow

```
User
   │
   ▼
Register/Login
   │
   ▼
Backend Generates JWT
   │
   ▼
Token Stored
   │
   ▼
Protected API Requests
```

---

# 📡 REST API

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

## Medicines

```
GET    /api/medicines

POST   /api/medicines

PUT    /api/medicines/:id

DELETE /api/medicines/:id
```

## Dashboard

```
GET /api/dashboard
```

## Notifications

```
GET /api/notifications
```

---

# 📈 Future Improvements

- Email Reminder Notifications
- Medicine Image Upload
- OCR Prescription Scanner
- AI-based Medicine Suggestions
- Calendar Integration
- PWA Support
- Mobile App

---

# 👨‍💻 Author

**Kaustav Mondal**

GitHub

https://github.com/KaustavJu27

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
