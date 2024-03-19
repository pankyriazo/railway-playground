import "dotenv/config";

import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import healthRouter from "@/api/health/router";
import projectsRouter from "@/api/projects/router";
import deploymentsRouter from "@/api/deployments/router";
import { logger, loggerMiddleware } from "@/logger";

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3001;

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(loggerMiddleware);
app.use(express.json());

app.use("/health", healthRouter);
app.use("/projects", projectsRouter);
app.use("/deployments", deploymentsRouter);

export const server = app.listen(PORT, HOST, () => {
  logger.info(`Server is running at ${HOST}:${PORT}`);
});

const shutdown = () => {
  logger.info("Shutting down server");

  server.close(() => {
    logger.info("Server is shut down");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
