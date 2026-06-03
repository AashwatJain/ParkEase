import express from "express";
import { errorHandler } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(cors({
  origin: true, 
  credentials: true,
}));

import authRouter from "./routes/auth.route.js";
import mallRouter from "./routes/mall.route.js";
import floorRouter from "./routes/floor.route.js";
import slotRouter from "./routes/slot.routes.js";
import BookingRouter from "./routes/booking.route.js";
import AdminRouter from "./routes/admin.route.js";
import ratingRouter from "./routes/rating.route.js";
import ownerRouter from "./routes/owner.route.js";

app.use("/api/auth", authRouter);
app.use("/api/malls", mallRouter);
app.use("/api/malls/:mallId/floors", floorRouter);
app.use("/api/slots", slotRouter);
app.use("/api/bookings", BookingRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/owner", ownerRouter);

app.use(errorHandler);

export { app };
