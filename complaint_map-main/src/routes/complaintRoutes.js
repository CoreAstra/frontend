// src/routes/complaintRoutes.js
const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.get('/all', complaintController.getAllComplaints);

module.exports = router;
