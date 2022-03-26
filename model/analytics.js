const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    createdTime: { type: Date, default: Date.now() },
    updatedTime: { type: Date, default: Date.now() },

    totalPosts: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
    totalReportedPosts: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 },
    totalUsers: { type: Number, default: 0 },
    totalNewUsers: { type: Number, default: 0 },
    totalBlockedUser: { type: Number, default: 0 },
    totalPostsInWeek: { type: Number, default: 0 },
});

const Analytics = mongoose.model('analytics', analyticsSchema, 'analytics');
module.exports = Analytics;
