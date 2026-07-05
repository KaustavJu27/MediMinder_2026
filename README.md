# 💊 MediMinder – Smart Medicine Management Platform

A modern **full-stack medicine management platform** that helps users securely manage medicines, monitor expiry dates, organize prescriptions, and stay informed through an intuitive dashboard.

🌐 **Live Demo:** https://medi-minder-frontend.kaustav709.workers.dev

---

## 📸 Preview

> <img width="1887" height="908" alt="image" src="https://github.com/user-attachments/assets/51156a89-da2e-4dd8-a85f-66ebc972d80b" />


| Login |
|-------|
| <img width="1786" height="655" alt="image" src="https://github.com/user-attachments/assets/85e872aa-279c-418e-94ef-9b4b0b070aa5" />

| Dashboard |
|-----------|
| <img width="1911" height="846" alt="image" src="https://github.com/user-attachments/assets/ad54b2d9-2a96-4429-9b3c-8041f139f227" />

| Medicines | 
|------------|
| <img width="1911" height="537" alt="image" src="https://github.com/user-attachments/assets/29ee14d5-7d3d-40de-bbf7-4a1e127d2c97" />


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
