const mongoose = require('mongoose');
const RatingModel = require('../models/rating');

exports.findById = async function (ctx, next) {
  let limit = Number.parseInt(ctx.query.limit);
  let offset = Number.parseInt(ctx.query.offset);
  const rating = await RatingModel.find({
    restaurant_id: ctx.query.restaurant_id
  }).limit(limit).skip(offset).exec().catch(function (err) {
    console.log(err);
  });
  if (rating) {
    ctx.body = rating;
  } else {
    ctx.body = {
      success: -1,
      message: '数据出错'
    };
  }
}

exports.ratingCount = async function (ctx, next) {
  const rating = await RatingModel.find({
    restaurant_id: ctx.query.restaurant_id
  });
  var unsafe = 0,
    safe = 0;
  rating.forEach(function (item) {
    if (item.content.rating_star >= 4) {
      safe++;
    } else {
      unsafe++;
    }
  });
  ctx.body = {
    total: rating.length,
    safe: safe,
    unsafe: unsafe
  }
}