# Online Judge Backend

This document outlines the architecture, API endpoints, and overall flow of the Online Judge backend application.
This document outlines the architecture, API endpoints, and overall flow of the Online Judge backend application. It's built with Node.js and Express.js, designed to manage users, coding problems, user progress, and contests.

## Backend Flow

The backend is built using Node.js with Express.js. It handles user authentication, problem management, user progress tracking, and contest management.
The backend operates as follows:

1.  **Initialization**: The `server.js` file is the entry point. It initializes the Express application, configures middleware like CORS and cookie-parser, and loads environment variables using `dotenv`.
2.  **Database Connection**: It establishes a connection to MongoDB using Mongoose, managed by `database/db.js`.
3.  **Middleware Setup**:
    *   `express.json()`: Parses incoming JSON payloads.
    *   `cookieParser()`: Parses cookies attached to the client request object.
    *   `cors()`: Enables Cross-Origin Resource Sharing for the frontend application (`http://localhost:5173`).
4.  **Authentication Routes (`/auth`)**: Routes defined in `routes/authRoutes.js` (handled by `controllers/authController.js`) manage user registration, login, and logout. These routes are publicly accessible.
5.  **Authentication Middleware**: After the `/auth` routes, the `middleware/authMiddleware.js` (`authenticate`) is applied globally. This means all subsequent routes require a valid JSON Web Token (JWT) for authorization.
6.  **Protected API Routes**:
    *   `/problems`: Handled by `routes/problemRoutes.js` (inferred controllers), for managing coding problems.
    *   `/progress`: Handled by `routes/progressRoutes.js` (inferred controllers), for tracking user submissions and progress.
    *   `/contests`: Handled by `routes/contestRoutes.js` (inferred controllers), for managing coding contests.
7.  **Server Start**: The Express server starts listening on the port specified in the `.env` file (defaulting to 3000).
1.  **Application Startup**: The `server.js` file initiates the Express application, loads environment variables (`.env`), and sets up core middleware.
2.  **Database Connection**: A connection to MongoDB is established via `database/db.js`, ensuring the application can interact with the data store.
3.  **Global Middleware**:
    *   `express.json()`: Automatically parses incoming request bodies with JSON payloads.
    *   `cookieParser()`: Parses cookies from the request headers, making them available in `req.cookies`.
    *   `cors()`: Configured to allow requests from `http://localhost:5173`, enabling frontend-backend communication while handling credentials.
4.  **Public Authentication Routes**: Routes under `/auth` (defined in `routes/authRoutes.js` and handled by `controllers/authController.js`) are accessible without prior authentication. These include user registration, login, and logout functionalities.
5.  **Authentication Enforcement**: After the `/auth` routes, the `authenticate` middleware (`middleware/authMiddleware.js`) is applied. This middleware verifies the presence and validity of a JWT token in the request cookies. Any route defined *after* this middleware will require a valid token for access.
6.  **Protected API Routes**:
    *   **`/problems`**: Manages coding problems (e.g., fetching problem details, creating, updating, deleting problems).
    *   **`/progress`**: Handles user progress and submissions for problems.
    *   **`/contests`**: Manages coding contests (e.g., listing contests, creating new ones).
    These routes are linked to their respective route files (`problemRoutes.js`, `progressRoutes.js`, `contestRoutes.js`) and are protected by the authentication middleware.
7.  **Server Listening**: Finally, the Express server starts listening for incoming HTTP requests on the port specified in the `.env` file (defaulting to 3000).

```
User Request
      ↓
Express Server (server.js)
      ↓
Middleware (CORS, JSON Body Parser, Cookie Parser)
      ↓
Route Handling
      ├─ /auth routes (Public: Register, Login, Logout, GetMe)
      │      ↓
      └─ Authenticated routes (Requires JWT from /auth/login)
             ↓
             Authentication Middleware (authMiddleware.js)
             ↓
             Protected Routes:
               - /problems (Problem Management)
               - /progress (User Progress Tracking)
               - /contests (Contest Management)
                     ↓
                     Controllers
                     ↓
                     Models (User, Problem, Progress, Contest)
                     ↓
                     MongoDB (db.js)
                     ↓
Response to User
```

## API Endpoints

### Authentication Endpoints (`/auth`)
### Authentication Endpoints (`/auth`) - Publicly Accessible

These endpoints are handled by `controllers/authController.js`.

*   **`POST /auth/register`**
    *   **Description**: Registers a new user account with provided `firstName`, `lastName`, `email`, and `password`.
    *   **Request Body**: `firstName`, `lastName`, `email`, `password`
    *   **Response**: Success message or error.
    *   **Request Body**: `{ "firstName": "string", "lastName": "string", "email": "string", "password": "string" }`
    *   **Response**: `201 Created` with success message, or `400 Bad Request` if fields are missing or user exists.

*   **`POST /auth/login`**
    *   **Description**: Authenticates a user with `email` and `password`. On success, sets an HTTP-only JWT cookie.
    *   **Request Body**: `email`, `password`
    *   **Response**: Success message.
    *   **Request Body**: `{ "email": "string", "password": "string" }`
    *   **Response**: `200 OK` with success message, or `400 Bad Request` if credentials are invalid.

*   **`POST /auth/logout`**
    *   **Description**: Logs out the current user by clearing the authentication cookie.
    *   **Response**: Success message.
    *   **Response**: `200 OK` with success message.

*   **`GET /auth/me`**
    *   **Description**: Retrieves the profile information (firstName, lastName, email) of the currently authenticated user.
    *   **Authentication**: Required (via JWT cookie).
    *   **Response**: User object.
    *   **Response**: `200 OK` with `{ "firstName": "string", "lastName": "string", "email": "string" }`, or `401 Unauthorized` if no token/invalid token.

### Problem Management Endpoints (`/problems`)
### Problem Management Endpoints (`/problems`) - Authentication Required

These endpoints are protected by the `authenticate` middleware. (Controllers are inferred based on `models/Problem.js`).

*   **`GET /problems`**
    *   **Description**: Retrieves a list of all available coding problems.
    *   **Authentication**: Required.
    *   **Response**: Array of problem objects.
    *   **Response**: `200 OK` with an array of problem objects.

*   **`GET /problems/:id`**
    *   **Description**: Retrieves details of a specific coding problem by its ID.
    *   **Authentication**: Required.
    *   **Response**: Single problem object.
    *   **Response**: `200 OK` with a single problem object, or `404 Not Found`.

*   **`POST /problems`**
    *   **Description**: Creates a new coding problem. (Typically restricted to admin users).
    *   **Authentication**: Required.
    *   **Request Body**: `title`, `description`, `constraints`, `difficulty`, `testCases` (array of objects with `input`, `output`, `explanation`).
    *   **Response**: Success message or newly created problem object.
    *   **Request Body**: `{ "title": "string", "description": "string", "constraints": "string", "difficulty": "Easy|Medium|Hard", "testCases": [{ "input": "string", "output": "string", "explanation": "string" }] }`
    *   **Response**: `201 Created` with the new problem object.

*   **`PUT /problems/:id`**
    *   **Description**: Updates an existing coding problem by its ID. (Typically restricted to admin users).
    *   **Authentication**: Required.
    *   **Request Body**: Partial or full problem object.
    *   **Response**: Success message or updated problem object.
    *   **Request Body**: Partial problem object (e.g., `{ "difficulty": "Hard" }`).
    *   **Response**: `200 OK` with the updated problem object, or `404 Not Found`.

*   **`DELETE /problems/:id`**
    *   **Description**: Deletes a coding problem by its ID. (Typically restricted to admin users).
    *   **Authentication**: Required.
    *   **Response**: Success message.
    *   **Response**: `200 OK` with success message, or `404 Not Found`.

### User Progress Endpoints (`/progress`)
### User Progress Endpoints (`/progress`) - Authentication Required

These endpoints are protected by the `authenticate` middleware. (Controllers are inferred based on `models/Progress.js`).

*   **`POST /progress`**
    *   **Description**: Records a user's submission or progress for a specific problem.
    *   **Authentication**: Required.
    *   **Request Body**: `problem` (ID), `verdict` (`Accepted`, `Wrong Answer`, `Skipped`), `comment` (optional).
    *   **Response**: Success message or newly created progress object.
    *   **Request Body**: `{ "problem": "ObjectId", "verdict": "Accepted|Wrong Answer|Skipped", "comment": "string (optional)" }`
    *   **Response**: `201 Created` with the new progress object.

*   **`GET /progress/me`**
    *   **Description**: Retrieves the authenticated user's progress across all problems.
    *   **Authentication**: Required.
    *   **Response**: Array of progress objects for the user.
    *   **Response**: `200 OK` with an array of progress objects for the user.

### Contest Management Endpoints (`/contests`)
### Contest Management Endpoints (`/contests`) - Authentication Required

These endpoints are protected by the `authenticate` middleware. (Controllers are inferred based on `models/Contest.js`).

*   **`GET /contests`**
    *   **Description**: Retrieves a list of all available contests.
    *   **Authentication**: Required.
    *   **Response**: Array of contest objects.
    *   **Response**: `200 OK` with an array of contest objects.

*   **`GET /contests/:id`**
    *   **Description**: Retrieves details of a specific contest by its ID.
    *   **Authentication**: Required.
    *   **Response**: Single contest object.
    *   **Response**: `200 OK` with a single contest object, or `404 Not Found`.

*   **`POST /contests`**
    *   **Description**: Creates a new contest. (Typically restricted to admin users).
    *   **Authentication**: Required.
    *   **Request Body**: `name`, `start` (Date), `end` (Date), `createdBy` (User ID).
    *   **Response**: Success message or newly created contest object.
    *   **Request Body**: `{ "name": "string", "start": "Date (ISO 8601)", "end": "Date (ISO 8601)", "createdBy": "ObjectId" }`
    *   **Response**: `201 Created` with the new contest object.

*   **`PUT /contests/:id`**
    *   **Description**: Updates an existing contest by its ID. (Typically restricted to admin users).
    *   **Authentication**: Required.
    *   **Request Body**: Partial or full contest object.
    *   **Response**: Success message or updated contest object.
    *   **Request Body**: Partial contest object (e.g., `{ "name": "New Contest Name" }`).
    *   **Response**: `200 OK` with the updated contest object, or `404 Not Found`.

*   **`DELETE /contests/:id`**
    *   **Description**: Deletes a contest by its ID. (Typically restricted to admin users).
    *   **Authentication**: Required.
    *   **Response**: Success message.
    *   **Response**: `200 OK` with success message, or `404 Not Found`.

## Backend Flow Diagram

```mermaid
graph TD
    A[User Request] --> B(Express Server);
    B --> C{Middleware};
    C --> D{CORS, JSON, Cookie Parser};
    D --> E{Route Handling};

    E -- /auth --> F[Auth Routes];
    F --> F1(POST /auth/register);
    F --> F2(POST /auth/login);
    F --> F3(POST /auth/logout);
    F --> F4(GET /auth/me);

    E -- Other Routes --> G{Authentication Middleware};
    G -- Authenticated --> H{Protected Routes};
    G -- Unauthenticated --> I(401 Unauthorized);

    H --> J[Problem Routes];
    J --> J1(GET /problems);
    J --> J2(GET /problems/:id);
    J --> J3(POST /problems);
    J --> J4(PUT /problems/:id);
    J --> J5(DELETE /problems/:id);

    H --> K[Progress Routes];
    K --> K1(POST /progress);
    K --> K2(GET /progress/me);

    H --> L[Contest Routes];
    L --> L1(GET /contests);
    L --> L2(GET /contests/:id);
    L --> L3(POST /contests);
    L --> L4(PUT /contests/:id);
    L --> L5(DELETE /contests/:id);

    F1,F2,F3,F4,J1,J2,J3,J4,J5,K1,K2,L1,L2,L3,L4,L5 --> M(Controllers);
    M --> N(Models);
    N --> O(MongoDB);
    O --> P(Response to User);
    I --> P;
