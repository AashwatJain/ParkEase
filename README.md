# 🅿️ ParkEase — Mall Parking Management System

A full-stack mall parking platform with real-time slot availability, QR-based entry/exit, duration-based billing, and multi-role access control.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Multi-Role Auth** | User, Mall Owner, Super Admin — JWT + HTTP-only cookies |
| 🏢 **Mall Registration** | Owner registers → Admin approves/rejects with reason |
| 🅿️ **Auto Slot Allotment** | Atomic `findOneAndUpdate` — zero double bookings |
| 📱 **QR Code Entry/Exit** | QR generated at entry, scanned at exit for verification |
| 💰 **Duration Billing** | `ceil(hours) × rate` — pay only for time parked |
| 📊 **Owner Dashboard** | Real-time stats, peak hours, revenue analytics (aggregation) |
| ⭐ **Rating System** | 1-5 stars + feedback after completed booking |
| 🛡️ **Admin Panel** | Platform stats, approve/reject malls, ban/unban users |
| ⏰ **Auto-Expire** | Cron job frees stale bookings (24hr+) |
| 🚦 **Rate Limiting** | API abuse protection on all endpoints |

---

## 🏗️ Architecture

```
mall-parking-system/
├── Backend/          # Express.js REST API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── db/
│   ├── server.js
│   └── package.json
│
├── Frontend/         # React + TanStack Router + shadcn/ui
│   ├── src/
│   │   ├── routes/
│   │   ├── components/
│   │   └── lib/
│   ├── vite.config.ts
│   └── package.json
│
└── README.md
```

---

## 🛠️ Tech Stack

### Backend
| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs + cookie-parser |
| QR Code | qrcode |
| Email | Nodemailer |
| Cron | node-cron |
| Rate Limit | express-rate-limit |

### Frontend (Vibecoded 🎨)
| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Routing | TanStack Router |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Animations | Framer Motion |
| HTTP | Axios |
| Notifications | Sonner |

> ⚡ Frontend was vibecoded using [Lovable](https://lovable.dev)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone the repo
```bash
git clone https://github.com/AashwatJain/mall-parking-system.git
cd mall-parking-system
```

### 2. Setup Backend
```bash
cd Backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, etc.

# Start backend
npm run dev
```

### 3. Setup Frontend
```bash
cd Frontend
npm install

# Start frontend (proxies /api to backend on port 8000)
npm run dev
```

### 4. Open in browser
```
Frontend: http://localhost:5173
Backend:  http://localhost:8000
```

---

## 🔑 Environment Variables (Backend)

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/parkease
JWT_SECRET=your_secret_key
CORS_ORIGIN=*
```

---

## 🛣️ API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register user/mall-owner |
| POST | `/login` | Login → JWT cookie |
| POST | `/logout` | Clear cookie |
| GET | `/profile` | Get current user |

### Malls — `/api/malls`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Register mall (owner) |
| GET | `/` | Browse approved malls (search, city filter, pagination) |
| GET | `/:mallId` | Mall detail + avg rating |
| PATCH | `/:mallId` | Update mall (owner/admin) |
| DELETE | `/:mallId` | Delete mall (owner/admin) |

### Floors — `/api/malls/:mallId/floors`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Add floor (auto-generates slots) |
| GET | `/` | Get all floors |
| GET | `/:floorId/availability` | Floor-wise slot availability |

### Bookings — `/api/bookings`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/entry` | Park vehicle → auto-allot slot → QR code |
| POST | `/exit/:bookingId` | Exit → calculate bill → free slot |
| GET | `/my` | User's booking history |

### Admin — `/api/admin`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/malls/pending` | Pending malls list |
| PATCH | `/malls/:mallId/approve` | Approve mall |
| PATCH | `/malls/:mallId/reject` | Reject mall (with reason) |
| GET | `/platform-stats` | Total users, malls, bookings, revenue |
| PATCH | `/ban/:userId` | Ban user |
| PATCH | `/unban/:userId` | Unban user |

---

## 🔄 Parking Flow

```
User arrives → Selects vehicle type → Enters vehicle number
    → System auto-allots slot (atomic) → QR code generated
    → User parks...
    → QR scanned at exit → Duration calculated → Bill generated
    → Slot freed → User can rate experience ⭐
```

---

## 👥 Roles

| Role | Access |
|------|--------|
| **User** | Browse malls, book parking, exit & pay, rate |
| **Mall Owner** | Register mall, manage floors/slots, view dashboard & analytics |
| **Super Admin** | Approve/reject malls, ban users, platform-wide stats |

---

## 📄 License

This project is for learning and portfolio purposes.

---

Built with ❤️ by [Aashwat Jain](https://github.com/AashwatJain)
