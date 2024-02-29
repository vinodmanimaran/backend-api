import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    userIP: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics;
