import express from "express";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  getPendingMalls,
  approveMalls,
  rejectMalls,
  getstats,
  allMalls,
  ban,
  unban,
  getAllUsers,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.use(verifyJWT, authorizeRoles("admin"));

router.get("/malls/pending", getPendingMalls);
router.patch("/malls/:mallId/approve", approveMalls);
router.patch("/malls/:mallId/reject", rejectMalls);
router.get("/platform-stats", getstats);

router.get("/all-malls", allMalls);
router.get("/users", getAllUsers);
router.patch("/ban/:userId", ban);
router.patch("/unban/:userId", unban);

export default router;