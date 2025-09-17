// utils/validators.js

exports.isValidAadhar = (aadhar) => {
    // basic validation: 12 digits
    return /^\d{12}$/.test(aadhar);
};

exports.generateUsername = async (base, UserModel) => {
    // Try base + number suffix until unique
    let candidate = base;
    let i = 1;
    while (await UserModel.findOne({ username: candidate })) {
        candidate = `${base}${i}`;
        i++;
        if (i > 50) break;
    }
    return candidate;
};