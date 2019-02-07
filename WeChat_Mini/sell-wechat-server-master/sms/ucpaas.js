"use strict";

const assign = require('object-assign');
const axios = require('axios');
const crypto = require('crypto');
const moment = require('moment');

const api = {
  sms: 'Messages/templateSMS'
};

function UCPaas(opt) {
  if (!(this instanceof UCPaas)) {
    return new UCPaas(opt);
  }

  opt = opt || {};

  if (!opt.accountSid || !opt.token || !opt.appId) {
    throw('accountSid, token and appId is required, please check config');
  }

  this.host = 'https://api.ucpaas.com';
  this.version = '2014-06-30';
  this.accountSid = opt.accountSid;
  this.token = opt.token;
  this.appId = opt.appId;
}

UCPaas.prototype.Post = async function(api, params) {
  let auth = this.auth();
  let url = `${this.host}/${this.version}/Accounts/${this.accountSid}/${api}?sig=${auth.sig}`;
  let result = await axios({
    url:url,
    method:'post',
    headers: {
      'content-type': 'application/json',
      'Authorization': auth.authorization
    },
    data: params
  })
  return result.data;
};

UCPaas.prototype.sms = async function(){
  let params = assign(arguments[0], {appId: this.appId});
  return await this.Post(api.sms, {"templateSMS": params});
};


UCPaas.prototype.auth = function auth() {
  var timestamp = moment().format('YYYYMMDDhhmmss')
  var shasum = crypto.createHash('md5');
  shasum.update(`${this.accountSid}${this.token}${timestamp}`);

  var authorization = new Buffer(`${this.accountSid}:${timestamp}`).toString('base64');
  return {
    sig: shasum.digest('hex').toUpperCase(),
    authorization: authorization
  }
};

module.exports = UCPaas;
