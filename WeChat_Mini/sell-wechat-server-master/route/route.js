const Router = require('koa-router');
const User = require('../app/controllers/user');
const Menu = require('../app/controllers/menu');
const Restaurant = require('../app/controllers/restaurant');
const Rating = require('../app/controllers/rating');
const Address = require('../app/controllers/address');
const Order = require('../app/controllers/order');
const SMS = require('../sms/sms');
const superagent = require('superagent');

const router = new Router();

// user路由
router.get('/logininfo', async(ctx, next) => {
  console.log(ctx);
  if(ctx.session && ctx.session.phonenumber){
    ctx.body = {
      success:0,
      message:'已登录',
    }
  }
  else{
    ctx.body = {
      success:-1,
      message:'未登录',
    }
  }
});

/**
 * 数据格式
 * phonenumber:''电话号码
 * password:''//密码
 * 
 */
//密码登录
router.post('/user/signinpassword', User.signinPassword);

// 注册
/**
 * 数据格式
 * phonenumber:''电话号码
 * code:''//密码
 * 
 */
//手机号登录如果没有注册自动注册
router.post('/user/signinphonenumber', User.signinPhoneNumber);

router.get('/user/userinfo',User.getUserInfo);

router.post('/user/sendcode',async function(ctx){
    let phonenumber = ctx.request.body.phonenumber;

    let code  = SMS.randomNum(6);
    const result = await SMS.sendcode(code,phonenumber);
    if(result.resp.respCode == '000000'){
      ctx.session.code = code;
      ctx.session.createDate = result.resp.templateSMS.createDate
      ctx.body = {
        success:0,
        message:'短信发送成功'
      }
    }
    else{
      ctx.body = {
        success:-1,
        message:'短信发送失败'
      }
    }
});
// 设置密码
/**
 * 数据格式
 * {
 *  phonenumber:''//手机号
 *  password:''//密码
 * }
 */
router.post('/user/setpassword', User.setPassword);

router.post('/user/logout',User.logout);

//数据格式
/*
{
  _id:'',//地址id新增不传，修改传
  user_id:''//地址对应的user_id   user 与address 为一对多关系
  name:''//姓名
  sex:''//性别
  phonenumber:''电话号码
  address:'' //地址
  detail_address:''//详细地址
  door_number:''//门牌号
  label:''//标签
}

*/
// 设置送货地址
router.post('/user/setaddress',Address.setAddress);
//获取收货地址
/**
 * 数据格式
 * {
 *  phonenumber:''//用户手机号
 * }
 * 
 */
router.get('/user/getaddress',Address.find);
//数据格式
/**
 * {
 *  _id:''//address id
 * }
 */
//删除收货地址
router.post('/user/deleteaddress',Address.delete);


/**
 * 数据格式
 * {
 *  restaurant_id:''
 * }
 */

router.get('/user/haspassword',User.hasPassword);
// 查询菜单路由
router.get('/menu/', Menu.findById);

/**
 * 数据格式
 * {
 *  restaurant_id:'',//餐馆id
 *  limit:''//一次请求几个数据
 *  offset:''//分页参数
 * }
 */
//查询评价路由
router.get('/rating/', Rating.findById);
/**
 * 数据格式
 * {
 *  restaurant_id:'',//餐馆id
 * }
 */
//获取餐馆评分
router.get('/rating/score/',async (ctx,next)=>{
  let data = superagent.get('http://mainsite-restapi.ele.me/ugc/v2/restaurants/'+ctx.request.query.restaurant_id+'/ratings/scores');
  ctx.body = data;
});
/**
 * 数据格式
 * {
 *  restaurant_id:'',//餐馆id
 * }
 */
//获取评价人数
router.get('/rating/ratingcount/', Rating.ratingCount);


/**
 * 数据格式
 * {
 *  latitude:'' //纬度，
 *  longitude:''//经度
 *  limit:''//一次请求几个数据
 *  offset:''//分页参数
 * }
 */
//查询餐馆信息
router.get('/restaurant/', Restaurant.findByLocation);
// 天气接口
router.get('/restaurant/xindian/',Restaurant.findByLocationNew);

router.get('/restaurant/chaoshi/',Restaurant.findByLocationMarket);

router.get('/restaurant/shuiguo/',Restaurant.findByLocationFruit);

router.get('/restaurant/tianpin/',Restaurant.findByLocationSweet);

router.get('/restaurant/hanbao/',Restaurant.findByLocationHamburger);

router.get('/restaurant/zhunshida/',Restaurant.findByLocationPunctual);

router.get('/restaurant/malatang/',Restaurant.findByLocationHotpot);

router.get('/restaurant/meishi/',Restaurant.findByLocationDelicious);


router.get('/restaurant/keyword',Restaurant.findByLocationKeywords);
/**
 * 数据格式
 * {
 *  latitude:'' //纬度，
 *  longitude:''//经度
 * }
 */
router.get('/weather/', async function (ctx, next) {
  const data = await superagent.get('http://mainsite-restapi.ele.me/bgs/weather/current?latitude=' + ctx.query.latitude + '&longitude=' + ctx.query.longitude).then(function (res) {
    var path = res.body.image_hash;
    if (path.substr(-3) == 'png') {
      path = path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + '.png';
    } else {
      path = path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + '.jpeg';
    }
    var data = {
      temperature: res.body.temperature,
      description: res.body.description,
      image_path: 'https://fuss10.elemecdn.com/' + path + '?imageMogr/format/webp/thumbnail/!69x69r/gravity/Center/crop/69x69/'
    }
    return data;
  });
  ctx.body = data;
});

// search查询接口
router.get('/search/', async function (ctx, next) {
  let keyword = ctx.query.keyword;
  let result = await superagent.get('https://mainsite-restapi.ele.me/bgs/poi/search_poi_nearby?keyword=' + keyword + '&offset=0&limit=20').then(function (res) {
    return res.body;
  });
  ctx.body = {
    success: 0,
    data: result
  };
});


router.post('/comfirmorder/',Order.createOrder);
router.get('/orderlist/',Order.find);
module.exports = router;