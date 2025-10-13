// src/middleware/errorMiddleware.js
const { logger } = require('../logger/logger');

module.exports = (err, req, res, next) => {
  logger.error({ err, path: req.path }, 'Unhandled error');
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal server error' });
};
