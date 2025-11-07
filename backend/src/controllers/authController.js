const User = require('../models/User');
const { logger } = require('../logger/logger');
const bcrypt = require('bcryptjs');
const {isValidEmail, isValidPassword, isNotEmpty} = require("../utils/validator");
const {signToken} = require('../utils/jwt');

//Get user
exports.getUser = async (req, res, next) => {
   const reqId = req.id;
    
  try {
    const user = req.user;
   
    if (!user) {
    logger.warn({ reqId }, "Unauthorized access attempt to getUser");
    return res.status(401).json({ error: true, message: "Unauthorized" });
    }

    res.json({
    error: false,
    user: { id: user._id, username: user.username, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt },
    message: "user info fetched successfully",
    });

  } catch (err) {
    logger.error({ reqId, error: err.message }, "Error fetching user");
    next(err);
  }
};

//sign Up
exports.register = async (req, res, next)=>{
    const reqId = req.id;

    try{
    const {username, email, password} = req.body;
    
    // Validation 
    if(!isNotEmpty(username)){
        return res.status(400).json({error: true, message: "username is required"});
    }
    if(!isValidEmail(email)){
        return res.status(400).json({error: true, message: "email is invalid"});
    }
    if(!isValidPassword(password)){
        return res.status(400).json({error: true, message: "invalid password"});
    }

    //checking either user exists or not
    const exists = await User.findOne({email});
    if(exists){
        logger.warn({ reqId, email }, "Registration failed: user already exists");
        return res.status(409).json({error: true, message: "User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    //saving user in database
    const user = new User({username, email, password: hashed});
    await user.save();

    const token = signToken(user._id);
    logger.info({reqId, user: user._id},"user registered successfully");

    res.status(201).json({error: false, token, 
        user: { id: user._id, username: user.username, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt },
        message: "Registration Successful",
    });
    }
    catch(err){
    logger.error({ reqId, error: err.message }, "Error during registration");
    next(err);
    }
    }

//Login
exports.login = async (req, res, next)=>{
    
        const reqId = req.id;  //to trace request ids by logger
        const {email, password} = req.body;

    try{

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
        logger.warn({ reqId, email }, 'Login failed — user not found');
        return res.status(401).json({error: true, message: "User not found"});
    }

    const matched = await bcrypt.compare(password, user.password);

    if(!matched){
        logger.warn({ reqId, email }, 'Login failed — invalid password');
        return res.status(401).json({error: true, message: "Invalid credentials" });
    }
    const token = signToken(user._id);
    logger.info({ reqId, userId: user._id }, 'User logged in successfully');

    res.status(200).json({error: false, token, 
        user: { id: user._id, username: user.username, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt },
        message: "Signed in Successfully",
    });
    }
    catch(err){
        logger.error({ reqId, email, err: err.message }, 'Login error');
        next(err);
    }
}

