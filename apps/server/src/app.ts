import "dotenv/config";

import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import pino from "pino-http";
import healthRouter from "@/api/health/router";
import projectsRouter from "@/api/projects/router";

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3001;

const app: Express = express();
const logger = pino().logger;

app.use(cors());
app.use(helmet());
app.use(pino());
app.use(express.json());

app.get("/health", healthRouter);
app.use("/projects", projectsRouter);

const server = app.listen(PORT, HOST, () => {
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
