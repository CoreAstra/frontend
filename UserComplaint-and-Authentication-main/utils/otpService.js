// utils/otpService.js
const otpStore = new Map();

/**
 * Generates a 6-digit OTP, stores it, and logs it to console.
 */
exports.generateAndStoreOtp = async (phone) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(phone, { otp, expiry });
    console.log(`Generated OTP for ${phone}: ${otp}`); // For testing

    return { success: true, otp };
};

/**
 * Verifies the OTP for a given phone number.
 */
exports.verifyOtp = (phone, otp) => {
    const storedOtpData = otpStore.get(phone);

    if (!storedOtpData) {
        return { success: false, message: 'OTP not found. Please request a new one.' };
    }
    if (Date.now() > storedOtpData.expiry) {
        otpStore.delete(phone);
        return { success: false, message: 'OTP has expired.' };
    }
    if (storedOtpData.otp !== otp) {
        return { success: false, message: 'Invalid OTP.' };
    }

    otpStore.delete(phone);
    return { success: true, message: 'OTP verified successfully.' };
};
