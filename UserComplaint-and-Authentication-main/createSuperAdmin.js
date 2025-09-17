const mongoose = require('mongoose');
const Staff = require('./models/staff'); 
const dotenv = require('dotenv');

// Corrected path to .env
dotenv.config({ path: './.env' });

const DB = process.env.MONGO_URI;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB connection successful! ✅');
    createSuperAdmin();
}).catch((error) => {
    console.error('DB connection error: ❌', error);
});

const createSuperAdmin = async () => {
    const uniqueId = "SA00000001";

    try {
        const existingAdmin = await Staff.findOne({ uniqueId });
        if (existingAdmin) {
            console.log("Super Admin already exists. Exiting.");
            mongoose.connection.close();
            return;
        }

        await Staff.create({
            uniqueId,
            fullName: "Super Admin",
            email: "admin@example.com",
            gender: "other",
            department: "Not Applicable",
            role: "superadmin",
            phone: "9999999999",
            password: "superadmin123",
            sector: { state: "Maharashtra", city: "Pune", locality: "Kothrud" },
            isPhoneVerified: true,
        });

        console.log("Super Admin created successfully! 🎉");
    } catch (error) {
        console.error("Error creating Super Admin:", error.message);
    } finally {
        mongoose.connection.close();
        console.log("Database connection closed.");
    }
};
