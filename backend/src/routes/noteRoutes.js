const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const noteController = require('../controllers/noteController');

// all routes protected by auth
router.use(auth);

router.get('/', noteController.getNotes);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote); 

module.exports = router;






// initial code

// const express = require('express');
// const Note = require('../models/Note');
// const verifyToken = require('../middleware/verifyToken');
// const router = express.Router();

// //Create Note 

// router.post('/', verifyToken, async (req, res)=>{
//     const {title, content} = req.body;
//     const newNote = new Note({title, content, userId: req.user.id});
//     await newNote.save();
//     res.json(newNote);
// });

// //read note

// router.get('/', verifyToken, async (req, res)=>{
// const notes = await Note.find({userId: req.user.id});
// res.json(notes);
// })

// //Delt

// router.put('/:id', verifyToken, async (req, res)=>{
//     const { title, content } = req.body;
//     const updated = await Note.findOneAndUpdate(
//         {_id: req.params.id, userId: req.user.id},
//         {title, content},
//         {new: true}
//     );
//     res.json(updated);
// })

// //delete note

// router.delete('/:id',verifyToken, async (req, res)=>{
//     await Note.findOneAndDelete(
//         {_id: req.params.id, userId: req.user.id});
//         res.json({message: 'Note deleted'});
// })

// module.exports = router;