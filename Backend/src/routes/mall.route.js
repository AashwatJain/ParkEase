import express from "express";
import {
  createMall,
  getMalls,
  getMall,
  updateMall,
  deleteMall,
} from "../controllers/mall.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, authorizeRoles("mall-owner"), createMall);
router.get("/", getMalls);
router.get("/:mallId", getMall);

router.patch(
  "/:mallId",
  verifyJWT,
  authorizeRoles("mall-owner", "admin"),
  updateMall,
);
router.delete(
  "/:mallId",
  verifyJWT,
  authorizeRoles("mall-owner", "admin"),
  deleteMall,
);

export default router;
