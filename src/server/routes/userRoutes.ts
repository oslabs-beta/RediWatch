const express = require('express');
const router = express.Router();
const { signupUser, signinUser } = require('../controllers/userController');

router.post('/signup', signupUser);
router.post('/signin', signinUser);

module.exports = router;