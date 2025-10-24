const express = require('express');
const router = express.Router();
const passController = require('../controllers/passwordController');

//to test pass routes r accessible
router.get("/test", (req, res) => {
  res.json({ message: "Password route is working" });
});

// Forgot/Reset Password
router.post('/forgot-password', passController.forgotPassword);
router.post('/reset-password/:token', passController.resetPassword);

module.exports = router;