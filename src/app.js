import express from "express";
import { errorHandler } from "./middleware/error.middleware";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


import authRouter from "./routes/auth.route.js";

app.use("/api/auth", authRouter);

app.use(errorHandler);

export { app };
