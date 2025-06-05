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
└── docs/
    └── img/
        ├── register.png
        ├── login.png
        └── auth_ticket.png
├── .env # Environment variables
├── CHANGELOG.md 
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


---




