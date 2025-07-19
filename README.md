# 📢 MSC Announcements

A full-stack announcement management app built with **React**, **Node.js**, and **Express** — integrating **Clerk** for secure authentication, **Firebase Firestore** for the database, **Zustand** for global state management, and **Lucide React** for elegant icons. The app features full **CRUD operations** and supports a seamless **light/dark theme switcher**.

---

## 🚀 Tech Stack

### 🌐 Frontend
- **React.js** – UI components and SPA architecture
- **Tailwind CSS** – Utility-first CSS framework
- **Lucide React** – Icon library
- **Zustand** – Lightweight and scalable state management
- **Clerk React SDK** – For user authentication and session management

### 🔧 Backend
- **Node.js + Express.js** – REST API server
- **Firebase Firestore** – Real-time NoSQL cloud database
- **Clerk SDK (Node)** – Secure route protection without needing JWT manual handling

---

## 🔐 Authentication (Clerk)
- Clerk provides:
  - Prebuilt Sign-In / Sign-Up interfaces
  - Secure, serverless authentication
  - Middleware `requireAuth` to protect Express routes
  - Access to `req.auth.userId` without decoding tokens manually

---

## 🌟 Features

✅ **Clerk Authentication (Sign In/Sign Out)**  
✅ **Create, Update, and Delete Announcements**  
✅ **Get Announcements per User**  
✅ **Zustand-powered Theme Store (Light/Dark)**  
✅ **Dynamic UI that adapts to selected theme**  
✅ **Lucide React Icons for modern UI/UX**  
✅ **Responsive Design with Tailwind CSS**  
✅ **Firebase Firestore integration for real-time data**


---

## 🧠 State Management

Zustand is used for:
- Managing the selected theme
- Holding and syncing announcement data across components
- Providing a global and minimal-reactive store

---

## 💡 UI & Theming

- Theme switcher allows users to toggle between **light** and **dark** mode.
- The selected theme is persisted via Zustand and applied dynamically.
- Backgrounds and UI elements adapt without page reloads.

---

## 📂 API Routes

| Method | Endpoint                         | Description                    | Auth Required |
|--------|----------------------------------|--------------------------------|----------------|
| GET    | `/api/announcements/getannouncement` | Get all announcements (user-specific) | ✅ |
| POST   | `/api/announcements/postannouncement` | Create new announcement         | ✅ |
| PUT    | `/api/announcements/updateannouncement/:id` | Update an announcement         | ✅ |
| DELETE | `/api/announcements/deleteannouncement/:id` | Delete an announcement         | ✅ |

---





# 📢 THANK YOU

---


