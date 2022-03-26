const mongoose = require('mongoose');
const constant = require('../constant');

const chatSchema = new mongoose.Schema({
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
});

const findPartnerSchema = new mongoose.Schema({
    createdTime: { type: Date, default: Date.now() },
    updatedTime: { type: Date, default: Date.now() },
    gender: { type: String, enum: constant.gender },
    age: {
        from: { type: Number },
        to: { type: Number },
    },
    // Change to unique when deploy || prd
    source: { type: String },
    socketId: { type: String, unique: true },
    hash: { type: String },
});

const Chat = mongoose.model('chats', chatSchema, 'chats');
const FindPartner = mongoose.model('find_partners', findPartnerSchema, 'find_partners');

module.exports = { Chat, FindPartner };
