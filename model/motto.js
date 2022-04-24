const mongoose = require('mongoose');
const constant = require('../constant');

const mottoSchema = new mongoose.Schema({
    createdTime: { type: Date, default: Date.now() },
    updatedTime: { type: Date, default: Date.now() },
    creatorId: { type: String },
    content: { type: String },
});

const Motto = mongoose.model('mottos', mottoSchema, 'mottos');

module.exports = Motto;
