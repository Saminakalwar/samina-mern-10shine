const Note = require('../models/Note');
const {logger} = require('../logger/logger');

exports.createNote = async (req, res, next) => {
  const { title, content } = req.body;
  const user = req.user;

   if (!title?.trim()) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }
  if (!content?.trim()) {
    return res.status(400).json({ error: true, message: "Content is required" });
  }

  try {
    const note = await Note.create({ user: user._id, title, content });
    logger.info({ note: note._id, user: user._id }, "Note created");
    res.status(201).json({ error: false, note, message: "Note added successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getNotes = async (req, res, next) => {
  const user = req.user;
  try {
    const notes = await Note.find({ user: user._id }).sort({ updatedAt: -1 });
    res.json({ error: false, notes, message: "All notes retrieved successfully" });
  } catch (err) {
    next(err);
    // res.status(500).json({ error: true, message: "Internal server error" });
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const user = req.user;

    if (!title && !content) {
      return res.status(400).json({ error: true, message: "No changes provided" });
    }

    const updateFields = {};
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: user._id },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    logger.info({ note: note._id, user: user._id }, "Note updated");
    return res.json({ error: false, note, message: "Note updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  const user = req.user;
  const noteId = req.params.id;
  try {
    const note = await Note.findOneAndDelete({ _id: noteId, user: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: 'Note not found' });
    }

    logger.info({ note: note._id }, 'Note deleted');
    res.json({ error: false, message: 'Note deleted successfully' });
  } catch (err) {
    next(err);
    res.status(500).json({ error: true, message: 'Internal server error' });
  }
};
