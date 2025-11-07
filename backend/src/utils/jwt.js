const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.signToken = (userId) => jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
exports.signResetToken = (userId) => jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '10m' });
exports.verifyToken = (token) => jwt.verify(token, JWT_SECRET);

