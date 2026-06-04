# 🅿️ ParkEase — Mall Parking Management System

A full-stack mall parking platform with real-time slot availability, QR-based entry/exit, duration-based billing, and multi-role access control. **Frontend vibecoded using [Lovable](https://lovable.dev) 🎨**

### 🌐 Live Demo

| | URL |
|---|---|
| **Frontend** | [https://park-ease-psi.vercel.app](https://park-ease-psi.vercel.app) |
| **Backend API** | [https://parkease-pe0d.onrender.com/api](https://parkease-pe0d.onrender.com/api) |

> ⚠️ Backend is hosted on Render free tier — first request may take ~30s to wake up.

> 📄 For detailed problem statement, schemas, and API design — see [PROBLEM_STATEMENT.md](Backend/PROBLEM_STATEMENT.md)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Multi-Role Auth** | User, Mall Owner, Super Admin — JWT + HTTP-only cookies |
| 🏢 **Mall Registration** | Owner registers → Admin approves/rejects with reason |
| 🅿️ **Auto Slot Allotment** | Atomic `findOneAndUpdate` — zero double bookings |
| 📱 **QR Code System** | QR generated at entry, verified by guard/owner at gate |
| 💰 **Duration Billing** | `ceil(hours) × rate` — pay only for time parked |
| 📊 **Owner Dashboard** | Grand total stats + per-mall breakdown (slots, revenue) |
| ⭐ **Rating System** | 1-5 stars + feedback after completed booking (ownership + completion enforced) |
| 🛡️ **Admin Panel** | Platform stats, approve/reject malls, ban/unban users |
| 🚫 **Ban System** | Banned users blocked on every authenticated request via middleware |
| 🔒 **One Active Booking** | User can only have 1 active booking at a time |

---

## 🏗️ Architecture

```
mall-parking-system/
├── Backend/          # Express.js REST API
│   ├── src/
│   │   ├── controllers/    # Business logic (8 controllers)
│   │   ├── models/         # Mongoose schemas (6 models)
│   │   ├── routes/         # API route definitions (8 routers)
│   │   ├── middleware/     # Auth, RBAC, error handling (4 middlewares)
│   │   ├── utils/          # ApiError, ApiResponse, asyncHandler, QR
│   │   └── db/             # MongoDB connection
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
| CORS | cors |
| Env Config | dotenv |

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
| POST | `/register` | Register user/mall-owner (admin role blocked) |
| POST | `/login` | Login → JWT cookie |
| POST | `/logout` | Clear cookie |
| GET | `/profile` | Get current user |

### Malls — `/api/malls`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Register mall → pending status (owner) |
| GET | `/` | Browse approved & active malls (search by name/address, paginated) |
| GET | `/:mallId` | Mall detail + avg rating |
| PATCH | `/:mallId` | Update mall — resets status to pending (owner/admin) |
| DELETE | `/:mallId` | Soft delete mall — isActive → false (owner/admin) |

### Floors — `/api/malls/:mallId/floors`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Add floor (auto-generates bike + car slots) |
| GET | `/` | Get all floors |
| GET | `/:floorId/availability` | Floor-wise available slot count (bike/car) |

### Slots — `/api/slots`
| Method | Endpoint | Description |
|--------|----------|-------------|
| PATCH | `/:slotId/maintenance` | Single slot → maintenance (owner/admin) |
| PATCH | `/floor/:floorId/maintenance` | Bulk: entire floor → maintenance (owner/admin) |
| PATCH | `/floor/:floorId/activate` | Bulk: maintenance slots → available (owner/admin) |

### Bookings — `/api/bookings`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/entry` | Park vehicle → auto-allot slot → QR code generated |
| PATCH | `/exit/:bookingId` | Exit → calculate fare → free slot |
| POST | `/verify-qr` | Guard: verify QR validity + mall ownership (owner/admin) |
| GET | `/my` | User's booking history (paginated) |
| GET | `/:bookingId` | Single booking detail |

### Ratings — `/api/ratings`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/:bookingId` | Rate completed booking (ownership + completion enforced) |
| GET | `/mall/:mallId` | Get all ratings for a mall (paginated) |

### Mall Owner Dashboard — `/api/owner`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/malls` | Owner's registered malls |
| GET | `/dashboard` | Grand total: all malls combined — slots, today's revenue |
| GET | `/mall-stats` | Per-mall breakdown: available, occupied, total revenue |
| GET | `/ratings/:mallId` | Per-mall rating distribution (1-5 star counts) |

### Admin — `/api/admin`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/malls/pending` | Pending malls list |
| PATCH | `/malls/:mallId/approve` | Approve mall |
| PATCH | `/malls/:mallId/reject` | Reject mall (with reason) |
| GET | `/platform-stats` | Total users, malls, bookings, revenue (aggregation) |
| GET | `/all-malls` | All malls with live stats (occupied, available, today revenue) |
| PATCH | `/ban/:userId` | Ban user |
| PATCH | `/unban/:userId` | Unban user |

---

## 🔄 Parking Flow

```
User arrives → Selects vehicle type → Enters vehicle number
    → Active booking check (max 1) → Slot auto-allotted (atomic)
    → QR code generated → Booking created
    → User parks...
    → User hits exit → Ownership verified → Duration calculated
    → Bill generated → Slot freed → Booking completed
    → User can rate experience ⭐
```

---

## 👥 Roles

| Role | Access |
|------|--------|
| **User** | Browse malls, book parking, exit & pay, rate completed bookings |
| **Mall Owner** | Register mall, manage floors/slots, dashboard stats, QR verify, view ratings |
| **Super Admin** | Approve/reject malls, ban/unban users, platform-wide stats, all malls overview |

---

## 🧠 Key Engineering Highlights

| Concept | Implementation |
|---|---|
| **Atomic Operations** | `findOneAndUpdate` for slot allotment — zero race conditions |
| **MongoDB Aggregation** | Dashboard stats, platform stats, revenue calculation |
| **Promise.all** | Parallel DB queries in dashboard/stats for performance |
| **Compound Indexing** | Fast slot queries (`mall + floor + vehicleType + status`) |
| **Unique Indexing** | One rating per booking enforced at DB level |
| **Pre-validate Hooks** | Auto QR generation + entry time on booking creation |
| **Post-save Hooks** | Auto avg rating recalculation on new rating |
| **Role-based Auth** | 3 roles with granular route-level access control |
| **Soft Delete** | Mall deletion via `isActive` flag |
| **Status Workflows** | Mall: pending → approved/rejected, Booking: active → completed |

---

## 📄 License

This project is for learning and portfolio purposes.

---

Built with ❤️ by [Aashwat Jain](https://github.com/AashwatJain)
