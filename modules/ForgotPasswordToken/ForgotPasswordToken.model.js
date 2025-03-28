const mongoose = require('mongoose');
const FWSchema = require('./ForgotPasswordToken.Schema');
const ForgotPasswordTokenModel = mongoose.model("forgotpasswordtoken", FWSchema);

module.exports = ForgotPasswordTokenModel;