const express = require('express');
const router = express.Router();

// User pages
router.get('/login', (req, res) => res.render('users/login'));
router.get('/signup', (req, res) => res.render('users/signup'));

module.exports = router;
