import express from "express";
import { errorHandler } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import authRouter from "./routes/auth.route.js";
import mallRouter from "./routes/mall.route.js";

app.use("/api/auth", authRouter);
app.use("/api/malls", mallRouter);

app.use(errorHandler);

export { app };
