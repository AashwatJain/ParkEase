import express from "express";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  getOwnerMalls,
  getOwnerDashboardStats,
  getOwnerAnalytics,
  getOwnerRevenue,
  getOwnerRatings,
} from "../controllers/owner.controller.js";

const router = express.Router();

router.use(verifyJWT, authorizeRoles("mall-owner", "admin"));

router.get("/malls", getOwnerMalls);
router.get("/dashboard/:mallId", getOwnerDashboardStats);
router.get("/analytics/:mallId", getOwnerAnalytics);
router.get("/revenue/:mallId", getOwnerRevenue);
router.get("/ratings/:mallId", getOwnerRatings);

export default router;
