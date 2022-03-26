const mongoose = require('mongoose');
const crypto = require('crypto');
const constant = require('../constant');

const userSchema = new mongoose.Schema({
    createdTime: { type: Date, default: Date.now() },
    updatedTime: { type: Date, default: Date.now() },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: String },
    fullName: {
        type: String,
        required: true,
        validate: {
            validator: function (fullName) {
                return fullName.length > 5;
            },
            message: 'User full name must be more than 5 characters',
        },
    },
    avatar: { type: String },
    email: { type: String, required: true, unique: true },
    status: { type: String, enum: constant.UserStatus },

    hash: String,
    salt: String,

    token: { type: String },
});

userSchema.methods.setPassword = function (password) {
    // Creating a unique salt for a particular user
    this.salt = crypto.randomBytes(16).toString('hex');

    // Hashing user's salt and password with 1000 iterations,

    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

// Method to check the entered password is correct or not
userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};

const User = mongoose.model('users', userSchema, 'users');
module.exports = User;