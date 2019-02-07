const mongoose = require('mongoose');
const OrderModel = require('../models/order');
const UserModel = require('../models/user');

exports.createOrder = async(ctx, next) => {
  let _order = {
    restaurant_id:ctx.request.body.restaurant_id,
    restaurant_image_path:ctx.request.body.restaurant_image_path,
    shop_name: ctx.request.body.shop_name,
    status: ctx.request.body.status,
    good_list: JSON.parse(ctx.request.body.good_list)
  }
  try {
    const order = await OrderModel.create(_order);
    let user = await UserModel.update({
      phonenumber: ctx.session.phonenumber
    }, {
      $addToSet: {
        order_ids: order._id
      }
    }).exec()
    if (user.ok == 1 && user.n == 1) {
      ctx.body = {
        success: 0,
        message: '订单添加成功！'
      }
    } else {
      ctx.body = {
        success: -1,
        message: '订单添加失败'
      }
    }
  } catch (e) {
    console.log(e);
    ctx.body ={
      success:-2,
      message:'数据库异常'
    }
  }
}

exports.find = async (ctx,next)=>{
  if (ctx.session && ctx.session.phonenumber) {
    const result = await UserModel.findOne({
      phonenumber: ctx.session.phonenumber
    }, {
      order_ids: 1
    });
    if (result) {
      const order = await OrderModel.find({
        _id: {
          $in: result.order_ids
        }
      });
      ctx.body = {
        success: 0,
        message: '获取订单列表成功',
        data: order
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