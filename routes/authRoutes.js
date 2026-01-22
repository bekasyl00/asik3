// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateAuth = require('../middleware/validateAuth');

router.post('/register', validateAuth, authController.register);
router.post('/login', validateAuth, authController.login);
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out' });
    });
});

module.exports = router;
