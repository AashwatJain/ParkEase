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
router.use(authorizeRoles("user", "admin", "mall-owner"));

router.post("/entry", entry);
router.patch("/exit/:bookingId", authorizeRoles("mall-owner", "admin"), exit);
router.get("/my", getBookings);
router.get("/:bookingId", getBooking);
router.post("/verify-qr", authorizeRoles("mall-owner", "admin"), verifyQr);

export default router;
