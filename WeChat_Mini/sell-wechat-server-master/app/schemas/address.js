/*
 * @Author: wangdi 
 * @Date: 2017-04-11 08:11:02 
 * @Last Modified by: wangdi
 * @Last Modified time: 2017-04-15 12:07:37
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let AddressSchema = new Schema({
  name: String,
  sex: String,
  phonenumber: String,
  address: String,
  detail_address: String,
  door_number: String,
  label: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

AddressSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

module.exports = AddressSchema;