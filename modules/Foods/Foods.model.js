const mongoose = require('mongoose');
const FoodSchema = require('./Foods.schema');
const FoodModel = mongoose.model("foods", FoodSchema);

module.exports = FoodModel;