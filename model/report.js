const mongoose = require('mongoose');
const constant = require('../constant');

const reportSchema = new mongoose.Schema({
    createdTime: { type: Date, default: Date.now() },
    updatedTime: { type: Date, default: Date.now() },
    reportId: { type: String, unique: true },
    authorId: { type: String },

    postId: { type: String },
    commentId: { type: String },

    content: {
        type: String,
        required: true,
        validate: {
            validator: function (content) {
                return content.length > 10;
            },
            message: 'Report content must be more than 10 characters',
        },
    },
    status: { type: String, enum: constant.ReportStatus },

    reportType: { type: String, enum: constant.PostReportedType },
});

const Report = mongoose.model('reports', reportSchema, 'reports');
module.exports = Report;
