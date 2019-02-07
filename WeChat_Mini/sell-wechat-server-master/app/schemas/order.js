const mongoose = require('mongoose');
const Schame = mongoose.Schema;
const ObjectId = Schame.Types.ObjectId;

let OrderSchame = new Schame({
  shop_name: String,
  status: Number,
  good_list: [],
  restaurant_id:String,
  restaurant_image_path:String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt:{
      type:Date,
      default:Date.now()
    }
  }
});

OrderSchame.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next();
});
module.exports = OrderSchame;