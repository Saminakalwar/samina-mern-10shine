const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./src/config/db');
const {logger, expressLogger} = require('./src/logger/logger');

const cors = require('cors');
const { randomUUID } = require('crypto');

const authRoutes = require('./src/routes/authRoutes');
const noteRoutes = require('./src/routes/noteRoutes');
const errorMiddleware = require('./src/middleware/errorMiddleware');

const app = express();


// Global Middlewares 
app.use(express.json());  // to parse json data 
app.use(cors());

// Adds a unique ID to each request for traceable logging
app.use((req, res, next) => {
  req.id = randomUUID();
  next();
});

//to log each request(method, path, status)
app.use(expressLogger); 

//Routes

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

//404-error handler
app.use((req, res) => {
  logger.warn({ reqId: req.id, url: req.originalUrl }, '404 - Route not found');
  res.status(404).json({ error: true, message: 'Route not found' });
});

//global error handler(must be the last)
app.use(errorMiddleware);

// Server + DB initialization
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info({
      msg:`Server started successfully`,
      port: PORT,
      env: process.env.NODE_ENV || 'development',
  });
    });
  })
  .catch((err) => {
    
    logger.error({
      msg: 'DB connection Failed',
      error: err.message
    });
    process.exit(1);
  });

  //Graceful shutdown 
  process.on('SIGINT', () => {
  logger.info('🛑 Server shutting down...');
  process.exit(0);
});