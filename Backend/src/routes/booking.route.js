import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  entry,
  exit,
  getBooking,
  getBookings,
  verifyQr,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/entry", authorizeRoles("user", "admin", "mall-owner"), entry);
router.patch("/exit/:bookingId", authorizeRoles("mall-owner", "admin", "guard"), exit);
router.get("/my", authorizeRoles("user", "admin", "mall-owner"), getBookings);
router.get("/:bookingId", authorizeRoles("user", "admin", "mall-owner", "guard"), getBooking);
router.post("/verify-qr", authorizeRoles("mall-owner", "admin", "guard"), verifyQr);

export default router;
