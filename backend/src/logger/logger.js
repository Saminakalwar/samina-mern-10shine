const pino = require('pino');
const expressPino = require('express-pino-logger');

const isDev = process.env.NODE_ENV === 'development';

const logger = pino({
  level: isDev ? 'debug' : 'info',   // more verbose in dev
  transport: isDev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
          ignore: "pid,hostname",
        },
      }
    : undefined,  // no pretty-print in production
});

const expressLogger = expressPino({ logger });

module.exports = { logger, expressLogger };





