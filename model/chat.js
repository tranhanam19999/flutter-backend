const mongoose = require('mongoose');
const constant = require('../constant');

const chatSchema = new mongoose.Schema({
    createdTime: { type: Date, default: Date.now() },
    updatedTime: { type: Date, default: Date.now() },
    senderId: { type: String },
    receiverId: { type: String },
    content: { type: String },
});

const Chat = mongoose.model('chats', chatSchema, 'chats');

module.exports = Chat;
