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

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
