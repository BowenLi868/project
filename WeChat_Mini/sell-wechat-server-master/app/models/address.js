const mongoose = require('mongoose');
const AddressSchema = require('../schemas/address');
const AddressModel = mongoose.model('Address',AddressSchema);

module.exports = AddressModel;