var t = require("../../controllers/userController.js"), a = require("../../controllers/loginController.js"), e = require("../../memory/memory.js");

Page({
    data: {
        utoken: "",
        headUrl: "",
        userName: "",
        sexUrl: "",
        marker: "",
        manageType: 4,
        orderStatusList: [],
        isFirstLoad: !0,
        isFirstTap: !0,
        canStatusTap: !1
    },
    onLoad: function(t) {
        var a = this;
        this.setData({
            orderStatusList: [],
            marker: ""
        }), getApp().getLogStatus().then(function() {
            a.getUserInfo(), a.getOrderStatus();
        });
    },
    onShow: function() {
        this.setData({
            canStatusTap: !1,
            orderStatusList: [],
            marker: ""
        }), this.data.isFirstLoad ? this.setData({
            isFirstLoad: !1
        }) : (this.getUserInfo(), this.getOrderStatus());
    },
    onHide: function() {},
    onUnload: function() {
        this.setData({
            orderStatusList: [],
            marker: ""
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            orderStatusList: [],
            marker: ""
        }), this.getUserInfo(), this.getOrderStatus();
    },
    onReachBottom: function() {
        "" != this.data.marker && this.getOrderStatus();
    },
    getUserInfo: function() {
        var a = this;
        e.checkUtoken();
        var r = {
            utoken: e.getData("userInfo").utoken
        };
        t.getUserInfo(r).then(function(t) {
            if (0 == t.code) {
                wx.stopPullDownRefresh();
                var e = t.data, r = "";
                1 == e.sex ? r = "http://image.jiashuangkuaizi.com/image/wxapp/hjcf/sexm.png" : 2 == e.sex && (r = "http://image.jiashuangkuaizi.com/image/wxapp/hjcf/sex-women.png"), 
                a.setData({
                    headUrl: e.avatar_url,
                    userName: e.nickname,
                    sexUrl: r,
                    coupon_cnt: e.coupon_cnt
                });
            }
        });
    },
    logout: function() {
        if (this.data.isFirstTap) return this.setData({
            isFirstTap: !1
        }), void a.logoutUserData().then(function() {
            e.setData("userInfo", {}), wx.reLaunch({
                url: "/pages/index/index"
            });
        });
    },
    switchManage: function(t) {
        1 == this.data.canStatusTap && (this.setData({
            manageType: t.currentTarget.dataset.type,
            marker: "",
            orderStatusList: []
        }), this.getOrderStatus());
    },
    getOrderStatus: function() {
        var a = this;
        e.checkUtoken(), wx.showLoading({
            title: "加载中"
        });
        var r = {
            type: this.data.manageType,
            marker: this.data.marker,
            utoken: e.getData("userInfo").utoken
        };
        t.getOrderStatus(r).then(function(t) {
            if (console.log("订单状态：", t), console.log("marker：", t.data.marker), a.setData({
                loaded: !0
            }), wx.hideLoading(), wx.stopPullDownRefresh(), 0 == t.code) {
                var e = t.data.list || [], r = (t.data.type, a.data.orderStatusList.concat(e));
                a.setData({
                    orderStatusList: r,
                    marker: t.data.marker,
                    canStatusTap: !0
                });
            }
        });
    },
    gotoMyCoupon: function() {
        wx.navigateTo({
            url: "/pages/coupon/my/my"
        });
    }
});