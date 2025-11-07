const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const noteController = require('../controllers/noteController');

// all routes protected by auth
router.use(auth);

router.get('/search', noteController.searchNotes);
router.get('/', noteController.getNotes);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote); 

module.exports = router;