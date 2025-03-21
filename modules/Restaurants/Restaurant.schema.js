const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    name: { type: String, required: true },
    storeType: { type: String, enum: [ 'cafe', 'restaurant', 'hotel' ], required: true },
    isVeg: { type: Boolean, default: false },
    isNonVeg: { type: Boolean, default: false },
    isOpen: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = RestaurantSchema;