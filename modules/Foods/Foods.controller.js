const { getAllFoods, getAFoodByRestaurantId, createFood, updateFood, deleteFood, getAFoodById } = require('./Foods.routes');

const FoodsController = require("express").Router();

FoodsController.get("/", getAllFoods);

FoodsController.get("/:foodId", getAFoodById);

FoodsController.get("/restaurant/:restaurantId", getAFoodByRestaurantId);

FoodsController.post("/createFood", createFood);

FoodsController.patch("/updateFood/:foodId", updateFood);

FoodsController.delete("/deleteFood/:foodId", deleteFood);


module.exports = FoodsController;