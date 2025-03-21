const UsersController = require("express").Router();
const { getAllUsers, getAUser, createAUser, updateAUser, deleteAUser, assignRestaurantToUser } = require("./users.routes");

// GET ALL USERS
UsersController.get("/", getAllUsers);

// GET A USER
UsersController.get("/:userId", getAUser);

// CREATE A USER
UsersController.post("/createUser", createAUser);

// UPDATE A USER
UsersController.patch("/updateUser/:userId", updateAUser);

// DELETE A USER
UsersController.delete("/deleteUser/:userId", deleteAUser);

// ASSIGN or UPDATE restaurant to user
UsersController.patch("/updateRestaurantInfo/:userId", assignRestaurantToUser)

module.exports = UsersController;