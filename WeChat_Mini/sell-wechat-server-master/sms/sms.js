"use strict";
const config = require('../config');
const UCPaas = require('./ucpaas');
exports.sendcode = async (code, phonenumber)=>{
  let ucpaas = UCPaas({
    accountSid: config.accountId,
    token: config.token,
    appId: config.appId
  });
  return await ucpaas.sms({
    "param": code,
    "templateId": config.templateId,
    "to": phonenumber
  });
};

exports.randomNum = (n) =>{
  var t = '';
  for (var i = 0; i < n; i++) {
    t += Math.floor(Math.random() * 10);
  }
  return t;
}