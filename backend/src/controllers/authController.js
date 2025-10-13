
const User = require('../models/User');
const { logger } = require('../logger/logger');
const bcrypt = require('bcryptjs');
const {isValidEmail, isValidPassword, isNotEmpty} = require("../utils/validator");
const {signToken} = require('../utils/jwt');


//Get user
exports.getUser = async (req, res, next) => {
  try {
    const user = req.user;
    // const isUser = await User.findOne({userId: user._id}); No need to fetch user at all since req.user is already populated by authMiddleware.
    if (!user) return res.status(401).json({ error: true, message: "Unauthorized" });

  res.json({
  error: false,
  user: {
    id: user._id,
    username: user.username || user.fullname || user.name, // fallback safe
    email: user.email,
    createdAt: user.createdAt,
  },
  message: "",
});

  } catch (err) {
    next(err);
  }
};

//sign Up
exports.register = async (req, res, next)=>{

    try{
    const {username, email, password} = req.body;
    if(!isNotEmpty(username)){
        return res.status(400).json({error: true, message: "username is required"});
    }
    if(!isValidEmail(email)){
        return res.status(400).json({error: true, message: "email is invalid"});
    }
    if(!isValidPassword(password)){
        return res.status(400).json({error: true, message: "invalid password"});
    }
    const exists = await User.findOne({email});
    if(exists){
        return res.status(409).json({error: true, message: "User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({username, email, password: hashed});
    await user.save();

    const token = signToken(user._id);
    logger.info({user: user._id},"user registered successfully");

    res.status(201).json({error: false, token, 
        user: {id: user._id, username: user.username, email: user.email},
        message: "Registration Successful",
    });
}
catch(err){
next(err);
}
}

//Login
exports.login = async (req, res, next)=>{
     console.log("📩 Request Body:", req.body);
     console.log("🔐 Authorization Header:", req.headers.authorization);
    try{
        const {email, password} = req.body;

    if (!email) {
    return res.status(400).json({error: true, message: "email is required"});
    }
    if (!password) {
    return res.status(400).json({error: true, message: "password is required"});
    }
    if (!isValidEmail(email)) {
    return res.status(400).json({error: true, message: "email is invalid"});
    }
  

    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({error: true, message: "User not found"});
    }

    console.log("Plain password:", password);
    console.log("Hashed in DB:", user.password);


    const matched = await bcrypt.compare(password, user.password);
    console.log("Password match result:", matched);
    if(!matched){
        return res.status(401).json({error: true, message: "Invalid credentials" });
    }
    const token = signToken(user._id);
    logger.info({user: user._id},"user logged in successfully");

    res.status(200).json({error: false, token, 
        user: {id: user._id, username: user.username, email: user.email},
        message: "Signed in Successfully",
    });
    }
    catch(err){
        next(err);
        // res.status(400).json({error: true, message: "Invalid Credentials",});
    }
}