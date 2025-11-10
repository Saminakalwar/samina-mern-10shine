Notes App — MERN Stack

A full-stack secure notes management application with rich-text editing, user authentication, password reset flow, profile management, 
Cloudinary file handling, dark mode UI, search functionality, and complete backend/frontend testing.

✨ Key Features

✅ Authentication & Authorization

    Register, login, logout
    JWT-based protected routes
    Auto-refresh user info
    Auth interceptor to handle expired tokens


✅ Notes Management

    Create, edit, delete notes
    Rich text editor (TipTap)
    Bullet & ordered lists
    Animated UI
    Real-time notes counter
    Debounced search with server-side filtering


✅ User Profile

    Update personal information
    Upload, update, remove profile picture
    Cloudinary integration
    Account deletion


✅ Password Reset Flow

    Forgot password modal
    Reset link via email
    Token-protected reset page


✅ UI/UX

Fully responsive
    Light/Dark mode
    Modern gradient animations
    Custom Sidebar + Navbar
    Smooth transitions

✅ Quality Assurance

    Frontend testing: Vitest + React Testing Library
    Backend testing: Mocha + Chai + Supertest
    SonarQube integration for code quality
    Clean MVC architecture
    Logging: Pino + pino-http



📂 Project Structure
project/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── tests/
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── hooks/
    │   ├── pages/
    │   ├── routes/
    │   ├── services/
    │   └── App.jsx
    └── package.json



🛠️ Tech Stack:

✅ Frontend

    React 19
    React Router DOM 7
    TailwindCSS 4
    TipTap Editor
    Axios
    React Hot Toast
    React Icons
    Vitest + RTL (testing)

✅ Backend

Node.js + Express
MongoDB + Mongoose
JWT Authentication
Multer + Cloudinary
Nodemailer
Pino Logger
Mocha + Chai + Supertest (testing)



🚀 Installation & Setup
    1. Clone the repository
    git clone https://github.com/your-username/notes-app.git
    cd notes-app


📦 Backend Setup
    Install dependencies
    cd backend
    npm install


✅ Create .env:

    MONGO_URI=
    JWT_SECRET=
    PORT=5000
    EMAIL_USER=
    EMAIL_PASS=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=


✅ Run backend 
    Development => npm run dev
    Production => npm start


🎨 Frontend Setup
    Install dependencies
    cd frontend
    npm install


✅ Add environment variable

In .env:   VITE_API_BASE_URL=http://localhost:5000/api


    Run frontend
    npm run dev


✅ Running Tests
    Frontend (Vitest)
    cd frontend
    npm test

Backend (Mocha + Chai)
    cd backend
    npm test

Backend Test Coverage
    npm run coverage

🔍 SonarQube
    Generate project properties
    sonar-project.properties


Example:

sonar.projectKey=notes-app
sonar.sourceEncoding=UTF-8
sonar.sources=./backend,./frontend/src
sonar.tests=./backend/tests
sonar.javascript.lcov.reportPaths=coverage/lcov.info

Run scanner
sonar-scanner



🔐 Authentication Flow

User logs in → receives JWT
Token is stored in localStorage
Axios interceptor attaches Authorization: Bearer <token>
Backend verifies token for all protected routes
On expiry → 401 → auto-logout & redirect to /login


🗄️ API Endpoints Summary
Auth :
    POST /api/auth/register
    POST /api/auth/login
    GET  /api/auth/get-user
    POST /api/auth/forgot-password
    POST /api/auth/reset-password/:token

Notes :
    GET    /api/notes
    POST   /api/notes
    PUT    /api/notes/:id
    DELETE /api/notes/:id
    GET    /api/notes/search?query=

Profile :
    GET    /api/profile
    PUT    /api/profile
    PUT    /api/profile-pic
    DELETE /api/profile-pic
    DELETE /api/delete-account


🧱 Architecture
Frontend Architecture:

    Context API for Auth, Notes, Profile
    Axios API service with interceptors
    Protected routes wrapper
    Smart components (hooks) + dumb UI components
    Tailwind 4 with custom animations


Backend Architecture

    MVC pattern
    Centralized error handler
    Global logger (Pino)

Middleware:

    Auth (JWT)
    Multer (file uploads)
    Request logging
    Modular controllers & services


🏁 Conclusion

This project delivers a complete, production-grade MERN Notes Application with robust authentication, rich-text note editing, profile customization,
image uploads, search, animations, testing, logging, and code-quality integration.

Here is the project demo link via loom video recording extension:

https://www.loom.com/share/b10d7708ddc34f9c9dd152cfba63853f



