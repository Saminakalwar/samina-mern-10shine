const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Signing a jwt token by userid
exports.signToken = (userId)=>{
    return jwt.sign({id: userId}, JWT_SECRET, {expiresIn: '7d'});
}

// verify a JWT token
exports.verifyToken = (token)=>{
return jwt.verify(token, JWT_SECRET);
}