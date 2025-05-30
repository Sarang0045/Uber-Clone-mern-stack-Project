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
