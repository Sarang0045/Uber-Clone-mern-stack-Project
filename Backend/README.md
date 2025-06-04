# User Registration API

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system.  
Requires user details including full name, email, and password.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, required): Minimum 3 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

## Responses

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| 201         | User registered successfully. Returns user and token. |
| 400         | Validation error or missing/invalid fields.      |
| 500         | Internal server error.                           |

### Example Success Response

```json
{
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
    // ...other fields
  },
  "token": "jwt_token_here"
}
```

### Example Error Response

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}

---

# User Login API

## Endpoint

`POST /users/login`

## Description

Authenticates a user and returns a JWT token if the credentials are valid.

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

## Responses

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| 200         | Login successful. Returns user and token.        |
| 400         | Validation error or missing/invalid fields.      |
| 401         | Invalid email or password.                       |
| 500         | Internal server error.                           |

### Example Success Response

```json
{
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
    // ...other fields
  },
  "token": "jwt_token_here"
}
```

### Example Error Response

```json
{
  "error": "Invalid email or password"
}
```

---

# User Profile API

## Endpoint

`GET /users/profile`

## Description

Returns the authenticated user's profile information.  
Requires a valid JWT token (sent via cookie or `Authorization` header).

## Responses

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| 200         | Returns the user's profile.                      |
| 401         | Unauthorized or missing/invalid token.           |

### Example Success Response

```json
{
  "_id": "user_id_here",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com"
  // ...other fields
}
```

---

# User Logout API

## Endpoint

`GET /users/logout`

## Description

Logs out the authenticated user by blacklisting the current JWT token and clearing the token cookie.  
Requires a valid JWT token (sent via cookie or `Authorization` header).

## Responses

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| 200         | Logout successful. Token is blacklisted.         |
| 401         | Unauthorized or missing/invalid token.           |

### Example Success Response

```json
{
  "message": "Logged out successfully"
}
```

---

# Captain Registration API

## Endpoint

`POST /captains/register`

## Description

Registers a new captain (driver) in the system.  
Requires captain details including full name, email, password, and vehicle information.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "janesmith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ1234",
    "type": "car",
    "capacity": 4
  }
}
```

### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.
- `vehicle.color` (string, required): Minimum 3 characters.
- `vehicle.plate` (string, required): Minimum 3 characters.
- `vehicle.type` (string, required): Must be one of `car`, `bike`, or `auto`.
- `vehicle.capacity` (integer, required): Minimum 1.

## Responses

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| 201         | Captain registered successfully. Returns captain and token. |
| 400         | Validation error or missing/invalid fields.      |
| 500         | Internal server error.                           |

### Example Success Response

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "janesmith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "type": "car",
      "capacity": 4
    }
    // ...other fields
  }
}
```

### Example Error Response

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}

---

# Captain Login API

## Endpoint

`POST /captains/login`

## Description

Authenticates a captain (driver) and returns a JWT token if the credentials are valid.

## Request Body

```json
{
  "email": "janesmith@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

## Responses

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| 200         | Login successful. Returns captain and token.      |
| 400         | Validation error or missing/invalid fields.      |
| 401         | Invalid email or password.                       |
| 500         | Internal server error.                           |

### Example Success Response

```json
{
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "janesmith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "type": "car",
      "capacity": 4
    }
    // ...other fields
  },
  "token": "jwt_token_here"
}
```

### Example Error Response

```json
{
  "error": "Invalid email or password"
}
```

---

# Captain Profile API

## Endpoint

`GET /captains/profile`

## Description

Returns the authenticated captain's profile information.  
Requires a valid JWT token (sent via cookie or `Authorization` header).

## Responses

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| 200         | Returns the captain's profile.                   |
| 401         | Unauthorized or missing/invalid token.           |

### Example Success Response

```json
{
  "captain": {
    "_id": "captain_id_here",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "janesmith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ1234",
      "type": "car",
      "capacity": 4
    }
    // ...other fields
  }
}
```

---

# Captain Logout API

## Endpoint

`GET /captains/logout`

## Description

Logs out the authenticated captain by blacklisting the current JWT token and clearing the token cookie.  
Requires a valid JWT token (sent via cookie or `Authorization` header).

## Responses

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| 200         | Logout successful. Token is blacklisted.         |
| 401         | Unauthorized or missing/invalid token.           |

### Example Success Response

```json
{
  "message": "Logged out successfully"
}
```

---

# Map & Routing Features

## Overview

This project provides map-based features for address geocoding and route calculation, enabling users to:

- Convert a textual address into geographic coordinates (latitude and longitude).
- Calculate driving distance and estimated travel time between two locations.

## Technologies & Open Source Services Used

- **MapLibre GL JS**:  
  Used on the frontend for rendering interactive maps. MapLibre is an open-source mapping library compatible with Mapbox GL JS v1.

- **OpenStreetMap (OSM) Nominatim API**:  
  Used for geocoding (converting addresses to coordinates).  
  [Nominatim](https://nominatim.openstreetmap.org/) is a free, open-source geocoding service based on OpenStreetMap data.

- **OSRM (Open Source Routing Machine)**:  
  Used for calculating driving routes, distances, and estimated times between coordinates.  
  [OSRM](http://project-osrm.org/) is a high-performance open-source routing engine for road networks.

- **Axios**:  
  Used in the backend to make HTTP requests to Nominatim and OSRM APIs.

## API Endpoints

### Get Coordinates

`GET /maps/get-coordinates?address=ADDRESS_STRING`

- Returns the latitude and longitude for a given address.
- Requires user authentication.

### Get Distance and Time

`GET /maps/get-distance-time?origin=ORIGIN_ADDRESS&destination=DESTINATION_ADDRESS`

- Returns the driving distance and estimated duration between two addresses.
- Requires user authentication.

## Example Workflow

1. **Geocoding**:  
   The backend receives an address, queries the Nominatim API, and returns the coordinates.

2. **Routing**:  
   The backend receives two addresses, converts both to coordinates, then queries the OSRM API to get the driving route, distance, and estimated time.

## Why Open Source?

- All map and routing features are built using open-source technologies and public APIs, ensuring no vendor lock-in and no usage fees for basic features.

---

# Ride API

## Create Ride

**Endpoint:**  
`POST /rides/create`

**Authentication:**  
Bearer token required (user must be authenticated)

**Request Body:**
```json
{
  "pickup": "Pickup address as string (min 5 chars)",
  "destination": "Destination address as string (min 5 chars)",
  "vehicleType": "auto | car | moto"
}
```

**Validation:**
- `pickup`: string, required, min 5 characters
- `destination`: string, required, min 5 characters
- `vehicleType`: one of `auto`, `car`, `moto`

**Response (201 Created):**
```json
{
  "message": "Ride created successfully",
  "ride": {
    "id": "ride_id",
    "user": "user_id",
    "pickup": "Pickup address",
    "destination": "Destination address",
    "fare": 123,
    "otp": "123456", // Only in development
    "distance": "12.34 km",
    "duration": "25 min",
    "status": "pending"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation errors or address not found
- `500 Internal Server Error`: Unexpected server error

**Example Request:**
```bash
curl -X POST https://your-api-url/rides/create \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "pickup": "MG Road, Bengaluru",
    "destination": "Indiranagar, Bengaluru",
    "vehicleType": "auto"
  }'
```
