const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String,required: true, trim: true, maxlength: 100},
    email: {type: String, required: true, unique: true, lowercase: true, trim: true },
    password: {type: String, required: true},
    profilePic: {type: String, default: ""},
    profileData: {
        fullname: String,
        gender: String,
        country: String,
        language: String,
        timezone: String,
        linkedin: String,
        github: String,
},
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;


