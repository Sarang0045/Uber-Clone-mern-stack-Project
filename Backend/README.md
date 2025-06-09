# Uber Clone Backend (Node.js, Express, MongoDB, Socket.IO)

## 1. Project Overview

This is the backend for an Uber-like ride-hailing application built with the MERN stack.  
It provides RESTful APIs and real-time features for user registration, authentication, ride management, live driver tracking, and more.

**Technologies Used:**
- Node.js & Express.js (server and routing)
- MongoDB & Mongoose (database and ODM)
- Socket.IO (real-time communication)
- JWT (authentication)
- OpenStreetMap, OSRM, MapLibre (maps, geocoding, routing)
- Other utilities: bcrypt, dotenv, axios, etc.

**Key Features:**
- User and Captain (driver) registration & authentication
- Secure JWT-based auth with token blacklisting on logout
- Ride creation, fare calculation, and status management
- Real-time location updates and ride status via Socket.IO
- Geocoding and routing using open-source APIs
- Modular, scalable codebase

---

## 2. Folder Structure Explanation

| Folder/File      | Purpose                                                                 |
|------------------|-------------------------------------------------------------------------|
| `routes/`        | Express route definitions for users, captains, rides, maps, etc.        |
| `controllers/`   | Request handlers for each route; business logic entry points            |
| `models/`        | Mongoose schemas for User, Captain, Ride, etc.                          |
| `services/`      | Business logic, helpers, and integrations (e.g., map, ride, user logic) |
| `middlewares/`   | Express middleware (auth, validation, etc.)                             |
| `socket.js`      | Socket.IO server setup and event handlers                               |
| `db/`            | Database connection logic                                               |
| `app.js`         | Express app setup (middleware, routes, etc.)                            |
| `server.js`      | Entry point, creates HTTP server and attaches Socket.IO                 |
| `.env`           | Environment variables                                                   |

---

## 3. API Routes Documentation

### **User Routes**
| Method | Route                | Description                       |
|--------|----------------------|-----------------------------------|
| POST   | `/users/register`    | Register a new user               |
| POST   | `/users/login`       | User login, returns JWT           |
| GET    | `/users/profile`     | Get authenticated user's profile  |
| GET    | `/users/logout`      | Logout user (blacklist token)     |

### **Captain (Driver) Routes**
| Method | Route                 | Description                        |
|--------|-----------------------|------------------------------------|
| POST   | `/captains/register`  | Register a new captain/driver      |
| POST   | `/captains/login`     | Captain login, returns JWT         |
| GET    | `/captains/profile`   | Get authenticated captain profile  |
| GET    | `/captains/logout`    | Logout captain (blacklist token)   |

### **Ride Routes**
| Method | Route                  | Description                                 |
|--------|------------------------|---------------------------------------------|
| POST   | `/rides/create`        | Create a new ride (user)                    |
| GET    | `/rides/get-fare`      | Get fare estimate for a ride                |
| POST   | `/rides/confirm-ride`  | Captain accepts a ride                      |
| GET    | `/rides/start-ride`    | Captain starts a ride (with OTP)            |
| POST   | `/rides/end-ride`      | Captain ends a ride                         |

### **Map & Location Routes**
| Method | Route                       | Description                                 |
|--------|-----------------------------|---------------------------------------------|
| GET    | `/maps/get-coordinates`     | Geocode address to coordinates              |
| GET    | `/maps/get-distance-time`   | Get driving distance/time between addresses |
| GET    | `/maps/get-suggestions`     | Address autocomplete suggestions            |

---

## 4. Controllers and Services

- **Controllers**:  
  - `userController.js`, `captainController.js`, `rideController.js`, `mapsController.js`
  - Handle HTTP requests, validation, and responses.
- **Services**:  
  - `userServices.js`, `captainServices.js`, `rideService.js`, `mapServices.js`
  - Contain business logic, database queries, and external API calls.
- **Separation**:  
  - Controllers call services for all business/data logic, keeping controllers clean.

---

## 5. Models (Mongoose Schemas)

- **User**: Stores user info, email, password (hashed), socketId, etc.
- **Captain**: Stores driver info, vehicle details, status, location, socketId, etc.
- **Ride**: Stores ride details (user, captain, pickup, destination, fare, status, OTP, etc.)
- **BlackListToken**: Stores blacklisted JWTs for logout security.

---

## 6. Socket.IO Integration

- **Purpose**: Real-time updates for ride status, driver location, and notifications.
- **Events**:
  - `join`: User or captain joins with their socket ID.
  - `update-location-captain`: Captain sends live location updates.
  - `new-ride`: Server notifies captains of new ride requests.
  - `ride-confirmed`, `ride-started`, `ride-ended`: Server notifies users of ride status changes.

**Example:**
```js
io.on("connection", (socket) => {
  socket.on("join", ({ userId, role }) => { /* ... */ });
  socket.on("update-location-captain", ({ userId, location }) => { /* ... */ });
  // ...other events
});
```

---

## 7. Server Setup

- **Express app** is created in `app.js` (middleware, routes, error handling).
- **HTTP server** is created in `server.js` and passed to Socket.IO.
- **CORS**, JSON parsing, cookie parsing, and environment config are enabled.
- **Port** is set via `.env` (`PORT`) or defaults to 3000/4000.

---

## 8. Authentication

- **JWT tokens** are issued on login and required for protected routes.
- **Middleware** (`OuthMiddleware.js`) checks for valid tokens and blacklists.
- **Logout**: Blacklists the token and clears the cookie.

---

## 9. Environment Variables (.env)

| Variable         | Description                                 |
|------------------|---------------------------------------------|
| `PORT`           | Server port (default: 4000)                 |
| `MONGO_URI`      | MongoDB connection string                   |
| `JWT_SECRET`     | Secret key for JWT signing                  |
| `OPENROUTE_API_KEY` | (Optional) API key for routing services  |
| `NOMINATIM_BASE_URL` | (Optional) Base URL for geocoding API   |

---

## 10. Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Create a .env file (see above for required variables)

# 3. Start the server
node server.js
# or, if you use nodemon:
# npx nodemon server.js
```

---

## 11. Dependencies

| Package         | Purpose                                      |
|-----------------|----------------------------------------------|
| express         | Web server and routing                       |
| mongoose        | MongoDB ODM                                  |
| socket.io       | Real-time communication                      |
| bcrypt/bcryptjs | Password hashing                             |
| jsonwebtoken    | JWT authentication                           |
| cors            | Cross-origin resource sharing                |
| dotenv          | Environment variable management              |
| axios           | HTTP requests to external APIs               |
| express-validator | Request validation                         |
| cookie-parser   | Cookie parsing for auth                      |

---

## 12. Contributing & License Info

- **Contributions**: PRs and issues are welcome! Please fork and submit your changes.
- **License**: MIT or your preferred license.

---

**Questions?**  
Open an issue or contact the maintainer.
