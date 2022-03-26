const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    createdTime: { type: Date, default: Date.now() },
    updatedTime: { type: Date, default: Date.now() },

    name: { type: String, required: true },
    categoryId: { type: String, required: true },
    slug: { type: String, required: true },
    imageUrl: { type: String }
});

const Category = mongoose.model('categories', categorySchema, 'categories');
module.exports = Category;
