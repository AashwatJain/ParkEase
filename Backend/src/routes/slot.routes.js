import express from "express";
import {
  slotMaintenance,
  multipleSlotMaintenance,
  multipleSlotActive,
} from "../controllers/slot.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(verifyJWT);
router.use(authorizeRoles("mall-owner", "admin"));

router.patch("/:slotId/maintenance", slotMaintenance);
router.patch("/floor/:floorId/maintenance", multipleSlotMaintenance);
router.patch("/floor/:floorId/activate", multipleSlotActive);

export default router;
