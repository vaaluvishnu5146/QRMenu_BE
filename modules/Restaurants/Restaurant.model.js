const mongoose = require('mongoose');
const RestaurantSchema = require('./Restaurant.schema');

const RestaurantModel = mongoose.model("restaurant", RestaurantSchema);

module.exports = RestaurantModel;