const AuthenticationController = require("express").Router();
const { createAccount, signinUser, forgotPassword, verifyToken } = require("../users/users.routes");

// CREATE A USER ACCOUNT
AuthenticationController.post("/createAccount", createAccount);

// SIGN USER
AuthenticationController.post("/signin", signinUser);

// FORGOT PASSWORD
/**
 * When user clicks on forgot password link
 * We will show page where user can enter Email
 * And when he submits the email to server
 * We will check wheher Any account has the same email
 * If ACCOUNT EXISTS
 *  SEND EMAIL WITH UNIQUE STRING AND UPDATE THE UNIQUE STRING TO DB
 * ELSE
 *  SHOW ERROR AND ROUTE BACK THE USER TO LOGIN
 */
AuthenticationController.post("/forgotpassword", forgotPassword);


/**
 * When user receives the token in email he lands simulatneously into verify token page
 * There he need to enter the token he has received in email
 * Then he will submit, if everything goes correct he can able to change the password
 * else he will be warned and redirected to login page
 */
AuthenticationController.post("/verifyToken", verifyToken);


module.exports = AuthenticationController;