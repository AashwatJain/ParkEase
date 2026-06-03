import express from "express";
import { rate, getRating } from "../controllers/rating.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/:bookingId", verifyJWT, authorizeRoles("user"), rate);
router.get("/mall/:mallId", getRating);

export default router;
