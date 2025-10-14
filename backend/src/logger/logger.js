const pino = require('pino');
const expressPino = require('express-pino-logger');

const isDev = process.env.NODE_ENV === 'development';

const logger = pino({
  base: null,   //to remove pid & hostname globally to keep logs clean
  level: isDev ? 'debug' : 'info',   // more verbose in dev
  transport: isDev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
          ignore: "pid,hostname",
          messageFormat: "{msg}",
        },
      }
    : undefined,  // no pretty-print in production
});

const expressLogger = expressPino({
  logger,
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
   autoLogging: {
    ignore: (req) =>
      req.url === "/favicon.ico" || req.url.startsWith("/static") || req.url === '/health',
  },
});

module.exports = { logger, expressLogger };
