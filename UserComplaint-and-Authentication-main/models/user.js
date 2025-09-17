// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required.'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email.'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required.'],
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: 8,
        select: false,
    },
    userType: {
        type: String,
        enum: ['citizen', 'foreigner'],
        required: true,
    },
    aadharNumber: {
        type: String,
        unique: true,
        sparse: true,
        required: function() { return this.userType === 'citizen'; },
    },
    passportNumber: {
        type: String,
        unique: true,
        sparse: true,
        required: function() { return this.userType === 'foreigner'; },
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    dateOfBirth: {
        type: Date,
    },
    civicScore: {
        type: Number,
        default: 0,
    },
    isPhoneVerified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
