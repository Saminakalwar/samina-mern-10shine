const Note = require('../models/Note');
const {logger} = require('../logger/logger');

//create note
exports.createNote = async (req, res, next) => {
  const { title, content } = req.body;
  const user = req.user;
  const reqId = req.id;

   if (!title?.trim()) {
    logger.warn({ reqId }, "Validation failed: title missing");
    return res.status(400).json({ error: true, message: "Title is required" });
  }
  if (!content?.trim()) {
    logger.warn({ reqId }, "Validation failed: content missing");
    return res.status(400).json({ error: true, message: "Content is required" });
  }

  try {
    const note = await Note.create({ user: user._id, title, content });
    logger.info({ reqId, note: note._id, user: user._id }, "Note created");
    res.status(201).json({ error: false, note, message: "Note added successfully" });
  } 
  catch (err) {
    logger.error({reqId, error: err.message}, 'Error creating note')
    next(err);
  }
};

//fetch notes
exports.getNotes = async (req, res, next) => {
  const user = req.user;
  const reqId = req.id;
  try {
    const notes = await Note.find({ user: user._id }).sort({ updatedAt: -1 });
    logger.info({ reqId, user: user._id, count: notes.length }, "Notes retrieved");
    res.json({ error: false, notes, count:notes.length, message: "All notes retrieved successfully" });
  } 
  catch (err) {
    logger.error({ reqId, error: err.message }, "Error retrieving notes");
    next(err);
  }
};

//update note
exports.updateNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const user = req.user;
    const reqId = req.id;

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
      logger.warn({ reqId, noteId: req.params.id, user: user._id }, "Note not found for update");
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    logger.info({reqId, note: note._id, user: user._id }, "Note updated");
    return res.json({ error: false, note, message: "Note updated successfully" });
  }
   catch (err) {
    logger.error({ reqId, error: err.message }, "Error updating note");
    next(err);
  }
};

//delete note
exports.deleteNote = async (req, res, next) => {
  const user = req.user;
  const noteId = req.params.id;
  const reqId = req.id;
  try {
    const note = await Note.findOneAndDelete({ _id: noteId, user: user._id });

    if (!note) {
      logger.warn({ reqId, noteId, user: user._id }, "Note not found for deletion");
      return res.status(404).json({ error: true, message: 'Note not found' });
    }

    logger.info({ reqId, note: note._id, user: user._id }, "Note deleted");
    res.json({ error: false, message: 'Note deleted successfully' });
  } 
  catch (err) {
    logger.error({ reqId, error: err.message }, "Error deleting note") 
    next(err);
  }
};

//search notes
exports.searchNotes = async (req, res, next)=>{
    const user = req.user;
    const reqId = req.id;
    const {query} = req.query;
    
    if(!query?.trim()){
      logger.warn({reqId, user: user?._id}, "Search Failed - query missing");
      return res.status(400).json({error: true, message: "Search query is required"});
    }

    try{
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const matchingNotes = await Note.find({
          user: user._id,
          $or: [
            { title: { $regex: new RegExp(escapedQuery, "i") } },
            { content: { $regex: new RegExp(escapedQuery, "i") } },
          ],
        }).sort({ updatedAt: -1 });

        logger.info({
          reqId, 
          user: user._id,
          query,
          results: matchingNotes.length,
        }, "Notes search Successful"
      );

        return res.json({
          error: false,
          notes: matchingNotes,
          message: "Notes matching the search query retrieved successfully",
        });
    }
    catch(err){
      logger.error({reqId, user: user?._id, error: err.message}, "Error in Search Notes");
      next(err);
    }
};