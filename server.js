import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import { connectDB } from "./database/database.js";
import "express-async-errors";
import authMiddleware from "./middleware/auth.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";
import helmet from "helmet";
import xss from "xss-clean";

import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

// Middleware
app.use(express.json()).use(helmet()).use(xss());

// Production
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Database
connectDB();

app.get("/api", (req, res) => {
  res.send({ message: "Hello World" });
});

// Auth routes
app.use("/api/auth", authRouter);

// Jobs routes
app.use("/api/jobs", authMiddleware, jobsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
