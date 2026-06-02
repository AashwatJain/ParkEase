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
} from "../controllers/admin.controller.js";

const router = express.Router();

app.use(verifyJWT, authorizeRoles("admin"));

app.get("/malls/pending", getPendingMalls);
app.patch("/malls/:mallId/approve", approveMalls);
app.patch("/malls/:mallId/reject", rejectMalls);
app.get("/platform-stats", getstats);

app.get("/all-malls", allMalls);
app.patch("/unban/:userId", ban);
app.patch("/unban/:userId", unban);

export default router;