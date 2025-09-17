// controllers/staffAuthController.js
const jwt = require('jsonwebtoken');
const Staff = require('../models/staff');
const staffOtpService = require('../utils/staffOtpService');
const bcrypt = require('bcryptjs');

const generateOfficialId = async () => {
    let uniqueId;
    let isUnique = false;
    while (!isUnique) {
        const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
        uniqueId = `OF${randomNumber}`;
        const existingStaff = await Staff.findOne({ uniqueId });
        if (!existingStaff) isUnique = true;
    }
    return uniqueId;
};

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '90d',
    });
};

// controllers/staffAuthController.js

exports.getSuperAdminLoginPage = (req, res) => {
    res.render('staff/superadminLogin');
};


// Protect route middleware requiring SuperAdmin (JSON Web Token)
exports.protectSuperAdminRoute = async (req, res, next) => {
    try {
        const superadminId = req.session.superadminId;

        if (!superadminId) {
            return res.redirect('/staff/login');  // redirect to login
        }

        const currentUser = await Staff.findById(superadminId);
        if (!currentUser || currentUser.role !== 'superadmin') {
            return res.status(403).send('You do not have permission.');
        }

        req.user = currentUser;
        next();
    } catch (err) {
        console.error(err);
        res.redirect('/staff/login');
    }
};


exports.addOfficial = async (req, res) => {
    try {
        const { fullName, email, gender, dateOfBirth, aadharNumber, department, sector, phone, password } = req.body;

        const uniqueId = await generateOfficialId();

        const newOfficial = await Staff.create({
            uniqueId,
            fullName,
            email,
            gender,
            dateOfBirth,
            aadharNumber,
            department,
            sector,
            phone,
            password,
            role: 'official',
        });

        res.status(201).json({
            status: 'success',
            message: 'Official added successfully.',
            data: { official: newOfficial }
        });
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(409).json({ status: 'fail', message: `A user with this ${field} already exists.` });
        }
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.staffLogin = async (req, res) => {
    try {
        const { uniqueId, password } = req.body;

        if (!uniqueId || !password) {
            return res.status(400).render('staff/superadminLogin', { error: 'Please provide ID and password.' });
        }

        const staff = await Staff.findOne({ uniqueId }).select('+password');
        if (!staff || !(await staff.correctPassword(password, staff.password))) {
            return res.status(401).render('staff/superadminLogin', { error: 'Incorrect ID or password.' });
        }

        // Save logged-in user in session
        req.session.superadminId = staff._id;

        // Redirect to Add Official page
        res.redirect('/staff/add-official');

    } catch (err) {
        console.error(err);
        res.status(500).render('staff/superadminLogin', { error: 'Something went wrong.' });
    }
};



exports.sendOtpToStaff = async (req, res) => {
    try {
        const { uniqueId } = req.body;
        if (!uniqueId) return res.status(400).json({ error: "Unique ID is required" });

        const staff = await Staff.findOne({ uniqueId });
        if (!staff) return res.status(404).json({ error: "Staff with this ID not found." });

        const result = await staffOtpService.generateAndStoreStaffOtp(staff.phone);
        if (result.success) return res.json({ message: "OTP sent to registered phone number!" });

        res.status(500).json({ error: result.error || "Failed to send OTP" });
    } catch (err) {
        console.error("sendOtp Error:", err);
        res.status(500).json({ error: "Server error while sending OTP" });
    }
};
