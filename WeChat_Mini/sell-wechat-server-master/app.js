const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const promise = require('bluebird');
const session = require('koa-session2');
const path = require('path')
const convert = require('koa-convert')
const static = require('koa-static')
const Store = require('./Store');
const https = require('https');
const fs = require('fs');

const DB_URL = 'mongodb://localhost/xiaodiwaimai';
const app = new Koa();

const router = require('./route/route')
mongoose.Promise = promise;
mongoose.connect(DB_URL);
const static_path = './wechat';

app.use(convert(static(
  path.join( __dirname,  static_path)
)));
app
  .use(bodyParser())
  .use(session({
    key:'sessionid',
    store:new Store()
  }))
  .use(router.routes())
  .use(router.allowedMethods())

var options = {
    key: fs.readFileSync('./ssl/2_www.wd4219.cn.key'),  //ssl文件路径
    cert: fs.readFileSync('./ssl/1_www.wd4219.cn_bundle.crt')  //ssl文件路径
};

https.createServer(options, app.callback()).listen(443);

console.log('listen in 3000 port');