//handling register + login routes here 

const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

//Public 
router.post('/register',authController.register); //Register
router.post('/login', authController.login); // Login

//Protected 
// router.use(auth);  or pass as parameter
router.get('/get-user', auth, authController.getUser); //Get User

module.exports = router;
