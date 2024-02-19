import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    ipAddress: {
        type: String,
    },
    deviceID: { 
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

export default User;
