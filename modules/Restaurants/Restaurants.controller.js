const { getAllRestaurants, getARestaurantById, createRestaurant, updateRestaurant, deleteRestaurant } = require('./Restaurants.routes');

const RestaurantController = require("express").Router();

RestaurantController.get("/", getAllRestaurants);

RestaurantController.get("/:restaurantId", getARestaurantById);

RestaurantController.post("/createRestaurant", createRestaurant);

RestaurantController.patch("/updateRestaurant/:restaurantId", updateRestaurant);

RestaurantController.delete("/deleteRestaurant/:restaurantId", deleteRestaurant);


module.exports = RestaurantController;