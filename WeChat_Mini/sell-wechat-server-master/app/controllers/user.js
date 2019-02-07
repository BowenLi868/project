const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const UserModel = require('../models/user');
const randomString = require('random-string');
const moment = require('moment');
/**
 * 密码登录处理
 * 
 * @param {any} req 
 * @param {any} res 
 */
exports.signinPassword = async(ctx) => {
  let _user = ctx.request.body;
  let user = await UserModel.find({
    phonenumber: _user.phonenumber
  }).exec();

  if (user[0]) {
    if (user[0].password == '') {
      ctx.body = {
        success: -2,
        message: '请先设置密码在登录'
      }
    } else {
      if (bcrypt.compareSync(_user.password, user[0].password)) {
        ctx.session.user = user[0];
        ctx.body = {
          success: 0,
          message: '登录成功',
          data: {
            name: user[0].name,
            phonenumber: user[0].phonenumber,
          }
        }
      } else {
        ctx.body = {
          success: -1,
          data: {
            message: '密码错误'
          }
        }
      }
    }
  } else {
    ctx.body = {
      success: -1,
      message: '请先用手机注册'
    }
  }
}

/**
 * 电话号码登录如果没注册自动注册
 * 
 * @param {any} ctx 
 */
exports.signinPhoneNumber = async function (ctx) {
  let _user = ctx.request.body;
  if (moment(ctx.session.createDate, 'YYYYMMDDhhmmsss').fromNow().substr(0, 1) > 3) {
    ctx.body = {
      success: -3,
      message: '验证码已过期'
    }
  } else {
    if (ctx.request.body.code == ctx.session.code) {
      _user.name = randomString(8) + randomString(8);
      let user = await UserModel.find({
        phonenumber: _user.phonenumber
      }).exec();
      if (!user.length) {
        try {
          let res = await UserModel.create(_user);
          ctx.session = res;
          ctx.body = {
            success: 0,
            message: '注册成功！'
          }
        } catch (e) {
          console.log(e);
          ctx.body = {
            success: -1,
            message: '注册失败'
          }
        }
      } else {
        ctx.session = user[0];
        ctx.body = {
          success: 0,
          message: '登录成功',
          data: {
            name: user[0].name,
            phonenumber: user[0].phonenumber,
          }
        }
      }
    }
    else{
      ctx.body = {
        success:-2,
        message:'验证码错误'
      }
    }
  }
}

exports.setPassword = async(ctx) => {
  let hash = bcrypt.hashSync(ctx.request.body.password);
  let user = await UserModel.update({
    phonenumber: ctx.session.phonenumber
  }, {
    password: hash
  }).exec();
  if (user.ok == 1) {
    ctx.body = {
      success: 0,
      message: '密码设置成功'
    }
  } else {
    ctx.body = {
      success: -1,
      message: '密码设置失败'
    }
  }
}

exports.getUserInfo = async(ctx) => {
  if (ctx.session && ctx.session.phonenumber) {
    ctx.body = {
      success: 0,
      message: '获取用户信息成功',
      data: {
        phonenumber: ctx.session.phonenumber,
        name: ctx.session.name,
        avatar: ctx.session.avatar
      }
    }
  } else {
    ctx.body = {
      success: -1,
      message: '你还未登录',
    }
  }
}

exports.hasPassword = async(ctx, next) => {
  if (ctx.session && ctx.session.phonenumber) {
    const user = await UserModel.findOne({
      phonenumber: ctx.session.phonenumber
    });
    if (user) {
      if (user.password) {
        ctx.body = {
          success: 0,
          message: '已设置密码'
        }
      } else {
        ctx.body = {
          success: 1,
          message: '未设置密码'
        }
      }
    } else {
      ctx.body = {
        success: -1,
        message: '用户不存在'
      }
    }
  }
}
exports.logout =  async (ctx,next)=>{
  if(ctx.session && ctx.session.phonenumber){
    ctx.session ={};
    ctx.body = {
      success:0,
      message:'已退出登录',
    }
  }
  else{
    ctx.body = {
      success:0,
      message:'您还未登录'
    }
  }
}