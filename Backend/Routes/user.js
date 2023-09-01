const express = require('express')
const router = express.Router();
const userController = require('../Controllers/user')
//user registration route
router.post('/register', userController.register);
//user login route
router.post('/login', userController.login)
module.exports = router;