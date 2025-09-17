// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const otpService = require('../utils/otpService');
const { isValidAadhar, generateUsername } = require('../utils/validators');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '90d',
    });
};

exports.sendOtp = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({ error: "Phone number is required" });
        }
        const result = await otpService.generateAndStoreOtp(phone);
        if (result.success) return res.json({ message: "OTP sent successfully!" });
        return res.status(500).json({ error: result.error || "Failed to send OTP" });
    } catch (err) {
        console.error("sendOtp Error:", err);
        res.status(500).json({ error: "Server error while sending OTP" });
    }
};

// Signup via API (keeps OTP logic & username rules)
exports.signup = async (req, res) => {
    try {
        const {
            fullName, email, phone,
            password, confirmPassword, otp,
            aadharNumber, passportNumber, gender,
            dateOfBirth, username
        } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ status: 'fail', message: 'Passwords do not match.' });
        }

        const otpVerification = otpService.verifyOtp(phone, otp);
        if (!otpVerification.success) return res.status(400).json({ status: 'fail', message: otpVerification.message });

        let userType;
        let idData = {};

        if (aadharNumber) {
            userType = 'citizen';
            if (!isValidAadhar(aadharNumber)) {
                return res.status(400).json({ status: 'fail', message: 'Invalid Aadhar number format.' });
            }
            idData = { aadharNumber };
        } else if (passportNumber) {
            userType = 'foreigner';
            idData = { passportNumber };
        } else {
            return res.status(400).json({ status: 'fail', message: 'Aadhar or Passport number is required.' });
        }

        const usernameRegex = /^[a-z0-9_]{3,15}$/;
        if (!username || !usernameRegex.test(username)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid username. It must be 3-15 lowercase characters, numbers, or underscores.'
            });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            const suggestions = [
                await generateUsername(username, User),
                await generateUsername(`${username}_`, User),
            ];
            return res.status(409).json({
                status: 'fail',
                message: 'Username already exists. Try another one.',
                suggestions,
            });
        }

        const newUser = await User.create({
            fullName, username, email, phone, password,
            userType, ...idData, isPhoneVerified: true, gender, dateOfBirth
        });

        const token = signToken(newUser._id);
        newUser.password = undefined;

        res.status(201).json({
            status: 'success',
            token,
            data: { user: newUser }
        });

    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(409).json({ status: 'fail', message: `An account with this ${field} already exists.` });
        }
        res.status(500).json({ status: 'error', message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ status: 'fail', message: 'Please provide email and password.' });

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ status: 'fail', message: 'Incorrect email or password.' });
        }

        const token = signToken(user._id);
        user.password = undefined;
        // res.status(200).json({ status: 'success', token, data: { user } });
         // Login success → redirect
        res.redirect("/complaints/new");
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Something went wrong.' });
    }
};
