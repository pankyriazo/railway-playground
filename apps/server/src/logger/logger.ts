import pino from "pino-http";

export const loggerMiddleware = pino({
  enabled: process.env.NODE_ENV !== "test",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export const logger = loggerMiddleware.logger;
