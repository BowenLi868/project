const mongoose = require('mongoose');
const MenuModel = require('../models/menu');


exports.findById = async function (ctx, next) {
  const menu = await MenuModel.find({
    restaurant_id: ctx.query.restaurant_id
  }).exec().catch(function (err) {
    console.log(err);
  });
  if (menu) {
    ctx.body = menu[0];
  } else {
    ctx.body = {
      success: -1,
      message: '数据出错'
    };
  }
}