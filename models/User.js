import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    location: {
        country: {
            type: String,
            default: "Unknown"
        },
        city: {
            type: String,
            default: "Unknown"
        }
    },
    deviceID: { 
        type: String,
    },
    ipAddress: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

export default User;
