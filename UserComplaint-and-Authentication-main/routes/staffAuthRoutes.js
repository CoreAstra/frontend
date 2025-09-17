const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffAuthController');

// Render login page
router.get('/login', staffController.getSuperAdminLoginPage);

// Login POST
router.post('/login', staffController.staffLogin);

// Add official page (GET) - only for Superadmin
router.get('/add-official', staffController.protectSuperAdminRoute, (req, res) => {
    res.render('staff/addOfficial'); // addOfficial.ejs in views/staff/
});

// Add official (POST)
router.post('/add-official', staffController.protectSuperAdminRoute, staffController.addOfficial);

module.exports = router;
