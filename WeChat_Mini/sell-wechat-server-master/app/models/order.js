const mongoose = require('mongoose');
const OrderSchame = require('../schemas/order');
const OrderModel = mongoose.model('Order',OrderSchame);

module.exports = OrderModel;