const mongoose = require('mongoose');
const usersModel = require('../users/users.model');

const TokenSchema = mongoose.Schema({
    token: { type: String, required: true },
    validTill: { type: Date, default: new Date() },
    email: { type: String, required: true }
}, { timestamps: true });

module.exports = TokenSchema;