const mongoose = require('mongoose');
const constant = require('../constant');

const commentSchema = new mongoose.Schema({
    createdTime: { type: Date, default: Date.now() },
    updatedTime: { type: Date, default: Date.now() },
    authorId: { type: String },
    postId: { type: String, required: true },
    commentId: { type: String },
    parentId: { type: String },
    totalChildren: { type: Number, default: 0 },
    content: {
        type: String,
        required: true,
    },

    reportCount: { type: Number, default: 0 }
});

const Comment = mongoose.model('comments', commentSchema, 'comments');
module.exports = Comment;
