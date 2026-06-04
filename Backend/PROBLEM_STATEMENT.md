# 🅿️ ParkEase — Mall Parking Management System

## 📌 Problem Statement

Build a **production-ready RESTful backend API** for a Mall Parking Management System. The platform allows mall owners to register their malls, manage parking floors & slots, and track revenue. Users can park their vehicles, get QR Code for verification, and pay based on actual duration. A super admin oversees the entire platform.

---

## 👥 Roles & Responsibilities

### 🛡️ Role 1: Super Admin (Platform God Mode)

The super admin controls the entire platform. Can do everything a mall owner can — on **any** mall.

| # | Feature | Detail |
|---|---|---|
| 1 | **Mall Approve / Reject** | Mall Owner registers a mall → Admin reviews → Approves ✅ or Rejects ❌ (with reason) |
| 2 | **User / Owner Ban** | Block any user or mall owner → banned check runs on every authenticated request via middleware |
| 3 | **Platform Stats** | Total users, total malls, total bookings, total revenue across ALL malls (aggregation) |
| 4 | **All Malls Overview** | See all malls list with live stats (occupied, available, today's revenue) |
| 5 | **Bulk Slot Management** | Mark an entire floor as maintenance on any mall (`updateMany`) |

---

### 🏢 Role 2: Mall Owner

The mall owner manages **their own** mall(s) only.

| # | Feature | Detail |
|---|---|---|
| 1 | **Register Mall** | Add mall details (name, address, pricing) → goes to `pending` status → waits for admin approval |
| 2 | **Manage Floors** | Add floors to their approved mall |
| 3 | **Manage Slots** | Slots auto-generate when floor is created. Can mark individual slots or entire floor as `maintenance` |
| 4 | **Dashboard** | Grand total view: total malls, total occupied/available slots, today's revenue across all owned malls |
| 5 | **Mall-wise Stats** | Per-mall breakdown: slots available, slots occupied, total revenue for each mall |
| 6 | **View Ratings** | Per-mall rating distribution (1-5 star counts) + average rating |
| 7 | **QR Scanner** | Verify QR at mall gate — checks booking validity, mall ownership, and returns vehicle + slot info |

---

### 👤 Role 3: User (Customer)

The user parks their vehicle and pays based on actual duration.

| # | Feature | Detail |
|---|---|---|
| 1 | **Register / Login** | JWT + HTTP-only cookies |
| 2 | **Browse Malls** | Search by name, filter by address. Paginated results |
| 3 | **Check Availability** | See floor-wise available slots (bike/car separate) for a mall |
| 4 | **Entry (Park)** | Select vehicle type (Bike/Car) → Enter vehicle number → Slot auto-allot → Get **QR Code** |
| 5 | **Exit** | Booking fetched → Duration calculated → Final bill generated → Slot freed |
| 6 | **Booking History** | View past & active bookings (paginated) |
| 7 | **⭐ Rate Parking** | After exit, rate the experience (1-5 stars) + feedback text. Only own completed bookings can be rated. |
| 8 | **One Active Booking** | User can have only **1 active booking** at a time |

---

## 🔄 Complete Parking Flow

```
📍 ENTRY (User arrives at mall)
   │
   ├─ 1. User logs in (or already logged in)
   ├─ 2. Selects vehicle type: 🏍️ Bike or 🚗 Car
   ├─ 3. Enters vehicle number (e.g. "MH 12 AB 1234")
   ├─ 4. System checks: Does user already have an active booking? → If yes, REJECT
   ├─ 5. System auto-allots first available slot from correct section
   │       └─ Uses findOneAndUpdate (atomic — no double booking)
   ├─ 6. Entry time auto-logged (server timestamp)
   ├─ 7. QR Code generated (booking ID + vehicle number encoded)
   └─ ✅ Response: slot info, QR, booking details
   
   ⏳ User is parked in the mall...

📍 EXIT (User leaves the mall)
   │
   ├─ 1. User hits exit API with booking ID
   ├─ 2. Ownership verified (only booking owner can exit)
   ├─ 3. Double-exit prevented (completed bookings rejected)
   ├─ 4. Exit time logged
   ├─ 5. Duration calculated: exitTime - entryTime
   ├─ 6. Bill calculated:
   │       amount = ceil(totalHours) × rate[vehicleType]
   │       e.g. 3.5 hrs × ₹30/hr → ceil(3.5) = 4 → ₹120
   ├─ 7. Slot status → "available" (freed up)
   ├─ 8. Booking status → "completed"
   └─ ✅ User can now rate the experience (1-5 ⭐)

📍 QR VERIFICATION (Guard at mall gate)
   │
   ├─ 1. Guard scans QR → extracts bookingId
   ├─ 2. Backend verifies: booking exists, belongs to this mall's owner, is still active
   ├─ 3. Returns: vehicle number, vehicle type, floor, slot number
   └─ ✅ Guard allows entry/exit
```

---

## 🏢 Mall Approval Flow

```
Mall Owner                    Super Admin
    │                              │
    ├─ Creates mall ──────────►  Mall status: "pending" ⏳
    │                              │
    │                         Reviews mall details
    │                              │
    │   ◄──── Approved ✅ ────── Mall status: "approved" → LIVE!
    │         OR                   │
    │   ◄──── Rejected ❌ ────── Mall status: "rejected" (with reason)
    │                              │
    │  (Can re-submit after        │
    │   fixing issues)             │
```

---

## 💰 Pricing Model

- **Mall-level pricing** — Owner sets rate when creating mall
- **2 vehicle types only** — Bike 🏍️ and Car 🚗
- **No free hours** — Charged from first minute
- **Per hour basis** — `ceil()` rounds up partial hours
- **Payment simulated** — No actual gateway, just amount calculation

```
pricing: {
  bike: 10,    // ₹ per hour
  car: 30      // ₹ per hour
}

// Bill Formula:
totalHours = (exitTime - entryTime) in hours
amount = ceil(totalHours) × pricing[vehicleType]
```

---

## 🏗️ Floor & Slot Layout

Each floor has **2 separate sections** — Bike and Car.

```
Mall: "Phoenix Mall"
│
├── Floor 1
│   ├── 🏍️ Bike Section  → [1-B1, 1-B2, 1-B3, ... 1-B20]
│   └── 🚗 Car Section   → [1-C1, 1-C2, 1-C3, ... 1-C15]
│
├── Floor 2
│   ├── 🏍️ Bike Section  → [2-B1, 2-B2, ... 2-B20]
│   └── 🚗 Car Section   → [2-C1, 2-C2, ... 2-C15]
│
└── Floor 3
    ├── 🏍️ Bike Section  → [3-B1, 3-B2, ... 3-B20]
    └── 🚗 Car Section   → [3-C1, 3-C2, ... 3-C15]
```

- **Slot naming:** `{floorNumber}-{B/C}{slotNumber}`
- Slots **auto-generate** when a floor is created
- Bike/Car slot count is configurable per floor

---

## ⭐ Rating System

After a completed booking, user can rate their experience:

```
{
  booking: ref → Booking,       // unique — one rating per booking
  user: ref → User,
  mall: ref → Mall,
  rating: 1-5,                  // ⭐⭐⭐⭐⭐
  feedback: "Clean parking, easy to find slot",
  createdAt: timestamp
}
```

- One rating per booking (unique index on `booking`)
- Only the booking owner can rate (ownership check)
- Only completed bookings can be rated (completion check)
- Mall's `averageRating` and `totalReviews` auto-update via post-save hook
- Mall Owner can see rating distribution per mall

---

## 📦 MongoDB Schemas

### User
```js
{
  username: String,          // required, unique, lowercase
  email: String,             // required, unique, lowercase
  password: String,          // hashed (bcryptjs), select: false
  role: "user" | "mall-owner" | "admin",
  isBanned: Boolean,         // default: false
  timestamps: true
}
```

### Mall
```js
{
  name: String,              // required
  address: String,           // required, unique
  owner: ref → User,         // mall-owner
  pricing: {
    bike: Number,            // ₹ per hour
    car: Number              // ₹ per hour
  },
  status: "pending" | "approved" | "rejected",
  rejectionReason: String,   // agar reject hua toh
  isActive: Boolean,         // default: true (soft delete)
  averageRating: Number,     // auto-calculated via Rating post-save hook
  totalReviews: Number,      // auto-calculated via Rating post-save hook
  timestamps: true
}
```

### Floor
```js
{
  mall: ref → Mall,
  floorNumber: Number,
  bikeSlots: Number,         // total bike slots on this floor
  carSlots: Number,          // total car slots on this floor
  timestamps: true
}
```

### Slot
```js
{
  mall: ref → Mall,
  floor: ref → Floor,
  slotNumber: String,        // "1-B5", "2-C12"
  vehicleType: "bike" | "car",
  status: "available" | "occupied" | "maintenance",
  timestamps: true
}
// Compound Index: { mall, floor, vehicleType, status } → fast slot allotment
```

### Booking
```js
{
  user: ref → User,
  mall: ref → Mall,
  floor: ref → Floor,
  slot: ref → Slot,
  vehicleType: "bike" | "car",
  vehicleNumber: String,     // "MH 12 AB 1234"
  entryTime: Date,           // auto-set in pre-validate hook
  exitTime: Date,
  fare: Number,              // bill amount (calculated at exit)
  qrCode: String,            // base64 QR image (auto-generated in pre-validate hook)
  status: "active" | "completed",
  timestamps: true
}
```

### Rating
```js
{
  booking: ref → Booking,
  user: ref → User,
  mall: ref → Mall,
  rating: Number,            // 1-5
  feedback: String,
  timestamps: true
}
// Index: { booking: 1 }, { unique: true } → one rating per booking
// Post-save hook: auto-recalculates mall's averageRating & totalReviews
```

---

## 🛣️ API Endpoints

### Auth Routes — `/api/auth`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/register` | Register (user/mall-owner). Admin role blocked. | ❌ |
| POST | `/login` | Login → JWT cookie | ❌ |
| POST | `/logout` | Clear cookie | ✅ |
| GET | `/profile` | Get logged-in user info | ✅ |

---

### Mall Routes — `/api/malls`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/` | Register a new mall (→ pending status) | ✅ Mall Owner |
| GET | `/` | Browse approved & active malls (paginated, search by name/address) | ❌ |
| GET | `/:mallId` | Get single mall detail + avg rating | ❌ |
| PATCH | `/:mallId` | Update mall info (resets status to pending) | ✅ Owner / Admin |
| DELETE | `/:mallId` | Soft delete mall (isActive → false) | ✅ Owner / Admin |

---

### Floor Routes — `/api/malls/:mallId/floors`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/` | Add floor (auto-generates bike + car slots) | ✅ Owner / Admin |
| GET | `/` | Get all floors of a mall | ❌ |
| GET | `/:floorId/availability` | Floor-wise available slots count (bike/car) | ❌ |

---

### Slot Management — `/api/slots`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| PATCH | `/:slotId/maintenance` | Single slot → maintenance | ✅ Owner / Admin |
| PATCH | `/floor/:floorId/maintenance` | Bulk: entire floor → maintenance | ✅ Owner / Admin |
| PATCH | `/floor/:floorId/activate` | Bulk: maintenance slots → available | ✅ Owner / Admin |

---

### Booking Routes — `/api/bookings`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/entry` | Entry: allot slot + QR generated | ✅ User |
| PATCH | `/exit/:bookingId` | Exit: calculate fare, free slot | ✅ User |
| POST | `/verify-qr` | Guard: verify QR validity + mall ownership | ✅ Owner / Admin |
| GET | `/my` | My booking history (paginated) | ✅ User |
| GET | `/:bookingId` | Single booking detail | ✅ User |

---

### Rating Routes — `/api/ratings`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/:bookingId` | Rate a completed booking (1-5 ⭐ + feedback). Ownership + completion check. | ✅ User |
| GET | `/mall/:mallId` | Get all ratings for a mall (paginated) | ❌ |

---

### Mall Owner Dashboard — `/api/owner`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/malls` | Get owner's registered malls | ✅ Owner / Admin |
| GET | `/dashboard` | Grand total: all malls combined — slots, today's revenue | ✅ Owner / Admin |
| GET | `/mall-stats` | Per-mall breakdown: slots available, occupied, total revenue | ✅ Owner / Admin |
| GET | `/ratings/:mallId` | Per-mall rating distribution (1-5 star counts) | ✅ Owner / Admin |

---

### Super Admin Routes — `/api/admin`
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/malls/pending` | All pending malls (awaiting approval) | ✅ Admin |
| PATCH | `/malls/:mallId/approve` | Approve a mall → status = "approved" | ✅ Admin |
| PATCH | `/malls/:mallId/reject` | Reject a mall (with reason) | ✅ Admin |
| GET | `/platform-stats` | Total users, malls, bookings, revenue (aggregation) | ✅ Admin |
| GET | `/all-malls` | All malls with live stats (occupied, available, today revenue) | ✅ Admin |
| PATCH | `/ban/:userId` | Ban a user or mall owner | ✅ Admin |
| PATCH | `/unban/:userId` | Unban a user or mall owner | ✅ Admin |

---

## ⚙️ System Features

| Feature | Package | Detail |
|---|---|---|
| **QR Code** | `qrcode` | Entry pe generate — booking ID + vehicle number encoded (base64 image) |
| **Concurrency** | `findOneAndUpdate` | Atomic slot allotment — no double booking |
| **Pagination** | `skip` + `limit` | Mall listing, booking history, ratings |
| **Soft Delete** | `isActive` flag | Malls are soft-deleted, not removed from DB |
| **Auto Avg Rating** | Post-save hook | Rating model auto-recalculates mall's average rating on every new rating |
| **Banned User Guard** | Auth middleware | Every authenticated request checks if user is banned |

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | jsonwebtoken, bcryptjs, cookie-parser |
| QR Code | qrcode |
| CORS | cors |
| Env Config | dotenv |

---

## 📁 Folder Structure

```
Backend/
├── server.js
├── package.json
├── .env
├── .gitignore
└── src/
    ├── app.js
    ├── db/
    │   └── db.js
    ├── models/
    │   ├── user.model.js
    │   ├── mall.model.js
    │   ├── floor.model.js
    │   ├── slot.model.js
    │   ├── booking.model.js
    │   └── rating.model.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── mall.controller.js
    │   ├── floor.controller.js
    │   ├── slot.controller.js
    │   ├── booking.controller.js
    │   ├── rating.controller.js
    │   ├── owner.controller.js
    │   └── admin.controller.js
    ├── routes/
    │   ├── auth.route.js
    │   ├── mall.route.js
    │   ├── floor.route.js
    │   ├── slot.routes.js
    │   ├── booking.route.js
    │   ├── rating.route.js
    │   ├── owner.route.js
    │   └── admin.route.js
    ├── middleware/
    │   ├── auth.middleware.js       // verifyJWT + banned check
    │   ├── role.middleware.js       // authorizeRoles("admin", "mall-owner")
    │   ├── mall.middleware.js       // checkMallActive
    │   └── error.middleware.js      // Global error handler (CastError, DuplicateKey)
    └── utils/
        ├── ApiError.utils.js        // Custom error class
        ├── ApiResponse.utils.js     // Standard response class
        ├── asyncHandler.utils.js    // Async wrapper for controllers
        └── qr.utils.js              // QR code generation (base64)
```

---

## 🧠 Key Engineering Concepts

| Concept | Where It's Used |
|---|---|
| **MongoDB Aggregation** | Dashboard stats, platform stats, revenue calculation, auto avg rating |
| **Atomic Operations** (`findOneAndUpdate`) | Slot allotment without race conditions |
| **Role-based Authorization** | 3 roles, different access levels per route |
| **Compound Indexing** | Fast queries on slots (`mall + floor + vehicleType + status`) |
| **Unique Indexing** | One rating per booking (`booking: 1, unique: true`) |
| **Bulk Operations** (`updateMany`) | Floor-level slot maintenance toggle |
| **Date/Time Logic** | Duration calculation, billing, today's revenue filter |
| **Pagination** (`skip` + `limit`) | Mall listing, booking history, ratings |
| **Status Workflows** | Mall: pending → approved/rejected, Booking: active → completed |
| **Soft Delete** | Mall deletion via `isActive` flag |
| **Pre-validate Hooks** | Auto QR generation + entry time logging on booking creation |
| **Post-save Hooks** | Auto avg rating recalculation on new rating |
| **Promise.all** | Parallel DB queries in dashboard/stats controllers |
