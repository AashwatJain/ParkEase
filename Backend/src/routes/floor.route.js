import express from "express";
import {
  addFloor,
  getFloors,
  getTotalSlots,
} from "../controllers/floor.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router({ mergeParams: true });

router.post("/", verifyJWT, authorizeRoles("mall-owner"), addFloor);
router.get("/", getFloors);
router.get("/:floorId/availability", getTotalSlots);

export default router;
