# Cyntax 

## api.cyntax.org

A secure, extensible Node/Express-based API serving multiple client apps and powering Cyntax's internal ticketing and form systems. It supports JWT-based authentication, dynamic CORS, and MongoDB for data storage. Email integration via SendGrid (or similar) is planned for notifying clients on form submissions.

---

## 🌐 Deployment Target

- **API URL**: `https://api.cyntax.org`
- **Environment**: Dockerized Node app, hosted on Cyntax-managed infrastructure

---

## 📁 Project Structure


```
api.cyntax.org/
├── src/
│ ├── config/
│ │ └── db.js # MongoDB connection setup
│
│ ├── controllers/
│ │ ├── authController.js # Handles login, registration, auth logic
│ │ ├── ticketController.js # Handles ticket CRUD logic
│ │ └── formController.js # Handles form submission and email notifications
│
│ ├── middleware/
│ │ ├── auth.js # JWT verification middleware
│ │ └── cors.js # CORS configuration middleware
│
│ ├── models/
│ │ ├── User.js # User schema and model
│ │ ├── Ticket.js # Ticket schema and model
│ │ └── FormSubmission.js # Form submission schema (name, email, message, etc.)
│
│ ├── routes/
│ │ ├── auth.js # Authentication routes (/api/auth)
│ │ ├── tickets.js # Ticket routes (/api/tickets)
│ │ └── forms.js # Form submission routes (/api/forms)
│
│ ├── services/
│ │ ├── passport.js # OAuth scaffolding (Google, GitHub, Facebook)
│ │ └── mailer.js # Email utility (SendGrid / nodemailer / SMTP integration)
│
│ ├── app.js # Main Express app initialization
│
├── .env # Environment variables
├── Dockerfile # Docker image configuration
├── docker-compose.yml # Optional: local dev orchestration
├── package.json # NPM metadata and scripts
└── README.md # Project documentation

```

---

## ⚙️ Core Features

### ✅ Authentication
- JWT-based local auth (`/register`, `/login`)
- Password hashing with bcrypt
- OAuth scaffolding for Google, GitHub, Facebook

### 🔐 CORS Handling
- Middleware allows only trusted origins like:
  - `https://client1.com`
  - `https://client2.com`
  - `https://cyntax.org`

### 🧾 Form Submissions
- Route: `POST /api/forms`
- Validates and stores submissions in MongoDB
- Email notifications (SendGrid or SMTP) supported via `mailer.js`

### 🎫 Ticketing System
- Authenticated users can open, update, or close tickets
- Tickets are linked to user IDs in the database

---

## 🧪 MongoDB Collections

### 🧑 Users
```js
{
  email: String,
  passwordHash: String,
  provider: String, // 'local' or 'google'/'github'/'facebook'
  name: String,
  createdAt: Date
}
```

### 📨 Form Submissions
```js
{
  name: String,
  email: String,
  message: String,
  source: String, // e.g., "client1.com"
  submittedAt: Date
}
```

### 🎫 Tickets
```js
{
  userId: ObjectId,
  subject: String,
  message: String,
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  createdAt: Date
}
```


## 📝 Changelog

### [feature/init-app]

**Date:** 2025-06-04  
**Status:** Completed  
**Scope:** Initial Application Scaffolding 

**Issue:** `#1`

#### 🚀 Features Added
- Bootstrapped a Node.js + Express app with:
  - JSON body parsing (`express.json`)
  - Clean project structure inside `/src` directory
- Created route definitions for:
  - `POST /api/forms` – Handles basic form submissions
  - `POST /api/tickets` – Handles ticket creation
- Defined simple in-memory data stores via models:
  - `FormSubmission` model
  - `Ticket` model
- Implemented controllers:
  - `formController.js` – Validates and stores submitted form data
  - `ticketController.js` – Validates and stores ticket data
- Combined routes into a single `routes/index.js` file
- Configured the root server file: `src/app.js`
  - Mounted `/api` namespace for versionless endpoints
  - Default health check route: `/`
- Added basic testing and validation of schema inputs

#### 📁 Directory Overview
- `/routes` → Unified API route declarations
- `/controllers` → Handles request logic
- `/models` → In-memory schema + data storage
- `app.js` → Initializes and mounts Express

#### 🔧 Dev Environment
- Added `nodemon` for development reloads
- Script: `npm run dev`

---




