import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
});

AdminSchema.pre('save', async function (next) {
    const admin = this;
    try {
        if (!admin.isModified('password')) {
            return next();
        }
        // Check if the password is not empty
        if (!admin.password) {
            return next(new Error('Password is required'));
        }
        const hash = await bcrypt.hash(admin.password, 10); // 10 is the number of salt rounds
        admin.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});


const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
