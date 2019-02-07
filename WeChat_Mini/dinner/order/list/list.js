/**
 *
 * 配套视频教程请移步微信->小程序->灵动云课堂
 * 关注订阅号【huangxiujie85】，第一时间收到教程推送
 *
 * @link http://blog.it577.net
 * @author 黄秀杰
 */

// list.js
var Bmob = require('../../utils/bmob.js');
var that;

Page({
	data: {
		page_index: 0,
		orderList: [],
		loadingTip: '上拉加载更多'
	},
	onLoad: function () {
		that = this;
	},
	showDetail: function (e) {
		var index = e.currentTarget.dataset.index;
		// 传递订单objectId
		wx.navigateTo({
			url: '../detail/detail?objectId=' + that.data.orderList[index].id
		})
	},
	onShow: function () {
		that.loadOrder();
	},
	loadOrder: function () {
		var page_size = 10;
		var query = new Bmob.Query('Order');
		query.include('user');
		query.include('address');
		query.equalTo('user', Bmob.User.current());
		// 按照priority逆序排列
		query.descending('createdAt');
		// 分页
		query.limit(page_size);
		query.skip(that.data.page_index * page_size);
		// 查询所有数据
		query.find().then(function(results) {
				// 请求成功将数据存入orderList
				that.setData({
					orderList: that.data.orderList.concat(results)
				});
				// 判断上拉加载状态
				if (results.length < page_size) {
					that.setData({
						loadingTip: '没有更多内容'
					});
				}
			}, function(error) {
				alert("查询失败: " + error.code + " " + error.message);
			});
	},
	onReachBottom: function () {
		that.setData({
			page_index: ++that.data.page_index
		});
		that.loadOrder();
	},
	payment: function (e) {
		var index = e.currentTarget.dataset.index;
		var order = that.data.orderList[index];
		getApp().payment(order);
	}
})