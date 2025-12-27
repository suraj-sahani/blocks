import pino, { stdTimeFunctions } from "pino";

const clientLogger = pino({
  level: "info",
  timestamp: stdTimeFunctions.isoTime,
  browser: {
    asObject: true,
  },
});

export default clientLogger;
