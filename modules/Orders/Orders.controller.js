const { getAllOrders, getAllOrdersByRestaurantId, getAllOrdersByUserId, getAOrderById, createOrder, updateOrder, deleteOrder } = require('./Orders.routes');

const OrdersController = require("express").Router();

OrdersController.get("/", getAllOrders);

OrdersController.get("/byRestaurntId/:restaurantId", getAllOrdersByRestaurantId);

OrdersController.get("/byUserId/:userId", getAllOrdersByUserId);

OrdersController.get("/order/:restaurantId", getAOrderById);

OrdersController.post("/createOrder", createOrder);

OrdersController.patch("/updateOrder/:orderId", updateOrder);

OrdersController.delete("/deleteOrder/:deleteId", deleteOrder);


module.exports = OrdersController;