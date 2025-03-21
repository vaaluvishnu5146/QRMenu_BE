const mongoose = require('mongoose');
const RestaurantModel = require('../Restaurants/Restaurant.model');

const FoodSchema = mongoose.Schema({
    name: { type: String, required: true },
    foodType: { type: String, enum: [ 'veg', 'non-veg' ], default: 'veg' },
    category: { type: String, enum: [ 'fast-food', 'slow-baked', 'desserts' ], default: 'fast-food' },
    normalPrice: { type: Number, default: 0 },
    actualPrice: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: false },
    restaurant: { type: mongoose.Types.ObjectId, ref: RestaurantModel, required: false }
}, { timestamps: true });

module.exports = FoodSchema;