import express from "express";
import { authorizeRoles } from "../middleware/role.middleware";
import { verifyJWT } from "../middleware/auth.middleware";
import {
  getPendingMalls,
  approveMalls,
  rejectMalls,
  getstats,
} from "../controllers/admin.controller.js";

const router = express.Router();

app.get("/malls/pending", verifyJWT, authorizeRoles("admin"), getPendingMalls);
app.patch(
  "/malls/:mallId/approve",
  verifyJWT,
  authorizeRoles("admin"),
  approveMalls,
);
app.patch(
  "/malls/:mallId/reject",
  verifyJWT,
  authorizeRoles("admin"),
  rejectMalls,
);
app.get("/platform-stats", verifyJWT, authorizeRoles("admin"), getstats);

export default router;