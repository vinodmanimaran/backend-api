import Analytics from '../models/Analytics.js';

export async function trackAnalytics(req, res, next) {
    const { uniqueURL } = req.params;
    const userIP = req.ip;

    await Analytics.create({ url: uniqueURL, userIP });

    next();
}

export async function getAnalytics(req, res, next) {
    try {
        const { uniqueURL } = req.params;

        const analytics = await Analytics.aggregate([
            { $match: { url: uniqueURL } },
            { $group: { _id: "$userIP", count: { $sum: 1 } } }
        ]);

        res.json(analytics);
    } catch (error) {
        next(error);
    }
}
