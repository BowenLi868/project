const mongoose = require('mongoose');
const AddressModel = require('../models/address');
const UserModel = require('../models/user');

exports.find = async(ctx, next) => {
  if (ctx.session && ctx.session.phonenumber) {
    const result = await UserModel.findOne({
      phonenumber: ctx.session.phonenumber
    }, {
      address_ids: 1
    });
    if (result) {
      const address = await AddressModel.find({
        _id: {
          $in: result.address_ids
        }
      });
      ctx.body = {
        success: 0,
        message: '获取收货地址成功',
        data: address
      }
    }
    else{
      ctx.body ={
        success:-1,
        message:'用户不存在'
      }
    }
  } else {
    ctx.body = {
      success: -2,
      message: '你还未登陆'
    }
  }
  await next();
}
exports.setAddress = async(ctx, next) => {
  let _address = ctx.request.body;
  if (_address._id) {
    let address = await AddressModel.update({
      _id: _address._id
    }, {
      name: _address.name,
      sex: _address.sex,
      phonenumber: _address.phonenumber,
      address: _address.address,
      detail_address: _address.detail_address,
      door_number: _address.door_number,
      label: _address.label
    }).exec();
    if (address.ok == 1 && address.n == 1) {
      ctx.body = {
        success: 0,
        message: '更新地址成功'
      }
    } else {
      ctx.body = {
        success: -2,
        message: '更新地址失败'
      }
    }
  } else {
    let new_address = {};
    for (let item in _address) {
      if (_address[item]) {
        new_address[item] = _address[item];
      }
    }
    try {
      // let user_phonenumber = _address.user_phonenumber;
      let address = await AddressModel.create(new_address);
      let user = await UserModel.update({
        phonenumber: ctx.session.phonenumber
      }, {
        $addToSet: {
          address_ids: address._id
        }
      }).exec()
      if (user.ok == 1 && user.n == 1) {
        ctx.body = {
          success: 0,
          message: '收货地址添加成功！'
        }
      }
    } catch (e) {
      ctx.body = {
        success: -1,
        message: '收货地址添加失败'
      }
    }
  }
}

exports.delete = async(ctx, next) => {
  let _id = ctx.request.body._id;
  // let user_phonenumber = ctx.request.body.user_phonenumber;
  try {
    let user = await UserModel.update({
      phonenumber: ctx.session.phonenumber
    }, {$pull: {address_ids:mongoose.Types.ObjectId(_id)}}).exec()
    if (user.ok == 1 && user.n == 1) {
      const address = await AddressModel.deleteOne({
        _id: _id
      });
      if (address.result.ok == 1 && address.result.n == 1) {
        ctx.body = {
          success: 0,
          message: '删除成功'
        }
      }
    }
  } catch (e) {
    console.log(e)
    ctx.body = {
      success: -1,
      message: '删除失败'
    }
  }
}