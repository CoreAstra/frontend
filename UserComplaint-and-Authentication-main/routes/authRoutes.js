const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// OTP API
router.post('/send-otp', authController.sendOtp);

// -------- Render Pages --------
router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.get('/login', (req, res) => {
    res.render('users/login');
});

// -------- Handle Form Submissions --------
router.post('/signup', authController.signup);  // <-- missing
router.post('/login', authController.login);    // <-- missing

module.exports = router;
