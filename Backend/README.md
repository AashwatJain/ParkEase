# 🅿️ ParkEase — Mall Parking Management System

A RESTful backend API for managing mall parking operations — slot allotment, QR code based entry/exit, duration-based billing, and multi-role access control.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + HTTP-only Cookies
- **Other:** Nodemailer, QR Code, node-cron, express-rate-limit

## 🚀 Features

- **3 Roles** — User, Mall Owner, Super Admin with role-based authorization
- **Mall Registration** with admin approval workflow
- **Auto Slot Allotment** using atomic operations (no double booking)
- **QR Code** verification at entry & exit
- **Duration-based Billing** — `ceil(hours) × rate`
- **Email Notifications** — booking confirmation + invoice
- **Cron Job** — auto-expire stale bookings (24hr+)
- **Owner Dashboard** — real-time stats, analytics, revenue reports (aggregation pipelines)
- **Rating System** — 1-5 ⭐ + feedback
- **Rate Limiting** & **Pagination** on all endpoints

## ⚙️ Setup

```bash
# Clone
git clone https://github.com/yourusername/mall-parking-system.git
cd mall-parking-system

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start dev server
npm run dev
```

## 🔑 Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/parkease
JWT_SECRET=your_jwt_secret
COOKIE_EXPIRE=7
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## 📁 Project Structure

```
src/
├── db/            # Database connection
├── models/        # Mongoose schemas (User, Mall, Floor, Slot, Booking, Rating)
├── controllers/   # Route handlers
├── routes/        # API route definitions
├── middleware/     # Auth & role verification
├── utils/         # QR, Email, Error & Response helpers
└── jobs/          # Cron jobs
```

## 🛣️ API Routes

| Module | Base Route |
|---|---|
| Auth | `/api/auth` |
| Malls | `/api/malls` |
| Floors | `/api/malls/:mallId/floors` |
| Slots | `/api/slots` |
| Bookings | `/api/bookings` |
| Ratings | `/api/ratings` |
| Owner Dashboard | `/api/owner` |
| Admin | `/api/admin` |

> 📄 Detailed API docs, schemas & flows → [`PROBLEM_STATEMENT.md`](./PROBLEM_STATEMENT.md)

## 📝 License

This project is for learning purposes.
