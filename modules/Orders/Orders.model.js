const mongoose = require('mongoose');
const OrdersSchema = require('./Orders.schema');
const OrderModel = mongoose.model("orders", OrdersSchema);

module.exports = OrderModel;