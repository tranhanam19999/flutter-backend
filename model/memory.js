const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
    createdTime: { type: Date, default: Date.now() },
    updatedTime: { type: Date, default: Date.now() },

    memoryId: { type: Number, default: Date.now() + Math.floor(Math.random()) },
    name: { type: String },
    imageUrl: { type: String }
});

const Memory = mongoose.model('memories', memorySchema, 'memories');
module.exports = Memory;
