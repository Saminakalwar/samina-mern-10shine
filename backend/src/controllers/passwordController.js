const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { logger } = require('../logger/logger');
const bcrypt = require("bcryptjs");
const { verifyToken, signResetToken } = require('../utils/jwt');

exports.forgotPassword = async (req, res)=>{
    const reqId = req.id;

    try{
    const {email} = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ error: true, message: "Email is required" });
    }

    const user = await User.findOne({email});

    if(!user){
        logger.warn({ reqId, email }, "Forgot password failed — user not found");
        return res.status(404).json({ message: "User not found" });
    }

    const token = signResetToken(user._id);
        
    // set up nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    })

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const mailOptions = {
        from: `"Notes App Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Password Reset Request",
        html: `
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password for your Notes App account.</p>
        <p><a href="${resetLink}" style="color:#1a73e8;">Click here to reset your password</a></p>
        <p><small>This link will expire in 10 minutes. If you didn’t request this, please ignore this email.</small></p>
        `,

    };
        //send email
    await transporter.sendMail(mailOptions);

    logger.info({ reqId, email}, "Password reset email sent");
    res.status(200).json({ success: true, message: "Password reset link sent successfully" });
    }
    catch(err){
    logger.error({ reqId, error: err.message }, "Error in forget password");
    res.status(500).json({ error: true, message: "Server error" });

    }
};

//Reset Password
exports.resetPassword = async (req, res) => {
  const reqId = req.id;

  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    let decoded;
    try {
      decoded = verifyToken(token);
    } 
    catch (verifyErr) {
      logger.warn({ reqId, error: verifyErr.message }, "Token verification failed");
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (!decoded?.id) {
      logger.warn({ reqId }, "Decoded token missing id");
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    logger.info({ reqId, userId: user._id }, "Password reset successful");
    res.status(200).json({ success: true, message: "Password has been reset successfully" });
  } 
  catch (err) {
    logger.error({ reqId, error: err.message }, "Error in reset password");
    res.status(500).json({ message: "Server error" });
  }
};
