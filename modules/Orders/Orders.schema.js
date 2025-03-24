const mongoose = require('mongoose');
const RestaurantModel = require('../Restaurants/Restaurant.model');
const usersModel = require('../users/users.model');
const FoodModel = require('../Foods/Foods.model');

const FoodItems = mongoose.Schema({
    food: { type: mongoose.Types.ObjectId, ref: FoodModel, required: true },
    quantity: { type: Number, default: 1 },
    message: { type: String },
})

const OrderSchema = mongoose.Schema({
    foodItems: { type: [FoodItems], required: true },
    totalPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    user: { type: mongoose.Types.ObjectId, ref: usersModel, required: true },
    restaurant: { type: mongoose.Types.ObjectId, ref: RestaurantModel, required: true }
}, { timestamps: true });

module.exports = OrderSchema;