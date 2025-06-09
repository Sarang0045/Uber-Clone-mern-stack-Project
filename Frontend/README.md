# Uber Clone Frontend (React, Tailwind CSS, MapLibre, Socket.IO)

## 1. Project Overview

This is the **frontend** for an Uber-like ride-hailing application.  
It provides a modern, responsive user interface for booking rides, live tracking, driver/captain management, and real-time ride status updates.

**Tech Stack:**
- **React.js** (UI & SPA)
- **Tailwind CSS** (utility-first styling)
- **MapLibre GL JS** (open-source interactive maps)
- **Socket.IO Client** (real-time communication)
- **Axios** (HTTP requests)
- **Remixicon** (icon set)
- **GSAP** (animations)

---

## 2. Folder Structure Explanation

- `src/components/`  
  Reusable UI components (Map, VehiclePanel, RidePopUp, LogoutButton, etc.)
- `src/pages/`  
  Page-level components (Home, Login, Signup, CaptainHome, Riding, etc.)
- `src/contexts/`  
  Context API providers for global state (UserContext, CaptainContext, SocketContext)
- `src/services/`  
  (If present) Axios API call functions, backend communication helpers
- `src/utils/` or `src/helpers/`  
  Utility functions (geolocation, formatting, etc.)
- `src/assets/`  
  Images, icons, and static files
- `src/index.css`  
  Global styles and Tailwind imports
- `src/App.jsx`  
  Main app component, sets up routes and context providers

---

## 3. Routing

- **React Router DOM** is used for client-side routing.
- Main routes/pages:
  - `/` - Start/Landing page
  - `/login` - User login
  - `/signup` - User registration
  - `/home` - User dashboard (protected)
  - `/riding` - User ride in progress (protected)
  - `/logout` - User logout (protected)
  - `/captain-login` - Captain/driver login
  - `/captain-signup` - Captain registration
  - `/captain-home` - Captain dashboard (protected)
  - `/captain-riding` - Captain ride in progress (protected)
  - `/captain-logout` - Captain logout (protected)

---

## 4. State Management

- **React Hooks** (`useState`, `useEffect`) for local state.
- **Context API** for global state:
  - `UserContext` (user info, auth)
  - `CaptainContext` (captain info, auth)
  - `SocketContext` (socket connection and events)
- **localStorage** is used to persist tokens (`userToken`, `captainToken`) for authentication.

---

## 5. Map Integration (MapLibre)

- **MapLibre GL JS** is used to render interactive maps.
- Maps are shown on the home, riding, and captain pages.
- **Markers** are added for user and driver locations.
- **Geolocation**: Uses browser geolocation API to track and update user/driver position in real time.
- **LiveTracking** component handles map rendering and marker updates.

---

## 6. Socket.IO Usage

- **Socket.IO Client** connects to the backend for real-time updates.
- Used for:
  - Live driver/captain location updates
  - Real-time ride status (ride confirmed, started, ended)
  - Notifying captains of new ride requests
- Socket events are managed in `SocketContext` and used throughout the app.

---

## 7. API Communication

- **Axios** is used for all HTTP requests to the backend.
- Handles:
  - User and captain authentication (login, register, logout)
  - Ride creation, fare calculation, ride status updates
  - Map/geolocation queries (address suggestions, distance, etc.)
- API endpoints are defined in the backend and called from services or directly in components.

---

## 8. Responsive Design

- **Mobile-first and fully responsive** using Tailwind CSS utility classes.
- Uses `vw`, `vh`, `%`, and responsive Tailwind classes for layout.
- Media queries and flex/grid layouts ensure the app works on all screen sizes.
- Tested on real mobile devices and browser mobile emulation.

---

## 9. Environment Variables

Create a `.env` file in the root of the frontend project with:

```env
VITE_BASE_URL=http://localhost:4000         # Backend API base URL
VITE_MAPTILER_KEY=your_maptiler_api_key     # MapTiler API key for MapLibre (if used)
```

- `VITE_BASE_URL`: Backend server URL (change for production)
- `VITE_MAPTILER_KEY`: MapTiler key for map tiles (get from maptiler.com or use open source)

---

## 10. Running the Project Locally

```bash
npm install
npm run dev
```

- The app will be available at `http://localhost:5173` (or as shown in your terminal).

---

## 11. Important Features

- User and Captain login/register with validation
- Live interactive map with user and driver markers
- Real-time ride status and driver location via Socket.IO
- Responsive, mobile-friendly UI
- Animated panels and popups (GSAP)
- Secure logout and protected routes

---

## 12. Dependencies

- `react` / `react-dom` - Main React library
- `react-router-dom` - Routing
- `axios` - HTTP requests
- `maplibre-gl` - Open-source map rendering
- `socket.io-client` - Real-time communication
- `tailwindcss` - Utility-first CSS framework
- `remixicon` - Icon set
- `gsap` / `@gsap/react` - Animations
- `react-toastify` - Toast notifications

---

## 13. Screenshots (Optional)

> Add screenshots or demo GIFs here to showcase the UI and features.  
> Example:
> ![Home Page Screenshot](./assets/home-screenshot.png)

---

## 14. Deployment (Optional)

- You can deploy the frontend on [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or any static hosting.
- Make sure to set the correct environment variables for production.
- Example:
  - Set `VITE_BASE_URL` to your deployed backend URL.

---

**Questions or Issues?**  
Open an issue or contact the maintainer.
