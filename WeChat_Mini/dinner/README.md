![首页.png](http://upload-images.jianshu.io/upload_images/2599324-62acb345ab61945d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 安装说明

1、导入db文件夹中的数据到Bmob，关于Bmob的入门使用，请参见：[http://blog.it577.net/archives/32/](http://blog.it577.net/archives/32/)
2、修改小程序源码文件/utils/init.js中的Bmob Appid信息
3、Bmob后台修改小程序Appid与支付信息，具体操作图解，请参见：[http://blog.it577.net/archives/103/](http://blog.it577.net/archives/103/)

### 买家下单流程
1、店铺首页兼商品列表
2、购物车
3、收货地址列表与编辑
4、订单列表与详情
5、支付

### 前端特技
1、购物车动画
2、地址选择器，集成腾讯地图sdk

# 建表

### 1.商家表

字段名 | 类型 | 注释
--------  | ------ | --------
title | String | 店名 
logo | String | 头像
telephone | String | 联系电话
address | String  | 地址
geo | Geopoint | 经纬度
notice | String | 公告
business_start | String | 开始营业时间
business_end | String | 结束营业时间
express_fee | Number | 配送费
min_amount | Number | 起送金额

### 2.分类表
字段名 | 类型 | 注释
--------  | ------ | --------
title | String | 店名 
priority | Number | 优先级（越小越前）

### 3.菜品表

字段名 | 类型 | 注释
--------  | ------ | --------
title | String | 店名 
thumb | File | 主图
summary | String | 简述
price | Number | 价格
category | Pointer | Cateogry分类表
priority | Number | 优先级（越小越前）

### 4.地址表

字段名 | 类型 | 注释
--------  | ------ | --------
realname | String | 姓名
gender | Number | 1先生 0女士
mobile | String | 手机
area | String | 区域
detail | String | 详细地址
user | Pointer | 关联用户

### 5.订单表

字段名 | 类型 | 注释
--------  | ------ | --------
user | Pointer | 下单人
title | String | 摘要
quantity | Number | 购买数量
address | Pointer | 地址
express_fee | Number | 配送费
amount | Number | 餐费
total | Number | 总计
status | Number | 状态（0，待付款；1，已付款；2，派送中；-1，已取消）
detail | Array | 清单
sn | String | 订单号

### 6.用户表

字段名 | 类型 | 注释
--------  | ------ | --------
userInfo | Object | 用户昵称头像等
authData | Object | Bｍob维护的用户openid等信息

![v1-done.gif](http://upload-images.jianshu.io/upload_images/2599324-548b6e719f225ee4.gif?imageMogr2/auto-orient/strip)

**您如果觉得灵犀外卖有用，可以扫下面二维码赞助我，谢谢。**

![cash.jpg](http://upload-images.jianshu.io/upload_images/2599324-fcb1188bc42629ff.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/2599324-60b6db0a9b0ed867.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)