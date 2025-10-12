const express = require('express');
const connectDB = require('./src/config/db');
const {logger, expressLogger} = require('./src/logger/logger');

const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());  // to parse json ,whenever 
app.use(cors());
app.use(expressLogger);  //to log each request(method, path, status)

const PORT = process.env.PORT || 5000;

// Simple test route
app.get('/', (req, res) => {
  res.send('Backend server is running...');
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('Unable to connect to DB', err);
    process.exit(1);
  });




