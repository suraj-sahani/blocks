import pino, { Logger, stdTimeFunctions } from "pino";

export const logger: Logger =
  process.env["NODE_ENV"] === "production"
    ? // JSON in production
      pino({ level: "warn", timestamp: stdTimeFunctions.isoTime })
    : // Pretty print in development
      pino({
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "yyyy-mm-dd HH:MM:ss",
          },
        },
        level: "debug",
        timestamp: stdTimeFunctions.isoTime,
      });
