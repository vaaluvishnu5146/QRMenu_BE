const express = require("express");
const cowsay = require("cowsay");
const cors = require("cors");
const env = require('dotenv');

// Controllers
const RestaurantController = require("./modules/Restaurants/Restaurants.controller");
const FoodsController = require("./modules/Foods/Foods.controller");
const AuthenticationController = require("./modules/Authentication/Authentication.controller");
const UsersController = require("./modules/users/users.controller");
const OrdersController = require("./modules/Orders/Orders.controller");

env.config();
require('./databaseConfig/mongooseConnectionConfig')
require('./NotificationConfig/EmailNotificationConfig')


// 1. Define configs
const configs = {
    hostName: process.env.HOSTNAME,
    port: process.env.PORT
};

// 2. Create the server
const HTTP_SERVER = express();

// Register middleware
// Enable middlewares
HTTP_SERVER.use(express.json());

HTTP_SERVER.use(cors());

// Register controller
HTTP_SERVER.use('/v1/restaurants', RestaurantController)
HTTP_SERVER.use('/v1/foods', FoodsController)
HTTP_SERVER.use('/v1/auth', AuthenticationController)
HTTP_SERVER.use('/v1/users', UsersController);
HTTP_SERVER.use('/v1/orders', OrdersController);

// 3. Start and listen to server
try {
    HTTP_SERVER.listen(configs.port, configs.hostName, function () {
       console.log(`http://${configs.hostName}:${configs.port}/`)
        console.log(cowsay.say({
            text : "Server started",
            e : "oO",
            T : "U "
        }))
    });
} catch (error) {
    console.log(cowsay.say({
        text : "Sorry issue starting the server",
        e : "oO",
        T : "U "
    }))
}