# 🚖 Uber Clone (MERN Stack)

## 🛠️ Project Overview

This project is a full-stack Uber-like ride-booking application built using the MERN stack. It allows users to register, log in, book rides, and track drivers in real-time. The application features a modern, responsive UI and leverages real-time technologies for seamless ride updates.

**Key Technologies:**
- **MongoDB** – Database for storing users, rides, and driver data
- **Express.js** – Backend REST API framework
- **React.js** – Frontend UI library
- **Node.js** – Backend runtime environment
- **Tailwind CSS** – Utility-first CSS framework for styling
- **MapLibre** – Open-source interactive maps for live location tracking
- **Socket.IO** – Real-time bidirectional communication (driver updates, ride status)
- **JWT** – Secure authentication and authorization

**Features:**
- User registration and login with JWT authentication
- Real-time driver location updates via Socket.IO
- Live ride tracking on MapLibre maps
- Book rides and receive live ride status updates
- Fully responsive and mobile-friendly UI

---

## 🗂️ Folder Structure

```
client/     # Frontend React application
server/     # Backend Node.js/Express application
shared/     # (Optional) Shared code between client and server, if used
```

---

## 🚀 How to Run Locally (Laptop)

### 1. Clone the Repository

```bash
git clone https://github.com/Sarang0045/Uber-Clone-mern-stack-Project.git
cd Uber-Clone-mern-stack-Project
```

### 2. Install Dependencies

#### For the Backend

```bash
cd server
npm install
```

#### For the Frontend

```bash
cd ../client
npm install
```

### 3. Set Up Environment Variables

- Create a `.env` file in both `server/` and `client/` directories as needed.
- Add your MongoDB URI, JWT secret, and any API keys (e.g., for MapLibre).

---

## 🔑 Environment Variables

### Backend (`server/.env`)

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTE_API_KEY=your_openroute_api_key
NOMINATIM_BASE_URL=https://nominatim.openstreetmap.org
```

### Frontend (`client/.env`)

```env
VITE_BASE_URL=your_backend_api_url
VITE_MAPTILER_KEY=your_maptiler_key
```

Replace the placeholder values with your actual credentials and API keys.

---

## 📦 Deployment

- You can deploy the backend to platforms like Heroku, Render, or AWS.
- The frontend can be deployed to Vercel, Netlify, or similar services.
- Ensure environment variables are set correctly in production.

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

## 📄 License

This project is licensed under the MIT License.

---
