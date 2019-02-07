const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let UserSchema = new Schema({
  password: {
    type:String,
    default:''
  },
  avatar:{
    type:String,
    default:'http://xiaodiwaimai.oss-cn-shenzhen.aliyuncs.com/default_person_icon.png'
  },
  name: String,
  phonenumber:{
    type:String,
    unique:true
  },
  address_ids:{
    type:Array,
    default:[]
  },
  order_ids:{
    type:Array,
    default:[]
  },
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


UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next();
});


module.exports = UserSchema;