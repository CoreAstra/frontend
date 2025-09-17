// utils/staffOtpService.js
const staffOtpStore = new Map();

exports.generateAndStoreStaffOtp = async (identifier) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 10 * 60 * 1000;
    staffOtpStore.set(identifier, { otp, expiry });
    console.log(`Generated Staff OTP for ${identifier}: ${otp}`);
    return { success: true, otp };
};

exports.verifyStaffOtp = (identifier, otp) => {
    const storedOtpData = staffOtpStore.get(identifier);
    if (!storedOtpData) {
        return { success: false, message: 'OTP not found. Please request a new one.' };
    }
    if (Date.now() > storedOtpData.expiry) {
        staffOtpStore.delete(identifier);
        return { success: false, message: 'OTP has expired.' };
    }
    if (storedOtpData.otp !== otp) {
        return { success: false, message: 'Invalid OTP.' };
    }
    staffOtpStore.delete(identifier);
    return { success: true, message: 'OTP verified successfully.' };
};
