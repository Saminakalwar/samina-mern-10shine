const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    title:{ type: String, required: true, trim: true },
    content: { type: String, default: '' }, // store rich text as HTML string
    createdOn: {type: Date, default: new Date().getTime()},
  },{timestamps: true});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;

