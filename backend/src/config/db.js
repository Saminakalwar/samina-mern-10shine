const mongoose = require('mongoose');
const { logger } = require('../logger/logger');

const connectDB = async () => {
  const url = process.env.MONGO_URI;

  if (!url) throw new Error('MONGO_URI is not set');

  try {
    await mongoose.connect(url);
    logger.info("MongoDB connected");
  } catch (err) {
    logger.error(" MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;