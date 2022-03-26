const mongoose = require('mongoose');
const constant = require('../constant');

const postSchema = new mongoose.Schema({
    createdTime: { type: Date, default: Date.now() },
    updatedTime: { type: Date, default: Date.now() },
    authorId: { type: String },
    postId: { type: String },
    categoryId: { type: String },
    content: {
        type: String,
        required: true,
        validate: {
            validator: function (content) {
                return content.length > 10;
            },
            message: 'Post content must be more than 10 characters',
        },
    },
    title: {
        type: String,
        required: true,
        validate: {
            validator: function (title) {
                return title.length > 4;
            },
            message: 'Post title must be more than 4 characters',
        },
    },
    slug: { type: String },
    excerpt: { type: String },
    totalViews: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
    label: { type: String, enum: constant.PostLabel },
    tag: { type: String },
    status: { type: String, enum: constant.PostStatus },

    reportCount: { type: Number, default: 0 }
});

const Post = mongoose.model('posts', postSchema, 'posts');
module.exports = Post;
