const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String,required: true, trim: true, maxlength: 100},
    email: {type: String, required: true, unique: true, lowercase: true, trim: true },
    password: {type: String,required: true},
    createdOn: {type: Date, default: new Date().getTime()},
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;
