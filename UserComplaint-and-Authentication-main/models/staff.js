// models/staff.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const staffSchema = new mongoose.Schema({
    uniqueId: { 
        type: String,
        required: [true, 'Unique ID is required.'],
        unique: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email.'],
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    dateOfBirth: {
        type: Date,
    },
    aadharNumber: {
        type: String,
        unique: true,
        sparse: true,
    },
    department: {
        type: String,
        enum: [
            'Garbage and Cleaning Department',
            'Roads and Buildings Department',
            'Water Supply Department',
            'Health Department',
            'Not Applicable'
        ],
        required: [true, 'Department is required.'],
    },
    sector: {
            type: new mongoose.Schema({
                state: { type: String, required: true },
                city: { type: String, required: true },
                locality: { type: String, required: true },
            }, { _id: false }) // _id: false prevents creating an extra _id for sector
        },
    role: {
        type: String,
        enum: ['official', 'superadmin'],
        required: [true, 'Role is required.'],
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        select: false,
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required.'],
        unique: true,
    },
    isPhoneVerified: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
    },
}, { timestamps: true });

staffSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

staffSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
