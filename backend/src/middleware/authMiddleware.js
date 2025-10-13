// src/middleware/authMiddleware.js
const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      return res.status(401).json({ message: 'Token invalid or expired' });
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {  //token valid but user not found.
      return res.status(401).json({ message: 'Invalid token' });
    }
    // if user found with valid token then Attach user to req and allow the request to continue
    req.user = user;
    next();
    
  } catch (err) {
    return res.status(500).json({ message: 'Auth middleware error' });
  }
};

module.exports = authMiddleware;
