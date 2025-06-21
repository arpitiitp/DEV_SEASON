const express = require('express');
const router = express.Router();
const { register, login, logout, getMe } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, getMe);

module.exports = router;