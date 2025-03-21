const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    password: {type: String, required: true},
    role: { type: String, default: "customer", enum: ['customer', 'admin'] },
    restaurant: { type: mongoose.Types.ObjectId, default: null },
    entitlements: { type: Array, default: [] }
}, { timestamps: true })

module.exports = UsersSchema;