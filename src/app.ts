import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config";
import { logger } from "./common/logger";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Logger middleware
const morganFormat = config.env === "development" ? "dev" : "combined";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  })
);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "codezest-activity" });
});

import activityRoutes from "./presentation/routes/activity.routes";

// Routes
app.use("/api/v1", activityRoutes);

export default app;
