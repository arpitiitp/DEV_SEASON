const express = require('express');
const router = express.Router();
const { register, login, logout, getMe ,forgetPassword} = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forget-password',forgetPassword)
router.get('/me', authenticate, getMe);

module.exports = router;